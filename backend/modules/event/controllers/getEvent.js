const mongoose = require("mongoose");
const getEvent = async (req, res) => {
  const EventModel = mongoose.model("Event");
  try {
    const event = await EventModel.find({ complete: false }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      status: "success",
      message: "Event found successfully",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getEvent;
