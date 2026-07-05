import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import api from "../../services/API";

export default function ManageSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this schedule?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/schedules/${id}`);

      setSchedules(
        schedules.filter(
          (schedule) => schedule.id !== id
        )
      );

      alert("Schedule deleted successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Schedules
          </h1>

          <p className="text-gray-500 mt-2">
            Create, update and manage ferry schedules
          </p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition">
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
            placeholder="Search by ferry name or route..."
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-4">ID</th>
              <th>Ferry</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Date</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10"
                >
                  Loading...
                </td>
              </tr>
            ) : schedules.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10 text-gray-500"
                >
                  No schedules found
                </td>
              </tr>
            ) : (
              schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 text-center">
                    {schedule.id}
                  </td>

                  <td className="text-center">
                    {schedule.ferry_name}
                  </td>

                  <td className="text-center">
                    {schedule.source} →{" "}
                    {schedule.destination}
                  </td>

                  <td className="text-center">
                    {schedule.departure_time}
                  </td>

                  <td className="text-center">
                    {schedule.arrival_time}
                  </td>

                  <td className="text-center">
                    {schedule.date}
                  </td>

                  <td className="text-center">
                    {schedule.capacity}
                  </td>

                  <td className="text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {schedule.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <button className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600">
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