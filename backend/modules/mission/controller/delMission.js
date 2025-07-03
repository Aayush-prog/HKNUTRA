const mongoose = require("mongoose");
const deleteImage = require("../../../handlers/delImage");
const delMission = async (req, res) => {
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
    const deletedMission = await MissionModel.findByIdAndDelete(missionId);
    if (mission.image) deleteImage(mission.image);
    res.status(200).json({
      status: "success",
      message: "Mission deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delMission;
