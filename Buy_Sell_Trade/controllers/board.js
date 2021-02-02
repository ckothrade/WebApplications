const fs = require('fs');
const path = require('path');

const pdf = require('pdfkit');

const Item = require('../models/item');
// const Stub = require('../models/stub');

const ITEMS_PER_PAGE = 5;

exports.getPosts = (req, res, next) => {
  Item.find()
    .then(items => {
      res.render('board/post-list', {
        items: items,
        pageTitle: 'Posts',
        path: '/posts'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Item.find()
  .then(items => {
    res.render('board/index', {
      items: items,
      pageTitle: 'Board',
      path: '/'
    });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Item.findById(postId)
    .then(post => {
      res.render('board/post-detail', {
        post: post,
        pageTitle: post.title,
        path: '/posts'   // Does this path need to change?
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getBookmarks = (req, res, next) => {
  req.user
    .populate('bookmarks.items.postId')
    .execPopulate()
    .then(user => {
      const items = user.bookmarks.items;
      res.render('board/bookmarks', {
        path: '/bookmarks',
        pageTitle: 'Your Saved Posts',
        items: items
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postBookmark = (req, res, next) => {
  const postId = req.body.postId;
  Item.findById(postId)
    .then(post => {
      req.user.addToBookmarks(post);
    })
    .then(result => {
      console.log(result);
      res.redirect('/bookmarks');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.postBookmarkRemove = (req, res, next) => {
//   const postId = req.body.postId;
//   req.user
//     .removeFromSchedule(postId)
//     .then(result => {
//       res.redirect('/schedule');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postStub = (req, res, next) => {
//   const postId = req.body.postId;

//   req.user
//     .populate('schedule.jobs.postId')
//     .execPopulate()
//     .then(user => {

//       const duties = user.schedule.jobs.filter(i => i.postId._id.toString() === postId.toString());

//       if(duties.length < 1) {
//         throw new Error('Couldnt find job');
//       }

//       const stub = new Stub({
//         post: duties[0].postId._doc,
//         date: Date.now(),
//         user: {
//           email: req.user.email,
//           userId: req.user
//         }
//       });

//       return stub.save();
//     })
//     .then(result => {
//       return req.user.moveToStub(postId);    
//     })
//     .then(result => {
//       res.redirect('/schedule');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });

// };

// exports.getStubs = (req, res, next) => {
//   const page = +req.query.page || 1;
//   let totalPosts;

//   Stub.find().countDocuments().then(numPosts => {
//     totalPosts = numPosts;

//     return Stub.find({ 'user.userId': req.user._id })
//       .skip((page - 1) * ITEMS_PER_PAGE) // Skips x amount of items for designated page
//       .limit(ITEMS_PER_PAGE); // Limits how many items are retrieved at designation
//   })
//   .then(stubs => {
//     res.render('board/stubs', {
//       path: '/my-stubs',
//       pageTitle: 'Your Stubs',
//       stubs: stubs,
//       currentPg: page,
//       hasNextPg: ITEMS_PER_PAGE * page < totalPosts,
//       hasPrevPg: page > 1,
//       nextPg: page + 1,
//       prevPg: page - 1,
//       lastPg: Math.ceil(totalPosts / ITEMS_PER_PAGE)
//     });
//   })
//   .catch(err => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     return next(error);
//   });
// };

// exports.getRecord = (req, res, next) => {
//   const stubId = req.params.stubId;
  
//   Stub.findById(stubId)
//   .then(stub => {
//     if(!stub) {
//       return next(new Error('Stub not found!'));
//     }

//     if (stub.user.userId.toString() !== req.user._id.toString()) {
//       return next(new Error('Unauthorized'));
//     }

//     const stubName = 'stub-' + stubId + '.pdf';
//     const stubPath = path.join('data', 'stubs', stubName);

//     const pdfDoc = new pdf();

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'inline; filename="' + stubName + '"');

//     // Pass it to a writable stream
//     pdfDoc.pipe(fs.createWriteStream(stubPath));
//     pdfDoc.pipe(res);

//     pdfDoc.fontSize(24).text('POST STUB', {
//       underline: true,
//     });
//     pdfDoc.fontSize(14).text('----------------------------------------------------');
//     pdfDoc.text('Worker: ' + stub.user.email);
//     pdfDoc.text('Date Worked:' + stub.date);
//     pdfDoc.text('Item: ' + stub.post.title + '   (id: ' + stub.post._id + ')');
//     pdfDoc.text('Item Start: ' + stub.post.time + ' hours');
//     pdfDoc.text('Item Length: ' + stub.post.duration + ' hours');
//     pdfDoc.text('Item Description: ' + stub.post.description);

//     // Closes streams, file is saved and response is sent
//     pdfDoc.end();

//   })
//   .catch(err => next(err));
// };