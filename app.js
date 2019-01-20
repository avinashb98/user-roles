require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

require('./config/db');

// Initializing express app
const app = express();

// Routes
const userRoutes = require('./src/routes/userRoutes');

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

// Router Initialization
app.get('/api/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to User-Roles API'
  });
});

// Handle User Endpoints
app.use('/api/user/', userRoutes);

module.exports = app;
