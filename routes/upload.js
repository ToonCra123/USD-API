const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

router.post('/', upload.fields([{ name: 'mp3', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
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
        mp3Path: mp3File ? mp3File.filename : null,
        imagePath: imageFile ? imageFile.filename : null
    };

    console.log(songData);

    res.json({
        message: 'Files uploaded successfully',
        mp3: mp3File ? mp3File.path : null,
        image: imageFile ? imageFile.path : null
    });
});


module.exports = router;