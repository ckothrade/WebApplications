const fs = require('fs');
const path = require('path');

const Convo = require('../models/convo');
const Item = require('../models/item');
const User = require('../models/user');

exports.postChat = (req, res, next) => {
  const postId = req.body.postId;
  const sellerId = req.body.sellerId;

  // let sellerMail;

  User.findById(sellerId)
  .then(user => {

    if(!user) {
      return next(new Error('Seller not found!'));
    }

    // sellerMail = user.email;

    console.log('postID is: ' + postId);
    console.log('sellerID is:' + sellerId);
    console.log('sellerEmail is: ' + user.email);
    console.log('buyerID is:' + req.user.id);
    console.log('buyEmail is: ' + req.user.email);
    
    const convo = new Convo({
      messages: [],
      seller: {
        email: user.email,
        userId: sellerId
      },
      buyer: {
        email: req.user.email,
        userId: req.user
      }
    });

    convo
    .save()
    .then(result => {
      console.log('Created Conversation');
      res.redirect('/posts');
    })
    .catch(err => {
      console.log('Catch Block of Post Create Convo method.');
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });



    // return post.save()
    //   .then(result => {
    //     console.log('UPDATED POST!');
    //     res.redirect('/admin/posts');
    //   });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });





  // console.log('postID is: ' + postId);
  // console.log('sellerID is:' + sellerId);
  // console.log('buyerID is:' + req.user.id);

  // const convo = new ConvolverNode({
  //   messages,
  //   seller: {
  //     email
  //   },
  //   buyer: {
  //     email: req.user.email,
  //     userId: req.user
  //   }
  // });

  // res.redirect('/posts');

  // Item.findById(postId)
  //   .then(post => {
  //     req.user.addToBookmarks(post);
  //   })
  //   .then(result => {
  //     console.log(result);
  //     res.redirect('/bookmarks');
  //   })
  //   .catch(err => {
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  //   });
};