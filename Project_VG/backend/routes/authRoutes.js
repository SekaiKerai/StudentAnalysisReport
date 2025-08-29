const express = require('express');
const router = express.Router();

// Import controller
const {
  register,
  login,
  logout
} = require('../controllers/authController');

// Import validation middleware
const {
  validateRegistration,
  validateLogin
} = require('../middleware/validationMiddleware');

// Public authentication routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

module.exports = router; 