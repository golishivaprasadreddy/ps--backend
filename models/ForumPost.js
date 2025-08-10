import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
});

const forumPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

export default mongoose.model('ForumPost', forumPostSchema);
