const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.get('/:username', userController.getUserByUsername);
router.put('/:username', userController.updateUser);
router.post('/:username/add-friend', userController.addFriend);

module.exports = router;
