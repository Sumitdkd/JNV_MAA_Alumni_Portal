const Group = require('../models/Group');
const User = require('../models/User');
const { sendPushNotification } = require('../utils/pushNotification');

// Creates a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ success: false, message: 'Please provide a name and description.' });
        }

        const group = await Group.create({
            name,
            description,
            creator: req.user.id,
            members: [req.user.id],
        });
        res.status(201).json({ success: true, data: group });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Gets all groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate('creator', 'fullName')
            .populate('members', '_id fullName profilePicture');
        res.status(200).json({ success: true, data: groups });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
// Leave a group
exports.leaveGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found.' });
        }

        // Remove the user from the members array
        group.members = group.members.filter(memberId => memberId.toString() !== req.user.id.toString());

        await group.save();
        res.status(200).json({ success: true, data: group, message: 'Successfully left the group.' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
// Joins the current user to a group
exports.joinGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found.' });
        }

        const existingGroupMembersIds = group.members.map((member) =>
            member.toString()
        );
        console.log("Existing Group Members IDs:", existingGroupMembersIds);

        // Check if user is already a member
        if (group.members.includes(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "You are already a member of this group."
            });
        }

        // Add user to group
        group.members.push(req.user.id);
        await group.save();

        // Send notifications to existing members (excluding the new member)
        if (existingGroupMembersIds.length > 0) {
            for (const memberId of existingGroupMembersIds) {
                const user = await User.findById(memberId).select("+fcmToken +email");
                if (user && user.fcmToken) {
                    const notificationSent = await sendPushNotification(
                        memberId,
                        "New Member Joined",
                        `${req.user.fullName} has joined the group ${group.name}`
                    );
                    
                    if (notificationSent) {
                        console.log(
                            `Push notification sent to ${memberId} with email ${user.email} for joining group ${group.name}`
                        );
                    }
                }
            }
        }

        res.status(200).json({
            success: true,
            data: group,
            message: 'Successfully joined group!'
        });
    } catch (error) {
        console.error("Error in joinGroup:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Gets details for a single group
exports.getGroupDetails = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found.' });
        }
        res.status(200).json({ success: true, data: group });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// checks if the user is a member of the group
exports.isGroupMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found.' });
        }
        const isMember = group.members.includes(req.user.id);
        res.status(200).json({ success: true, isMember });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a group (admin only)
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found.' });
        }
        
        // Only admin can delete groups
        if (req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete groups.' });
        }
        
        // Clean up notifications related to this group
        const Notification = require('../models/Notification');
        await Notification.deleteMany({ group: group._id });
        
        // Clean up messages related to this group
        const Message = require('../models/Message');
        await Message.deleteMany({ group: group._id });
        
        await group.deleteOne();
        res.status(200).json({ success: true, message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};