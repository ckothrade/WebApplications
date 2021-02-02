const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messages: [
    {
      message: { type: Object, required: true },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    }
  ],
  poster: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  inquirer: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Message', messageSchema);
