const uploadImage = require("../config/cloudinary-setup");
const express = require("express");
const router = express.Router();
const Meet = require("../models/Meet.model");


router.post("/", uploadImage.array("photo",2),(req,res) => {
    console.log({ file: req.file, path: req.path, body: req.body});
    const {description,location,time,} = req.body;
    const photo = req.files.map(file => file.path);
    Meet.create({
        photo,
        description,
        location,
        time,
    })
    .then((success) => {
        res.json({success: true, photo: success});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/", (req,res) => {
    Meet.find({},"meet")
    .then((meets) => {
        res.json({success: true, meets});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/:meetId", (req,res) => {
    Meet.findById(req.params.meetId)
    .then((meet) => {
        res.json({success: true, meet});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.put("/:meetId", (req,res) => {
    Meet.findByIdAndUpdate(req.params.meetId, req.body, {new: true})
    .then((meet) => {
        res.json({success: true, meet});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.delete("/:meetId", (req,res) => {
    Meet.findByIdAndRemove(req.params.meetId)
    .then(() => {
        res.json({success: true});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});
module.exports = router;