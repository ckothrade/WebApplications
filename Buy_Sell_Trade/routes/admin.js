const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const authorized = require('../middleware/authorized');

const router = express.Router();

// /admin/add-item => GET
router.get('/add-item', authorized, adminController.getAddItem);

// /admin/add-item => POST
router.post('/add-item', 
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    // body('time').isNumeric().trim(),
    body('category').trim().custom(value => {
      if(value.toString() === "placeholder") {
        throw new Error('Category was not selected!');
      }
      return true;
    }),
    body('description').isLength({ min: 5, max: 500}).trim()
  ],
  authorized, 
  adminController.postAddItem
);

// /admin/posts => GET
router.get('/posts', authorized, adminController.getPosts);

router.get('/edit-post/:postId', authorized, adminController.getEditPost);

router.post('/edit-post', 
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    // body('time').isNumeric().trim(),
    body('category').trim().custom(value => {
      if(value.toString() === "placeholder") {
        throw new Error('Category was not selected!');
      }
      return true;
    }),
    body('description').isLength({ min: 5, max: 500}).trim()
  ],
  authorized, 
  adminController.postEditPost
);

router.post('/delete-post', authorized, adminController.postDeletePost);

module.exports = router;