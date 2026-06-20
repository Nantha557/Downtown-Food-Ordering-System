const Order =
  require("../models/Order");

  const FcmToken =
require("../models/FcmToken");

const sendNotification =
require(
  "../utils/sendNotification"
);

const createOrder =
  async (req, res) => {

    try {

      const order =
        await Order.create(
          req.body
        );
        const kitchenToken =
await FcmToken.findOne({

  role:"Kitchen",

});

if(kitchenToken){

  await sendNotification(

    kitchenToken.token,

    "New Food Order 🍽️",

    `Room ${order.roomNumber} placed an order`

  );

}

      res.status(201).json(
        order
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to place order",
      });

    }

};

const getOrders =
  async (req, res) => {

    try {

     const orders =
  await Order.find({

    status: {
      $ne: "Paid"
    }

  });

      res.json(orders);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch orders",
      });

    }

};
const getOrderHistory =
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          status: "Paid",

        }).sort({

          createdAt: -1,

        });

      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch history",

      });

    }

};
const updateOrderStatus =
  async (req, res) => {

    try {

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }

        );

      res.json(order);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to update status",
      });

    }

};
const markOrderPaid =
  async (req, res) => {

    try {

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            status: "Paid",
            paymentStatus: "Paid",
          },

          {
            new: true,
          }

        );

      res.json(order);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to mark paid",

      });

    }

};
const getRevenue =
  async (req, res) => {

    try {

      const paidOrders =
        await Order.find({

          status: "Paid",

        });

      const revenue =
        paidOrders.reduce(

          (sum, order) =>

            sum +
            order.totalAmount,

          0

        );

      res.json({

        revenue,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to calculate revenue",

      });

    }

};

module.exports = {

  createOrder,
  getOrders,
  updateOrderStatus,
  markOrderPaid,
  getOrderHistory,
  getRevenue,

};