import { Link } from "react-router-dom";
import { FaShip } from "react-icons/fa";

export default function Navbar() {
  // Check if user is logged in
  const token = localStorage.getItem("token");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
     
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-blue-700"
        >
          <FaShip className="text-3xl" />
          FerryMS
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium  ml-auto">

          <Link to="/schedule" className="hover:text-blue-600 transition">
            Schedules
          </Link>

          <Link to="/MyBookings" className="hover:text-blue-600 transition">
           My Bookings
          </Link>
          {/* Show only when logged in */}
          {token && (
            <>
              <Link
                to="/profile"
                className="hover:text-blue-600 transition"
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Right Side Buttons */}
        <div className="flex gap-3">
          {!token && (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}