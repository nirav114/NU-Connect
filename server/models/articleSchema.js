const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique : true,
  },
  content: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
      required: true,
    },
  cover : {
      type : String
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: String
  }],
  saved: [{
    type: String
  }],
  views : {
    type : Number,
    default : 0
  }
});

module.exports = mongoose.model('articleSchema', articleSchema);