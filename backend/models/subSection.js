const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    body: { type: String },
    body2: { type: String },
    images: [{ type: String }],
    variant: { type: String, enum: ["green", "normal"], default: "normal" },
    alignment: {
      type: String,
      enum: ["left", "right", "normal"],
      default: "normal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubSection", subSectionSchema);
