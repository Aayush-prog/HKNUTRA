const mongoose = require("mongoose");
const path = require("path");

const createMembershipReason = async (req, res) => {
  const MembershipReasonModel = mongoose.model("MembershipReason");
  const { title, body } = req.body;
  console.log(req.body);
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newMembershipReason = await MembershipReasonModel.create({
      title,
      image,
      body,
    });
    res.status(201).json({
      status: "success",
      data: newMembershipReason,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createMembershipReason;
