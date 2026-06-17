const express =
  require("express");

const router =
  express.Router();

const {

  createOrder,
  getOrders,
  updateOrderStatus,
  markOrderPaid,
  getOrderHistory,
  getRevenue,

} = require(
  "../controllers/orderController"
);

router.post(
  "/",
  createOrder
);

router.get(
  "/",
  getOrders
);
router.put(
  "/:id/status",
  updateOrderStatus
);
router.put(
  "/:id/pay",
  markOrderPaid
);
router.get(
  "/history",
  getOrderHistory
);
router.get(
  "/revenue",
  getRevenue
);

module.exports =
  router;