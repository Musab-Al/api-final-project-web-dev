const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  assignmentName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  isUpcoming: {
    type: Boolean,
    default: false,
  },
});

AssignmentSchema.pre('save', function (next) {
  this.isUpcoming = this.dueDate > new Date();
  next();
});

module.exports = mongoose.model('Assignment', AssignmentSchema);

// Path: models/Course.js
const CourseSchema = new mongoose.Schema({
  
  courseName: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  semester: {
    type: String,
    required: true,
  },
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    },
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    },
  ],
  grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grade',
    },
  ],
});