import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  const [revenue, setRevenue] =
    useState(0);

  const [selectedRoom, setSelectedRoom] =
  useState(null);

const [showModal, setShowModal] =
  useState(false);

const [roomSearch, setRoomSearch] =
  useState("");

const [historySearch, setHistorySearch] =
  useState("");

const [historyRoom,
setHistoryRoom] =
useState(null);

const [showHistoryModal,
setShowHistoryModal] =
useState(false);

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
).filter(

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

  const groupedHistory =
  history.reduce(

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

  const filteredHistory =
Object.entries(
  groupedHistory
).filter(

  ([room]) =>

    room
      .toString()
      .toLowerCase()
      .includes(
        historySearch.toLowerCase()
      )

);

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

      const historyResponse =
        await API.get(
          "/orders/history"
        );

      const revenueResponse =
        await API.get(
          "/orders/revenue"
        );

      setOrders(
        activeResponse.data
      );

      console.log(
        activeResponse.data
      );

      setHistory(
        historyResponse.data
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
  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
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

<p className="text-gray-500 font-bold">

 Food Admin Dashboard

</p>

</div>

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

            Revenue

          </p>

          <h2 className="text-3xl font-bold text-green-600">

            ₹{revenue}

          </h2>

        </div>

        <div className="bg-white p-5 rounded-2xl shadow">

          <p className="text-gray-500">

            Pending Payments

          </p>

          <h2 className="text-3xl font-bold text-red-500">

            {

              orders.filter(

                (o) =>
                  o.status ===
                  "Delivered"

              ).length

            }

          </h2>

        </div>

        <div className="bg-white p-5 rounded-2xl shadow">

          <p className="text-gray-500">

            Paid Orders

          </p>

          <h2 className="text-3xl font-bold text-blue-600">

            {history.length}

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

  roomOrders.some(
    order =>
      order.status ===
      "Pending"
  )
    ? "Pending"

    : roomOrders.some(
        order =>
          order.status ===
          "Preparing"
      )
    ? "Preparing"

    : roomOrders.some(
        order =>
          order.status ===
          "Ready"
      )
    ? "Ready"

    : roomOrders.every(
        order =>
          order.status ===
          "Delivered"
      )
    ? "Delivered"

    : roomOrders.every(
        order =>
          order.status ===
          "Paid"
      )
    ? "Paid"

    : "Pending";

          const allDelivered =
            roomOrders.every(

              (order) =>
                order.status ===
                "Delivered"

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

  {roomStatus}

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
      {/* HISTORY */}

      <div className="bg-white rounded-3xl shadow p-5 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-4">

          Payment History

        </h2>

        <input

  type="text"

  placeholder="Search Room Number..."

  value={historySearch}

  onChange={(e) =>
    setHistorySearch(
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

                Date

              </th>

              <th className="text-left p-3">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredHistory.map(

([room, roomOrders]) => {

  const totalAmount =
    roomOrders.reduce(

      (sum, order) =>

        sum +
        order.totalAmount,

      0

    );

    
    
  return (

    <tr
      key={room}
      className="border-b"
    >

      <td className="p-3">

        {room}

      </td>

      <td className="p-3">

        {
          roomOrders.length
        }

      </td>

      <td className="p-3">

        ₹{totalAmount}

      </td>

      <td className="p-3">

        {

          new Date(

            roomOrders[0]
              .createdAt

          ).toLocaleDateString()

        }

      </td>

      <td className="p-3">

        <button

          onClick={() => {

            setHistoryRoom(
              roomOrders
            );

            setShowHistoryModal(
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
{showHistoryModal && (

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

w-[90%]
max-w-2xl

max-h-[80vh]

overflow-y-auto

">

<div className="

flex
justify-between
items-center

mb-6

">

<h2 className="text-2xl font-bold">

Room {
historyRoom?.[0]?.roomNumber
}

History

</h2>

<button

onClick={() =>
setShowHistoryModal(false)
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

{historyRoom?.map(

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

Order #{index + 1}

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

<p key={item._id}>

{item.name} x{item.quantity}

</p>

))
}

</div>

<p className="font-bold text-green-600 mt-2">

₹{order.totalAmount}

</p>

</div>

))

}

<div className="mt-5">

<h3 className="text-xl font-bold">

Total Paid ₹

{
historyRoom?.reduce(

(sum, order) =>

sum +
order.totalAmount,

0

) || 0

}

</h3>

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