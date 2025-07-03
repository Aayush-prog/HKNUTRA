const mongoose = require("mongoose");
const path = require("path");
const createMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { title, body, icon, color } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newMission = await MissionModel.create({
      title,
      image,
      body,
      icon,
      color,
    });
    res.status(200).json({
      status: "success",
      data: newMission,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createMission;
