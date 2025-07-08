const mongoose = require("mongoose");
const path = require("path");
const delImage = require("../../../handlers/delImage");
const editMembershipReason = async (req, res) => {
  const MembershipReasonModel = mongoose.model("MembershipReason");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
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
    let updatedMembershipReason;
    if (image != null) {
      delImage(membershipReason.image);
      updatedMembershipReason = await MembershipReasonModel.findByIdAndUpdate(
        membershipReasonId,
        {
          title,
          image,
          body,
        }
      );
    } else {
      updatedMembershipReason = await MembershipReasonModel.findByIdAndUpdate(
        membershipReasonId,
        {
          title,
          body,
        }
      );
    }

    res.status(200).json({
      status: "success",
      message: "MembershipReason updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editMembershipReason;
