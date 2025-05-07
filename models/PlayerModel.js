const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    timesWon: {
        type: Number,
        default: 0
    },
    timesLost: {
        type: Number,
        default: 0
    },
    deathCount: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Player', playerSchema);