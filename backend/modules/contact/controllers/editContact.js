const mongoose = require("mongoose");
const editContact = async (req, res) => {
  const ContactModel = mongoose.model("Contact");
  const { mailingAddress, physicalAddress, reachUs } = req.body;
  const { contactId } = req.params;
  try {
    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }
    const updatedContact = await ContactModel.findByIdAndUpdate(contactId, {
      mailingAddress,
      physicalAddress,
      reachUs,
    });
    res.status(200).json({
      status: "success",
      message: "Contact updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editContact;
