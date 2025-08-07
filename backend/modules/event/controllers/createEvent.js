const mongoose = require("mongoose");
const path = require("path");
const createEvent = async (req, res) => {
  const EventModel = mongoose.model("Event");
  const { title, body, date, time, location, complete, type } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const images = req.files?.images?.map((image) => path.basename(image.path));
  try {
    const newEvent = await EventModel.create({
      title,
      image,
      body,
      date: new Date(date),
      time,
      images,
      type,
      complete: complete === "true",
      location,
    });
    res.status(201).json({
      status: "success",
      data: newEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createEvent;
