const express = require('express');
const router = express.Router();
const Player = require('../models/PlayerModel');
const { route } = require('./player');

// first check if the player exists, if not create a new one
router.post('/die', async (req, res) => {
    try {
        let player = await Player.findOne({ username: req.body.username });
        if (!player) {
            player = new Player({
                username: req.body.username,
                timesWon: 0,
                timesLost: 0,
                deathCount: 1
            });
            await player.save();
            return res.status(201).json(player);
        } else {
            player.deathCount += 1;
            await player.save();
            return res.status(200).json(player);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/win', async (req, res) => {
    try {
        let player = await Player.findOne({ username: req.body.username });
        if (!player) {
            player = new Player({
                username: req.body.username,
                timesWon: 1,
                timesLost: 0,
                deathCount: 0
            });
            await player.save();
            return res.status(201).json(player);
        } else {
            player.timesWon += 1;
            await player.save();
            return res.status(200).json(player);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/lose', async (req, res) => {
    try {
        let player = await Player.findOne({ username: req.body.username });
        if (!player) {
            player = new Player({
                username: req.body.username,
                timesWon: 0,
                timesLost: 1,
                deathCount: 0
            });
            await player.save();
            return res.status(201).json(player);
        } else {
            player.timesLost += 1;
            await player.save();
            return res.status(200).json(player);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const players = await Player.find({}).sort({ timesWon: -1 }).limit(10);
        res.status(200).json(players);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/player', getPlayer, (req, res) => {
    res.json(res.player);
});


async function getPlayer(req, res, next) {
    let player;
    try {
        player = await Player.findOne({ username: req.body.username });
        if (player == null) {
            return res.status(404).json({ message: 'Cannot find player' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.player = player;
    next();
}

module.exports = router;