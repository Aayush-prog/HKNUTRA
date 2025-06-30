const mongoose = require("mongoose");
const getPerson = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  try {
    const past = await PersonModel.find({ type: "Past" });
    const board = await PersonModel.find({ type: "Board" });
    const founder = await PersonModel.find({ type: "Founder" });
    const staff = await PersonModel.find({ type: "Staff" });
    res.status(200).json({
      status: "success",
      message: "Person found successfully",
      past,
      board,
      founder,
      staff,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPerson;
