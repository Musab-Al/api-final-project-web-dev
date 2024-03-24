const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  quizName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: { // In minutes
    type: Number,
    required: true,
  },
  // Add schema fields for questions and answers (implementation depends on your quiz format)
  questions: [
    {
      type: String,
      required: true,
    },
    {
      type: String,
      required: true,
    },
    {
      type: String,
      required: true,
    }
  ],
  answers: [
      
    {
      type: String,
      required: true,
    }
  ],
  results: [
    {
      type: String,
      required: true,
    },
    {
      type: String,
      required: true,
    }
  ],
  results: [
    {
      type: String,
      required: true,
    }   
  ]
 
});

module.exports = mongoose.model('Quiz', QuizSchema);
// Path: models/Grade.js
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
})
module.exports = mongoose.model('Grade', GradeSchema);
// Path: models/Assignment.js
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
})
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
    grades: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',   
        }
    ],
    exams: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        }
    ],
    token: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Course', CourseSchema);
// Path: models/Exam.js
const mongoose = require('mongoose');







