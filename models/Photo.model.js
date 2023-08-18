const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");

const photoSchema = new Schema ({
      photo: {type: String},
      photoArray: {type: [String]},
      location: {type: String},
      time: {type: String},
  });

const Photo = model("Photo", photoSchema);

module.exports = Photo;