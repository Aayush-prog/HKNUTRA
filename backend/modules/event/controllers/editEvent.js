const mongoose = require("mongoose");
const path = require("path");
const delImage = require("../../../handlers/delImage");
const editEvent = async (req, res) => {
  const EventModel = mongoose.model("Event");
  const { title, body, date, time, location, completed, type, existingImages } =
    req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { eventId } = req.params;
  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }
    let updatedEvent;
    if (image != null) {
      delImage(event.image);
      updatedEvent = await EventModel.findByIdAndUpdate(eventId, {
        title,
        image,
        body,
        date: new Date(date),
        time,
        type,
        location,
        completed,
      });
    } else {
      updatedEvent = await EventModel.findByIdAndUpdate(eventId, {
        title,
        body,
        date: new Date(date),
        time,
        type,
        location,
        completed,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editEvent;
