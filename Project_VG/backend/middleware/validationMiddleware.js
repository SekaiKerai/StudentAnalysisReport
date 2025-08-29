const { BadRequestError } = require('../errors');

// Validate registration data
const validateRegistration = (req, res, next) => {
  const { name, email, password, role, phone, centerId } = req.body;

  if (!name || !email || !password || !role || !phone) {
    throw new BadRequestError('Please provide all required fields: name, email, password, role, phone');
  }

  if (!['student', 'tutor', 'admin'].includes(role)) {
    throw new BadRequestError('Role must be student, tutor, or admin');
  }

  if (role !== 'admin' && !centerId) {
    throw new BadRequestError('Center ID is required for students and tutors');
  }

  if (password.length < 6) {
    throw new BadRequestError('Password must be at least 6 characters long');
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new BadRequestError('Please provide a valid email address');
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    throw new BadRequestError('Please provide a valid 10-digit phone number');
  }

  next();
};

// Validate login data
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new BadRequestError('Please provide a valid email address');
  }

  next();
};

// Validate profile update data
const validateProfileUpdate = (req, res, next) => {
  const { name, phone } = req.body;

  if (name && name.trim().length === 0) {
    throw new BadRequestError('Name cannot be empty');
  }

  if (phone && !/^[0-9]{10}$/.test(phone)) {
    throw new BadRequestError('Please provide a valid 10-digit phone number');
  }

  next();
};

// Validate password change data
const validatePasswordChange = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new BadRequestError('Please provide current and new password');
  }

  if (newPassword.length < 6) {
    throw new BadRequestError('New password must be at least 6 characters long');
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange
}; 