const mongoose = require("mongoose");

const menuItemSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
    type: {
  type: String,
  enum: ["Veg", "Non-Veg"],
  default: "Veg",
},

breakfast: {
  type: Boolean,
  default: false,
},

lunch: {
  type: Boolean,
  default: false,
},

dinner: {
  type: Boolean,
  default: false,
},

allTime: {
  type: Boolean,
  default: false,
},

  },

  {
    timestamps: true,
  }

);

module.exports =
  mongoose.model(
    "MenuItem",
    menuItemSchema
  );