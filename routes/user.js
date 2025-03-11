const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/:id', getUser, (req, res) => {
    res.user.password = undefined;
    res.json(res.user);
});

router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        const newUser = await User.create(user);
        newUser.password = undefined;
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', getUser, (req, res) => {
    res.user.password = undefined;
    res.json(res.user);
});

router.delete('/', getUser, async (req, res) => {
    try {
        await User.deleteOne({ username: req.body.username });
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/', getUser, async (req, res) => {
    res.user.password = req.body.newpass;
    res.user.save();
    res.json(res.user);
});

router.patch('/add-playlist', getUser, async (req, res) => {
    res.user.playlists = [...res.user.playlists, req.body.playlist];
    res.user.save();
    res.json(res.user);
});

router.patch('/remove-playlist', getUser, async (req, res) => {
    res.user.playlists = res.user.playlists.filter(playlist => playlist != req.body.playlist);
    res.user.save();
    res.json(res.user);
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (user.password != req.body.password) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    res.user = user;
    next();
}

module.exports = router;