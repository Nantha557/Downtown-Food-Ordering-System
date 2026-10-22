import { useEffect, useState } from "react";
import API from "../services/api";
import InstallButton from "../components/InstallButton";

function MenuManagement() {

  const [foods, setFoods] = useState([]);

  const [restaurant, setRestaurant] = useState("Pavilion");

  const [name, setName] = useState("");

  const [category, setCategory] =
  useState("Breakfast");

  const [price, setPrice] =    useState("");

  const [type, setType] =    useState("Veg");

  const [breakfast, setBreakfast] =
useState(false);

const [lunch, setLunch] =
useState(false);

const [dinner, setDinner] =
useState(false);

const [allTime, setAllTime] =
useState(false);

  const [showEditModal,setShowEditModal] =useState(false);

  const [editingFood, setEditingFood] = useState(null);

  const [search, setSearch] =  useState("");


const pavilionCategories = [
  "Breakfast",
  "Soups",
  "Tandoori",
  "Starters",
  "Acompaniments",
  "Indian Gravy",
  "Chinese Gravy",
  "Rice & Noodles",
  "Indian Breads",
  "Desserts And Beverages",
];

  // Starter list for DT Café. Replace with the exact café menu categories if needed.
const cafeCategories = [
  "Small Plates",
  "Pizza",
  "Sandwich",
  "Burger",
  "Pasta",
  "Waffle",
  "Keto Sandwich",
  "Tacos",
  "French Fries",
  "Wraps",
  "Quesadilla",
  "Croissant",
  "Dessert",
  "Fresh Juice",
  "Smoothies",
  "Coffee & Tea",
  "Cakes",
];
  const categories = restaurant === "Pavilion"
    ? pavilionCategories
    : cafeCategories;

  const fetchFoods = async () => {

    try {

      const response =
        await API.get("/foods/all");

      setFoods(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

  localStorage.clear();

  window.location.href = "/login";

};

  const toggleAvailability =
  async (id) => {

    try {

      await API.put(
        `/foods/${id}/availability`
      );

      fetchFoods();

    } catch (error) {

      console.log(error);

    }

};

  useEffect(() => {

    fetchFoods();

  }, []);

  
const handleRestaurantChange = (nextRestaurant) => {
  setRestaurant(nextRestaurant);
  setCategory(nextRestaurant === "Pavilion" ? "Breakfast" : "Tea & Coffee");
  setBreakfast(false);
  setLunch(false);
  setDinner(false);
  setAllTime(false);
};

const addFood = async () => {
  const trimmedName = name.trim();
  const numericPrice = Number(price);

  if (!restaurant || !trimmedName || price.trim() === "") {
    alert("Please fill in the restaurant, dish name, and price.");
    return;
  }

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    alert("Please enter a valid price greater than zero.");
    return;
  }

  if (restaurant === "Pavilion" && !breakfast && !lunch && !dinner) {
    alert("Please select at least one Pavilion meal time.");
    return;
  }

  if (restaurant === "DT Cafe" && !allTime) {
    alert("Please select Café Time (11 AM – 11 PM).");
    return;
  }

  const foodData = {
    restaurant,
    name: trimmedName,
    category,
    price: numericPrice,
    type,
    breakfast: restaurant === "Pavilion" ? breakfast : false,
    lunch: restaurant === "Pavilion" ? lunch : false,
    dinner: restaurant === "Pavilion" ? dinner : false,
    allTime: restaurant === "DT Cafe" ? allTime : false,
  };

  try {
    const response = await API.post("/foods", foodData);

    alert(`${response.data.name} added to ${response.data.restaurant}!`);

    setName("");
    setPrice("");
    setCategory(restaurant === "Pavilion" ? "Breakfast" : "Tea & Coffee");
    setType("Veg");
    setBreakfast(false);
    setLunch(false);
    setDinner(false);
    setAllTime(false);

    await fetchFoods();
  } catch (error) {
    console.error(
      "Failed to add food:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Failed to add dish. Please try again."
    );
  }
};

  const deleteFood = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this food item?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/foods/${id}`
      );

      fetchFoods();

    } catch (error) {

      console.log(error);

    }

  };

  const editFood = (food) => {
    setEditingFood(food);
    setName(food.name);
    setCategory(food.category);
    setPrice(String(food.price));
    setType(food.type);
    setBreakfast(Boolean(food.breakfast));
    setLunch(Boolean(food.lunch));
    setDinner(Boolean(food.dinner));
    setAllTime(Boolean(food.allTime));
    setShowEditModal(true);
  };

const updateFood = async () => {
  if (!editingFood) return;

  const trimmedName = name.trim();
  const numericPrice = Number(price);
  const isPavilion = editingFood.restaurant === "Pavilion";

  if (!trimmedName || price.trim() === "") {
    alert("Please enter the dish name and price.");
    return;
  }

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    alert("Please enter a valid price greater than zero.");
    return;
  }

  if (isPavilion && !breakfast && !lunch && !dinner) {
    alert("Please select at least one Pavilion meal time.");
    return;
  }

  if (!isPavilion && !allTime) {
    alert("Please select Café Time (11 AM – 11 PM).");
    return;
  }

  try {
    await API.put(`/foods/${editingFood._id}`, {
      name: trimmedName,
      category,
      price: numericPrice,
      type,
      breakfast: isPavilion ? breakfast : false,
      lunch: isPavilion ? lunch : false,
      dinner: isPavilion ? dinner : false,
      allTime: isPavilion ? false : allTime,
    });

    setEditingFood(null);
    setShowEditModal(false);
    setName("");
    setPrice("");
    setBreakfast(false);
    setLunch(false);
    setDinner(false);
    setAllTime(false);
    await fetchFoods();
    alert("Dish updated successfully!");
  } catch (error) {
    console.error("Failed to update food:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to update dish. Please try again.");
  }
};

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="
flex
justify-between
items-start
mb-8
">

  <div>

    <h1 className="
    text-3xl
    md:text-5xl
    font-bold
    text-gray-800
    ">

      Menu Management

    </h1>

    <p className="text-gray-500 mt-2">

      Logged in as:
      <span className="font-semibold ml-1">

        👤{localStorage.getItem("username")}

      </span>

    </p>

    <p className="text-gray-500">

      Manage hotel food items and availability

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

        {/* ADD FOOD */}

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
  placeholder="Search food..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="border rounded-xl px-4 py-3 w-full"
/>


<select
  value={restaurant}
  onChange={(e) => handleRestaurantChange(e.target.value)}
  className="border rounded-xl px-4 py-3 w-full"
>
  <option value="Pavilion">Pavilion</option>
  <option value="DT Cafe">DT Café</option>
</select>


            <input
              placeholder="Dish Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

           <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="border rounded-xl px-4 py-3"
>

  {categories.map((cat) => (

    <option
      key={cat}
      value={cat}
    >

      {cat}

    </option>

  ))}

</select>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >

              <option value="Veg">
                Veg
              </option>

              <option value="Non-Veg">
                Non-Veg
              </option>

            </select>

            <input
  placeholder="Price"
  value={price}
  onChange={(e) =>
    setPrice(e.target.value)
  }
  className="border rounded-xl px-4 py-3"
/>
<div className="grid grid-cols-2 gap-4">
  {restaurant === "Pavilion" ? (
    <>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={breakfast}
          onChange={(e) => setBreakfast(e.target.checked)} />
        Breakfast
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={lunch}
          onChange={(e) => setLunch(e.target.checked)} />
        Lunch
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={dinner}
          onChange={(e) => setDinner(e.target.checked)} />
        Dinner
      </label>
    </>
  ) : (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={allTime}
        onChange={(e) => setAllTime(e.target.checked)} />
      Café Time (11 AM – 11 PM)
    </label>
  )}
</div>

<button
  onClick={addFood}
  className="bg-green-600 text-white rounded-xl px-4 py-3"
>
  Add Food
</button>

          </div>

        </div>

        {/* FOOD LIST */}

        <div className="space-y-4">

          {foods
  .filter(food =>
    food.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((food) => (

  <div
    key={food._id}
    className="bg-white rounded-3xl shadow-md p-5 flex flex-col md:flex-row justify-between items-center gap-4"
  >

    <div>

      <h2 className="text-xl font-bold text-gray-800">

        {food.name}

      </h2>

      <p className="text-gray-500">

        {food.category} • {food.type}

      </p>

      <p className="font-semibold text-green-600">

        ₹{food.price}

      </p>

    </div>

    <div className="flex gap-2 flex-wrap">

      <button

        onClick={() =>
          toggleAvailability(
            food._id
          )
        }

        className={`px-4 py-2 rounded-xl text-white ${
          food.available
            ? "bg-green-600"
            : "bg-red-600"
        }`}

      >

        {food.available
          ? "Available"
          : "Not Available"}

      </button>

      <button

  onClick={() => editFood(food)}

  className="
  bg-blue-500
  text-white
  px-4
  py-2
  rounded-xl
  "

>

  Edit

</button>

      <button

        onClick={() =>
          deleteFood(
            food._id
          )
        }

        className="bg-red-500 text-white px-4 py-2 rounded-xl"

      >

        Delete

      </button>

    </div>

  </div>



          ))}

        </div>

      </div>

      {showEditModal && (

<div className="

fixed inset-0

bg-black/50

flex

items-center

justify-center

z-[999]

p-4

">

<div className="

bg-white

w-full

max-w-md

rounded-3xl

shadow-2xl

p-6

">

<h2 className="

text-2xl

font-bold

mb-6

text-gray-800

">

Edit Food

</h2>

<div className="space-y-4">

<input
  value={name}
  onChange={(e)=>
    setName(
      e.target.value
    )
  }
  placeholder="Dish Name"
  className="
  w-full
  border
  rounded-xl
  px-4
  py-3
  "
/>


<select
  value={category}
  onChange={(e)=>
    setCategory(
      e.target.value
    )
  }
  className="
  w-full
  border
  rounded-xl
  px-4
  py-3
  "
>

{(editingFood?.restaurant === "Pavilion" ? pavilionCategories : cafeCategories).map(cat => (

<option
  key={cat}
  value={cat}
>

  {cat}

</option>

))}

</select>

<select
  value={type}
  onChange={(e)=>
    setType(
      e.target.value
    )
  }
  className="
  w-full
  border
  rounded-xl
  px-4
  py-3
  "
>

<option>
  Veg
</option>

<option>
  Non-Veg
</option>

</select>

<input
  value={price}
  onChange={(e)=>
    setPrice(
      e.target.value
    )
  }
  placeholder="Price"
  className="
  w-full
  border
  rounded-xl
  px-4
  py-3
  "
/>
<div className="grid grid-cols-2 gap-4">
  {editingFood?.restaurant === "Pavilion" ? (
    <>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={breakfast}
          onChange={(e) => setBreakfast(e.target.checked)} />
        Breakfast
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={lunch}
          onChange={(e) => setLunch(e.target.checked)} />
        Lunch
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={dinner}
          onChange={(e) => setDinner(e.target.checked)} />
        Dinner
      </label>
    </>
  ) : (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={allTime}
        onChange={(e) => setAllTime(e.target.checked)} />
      Café Time (11 AM – 11 PM)
    </label>
  )}
</div>
</div>

<div className="

flex

justify-end

gap-3

mt-6

">

<button

  onClick={() => {
    setShowEditModal(false);
    setEditingFood(null);
  }}

  className="
  px-5
  py-2
  rounded-xl
  bg-gray-300
  "

>

Cancel

</button>

<button

  onClick={updateFood}

  className="
  px-5
  py-2
  rounded-xl
  bg-green-600
  text-white
  "

>

Save Changes

</button>

</div>

</div>

</div>

)}

    </div>

  );

}

export default MenuManagement;