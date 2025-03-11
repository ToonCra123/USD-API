const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Song = require('../models/SongModel');
const User = require('../models/UserModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.mimetype.startsWith('audio/') 
            ? path.join(__dirname, '..', 'uploads/mp3s') 
            : path.join(__dirname, '..', 'uploads/images');
        
        // Create folders if they don't exist
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});



/*


This needs to be changed with actual url when not in development


*/
let formatSongUrl = (url) => 'http://api.toonhosting.net/mp3/' + url;

let formatImgUrl = (url) => 'http://api.toonhosting.net/img/' + url;

// Holy Shit what is this
router.post('/', upload.fields([{ name: 'mp3', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    const mp3File = req.files['mp3'] ? req.files['mp3'][0] : null;
    const imageFile = req.files['image'] ? req.files['image'][0] : null;
    const jsonBody = req.body;

    if (!mp3File && !imageFile) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    const songData = {
        title: jsonBody.title,
        artist: jsonBody.artist,
        year: jsonBody.year,
        mp3Path: formatSongUrl(mp3File ? mp3File.filename : null),
        imagePath: formatImgUrl(imageFile ? imageFile.filename : null)
    };

    try {
        const newSong = await Song.create(songData);
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// now also a way to upload a profile picture
router.post('/change-pfp', upload.single('pfp'), getUser, async (req, res) => {

    if(!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.user.profilePicture = formatImgUrl(req.file.filename);
    res.user.save();
    res.user.password = undefined;
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