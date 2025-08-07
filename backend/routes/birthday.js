const express = require('express');

const router = express.Router();

// Simple health check endpoint - no admin required
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Birthday system is running automatically',
        data: {
            systemStatus: 'Active',
            schedule: 'Every day at 6:00 AM IST',
            timezone: 'Asia/Kolkata'
        }
    });
});

module.exports = router;
