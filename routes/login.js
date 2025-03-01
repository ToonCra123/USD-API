const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Create a new user
// Check login credentials (Read user)
// Update user information
// Delete user
// Those are the implementations needed for a proper login system. --using CRUD operations.



module.exports = router;