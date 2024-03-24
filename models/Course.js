const mongoose = require('mongoose');

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
//passing the schema to mongoose.model
module.exports = mongoose.model('Course', CourseSchema);
// Path: models/Exam.js
const ExamSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  examName: {
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
    } 
  ],
  marks: [
    {
      type: Number,
      required: true,
    }
  ]
});
//passing the schema to mongoose.model
module.exports = mongoose.model('Exam', ExamSchema);
// Path: models/Quiz.js
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
    }
  ],
  marks: [
    {
      type: Number,
      required: true,
    }
  ]
});
//passing the schema to mongoose.model
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
});
//passing the schema to mongoose.model
module.exports = mongoose.model('Grade', GradeSchema);
// Path: models/Assignment.js
const mongoose = require('mongoose');
  