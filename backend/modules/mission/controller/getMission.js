const mongoose = require("mongoose");
const getMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  try {
    const mission = await MissionModel.find();
    res.status(200).json({
      status: "success",
      message: "Mission found successfully",
      data: mission,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getMission;
