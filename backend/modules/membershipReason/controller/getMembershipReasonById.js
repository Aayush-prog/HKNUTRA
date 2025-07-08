const mongoose = require("mongoose");
const getMembershipReasonById = async (req, res) => {
  const MembershipReasonModel = mongoose.model("MembershipReason");
  const { membershipReasonId } = req.params;
  try {
    const membershipReason = await MembershipReasonModel.findById(
      membershipReasonId
    );
    if (!membershipReason) {
      return res.status(404).json({
        status: "error",
        message: "MembershipReason not found",
      });
    }
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
module.exports = getMembershipReasonById;
