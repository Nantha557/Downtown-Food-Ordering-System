import { useEffect, useState } from "react";
import API from "../services/api";
import InstallButton from "../components/InstallButton";

function MenuManagement() {

  const [foods, setFoods] = useState([]);

  const [name, setName] = useState("");

  const [category, setCategory] =
  useState("Breakfast");

  const [price, setPrice] =    useState("");

  const [type, setType] =    useState("Veg");

  const [image, setImage] =  useState("");

  const [showEditModal,setShowEditModal] =useState(false);

  const [editingFood, setEditingFood] = useState(null);

  const [search, setSearch] =  useState("");


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

  const fetchFoods = async () => {

    try {

      const response =
        await API.get("/foods");

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

  const addFood = async () => {
    

    if (!name || !price) {

      alert("Please fill all fields");

      return;

    }

    try {

      await API.post("/foods", {

        name,

        category,

        price,

        type,

        image,

      });

      setName("");
      setPrice("");
      setCategory("Meals");
      setType("Veg");
      setImage("");

      fetchFoods();

    } catch (error) {

      console.log(error);

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

  setCategory(
    food.category
  );

  setPrice(food.price);

  setType(food.type);

  setImage(food.image);

};

const updateFood = async () => {

  try {

    await API.put(

      `/foods/${editingFood._id}`,

      {

        name,
        category,
        price,
        type,
        image,

      }

    );

    setEditingFood(null);

    setName("");
    setPrice("");
    setImage("");

    fetchFoods();

  }

  catch(error){

    console.log(error);

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

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

            <input
  placeholder="Search food..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="border rounded-xl px-4 py-3 w-full"
/>

            <input
              placeholder="Dish Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />
            <input
  placeholder="Image URL"
  value={image}
  onChange={(e) =>
    setImage(e.target.value)
  }
  className="border p-3 rounded-xl"
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

            <button

  onClick={
    editingFood

      ? updateFood

      : addFood
  }

  className="
  bg-green-600
  text-white
  rounded-xl
  "

>

  {
    editingFood

      ? "Update Food"

      : "Add Food"
  }

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

  onClick={() => {

  setEditingFood(food);

  setName(food.name);

  setCategory(
    food.category
  );

  setPrice(food.price);

  setType(food.type);

  setImage(
    food.image
  );

  setShowEditModal(
    true
  );

}}

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

<input
  value={image}
  onChange={(e)=>
    setImage(
      e.target.value
    )
  }
  placeholder="Image URL"
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

{categories.map(cat => (

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

</div>

<div className="

flex

justify-end

gap-3

mt-6

">

<button

  onClick={() =>
    setShowEditModal(
      false
    )
  }

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

  onClick={async () => {

    await updateFood();

    setShowEditModal(
      false
    );

  }}

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