const express = require('express');
const router = express.Router();
const Login = require('../models/LoginModel');

// Get one user (I will remove this later)
router.get('/', getLogin, (req, res) => {
    res.login.password = undefined;
    res.json(res.login)
});

router.get('/all', async (req, res) => {
    try {
        const logins = await Login.find()
        res.json(logins)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Create a new user
router.post('/register', async (req, res) => {
    const login = new Login({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newLogin = await Login.create(login)
        newLogin.password = undefined;
        res.status(201).json(newLogin)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});
// Check login credentials (Read user)
router.post('/login', (req, res) => {
    res.send('Login');
});
// Update user information
router.patch('/update', getLogin, async (req, res) => {
    res.login.password = req.body.newpass;
    res.login.save();
    res.json(res.login);
});
// Delete user
// Those are the implementations needed for a proper login system. --using CRUD operations.
router.delete('/delete', getLogin, async (req, res) => {
    try {
        await Login.deleteOne({ username: req.body.username });
        res.status(200).json({ message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// Middleware
async function getLogin(req, res, next) {
    let login
    try {
        login = await Login.findOne({ username: req.body.username })
        if (login == null) {
            return res.status(404).json({ message: 'Cannot find login' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    if (req.body.password !== login.password) {
        return res.status(401).json({ message: 'Invalid password' })
    }
  
    res.login = login
    next()
}



module.exports = router;