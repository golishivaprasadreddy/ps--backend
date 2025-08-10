import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET is not set. Please configure it in your .env');
}
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, coins: 100 });
    await user.save();
    const transaction = new Transaction({
      userId: user._id,
      type: 'credit',
      amount: 100,
      reason: 'Welcome Gift',
    });
    await transaction.save();
    // Issue JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registration successful! 100 Vitacoins credited.', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful!', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
