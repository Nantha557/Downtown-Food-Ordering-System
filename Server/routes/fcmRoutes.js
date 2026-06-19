const express =
require("express");

const router =
express.Router();

const {
  saveToken,
} =
require(
  "../controllers/fcmController"
);

router.post(
  "/register",
  saveToken
);

module.exports =
router;