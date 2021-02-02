const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const { v4: uuidv4 } = require("uuid");
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const errorController = require('./controllers/error');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const chatRoutes = require('./routes/chat');

console.log(process.env.NODE_ENV);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jjlqz.mongodb.net/${process.env.MONGO_DB}`;

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

// Set storage configuration for filename & path
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "." + file.originalname.split(".")[1]);
  }
});

// Set file filter acceptable filetype uploads
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true); // Accepted
  } else {
    cb(null, false); // Denied
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), 
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
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

app.use((req, res, next) => {
  // ExpressJS feature to access resp field which is passed into rendered views
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// For retrieving user
// NOTE*: we can run this becuase 'npm start' only registers this a middleware
// Once, our promise to listen on the server is resolved, then this will be run
// This way we know that a user will either already exist or have been created.
app.use((req, res, next) => {
    //throw new Error('dummy sess');
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {

        if(!user) { // Incase there is an error and the user is not found
          return next();
        }

        req.user = user; // Store user in request
        next();
      })
      .catch(err => { // Catches technical errors related to db
        // Cant throw a new error inside of a then/catch block
        //throw new Error(err);

        next(new Error(err));
      }); 
  });

app.use('/admin', adminRoutes);
app.use(boardRoutes);
app.use(chatRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500); // Server-side
app.use(errorController.get404); // Catch all 

// Error middleware, executed when err is thrown in next()
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render('500', { 
    pageTitle: 'Server Side Error', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});


mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT || 8088);
    })
    .catch(err => console.log(err));
