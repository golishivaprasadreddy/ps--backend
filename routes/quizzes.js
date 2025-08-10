import express from 'express';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get quizzes by level
router.get('/', async (req, res) => {
  try {
    const { level } = req.query;
    const filter = level ? { level } : {};
    const quizzes = await Quiz.find(filter);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Submit quiz answers and reward coins
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });
    const total = quiz.questions.length || 0;
    const percent = total ? Math.round((score / total) * 100) : 0;
    // Only issue quiz (award coins & progress) if percent >= 80
    let coins = 0;
    let passed = percent >= 80;
    if (passed) {
      // Reward coins based on score and level (existing logic but only on pass)
      if (score === quiz.questions.length) {
        if (quiz.level === 'easy') coins = 10;
        else if (quiz.level === 'medium') coins = 20;
        else if (quiz.level === 'hard') coins = 30;
      } else {
        coins = score * 2; // partial reward on pass
      }
      user.coins += coins;
      user.quizProgress = (user.quizProgress || 0) + 1;
      // Badge logic
      if (user.quizProgress === 5 && !user.badges.includes('Quiz Master')) {
        user.badges.push('Quiz Master');
      }
      if (user.coins >= 1000 && !user.badges.includes('Super Achiever')) {
        user.badges.push('Super Achiever');
      }
      await user.save();
      const transaction = new Transaction({
        userId,
        type: 'credit',
        amount: coins,
        reason: `Quiz Completed (${quiz.level})`,
      });
      await transaction.save();
      return res.json({ message: `Passed with ${percent}%. +${coins} Vitacoins! Progress: ${user.quizProgress}/5`, coins: user.coins, badges: user.badges, score, percent, passed });
    }

    // Not passed: no coins or progress
    return res.json({ message: `Score ${percent}%. Need at least 80% to pass.`, coins: user.coins, badges: user.badges, score, percent, passed });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
