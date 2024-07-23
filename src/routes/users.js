const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/create', userController.createUser);
router.get('/:username', userController.getUserByUsername);
router.put('/:username', auth, userController.updateUser);
router.post('/:username/add-friend', auth, userController.addFriend);
router.post('/:username/send-message', auth, userController.sendTelegramMessage); // New route

module.exports = router;
