const {Schema, model} = require("mongoose");

const meetSchema = new Schema (
    {
      photo: String,
      description: String,
      location: String,
      time: String
    }
)

const Meet = model("Meet", meetSchema);

module.exports = Meet;