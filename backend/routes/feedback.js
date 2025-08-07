const express = require('express');
const {
    submitFeedback,
    getFeedbacks
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.use(protect);

router.route('/')
    .post(submitFeedback)
    .get(admin, getFeedbacks);

module.exports = router;
