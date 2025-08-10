import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get leaderboard (top 10 users by coins)
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ coins: -1 }).limit(10);
    res.json(topUsers.map(u => ({
      name: u.name,
      coins: u.coins,
      badges: u.badges,
    })));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
