const mongoose = require("mongoose");
const getPost = async (req, res) => {
  const PostModel = mongoose.model("Post");
  try {
    const posts = await PostModel.find().sort({
      createdAt: -1,
    });
    res.satus(201).json({
      status: "success",
      message: "Post found successfully",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPost;
