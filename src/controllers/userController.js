const UserService = require('../services/userServices');
const User = require('../models/User');


exports.createUser = async (req, res) => {
    try {
        const { username, telegramId, inviteLink } = req.body;
        
        // Create a new user instance
        const newUser = new User({
            username,
            telegramId,
            inviteLink,
            // coins and profit fields will default to 0 as per schema
        });

        // Save the user to the database
        const user = await newUser.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await UserService.getUserByUsername(req.params.username);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const { coins, profit } = req.body;
        const user = await User.findOneAndUpdate(
            { username },
            { $set: { coins, profit } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addFriend = async (req, res) => {
    try {
        const user = await UserService.addFriend(req.params.username, req.body.friendUsername);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
