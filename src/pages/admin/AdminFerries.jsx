import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/API";

export default function AdminFerries() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get("/schedules");
      setSchedules(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;

    try {
      await api.delete(`/schedules/${id}`);

      setSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== id)
      );

      alert("Schedule deleted successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
           Ferry management
          </h1>

          <p className="text-gray-500 mt-2">
            Create, update and manage ferry schedules
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/schedules/add")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus />
          Add Schedule
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search schedules..."
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-4">ID</th>
              <th>Ferry ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Base Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="py-10">
                  Loading...
                </td>
              </tr>
            ) : schedules.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-10 text-gray-500">
                  No schedules found
                </td>
              </tr>
            ) : (
              schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">{schedule.id}</td>

                  <td>{schedule.ferry_id}</td>

                  <td>{schedule.origin}</td>

                  <td>{schedule.destination}</td>

                  <td>
                    {new Date(
                      schedule.departure_time
                    ).toLocaleString()}
                  </td>

                  <td>
                    {new Date(
                      schedule.arrival_time
                    ).toLocaleString()}
                  </td>

                  <td>₹ {schedule.base_price}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white
                      ${
                        schedule.status === "scheduled"
                          ? "bg-green-500"
                          : schedule.status === "delayed"
                          ? "bg-yellow-500"
                          : schedule.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/schedules/edit/${schedule.id}`
                          )
                        }
                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(schedule.id)
                        }
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}