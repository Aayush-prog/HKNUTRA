const mongoose = require("mongoose");
const getMembershipReason = async (req, res) => {
  const MembershipReasonModel = mongoose.model("MembershipReason");
  try {
    const membershipReason = await MembershipReasonModel.find();
    res.status(200).json({
      status: "success",
      message: "MembershipReason found successfully",
      data: membershipReason,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getMembershipReason;
