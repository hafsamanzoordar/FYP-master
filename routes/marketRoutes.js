const express = require("express");
const router = express.Router();
const marketController = require("../controllers/marketController");

router.get("/", marketController.market_index);

router.get("/getByLocation", marketController.getByLocation);

router.get("/getByType", marketController.getByType);

router.post("/", marketController.market_create_post);

router.get("/:id", marketController.market_get_by_id);

router.put("/:id", marketController.updateMarket);

router.delete("/:id", marketController.deleteMarket);

module.exports = router;
