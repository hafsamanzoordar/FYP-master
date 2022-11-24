const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const verify = require("../utils/auth");

router.get("/", verify, donationController.donation_index);

router.get("/approve/:id", donationController.approve_donation);

router.get("/decline/:id", donationController.decline_donation);

router.post("/", donationController.donation_create_post);

router.get("/:id", donationController.donation_get_by_id);

router.put("/:id", donationController.updateDonation);

router.delete("/:id", donationController.deleteDonation);

module.exports = router;
