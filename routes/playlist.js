const express = require('express');
const router = express.Router();
const Playlist = require('../models/PlaylistModel');

router.post('/create', async (req, res) => {
    const playlist = new Playlist({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const newPlaylist = await playlist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', getPlaylist, async (req, res) => {
    if (req.body.title != null) {
        res.playlist.title = req.body.title;
    }

    if (req.body.description != null) {
        res.playlist.description = req.body.description;
    }

    if (req.body.song != null) {
        res.playlist.songs = [...res.playlist.songs, req.body.song];
    }

    try {
        const updatedPlaylist = await res.playlist.save();
        res.json(updatedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/:id', getPlaylist, (req, res) => {
    res.json(res.playlist);
});

async function getPlaylist(req, res, next) {
    let playlist
    try {
        playlist = await Playlist.findById(req.params.id)
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
  
    res.playlist = playlist
    next()
}

module.exports = router;