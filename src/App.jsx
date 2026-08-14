import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import BookTicket from "./pages/Booking/BookTicket";
import Ferries from "./pages/Ferries";
import AdminRoute from "./components/layout/AdminRoute";


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         
         
         
      
         <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/schedule" element={<Schedule />} />
          <Route path="/MyBookings" element={<MyBookings />} />
          
          <Route path="/book/:scheduleId" element={<BookTicket />}/>
          <Route path="/my-bookings" element={<MyBookings />} />
         

          <Route element={<AdminRoute />}>
          <Route path="/admin/AdminFerries"element={<AdminFerries />}/>
          <Route path="/admin/dashboard" element={<Dashboard />} />
           <Route path="/admin/ManageSchedule" element={<ManageSchedule />} />
            <Route path="/admin/add-schedule" element={<AddSchedule />} />
          <Route path="/admin/EditSchedule/:id" element={<EditSchedule />} />
            <Route path="/admin/BookingList" element={<BookingList />}/>
             <Route path="/ferries" element={<Ferries />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;