const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, index: true },
    sender: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['new_comment', 'new_post', 'mention_comment', 'mention_chat', 'new_group_message','new_like'] },
    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
    group: { type: mongoose.Schema.ObjectId, ref: 'Group' },
    read: { type: Boolean, default: false },
    contentSnippet: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);