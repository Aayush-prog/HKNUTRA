const mongoose = require("mongoose");
const getMembership = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const membership = await PageModel.findOne({
      type: "Membership",
    })
      .populate("heroSection")
      .populate("subSection1");
    res.status(200).json({ status: "success", data: membership });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getMembership;
