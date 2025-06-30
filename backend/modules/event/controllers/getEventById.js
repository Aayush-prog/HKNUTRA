const mongoose = require("mongoose");
const getEventById = async (req, res) => {
  const EventModel = mongoose.model("Event");
  const { eventId } = req.params;
  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }
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
module.exports = getEventById;
