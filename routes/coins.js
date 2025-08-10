import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Daily coin claim endpoint
router.post('/claim-daily', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Check last claim
    const lastClaim = await Transaction.findOne({
      userId,
      reason: 'Daily Claim',
    }).sort({ createdAt: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (lastClaim && lastClaim.createdAt >= today) {
      return res.status(400).json({ message: 'Already claimed daily coins today.' });
    }

    // Credit daily coins
    user.coins += 10;
    await user.save();
    const transaction = new Transaction({
      userId,
      type: 'credit',
      amount: 10,
      reason: 'Daily Claim',
    });
    await transaction.save();
    res.json({ message: '10 Vitacoins claimed!', coins: user.coins });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
