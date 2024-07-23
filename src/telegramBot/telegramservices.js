const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Welcome message
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! I am your bot.');
});

// Echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

// Handle polling errors
bot.on('polling_error', (error) => {
    console.error('Polling error:', error.code, error.message);
});

// Handle any other bot errors
bot.on('error', (error) => {
    console.error('Bot error:', error);
});

module.exports = bot;
