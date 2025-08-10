import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number // index of correct option
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quiz', quizSchema);
