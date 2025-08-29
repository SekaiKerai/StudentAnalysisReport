const express = require('express');
const router = express.Router();

// Import controller
const {
  getCurrentUser,
  getUserProfile,
  updateProfile,
  changePassword
} = require('../controllers/profileController');

// Import middleware
const authenticationMiddleware = require('../middleware/authMiddleware');
const {
  validateProfileUpdate,
  validatePasswordChange
} = require('../middleware/validationMiddleware');

// All profile routes require authentication
router.use(authenticationMiddleware);

// Profile routes
router.get('/me', getCurrentUser);
router.get('/profile', getUserProfile);
router.patch('/profile', validateProfileUpdate, updateProfile);
router.patch('/change-password', validatePasswordChange, changePassword);

module.exports = router; 