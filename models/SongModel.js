const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
    mp3Path: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    listens: {
        type: Number,
        default: 0,
        required: false
    }
});

module.exports = mongoose.model('Song', songSchema);