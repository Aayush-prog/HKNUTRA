const mongoose = require("mongoose");
const path = require("path");
const createPerson = async (req, res) => {
  const Person = mongoose.model("Person");
  console.log(req.body);
  const { name, designation, body, duration, type, email } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newPerson = await Person.create({
      name,
      designation,
      body,
      duration,
      image,
      type,
      email,
    });
    res.status(201).json({
      status: "success",
      message: "Person created successfully",
      data: newPerson,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createPerson;
