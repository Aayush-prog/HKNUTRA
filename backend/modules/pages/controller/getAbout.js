const mongoose = require("mongoose");
const getAbout = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const about = await PageModel.findOne({ type: "About" })
      .populate("heroSection")
      .populate("subSection1")
      .populate("subSection2")
      .populate("subSection3")
      .populate("subSection4")
      .populate("subSection5");
    res.status(200).json({ status: "success", data: about });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getAbout;
