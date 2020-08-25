// const path = require('path');

const express = require('express');

const boardController = require('../controllers/board');

const router = express.Router();

router.get('/', boardController.getIndex);

router.get('/posts', boardController.getPosts); // fix this

router.get('/posts/:postId', boardController.getPost);

router.get('/schedule', boardController.getSchedule);

router.post('/schedule', boardController.postSchedule);

router.post('/schedule-remove-job', boardController.postScheduleRemJob);

module.exports = router;