const mongoose = require("mongoose");
const delContact = async (req, res) => {
  const ContactModel = mongoose.model("Contact");
  const { contactId } = req.params;
  try {
    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }
    const deletedContact = await ContactModel.findByIdAndDelete(contactId);
    res.status(200).json({
      status: "success",
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delContact;
