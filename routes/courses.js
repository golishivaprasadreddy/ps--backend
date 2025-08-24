import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// List all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single course (with topics)
router.get('/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Complete a topic within a course
router.post('/complete-topic', async (req, res) => {
  try {
    const { userId, courseId, topicIndex } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    if (topicIndex < 0 || topicIndex >= (course.topics?.length || 0)) return res.status(400).json({ message: 'Invalid topic.' });

    const key = courseId.toString();
    const progressArr = Array.isArray(user.courseProgress.get(key)) ? user.courseProgress.get(key) : [];
    if (!progressArr.includes(topicIndex)) {
      progressArr.push(topicIndex);
      user.courseProgress.set(key, progressArr);
      // reward small coins for each topic
      const topicCoins = 10;
      user.coins += topicCoins;
      await user.save();
      await new Transaction({ userId, type: 'credit', amount: topicCoins, reason: `Topic Completed: ${course.title} - ${course.topics[topicIndex].title}` }).save();
    }

    // If all topics completed, optionally award course completion badge/coins via existing /complete route or here
    const total = course.topics?.length || 0;
    const completed = (user.courseProgress.get(key) || []).length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    res.json({
      message: 'Topic marked as completed',
      progress: { completed, total, percent },
      coins: user.coins,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Complete a course: award coins and badges
router.post('/complete', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    // Award coins based on level
    const levelCoins = { beginner: 30, intermediate: 50, advanced: 80 };
    const coins = levelCoins[course.level] || 30;
    user.coins += coins;

    // Track completed courses count
    user.completedCourses = (user.completedCourses || 0) + 1;

    // Badge for program completion
    if (course.isProgram && !user.badges.includes('Program Finisher')) {
      user.badges.push('Program Finisher');
    }
    // Badge for 5 courses completed
    if (user.completedCourses === 5 && !user.badges.includes('Course Champion')) {
      user.badges.push('Course Champion');
    }
    if (user.coins >= 1000 && !user.badges.includes('Super Achiever')) {
      user.badges.push('Super Achiever');
    }
    // Badge for completing this course
    const courseBadge = `Course Completed: ${course.title}`;
    if (!user.badges.includes(courseBadge)) {
      user.badges.push(courseBadge);
    }
    await user.save();

    const tx = new Transaction({ userId, type: 'credit', amount: coins, reason: `Course Completed: ${course.title}` });
    await tx.save();

  // Include topic progress percent when responding
  const key = courseId.toString();
  const total = course.topics?.length || 0;
  const completed = (user.courseProgress.get(key) || []).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  res.json({ message: `+${coins} Vitacoins! Courses: ${user.completedCourses}`, coins: user.coins, badges: user.badges, progress: { completed, total, percent } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
