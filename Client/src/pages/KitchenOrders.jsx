import { useEffect, useState, useRef } from "react";
import API from "../services/api";

function ManagerOrders() {

  const [orders, setOrders] =
    useState([]);

//   const notificationSound =
//   new Audio("/notification.wav");

//   const [previousCount,
// setPreviousCount] =
// useState(0);

const previousCount = useRef(0);

const notificationSound = useRef(
  new Audio("/notification.wav")
);

  const fetchOrders =
    async () => {

      try {

        const response =
          await API.get(
            "/orders"
          );

       const activeOrders =
  response.data.filter(
    order =>
      order.status !== "Delivered" &&
      order.status !== "Paid"
  );

if (
  activeOrders.length >
  previousCount.current
) {

  console.log("NEW ORDER!");

  notificationSound.current.play();

  if (navigator.vibrate) {
    navigator.vibrate([200,100,200]);
  }
}

previousCount.current =
  activeOrders.length;

setOrders(activeOrders);

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

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await API.put(

          `/orders/${id}/status`,

          {
            status,
          }

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Kitchen Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Live Room Service Orders

        </p>

      </div>

      {/* STATS */}

      <div className="bg-white rounded-3xl shadow p-5 mb-8">

        <p className="text-gray-500">

          Pending Orders

        </p>

        <h2 className="text-4xl font-bold text-red-500">

          {orders.length}

        </h2>

      </div>

      {/* EMPTY STATE */}

      {orders.length === 0 && (

        <div className="bg-white rounded-3xl shadow p-10 text-center">

          <div className="text-6xl mb-4">
            🍽️
          </div>

          <h2 className="text-2xl font-bold">

            No Active Orders

          </h2>

          <p className="text-gray-500 mt-2">

            New room service orders
            will appear here

          </p>

        </div>

      )}

      {/* ORDERS */}

      <div className="space-y-5">

        {orders.map(
          (order) => (

            <div

              key={order._id}

              className="bg-white rounded-3xl shadow-md p-6"

            >

              {/* TOP */}

              <div className="flex justify-between items-start mb-4">

                <div>

                  <h2 className="text-2xl font-bold">

                    Room {order.roomNumber}

                  </h2>

                  <p className="text-green-600 font-bold text-lg">

                    ₹{order.totalAmount}

                  </p>

                  <p className="text-gray-400 text-sm">

                    {new Date(
                      order.createdAt
                    ).toLocaleTimeString()}

                  </p>

                </div>

                <span

                  className={`

px-4 py-2
rounded-xl
font-semibold

${
  order.status === "Ready"

    ? "bg-green-100 text-green-700"

    : order.status === "Preparing"

    ? "bg-yellow-100 text-yellow-700"

    : "bg-blue-100 text-blue-700"

}

`}

                >

                  {order.status}

                </span>

              </div>

              {/* ITEMS */}

              <div className="bg-gray-50 rounded-2xl p-4 mb-5">

                <h3 className="font-bold mb-2">

                  Ordered Items

                </h3>

                {order.items.map(
                  (
                    item,
                    index
                  ) => (

                    <div

                      key={index}

                      className="flex justify-between py-1"

                    >

                      <span>

                        {item.name}

                      </span>

                      <span className="font-semibold">

                        x{item.quantity}

                      </span>

                    </div>

                  )
                )}

              </div>

              {/* ACTIONS */}

              <div className="flex gap-3 flex-wrap">

                <button

                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Preparing"
                    )
                  }

                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl"

                >

                  Preparing

                </button>

                <button

                  onClick={() =>
                    updateStatus(
                      order._id,
                      "Ready"
                    )
                  }

                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"

                >

                  Ready

                </button>

              </div>

            </div>

          )
        )}

      </div>
      <button
  onClick={() => {
    const audio =
      new Audio(
        "/notification.wav"
      );

    audio.play();
  }}
>
  Test Sound
</button>

    </div>

  );

}

export default ManagerOrders;