const mongoose = require("mongoose");
const path = require("path");
const delImage = require("../../../handlers/delImage");
const editPost = async (req, res) => {
  const PostModel = mongoose.model("Post");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { postId } = req.params;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    let updatedPost;
    if (image != null) {
      delImage(post.image);
      updatedPost = await PostModel.findByIdAndUpdate(postId, {
        title,
        image,
        body,
      });
    } else {
      updatedPost = await PostModel.findByIdAndUpdate(postId, {
        title,
        body,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editPost;
