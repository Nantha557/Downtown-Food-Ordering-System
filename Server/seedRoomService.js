const mongoose = require("mongoose");
const XLSX = require("xlsx");

require("dotenv").config();

const Food = require("./models/Food");

mongoose.connect(process.env.MONGO_URI);

async function importExcel(fileName, restaurant) {

  console.log(`Reading ${fileName}...`);

  const workbook =
    XLSX.readFile(fileName);

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  const data =
    XLSX.utils.sheet_to_json(
      sheet
    );

  console.log(
    `${restaurant}: ${data.length} rows`
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

      restaurant,

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

      breakfast:
        row["Breakfast"] === true,

      lunch:
        row["Lunch"] === true,

      dinner:
        row["Dinner"] === true,

      allTime:
        row["All Time"] === true,

      available: true,

    });

  }

  return foods;

}

async function seedFoods() {

  try {

    console.log(
      "Deleting old foods..."
    );

    await Food.deleteMany();

    const pavilionFoods =
      await importExcel(

        "Pavilion_Menu.xlsx",

        "Pavilion"

      );

    const dtCafeFoods =
      await importExcel(

        "DTCafe_Menu.xlsx",

        "DT Cafe"

      );

    const foods = [

      ...pavilionFoods,

      ...dtCafeFoods,

    ];

    console.log(
      `Total Foods: ${foods.length}`
    );

    await Food.insertMany(
      foods
    );

    console.log(
      "Seed completed successfully."
    );

    process.exit();

  }

  catch (error) {

    console.log(error);

    process.exit();

  }

}

seedFoods();