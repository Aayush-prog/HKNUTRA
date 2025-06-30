const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    mailingAddress: [{ type: String }],
    physicalAddress: [{ type: String }],
    reachUs: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
