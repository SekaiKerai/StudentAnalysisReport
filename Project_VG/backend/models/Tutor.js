const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: [true, 'Center reference is required']
  },
  joiningDate: {
    type: Date,
    required: [true, 'Joining date is required'],
    default: Date.now
  },
  qualifications: {
    type: String,
    trim: true,
    maxlength: [200, 'Qualifications cannot be more than 200 characters']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
    trim: true
  },
  specialization: [{
    type: String,
    enum: ['Mathematics', 'English', 'Science', 'Leadership', 'Community Awareness', 'Arts', 'Sports', 'Other'],
    default: ['Other']
  }],
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative'],
    default: 0
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CentreReport'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  performanceRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 3
  },
  totalStudents: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
tutorSchema.index({ centerId: 1 });
tutorSchema.index({ userId: 1 });
tutorSchema.index({ isActive: 1 });

module.exports = mongoose.model('Tutor', tutorSchema); 