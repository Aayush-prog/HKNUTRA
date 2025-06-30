const mongoose = require("mongoose");
const getContact = async (req, res) => {
  const COntactModel = mongoose.model("Contact");
  try {
    const contact = await COntactModel.find();
    res.status(200).json({
      status: "success",
      message: "Contact found successfully",
      data: contact[0],
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getContact;
