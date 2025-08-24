import mongoose from 'mongoose';
import User from '../models/User.js';

// Connect to your MongoDB (update URI as needed)
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

async function fixUsernames() {
  const users = await User.find({ username: { $exists: false } });
  for (const user of users) {
    // Generate a username from name or email
    let base = user.name || user.email || 'user';
    base = base.replace(/\s+/g, '').toLowerCase();
    user.username = base + Math.floor(Math.random() * 10000);
    await user.save();
    console.log(`Fixed user: ${user._id} -> ${user.username}`);
  }
  console.log('All users fixed!');
  mongoose.disconnect();
}

fixUsernames();
