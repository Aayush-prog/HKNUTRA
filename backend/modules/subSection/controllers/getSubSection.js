const mongoose = require("mongoose");
const getSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  try {
    const subSection = await SubSectionModel.find();
    res.satus(201).json({
      status: "success",
      message: "SubSection found successfully",
      data: subSection,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getSubSection;
