// Setup Pre-requisites
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Port
const PORT = process.env.PORT || 3000;

// Connect to Database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Middleware
app.use(cors())
app.use(express.json());

// Routes
const playerRouter = require('./routes/player');
app.use('/player', playerRouter);

// Start Server
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});