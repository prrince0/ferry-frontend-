import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/API";
import { FaSearch, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

export default function Schedule() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSchedules();
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
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >

                <img
                  src={
                    schedule.image_url ||
                    "https://via.placeholder.com/500x250?text=Ferry"
                  }
                  alt={schedule.ferry_name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-blue-700 mb-3">
                    {schedule.ferry_name}
                  </h2>

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

                    <div className="pt-2">

                      <span
                        className={`px-3 py-1 rounded-full text-white ${
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

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(`/book/${schedule.id}`)
                    }
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}