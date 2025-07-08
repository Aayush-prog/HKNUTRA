const mongoose = require("mongoose");
const deleteImage = require("../../../handlers/delImage");
const delMembershipReason = async (req, res) => {
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
    const deletedMission = await MembershipReasonModel.findByIdAndDelete(
      membershipReasonId
    );
    if (membershipReason.image) deleteImage(membershipReason.image);
    res.status(200).json({
      status: "success",
      message: "MembershipReason deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delMembershipReason;
