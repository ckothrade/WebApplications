const Post = require('../models/post');

exports.getPosts = (req, res, next) => {

  Post.find()
    .then(posts => {
      res.render('board/post-list', {
        posts: posts,
        pageTitle: 'All Posts',
        path: '/posts'
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

exports.getIndex = (req, res, next) => {
  Post.find()
  .then(posts => {
    res.render('board/index', {
      posts: posts,
      pageTitle: 'Board',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      res.render('board/post-detail', {
        post: post,
        pageTitle: post.title,
        path: '/posts'
      });
    })
    .catch(err => console.log(err));
};

exports.getSchedule = (req, res, next) => {
  req.user
    .populate('schedule.jobs.postId')
    .execPopulate()
    .then(user => {
      const posts = user.schedule.jobs;
      res.render('board/schedule', {
        path: '/schedule',
        pageTitle: 'Your Schedule',
        posts: posts
      });
    })
    .catch(err => console.log(err));
};

exports.postSchedule = (req, res, next) => {
  const postId = req.body.postId;
  Post.findById(postId)
    .then(post => {
      req.user.addToSchedule(post);
    })
    .then(result => {
      console.log(result);
      res.redirect('/schedule');
    });
};

exports.postScheduleRemJob= (req, res, next) => {
  const postId = req.body.postId;
  req.user
    .removeFromSchedule(postId)
    .then(result => {
      res.redirect('/schedule');
    })
    .catch(err => console.log(err));
};