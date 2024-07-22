const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, telegramId, inviteLink } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });

        // Create a new user
        user = new User({ username, email, password, telegramId, inviteLink });
        await user.save();

        // Generate a token
        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        // Generate a token
        const token = user.generateAuthToken();

        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
