const Post = require('../models/post');

const { validationResult } = require('express-validator/check');

exports.getAddPost = (req, res, next) => {
  res.render('admin/edit-post', {
    pageTitle: 'Add Post',
    path: '/admin/add-post',
    editing: false,
    hasError: false,
    errorMsg: null,
    validationErrors: []
  });
};

exports.postAddPost = (req, res, next) => {

  // Collect info submitted from form
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const time = req.body.time;
  const duration = req.body.duration;
  const slots = req.body.slots;
  const description = req.body.description;

  // Checks the request for any errors thrown by router
  const errors = validationResult(req);

  // If there is errors in creating post
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('admin/edit-post', {
      pageTitle: 'Add Post',
      path: '/admin/edit-post',
      editing: false,
      hasError: true,
      post: {
        title: title, 
        imageUrl: imageUrl, 
        time: time, 
        duration: duration, 
        slots: slots, 
        description: description
      },
      errorMsg: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  // Create new Post
  const post = new Post({
    title: title,
    time: time,
    duration: duration,
    slots: slots,
    description: description,
    imageUrl: imageUrl
    //userId: req.user
  });

  // Save post to db & redirect 
  post
    .save()
    .then(result => {
      console.log('Created Post');
      res.redirect('/admin/posts');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      console.log(posts);
      res.render('admin/posts', {
        posts: posts,
        pageTitle: 'Admin Posts',
        path: '/admin/posts'
      });
    })
    .catch(err => console.log(err));
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
  Post.findById(postId)
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
    .catch(err => console.log(err));

};

exports.postEditPost = (req, res, next) => {
  // Collect info submitted from form
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedTime = req.body.time;
  const updatedDuration = req.body.duration;
  const updatedSlots = req.body.slots;
  const updatedDesc = req.body.description;

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
        imageUrl: updatedImageUrl, 
        time: updatedTime, 
        duration: updatedDuration, 
        slots: updatedSlots, 
        description: updatedDesc,
        _id: postId
      },
      errorMsg: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Post.findById(postId)
    .then(post => {
      post.title = updatedTitle;
      post.time = updatedTime;
      post.description = updatedDesc;
      post.duration = updatedDuration;
      post.slots = updatedSlots
      post.imageUrl = updatedImageUrl;
      return post.save();
    })
    .then(result => {
      console.log('UPDATED POST!');
      res.redirect('/admin/posts');
    })
    .catch(err => console.log(err));
};

exports.postDeletePost = (req, res, next) => {
  const postId = req.body.postId;
  Post.findByIdAndRemove(postId)
    .then(() => {
      console.log('DESTROYED POST');
      res.redirect('/admin/posts');
    })
    .catch(err => console.log(err));
};