const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) { cb(null, 'uploads/'); },
    filename(req, file, cb) { cb(null, `post-${Date.now()}${path.extname(file.originalname)}`); }
});
const upload = multer({ storage });

const {
    getPosts,
    createPost,
    // updatePost,
    deletePost,
    addComment,
    getPostById,
    likePost
    // approvePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.use(protect);

router.route('/')
    .get(getPosts)
    .post(createPost);

router.route('/:id/comment').post(addComment);

// router.route('/pending')
//     .get(admin, getPendingPosts);

// router.route('/approve/:id')
//     .put(admin, approvePost);
router.route('/:id/like').put(protect, likePost);

router.route('/:id').get(protect, getPostById).delete(protect, deletePost);


module.exports = router;

