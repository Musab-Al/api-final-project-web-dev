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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    }
  ],
  // Add other fields as needed
  // passingScore and timeLimit.
  passingScore: {
    type: Number,
    required: true,
  
  },
  timeLimit: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);
