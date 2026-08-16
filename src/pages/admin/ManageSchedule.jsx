import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../services/API";
import toast from "react-hot-toast";

export default function ManageSchedules() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/api/schedules");
      setSchedules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleDelete = async (id) => {
  const confirmDelete = () => {
    return new Promise((resolve) => {
      toast.custom(
        (t) => (
          <div className="bg-white shadow-2xl rounded-xl p-6 w-[380px] border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Delete Schedule?
            </h2>

            <p className="text-gray-500 mb-5">
              Are you sure you want to delete this schedule?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    });
  };

  const confirmed = await confirmDelete();

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/api/schedules/${id}`);

    setSchedules((prev) =>
      prev.filter((schedule) => schedule.id !== id)
    );

    toast.success("Schedule deleted successfully");
  } catch (err) {
    console.error(err);

    toast.error(
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
};