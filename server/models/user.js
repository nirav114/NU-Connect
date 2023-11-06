const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path : '../config.env'});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  bio: {
    type: String,
    maxlength: 500, 
  },
  profilePicture: {
    type: String, 
  },
  isAuthenticated: {
    type: Boolean,
    required: true,
    default:false
  },
  verificationToken: String,
  tokenExpiration: Date
});

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  return token;
};

module.exports = mongoose.model('User', userSchema);