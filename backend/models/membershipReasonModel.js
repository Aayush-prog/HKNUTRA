const mongoose = require("mongoose");

const membershipReasonSchema = new mongoose.Schema(
  {
    title: { type: String },
    body: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipReason", membershipReasonSchema);
