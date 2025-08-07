const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    image: { type: String },
    date: { type: Date },
    time: { type: String },
    location: { type: String },
    images: [{ type: String }],
    type: { type: String, enum: ["All", "Kids", "Women"], default: "All" },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Event", eventSchema);
