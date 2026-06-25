  import { useEffect, useState, useRef } from "react";
  import API from "../services/api";
  import InstallButton from "../components/InstallButton";
  import alertSound
from "../assets/alarm.wav";

  function AdminOrders() {

    const [orders, setOrders] =
      useState([]);

      const alertedRooms =
useRef([]);

const previousCount =
useRef(0);

const notificationAudio =
useRef(
  new Audio(
    "/notification.wav"
  )
);

    const [selectedRoom, setSelectedRoom] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [roomSearch, setRoomSearch] =
    useState("");

  const [showUsers,
  setShowUsers] =
  useState(false);

  const [users,
  setUsers] =
  useState([]);

  const [showCreateUser,
  setShowCreateUser] =
  useState(false);

  const [newUsername,
  setNewUsername] =
  useState("");

  const [newPassword,
  setNewPassword] =
  useState("");

  const [newRole,
  setNewRole] =
  useState("Manager");

  const [showEditUser,
  setShowEditUser] =
  useState(false);

  const [selectedUser,
  setSelectedUser] =
  useState(null);

  const [editUsername,
  setEditUsername] =
  useState("");

  const [editRole,
  setEditRole] =
  useState("");

  const [editActive,
  setEditActive] =
  useState(true);

  const activeOrders =
    orders.filter(
      order =>
        order.status !==
        "Paid"
    );
  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";

  };
  const handleCreateUser =
  async () => {

    try {

      await API.post(
        "/users",
        {
          username:
            newUsername,

          password:
            newPassword,

          role:
            newRole,
        }
      );

      alert(
        "User Created Successfully"
      );

      fetchUsers();

      setNewUsername("");
      setNewPassword("");
      setNewRole("Manager");

      setShowCreateUser(
        false
      );

    } catch (error) {

      alert(

        error.response?.data
        ?.message ||

        "Failed to create user"

      );

    }

  };

  const groupedRooms =
    activeOrders.reduce(

      (acc, order) => {

        if (
          !acc[
            order.roomNumber
          ]
        ) {

          acc[
            order.roomNumber
          ] = [];

        }

        acc[
          order.roomNumber
        ].push(order);

        return acc;

      },

      {}

    );

    const filteredRooms =
Object.entries(
  groupedRooms
)
.sort(

  ([, roomA], [, roomB]) =>

    new Date(
      roomB[
        roomB.length - 1
      ].createdAt
    )

    -

    new Date(
      roomA[
        roomA.length - 1
      ].createdAt
    )

)
.filter(

  ([room]) =>

    room
      .toString()
      .toLowerCase()
      .includes(
        roomSearch.toLowerCase()
      )

);

  const handleUpdateUser =
  async () => {

    try {

      await API.put(

        `/users/${selectedUser._id}`,

        {

          username:
            editUsername,

          role:
            editRole,

          active:
            editActive,

        }

      );

      alert(
        "User Updated"
      );

      fetchUsers();

      setShowEditUser(
        false
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }

  };

    const fetchData = async () => {

      try {

        const activeResponse =
          await API.get(
            "/orders"
          );

          console.log(
    "ACTIVE RESPONSE:",
    activeResponse.data
  );

        const revenueResponse =
          await API.get(
            "/orders/revenue"
          );

      const newOrders =
  activeResponse.data;

if (

  previousCount.current > 0 &&

  newOrders.length >
  previousCount.current

) {

  console.log(
    "NEW ORDER ARRIVED 🔔"
  );

  notificationAudio.current
    .play()
    .catch(err =>
      console.log(err)
    );

}

previousCount.current =
  newOrders.length;

setOrders(
  newOrders
);

        const pendingOrders =
  activeResponse.data.filter(
    order =>
      order.status ===
      "Pending"
  );

pendingOrders.forEach(
  order => {

    const mins =
      Math.floor(

        (Date.now() -
          new Date(
            order.createdAt
          )) /

        1000 /

        60

      );

    if (

      mins >= 15 &&

      !alertedRooms.current.includes(
        order._id
      )

    ) {

      const audio =
        new Audio(
          alertSound
        );

      audio.play();

      alertedRooms.current.push(
        order._id
      );

    }

  }
);
alertedRooms.current =
  alertedRooms.current.filter(
    id =>

      activeResponse.data.some(
        order =>

          order._id === id &&

          order.status ===
          "Pending"

      )

  );

        console.log(
          activeResponse.data
        );

        setRevenue(
          revenueResponse.data.revenue
        );

      } catch (error) {

        console.log(error);

      }

    };
    const fetchUsers =
  async () => {

    try {

      const response =
        await API.get(
          "/users"
        );

      setUsers(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

    useEffect(() => {

    fetchData();

    const interval = setInterval(() => {

      fetchData();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

    const markPaid =
      async (id) => {

        try {

          await API.put(
            `/orders/${id}/pay`
          );

          fetchData();

          

        } catch (error) {

          console.log(error);

        }

      };

      const handleDeleteUser =
  async (id) => {

    const confirmDelete =
    window.confirm(

      "Delete this user?"

    );

    if (
      !confirmDelete
    )
      return;

    try {

      await API.delete(
        `/users/${id}`
      );

      fetchUsers();

      alert(
        "User Deleted"
      );

    } catch (error) {

      alert(

        error.response?.data
        ?.message ||

        "Delete Failed"

      );

    }

  };

  const getOrderAge = (createdAt) => {

  const mins = Math.floor(

    (Date.now() -
      new Date(createdAt)) /

    1000 /

    60

  );

  return mins;

};

const printKOT = async(order) => {

  const date =
    new Date(
      order.createdAt
    );

  const content = `

    <html>

    <head>

      <title>KOT</title>

      <style>

        body {

          font-family: monospace;

          padding:20px;

        }

        table {

          width:100%;

          border-collapse:collapse;

        }

        th,
        td {

          text-align:left;

          padding:5px;

        }

      </style>

    </head>

    <body>

      <center>

        <h2>
          Downtown Business Hotel
        </h2>

        <h3>
          KOT
        </h3>

      </center>

      <p>

        Room No :
        ${order.roomNumber}

      </p>

      <p>

        Date :
        ${date.toLocaleDateString()}

      </p>

      <p>

        Time :
        ${date.toLocaleTimeString()}

      </p>

      <hr/>

      <table>

        <tr>

          <th>
            S.No
          </th>

          <th>
            Item
          </th>

          <th>
            Qty
          </th>

        </tr>

        ${order.items
          .map(

            (item,index)=>`

            <tr>

              <td>
                ${index+1}
              </td>

              <td>
                ${item.name}
              </td>

              <td>
                ${item.quantity}
              </td>

            </tr>

          `

          )
          .join("")}

      </table>

      <hr/>

    </body>

    </html>

  `;

  const win =
    window.open(
      "",
      "_blank"
    );

  win.document.write(
    content
  );

  win.document.close();
  await API.put(

  `/orders/${order._id}/status`,

  {
    status:"Printed"
  }

);

fetchData();

  win.print();

};

const pendingKOT =
orders.filter(
  order =>
    order.status !== "Printed" &&
    order.status !== "Paid"
).length;

const printedKOT =
orders.filter(

  order =>
    order.status ===
    "Printed"

).length;
const totalOrders =
  orders.length;

      
    return (

      

      <div className="min-h-screen bg-gray-100 p-2 md:p-4">

      <div className="
  flex
  justify-between
  items-center
  mb-4
  ">

  <div>

  <h1 className="
  text-3xl
  font-bold
  text-green-700
  ">

  Downtown Business Hotel

  </h1>

  <InstallButton />

  <p className="text-gray-500 font-bold">

  Food Admin Dashboard

  </p>

  </div>

  <div className="flex gap-3">

    <div
      onClick={() => {
        fetchUsers();
        setShowUsers(true);
      }}
      className="
      cursor-pointer
      bg-white
      px-4 py-2
      rounded-xl
      shadow
      hover:shadow-lg
      transition
      "
    >
      👥 Users
    </div>

    <button
      onClick={logout}
      className="
      bg-red-500
      hover:bg-red-600
      text-white
      px-4 py-2
      rounded-xl
      shadow
      transition
      "
    >
      Logout
    </button>

  </div>

  </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-gray-500">
              

              Active Rooms

            </p>
            
            <h2 className="text-3xl font-bold">

              {Object.keys(
                groupedRooms
              ).length}

            </h2>

          </div>

          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-gray-500">
  Total Orders
</p>

<h2 className="text-3xl font-bold text-green-600">
  {totalOrders}
</h2>

          </div>

          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-gray-500">

  Pending KOT

</p>

<h2 className="text-3xl font-bold text-red-600">

  {pendingKOT}

</h2>


          </div>

          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-gray-500">

              Printed KOT

            </p>
            <h2 className="text-3xl font-bold text-blue-600">

  {printedKOT}

</h2>

          </div>

        </div>

        {/* ACTIVE ROOMS */}

  <div className="bg-white rounded-3xl shadow p-5 mb-8 overflow-x-auto">

    <h2 className="text-2xl font-bold mb-4">

      Active Rooms

    </h2>

    <input

    type="text"

    placeholder="Search Room Number..."

    value={roomSearch}

    onChange={(e) =>
      setRoomSearch(
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


    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left p-3">

            Room

          </th>

          <th className="text-left p-3">

            Orders

          </th>

          <th className="text-left p-3">

            Amount

          </th>

          <th className="text-left p-3">
  Timer
</th>

          <th className="text-left p-3">

            Status

          </th>

          <th className="text-left p-3">

            Action

          </th>

        </tr>

      </thead>

      <tbody>

        {filteredRooms.map(

          ([room, roomOrders]) => {

            const totalAmount =
              roomOrders.reduce(

                (
                  sum,
                  order
                ) =>

                  sum +
                  order.totalAmount,

                0

              );

const roomStatus =

  roomOrders.every(
    order =>
      order.status === "Paid"
  )

  ? "Paid"

  : roomOrders.every(
      order =>
        order.status === "Printed"
    )

  ? "Printed"

  : "Pending";

  const pendingOrders =
  roomOrders.filter(
    order =>
      order.status ===
      "Pending"
  );
            return (

              <tr
                key={room}
                className="border-b"
              >

                <td className="p-3 font-bold text-blue-600 cursor-pointer">

                  {room}

                </td>

                <td className="p-3">

                  {
                    roomOrders.length
                  }

                </td>

                <td className="p-3 font-semibold">

                  ₹
                  {
                    totalAmount
                  }

                </td>

                <td className="p-3">

  {

    roomStatus === "Printed" ||

    roomStatus === "Paid"

    ? (

      <span className="
      bg-blue-100
      text-blue-700
      px-3 py-1
      rounded-lg
      font-semibold
      ">

        Printed

      </span>

    )

    : (

      <span
        className={`
          px-3 py-1 rounded-lg font-semibold

          ${
            getOrderAge(
              pendingOrders[0].createdAt
            ) >= 15

            ? "bg-red-100 text-red-700"

            : getOrderAge(
                pendingOrders[0].createdAt
              ) >= 10

            ? "bg-yellow-100 text-yellow-700"

            : "bg-green-100 text-green-700"
          }
        `}
      >

        {
          getOrderAge(
            pendingOrders[0].createdAt
          )
        }

        min

      </span>

    )

  }

</td>
                <td>

  <span

    className={`

      px-3
      py-1
      rounded-xl

      ${

        roomStatus === "Pending"

          ? "bg-red-100 text-red-600"

          : roomStatus === "Printed"

          ? "bg-blue-100 text-blue-600"

          : "bg-green-100 text-green-600"

      }

    `}

  >

    {roomStatus}

  </span>

</td>

                <td className="p-3">

                  <button

                    onClick={() => {

                      setSelectedRoom(
                        roomOrders
                      );

                      setShowModal(
                        true
                      );

                    }}

                    className="
                    bg-blue-500
                    text-white
                    px-4 py-2
                    rounded-xl
                    "

                  >

                    View

                  </button>

                </td>

              </tr>

            );

          }

        )}

      </tbody>

    </table>

  </div>
    
        {showModal && (

  <div className="

  fixed
  inset-0

  bg-black/50

  flex
  items-center
  justify-center

  z-50

  ">

  <div className="

  bg-white

  rounded-3xl

  p-6

  w-[90%]
  max-w-2xl

  max-h-[80vh]
  overflow-y-auto

  ">

  <div className="flex justify-between items-center mb-6">

  <h2 className="text-2xl font-bold">

  Room {

  selectedRoom[0]
  .roomNumber

  }

  </h2>

  <button

  onClick={() =>
  setShowModal(false)
  }

  className="

  text-red-500
  font-bold
  text-xl

  "

  >

  ✕

  </button>

  </div>

  {selectedRoom.map(

  (order, index) => (

  <div

  key={order._id}

  className="
  border-b
  pb-4
  mb-4
  "

  >

  <h3 className="font-bold">

  Order #

  {index + 1}

  </h3>

  <p className="text-gray-500 text-sm">

  {
  new Date(
  order.createdAt
  ).toLocaleString()
  }

  </p>

  <div className="mt-2">

  {order.items.map(
  (item) => (

  <p
  key={
  item._id
  }
  >

  {item.name}

  {" x"}

  {
  item.quantity
  }

  </p>

  ))
  }

  </div>

  <p className="

  font-bold
  text-green-600
  mt-2

  ">

  ₹

  {
  order.totalAmount
  }

  </p>

  <button

  onClick={() =>
    printKOT(order)
  }

  className="
  mt-3
  bg-blue-600
  hover:bg-blue-700
  text-white
  px-4
  py-2
  rounded-xl
  "

>

🖨 Print KOT

</button>

  </div>

  ))

  }

  <div className="mt-5">

  <h3 className="text-xl font-bold">

  Total Due ₹

  {
  selectedRoom.reduce(

  (
  sum,
  order
  ) =>

  sum +
  order.totalAmount,

  0

  )
  }

  </h3>

  <button

  onClick={async () => {

    try {

      for (const order of selectedRoom) {

        await API.put(

          `/orders/${order._id}/pay`

        );

      }

      setShowModal(false);

      fetchData();

    } catch (error) {

      console.log(error);

    }

  }}

  className="

  mt-4

  bg-green-600
  hover:bg-green-700

  text-white

  px-6 py-3

  rounded-xl

  font-semibold

  "

  >

  Complete Checkout

  </button>
  

  </div>

  </div>

  </div>

  )}
  {showUsers && (

  <div className="

  fixed
  inset-0

  bg-black/50

  flex
  justify-center
  items-center

  z-50

  ">

  <div className="

  bg-white

  rounded-3xl

  p-6

  w-[95%]
  max-w-4xl

  max-h-[80vh]

  overflow-y-auto

  ">

  <div className="

  flex
  justify-between
  items-center

  mb-6

  ">

  <div className="flex items-center gap-3">

  <h2 className="text-2xl font-bold">

  User Management

  </h2>

  <button

  onClick={() =>
  setShowCreateUser(true)
  }

  className="
  bg-green-600
  text-white
  px-4 py-2
  rounded-xl
  "

  >

  + Create User

  </button>

  </div>

  {showEditUser && (

  <div className="
  fixed
  inset-0
  bg-black/50
  flex
  justify-center
  items-center
  z-[70]
  ">

  <div className="
  bg-white
  p-6
  rounded-3xl
  w-[90%]
  max-w-md
  ">

  <h2 className="
  text-2xl
  font-bold
  mb-5
  ">

  Edit User

  </h2>

  <input

  value={editUsername}

  onChange={(e)=>

  setEditUsername(
  e.target.value
  )

  }

  className="
  w-full
  border
  p-3
  rounded-xl
  mb-3
  "
  />

  <select

  value={editRole}

  onChange={(e)=>

  setEditRole(
  e.target.value
  )

  }

  className="
  w-full
  border
  p-3
  rounded-xl
  mb-3
  "

  >

  <option>
  Admin
  </option>

  <option>
  Manager
  </option>

  <option>
  Kitchen
  </option>

  <option>
  RoomService
  </option>

  </select>

  <select

  value={
  editActive
  ? "true"
  : "false"
  }

  onChange={(e)=>

  setEditActive(

  e.target.value ===
  "true"

  )

  }

  className="
  w-full
  border
  p-3
  rounded-xl
  mb-4
  "

  >

  <option value="true">

  Active

  </option>

  <option value="false">

  Disabled

  </option>

  </select>

  <div className="
  flex
  justify-end
  gap-3
  ">

  <button

  onClick={() =>
  setShowEditUser(false)
  }

  className="
  px-4
  py-2
  border
  rounded-xl
  "

  >

  Cancel

  </button>

  <button

  onClick={
  handleUpdateUser
  }

  className="
  bg-blue-600
  text-white
  px-4
  py-2
  rounded-xl
  "

  >

  Save

  </button>

  </div>

  </div>

  </div>

  )}

  <button

  onClick={() =>
  setShowUsers(false)
  }

  className="

  text-red-500
  font-bold
  text-xl

  "

  >

  ✕

  </button>

  </div>

  <table className="w-full">

  <thead>

  <tr className="border-b">

  <th className="p-3 text-left">

  Username

  </th>

  <th className="p-3 text-left">

  Role

  </th>

  <th className="p-3 text-left">

  Status

  </th>

  <th className="p-3 text-left">

  Actions

  </th>

  </tr>

  </thead>

  <tbody>

  {users.map(
  (user) => (

  <tr
  key={user._id}
  className="border-b"
  >

  <td className="p-3">

  {user.username}

  </td>

  <td className="p-3">

  {user.role}

  </td>

  <td className="p-3">

  {
  user.active
  ? "Active"
  : "Disabled"
  }

  </td>

  <td className="p-3">

  <button

  onClick={() => {

    setSelectedUser(
      user
    );

    setEditUsername(
      user.username
    );

    setEditRole(
      user.role
    );

    setEditActive(
      user.active
    );

    setShowEditUser(
      true
    );

  }}

  className="
  bg-blue-500
  text-white
  px-3 py-1
  rounded-lg
  mr-2
  "

  >

  Edit

  </button>

  {user.role !==
  "Admin" && (

  <button

  onClick={() =>
  handleDeleteUser(
  user._id
  )
  }

  className="
  bg-red-500
  text-white
  px-3 py-1
  rounded-lg
  "

  >

  Delete

  </button>

  )}

  </td>

  </tr>

  ))
  }

  </tbody>

  </table>

  </div>

  </div>

  )}

  {showCreateUser && (

  <div className="
  fixed
  inset-0
  bg-black/50
  flex
  justify-center
  items-center
  z-[60]
  ">

  <div className="
  bg-white
  p-6
  rounded-3xl
  w-[90%]
  max-w-md
  ">

  <h2 className="
  text-2xl
  font-bold
  mb-5
  ">

  Create User

  </h2>

  <input

  placeholder="Username"

  value={newUsername}

  onChange={(e)=>
  setNewUsername(
  e.target.value
  )
  }

  className="
  w-full
  border
  p-3
  rounded-xl
  mb-3
  "
  />

  <input

  type="password"

  placeholder="Password"

  value={newPassword}

  onChange={(e)=>
  setNewPassword(
  e.target.value
  )
  }

  className="
  w-full
  border
  p-3
  rounded-xl
  mb-3
  "
  />

  <select

  value={newRole}

  onChange={(e)=>
  setNewRole(
  e.target.value
  )
  }

  className="
  w-full
  border
  p-3
  rounded-xl
  mb-4
  "

  >
  <option>
  Admin
  </option>

  <option>
  Manager
  </option>

  <option>
  Kitchen
  </option>

  <option>
  RoomService
  </option>

  </select>

  <div className="
  flex
  justify-end
  gap-3
  ">

  <button

  onClick={() =>
  setShowCreateUser(false)
  }

  className="
  px-4
  py-2
  border
  rounded-xl
  "

  >

  Cancel

  </button>

  <button

  onClick={
    handleCreateUser
  }

  className="
  bg-green-600
  text-white
  px-4
  py-2
  rounded-xl
  "

  >

  Create

  </button>

  </div>

  </div>

  </div>

  )}

      </div>

    );

  }

  export default AdminOrders;