const mongoose = require("mongoose");
const getPostById = async (req, res) => {
  const PostModel = mongoose.model("Post");
  const { postId } = req.params;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Post found successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPostById;
