const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");
const editPerson = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  const { name, designation, body, duration, email, type } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { personId } = req.params;
  try {
    const person = await PersonModel.findById(personId);
    if (!person) {
      return res.status(404).json({
        status: "error",
        message: "Person not found",
      });
    }
    let updatedPerson;
    if (image) {
      deleteImage(person.image);
      updatedPerson = await PersonModel.findByIdAndUpdate(personId, {
        name,
        designation,
        body,
        duration,
        image,
        type,
        email,
      });
    } else {
      updatedPerson = await PersonModel.findByIdAndUpdate(personId, {
        name,
        designation,
        body,
        duration,
        type,
        email,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Person updated successfully",
      data: updatedPerson,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editPerson;
