const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
// const path = require('path');  // currently not using path in this file, but might be needed for static files later
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { parseMentions, sendNotification } = require('./utils/notificationManager');
const { startBirthdayCronJob } = require('./utils/cronScheduler');
const Message = require('./models/Message');
const Group = require('./models/Group');
const User = require('./models/User');

// --- INITIAL SETUP ---
dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);
app.set('trust proxy', 1);
// --- SECURITY HEADERS ---
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "ws:", "wss:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// --- CORS CONFIGURATION ---
const allowedOrigins = [
    "https://davjjp-alumni-crhfw.ondigitalocean.app",
    "https://alumni-portal-davjjp.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://alumni-davjjp.netlify.app",
    "http://192.168.9.39:3000",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};
app.use(cors(corsOptions));
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// )


app.use(express.json({ limit: '10mb' }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, // Reduced to 5MB for security
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
}));

// --- SOCKET.IO SETUP WITH AUTHENTICATION ---
const io = new Server(server, { 
    cors: corsOptions,
    transports: ['websocket', 'polling']
});

// Socket.IO Authentication Middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user || !user.isApproved) {
            return next(new Error('Authentication error: Invalid or unapproved user'));
        }

        socket.user = user;
        next();
    } catch (error) {
        console.error('Socket authentication error:', error.message);
        next(new Error('Authentication error: Invalid token'));
    }
});

// In-memory map to track which user ID belongs to which socket connection
const userSockets = new Map();

// Middleware to pass io and userSockets to controllers
app.use((req, res, next) => {
    req.io = io;
    req.userSockets = userSockets;
    next();
});

// --- REAL-TIME CONNECTION LOGIC ---
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id} (${socket.user.fullName})`);

    // Map user to socket (now authenticated)
    userSockets.set(socket.user._id.toString(), socket.id);
    console.log(`Mapped user ${socket.user._id} to socket ${socket.id}`);

    // When a user joins a specific group chat
    socket.on('join_group', async (groupId) => { 
        try {
            // Verify user is member of the group
            const group = await Group.findById(groupId);
            if (group && group.members.includes(socket.user._id)) {
                socket.join(groupId);
                console.log(`User ${socket.user.fullName} joined group ${groupId}`);
            } else {
                console.log(`Unauthorized group join attempt by ${socket.user.fullName} for group ${groupId}`);
            }
        } catch (error) {
            console.error('Error joining group:', error);
        }
    });

    // When a user sends a message
    socket.on('send_message', async (data) => {
        const { groupId, text } = data;
        const senderId = socket.user._id;

        if (!groupId || !senderId || !text || !text.trim()) {
            return console.log("Missing or invalid data for send_message event");
        }

        try {
            // Verify user is member of the group
            const group = await Group.findById(groupId);
            if (!group || !group.members.includes(senderId)) {
                return console.error(`Unauthorized message attempt from ${socket.user.fullName} in group ${groupId}`);
            }

            const messageToSave = new Message({ group: groupId, sender: senderId, text: text.trim() });
            let savedMessage = await messageToSave.save();
            savedMessage = await savedMessage.populate('sender', 'fullName profilePicture');

            // Broadcast the new message to all clients in the group room
            io.to(groupId).emit('receive_message', savedMessage);

            // --- Handle Notifications from within the socket handler ---
            const req = { io, userSockets }; // Create a mock `req` object for sendNotification

            // Notify mentioned users
            const mentionedUsernames = parseMentions(text);
            if (mentionedUsernames.length > 0) {
                const mentionedUsers = await User.find({ fullName: { $in: mentionedUsernames } });
                mentionedUsers.forEach(mentionedUser => {
                    if (mentionedUser._id.toString() !== senderId.toString() && group.members.includes(mentionedUser._id)) {
                        sendNotification(req, {
                            recipient: mentionedUser._id,
                            sender: senderId,
                            type: 'mention_chat',
                            group: groupId,
                            contentSnippet: text.substring(0, 50) + '...'
                        });
                    }
                });
            }
        } catch (error) {
            console.error("Error handling message:", error);
        }
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        // Find and remove the user from our map to prevent memory leaks
        for (let [userId, id] of userSockets.entries()) {
            if (id === socket.id) {
                userSockets.delete(userId);
                console.log(`Unmapped user ${userId}`);
                break;
            }
        }
        console.log(`User Disconnected: ${socket.id} (${socket.user?.fullName || 'Unknown'})`);
    });
});

// --- API ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/birthday', require('./routes/birthday'));

// --- ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

// --- START THE SERVER ---
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server with real-time chat running on port ${PORT}`);
    
    // Start the birthday email cron job
    console.log('\n Initializing birthday email automation...');
    try {
        startBirthdayCronJob();
        console.log('Birthday email cron job started successfully!\n');
    } catch (error) {
        console.error('Failed to start birthday email cron job:', error);
    }
});
