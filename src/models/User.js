const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    telegramId: { type: String, required: true },
    inviteLink: { type: String, unique: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', UserSchema);
