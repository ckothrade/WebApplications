const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

// Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');

const MONGODB_URI = '';  // UPDATEHERE : add mongodb connection

const app = express();
const csrfProtection = csrf();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: 'my secret', 
      resave: false, 
      saveUninitialized: false, 
      store: store
    })
);
app.use(csrfProtection);
app.use(flash());

// For retrieving user
// NOTE*: we can run this becuase 'npm start' only registers this a middleware
// Once, our promise to listen on the server is resolved, then this will be run
// This way we know that a user will either already exist or have been created.
app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use((req, res, next) => {
  // ExpressJS feature to access resp field which is passed into rendered views
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(boardRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(); // UPDATEHERE : add port num
    })
    .catch(err => console.log(err));
