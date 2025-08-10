import 'dotenv/config';
import mongoose from 'mongoose';
import Course from '../models/Course.js';

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/vitacoin';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const docs = [
    {
      title: 'JavaScript Basics',
      description: 'Learn variables, functions, and control flow.',
      level: 'beginner',
      isProgram: false,
      topics: [
        { 
          title: 'Intro to JS', 
          type: 'text', 
          content: 'JavaScript is a versatile, prototype-based language that runs in every modern browser and on servers via Node.js. It powers interactive UIs, APIs, and tooling.\n\nA brief history: JS began in 1995 at Netscape, evolving rapidly with ECMAScript standards (ES5, ES6+) introducing modules, classes, async/await, and more. Today, JS is ubiquitous across the stack.\n\nWhere it runs: In browsers (via the JS engine), in Node.js (V8), in Deno/Bun, and even in embedded environments. Combined with HTML/CSS, JS manipulates the DOM, listens for events, fetches data, and renders views.\n\nSyntax and types: JS has dynamic typing, first-class functions, closures, objects and arrays, and a rich standard library. You will commonly use let/const, arrow functions, template strings, destructuring, spread/rest, and modules.\n\nEcosystem: npm packages, bundlers (Vite, Webpack), frameworks (React, Vue, Svelte), and backend frameworks (Express, Fastify).\n\nBy the end of this topic, you will be able to explain where JS runs, why it is so popular, and what modern JS looks like in practice.\n\nExample:\nconsole.log("Hello, JavaScript!");',
          summary: 'What is JavaScript and where it runs',
          objectives: ['Understand what JS is', 'Know where JS executes', 'Recognize modern syntax'],
          estimatedMinutes: 10,
          imageUrl: '',
          codeSnippet: `// Hello JS\nconsole.log('Hello, JS');`,
          resources: [
            { label: 'MDN JS Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
            { label: 'YouTube: JS for Beginners', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' }
          ],
          tips: ['Try in the browser console', 'Use console.log for quick checks']
        },
        { 
          title: 'Variables', 
          type: 'text', 
          content: 'In modern JS, prefer const for values that never reassign; use let for values that do change. Avoid var due to function scoping and hoisting pitfalls.\n\nScope: let/const are block-scoped, meaning they exist only within curly braces. This makes code easier to reason about.\n\nHoisting: Declarations are hoisted, but let/const are in a temporal dead zone until initialized. Accessing them before the declaration triggers a ReferenceError.\n\nImmutability: const prevents reassignment of the binding, not deep immutability of objects. Consider Object.freeze for shallow immutability.\n\nExamples:\nconst name = \'Ada\';\nlet count = 1;\ncount += 1;\n\nBest practices: default to const, use let when necessary, avoid global variables, and keep variables localized to their usage.\n\nBy the end, you can choose the correct declaration keyword and explain scope/hoisting trade-offs.',
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
          content: 'Functions are reusable blocks of logic. In JS, functions are first-class citizens—pass them as arguments, return them, and store them in variables.\n\nDeclarations vs expressions: function add(a,b){return a+b;} vs const add = (a,b) => a+b;\n\nArrow functions: concise syntax, lexical this, and great for callbacks.\n\nParameters & defaults: function greet(name = \"friend\"){ return `Hello, ${name}` }\n\nHigher-order functions: map, filter, reduce enable expressive data transformations.\n\nPure vs impure: prefer pure functions for predictability and testability.\n\nBy the end, you can define, call, and compose functions effectively.',
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
        { title: 'Components & JSX', type: 'text', content: 'Components are reusable UI units. JSX lets you write HTML-like syntax in JS.\n\nFunctional components: functions that return JSX.\n\nProps: inputs to components.\n\nComposition: build complex UIs from small parts.\n\nJSX rules: one root element, expressions inside braces, className instead of class, fragments for grouping.\n\nBy the end, you can write simple components and compose them.', summary: 'JSX basics', objectives: ['Create components', 'Write JSX'], estimatedMinutes: 9, codeSnippet: `function Hello(){ return <div>Hello</div>; }`, resources: [{ label: 'YouTube: React Components', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' }] },
        { title: 'State & Props', type: 'text', content: 'State represents changing data; props are read-only inputs from parent to child.\n\nuseState returns a pair: value and a setter. Update state with the setter; do not mutate directly.\n\nProps drilling vs context: pass only what is needed; consider Context for global data.\n\nBy the end, you can manage local component state and pass data down via props.', summary: 'State vs props', objectives: ['Use useState', 'Pass props'], estimatedMinutes: 10, codeSnippet: `const [count,setCount]=useState(0);`, resources: [{ label: 'YouTube: useState', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0' }] },
        { title: 'useEffect', type: 'text', content: 'useEffect runs after render and handles side effects: data fetching, subscriptions, timers.\n\nDependencies: decide when the effect runs. Cleanup: return a function to clean up subscriptions or timers.\n\nAvoid infinite loops by specifying stable dependencies.\n\nBy the end, you can write effects that fetch data and clean up properly.', summary: 'Effects in React', objectives: ['Run effects', 'Cleanup'], estimatedMinutes: 10, codeSnippet: `useEffect(()=>{document.title='Hi'; return ()=>{};},[]);`, resources: [{ label: 'YouTube: useEffect', url: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U' }] },
      ],
    },
    {
      title: 'Full-Stack Project',
      description: 'A mini program combining backend and frontend.',
      level: 'advanced',
      isProgram: true,
      topics: [
        { title: 'Backend API', type: 'text', content: 'Design RESTful endpoints around resources. Use proper HTTP verbs (GET/POST/PUT/PATCH/DELETE), handle validation, and centralize error handling.\n\nAuthentication: JWT for stateless auth. Secure routes with middleware and store hashed passwords.\n\nDocumentation: OpenAPI helps consumers integrate.\n\nBy the end, you can outline a small API with auth and validation.', summary: 'API design', objectives: ['Define routes', 'Secure with JWT'], estimatedMinutes: 12, resources: [{ label: 'YouTube: REST APIs', url: 'https://www.youtube.com/watch?v=lsMQRaeKNDk' }] },
        { title: 'Frontend UI', type: 'text', content: 'Compose your UI with small components, manage state, and style using Tailwind utility classes.\n\nAccessibility: use semantic HTML and ARIA when needed.\n\nResponsiveness: rely on Tailwind breakpoints and flexible layouts.\n\nBy the end, you can structure a small app UI.', summary: 'UI build', objectives: ['Compose components', 'Style with Tailwind'], estimatedMinutes: 10, resources: [{ label: 'YouTube: Tailwind Crash Course', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' }] },
        { title: 'Integrations', type: 'text', content: 'Connect frontend to backend via fetch/axios, handle loading and error states, and implement optimistic updates when appropriate.\n\nSecurity: handle tokens securely and avoid exposing secrets.\n\nBy the end, you can wire UI to API endpoints with robust UX.', summary: 'Frontend <-> Backend', objectives: ['Call APIs', 'Handle errors'], estimatedMinutes: 10, resources: [{ label: 'YouTube: Axios Guide', url: 'https://www.youtube.com/watch?v=6LyagkoRWYA' }] },
      ],
    },
    {
      title: 'Node.js Crash Course',
      description: 'Quick start with Node.js modules, HTTP, and Express.',
      level: 'beginner',
      isProgram: false,
      topics: [
        { title: 'What is Node?', type: 'text', content: 'Node.js lets you run JavaScript outside the browser using the V8 engine.\n\nIt excels at I/O-bound workloads thanks to its event loop and non-blocking APIs.\n\nnpm: the package manager for JS. Learn init, install, run scripts.\n\nBy the end, you can explain why Node is great for APIs and tooling.', summary: 'Server-side JS runtime', objectives: ['Understand Node runtime', 'Use npm'], estimatedMinutes: 8, resources: [{ label: 'YouTube: Node Crash Course', url: 'https://www.youtube.com/watch?v=f2EqECiTBL8' }] },
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
        { title: 'Documents & Collections', type: 'text', content: 'MongoDB uses flexible JSON-like documents (BSON).\n\nDesign schemas around application use cases, not strict relational modeling.\n\nCollections group related documents.\n\nBy the end, you can model basic data in MongoDB.', summary: 'Core MongoDB concepts', objectives: ['Define collections', 'Insert documents'], estimatedMinutes: 9, resources: [{ label: 'YouTube: MongoDB Basics', url: 'https://www.youtube.com/watch?v=ofme2o29ngU' }] },
  { title: 'Mongoose Models', type: 'video', contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', summary: 'Schemas and models', estimatedMinutes: 10, resources: [{ label: 'YouTube version', url: 'https://www.youtube.com/watch?v=DZBGEVgL2eE' }] },
        { title: 'Queries & Indexes', type: 'text', content: 'Write queries to filter and sort. Create indexes to speed up reads at the cost of write overhead.\n\nMonitor with explain() and optimize selectively.\n\nBy the end, you can perform CRUD operations and index hot paths.', summary: 'Query patterns', objectives: ['Write find queries', 'Create indexes'], estimatedMinutes: 10, resources: [{ label: 'YouTube: MongoDB Indexes', url: 'https://www.youtube.com/watch?v=AdUOD4h3qC8' }] },
      ],
    },
  ];

  await Course.deleteMany({});
  await Course.insertMany(docs);
  console.log('Seeded courses with topics.');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
