const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next();
};

// Sanitize HTML content
const sanitizeContent = (content) => {
    return sanitizeHtml(content, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'],
        allowedAttributes: {
            'a': ['href']
        },
        allowedIframeHostnames: []
    });
};

// User registration validation
const validateRegistration = [
    body('fullName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Full name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    
    body('batchYear')
        .isInt({ min: 1950, max: new Date().getFullYear() })
        .withMessage('Batch year must be a valid year'),
    
    body('dateOfBirth')
        .isISO8601()
        .withMessage('Date of birth must be a valid date'),
    
    body('admissionNumber')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Admission number must be less than 20 characters'),
    
    handleValidationErrors
];

// User login validation
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    
    handleValidationErrors
];

// Post creation validation
const validatePost = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    body('content')
        .trim()
        .isLength({ min: 1, max: 5000 })
        .withMessage('Content must be between 1 and 5000 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    body('category')
        .isIn(['Job Opening', 'Article', 'Event', 'News Update'])
        .withMessage('Invalid category selected'),
    
    handleValidationErrors
];

// Comment validation
const validateComment = [
    body('text')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Comment must be between 1 and 1000 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    handleValidationErrors
];

// Profile update validation
const validateProfileUpdate = [
    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Full name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name can only contain letters and spaces'),
    
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio must be less than 500 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    body('currentOrganization')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Organization name must be less than 100 characters'),
    
    body('location')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Location must be less than 100 characters'),
    
    body('linkedInProfile')
        .optional()
        .isURL()
        .withMessage('LinkedIn profile must be a valid URL'),
    
    body('instagramProfile')
        .optional()
        .isURL()
        .withMessage('Instagram profile must be a valid URL'),
    
    body('facebookProfile')
        .optional()
        .isURL()
        .withMessage('Facebook profile must be a valid URL'),
    
    body('phoneNumber')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Phone number must be a valid international format'),
    
    handleValidationErrors
];

// Group creation validation
const validateGroupCreation = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Group name must be between 3 and 50 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    handleValidationErrors
];

// Feedback validation
const validateFeedback = [
    body('subject')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Subject must be between 5 and 100 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    body('message')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Message must be between 10 and 1000 characters')
        .customSanitizer(value => sanitizeContent(value)),
    
    handleValidationErrors
];

// Password reset validation
const validatePasswordReset = [
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    
    handleValidationErrors
];

module.exports = {
    validateRegistration,
    validateLogin,
    validatePost,
    validateComment,
    validateProfileUpdate,
    validateGroupCreation,
    validateFeedback,
    validatePasswordReset,
    sanitizeContent,
    handleValidationErrors
}; 