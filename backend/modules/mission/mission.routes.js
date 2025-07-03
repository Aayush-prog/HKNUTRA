const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const createMission = require("./controller/createMission");
const getMission = require("./controller/getMission");
const getMissionById = require("./controller/getMissionById");
const delMission = require("./controller/delMission");
const editMission = require("./controller/editMission");

const missionRouter = express.Router();
missionRouter.get("/", getMission);
missionRouter.get("/:missionId", getMissionById);
missionRouter.use(auth);
missionRouter.post("/create", upload, createMission);
missionRouter.delete("/del/:missionId", delMission);
missionRouter.patch("/edit/:missionId", upload, editMission);
module.exports = missionRouter;
