import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get leaderboard (top 10 users by coins)
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ coins: -1 }).limit(10);
    // Award badge to top 1 user for leaderboard
    if (topUsers.length > 0) {
      const topUser = topUsers[0];
      const leaderboardBadge = 'Quiz Top 1';
      if (!topUser.badges.includes(leaderboardBadge)) {
        topUser.badges.push(leaderboardBadge);
        await topUser.save();
      }
    }
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
