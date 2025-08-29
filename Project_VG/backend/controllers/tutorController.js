const Student = require('../models/Student');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// Create a new student
const createStudent = async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    phone, 
    centerId,
    dateOfBirth,
    gender,
    address,
    guardianName
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('User with this email already exists');
  }

  // Create user account for the student
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'student',
    phone,
    centerId
  });

  // Create student record
  const student = await Student.create({
    userId: user._id,
    centerId,
    dateOfBirth,
    gender,
    address,
    guardianName,
    admissionDate: new Date(),
    createdBy: req.user.id // Tutor who created the student
  });

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        centerId: user.centerId
      },
      student: {
        id: student._id,
        userId: student.userId,
        centerId: student.centerId,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        address: student.address,
        guardianName: student.guardianName,
        admissionDate: student.admissionDate,
        createdBy: student.createdBy
      }
    }
  });
};

// Get all students
const getTotalStudents = async (req, res) => {
  const students = await Student.find({})
    .populate('userId', 'name email phone role')
    .populate('centerId', 'name address')
    .populate('createdBy', 'name');

  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

// Get single student by ID
const getStudent = async (req, res) => {
  const { id } = req.params;

  const student = await Student.findById(id)
    .populate('userId', 'name email phone role')
    .populate('centerId', 'name address')
    .populate('createdBy', 'name');

  if (!student) {
    throw new BadRequestError('Student not found');
  }

  res.status(200).json({
    success: true,
    data: student
  });
};

module.exports = {
  createStudent,
  getTotalStudents,
  getStudent
}; 