import { Navigate } from "react-router-dom";

function AutoRedirect() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "Admin") {
    return <Navigate to="/admin-orders" replace />;
  }

  if (role === "Kitchen") {
    return <Navigate to="/kitchen-orders" replace />;
  }

  if (role === "RoomService") {
    return <Navigate to="/room-service" replace />;
  }

  if (role === "Manager") {
    return <Navigate to="/menu-management" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default AutoRedirect;