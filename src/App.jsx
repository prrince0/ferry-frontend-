import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Ferries from "./pages/Ferries";
import Schedules from "./pages/Schedules";
import MyBookings from "./pages/MyBookings";

function AppRoutes() {
    const { user } = useAuth();
    
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/ferries" element={
                <ProtectedRoute>
                    <Ferries />
                </ProtectedRoute>
            } />
            <Route path="/schedules" element={
                <ProtectedRoute>
                    <Schedules />
                </ProtectedRoute>
            } />
            <Route path="/my-bookings" element={
                <ProtectedRoute>
                    <MyBookings />
                </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;