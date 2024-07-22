const User = require('../models/User');

exports.createUser = async ({ username, telegramId, inviteLink }) => {
    const user = new User({ username, telegramId, inviteLink });
    return user.save();
};

exports.getUserByUsername = async (username) => {
    return User.findOne({ username }).populate('friends');
};

exports.updateUser = async (username, updateData) => {
    return User.findOneAndUpdate(
        { username },
        { $set: updateData },
        { new: true }
    );
};

 

