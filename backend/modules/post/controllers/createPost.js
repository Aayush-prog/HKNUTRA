const mongoose = require("mongoose");
const path = require("path");
const createPost = async (req, res) => {
  const PostModel = mongoose.model("Post");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newPost = await PostModel.create({
      title,
      image,
      body,
    });
    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createPost;
