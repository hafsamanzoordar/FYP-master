const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/", userController.user_index);

router.get("/:id", userController.user_get_by_id);

router.put("/:id", userController.updateUser);

router.put("/inactive/:id", userController.make_user_inactive);

router.delete("/:id", userController.deleteUser);

module.exports = router;
