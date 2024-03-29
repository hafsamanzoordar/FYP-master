const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const verify = require("../utils/auth");

router.get("/", verify, donationController.donation_index);

router.get("/getDonations", verify, donationController.getDonation);

router.get("/approve/:id", donationController.approve_donation);

router.get("/approve/specific/:id", donationController.approve_specific);

router.get("/decline/:id", donationController.decline_donation);

router.get("/decline/specific/:id", donationController.decline_specific);

router.post("/", verify, donationController.donation_create_post);

router.post("/janaza/:id", verify, donationController.janaza_donation_post);

router.post("/collar/:id", verify, donationController.collar_donation_post);

router.get("/:id", donationController.donation_get_by_id);

router.put("/:id", donationController.updateDonation);

router.delete("/:id", donationController.deleteDonation);

module.exports = router;
