import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function GuestMenu() {

  const [foods, setFoods] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [search, setSearch] =
  useState("");

  const sectionRefs =
    useRef({});

  const categoryRefs =
  useRef({});


  const navigate = useNavigate();

  const [activeCategory,
  setActiveCategory] =
  useState("Breakfast");

  const categories = [

    "Breakfast",

    "Soups Veg",
    "Soups Non Veg",

    "Tandoori Veg",
    "Tandoori Non Veg",

    "Veg Starters",
    "Non Veg Starters",

    "Egg Starters",

    "Acompaniments",

    "Indian Gravy Veg",
    "Indian Gravy Non-Veg",

    "Chinese Gravy Veg",
    "Chinese Gravy Non Veg",

    "Rice & Noodles Veg",
    "Rice & Noodles Non Veg",

    "Indian Breads",

    "Desserts",

    "Choice Lassi",

    "Choice of Milkshakes",

  ];
  useEffect(() => {

  categoryRefs.current[
    activeCategory
  ]?.scrollIntoView({

    behavior: "smooth",

    inline: "center",

    block: "nearest",

  });

}, [activeCategory]);

 useEffect(() => {

  fetchFoods();

}, []);

useEffect(() => {

  const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            setActiveCategory(
              entry.target.id
            );

          }

        }
      );

    },

    {

      rootMargin:
        "-100px 0px -60% 0px",

      threshold: 0,

    }

  );

  categories.forEach(
    (category) => {

      const section =
        document.getElementById(
          category
        );

      if (section)
        observer.observe(
          section
        );

    }
  );

  return () =>
    observer.disconnect();

}, [foods]);

  const fetchFoods = async () => {

    try {

      const response =
        await API.get("/foods");

      setFoods(

        response.data.filter(
          (food) =>
            food.available
        )

      );

    } catch (error) {

      console.log(error);

    }

  };

  const addToCart = (food) => {

    const existing =
      cart.find(

        (item) =>
          item._id === food._id

      );

    if (existing) {

      setCart(

        cart.map((item) =>

          item._id === food._id

            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }

            : item

        )

      );

    } else {

      setCart([

        ...cart,

        {
          ...food,
          quantity: 1,
        },

      ]);

    }

  };
  const increaseQuantity = (foodId) => {

  setCart(

    cart.map((item) =>

      item._id === foodId

        ? {
            ...item,
            quantity:
              item.quantity + 1,
          }

        : item

    )

  );

};

const decreaseQuantity = (foodId) => {

  const updatedCart =
    cart
      .map((item) =>

        item._id === foodId

          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }

          : item

      )

      .filter(
        (item) =>
          item.quantity > 0
      );

  setCart(updatedCart);

};

  const cartTotal =
    cart.reduce(

      (sum, item) =>

        sum +
        item.price *
          item.quantity,

      0

    );

  return (

    <div className="min-h-screen bg-gray-100 pb-28">

      {/* HERO */}

<div className="bg-white p-4 sticky top-0 z-50">

  <div className="relative">

    <input

      placeholder="🔍 Search dishes..."

      value={search}

      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }

      className="

w-full
border

rounded-full

px-5
py-3

shadow-sm

focus:ring-2
focus:ring-green-500

"

    />

  </div>

</div>


      <div className="relative">

        <img

          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"

          alt="restaurant"

          className="w-full h-52 object-cover"

        />

        <div className="absolute inset-0 bg-black/40 flex items-end">

          <div className="p-5">

            <h1 className="text-white text-3xl font-bold">

              Downtown Restaurant

            </h1>

            <p className="text-white">

              Room Service Menu

            </p>

          </div>

        </div>

      </div>

      {/* CATEGORY BAR */}

      <div className="sticky top-17 bg-white z-50 shadow-sm">

        <div className="

flex
gap-3

overflow-x-auto

p-3

scroll-smooth

no-scrollbar
">

          {categories.map(
            (category) => (

              <button
  key={category}
  ref={(el) =>
    categoryRefs.current[
      category
    ] = el
  }

               onClick={() => {

  setActiveCategory(
    category
  );

  sectionRefs.current[
    category
  ]?.scrollIntoView({

    behavior: "smooth",

    block: "start",

  });

}}
                

                className={`

px-4 py-2
rounded-full
whitespace-nowrap
font-medium
transition-all
duration-300

${
  activeCategory ===
  category

    ? "bg-green-600 text-white scale-105 shadow-lg ring-4 ring-green-200"

    : "bg-green-100 text-gray-700 hover:bg-green-200"
}
`}

              >

                {category}

              </button>

            )
          )}

        </div>

      </div>

      {/* MENU SECTIONS */}

      <div className="p-4">

        {categories.map(
          (category) => {

            const categoryFoods =
  foods.filter(

    (food) =>

      food.category ===
      category &&

      food.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

  );

            if (
              categoryFoods.length ===
              0
            )
              return null;

            return (

              <div

                id={category}
                key={category}

                ref={(el) =>

                  (sectionRefs.current[
                    category
                  ] = el)

                }

                className="mb-10"

              >

                <h2 className="

text-2xl
font-bold
mb-4

sticky
top-30

bg-gray-100

py-2

z-10

text-green-700
">

                  {category}

                </h2>

                <div className="space-y-4">

                  {categoryFoods.map((food) => (

  <div
    key={food._id}
    className="
bg-white
rounded-3xl
shadow-sm

p-4

flex
flex-col

md:flex-row

gap-4

justify-between

md:items-center
"
  >

    <div className="flex gap-4">

      <img
  src={food.image}
  alt={food.name}
  onError={(e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
  }}
  className="
    w-20 h-20
    md:w-24 md:h-24
    rounded-2xl
    object-cover
  "
/>

      <div>

        <h3 className="font-bold text-lg">
          {food.name}
        </h3>

        <p className="text-gray-500">
          {food.type}
        </p>

        <p className="font-bold text-green-600">
          ₹{food.price}
        </p>

      </div>

    </div>

{cart.find(
  (item) =>
    item._id === food._id
) ? (

  <div className="flex items-center gap-3">

    <button

      onClick={() =>
        decreaseQuantity(
          food._id
        )
      }

      className="

w-8 h-8

bg-red-500
text-white

rounded-full

font-bold

"

    >

      -

    </button>

    <span className="font-bold">

      {
        cart.find(
          (item) =>
            item._id ===
            food._id
        ).quantity
      }

    </span>

    <button

      onClick={() =>
        increaseQuantity(
          food._id
        )
      }

      className="

w-8 h-8

bg-green-600
text-white

rounded-full

font-bold

"

    >

      +

    </button>

  </div>

) : (

  <button

  onClick={() =>
    addToCart(food)
  }

  className="
bg-green-600
hover:bg-green-700

text-white

px-4
py-2

rounded-xl

font-semibold

transition-all
duration-300
"

>

  Add

</button>
)}

  </div>

))}
                </div>

              </div>

            );

          }

        )}

      </div>

      {/* CART BAR */}

      {cart.length > 0 && (

        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 flex justify-between items-center">

          <div>

            {cart.length}
            {" "}
            Items

          </div>

          <div>

            ₹{cartTotal}

          </div>

          <button

  onClick={() =>

    navigate(
      "/cart",
      {
        state: {
          cart,
          total:
            cartTotal,
        },
      }
    )

  }

  className="bg-white text-green-600 px-5 py-2 rounded-xl font-bold"

>

  View Cart

</button>

        </div>

      )}

    </div>

  );

}

export default GuestMenu;