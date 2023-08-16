const {Schema, model} = require("mongoose");

const meetSchema = new Schema ({
      photo: {type: String},
      description: {type: String},
      location: {type: String},
      time: {type: String},
  });

const Meet = model("Meet", meetSchema);

module.exports = Meet;