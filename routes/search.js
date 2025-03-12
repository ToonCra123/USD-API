const express = require('express');
const router = express.Router();
const Song = require('../models/SongModel');
const Playlist = require('../models/PlaylistModel');

router.get('/song', async (req, res) => {

    const { title, limit } = req.query;

    if (!title) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        // Find songs that match the query, limit to 10 by default
        const songs = await Song.find({ title: { $regex: title, $options: 'i' } })
                                .limit(limit ? parseInt(limit) : 10);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/artist', async (req, res) => {
    const { name, limit } = req.query;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        // Find songs that match the query, limit to 10 by default
        const songs = await Song.find({ artist: { $regex: name, $options: 'i' } })
                                .limit(limit ? parseInt(limit) : 10);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/playlist', async (req, res) => {
    const { title, limit } = req.query;

    if (!title) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        // Find playlists that match the query, limit to 10 by default
        const playlists = await Playlist.find({ title: { $regex: title, $options: 'i' } })
                                        .limit(limit ? parseInt(limit) : 10);
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;