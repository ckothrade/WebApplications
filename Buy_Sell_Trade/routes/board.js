const express = require('express');

const boardController = require('../controllers/board');
const authorized = require('../middleware/authorized');

const router = express.Router();

router.get('/', boardController.getIndex);

router.get('/posts', boardController.getPosts); // fix this

router.get('/posts/:postId', boardController.getPost);

router.get('/bookmarks', authorized, boardController.getBookmarks);

router.post('/bookmark', authorized, boardController.postBookmark);

// router.post('/bookmarks-remove-item', authorized, boardController.postBookmarkRemove);

// router.post('/assume-post', authorized, boardController.postStub);

// router.get('/my-stubs', authorized, boardController.getStubs);

// router.get('/my-stubs/:stubId', authorized, boardController.getRecord);

module.exports = router;