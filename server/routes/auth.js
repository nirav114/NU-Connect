const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv')

dotenv.config({path : '../config.env'});
const JWT_SECRET = process.env.JWT_SECRET;
const MAILID = process.env.MAILID
const PASSWORD = process.env.PASSWORD
const PORT = process.env.BACKEND_PORT

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure:true,
    // logger:true,
    // debug:true,
    secureConnection : false,
    host: 'smtp.gmail.com',
    auth: {
      user: `${MAILID}`,
      pass: `${PASSWORD}`,
    },
    tls: {
        rejectUnauthorized : true
    }
  });

router.post("/register",
    [
        body('name', 'Enter a valid email').isLength({ min : 2 }),
        body('userName', 'Enter a valid username').isLength({ min : 2 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success : false,  errors: errors.array() });
        }
        try {
            const {name, userName, email, password, userType, secretKey} = req.body;
            let user = await User.findOne({email});
            if (user !== null && user.isAuthenticated === true) {
                console.log(user)
                res.status(400).json({ success : false, error: "Invalid credentials" })
                return;
            }

            const verificationToken = crypto.randomBytes(20).toString('hex');
            const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

            const mailOptions = {
                from: `${MAILID}`,
                to: email,
                subject: 'Registration successfull',
                text: `click on this link to register youself at nu-connect : http://localhost:${PORT}/auth/verify/${verificationToken}`,
            };

            console.log("email : ", userName);

            
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            
            if(user === null) { 
                console.log('user was null');
                user = await User.create({email, name, userName, password : secPass, userType, verificationToken, tokenExpiration, isAuthenticated : false});
                console.log('user : ', user)
            }
            else {
                user = await User.findOneAndUpdate({email}, {
                        email, name, userName, password : secPass, userType, verificationToken, tokenExpiration, isAuthenticated : false
                    },
                    {
                        includeResultMetadata : false,
                        new : true
                    }
                );
            }
            console.log("user : ", user)

            const data = {
                user: {
                    id: user._id
                }
            }        
            const authtoken = jwt.sign(data, JWT_SECRET);

            if(user) {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Error sending verification email.' });
                        return;
                    } else {
                        console.log('Verification email sent: ' + info.response);
                        res.status(200).json({ message: 'Registration successful. Check your email for verification.' });
                        return;
                    }
                });
            }

            res.json({ success : true, token : authtoken });
            return;

        } catch(err) {
            console.log("error : ", err);
            res.status(500).json({success : false, error : 'internal server error!'});
            return;
        }
});

router.post("/login",  
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ],
    async (req, res)=>{
        // res.cookie("my", 12345);
        console.log("req cookie in /login : ")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success : false,  errors: errors.array() });
        }
        try {
            const {email, password} = req.body;
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({ success : false, error: "invalid credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success : false, error: "Please try to login with correct credentials" });
            }

            const token = user.generateAuthToken();
            console.log("token : ", token);
            res.cookie("token", token);
            // , {
            //     withCredentials: true,
            //     httpOnly: true,
            // });
        } catch(err) {
            console.log("error : ", err);
            res.status(500).json({success : false, error : 'internal server error!'});
            return;
        }
        res.status(200).json({success : true})
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.send({ success: true });
});

router.get('/verify/:token', async (req, res) => {
    try {
      const token = req.params.token;
  
      // Find a user with the given verification token
      const user = await User.findOne({ verificationToken: token });
  
      if (!user || user.tokenExpiration <= new Date()) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
  
      // Mark the user's email as verified
      user.isAuthenticated = true;
      user.verificationToken = null;
  
      // Extend the token expiration time (e.g., set it to null to indicate it's used)
      user.tokenExpiration = null;
  
      await user.save();

      res.status(200).json({ message: 'Email verified successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error.' });
    }
    return;
});

router.get('/getuser', (req, res) => {
    res.json({msg : 'onnichan messege!'});
    return;
});

module.exports = router;