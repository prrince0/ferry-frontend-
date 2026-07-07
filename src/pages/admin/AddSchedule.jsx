import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/API";

export default function AddSchedule() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ferries, setFerries] = useState([]);

  const [formData, setFormData] = useState({
    ferry_id: "",
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    base_price: "",
    status: "scheduled",
  });

  useEffect(() => {
    getFerries();
  }, []);

  const getFerries = async () => {
    try {
      const res = await api.get("/ferries");
      setFerries(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load ferries");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/schedules", formData);

      alert("Schedule Added Successfully");

      navigate("/admin/schedules");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create schedule"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Ferry Schedule
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Ferry ID */}
          <div>
            <label className="block font-semibold mb-2">
              Select Ferry
            </label>

            <select
              name="ferry_id"
              value={formData.ferry_id}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Ferry
              </option>

              {ferries.map((ferry) => (
                <option
                  key={ferry.id}
                  value={ferry.id}
                >
                  {ferry.id} - {ferry.name}
                </option>
              ))}
            </select>
          </div>

          {/* Origin */}
          <div>
            <label className="block font-semibold mb-2">
              Origin
            </label>

            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block font-semibold mb-2">
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Departure */}
          <div>
            <label className="block font-semibold mb-2">
              Departure Time
            </label>

            <input
              type="datetime-local"
              name="departure_time"
              value={formData.departure_time}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Arrival */}
          <div>
            <label className="block font-semibold mb-2">
              Arrival Time
            </label>

            <input
              type="datetime-local"
              name="arrival_time"
              value={formData.arrival_time}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Base Price */}
          <div>
            <label className="block font-semibold mb-2">
              Base Price
            </label>

            <input
              type="number"
              name="base_price"
              value={formData.base_price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="scheduled">
                Scheduled
              </option>

              <option value="delayed">
                Delayed
              </option>

              <option value="cancelled">
                Cancelled
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </div>

          <div className="flex gap-4 mt-6">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : "Create Schedule"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/schedules")
              }
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}