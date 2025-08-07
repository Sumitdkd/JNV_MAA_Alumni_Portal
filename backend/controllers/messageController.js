const Message = require('../models/Message');
const Group = require('../models/Group');
const User = require('../models/User');
const { parseMentions, sendNotification } = require('../utils/notificationManager');

exports.getMessagesForGroup = async (req, res) => {
    try {
        const messages = await Message.find({ group: req.params.groupId })
            .populate('sender', 'fullName profilePicture')
            .sort('createdAt');
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.postMessage = async (req, res) => {
    const { text } = req.body;
    const { groupId } = req.params;
    const senderId = req.user.id;

    try {
        // 1. Create and save the message
        const message = await Message.create({ group: groupId, sender: senderId, text });
        const populatedMessage = await Message.findById(message._id).populate('sender', 'fullName profilePicture batchYear');

        // 2. Broadcast the new message to all clients in the group room
        req.io.to(groupId).emit('receive_message', populatedMessage);

        // 3. Handle notifications for mentions
        const group = await Group.findById(groupId);
        const mentionedUsernames = parseMentions(text);
        if (mentionedUsernames.length > 0) {
            const mentionedUsers = await User.find({ fullName: { $in: mentionedUsernames } });
            mentionedUsers.forEach(mentionedUser => {
                // Ensure the user is in the group and not the sender
                if (mentionedUser._id.toString() !== senderId && group.members.includes(mentionedUser._id)) {
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

        res.status(201).json({ success: true, data: populatedMessage });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
