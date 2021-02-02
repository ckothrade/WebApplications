const Item = require('../models/item');
const fileHelper = require('../util/file');

const { validationResult } = require('express-validator/check');

exports.getAddItem = (req, res, next) => {
  res.render('admin/edit-post', {
    pageTitle: 'Add Item',
    path: '/admin/add-item',
    editing: false,
    hasError: false,
    errorMsg: null,
    validationErrors: []
  });
};

exports.postAddItem = (req, res, next) => {

  // Collect info submitted from form
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const condition = req.body.condition;
  const category = req.body.category;
  const location = req.body.location;
  const image = req.file; 

  console.log(req.body);

  // Checks image upload for errors
  if(!image) {
    return res.status(422).render('admin/edit-post', {
      pageTitle: 'Add Item',
      path: '/admin/add-item',
      editing: false,
      hasError: true,
      post: {
        title: title, 
        price: price,
        quantity: quantity, 
        description: description,
        condition: condition,
        category: category,
        location: location
      },
      errorMsg: 'Improper format for file upload!',
      validationErrors: []
    });
  }

  // Checks the request for any errors thrown by router
  const errors = validationResult(req);

  // If there is errors in creating post
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-post', {
      pageTitle: 'Add Item',
      path: '/admin/add-item',
      editing: false,
      hasError: true,
      post: {
        title: title, 
        price: price,
        quantity: quantity, 
        description: description,
        condition: condition,
        category: category,
        location: location
      },
      errorMsg: 'Error conducting database operation!',
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

  // Create new Post
  const item = new Item({
    title: title, 
    price: price,
    quantity: quantity, 
    description: description,
    condition: condition,
    category: category,
    imageUrl: imageUrl,
    location: location,
    userId: req.user
  });

  // Save post to db & redirect 
  item
    .save()
    .then(result => {
      console.log('Created Post');
      res.redirect('/admin/posts');
    })
    .catch(err => {
      console.log('Catch Block of Post Add Item save method.');

      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getPosts = (req, res, next) => {

  Item.find({ userId: req.user._id })
    .then(posts => {
      //console.log(posts);
      res.render('admin/posts', {
        posts: posts,
        pageTitle: 'My Posts',
        path: '/admin/posts'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditPost = (req, res, next) => {

  // Check query param for edit mode enabled
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  // Retrieve postId passed in query
  const postId = req.params.postId;

  // Find matching post in db and pass to editing page
  Item.findById(postId)
    .then(post => {
      if (!post) {
        return res.redirect('/');
      }
      res.render('admin/edit-post', {
        pageTitle: 'Edit Post',
        path: '/admin/edit-post',
        editing: editMode,
        post: post,
        hasError: false,
        errorMsg: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

};

exports.postEditPost = (req, res, next) => {

  // Collect info submitted from form
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedQty = req.body.quantity;
  const updatedDesc = req.body.description;
  const updatedCond = req.body.condition;
  const updatedCat = req.body.category;
  const updatedLoc = req.body.location;
  const image = req.file;

  const postId = req.body.postId;

  // Checks the request for any errors thrown by router
  const errors = validationResult(req);

  // If there is errors in creating post
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-post', {
      pageTitle: 'Edit Post',
      path: '/admin/edit-post',
      editing: true,
      hasError: true,
      post: {
        title: updatedTitle, 
        price: updatedPrice,
        quantity: updatedQty,
        description: updatedDesc,
        condition: updatedCond,
        category: updatedCat,
        location: updatedLoc,
        _id: postId
      },
      errorMsg: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Item.findById(postId)
    .then(post => {
      post.title = updatedTitle;
      post.price = updatedPrice;
      post.quantity = updatedQty;
      post.description = updatedDesc;
      post.condition = updatedCond;
      post.category = updatedCat;
      post.location = updatedLoc;
      
      // If a new image was uploaded, delete old image on file for post
      if(image) {
        fileHelper.deleteFile(post.imageUrl);
        post.imageUrl = image.path;
      }

      return post.save()
        .then(result => {
          console.log('UPDATED POST!');
          res.redirect('/admin/posts');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeletePost = (req, res, next) => {
  const postId = req.body.postId;

  // Deleting image associated with Post
  Item.findById(postId)
    .then(post => {
      if(!post) {
        return next(new Error('Post not found!'));
      }
      fileHelper.deleteFile(post.imageUrl);
      return Item.findByIdAndRemove(postId);
    })
    .then(() => {
      console.log('DESTROYED POST');
      res.redirect('/admin/posts');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};