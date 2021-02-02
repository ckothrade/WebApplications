const express = require('express');
const { check, body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', 
  [
    body('email')
      .isEmail()
      .withMessage('Needs to be a valid email address!')
      .normalizeEmail(),
    body('password')
      .isLength({min: 4})
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

// Validators are grouped in an array for cleanliness
router.post(
  '/signup', 
  [
    check('email')
    .isEmail()
    .withMessage('Please Enter a Valid Email')
    .custom((value, {req}) => {
      
      // Check if there is already an account established (asynchronously)
      return User.findOne({email: value})
        .then(user => {
          if(user) {
            return Promise.reject('There is already an account on file for this email!');
          }
        });
    })
    .normalizeEmail(),
    
    // An alternative way to write a test where only the body is checked
    body('password', 'Please enter only an Alphanumeric password with 3 or more characters!')
      .isLength({min: 4})
      .isAlphanumeric()
      .trim(),

    body('confirmPassword')
      .custom((value, {req}) => {
        if(value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }

        return true;
      })
      .trim()
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;