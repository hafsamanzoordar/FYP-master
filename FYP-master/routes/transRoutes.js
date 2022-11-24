const express = require("express");
const router = express.Router();
const donationController = require("../controllers/transController");
const verify = require("../utils/auth");

router.post("/", donationController.trans_create_post);

module.exports = router;
