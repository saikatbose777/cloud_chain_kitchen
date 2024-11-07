// app.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// User-related routes
app.use('/api/users', require('./routes/userRoutes'));

// Basic test route
app.get('/', (req, res) => {
  res.send('Welcome to Cloud Chain Kitchen Backend!');
});

// Connect to MongoDB and then start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
});
