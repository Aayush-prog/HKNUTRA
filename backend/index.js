const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Routes
const login = require("./handlers/login.js");
const { forgotPassword, resetPassword } = require("./handlers/forgotPass.js");
// Models
require("./models/userModel.js");
// Initialize Express
const app = express();

// Middleware
app.use(cors("*"));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/files", express.static(path.join(__dirname, "public/files")));
// Database Connection
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => console.log("mongo connected"))
  .catch((e) => console.log(e));

// Routes
app.post("/login", login);
app.post("/forgotPass", forgotPassword);
app.post("/resetPass/:token", resetPassword);
// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
