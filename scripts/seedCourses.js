import 'dotenv/config';
import mongoose from 'mongoose';

// ====== SCHEMA ======
const resourceSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const topicSchema = new mongoose.Schema({
  title: String,
  type: String,
  content: String,
  contentUrl: String,
  summary: String,
  objectives: [String],
  estimatedMinutes: Number,
  codeSnippet: String,
  resources: [resourceSchema],
  tips: [String],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  level: String,
  isProgram: Boolean,
  topics: [topicSchema],
});

const Course = mongoose.model('Course', courseSchema);

// ====== DATA ======
const courses = [

  // --- Detailed Learning Program ---
  {
    title: 'JavaScript Fundamentals',
    description: 'Learn variables, functions, and core JS concepts.',
    level: 'beginner',
    isProgram: false,
    topics: [
      {
        title: 'Variables',
        type: 'text',
        content: 'In modern JS, prefer const for values that never reassign; use let for values that do change. Avoid var due to function scoping and hoisting pitfalls.\n\nScope: let/const are block-scoped, meaning they exist only within curly braces. This makes code easier to reason about.\n\nHoisting: Declarations are hoisted, but let/const are in a temporal dead zone until initialized. Accessing them before the declaration triggers a ReferenceError.\n\nImmutability: const prevents reassignment of the binding, not deep immutability of objects. Consider Object.freeze for shallow immutability.\n\nExamples:\nconst name = \'Ada\';\nlet count = 1;\ncount += 1;\n\nBest practices: default to const, use let when necessary, avoid global variables, and keep variables localized to their usage.',
        summary: 'Declaring and scoping variables',
        objectives: ['Use let/const appropriately', 'Understand block scope', 'Avoid var hoisting pitfalls'],
        estimatedMinutes: 9,
        codeSnippet: `let age = 30; const name = 'Ada';`,
        resources: [
          { label: 'MDN let', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' },
          { label: 'YouTube: let vs const', url: 'https://www.youtube.com/watch?v=sjyJBL5fkp8' }
        ],
        tips: ['Prefer const by default', 'Use let when value changes']
      },
      {
        title: 'Functions',
        type: 'text',
        content: 'Functions are reusable blocks of logic. In JS, functions are first-class citizens—pass them as arguments, return them, and store them in variables.\n\nDeclarations vs expressions: function add(a,b){return a+b;} vs const add = (a,b) => a+b;\n\nArrow functions: concise syntax, lexical this, and great for callbacks.\n\nParameters & defaults: function greet(name = "friend"){ return `Hello, ${name}` }\n\nHigher-order functions: map, filter, reduce enable expressive data transformations.\n\nPure vs impure: prefer pure functions for predictability and testability.',
        summary: 'Ways to declare functions',
        objectives: ['Write arrow functions', 'Differentiate declaration vs expression', 'Use HOFs'],
        estimatedMinutes: 10,
        codeSnippet: `const add = (a,b) => a + b;`,
        resources: [
          { label: 'MDN Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions' },
          { label: 'YouTube: JS Functions', url: 'https://www.youtube.com/watch?v=8dWL3wF_OMw' }
        ],
        tips: ['Use descriptive names', 'Keep functions small']
      },
    ],
  },
  {
    title: 'React Fundamentals',
    description: 'Components, props, state, and hooks.',
    level: 'intermediate',
    isProgram: false,
    topics: [
      {
        title: 'Components & JSX',
        type: 'text',
        content: 'Components are reusable UI units. JSX lets you write HTML-like syntax in JS.\n\nFunctional components: functions that return JSX.\n\nProps: inputs to components.\n\nComposition: build complex UIs from small parts.\n\nJSX rules: one root element, expressions inside braces, className instead of class, fragments for grouping.',
        summary: 'JSX basics',
        objectives: ['Create components', 'Write JSX'],
        estimatedMinutes: 9,
        codeSnippet: `function Hello(){ return <div>Hello</div>; }`,
        resources: [
          { label: 'YouTube: React Components', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' }
        ],
      },
      {
        title: 'State & Props',
        type: 'text',
        content: 'State represents changing data; props are read-only inputs from parent to child.\n\nuseState returns a pair: value and a setter. Update state with the setter; do not mutate directly.\n\nProps drilling vs context: pass only what is needed; consider Context for global data.',
        summary: 'State vs props',
        objectives: ['Use useState', 'Pass props'],
        estimatedMinutes: 10,
        codeSnippet: `const [count,setCount]=useState(0);`,
        resources: [
          { label: 'YouTube: useState', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0' }
        ],
      },
      {
        title: 'useEffect',
        type: 'text',
        content: 'useEffect runs after render and handles side effects: data fetching, subscriptions, timers.\n\nDependencies: decide when the effect runs. Cleanup: return a function to clean up subscriptions or timers.\n\nAvoid infinite loops by specifying stable dependencies.',
        summary: 'Effects in React',
        objectives: ['Run effects', 'Cleanup'],
        estimatedMinutes: 10,
        codeSnippet: `useEffect(()=>{document.title='Hi'; return ()=>{};},[]);`,
        resources: [
          { label: 'YouTube: useEffect', url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U' }
        ],
      },
    ],
  },
  {
    title: 'Full-Stack Project',
    description: 'A mini program combining backend and frontend.',
    level: 'advanced',
    isProgram: true,
    topics: [
      { title: 'Backend API', type: 'text', content: 'Design RESTful endpoints...', summary: 'API design', objectives: ['Define routes', 'Secure with JWT'], estimatedMinutes: 12, resources: [{ label: 'YouTube: REST APIs', url: 'https://www.youtube.com/watch?v=lsMQRaeKNDk' }] },
      { title: 'Frontend UI', type: 'text', content: 'Compose your UI with small components...', summary: 'UI build', objectives: ['Compose components', 'Style with Tailwind'], estimatedMinutes: 10, resources: [{ label: 'YouTube: Tailwind Crash Course', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' }] },
      { title: 'Integrations', type: 'text', content: 'Connect frontend to backend via fetch/axios...', summary: 'Frontend <-> Backend', objectives: ['Call APIs', 'Handle errors'], estimatedMinutes: 10, resources: [{ label: 'YouTube: Axios Guide', url: 'https://www.youtube.com/watch?v=6LyagkoRWYA' }] },
    ],
  },
  {
    title: 'Node.js Crash Course',
    description: 'Quick start with Node.js modules, HTTP, and Express.',
    level: 'beginner',
    isProgram: false,
    topics: [
      { title: 'What is Node?', type: 'text', content: 'Node.js lets you run JavaScript outside the browser...', summary: 'Server-side JS runtime', objectives: ['Understand Node runtime', 'Use npm'], estimatedMinutes: 8, resources: [{ label: 'YouTube: Node Crash Course', url: 'https://www.youtube.com/watch?v=f2EqECiTBL8' }] },
      { title: 'HTTP Server', type: 'video', contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'Build a basic HTTP server', estimatedMinutes: 7, resources: [{ label: 'YouTube version', url: 'https://www.youtube.com/watch?v=F3w7kF-UbF0' }] },
      { title: 'Express Intro', type: 'video', contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', summary: 'Using Express for routing', estimatedMinutes: 8, resources: [{ label: 'YouTube version', url: 'https://youtu.be/SccSCuHhOw0' }] },
    ],
  },
  {
    title: 'MongoDB Essentials',
    description: 'Collections, documents, queries, and Mongoose.',
    level: 'intermediate',
    isProgram: false,
    topics: [
      { title: 'Documents & Collections', type: 'text', content: 'MongoDB uses flexible JSON-like documents...', summary: 'Core MongoDB concepts', objectives: ['Define collections', 'Insert documents'], estimatedMinutes: 9, resources: [{ label: 'YouTube: MongoDB Basics', url: 'https://www.youtube.com/watch?v=ofme2o29ngU' }] },
      { title: 'Mongoose Models', type: 'video', contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', summary: 'Schemas and models', estimatedMinutes: 10, resources: [{ label: 'YouTube version', url: 'https://www.youtube.com/watch?v=DZBGEVgL2eE' }] },
      { title: 'Queries & Indexes', type: 'text', content: 'Write queries to filter and sort...', summary: 'Query patterns', objectives: ['Write find queries', 'Create indexes'], estimatedMinutes: 10, resources: [{ label: 'YouTube: MongoDB Indexes', url: 'https://www.youtube.com/watch?v=AdUOD4h3qC8' }] },
    ],
  },
];

// ====== RUN SEED ======
async function run() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log('✅ Seeded all courses!');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
