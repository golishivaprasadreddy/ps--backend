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
    console.log('Headers:', req.headers);
    console.log('Register request body:', req.body); // Log incoming data
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
      }
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists.' });
      }
      // Create new user with 100 coins
      const user = new User({ name, email, password, coins: 100 });
      await user.save();
      res.status(201).json({
        message: 'User registered successfully. You have been awarded 100 coins!',
        coins: user.coins,
        announcement: 'All users receive 100 coins upon registration!'
      });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error.' });
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


