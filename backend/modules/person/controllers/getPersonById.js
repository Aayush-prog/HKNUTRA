const mongoose = require("mongoose");
const getPersonById = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  const { personId } = req.params;
  try {
    const person = await PersonModel.findById(personId);
    if (!person) {
      return res.status(404).json({
        status: "error",
        message: "Person not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Person found successfully",
      data: person,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPersonById;
