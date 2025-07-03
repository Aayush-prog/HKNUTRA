const mongoose = require("mongoose");
const getMissionById = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { missionId } = req.params;
  try {
    const mission = await MissionModel.findById(missionId);
    if (!mission) {
      return res.status(404).json({
        status: "error",
        message: "Mission not found",
      });
    }
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
module.exports = getMissionById;
