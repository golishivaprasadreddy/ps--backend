import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get leaderboard (top 10 users by coins)
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find().sort({ coins: -1 });
    // Award badge to top 1 user for leaderboard
    if (allUsers.length > 0) {
      const topUser = allUsers[0];
      const leaderboardBadge = 'Quiz Top 1';
      if (!topUser.badges.includes(leaderboardBadge)) {
        topUser.badges.push(leaderboardBadge);
        await topUser.save();
      }
    }
    // Return only name and coins, sorted by coins
    res.json(allUsers.map(u => ({
      name: u.name || u.username || 'Unknown',
      coins: u.coins
    })));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
