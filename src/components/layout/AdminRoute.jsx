import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  console.log("AdminRoute executed");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
    console.log(token);
  console.log(user);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}