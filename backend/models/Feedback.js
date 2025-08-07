const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

