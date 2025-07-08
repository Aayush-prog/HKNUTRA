const mongoose = require("mongoose");
const delSubSection = async (req, res) => {
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
    const deletedSubSection = await SubSectionModel.findByIdAndDelete(
      subSectionId
    );
    res.satus(201).json({
      status: "success",
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delSubSection;
