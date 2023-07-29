const {Schema, model} = require("mongoose");

const photoSchema = new Schema (
    {
      photo: String,
      location: String,
      time: String
    }
)

const Photo = model("Photo", photoSchema);

module.exports = Photo;