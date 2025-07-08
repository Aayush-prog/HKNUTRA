const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");

const editSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const {
    title,
    body,
    body2,
    variant,
    alignment,
    imageDeleted,
    existingImages,
  } = req.body;
  const { subSectionId } = req.params;

  const newImage = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const newImages =
    req.files?.images?.map((img) => path.basename(img.path)) || [];

  try {
    const subSection = await SubSectionModel.findById(subSectionId);
    if (!subSection) {
      return res
        .status(404)
        .json({ status: "error", message: "SubSection not found" });
    }

    // Prepare updated fields
    const updatedFields = {
      title,
      body,
      body2,
      variant,
      alignment,
    };

    // Handle main image
    if (imageDeleted === "true") {
      if (subSection.image) deleteImage(subSection.image);
      updatedFields.image = null;
    } else if (newImage) {
      if (subSection.image) deleteImage(subSection.image);
      updatedFields.image = newImage;
    }

    // Handle gallery images
    let finalImages = [];
    if (existingImages) {
      const existing = JSON.parse(existingImages);
      finalImages = existing;

      // Find removed images (present in DB but not in new list)
      const removedImages = subSection.images.filter(
        (img) => !existing.includes(img)
      );

      // Delete them
      removedImages.forEach((img) => deleteImage(img));
    }

    if (newImages.length > 0) {
      finalImages = finalImages.concat(newImages);
    }
    updatedFields.images = finalImages;

    // Single update
    const updatedOne = await SubSectionModel.findByIdAndUpdate(
      subSectionId,
      updatedFields
    );

    res.status(200).json({
      status: "success",
      message: "SubSection updated successfully",
      data: updatedOne,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};

module.exports = editSubSection;
