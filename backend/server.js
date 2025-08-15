const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple routes for demo
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Sample tasks route
app.get('/api/tasks', (req, res) => {
  const sampleTasks = [
    { id: 1, title: 'Complete project setup', completed: false },
    { id: 2, title: 'Review code', completed: true },
    { id: 3, title: 'Deploy application', completed: false }
  ];
  res.json(sampleTasks);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
