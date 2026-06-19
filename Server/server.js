require("dotenv").config();

const express = require("express");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes =
require(
  "./routes/userRoutes"
);
const fcmRoutes =
require("./routes/fcmRoutes");

const connectDB =
  require("./config/db");

connectDB();


const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/menu",
  menuRoutes
);
app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/foods",
  foodRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
  "/api/fcm",
  fcmRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Food Ordering API Running"
  );

});

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Server running on ${PORT}`
    );

  }
);