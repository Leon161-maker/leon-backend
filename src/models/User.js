const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    telegramId: { type: String, required: true },
    inviteLink: { type: String, unique: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Method to generate auth token
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

module.exports = mongoose.model('User', UserSchema);