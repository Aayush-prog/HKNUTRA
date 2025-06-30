const mongoose = require("mongoose");
const getBoard = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  try {
    const board = await PersonModel.find({ type: "Board" });

    res.status(200).json({
      status: "success",
      message: "Person found successfully",
      data: board,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getBoard;
