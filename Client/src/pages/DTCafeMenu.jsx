import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useLocation } from "react-router-dom";

function DTCafeMenu() {

  const [foods, setFoods] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [cart, setCart] =
    useState([]);

  const [search, setSearch] =
  useState("");

  const sectionRefs =
    useRef({});


    const [showContact, setShowContact] = useState(false);

const location =
  useLocation();

const selectedCategory =
  location.state?.category;


  const navigate = useNavigate();

  const [activeCategory,
  setActiveCategory] =
  useState("");

  const categories = [

  ...new Set(

    foods.map(
      (food) => food.category
    )

  ),

];
useEffect(() => {

  if (
    categories.length > 0 &&
    !activeCategory
  ) {

    setActiveCategory(
      categories[0]
    );

  }

}, [foods]);


 useEffect(() => {

  fetchFoods();

}, []);

useEffect(() => {

  if (
    foods.length > 0 &&
    selectedCategory &&
    sectionRefs.current[selectedCategory]
  ) {

    setTimeout(() => {

      sectionRefs.current[
        selectedCategory
      ]?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }, 300);

  }

}, [foods, selectedCategory]);

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

    setLoading(true);

    const response =
      await API.get(
        "/foods?restaurant=DT Cafe"
      );

    setFoods(

      response.data.filter(
        (food) => food.available
      )

    );

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

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

    if (loading) {

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#f7f5f2]
      "
    >

      <div className="text-center">

        <div
          className="
          text-6xl
          animate-bounce
          "
        >
          ☕
        </div>

        <img
          src="/CAFE LOGO.png"
          alt="DT Cafe"
          className="
          w-44
          mx-auto
          mt-4
          "
        />

        <p
          className="
          mt-6
          text-xl
          font-semibold
          text-[#8B5E34]
          "
        >
          Preparing your menu...
        </p>

        <div
          className="
          flex
          justify-center
          gap-2
          mt-5
          "
        >

          <div
            className="
            w-3
            h-3
            rounded-full
            bg-[#C89563]
            animate-bounce
            "
          />

          <div
            className="
            w-3
            h-3
            rounded-full
            bg-[#C89563]
            animate-bounce
            [animation-delay:150ms]
            "
          />

          <div
            className="
            w-3
            h-3
            rounded-full
            bg-[#C89563]
            animate-bounce
            [animation-delay:300ms]
            "
          />

        </div>

      </div>

    </div>

  );

}

    if (foods.length === 0) {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg">

        <h1 className="text-4xl mb-4">
          🍽️
        </h1>

        <h2 className="text-2xl font-bold">

          Restaurant Closed

        </h2>

        <p className="text-gray-500 mt-3">

          Room service is currently unavailable.

        </p>

        <div className="mt-6 text-left text-gray-700">

          <p>
            🌅 Breakfast :
            7:00 AM - 10:00 AM
          </p>

          <p>
            🍛 Lunch :
            1:00 PM - 3:00 PM
          </p>

          <p>
            🌙 Dinner :
            7:00 PM - 10:00 PM
          </p>

          <p>
            ☕ DT Café :
            11:00 AM - 11:00 PM
          </p>

        </div>

      </div>

    </div>

  );

}

 return (

<div className="min-h-screen bg-[#f7f5f2] pb-28">

{/* Header */}
<div
  className="
    fixed
    top-0
    left-0
    right-0
    z-50
    bg-[#C89563]
    px-5
    py-4
    shadow-lg
  "
>
  <div className="relative flex items-center justify-center">

    {/* Back Button */}
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="
        absolute
        left-0
        text-white
        text-2xl
      "
    >
      ←
    </button>

    {/* DT Cafe Logo */}
    <div className="text-center">
      <img
        src="/DT Cafe Logo White.png"
        alt="DT Cafe"
        className="
          w-40
          h-auto
          object-contain
          mx-auto
        "
      />

      <p className="text-white/80 text-sm">
        Freshly Made Warmly Served
      </p>
    </div>

    {/* Contact Icon */}
    <button
      type="button"
      onClick={() => setShowContact((prev) => !prev)}
      aria-label="Show DT Cafe contact details"
      aria-expanded={showContact}
      className="
        absolute
        right-0
        w-9
        h-9
        flex
        items-center
        justify-center
        rounded-full
        bg-white/20
        hover:bg-white/30
        text-white
        text-xl
        transition
      "
    >
      <span aria-hidden="true">☎</span>
    </button>

    {/* Contact Popup */}
    {showContact && (
      <div
        className="
          absolute
          right-0
          top-full
          mt-3
          w-60
          max-w-[calc(100vw-2rem)]
          bg-white
          rounded-2xl
          shadow-xl
          border
          border-[#C89563]/20
          p-4
          text-gray-800
          text-left
          z-[60]
        "
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#A66D36]">
            DT Cafe Contact
          </h3>

          <button
            type="button"
            onClick={() => setShowContact(false)}
            aria-label="Close contact details"
            className="
              text-gray-500
              hover:text-gray-800
              text-xl
              px-1
            "
          >
            ×
          </button>
        </div>

        {/* Extension */}
        <div className="flex items-center gap-2 mb-3">
          <span aria-hidden="true">☎</span>

          <div>
            <p className="text-xs text-gray-500">
              Room Extension
            </p>
            <p className="font-semibold">700</p>
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex items-center gap-2">
          <span aria-hidden="true">📱</span>

          <div className="min-w-0">
            <p className="text-xs text-gray-500">
              Mobile Number
            </p>

            <a
              href="tel:+917550055015"
              className="
                block
                font-semibold
                text-sm
                text-[#A66D36]
                hover:underline
                break-words
              "
            >
              +91 755 005 5015
            </a>
          </div>
        </div>
      </div>
    )}

  </div>
</div>

{/* Search */}

<div
className="
sticky
top-[120px]
z-40
bg-white
p-4
shadow
"
>

<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="🔍 Search dishes..."

className="

w-full

border

rounded-xl

px-4

py-3

focus:ring-2

focus:ring-[#C89563]

"

/>

</div>

{/* Main */}

<div className="flex mt-28">

{/* Sidebar */}

<div


className="

w-28

sticky

top-[145px]

h-[calc(100vh-150px)]

overflow-y-auto

bg-[#E8CCAE]

border-r

border-[#D5A97A]

"

>

{

categories.map(category=>(

<button

key={category}

onClick={() => {

setActiveCategory(category);

sectionRefs.current[category]

?.scrollIntoView({

behavior:"smooth",

block:"start"

});

}}

className={`

w-full

text-left

px-3

py-4

text-sm

font-medium

border-l-4

transition

${

activeCategory===category

?

"border-[#C89563] bg-orange-50 text-[#C89563]"

:

"border-transparent"

}

`}

>

{category}

</button>

))

}

</div>

{/* Menu */}

<div className="flex-1 p-4">

{

categories.map(category=>{

const categoryFoods=

foods.filter(

food=>

food.category===category &&

(

food.name

.toLowerCase()

.includes(

search.toLowerCase()

)

||

food.category

.toLowerCase()

.includes(

search.toLowerCase()

)

)

);

if(categoryFoods.length===0)

return null;

return(

<div

key={category}

id={category}

ref={(el)=>

sectionRefs.current[category]=el

}

className="mb-10"

>

<h2

className="

text-2xl

font-bold

mb-5

text-[#C89563]

"

>

{category}

</h2>

<div className="space-y-4">

{categoryFoods.map((food) => (

<div
  key={food._id}
  className="
  bg-white
  rounded-2xl
  shadow-sm
  p-4
  flex
  justify-between
  items-center
  "
>

<div>

<h3 className="text-lg font-semibold">

{food.name}

</h3>

<div className="flex items-center gap-2 mt-1">

  {food.type === "Veg" ? (

    <div
      className="
      w-4
      h-4
      border
      border-green-600
      flex
      items-center
      justify-center
      "
    >

      <div
        className="
        w-2
        h-2
        rounded-full
        bg-green-600
        "
      />

    </div>

  ) : (

    <div
      className="
      w-4
      h-4
      border
      border-red-600
      flex
      items-center
      justify-center
      "
    >

      <div
        className="
        w-2
        h-2
        rounded-full
        bg-red-600
        "
      />

    </div>

  )}

  <span className="text-sm text-gray-500">

    {food.type}

  </span>

</div>

<p className="text-xl font-bold text-[#C89563] mt-1">

₹{food.price}

</p>

</div>

{cart.find(

(item)=>

item._id===food._id

)

?

(

<div className="flex items-center gap-3">

<button

onClick={()=>

decreaseQuantity(food._id)

}

className="

w-8

h-8

bg-red-500

text-white

rounded-full

"

>

-

</button>

<span className="font-bold">

{

cart.find(

(item)=>

item._id===food._id

).quantity

}

</span>

<button

onClick={()=>

increaseQuantity(food._id)

}

className="

w-8

h-8

bg-green-600

text-white

rounded-full

"

>

+

</button>

</div>

)

:

(

<button

onClick={()=>

addToCart(food)

}

className="

bg-[#C89563]

hover:bg-[#b47f4b]

text-white

px-4

py-2

rounded-xl

"

>

Add

</button>

)

}

</div>

))}

</div>

</div>

);

})

}

</div>

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

export default DTCafeMenu;