import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Get user profile and stats
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({
      name: user.name,
      email: user.email,
      coins: user.coins,
      badges: user.badges,
  completedCourses: user.completedCourses || 0,
      quizProgress: user.quizProgress || 0,
  courseProgress: user.courseProgress || {},
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get transaction history
router.get('/:userId/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
