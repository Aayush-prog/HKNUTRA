const mongoose = require("mongoose");
const getFounder = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  try {
    const founder = await PersonModel.find({ type: "Founder" });
    res.status(200).json({
      status: "success",
      message: "Person found successfully",
      data: founder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getFounder;
