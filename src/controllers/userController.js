const User = require('../models/User');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

exports.createUser = async (req, res) => {
    try {
        const { username, email, telegramId } = req.body;

        // Check if the user already exists by email
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'This email is already taken' });

        // Check if the username already exists
        user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: 'This username is already taken' });

        // Create a new user
        user = new User({ username, email, telegramId });
        await user.save();

        // Generate a token
        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).populate('friends');
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
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addFriend = async (req, res) => {
    try {
        const { username, email, telegramId, inviteLink } = req.body;
        const user = await User.findOne({ username: req.params.username });
        const friend = await User.findOne({ username: req.body.friendUsername });
        if (!user || !friend) return res.status(404).json({ error: 'User not found' });

        user.friends.push(friend._id);
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

exports.sendTelegramMessage = async (req, res) => {
    try {
        const { username, message } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Send a message to the Telegram user
        const chatId = user.telegramId; // Assuming telegramId is stored as chatId
        bot.sendMessage(chatId, message);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(400).json({ error: error.message });
    }
};