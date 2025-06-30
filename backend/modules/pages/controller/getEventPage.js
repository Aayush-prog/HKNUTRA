const mongoose = require("mongoose");
const getEventPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const event = await PageModel.findOne({ type: "Event" })
      .populate("heroSection")
      .populate("subSection1")
      .populate("subSection2");
    res.status(200).json({ status: "success", data: event });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getEventPage;
