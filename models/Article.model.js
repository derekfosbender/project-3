const {Schema, model} = require("mongoose");

const articleSchema = new Schema (
    {
      photo: String,
      title: String,
      content: String,
      author: String
    }
)

const Article = model("Article", articleSchema);

module.exports = Article;