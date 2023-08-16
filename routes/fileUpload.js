const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo.model");
const uploadCloud = require("../config/cloudinary-setup");

router.patch(
    "/photo/image/:photoId",
    uploadCloud.single("photo"),
    (req, res, next) => {
        Photo.findByIdAndUpdate(
            req.params.productId,
            { photo: req.file.url },
            { new: true }
        )
            .then((updatedPhoto) => {
                res.status(200).json(updatedPhoto);
            })
            .catch((err) => res.status(400).json(err));
    }
);

router.patch(
    "/photo/imageArray/:photoId",
    uploadCloud.array("photoArray"),
    (req, res, next) => {
        console.log({ theFile: req.files });
        Photo.findById(req.params.photoId)
            .then((photoFromDB) => {
                console.log({ photoFromDB });
                req.files.forEach((file) => {
                    photoFromDB.imagePhoto.push(file.url); 
                });
                photoFromDB
                    .save()
                    .then((updatedPhoto) => {
                        console.log({ updatedPhoto });
                        res.status(200).json(updatedPhoto);
                    })
                    .catch((err) =>
                        res
                            .status(400)
                            .json({ message: "error pushing urls: ", err })
                    );
            })
            .catch((err) =>
                res
                    .status(400)
                    .json({ message: "error finding photo: ", err })
            );
    }
);

module.exports = router;