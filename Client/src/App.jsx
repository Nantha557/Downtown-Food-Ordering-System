import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MenuManagement from "./pages/MenuManagement";
import GuestMenu from "./pages/GuestMenu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ManagerOrders from "./pages/KitchenOrders";
import RoomServiceOrders from "./pages/RoomServiceOrders";
import AdminOrders from "./pages/AdminOrders";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* GUEST ROUTES */}

        <Route
          path="/menu"
          element={<GuestMenu />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* MENU MANAGEMENT */}

        <Route
          path="/menu-management"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Manager",
              ]}
            >
              <MenuManagement />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin-orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
              ]}
            >
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}

        <Route
          path="/kitchen-orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Manager",
                "Kitchen",
                "Admin",
              ]}
            >
              <ManagerOrders />
            </ProtectedRoute>
          }
        />

        {/* ROOM SERVICE */}

        <Route
          path="/room-service"
          element={
            <ProtectedRoute
              allowedRoles={[
                "RoomService",
                "Admin",
              ]}
            >
              <RoomServiceOrders />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;