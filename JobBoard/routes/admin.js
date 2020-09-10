const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const authorized = require('../middleware/authorized');

const router = express.Router();

// /admin/add-post => GET
router.get('/add-post', authorized, adminController.getAddPost);

// /admin/add-post => POST
router.post('/add-post', 
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isURL(),
    body('time').isNumeric().trim(),
    body('description').isLength({ min: 5, max: 500}).trim()
  ],
  authorized, 
  adminController.postAddPost
);

// /admin/posts => GET
router.get('/posts', authorized, adminController.getPosts);

router.get('/edit-post/:postId', authorized, adminController.getEditPost);

router.post('/edit-post', authorized, adminController.postEditPost);

router.post('/delete-post', authorized, adminController.postDeletePost);

module.exports = router;