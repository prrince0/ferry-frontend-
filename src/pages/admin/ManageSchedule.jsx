import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../services/API";

export default function ManageSchedules() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedules");
      setSchedules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this schedule?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/schedules/${id}`);
    setSchedules(
      schedules.filter((schedule) => schedule.id !== id)
    );

    alert("Schedule deleted successfully");
  } catch (err) {
    console.error(err);
    alert(
      err.response?.data?.message ||
      "Failed to delete schedule"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Schedule Management
          </h1>

          <p className="text-gray-500">
            Manage ferry schedules
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-schedule")}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Schedule
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4">ID</th>
              <th>Ferry</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {schedules.map((schedule) => (

              <tr key={schedule.id} className="border-b">

                <td className="p-4">{schedule.id}</td>

                <td>{schedule.ferry_name}</td>

                <td>{schedule.origin}</td>

                <td>{schedule.destination}</td>

                <td>
                  {new Date(schedule.departure_time).toLocaleString()}
                </td>

                <td>
                  {new Date(schedule.arrival_time).toLocaleString()}
                </td>

                <td>₹{schedule.base_price}</td>

                <td>{schedule.status}</td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        navigate(`/admin/EditSchedule/${schedule.id}`)
                      }
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                    <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}