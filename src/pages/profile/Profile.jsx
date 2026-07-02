import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTicketAlt,
  FaShip,
  FaClock,
  FaSignOutAlt,
  FaUsers,
  FaLock,
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");};
  const user = {
    name: "Kumar",
    email: "kumar@example.com",
    phone: "+91 9876543210",
    address: "Mumbai, India",
    recentBookings: 12,
    completedTrips: 8,
    upcomingTrips: 4,
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10 px-5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Side Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center h-fit">
          <img
            src="https://ui-avatars.com/api/?name=Kumar&background=2563eb&color=fff&size=200"
            alt="Profile"
            className="w-36 h-36 rounded-full mx-auto border-4 border-blue-500 mb-5"
          />

          <h2 className="text-3xl font-bold text-gray-800">
            {user.name}
          </h2>

          <p className="text-gray-500 mt-2">
            Passenger
          </p>

          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700 transition">
            <FaEdit />
            Edit Profile
          </button>

          {/* Menu */}
          <div className="mt-8 space-y-4">

            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition">
              <FaTicketAlt />
              My Bookings
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition">
              <FaUsers />
              Saved Passengers
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition">
              <FaLock />
              Change Password
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-500 text-white hover:bg-red-600 transition" onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 space-y-8">

          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FaUser className="text-blue-600 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-semibold text-lg">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold text-lg">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FaPhone className="text-blue-600 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="font-semibold text-lg">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Address</p>
                  <p className="font-semibold text-lg">{user.address}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex justify-center items-center mx-auto mb-5">
                <FaTicketAlt className="text-blue-600 text-4xl" />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {user.recentBookings}
              </h2>

              <p className="text-gray-500 mt-3">
                Recent Bookings
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="bg-green-100 w-20 h-20 rounded-full flex justify-center items-center mx-auto mb-5">
                <FaShip className="text-green-600 text-4xl" />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {user.completedTrips}
              </h2>

              <p className="text-gray-500 mt-3">
                Completed Trips
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex justify-center items-center mx-auto mb-5">
                <FaClock className="text-orange-600 text-4xl" />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {user.upcomingTrips}
              </h2>

              <p className="text-gray-500 mt-3">
                Upcoming Trips
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}