const express = require("express");
const router = express.Router();
const Article = require("../models/Article.model");

router.post("/", (req,res) => {
    Article.create(req.body)
    .then((article) => {
        res.json({success: true, article});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/", (req,res) => {
    Article.find()
    .then((articles) => {
        res.json({success: true, articles});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/:articleId", (req,res) => {
    Article.findById(req.params.articleId)
    .then((article) => {
        res.json({success: true, article});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.put("/:articleId", (req,res) => {
    Article.findByIdAndUpdate(req.params.articleId, req.body, { new: true })
    .then((article) => {
        res.json({success: true, article});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.delete("/:articleId", (req,res) => {
    Article.findByIdAndRemove(req.params.articleId)
    .then(() => {
        res.json({success: true});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});
module.exports = router;