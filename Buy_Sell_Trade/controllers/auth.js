const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: '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'
    }
  })
); 

exports.getLogin = (req, res, next) => {
  // Implemeneted because error value will always be an empty 
  // array regardless if an error occurs.
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMsg: message,
    storedInput: {
      email: '', 
      password: ''
    },
    validationErrors: []
  });
};


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Checks the request for any errors thrown by router
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login', 
      pageTitle: 'Login',
      errorMsg: errors.array()[0].msg,
      storedInput: {
        email: email, 
        password: password
      },
      validationErrors: errors.array()
    });
  }

  User.findOne({email: email})
    .then(user => {
      // User was not found
      if(!user) {
        return res.status(422).render('auth/login', {
          path: '/login', 
          pageTitle: 'Login',
          errorMsg: 'Invalid email or password!',
          storedInput: {
            email: email, 
            password: password
          },
          validationErrors: []
        });
      }

      // Validates password
      bcrypt.compare(password, user.password)
        .then(matchResult => {
          if(matchResult) { // Returns true if passwords match
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          
          // Passwords did not match
          return res.status(422).render('auth/login', {
            path: '/login', 
            pageTitle: 'Login',
            errorMsg: 'Invalid Password',
            storedInput: {
              email: email, 
              password: password
            },
            validationErrors: []
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMsg: message,
    storedInput: {
      email: '', 
      password: '', 
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Checks the request for any errors thrown by router
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMsg: errors.array()[0].msg,
      storedInput: {
        email: email, 
        password: password, 
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }

  // Encrypts password, 2nd value is salt value (rounds of hashing)
  bcrypt.hash(password, 12)
    // A nested then block is used bcuz of workflow when prev if statement executes
    .then(hashPassword => {
      // New User
      const user = new User({
        email: email,
        password: hashPassword,
        bookmarks: {items: []}
      });

      return user.save();
    })
    .then(result => {
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: 'brewerjames414@gmail.com',
        subject: 'New Account',
        html: '<h1>Successful Signup!</h1>'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMsg: message
  });
};

exports.postReset = (req, res, next) => {

  // Create a reset Token
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset'); // Could flash an error here!
    }

    const token = buffer.toString('hex');

    User.findOne({email: req.body.email})
      .then(user => {

        // No account found
        if(!user) {
          req.flash('error', 'No account found under provided email!');
          return res.redirect('/reset');
        }

        // Account found, assign token to account
        user.resetToken = token;
        user.resetTokenExp = Date.now() + 3600000; // +1hr in ms
        return user.save();
      })
      .then(result => {
        // Redirect & send reset email
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'brewerjames414@gmail.com',
          subject: 'Password Reset',
          html: `
            <p>Your account has requested a password reset!</p>
            <p>Click <a href="http://localhost:8088/reset/${token}">here</a> to reset your password...</p>
          `
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  // Retrieve token from url
  const token = req.params.token;
  User.findOne({resetToken: token, resetTokenExp: {$gt: Date.now()}})
    .then(user => {

      // --------------------------------------------------------------------------------
      //********************************************************************************
      // check if user is null (resetToken expired?)
      //----------------------------------------------------------------------------------
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
    
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMsg: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  let acctHolder;

  User.findOne({
      resetToken: passwordToken, 
      resetTokenExp: {$gt: Date.now()}, 
      _id: userId
    })
    .then(user => {
      acctHolder = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashPassword => {
      acctHolder.password = hashPassword;
      acctHolder.resetToken = undefined;
      acctHolder.resetTokenExp = undefined;

      return acctHolder.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};