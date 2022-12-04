const express = require("express");
const router = express.Router();
const janazaReqController = require("../controllers/janazaReqController");
const verify = require("../utils/auth");

router.get("/", verify, janazaReqController.janazaReq_index);

router.get("/getApproved", janazaReqController.janazaReq_getApproved);

router.get("/getCleared", janazaReqController.janazaReq_getCleared);

router.get("/approve/:id", janazaReqController.approve_janaza);

router.get("/donate/:id", janazaReqController.donate_janaza);

router.get("/decline/:id", janazaReqController.decline_janaza);

router.get("/clear/:id", janazaReqController.clear_janaza);

router.post("/", janazaReqController.janazaReq_create_post);

router.get("/:id", janazaReqController.janazaReq_get_by_id);

router.put("/:id", janazaReqController.updatejanazaReq);

router.delete("/:id", janazaReqController.deletejanazaReq);

module.exports = router;
