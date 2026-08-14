import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import API from "../services/api";

function Checkout() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const cart =
    location.state?.cart || [];

  const total =
    location.state?.total || 0;

  const [roomNumber,
    setRoomNumber] =
    useState("");

  const [orderPlaced,
    setOrderPlaced] =
    useState(false);

  const [placingOrder,
  setPlacingOrder] =
  useState(false);

  const placeOrder =
  async () => {

    if (!roomNumber.trim()) {

      alert(
        "Please enter your room number."
      );

      return;

    }

    if (placingOrder) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to place this order?"
      );

    if (!confirmed) {
      return;
    }

    setPlacingOrder(true);

    try {

      await API.post(
          "/orders",
          {

            roomNumber,
            restaurant:
              cart[0]?.restaurant,

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

        setOrderPlaced(true);

        setTimeout(() => {

          navigate("/menu");

        }, 2500);

} catch (error) {

  console.log(error);

  setPlacingOrder(false);

  alert(
    "Failed to place order."
  );

}

    };

  if (orderPlaced) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2]">

        <div
          className="
          bg-white
          p-10
          rounded-3xl
          shadow-xl
          text-center
          max-w-md
          "
        >

          <div className="text-6xl mb-4">
            🎉
          </div>

          <h2
            className="
            text-2xl
            font-bold
            text-green-600
            "
          >
            Order Placed Successfully
          </h2>

          <p
            className="
            text-gray-600
            mt-3
            "
          >
            Thank you for your order!
          </p>

          <p
            className="
            text-gray-500
            mt-1
            "
          >
            Your request has been sent to our kitchen.
          </p>

          <p
            className="
            text-sm
            text-gray-400
            mt-5
            "
          >
            Redirecting to Guest Portal...
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <h1
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Order Confirmation
      </h1>

      <div
        className="
        bg-white
        p-5
        rounded-3xl
        shadow-sm
        "
      >

        <input

          placeholder="Room Number"

          value={roomNumber}

          onChange={(e) =>
            setRoomNumber(
              e.target.value
            )
          }

          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "

        />

        <div className="mb-4">

          <h2 className="font-bold">

            Total: ₹{total}

          </h2>

        </div>

        <button

  onClick={placeOrder}

  disabled={placingOrder}

  className="
  w-full
  bg-green-600
  hover:bg-green-700
  disabled:bg-gray-400
  disabled:cursor-not-allowed
  text-white
  py-3
  rounded-xl
  font-semibold
  transition
  "

>

  {placingOrder
    ? "Placing Order..."
    : "Place Order"}

</button>

      </div>

    </div>

  );

}

export default Checkout;