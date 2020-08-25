const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

// Routes
const adminRoutes = require('./routes/admin');
const boardRoutes = require('./routes/board');

const app = express();
// const store = new MongoDBStore({
//     uri: MONGODB_URI,
//     collection: 'sessions'
//   });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//     session({
//       secret: 'my secret', 
//       resave: false, 
//       saveUninitialized: false, 
//       store: store
//     })
// );

// For retrieving user
// NOTE*: we can run this becuase 'npm start' only registers this a middleware
// Once, our promise to listen on the server is resolved, then this will be run
// This way we know that a user will either already exist or have been created.
app.use((req, res, next) => {
    User.findById('5f3ce46b1d7c0b3b88e41303')
        .then(user => {
            // Stores our retrieved user in the request
            req.user = user; 
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(boardRoutes);

app.use(errorController.get404);

mongoose.connect('')
    .then(result => {
        User.findOne().then(user => {
            if(!user) {
                const user = new User({
                    name: 'Cal',
                    email: 'cal@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        
        app.listen(8088);
    })
    .catch(err => console.log(err));