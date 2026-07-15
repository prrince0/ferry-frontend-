import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home";
import Profile from "./pages/profile/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import Schedule from "./pages/Schedule";
import MyBookings from "./pages/MyBookings";
import AdminFerries from "./pages/admin/AdminFerries";
import ManageSchedule from "./pages/admin/ManageSchedule";
import AddSchedule from "./pages/Schedule/AddSchedule";
import EditSchedule from "./pages/Schedule/EditSchedule";
import BookingList from "./pages/Booking/BookingList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/AdminFerries"element={<AdminFerries />}/>
         <Route path="/admin/dashboard" element={<Dashboard />} />
         <Route path="/admin/ManageSchedule" element={<ManageSchedule />} />
         <Route path="/admin/add-schedule" element={<AddSchedule />} />
         <Route path="/admin/EditSchedule/:id" element={<EditSchedule />} />
         <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/schedule" element={<Schedule />} />
          <Route path="/MyBookings" element={<MyBookings />} />
          <Route path="/admin/BookingList" element={<BookingList />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;