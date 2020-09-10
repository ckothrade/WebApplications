const express = require('express');

const boardController = require('../controllers/board');
const authorized = require('../middleware/authorized');

const router = express.Router();

router.get('/', boardController.getIndex);

router.get('/posts', boardController.getPosts); // fix this

router.get('/posts/:postId', boardController.getPost);

router.get('/schedule', authorized, boardController.getSchedule);

router.post('/schedule', authorized, boardController.postSchedule);

router.post('/schedule-remove-job', authorized, boardController.postScheduleRemJob);

module.exports = router;