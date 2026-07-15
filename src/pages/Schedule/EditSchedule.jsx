import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/API";

export default function EditSchedule() {
  const { id } = useParams();
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
    loadFerries();
    loadSchedule();
  }, []);

  const loadFerries = async () => {
    try {
      const res = await api.get("/ferries/my-ferries");
      setFerries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSchedule = async () => {
    try {
      const res = await api.get(`/schedules/${id}`);

      const schedule = res.data;

      setFormData({
        ferry_id: schedule.ferry_id,
        origin: schedule.origin,
        destination: schedule.destination,
        departure_time: schedule.departure_time.slice(0,16),
        arrival_time: schedule.arrival_time.slice(0,16),
        base_price: schedule.base_price,
        status: schedule.status,
      });

    } catch (err) {
      console.error(err);
      alert("Unable to load schedule");
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

      await api.put(`/schedules/${id}`, formData);

      alert("Schedule Updated Successfully");

      navigate("/admin/ManageSchedule");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Unable to update schedule"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">

        <div className="bg-blue-600 rounded-t-xl p-6">

          <h1 className="text-3xl font-bold text-white">
            Edit Schedule
          </h1>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 p-8"
        >

          <div className="col-span-2">

            <label>Ferry</label>

            <select
              name="ferry_id"
              value={formData.ferry_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

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

          <div>

            <label>Origin</label>

            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label>Destination</label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label>Departure Time</label>

            <input
              type="datetime-local"
              name="departure_time"
              value={formData.departure_time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label>Arrival Time</label>

            <input
              type="datetime-local"
              name="arrival_time"
              value={formData.arrival_time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label>Base Price</label>

            <input
              type="number"
              name="base_price"
              value={formData.base_price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="scheduled">Scheduled</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

          </div>

          <div className="col-span-2 flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/admin/schedules")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Update Schedule"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}