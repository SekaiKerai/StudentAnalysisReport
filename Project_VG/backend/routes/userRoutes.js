const express = require('express');
const router = express.Router();

// Import controller
const {
  getAllUsers,
  getUsersByRole,
  toggleUserStatus,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Import middleware
const authenticationMiddleware = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/roleMiddleware');

// All user management routes require admin authentication
router.use(authenticationMiddleware);
router.use(authorizeAdmin);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/role/:role', getUsersByRole);
router.get('/users/:id', getUserById);
router.patch('/users/:id/toggle-status', toggleUserStatus);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router; 