const {Schema, model} = require("mongoose");

const articleSchema = new Schema (
    {
      photo: String,
      title: String,
      content: String,
      author: String,
      time: String
    }
)

const Article = model("Article", articleSchema);

module.exports = Article;