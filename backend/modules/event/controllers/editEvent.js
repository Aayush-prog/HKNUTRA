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
  const newImages =
    req.files?.images?.map((img) => path.basename(img.path)) || [];
  try {
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Event not found",
      });
    }
    let updatedEvent;
    let finalImages = [];
    if (existingImages) {
      const existing = JSON.parse(existingImages);
      finalImages = existing;

      // Find removed images (present in DB but not in new list)
      const removedImages = event.images.filter(
        (img) => !existing.includes(img)
      );
      removedImages.forEach((img) => delImage(img));

      // Add new images
      finalImages.push(...newImages);
      updatedEvent = await EventModel.findByIdAndUpdate(eventId, {
        title,
        body,
        date: new Date(date),
        time,
        type,
        location,
        completed,
        images: finalImages,
      });
    }
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
