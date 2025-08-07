const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, 'Please add a full name'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [50, 'Full name cannot exceed 50 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces']
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
    validate: {
      validator: function(v) {
        // Password must contain at least one lowercase letter, one uppercase letter, and one number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v);
      },
      message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    }
  },
  admissionNumber: { 
    type: String,
    trim: true,
    maxlength: [20, 'Admission number cannot exceed 20 characters']
  },
  dateOfBirth: { 
    type: Date, 
    required: [true, 'Please add your date of birth'],
    validate: {
      validator: function(v) {
        return v <= new Date() && v >= new Date('1900-01-01');
      },
      message: 'Date of birth must be a valid date between 1900 and today'
    }
  },
  profilePicture: {
    type: String,
    default: 'no-photo.jpg',
  },
  bio: { 
    type: String, 
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    trim: true
  },
  batchYear: { 
    type: Number, 
    required: [true, 'Please add a batch year'],
    min: [1950, 'Batch year must be 1950 or later'],
    max: [new Date().getFullYear(), 'Batch year cannot be in the future']
  },
  currentOrganization: { 
    type: String,
    trim: true,
    maxlength: [100, 'Organization name cannot exceed 100 characters']
  },
  location: { 
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  linkedInProfile: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(v);
      },
      message: 'Please provide a valid LinkedIn profile URL'
    }
  },
  instagramProfile: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(v);
      },
      message: 'Please provide a valid Instagram profile URL'
    }
  },
  facebookProfile: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/.test(v);
      },
      message: 'Please provide a valid Facebook profile URL'
    }
  },
  phoneNumber: { 
    type: String, 
    select: false,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  role: { 
    type: String, 
    enum: ['alumni', 'admin'], 
    default: 'alumni' 
  },
  isApproved: { 
    type: Boolean, 
    default: false 
  },
  fcmToken: { 
    type: String, 
    select: false 
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    select: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for checking if account is locked
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to increment login attempts
UserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
UserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
    $set: { lastLogin: Date.now() }
  });
};

module.exports = mongoose.model("User", UserSchema);
