const mongoose = require("mongoose");
const getLanding = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const page = await PageModel.find({ type: "Landing" })
      .populate("heroSection")
      .populate("subSection1")
      .populate("subSection2");
    res.status(200).send({ status: "success", data: page[0] });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.msg || "error" });
  }
};
module.exports = getLanding;
