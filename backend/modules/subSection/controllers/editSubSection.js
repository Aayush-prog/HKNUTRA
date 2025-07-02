const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");
const editSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const { title, body, imageDeleted, body2, variant, alignment } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const images = req.files?.images?.map((image) => path.basename(image.path));
  const { subSectionId } = req.params;
  try {
    const subSection = await SubSectionModel.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        status: "error",
        message: "SubSection not found",
      });
    }
    let updatedSubSection;
    if (imageDeleted == "true") {
      deleteImage(subSection.image);
      updatedSubSection = await SubSectionModel.findByIdAndUpdate(
        subSectionId,
        { title, body, image }
      );
    }
    if (image || images) {
      deleteImage(subSection.image);
      updatedSubSection = await SubSectionModel.findByIdAndUpdate(
        subSectionId,
        { title, image, images, body, body2, variant, alignment }
      );
    }
    updatedSubSection = await SubSectionModel.findByIdAndUpdate(subSectionId, {
      title,
      body,
      body2,
      variant,
      alignment,
    });
    res.status(200).json({
      status: "success",
      message: "SubSection updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editSubSection;
