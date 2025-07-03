const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    title: { type: String },
    icon: { type: String },
    body: { type: String },
    image: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mission", missionSchema);
