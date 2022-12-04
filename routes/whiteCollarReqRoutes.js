const express = require("express");
const router = express.Router();
const whiteCollarReqController = require("../controllers/whiteCollarReqController");
const verify = require("../utils/auth");

router.get("/", verify, whiteCollarReqController.whiteCollarReq_index);

router.get("/getApproved", whiteCollarReqController.whiteCollarReq_getApproved);

router.get("/getCleared", whiteCollarReqController.whiteCollarReq_getCleared);

router.get("/approve/:id", whiteCollarReqController.approve_collar);

router.get("/donate/:id", whiteCollarReqController.donate_collar);

router.get("/decline/:id", whiteCollarReqController.decline_collar);

router.get("/clear/:id", whiteCollarReqController.clear_collar);

router.post("/", whiteCollarReqController.whiteCollarReq_create_post);

router.get("/:id", whiteCollarReqController.whiteCollarReq_get_by_id);

router.put("/:id", whiteCollarReqController.updatewhiteCollarReq);

router.delete("/:id", whiteCollarReqController.deletewhiteCollarReq);

module.exports = router;
