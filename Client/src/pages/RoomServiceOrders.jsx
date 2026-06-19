import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import InstallButton from "../components/InstallButton";

function RoomServiceOrders() {

  const [orders, setOrders] =
    useState([]);

  const previousCount =
  useRef(0);

  const previousReadyIds =
  useRef([]);

  const initialized =
  useRef(false);

const notificationSound =
  useRef(
    new Audio(
      "/notification.wav"
    )
  );

  const logout = () => {

  localStorage.clear();

  window.location.href = "/login";

};

  const fetchOrders =
    async () => {

      try {

        const response =
          await API.get(
            "/orders"
          );

       const readyOrders =
  response.data.filter(
    order =>
      order.status === "Ready"
  );

const currentIds =
  readyOrders.map(
    order => order._id
  );

const hasNewReadyOrder =
  currentIds.some(
    id =>
      !previousReadyIds.current.includes(
        id
      )
  );

if (
  initialized.current &&
  hasNewReadyOrder
) {

  notificationSound.current.play();

  if (navigator.vibrate) {

    navigator.vibrate([
      200,
      100,
      200
    ]);

  }

}

previousReadyIds.current =
  currentIds;

  initialized.current = true;
setOrders(readyOrders);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchOrders();

    const interval =
      setInterval(
        fetchOrders,
        5000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  const markDelivered =
    async (id) => {

      try {

        await API.put(

          `/orders/${id}/status`,

          {
            status:
              "Delivered",
          }

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="
flex
justify-between
items-start
mb-8
">

  <div>

    <h1 className="text-4xl font-bold">

      Room Service Dashboard

    </h1>

    <p className="text-gray-500 mt-2">

      👤 {localStorage.getItem("username")}

    </p>

  </div>

  <div className="
  flex
  gap-3
  ">

    <InstallButton />

    <button

      onClick={logout}

      className="
      bg-red-500
      hover:bg-red-600
      text-white
      px-4
      py-2
      rounded-xl
      shadow
      font-semibold
      "

    >

      🚪 Logout

    </button>

  </div>

</div>

      <div className="space-y-5">

        {orders.length === 0 && (

          <div className="bg-white rounded-3xl p-8 text-center">

            No Ready Orders

          </div>

        )}

        {orders.map(
          (order) => (

            <div

              key={
                order._id
              }

              className="bg-white rounded-3xl shadow-sm p-6"

            >

              <div className="flex justify-between mb-4">

                <div>

                  <h2 className="text-xl font-bold">

                    Room {
                      order.roomNumber
                    }

                  </h2>

                  <p className="text-gray-500">

                    ₹{
                      order.totalAmount
                    }

                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-xl">

                  Ready

                </span>

              </div>

              <div className="mb-4">

                {order.items.map(
                  (
                    item,
                    index
                  ) => (

                    <p
                      key={
                        index
                      }
                    >

                      {
                        item.name
                      }
                      {" "}
                      x
                      {
                        item.quantity
                      }

                    </p>

                  )
                )}

              </div>

              <button

                onClick={() =>
                  markDelivered(
                    order._id
                  )
                }

                className="bg-blue-600 text-white px-5 py-3 rounded-xl"

              >

                Mark Delivered

              </button>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default RoomServiceOrders;