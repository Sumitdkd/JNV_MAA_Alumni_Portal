const cloudinary = require("../config/cloudinary");
const fs = require('fs');

const uploadToCloudinary = async (file) => {
  try {
    // For express-fileupload
    const filePath = file.tempFilePath || file.path;
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "alumni_portal_profiles",
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      width: 512, // Resize to max 512px width
      height: 512, // Resize to max 512px height
      crop: "limit", // Do not upscale, keep aspect ratio
      quality: "auto:good", // Let Cloudinary choose good compression
      fetch_format: "auto" 
    });
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    return result.secure_url;
  } catch (error) {
    const filePath = file.tempFilePath || file.path;
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error("Error uploading to Cloudinary: " + error.message);
  }
};

module.exports = { uploadToCloudinary };
