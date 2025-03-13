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
const uploadRouter = require('./routes/upload');
app.use('/upload', uploadRouter);

const playlistRouter = require('./routes/playlist');
app.use('/playlist', playlistRouter);

const songRouter = require('./routes/song');
app.use('/song', songRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const searchRouter = require('./routes/search');
app.use('/search', searchRouter);

// Serve Static Files
app.use('/img', express.static('uploads/images'));
app.use('/mp3', express.static('uploads/mp3s'));

// Start Server
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});