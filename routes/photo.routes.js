const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo.model");

router.post("/", (req,res) => {
    Photo.create(req.body)
    .then((photo) => {
        res.json({success: true, photo});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/", (req,res) => {
    Photo.find()
    .then((photos) => {
        res.json({success: true, photos});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/:photoId", (req,res) => {
    Photo.findById(req.params.photoId)
    .then((photo) => {
        res.json({success: true, photo});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.put("/:photoId", (req,res) => {
    Photo.findByIdAndUpdate(req.params.photoId, req.body, {new: true})
    .then((photo) => {
        res.json({success: true, photo});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.delete("/:photoId", (req,res) => {
    Photo.findByIdAndRemove(req.params.photoId)
    .then(() => {
        res.json({success: true});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});
module.exports = router;