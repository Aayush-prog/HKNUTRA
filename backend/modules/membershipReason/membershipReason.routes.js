const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const createMembershipReason = require("./controller/createMembershipReason");
const getMembershipReason = require("./controller/getMembershipReason");
const getMembershipReasonById = require("./controller/getMembershipReasonById");
const delMembershipReason = require("./controller/delMembershipReason");
const editMembershipReason = require("./controller/editMembershipReason");

const membershipReasonRouter = express.Router();
membershipReasonRouter.get("/", getMembershipReason);
membershipReasonRouter.get("/:membershipReasonId", getMembershipReasonById);
membershipReasonRouter.use(auth);
membershipReasonRouter.post("/create", upload, createMembershipReason);
membershipReasonRouter.delete("/del/:membershipReasonId", delMembershipReason);
membershipReasonRouter.patch(
  "/edit/:membershipReasonId",
  upload,
  editMembershipReason
);
module.exports = membershipReasonRouter;
