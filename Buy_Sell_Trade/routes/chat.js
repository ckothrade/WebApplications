const express = require('express');
const { body } = require('express-validator/check');

const chatController = require('../controllers/chat');
const authorized = require('../middleware/authorized');

const router = express.Router();

router.post('/contact', authorized, chatController.postChat);


module.exports = router;