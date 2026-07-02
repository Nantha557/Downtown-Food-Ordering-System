const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

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

  type: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
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

});

module.exports =
  mongoose.model(
    "Food",
    foodSchema
  );