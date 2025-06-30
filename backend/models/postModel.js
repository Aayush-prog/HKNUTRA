const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    image: { type: String },
    author: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
