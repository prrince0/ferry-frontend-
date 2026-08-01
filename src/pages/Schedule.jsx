import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/API";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function Schedule() {
  const navigate = useNavigate();
  const location = useLocation();

  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (location.state?.schedules) {
    setSchedules(location.state.schedules);
    setFilteredSchedules(location.state.schedules);
    setLoading(false);
  } else {
    fetchSchedules();
  }
}, []);

  useEffect(() => {
    const filtered = schedules.filter(
      (schedule) =>
        schedule.ferry_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        schedule.origin
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        schedule.destination
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredSchedules(filtered);
  }, [search, schedules]);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedules");
      console.log(res.data);
      setSchedules(res.data);
      setFilteredSchedules(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load schedules");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">
          Ferry Schedules
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Book your ferry tickets quickly and easily.
        </p>

        {/* Search */}
        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search by Ferry, Origin or Destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-12 pr-4"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-xl font-semibold py-10">
            Loading schedules...
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-10">
            No schedules available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
               src={
                 schedule.image_url
                ? `http://localhost:3000${schedule.image_url}`
                  : "https://via.placeholder.com/500x250?text=Ferry"
                  }
                  alt={schedule.ferry_name}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-3">
                    {schedule.ferry_name}
                  </h2>

                  {/* Available Seats */}
                  <div className="flex gap-3 mb-5">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                       Seats: {schedule.available_passenger_seats}
                    </div>

                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                       Vehicles: {schedule.available_vehicle_slots}
                    </div>
                     <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                       Waitlist: {schedule.waitlist_count}
                     </div>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>
                        <strong>Route:</strong>{" "}
                        {schedule.origin} → {schedule.destination}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaClock className="text-blue-500" />
                      <span>
                        <strong>Departure:</strong>{" "}
                        {new Date(
                          schedule.departure_time
                        ).toLocaleString()}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaClock className="text-green-500" />
                      <span>
                        <strong>Arrival:</strong>{" "}
                        {new Date(
                          schedule.arrival_time
                        ).toLocaleString()}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-yellow-500" />
                      <span className="font-bold text-lg">
                        ₹{schedule.base_price}
                      </span>
                    </p>
                  </div>

                  {/* Status + Button */}
                  <div className="flex justify-between items-center mt-6">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        schedule.status === "scheduled"
                          ? "bg-green-500"
                          : schedule.status === "delayed"
                          ? "bg-yellow-500"
                          : schedule.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {schedule.status}
                    </span>

                    <button
  onClick={() => navigate(`/book/${schedule.id}`)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
>
  Book Now
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}