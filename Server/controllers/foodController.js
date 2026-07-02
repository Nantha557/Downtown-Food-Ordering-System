const Food = require("../models/Food");

const getFoods = async (req, res) => {

  try {

    const indiaTime = new Date(
  new Date().toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Kolkata",
    }
  )
);

const currentTime =
  indiaTime.getHours() * 60 +
  indiaTime.getMinutes();

    let filter = {};

    // Breakfast
    if (
      currentTime >= 420 &&
      currentTime < 600
    ) {

      filter = {
        breakfast: true,
      };

    }

    // Lunch + All Time
    else if (
      currentTime >= 780 &&
      currentTime < 900
    ) {

      filter = {
        $or: [
          { lunch: true },
          { allTime: true },
        ],
      };

    }

    // Dinner + All Time
    else if (
      currentTime >= 1140 &&
      currentTime < 1320
    ) {

      filter = {
        $or: [
          { dinner: true },
          { allTime: true },
        ],
      };

    }

    // All Time only (11 AM - 1 PM)
    else if (
      currentTime >= 660 &&
      currentTime < 780
    ) {

      filter = {
        allTime: true,
      };

    }

    // All Time only (3 PM - 7 PM)
    else if (
      currentTime >= 900 &&
      currentTime < 1140
    ) {

      filter = {
        allTime: true,
      };

    }

    // All Time only (10 PM - 11 PM)
    else if (
      currentTime >= 1320 &&
      currentTime < 1380
    ) {

      filter = {
        allTime: true,
      };

    }

    // Restaurant Closed
    else {

      return res.json([]);

    }

const foods = await Food.find({

  available: true,

  ...filter,

});


    res.json(foods);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Failed to fetch foods",

    });

  }

};

const addFood = async (req, res) => {

  try {

    const food = await Food.create(
      req.body
    );

    res.status(201).json(food);

  } catch (error) {

    res.status(500).json({
      message: "Failed to add food",
    });

  }

};

const deleteFood = async (
  req,
  res
) => {

  try {

    await Food.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Food deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed",
    });

  }

};
const toggleAvailability =
  async (req, res) => {

    try {

      const food =
        await Food.findById(
          req.params.id
        );

      food.available =
        !food.available;

      await food.save();

      res.json(food);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to update availability",
      });

    }

};

const updateFood = async (req, res) => {

  try {

    const food =
      await Food.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.json(food);

  } catch (error) {

    res.status(500).json({
      message: "Update failed",
    });

  }

};
const getAllFoods = async (req, res) => {

  try {

    const foods = await Food.find();

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch foods",
    });

  }

};
module.exports = {
  getFoods,
  addFood,
  deleteFood,
  toggleAvailability,
  updateFood,
  getAllFoods,
};