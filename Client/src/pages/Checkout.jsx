import { useState } from "react";

import { useLocation } from "react-router-dom";

import API from "../services/api";

function Checkout() {

  const location =
    useLocation();

  const cart =
    location.state?.cart || [];

  const total =
    location.state?.total || 0;

  const [roomNumber,
    setRoomNumber] =
    useState("");

  const placeOrder =
    async () => {

      try {

        await API.post(
          "/orders",
          {

            roomNumber,

            items:
              cart.map(
                (item) => ({
                  foodId:
                    item._id,

                  name:
                    item.name,

                  quantity:
                    item.quantity,

                  price:
                    item.price,
                })
              ),

            totalAmount:
              total,

          }
        );

        alert(
          "Order Placed Successfully"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <h1 className="text-3xl font-bold mb-6">

        Checkout

      </h1>

      <div className="bg-white p-5 rounded-3xl shadow-sm">

        <input

          placeholder="Room Number"

          value={roomNumber}

          onChange={(e) =>
            setRoomNumber(
              e.target.value
            )
          }

          className="w-full border rounded-xl p-3 mb-4"

        />

        <div className="mb-4">

          <h2 className="font-bold">

            Total:
            ₹{total}

          </h2>

        </div>

        <button

          onClick={placeOrder}

          className="w-full bg-green-600 text-white py-3 rounded-xl"

        >

          Place Order

        </button>

      </div>

    </div>

  );

}

export default Checkout;