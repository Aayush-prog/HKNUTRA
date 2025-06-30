const mongoose = require("mongoose");
const getContactById = async (req, res) => {
  const ContactModel = mongoose.model("Contact");
  const { contactId } = req.params;
  try {
    const contactId = await ContactModel.findById(contactId);
    if (!contactId) {
      return res.status(404).json({
        status: "error",
        message: "Contact not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Contact found successfully",
      data: contactId,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getContactById;
