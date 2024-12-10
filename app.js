const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./route/authroutes'); // Correct path and file name
const db = require('./config/db.js'); // Ensure db.js is properly configured



dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Updated: Express has built-in body-parser as of 4.16+
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
