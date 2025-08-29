const mongoose = require('mongoose');

// Analytics Snapshot Schema
const analyticsSnapshotSchema = new mongoose.Schema({
  averageGrades: {
    math: {
      type: Number,
      min: [0, 'Average cannot be negative'],
      max: [100, 'Average cannot exceed 100']
    },
    science: {
      type: Number,
      min: [0, 'Average cannot be negative'],
      max: [100, 'Average cannot exceed 100']
    },
    english: {
      type: Number,
      min: [0, 'Average cannot be negative'],
      max: [100, 'Average cannot exceed 100']
    },
    socialStudies: {
      type: Number,
      min: [0, 'Average cannot be negative'],
      max: [100, 'Average cannot exceed 100']
    },
    hindi: {
      type: Number,
      min: [0, 'Average cannot be negative'],
      max: [100, 'Average cannot exceed 100']
    },
    computerScience: {
      type: Number,
      min: [0, 'Average cannot be negative'],
      max: [100, 'Average cannot exceed 100']
    }
  },
  overallAverage: {
    type: Number,
    min: [0, 'Overall average cannot be negative'],
    max: [100, 'Overall average cannot exceed 100']
  },
  topPerformers: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    name: String,
    averageScore: Number,
    class: String
  }],
  attendanceStats: {
    totalStudents: {
      type: Number,
      default: 0
    },
    averageAttendance: {
      type: Number,
      min: [0, 'Average attendance cannot be negative'],
      max: [100, 'Average attendance cannot exceed 100']
    }
  },
  skillDevelopmentStats: {
    leadership: {
      excellent: { type: Number, default: 0 },
      good: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      needsImprovement: { type: Number, default: 0 },
      poor: { type: Number, default: 0 }
    },
    communication: {
      excellent: { type: Number, default: 0 },
      good: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      needsImprovement: { type: Number, default: 0 },
      poor: { type: Number, default: 0 }
    },
    participation: {
      excellent: { type: Number, default: 0 },
      good: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      needsImprovement: { type: Number, default: 0 },
      poor: { type: Number, default: 0 }
    }
  },
  scholarshipStats: {
    totalScholarships: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    pendingScholarships: {
      type: Number,
      default: 0
    },
    approvedScholarships: {
      type: Number,
      default: 0
    }
  },
  tutorPerformance: {
    totalTutors: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      min: [1, 'Average rating must be at least 1'],
      max: [5, 'Average rating cannot exceed 5']
    }
  }
}, { timestamps: true });

// Main Centre Report Schema
const centreReportSchema = new mongoose.Schema({
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: [true, 'Center reference is required']
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Submitter reference is required']
  },
  reportTitle: {
    type: String,
    required: [true, 'Report title is required'],
    trim: true,
    maxlength: [200, 'Report title cannot be more than 200 characters']
  },
  reportType: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Annual', 'Custom'],
    required: [true, 'Report type is required'],
    default: 'Monthly'
  },
  period: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    }
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    maxlength: [2000, 'Summary cannot be more than 2000 characters'],
    trim: true
  },
  keyHighlights: [{
    type: String,
    maxlength: [300, 'Highlight cannot be more than 300 characters']
  }],
  challenges: [{
    type: String,
    maxlength: [300, 'Challenge cannot be more than 300 characters']
  }],
  recommendations: [{
    type: String,
    maxlength: [300, 'Recommendation cannot be more than 300 characters']
  }],
  analyticsSnapshot: analyticsSnapshotSchema,
  exportedPdfUrl: {
    type: String,
    trim: true
  },
  exportedExcelUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Reviewed', 'Approved', 'Rejected'],
    default: 'Draft'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewComments: {
    type: String,
    maxlength: [1000, 'Review comments cannot be more than 1000 characters']
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
centreReportSchema.index({ centerId: 1 });
centreReportSchema.index({ submittedBy: 1 });
centreReportSchema.index({ 'period.startDate': -1 });
centreReportSchema.index({ 'period.endDate': -1 });
centreReportSchema.index({ status: 1 });
centreReportSchema.index({ reportType: 1 });
centreReportSchema.index({ createdAt: -1 });

// Virtual for calculating report duration
centreReportSchema.virtual('duration').get(function() {
  if (!this.period || !this.period.startDate || !this.period.endDate) {
    return 0;
  }
  
  const start = new Date(this.period.startDate);
  const end = new Date(this.period.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

// Virtual for getting formatted period
centreReportSchema.virtual('formattedPeriod').get(function() {
  if (!this.period || !this.period.startDate || !this.period.endDate) {
    return '';
  }
  
  const start = new Date(this.period.startDate).toLocaleDateString();
  const end = new Date(this.period.endDate).toLocaleDateString();
  
  return `${start} - ${end}`;
});

// Ensure virtuals are serialized
centreReportSchema.set('toJSON', { virtuals: true });
centreReportSchema.set('toObject', { virtuals: true });

// Pre-save middleware to calculate analytics if not provided
centreReportSchema.pre('save', async function(next) {
  if (!this.analyticsSnapshot || !this.analyticsSnapshot.averageGrades) {
    try {
      // This would be populated by the service layer when generating reports
      // For now, we'll just ensure the structure exists
      if (!this.analyticsSnapshot) {
        this.analyticsSnapshot = {};
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model('CentreReport', centreReportSchema); 