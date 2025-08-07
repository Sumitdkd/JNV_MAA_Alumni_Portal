const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .populate('sender', 'fullName profilePicture')
            .populate('post', 'title _id')
            .populate('group', 'name _id')
            .sort({ createdAt: -1 })
            .limit(30);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) { res.status(500).json({ success: false, message: 'Server Error' }); }
};

exports.markNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ recipient: req.user.id, read: false }, { $set: { read: true } });
        res.status(200).json({ success: true, message: 'Notifications marked as read' });
    } catch (error) { res.status(500).json({ success: false, message: 'Server Error' }); }
};

exports.markOneNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user.id }, { $set: { read: true } });
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.status(200).json({ success: true, data: notification });
    } catch (error) { res.status(500).json({ success: false, message: 'Server Error' }); }
};

