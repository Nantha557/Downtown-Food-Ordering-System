const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  roomNumber: {
    type: String,
    required: true,
  },

  items: [
    {
      foodId: String,

      name: String,

      quantity: Number,

      price: Number,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
  type: String,
  enum: [
    "Pending",
    "Preparing",
    "Ready",
    "Delivered",
    "Paid",
    "Printed",
  ],
  default: "Pending",
},

  paymentStatus: {

    type: String,

    enum: [
      "Pending",
      "Paid",
    ],

    default: "Pending",

  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );