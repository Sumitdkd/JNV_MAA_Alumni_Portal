
const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { parseMentions, sendNotification } = require('../utils/notificationManager');

// --- CONTROLLER EXPORTS ---

// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    try {
        const total = await Post.countDocuments({ isApproved: true });
        const posts = await Post.find({ isApproved: true })
            .populate('user')
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit)
            },
            data: posts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        // Validate the ID format
        if (!req.params.id || req.params.id.length !== 24) {
            return res.status(400).json({ success: false, message: 'Invalid post ID format' });
        }
        
        const post = await Post.findById(req.params.id)
            .populate('user', 'fullName profilePicture batchYear')
            .populate('comments.user', 'fullName profilePicture');
            
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        // Check if post is approved (if approval system is in place)
        if (post.isApproved === false) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid post ID format' });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        const userId = req.user.id;
        const postAuthorId = post.user._id.toString();
        const wasLiked = post.likes.includes(userId);

        // Check if the post has already been liked by this user
        if (wasLiked) {
            // Unlike the post - no notification needed for unliking
            post.likes.pull(userId);
        } else {
            // Like the post
            post.likes.push(userId);

            // Send a notification only if the liker is not the post author
            if (postAuthorId !== userId) {
                sendNotification(req, {
                    recipient: postAuthorId,
                    sender: userId,
                    type: 'new_like',
                    post: post._id,
                });
            }
        }

        await post.save();

        // Emit real-time update to all connected clients
        if (req.io) {
            const eventName = wasLiked ? 'post_unliked' : 'post_liked';
            req.io.emit(eventName, {
                postId: post._id,
                likes: post.likes,
                userId: userId
            });
        }

        res.status(200).json({ success: true, data: post.likes });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => file.path) : [];

        const post = await Post.create({
            ...req.body,
            images,
            user: req.user.id,
            isApproved: true, // All posts are auto-approved
        });
        const allOtherUsers = await User.find({ _id: { $ne: req.user.id } });

        console.log(`New post created. Notifying ${allOtherUsers.length} other users.`);

        // Create a notification for each of them
        allOtherUsers.forEach(user => {
            sendNotification(req, {
                recipient: user._id,
                sender: req.user.id,
                type: 'new_post',
                post: post._id,
            });
        });
        res.status(201).json({ success: true, data: post, message: 'Post created successfully!' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        // User can delete their own post OR an admin can delete any post
        if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this post' });
        }
        
        // Clean up notifications related to this post
        const Notification = require('../models/Notification');
        await Notification.deleteMany({ post: post._id });
        
        await post.deleteOne();
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const newComment = {
            text: req.body.text,
            user: req.user.id,
            name: req.user.fullName,
        };

        post.comments.unshift(newComment);
        await post.save();

        // --- Notification Logic ---
        // Notify post author
        if (post.user._id.toString() !== req.user.id) {
            await sendNotification(req, {
                recipient: post.user._id,
                sender: req.user.id,
                type: 'new_comment',
                post: post._id,
                contentSnippet: req.body.text.substring(0, 50) + '...',
            });
        }

        // Notify mentioned users
        const mentionedUsernames = parseMentions(req.body.text);
        if (mentionedUsernames.length > 0) {
            const mentionedUsers = await User.find({ fullName: { $in: mentionedUsernames } });
            mentionedUsers.forEach(mentionedUser => {
                if (mentionedUser._id.toString() !== post.user._id.toString() && mentionedUser._id.toString() !== req.user.id) {
                    sendNotification(req, {
                        recipient: mentionedUser._id,
                        sender: req.user.id,
                        type: 'mention_comment',
                        post: post._id,
                        contentSnippet: req.body.text.substring(0, 50) + '...',
                    });
                }
            });
        }

        res.status(201).json({ success: true, data: post.comments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
