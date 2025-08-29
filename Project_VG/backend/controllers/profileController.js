const User = require('../models/User');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const Center = require('../models/Center');
const bcrypt = require('bcryptjs');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// Get current user profile
const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new UnauthenticatedError('User not found');
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        centerId: user.centerId,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      }
    }
  });
};

// Get user profile with role-specific details
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new UnauthenticatedError('User not found');
  }

  let profileData = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      centerId: user.centerId,
      isActive: user.isActive,
      lastLogin: user.lastLogin
    }
  };

  // Add role-specific data
  if (user.role === 'student') {
    const studentData = await Student.findOne({ userId: user._id });
    if (studentData) {
      profileData.student = studentData;
    }
  } else if (user.role === 'tutor') {
    const tutorData = await Tutor.findOne({ userId: user._id });
    if (tutorData) {
      profileData.tutor = tutorData;
    }
  }

  // Add center information if applicable
  if (user.centerId) {
    const centerData = await Center.findById(user.centerId);
    if (centerData) {
      profileData.center = centerData;
    }
  }

  res.status(200).json({
    success: true,
    data: profileData
  });
};

// Update user profile
const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new UnauthenticatedError('User not found');
  }

  // Update allowed fields
  if (name) user.name = name;
  if (phone) user.phone = phone;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        centerId: user.centerId
      }
    }
  });
};

// Change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new BadRequestError('Please provide current and new password');
  }

  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    throw new UnauthenticatedError('User not found');
  }

  // Verify current password
  const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentPasswordCorrect) {
    throw new UnauthenticatedError('Current password is incorrect');
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  user.password = hashedNewPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
};

module.exports = {
  getCurrentUser,
  getUserProfile,
  updateProfile,
  changePassword
}; 