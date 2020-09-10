const mongoose = require('mongoose');

//added for slots
const Post = require('./post');

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
  schedule: {
    jobs: [
      {
        postId: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
          required: true
        },
        duration: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToSchedule = function(post) {

  // Return the index of the post whose id matches 
  const schedPostIndex = this.schedule.jobs.findIndex(sp => {
    return sp.postId.toString() === post._id.toString();
  });

  // Retrieve current schedule
  const updatedJobs = [...this.schedule.jobs];

  // Post is not already schedule
  if(schedPostIndex < 0) {

    // Add job to the job array
    updatedJobs.push({
      postId: post._id,
      duration: post.duration
    });
    
    // Create new js object using the updated array
    const updatedSchedule = {
      jobs: updatedJobs 
    };

    // assign new object to the schedule
    this.schedule = updatedSchedule;

    // decrement available slots for voulenteers on job
    post.fillSlot();

  } else { // Post is already scheduled
    // ToDo: do something here maybe?
  }
  

  //ToDo: 
  // check open slots
  // decrement slots
  return this.save();

};

userSchema.methods.removeFromSchedule = function(postId) {

  // Grabs all of the jobs on scheudle except for job being removed
  const updatedJobs = this.schedule.jobs.filter(job => {
    return job.postId.toString() !== postId.toString();
  });

  // Updates shcedule with new filtered array
  this.schedule.jobs = updatedJobs;

  // Opens the seat back up for the job
  Post.findById(postId)
    .then(post => {
      post.openSlot();
    })
    .catch(err => console.log(err));

    return this.save();
};
// userSchema.methods.clearSchedule = function(){};

module.exports = mongoose.model('User', userSchema);
