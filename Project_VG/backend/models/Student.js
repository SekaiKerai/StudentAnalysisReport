const mongoose = require('mongoose');
const { Schema } = mongoose;

const academicRecordSchema = new Schema({
  term: { type: String, required: true },        // e.g., "Term 1", "Monthly", etc.
  date: { type: Date, required: true },
  grades: {
    math: { type: Number, default: 0 },
    english: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    // Add more subjects as needed
  },
  remarks: { type: String }
}, { _id: false });

const feedbackSchema = new Schema({
  date: { type: Date, required: true },
  tutorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  feedbackText: { type: String },
  skills: {
    communication: { type: String },   // e.g., "Excellent", "Good"
    leadership: { type: String },
    participation: { type: String }
  }
}, { _id: false });

const scholarshipSchema = new Schema({
  scholarshipName: { type: String },
  amount: { type: Number },
  awardedOn: { type: Date },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  remarks: { type: String }
}, { _id: false });

const studentSchema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  centerId: { type: String, ref: 'Center', required: true },

  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  guardianName: { type: String },
  admissionDate: { type: Date },

  academicRecords: [academicRecordSchema],
  feedbackHistory: [feedbackSchema],
  scholarships: [scholarshipSchema],

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Tutor who created
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
