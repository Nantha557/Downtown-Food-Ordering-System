const express = require("express");

const router = express.Router();

const {

  getFoods,
  addFood,
  deleteFood,
  toggleAvailability,
  updateFood,
  getAllFoods,

} = require(
  "../controllers/foodController"
);
router.get(
  "/all",
  getAllFoods
);

router.get("/", getFoods);

router.post("/", addFood);

router.delete(
  "/:id",
  deleteFood
);

router.put(
  "/:id/availability",
  toggleAvailability
);

router.put(
  "/:id",
  updateFood
);

module.exports = router;