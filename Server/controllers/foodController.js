const Food = require("../models/Food");

const getFoods = async (req, res) => {

  try {

    const foods = await Food.find();

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch foods",
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
module.exports = {
  getFoods,
  addFood,
  deleteFood,
  toggleAvailability,
  updateFood,
};