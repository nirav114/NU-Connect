const express = require('express');
const commentSchema = require('../models/commentSchema')
const articleSchema = require('../models/articleSchema')
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config({path : '../config.env'});

router.post('/create', async (req, res)=>{
    try {
        const {
            parent,
            content,
            userName,
            email,
            imageUrl
        } = req.body;
    
        comment = await commentSchema.create({
            parent,
            content,
            userName,
            email,
            imageUrl
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
});

router.post('/getComments', async (req, res) => {
    try {
        const {parent} = req.body;
        result = await commentSchema.find({parent : parent});
        res.status(200).json({
            success : true,
            data : result
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
    return;
});

router.post('/getcommentdata', async (req, res) => {
    try {
        const {commentId} = req.body;
        const comment = await commentSchema.findById(commentId);
        const parent = commentId;
        const commentList = await commentSchema.find({parent : parent});
        res.status(200).json({
            success : true,
            comment : comment, 
            commentList : commentList
        });
    } catch(err) {
        console.log(err)
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
    return;
});

router.post('/updatelike', async (req, res)=>{
    try {
        const {commentId, userId} = req.body
        const comment = await commentSchema.findById(commentId);
        if (comment.likes.includes(userId)) {
            comment.likes = comment.likes.filter(likeId => likeId !== userId);
        } else {
            comment.likes.push(userId);
        }
        await comment.save();
        return res.status(200).json({
            success : true, 
            comment : comment
        })
    } catch(err) {
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
})

module.exports = router;