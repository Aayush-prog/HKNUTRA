const mongoose = require("mongoose");
const getStaff = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  try {
    const staff = await PersonModel.find({ type: "Staff" });
    res.status(200).json({
      status: "success",
      message: "Person found successfully",
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getStaff;
