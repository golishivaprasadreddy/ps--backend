import express from 'express';
import ForumPost from '../models/ForumPost.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// List all forum posts (newest first)
router.get('/posts', async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 }).populate('userId', 'name');
    const mapped = posts.map(p => ({
      _id: p._id,
      content: p.content,
      createdAt: p.createdAt,
      author: p.userId?.name || 'Anonymous',
      userId: p.userId?._id,
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new forum post and reward the user
router.post('/posts', async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) return res.status(400).json({ message: 'userId and content are required.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const post = new ForumPost({ userId, content });
    await post.save();

    // Reward user for posting in forum
    user.coins += 5;
    await user.save();
    const tx = new Transaction({ userId, type: 'credit', amount: 5, reason: 'Forum Post' });
    await tx.save();

    res.status(201).json({
      message: '+5 Vitacoins for forum contribution!',
      post: { _id: post._id, content: post.content, createdAt: post.createdAt, author: user.name, userId: user._id },
      coins: user.coins,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;

// Replies
router.get('/posts/:postId/replies', async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId).populate('replies.userId', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const replies = post.replies
      .sort((a,b)=> b.createdAt - a.createdAt)
      .map(r => ({ _id: r._id, content: r.content, createdAt: r.createdAt, author: r.userId?.name || 'Anonymous', userId: r.userId?._id }));
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/posts/:postId/replies', async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) return res.status(400).json({ message: 'userId and content are required.' });
    const post = await ForumPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const reply = { userId, content, createdAt: new Date() };
    post.replies.unshift(reply);
    await post.save();

    // Reward for reply (smaller amount)
    user.coins += 2;
    await user.save();
    const tx = new Transaction({ userId, type: 'credit', amount: 2, reason: 'Forum Reply' });
    await tx.save();

    res.status(201).json({ message: '+2 Vitacoins for reply!', reply: { ...reply, author: user.name }, coins: user.coins });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
