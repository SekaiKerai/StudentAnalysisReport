const express = require('express');
const router = express.Router();

// Import controller
const {
  createStudent,
  getTotalStudents,
  getStudent
} = require('../controllers/tutorController');

// Import middleware
const authenticationMiddleware = require('../middleware/authMiddleware');
const { authorizeTutor } = require('../middleware/roleMiddleware');

// All tutor routes require authentication and tutor role
router.use(authenticationMiddleware);
router.use(authorizeTutor);

// Student management routes
router.post('/students', createStudent);
router.get('/students', getTotalStudents);
router.get('/students/:id', getStudent);

module.exports = router; 