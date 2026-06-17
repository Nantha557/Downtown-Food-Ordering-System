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
  image: {
  type: String,
  default:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
},

  available: {
    type: Boolean,
    default: true,
  },

});

module.exports =
  mongoose.model(
    "Food",
    foodSchema
  );