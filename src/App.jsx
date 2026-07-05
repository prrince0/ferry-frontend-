import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home";
import Profile from "./pages/profile/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import Schedule from "./pages/Schedule";
import MyBookings from "./pages/MyBookings";
import ManageSchedules from "./pages/admin/ManageSchedules";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/ManageSchedules"element={<ManageSchedules />}/>
         <Route path="/admin/dashboard" element={<Dashboard />} />
         <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/schedule" element={<Schedule />} />
          <Route path="/MyBookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;