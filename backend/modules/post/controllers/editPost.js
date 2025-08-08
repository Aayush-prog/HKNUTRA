const mongoose = require("mongoose");
const path = require("path");
const delImage = require("../../../handlers/delImage");
const editPost = async (req, res) => {
  const PostModel = mongoose.model("Post");
  const { title, body, existingImages } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { postId } = req.params;
  const newImages =
    req.files?.images?.map((img) => path.basename(img.path)) || [];
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    let updatedPost;
    let finalImages = [];
    if (existingImages) {
      const existing = JSON.parse(existingImages);
      finalImages = existing;

      // Find removed images (present in DB but not in new list)
      const removedImages = event.images.filter(
        (img) => !existing.includes(img)
      );
      removedImages.forEach((img) => delImage(img));

      // Add new images
      finalImages.push(...newImages);
      updatedEvent = await EventModel.findByIdAndUpdate(eventId, {
        title,
        body,
        date: new Date(date),
        time,
        type,
        location,
        completed,
        images: finalImages,
      });
    }
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
