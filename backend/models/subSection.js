const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    body: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubSection", subSectionSchema);
