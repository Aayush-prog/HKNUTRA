const mongoose = require("mongoose");
const getSubSectionById = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const { subSectionId } = req.params;
  try {
    const subSection = await SubSectionModel.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        status: "error",
        message: "SubSection not found",
      });
    }
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
module.exports = getSubSectionById;
