const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Grade', GradeSchema);
