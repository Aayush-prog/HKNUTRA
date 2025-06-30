const mongoose = require("mongoose");
const delPerson = async (req, res) => {
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
    const deletedPerson = await PersonModel.findByIdAndDelete(personId);
    res.status(200).json({
      status: "success",
      message: "Person deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delPerson;
