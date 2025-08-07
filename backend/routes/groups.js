const express = require('express');
const {
    createGroup,
    getGroups,
    joinGroup,
    getGroupDetails,
    isGroupMember,
    leaveGroup,
    deleteGroup
} = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

// This route handles getting all groups and creating a new one
router.route('/')
    .get(getGroups)
    .post(createGroup);

router.route('/:id')
    .get(getGroupDetails);

router.route('/:id/isGroupMember')
    .get(isGroupMember);

router.route('/:id/join')
    .put(joinGroup);

router.route('/:id/leave')
    .put(protect, leaveGroup);

router.route('/:id')
    .delete(deleteGroup);

module.exports = router;