const express = require("express");
const router = express.Router();
const Meet = require("../models/Meet.model");
const uploadCloud = require("../config/cloudinary-setup");

router.post("/", uploadCloud.single("image"), (req,res) => {
    console.log({ file: req.file});
    const meetInputInfo = req.body;
    meetInputInfo.image = req.file.url;
    Meet.create(meetInputInfo)
    .then((newlyCreatedMeet) => {
        res.json({newlyCreatedMeet});
    })
    .catch((err) => {
        res.json({success: false, error: err})
    })
});

router.get("/", (req,res) => {
    Meet.find()
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