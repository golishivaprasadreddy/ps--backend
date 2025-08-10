import 'dotenv/config';
import quizzesRoutes from './routes/quizzes.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import leaderboardRoutes from './routes/leaderboard.js';
import userRoutes from './routes/user.js';
import actionsRoutes from './routes/actions.js';
import authRoutes from './routes/auth.js';
import coinsRoutes from './routes/coins.js';
import forumRoutes from './routes/forum.js';
import coursesRoutes from './routes/courses.js';
import authMiddleware from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vitacoin';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Vitacoin backend running');
});

app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/actions', actionsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/coins', authMiddleware, coinsRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/courses', coursesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
