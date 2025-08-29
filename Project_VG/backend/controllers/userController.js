const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

// Get users by role (Admin only)
const getUsersByRole = async (req, res) => {
  const { role } = req.params;
  
  if (!['student', 'tutor', 'admin'].includes(role)) {
    throw new BadRequestError('Invalid role specified');
  }
  
  const users = await User.find({ role }).select('-password');
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

// Toggle user status (Admin only)
const toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  
  user.isActive = !user.isActive;
  await user.save();
  
  res.status(200).json({
    success: true,
    message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  });
};

// Get user by ID (Admin only)
const getUserById = async (req, res) => {
  const { id } = req.params;
  
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new BadRequestError('User not found');
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
};

// Update user (Admin only)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role, centerId } = req.body;
  
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  
  // Update allowed fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (role) user.role = role;
  if (centerId !== undefined) user.centerId = centerId;
  
  await user.save();
  
  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      centerId: user.centerId
    }
  });
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  
  await User.findByIdAndDelete(id);
  
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
};

module.exports = {
  getAllUsers,
  getUsersByRole,
  toggleUserStatus,
  getUserById,
  updateUser,
  deleteUser
}; 