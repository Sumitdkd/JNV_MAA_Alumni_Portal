const Feedback = require('../models/Feedback');

// @access  Private
exports.submitFeedback = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const feedback = await Feedback.create(req.body);
        res.status(201).json({ success: true, message: 'Feedback submitted successfully', data: feedback });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @access  Private/Admin
exports.getFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.find().populate('user', 'fullName email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
};
