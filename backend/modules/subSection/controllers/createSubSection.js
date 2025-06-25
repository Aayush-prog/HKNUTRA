const mongoose = require("mongoose");
const path = require("path");
const createSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newSubSection = await SubSectionModel.create({ title, image, body });
    res.status(201).json({
      status: "success",
      message: "SubSection created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createSubSection;
