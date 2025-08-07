const express = require('express');
const path = require('path');

const {
    getUsers,
    getUser,
    updateProfile,
    getPendingRegistrations,
    approveRegistration,
    deleteUser,
    updateProfilePicture,
    getTodaysBirthdays,
    searchUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

// important routes
// All routes below are protected by default
router.use(protect);


// Route to get all users (with pagination)
router.route('/')
    .get(getUsers);

// Route for @mention user search. MUST come before /:id
router.route('/search')
    .get(searchUsers);

// Route to update the logged-in user's profile text data
router.route('/profile')
    .put(updateProfile);

// Route to update the logged-in user's profile picture using Cloudinary
router.route('/profile/picture')
    .put(updateProfilePicture)
    .post(updateProfilePicture);  // post method bhi hona chahiye @raajesh ke hisab se

// Route to get today's birthdays
router.route('/birthdays/today')
    .get(getTodaysBirthdays);


// --- Admin Only Routes ---

// Route for admin to get pending user registrations
router.route('/pending')
    .get(admin, getPendingRegistrations);

// Route for admin to approve a user
router.route('/approve/:id')
    .put(admin, approveRegistration);

// Route for admin to get or delete a specific user. This MUST be last.
router.route('/:id')
    .get(admin, getUser)
    .delete(admin, deleteUser);

module.exports = router;
