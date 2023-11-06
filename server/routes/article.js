const express = require('express');
const articleSchema = require('../models/articleSchema')
const router = express.Router();

var fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv')
dotenv.config({path : '../config.env'});
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/create', fetchuser, async (req, res)=>{
    try {
        const {
            title,
            content,
            userName,
            email,
            cover,
            imageUrl
        } = req.body;

        const user = req.user;
        console.log(user)
    
        article = await articleSchema.create({
            title,
            content,
            userName,
            email,
            cover,
            imageUrl
        });
        console.log(article)
    } catch(err) {
        console.log(err)
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
})

router.get('/getallarticles', fetchuser, async (req, res) => {
    try {
        const allArticles = await articleSchema.find();
        console.log("tooooo : " , req.cookies.token)
        return res.json(allArticles);
    } catch(err) {
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
    return;
})

router.post('/getarticle', fetchuser, async (req, res) => {
    try {
        const {articleId} = req.body;
        const article = await articleSchema.findById(articleId);
        return res.json(article);
    } catch(err) {
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
})

router.post('/updatelike', fetchuser, async (req, res)=>{
    try {
        const {articleId, userId} = req.body
        const article = await articleSchema.findById(articleId);
        if (article.likes.includes(userId)) {
            article.likes = article.likes.filter(likeId => likeId !== userId);
        } else {
            article.likes.push(userId);
        }
        await article.save();
        return res.status(200).json({
            success : true, 
            article : article
        })
    } catch(err) {
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
})

router.post('/updateSave', fetchuser, async (req, res) => {
    try {
        const {articleId, userId} = req.body;
        const article = await articleSchema.findById(articleId);
        if (article.saved.includes(userId)) {
            article.saved = article.saved.filter(saveId => saveId !== userId);
        } else {
            article.saved.push(userId);
        }
        await article.save();
        return res.status(200).json({
            success : true, 
            article : article
        })
    } catch(err) {
        res.status(400).json({
            success : false,
            message : "internal server error!"
        })
    }
})

module.exports = router;