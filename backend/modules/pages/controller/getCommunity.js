const mongoose = require("mongoose");
const getCommunity = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const partner = await PageModel.findOne({ type: "Community" })
      .populate("heroSection")
      .populate("subSection1");
    res.status(200).json({ status: "success", data: partner });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getCommunity;
