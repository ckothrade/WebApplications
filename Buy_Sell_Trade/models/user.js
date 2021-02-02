const mongoose = require('mongoose');

//added for slots
const Item = require('./item');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExp: Date,
  bookmarks: {
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
          required: true
        },
        title: { type: String, required: true }
      }
    ]
  }
});

userSchema.methods.addToBookmarks = function(post) {

  // Return the index of the post whose id matches 
  const savedPostIndex = this.bookmarks.items.findIndex(sp => {
    return sp.postId.toString() === post._id.toString();
  });

  // Retrieve current bookmarks
  const updatedBookmarks = [...this.bookmarks.items];

  // Post is not already saved
  if(savedPostIndex < 0) {

    // Add post to the bookmarks array
    updatedBookmarks.push({
      postId: post._id
    });
    
    // Create new js object using the updated array
    const updatedItems = {
      items: updatedBookmarks 
    };

    // assign new object to the schedule
    this.bookmarks = updatedItems;

    // // decrement available slots for voulenteers on job
    // post.fillSlot();

  } else { // Post is already scheduled
    // ToDo: do something here maybe?
  }
  
  return this.save();
};

// userSchema.methods.removeFromSchedule = function(postId) {

//   // Grabs all of the jobs on scheudle except for job being removed
//   const updatedJobs = this.schedule.jobs.filter(job => {
//     return job.postId.toString() !== postId.toString();
//   });

//   // Updates shcedule with new filtered array
//   this.schedule.jobs = updatedJobs;

//   console.log('removed job from schedule');

//   // Opens the seat back up for the job
//   Post.findById(postId)
//   .then(post => {
//     post.openSlot();
//   })
//   .catch(err => console.log(err));

//   return this.save();
// };

// userSchema.methods.moveToStub = function(postId) {

//   // Grabs all of the jobs on schedule except for job being removed
//   const updatedJobs = this.schedule.jobs.filter(job => {
//     return job.postId._id.toString() !== postId.toString();
//   });

//   // Updates schedule with new filtered array
//   this.schedule.jobs = updatedJobs;

//   return this.save();
// };

// userSchema.methods.clearSchedule = function(){};

module.exports = mongoose.model('User', userSchema);
