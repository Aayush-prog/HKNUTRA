const mongoose = require("mongoose");
const delPost = async (req, res) => {
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
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    res.satus(201).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delPost;
