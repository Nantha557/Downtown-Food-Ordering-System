const mongoose = require("mongoose");

const fcmTokenSchema =
new mongoose.Schema({

  role: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

});

module.exports =
mongoose.model(
  "FcmToken",
  fcmTokenSchema
);