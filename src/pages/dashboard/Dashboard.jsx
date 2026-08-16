import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/API";


import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaShip,
  FaRoute,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {

  const navigate = useNavigate();

  const [bookingTrend, setBookingTrend] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [bookingStatus, setBookingStatus] = useState([]);
  const [routes, setRoutes] = useState([]);

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
    "#9333ea",
  ];

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {

      const trendRes = await api.get("/api/dashboard/bookingtrend");
      const revenueRes = await api.get("/api/dashboard/revenueferry");
      const statusRes = await api.get("/api/dashboard/bookingstatus");
      const routeRes = await api.get("/api/dashboard/passengersroute");

      setBookingTrend(trendRes.data);
      setRevenue(revenueRes.data);
      setBookingStatus(statusRes.data);
      setRoutes(routeRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  const stats = [
    {
      title: "Total Ferries",
      value: revenue.length,
      subtitle: "Registered Ferries",
      icon: <FaShip size={28} />,
      bg: "bg-blue-500",
    },
    {
      title: "Routes",
      value: routes.length,
      subtitle: "Active Routes",
      icon: <FaRoute size={28} />,
      bg: "bg-green-500",
    },
    {
      title: "Bookings",
      value: bookingTrend.reduce(
        (sum, item) => sum + Number(item.total_bookings),
        0
      ),
      subtitle: "Total Bookings",
      icon: <FaCalendarAlt size={28} />,
      bg: "bg-yellow-500",
    },
    {
      title: "Passengers",
      value: routes.reduce(
        (sum, item) => sum + Number(item.passengers),
        0
      ),
      subtitle: "Total Passengers",
      icon: <FaUsers size={28} />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}

      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">

        <div>

          <h1 className="text-2xl font-bold mb-10">
            Ferry Management
          </h1>

          <ul className="space-y-4">

            <Link to="/admin/AdminFerries">
              <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
                Add Ferries
              </li>
            </Link>

            <Link to="/Ferries">
              <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
                My Ferries
              </li>
            </Link>

            <Link to="/admin/ManageSchedule">
              <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
                Schedule Management
              </li>
            </Link>

            <Link to="/admin/BookingList">
              <li className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer">
                Bookings
              </li>
            </Link>

          </ul>

        </div>

        <div className="mt-auto">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 rounded-lg py-3 flex justify-center items-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* Main */}

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold">
          Welcome back Admin 👋
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Here's today's ferry operations overview.
        </p>

        {/* Statistics */}

        <div className="grid grid-cols-4 gap-6 mb-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex gap-5 items-center"
            >

              <div className={`${item.bg} text-white p-4 rounded-xl`}>

                {item.icon}

              </div>

              <div>

                <p className="text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold">
                  {item.value}
                </h2>

                <p className="text-sm text-gray-400">
                  {item.subtitle}
                </p>

              </div>

            </div>

          ))}

        </div>
                {/* Charts */}

        <div className="grid grid-cols-2 gap-8">

          {/* Booking Trend */}

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">
              Booking Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={bookingTrend}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="booking_day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="total_bookings"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* Revenue */}

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">
              Revenue by Ferry
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={revenue}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="revenue"
                  fill="#16a34a"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Booking Status */}

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">
              Booking Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={bookingStatus}
                  dataKey="total"
                  nameKey="booking_status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {bookingStatus.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Passengers */}

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">
              Passengers by Route
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={routes}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="route"
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="passengers"
                  fill="#9333ea"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );

}