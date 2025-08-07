const express = require('express');
const { getMessagesForGroup, postMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);
router.route('/:groupId').get(getMessagesForGroup).post(postMessage);

module.exports = router;