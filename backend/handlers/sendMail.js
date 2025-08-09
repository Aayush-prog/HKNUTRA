const nodemailer = require("nodemailer");

// Transporter created here to be reused.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendMail = async (req, res) => {
  const { name, email, message, phone } = req.body;
  try {
    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "official@hknutra.com",
      subject: `Inquiry from ${name}!`,
      html: `<p>${message} <br>Name: ${name} <br>Email: ${email} <br>Contact: ${phone}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ status: "failed", msg: "Email failed." });
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.status(200).json({ status: "success", msg: "sent" });
  } catch (e) {
    return res.status(500).json({ status: "failed", msg: "Email failed." });
  }
};

module.exports = sendMail;
