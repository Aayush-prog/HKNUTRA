const mongoose = require("mongoose");
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    body: { type: String, required: true },
    duration: { type: String },
    image: { type: String },
    email: { type: String },
    type: {
      type: String,
      enum: ["Past", "Board", "Founder", "Staff"],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Person", personSchema);
