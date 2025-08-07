const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: [true, 'Please add a title'], trim: true },
    content: { type: String, required: [true, 'Please add content'] },
    //images: [{ type: String }],
    category: { type: String, required: true, enum: ['Job Opening', 'Article', 'Event', 'News Update'] },
    isApproved: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    comments: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
            text: { type: String, required: true },
            name: { type: String }, // To display name even if user is deleted
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);