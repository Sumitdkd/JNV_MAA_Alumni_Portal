const express = require('express');
const rateLimit = require('express-rate-limit');
const { getNotifications, markNotificationsAsRead, markOneNotificationAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

router.use(limiter);
router.use(protect);
router.route('/').get(getNotifications);
router.route('/mark-read').put(markNotificationsAsRead);
router.route('/:id/mark-read').put(markOneNotificationAsRead);
module.exports = router;