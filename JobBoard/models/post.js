const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  slots: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
});

// Removes an open seat for the job
postSchema.methods.fillSlot = function() { 
  if(this.slots > 0) {
    this.slots = this.slots - 1;
  }

  return this.save();
}

// Opens a seat for the job
postSchema.methods.openSlot = function() { 
  this.slots = this.slots + 1;
  return this.save();
}


module.exports = mongoose.model('Post', postSchema);