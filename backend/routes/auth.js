const express = require('express');
const RateLimit = require('express-rate-limit');
const { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration, validateLogin, validatePasswordReset } = require('../middleware/validationMiddleware');
const router = express.Router();

// Rate limiting configurations
const registerLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 registration attempts per windowMs
    message: 'Too many registration attempts from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

const loginLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 login attempts per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

const forgotPasswordLimiter = RateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 password reset requests per hour
    message: 'Too many password reset requests from this IP, please try again after an hour.',
    standardHeaders: true,
    legacyHeaders: false,
});

const resetPasswordLimiter = RateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 password reset attempts per hour
    message: "Too many password reset attempts from this IP, please try again after an hour.",
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply validation middleware to routes
router.post('/register', registerLimiter, validateRegistration, register);
router.post('/login', loginLimiter, validateLogin, login);
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
router.put('/reset-password/:resettoken', resetPasswordLimiter, validatePasswordReset, resetPassword);
router.get('/me', protect, getMe);

module.exports = router;

