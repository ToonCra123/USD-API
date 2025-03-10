const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    songs: {
        type: Array,
        default: [],
        required: false
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);