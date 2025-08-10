import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  badges: [{ type: String }],
  completedCourses: { type: Number, default: 0 },
  quizProgress: { type: Number, default: 0 },
  // courseProgress: { [courseId]: [topicIndex,...] }
  courseProgress: { type: Map, of: [Number], default: {} },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
