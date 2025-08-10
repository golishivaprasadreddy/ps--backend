import 'dotenv/config';
import mongoose from 'mongoose';

// Define schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true }, // index of correct option
    }
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Quiz data
const quizzes = [
  // Blockchain Basics (Easy)
  {
    title: 'Blockchain Basics',
    level: 'easy',
    questions: [
      {
        question: 'What is a blockchain?',
        options: ['A database', 'A type of cryptocurrency', 'A distributed ledger', 'A programming language'],
        correctAnswer: 2
      },
      {
        question: 'Which language is commonly used for smart contracts on Ethereum?',
        options: ['Python', 'Solidity', 'JavaScript', 'Go'],
        correctAnswer: 1
      },
      {
        question: 'What does HODL mean?',
        options: ['Hold On for Dear Life', 'Sell quickly', 'Buy low, sell high', 'Mining'],
        correctAnswer: 0
      }
    ]
  },

  // React Basics (Medium)
  {
    title: 'React Basics',
    level: 'medium',
    questions: [
      {
        question: 'React components return:',
        options: ['CSS', 'JSX', 'JSON', 'HTML files'],
        correctAnswer: 1
      },
      {
        question: 'State in React is used to:',
        options: ['Pass data down to children', 'Manage dynamic data within a component', 'Style components', 'Create routes'],
        correctAnswer: 1
      },
      {
        question: 'useEffect is used for:',
        options: ['Styling components', 'Managing side effects', 'Declaring props', 'Creating reducers'],
        correctAnswer: 1
      },
      {
        question: 'Props are:',
        options: ['Mutable configuration', 'Immutable data passed from parent', 'Global state', 'CSS classes'],
        correctAnswer: 1
      }
    ]
  },

  // Full-Stack Project (Hard)
  {
    title: 'Full-Stack Project - Quiz',
    level: 'hard',
    questions: [
      {
        question: 'A REST API typically uses which HTTP methods for CRUD?',
        options: ['GET/POST/PUT/DELETE', 'FETCH/SEND/UPDATE/REMOVE', 'OPEN/CLOSE/READ/WRITE', 'CREATE/READ/UPDATE/DELETE'],
        correctAnswer: 0
      },
      {
        question: 'JWTs are primarily used for:',
        options: ['Database queries', 'Authentication/authorization', 'Styling', 'File uploads'],
        correctAnswer: 1
      },
      {
        question: 'CORS is required when:',
        options: ['Client and server are on different origins', 'Using HTTPS', 'Serving images', 'Deploying to cloud'],
        correctAnswer: 0
      },
      {
        question: 'Which status code indicates a successful request?',
        options: ['200', '301', '404', '500'],
        correctAnswer: 0
      }
    ]
  }
];

// Seeder function
async function seedQuizzes() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Quiz.deleteMany({});
    await Quiz.insertMany(quizzes);
    console.log('✅ Quizzes seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding quizzes:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seedQuizzes();
