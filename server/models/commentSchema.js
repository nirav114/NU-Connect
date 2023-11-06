const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    parent : {
        type: String,
        required: true,
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
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [{
        type: String
    }]
});

module.exports = mongoose.model('commentSchema', commentSchema);