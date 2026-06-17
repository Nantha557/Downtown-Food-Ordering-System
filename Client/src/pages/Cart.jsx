import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const cart =
    location.state?.cart || [];

  const total =
    location.state?.total || 0;

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <h1 className="text-3xl font-bold mb-6">

        Your Cart

      </h1>

      <div className="space-y-4">

        {cart.map((item) => (

          <div

            key={item._id}

            className="bg-white p-4 rounded-2xl shadow"

          >

            <h2 className="font-bold">

              {item.name}

            </h2>

            <p>

              Qty: {item.quantity}

            </p>

            <p>

              ₹
              {item.price *
                item.quantity}

            </p>

          </div>

        ))}

      </div>

      <div className="bg-white rounded-2xl p-5 shadow mt-6">

        <h2 className="text-2xl font-bold">

          Total: ₹{total}

        </h2>

        <button

          onClick={() =>
            navigate(
              "/checkout",
              {
                state: {
                  cart,
                  total,
                },
              }
            )
          }

          className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl"

        >

          Proceed To Checkout

        </button>

      </div>

    </div>

  );

}

export default Cart;