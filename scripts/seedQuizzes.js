import 'dotenv/config';
import mongoose from 'mongoose';
import Quiz from '../models/Quiz.js';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vitacoin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quizzes = [
  // JavaScript Basics (Easy)
  {
    title: 'JavaScript Basics - Quiz',
    level: 'easy',
    questions: [
      {
        question: 'Which keyword declares a block-scoped variable in JavaScript?',
        options: ['var', 'let', 'function', 'class'],
        correctAnswer: 1
      },
      {
        question: 'const declares:',
        options: ['A mutable variable', 'An immutable binding', 'A function', 'A string'],
        correctAnswer: 1
      },
      {
        question: 'Arrow functions are commonly used to:',
        options: ['Create classes', 'Bind this lexically', 'Import modules', 'Create HTML'],
        correctAnswer: 1
      },
      {
        question: 'Which is a valid array literal?',
        options: ['{}', '() => {}', '[]', 'new Object()'],
        correctAnswer: 2
      }
    ]
  },
  // React Fundamentals (Medium)
  {
    title: 'React Fundamentals - Quiz',
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

async function seed() {
  await Quiz.deleteMany({});
  await Quiz.insertMany(quizzes);
  console.log('Dummy quizzes seeded!');
  mongoose.disconnect();
}

seed();
