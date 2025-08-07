const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { validateRegistration, validateLogin, validatePasswordReset } = require('../middleware/validationMiddleware');

// @access  Public
exports.register = async (req, res) => {
    try {
        const { fullName, email, password, batchYear, admissionNumber, dateOfBirth } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User with this email already exists' 
            });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
            batchYear,
            admissionNumber,
            dateOfBirth
        });

        res.status(201).json({ 
            success: true, 
            message: 'Registration successful. Please wait for admin approval.' 
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed',
                errors: errors
            });
        }
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: 'User with this email already exists' 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Server error during registration' 
        });
    }
};

// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // Find user and include login attempt fields
        const user = await User.findOne({ email: email.toLowerCase() })
            .select('+password +loginAttempts +lockUntil');

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Check if account is locked
        if (user.isLocked) {
            return res.status(423).json({ 
                success: false, 
                message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.' 
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            // Increment login attempts
            await user.incLoginAttempts();
            
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Reset login attempts on successful login
        await user.resetLoginAttempts();

        if (!user.isApproved) {
            return res.status(403).json({ 
                success: false, 
                message: 'Your account has not been approved by an admin yet.' 
            });
        }

        return sendTokenResponse(user, 200, res);

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error during login' 
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide an email address' 
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Send a success response even if user not found to prevent email enumeration
            return res.status(200).json({ 
                success: true, 
                message: 'If an account with that email exists, a password reset link has been sent.' 
            });
        }

        // Create reset token that expires in 10 minutes
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '10m' });

        // Create reset url
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333;">🔒 Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">
            You recently requested to reset your password. Click the button below to proceed.
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" clicktracking=off style="background-color:rgb(160, 42, 233); color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
                Reset Password
            </a>
        </div>
        <p style="font-size: 14px; color: #888;">
            This link will expire in <strong>10 minutes</strong>. If you did not request a password reset, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #aaa; text-align: center;">
            If the button above doesn't work, copy and paste the following link into your browser:<br/>
            <a href="${resetUrl}" style="color:rgb(7, 115, 248);">${resetUrl}</a>
        </p>
    </div>
`;

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        });

        res.status(200).json({ 
            success: true, 
            message: 'If an account with that email exists, a password reset link has been sent.' 
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        // Don't reveal server errors, send a generic success message
        res.status(200).json({ 
            success: true, 
            message: 'If an account with that email exists, a password reset link has been sent.' 
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetToken = req.params.resettoken;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a new password' 
            });
        }

        const decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }

        // Set new password
        user.password = password;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: 'Password reset successful' 
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ 
                success: false, 
                message: 'Token has expired' 
            });
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Password validation failed',
                errors: errors
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Server error during password reset' 
        });
    }
};

// @access  Private
exports.getMe = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('+phoneNumber +instagramProfile');
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            data: user 
        });
    } catch (error) {
        console.error("GetMe Error:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Reduced from 30d to 7d for better security
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    });
};
