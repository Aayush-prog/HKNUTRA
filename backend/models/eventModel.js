const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    image: { type: String },
    date: { type: Date },
    time: { type: String },
    location: { type: String },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Event", eventSchema);
