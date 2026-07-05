import { Link } from "react-router-dom";
import {
  FaShip,
  FaRoute,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Ferries",
      value: "12",
      subtitle: "Active ferries",
      icon: <FaShip size={28} />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Routes",
      value: "8",
      subtitle: "Active routes",
      icon: <FaRoute size={28} />,
      bg: "bg-green-500",
    },
    {
      title: "Today's Trips",
      value: "24",
      subtitle: "Scheduled trips",
      icon: <FaCalendarAlt size={28} />,
      bg: "bg-yellow-500",
    },
    {
      title: "Passengers",
      value: "1248",
      subtitle: "Today's travelers",
      icon: <FaUsers size={28} />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">
          Ferry Management
        </h1>

        <ul className="space-y-4">
          <Link to="/admin/ManageSchedules">
          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition">
            Manage Schedules
          </li>
          </Link>
          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Ferries
          </li>
          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Routes
          </li>
          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Schedules
          </li>
          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Bookings
          </li>
          <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
            Users
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, Admin 👋
        </h1>

        <p className="text-gray-500 mb-8">
          Here's what's happening with your ferry operations today.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-5"
            >
              <div
                className={`${item.bg} text-white p-4 rounded-xl`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold">
                  {item.value}
                </h2>

                <p className="text-gray-400 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-md p-8 h-96">
          <h2 className="text-2xl font-semibold mb-4">
            Today's Overview
          </h2>

          <div className="h-72 flex items-center justify-center text-gray-400 text-xl">
            Chart will go here
          </div>
        </div>
      </div>
    </div>
  );
}