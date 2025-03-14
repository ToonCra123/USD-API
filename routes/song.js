const express = require('express');
const router = express.Router();
const Song = require('../models/SongModel');

router.get('/:id', getSong, (req, res) => {
    res.song.listens += 1;
    res.song.save();
    res.json(res.song);
});

router.get('/:id/:shouldListen', getSong, (req, res) => {
    if (req.params.shoudListen === 'true') {
        res.song.listens += 1;
        res.song.save();
    }
    res.json(res.song);
});

async function getSong(req, res, next) {
    let song
    try {
        song = await Song.findById(req.params.id)
        if (song == null) {
            return res.status(404).json({ message: 'Cannot find song' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
  
    res.song = song
    next()
}

module.exports = router;