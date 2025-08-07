const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const { uploadToCloudinary } = require("../utils/cloudinary");

// @access  Private
exports.getUsers = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 21; // Default to 21 for 3 rows of 7
    const startIndex = (page - 1) * limit;

    try {
        const { name, batchYear, currentOrganization, location } = req.query;
        const filter = { isApproved: true };

        if (name) filter.fullName = { $regex: name, $options: 'i' };
        if (batchYear && !isNaN(parseInt(batchYear))) filter.batchYear = parseInt(batchYear);
        if (currentOrganization) filter.currentOrganization = { $regex: currentOrganization, $options: 'i' };
        if (location) filter.location = { $regex: location, $options: 'i' };

        const total = await User.countDocuments(filter);
        const users = await User.find(filter)
            .sort({ createdAt: 1 })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: users.length,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit)
            },
            data: users
        });
    } catch (error) {
        console.error("Error in getUsers:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @access  Private
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || (!user.isApproved && req.user.role !== "admin")) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const fieldsToUpdate = {
            fullName: req.body.fullName,
            bio: req.body.bio,
            currentOrganization: req.body.currentOrganization,
            location: req.body.location,
            linkedInProfile: req.body.linkedInProfile,
            instagramProfile: req.body.instagramProfile,
            facebookProfile: req.body.facebookProfile,
            phoneNumber: req.body.phoneNumber,
        };

        Object.keys(fieldsToUpdate).forEach(key => {
            if (fieldsToUpdate[key] === undefined) delete fieldsToUpdate[key];
        });

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @access  Private
exports.updateProfilePicture = async (req, res) => {
    try {
        // Debug logging
        console.log('=== Profile Picture Upload Debug ===');
        console.log('Request files:', req.files);
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);

        // Check if files were uploaded
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded. Please select an image file."
            });
        }

        let profileImage;
        
        if (!req.files.profileImage) {
            console.log('Available file fields:', Object.keys(req.files));
            
            // Check for other common field names
            const possibleFields = ['profileImage', 'file', 'image', 'avatar', 'profilePicture'];
            let foundFile = null;
            
            for (const field of possibleFields) {
                if (req.files[field]) {
                    foundFile = req.files[field];
                    console.log(`Found file in field: ${field}`);
                    break;
                }
            }
            
            if (!foundFile) {
                return res.status(400).json({
                    success: false,
                    message: `No profile image file uploaded. Please select an image file with field name 'profileImage'. Available fields: ${Object.keys(req.files).join(', ')}`
                });
            }
            
            profileImage = foundFile;
        } else {
            profileImage = req.files.profileImage;
        }
        
        console.log('Profile image details:', {
            name: profileImage.name,
            size: profileImage.size,
            mimetype: profileImage.mimetype,
            tempFilePath: profileImage.tempFilePath
        });
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(profileImage.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed."
            });
        }

        // Validate file size (5MB limit)
        if (profileImage.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "File size too large. Maximum size is 5MB."
            });
        }

        // Upload to Cloudinary
        console.log('Starting Cloudinary upload...');
        const cloudinaryUrl = await uploadToCloudinary(profileImage);
        console.log('Cloudinary upload successful:', cloudinaryUrl);

        // Update user profile picture in database
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture: cloudinaryUrl },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error("Error in updateProfilePicture:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating profile picture: " + error.message
        });
    }
};

// @access  Private
exports.getTodaysBirthdays = async (req, res) => {
    try {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDay = today.getDate();

        const users = await User.find({
            isApproved: true,
            $expr: {
                $and: [
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, todayDay] },
                    { $eq: [{ $month: '$dateOfBirth' }, todayMonth] }
                ]
            }
        });

        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        console.error("Error in getTodaysBirthdays:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
// --- FUNCTION for @mention suggestions ---
exports.searchUsers = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(200).json({ success: true, data: [] });
        }


        const users = await User.find({
            fullName: { $regex: `^${query}`, $options: 'i' },
            _id: { $ne: req.user._id }
        }).select('fullName').limit(10);

        const formattedUsers = users.map(user => ({
            id: user.fullName,
            display: user.fullName
        }));

        res.status(200).json({ success: true, data: formattedUsers });
    } catch (error) {
        console.error("User search error:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// --- Admin specific controllers ---

// @access  Private/Admin
exports.getPendingRegistrations = async (req, res) => {
    try {
        const users = await User.find({ isApproved: false })
            .select('+fullName +email +batchYear +admissionNumber +dateOfBirth');

        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        console.error("Error in getPendingRegistrations:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @access  Private/Admin
exports.approveRegistration = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        try {
            await sendEmail({
                email: user.email,
                subject: `${user.fullName}, Welcome Home! Your  JNV MAA Account is Now Active 🎉`,
                message: `
    <div style="font-family:Segoe UI, Roboto, sans-serif; max-width:600px; margin:auto; padding:20px; border-radius:8px; background:#f9f9f9; color:#333;">
      
      <h2 style="color:#007bff;">Dear ${user.fullName},</h2>

      <p style="font-size:16px;">🎉 <strong>It's official</strong>, your JNV MAA Portal account has been <span style="color:green;"><strong>approved!</strong></span></p>

      <p style="font-size:15px;">For years we had no place to connect. No platform to say:  
        <br><em>"Arey uska number hai kya?"</em><br>  
        No way to wish “Happy Birthday!”<br><br>  
        But not anymore.
      </p>

      <p style="font-size:15px;">Now, we’ve got a digital *school corridor* where every Navodain, young or grown, nostalgic or curious—can find their batchmates, long-lost friends, or that one bench partner they never dared message again. 😅</p>

      <hr style="margin:20px 0; border:0; border-top:1px solid #ddd;" />

      <p style="font-size:16px;"><strong>✨ What’s waiting for you inside?</strong></p>
      <ul style="padding-left:20px; font-size:15px; line-height:1.6;">
        <li><strong>🧑‍🤝‍🧑 Alumni Directory:</strong> Connect with your old classmates or seniors</li>
        <li><strong>💬 Real-time Chats:</strong> Like old mess gossip sessions, but online.</li>
        <li><strong>📰 Community Feed:</strong> Job openings, memories, memes – sab kuch!</li>
        <li><strong>🎂 Birthday Cards:</strong> Kyunki birthday pe wish na mile toh dukh hota hai!</li>
        <li><strong>👤 Your Profile:</strong> Show what Navodain are up to (ya kya karne wale hai 👀)</li>
      </ul>

      <p style="margin:25px 0;">
        <a href="https://alumni-portal-davjjp.vercel.app" 
           style="background-color:#007bff; color:white; padding:12px 20px; 
           text-decoration:none; border-radius:5px; display:inline-block; font-weight:bold;">
          🔓 Log In to the Alumni Portal
        </a>
      </p>

      <p style="font-size:15px;">We may not wear uniforms anymore... but those <strong>samose wali yaadein</strong> are stitched into our hearts forever 💙</p>

      <p style="font-size:15px;">Welcome back to the family.</p>

      <p style="font-weight:bold; color:#444;">– With nostalgia and warmth,<br>  
      Your Navodaya Alumni Team</p>

      <hr style="margin:30px 0; border:0; border-top:1px solid #ddd;" />

      <p style="font-size:12px; color:#999;">You received this email because you signed up on our alumni portal.<br>
      If this wasn’t you, just ignore it – no dant, no detention.</p>
    </div>
  `
            });
        } catch (emailError) {
            console.error("Failed to send approval email:", emailError);
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in approveRegistration:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};