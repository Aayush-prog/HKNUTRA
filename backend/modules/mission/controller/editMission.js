const mongoose = require("mongoose");
const path = require("path");
const delImage = require("../../../handlers/delImage");
const editMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { title, body, icon, color } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { missionId } = req.params;
  try {
    const mission = await MissionModel.findById(missionId);
    if (!mission) {
      return res.status(404).json({
        status: "error",
        message: "Mission not found",
      });
    }
    let updatedMission;
    if (image != null) {
      delImage(mission.image);
      updatedMission = await MissionModel.findByIdAndUpdate(missionId, {
        title,
        image,
        body,
        icon,
        color,
      });
    } else {
      updatedMission = await MissionModel.findByIdAndUpdate(missionId, {
        title,
        body,
        icon,
        color,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Mission updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editMission;
