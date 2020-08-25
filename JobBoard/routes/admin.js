// const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-post => GET
router.get('/add-post', adminController.getAddPost);

// /admin/add-post => POST
router.post('/add-post', adminController.postAddPost);

// /admin/posts => GET
router.get('/posts', adminController.getPosts);

router.get('/edit-post/:postId', adminController.getEditPost);

router.post('/edit-post', adminController.postEditPost);

router.post('/delete-post', adminController.postDeletePost);

module.exports = router;