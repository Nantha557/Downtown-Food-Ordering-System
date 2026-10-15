
const Food = require("../models/Food");

const getFoods = async (req, res) => {
  try {
    const { restaurant } = req.query;
    const meal = req.query.meal?.toLowerCase();

    const query = {
      available: true,
    };

    if (restaurant) {
      query.restaurant = restaurant;
    }

    // Fetch a requested meal menu regardless of current time.
    if (meal) {
      if (meal === "all") {
        // No meal filter: return all available foods.
      } else if (
        ["breakfast", "lunch", "dinner"].includes(meal)
      ) {
        query.$or = [
          { [meal]: true },
          { allTime: true },
        ];
      } else {
        return res.status(400).json({
          message:
            "Invalid meal. Use breakfast, lunch, dinner, or all.",
        });
      }

      const foods = await Food.find(query);
      return res.json(foods);
    }

    // Preserve existing time-based behavior for old requests.
    const indiaTime = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );

    const currentTime =
      indiaTime.getHours() * 60 +
      indiaTime.getMinutes();

    let timeFilter = {};

    if (currentTime >= 420 && currentTime < 600) {
      timeFilter = { breakfast: true };
    } else if (
      currentTime >= 780 &&
      currentTime < 900
    ) {
      timeFilter = {
        $or: [{ lunch: true }, { allTime: true }],
      };
    } else if (
      currentTime >= 1140 &&
      currentTime < 1350
    ) {
      timeFilter = {
        $or: [{ dinner: true }, { allTime: true }],
      };
    } else if (
      (currentTime >= 660 && currentTime < 780) ||
      (currentTime >= 900 && currentTime < 1140) ||
      (currentTime >= 1350 && currentTime < 1380)
    ) {
      timeFilter = { allTime: true };
    } else {
      return res.json([]);
    }

    const foods = await Food.find({
      ...query,
      ...timeFilter,
    });

    return res.json(foods);
  } catch (error) {
    console.error("Failed to fetch foods:", error);

    return res.status(500).json({
      message: "Failed to fetch foods",
    });
  }
};

const addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add food",
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);

    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    food.available = !food.available;
    await food.save();

    res.json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update availability",
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

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
