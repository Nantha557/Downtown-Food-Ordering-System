const mongoose =
require("mongoose");

require("dotenv").config();

const bcrypt =
require("bcryptjs");

const FoodUser =
require("./models/FoodUser");

mongoose.connect(
  process.env.MONGO_URI
);

async function createAdmin() {

  try {

    const existingUser =
      await FoodUser.findOne({
        username:
          "foodadmin",
      });

    if (existingUser) {

      console.log(
        "Food Admin already exists"
      );

      process.exit();

    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await FoodUser.create({

      username:
        "foodadmin",

      password:
        hashedPassword,

      role: "Admin",

      active: true,

    });

    console.log(
      "Food Admin created successfully"
    );

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();

  }

}

createAdmin();