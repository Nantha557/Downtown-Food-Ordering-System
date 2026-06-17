const mongoose = require("mongoose");
const XLSX = require("xlsx");

require("dotenv").config();

const Food = require("./models/Food");

mongoose.connect(process.env.MONGO_URI);

async function seedFoods() {

  try {

    console.log("Reading Excel...");

    const workbook = XLSX.readFile(
      "Room_Service_Cleaned.xlsx"
    );

    console.log("Available Sheets:");
    console.log(
      workbook.SheetNames
    );

    const sheet =
      workbook.Sheets[
        workbook.SheetNames[0]
      ];

    const data =
      XLSX.utils.sheet_to_json(
        sheet
      );

    console.log(
      `Rows Found: ${data.length}`
    );

    const foods = [];

    for (const row of data) {

      if (
        !row["Dish Name"] ||
        !row["Category"] ||
        !row["Price"]
      ) {
        continue;
      }

      foods.push({

        name:
          row["Dish Name"],

        category:
          row["Category"],

        type:
          row["Type"] || "Veg",

        price:
          Number(
            row["Price"]
          ),

        image:
          row["Image"] ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

        available: true,

      });

    }

    console.log(
      "Foods Detected:"
    );

    console.log(
      foods.length
    );

    console.log(
      foods.slice(0, 5)
    );

    console.log(
      "Deleting old foods..."
    );

    await Food.deleteMany();

    console.log(
      "Importing new foods..."
    );

    await Food.insertMany(
      foods
    );

    console.log(
      `${foods.length} foods added successfully`
    );

    process.exit();

  } catch (error) {

    console.log(
      "SEED ERROR:"
    );

    console.log(error);

    process.exit();

  }

}

seedFoods();