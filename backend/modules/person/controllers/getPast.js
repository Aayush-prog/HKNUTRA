const mongoose = require("mongoose");
const getPast = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  try {
    const past = await PersonModel.find({ type: "Past" });

    res.status(200).json({
      status: "success",
      message: "Person found successfully",
      data: past,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPast;
