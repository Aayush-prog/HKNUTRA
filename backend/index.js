const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Routes
const login = require("./handlers/login.js");
const { forgotPassword, resetPassword } = require("./handlers/forgotPass.js");
const heroRouter = require("./modules/hero/hero.routes.js");
const subSectionRouter = require("./modules/subSection/subSection.routes.js");
const postRouter = require("./modules/post/post.routes.js");
const eventRouter = require("./modules/event/event.routes.js");
const personRouter = require("./modules/person/person.routes.js");
const contactRouter = require("./modules/contact/contact.routes.js");
const missionRouter = require("./modules/mission/mission.routes.js");
const pageRouter = require("./modules/pages/pages.routes.js");
const membershipReasonRouter = require("./modules/membershipReason/membershipReason.routes.js");
// Models
require("./models/userModel.js");
require("./models/heroModel.js");
require("./models/subSection.js");
require("./models/PageModel.js");
require("./models/eventModel.js");
require("./models/personModel.js");
require("./models/postModel.js");
require("./models/contactModel.js");
require("./models/missionModel.js");
require("./models/membershipReasonModel.js");
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
app.use("/post", postRouter);
app.use("/event", eventRouter);
app.use("/hero", heroRouter);
app.use("/mission", missionRouter);
app.use("/membershipReason", membershipReasonRouter);
app.use("/subSection", subSectionRouter);
app.use("/person", personRouter);
app.use("/contact", contactRouter);
app.use("/pages", pageRouter);
// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
