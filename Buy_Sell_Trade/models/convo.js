const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const convoSchema = new Schema({
  messages: [
    {
      message: { type: String, required: true },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    }
  ],
  seller: {
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
  buyer: {
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

module.exports = mongoose.model('Convo', convoSchema);
