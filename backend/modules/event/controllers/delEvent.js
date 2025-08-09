const mongoose = require("mongoose");
const delImage = require("../../../handlers/delImage");
const delEvent = async (req, res) => {
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
    delImage(event.image);
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);
    res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delEvent;
