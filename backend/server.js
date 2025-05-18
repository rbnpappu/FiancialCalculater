const express = require('express');
const cors = require('cors');
const connectDB = require('./lib/connectDB');
const routes = require('./route/route'); // Correct path to your route file

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json()); // Important for parsing JSON request bodies

// Connect to DB
connectDB();

// Use your routes
app.use('/api/user', routes); // Use your route file correctly

// Test root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
