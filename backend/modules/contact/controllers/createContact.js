const mongoose = require("mongoose");
const createContact = async (req, res) => {
  const ContactModel = mongoose.model("Contact");
  const { mailingAddress, physicalAddress, reachUs } = req.body;
  try {
    const newContact = await ContactModel.create({
      mailingAddress,
      physicalAddress,
      reachUs,
    });
    res.status(201).json({
      status: "success",
      message: "Contact created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createContact;
