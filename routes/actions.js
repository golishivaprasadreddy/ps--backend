import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Quiz completion reward
router.post('/quiz', async (req, res) => {
  try {
    const { userId, quizNumber } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Credit quiz coins
    user.coins += 20;
    // Track badge progress (Quiz Master)
    user.quizProgress = (user.quizProgress || 0) + 1;
    // Award badge if milestone reached
    if (user.quizProgress === 5 && !user.badges.includes('Quiz Master')) {
      user.badges.push('Quiz Master');
    }
    await user.save();
    const transaction = new Transaction({
      userId,
      type: 'credit',
      amount: 20,
      reason: `Quiz ${quizNumber} Completed`,
    });
    await transaction.save();
    res.json({ message: '+20 Vitacoins! Quiz Master progress: ' + user.quizProgress + '/5', coins: user.coins, badges: user.badges });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Forum post reward
router.post('/forum', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    user.coins += 5;
    await user.save();
    const transaction = new Transaction({
      userId,
      type: 'credit',
      amount: 5,
      reason: 'Forum Post',
    });
    await transaction.save();
    res.json({ message: '+5 Vitacoins for helping peers!', coins: user.coins });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Penalty endpoint
router.post('/penalty', async (req, res) => {
  try {
    const { userId, amount, reason } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    user.coins -= amount;
    await user.save();
    const transaction = new Transaction({
      userId,
      type: 'debit',
      amount,
      reason: reason || 'Penalty',
    });
    await transaction.save();
    res.json({ message: `Penalty: -${amount} Vitacoins. Stay on track!`, coins: user.coins });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
