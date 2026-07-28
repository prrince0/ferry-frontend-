import { useEffect, useState } from "react";
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
    available_passenger_seats: "",
    available_vehicle_slots :"",
    status: "scheduled",
  });

  useEffect(() => {
    loadFerries();
  }, []);

  const loadFerries = async () => {
    try {
        const res = await api.get("/ferries/my-ferries");
      setFerries(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load your ferries.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/schedules", formData);

      alert("Schedule created successfully!");

      setFormData({
        ferry_id: "",
        origin: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        base_price: "",
        available_passenger_seats: "",
        available_vehicle_slots: "",
        status: "scheduled",
      });

      navigate("/admin/ManageSchedule");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to create schedule."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">

        <div className="bg-blue-600 text-white rounded-t-2xl p-6">
          <h1 className="text-3xl font-bold">
            Add Schedule
          </h1>

          <p className="mt-2 text-blue-100">
            Create a new ferry schedule.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 p-8"
        >

          <div className="col-span-2">
            <label className="font-semibold block mb-2">
              Ferry
            </label>

            <select
              name="ferry_id"
              value={formData.ferry_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">
                Select Ferry
              </option>

              {ferries.length > 0 ? (
                ferries.map((ferry) => (
                  <option
                    key={ferry.id}
                    value={ferry.id}
                  >
                    {ferry.id} - {ferry.name}
                  </option>
                ))
              ) : (
                <option disabled>
                  No ferries available
                </option>
              )}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Origin
            </label>

            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Departure Time
            </label>

            <input
              type="datetime-local"
              name="departure_time"
              value={formData.departure_time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Arrival Time
            </label>

            <input
              type="datetime-local"
              name="arrival_time"
              value={formData.arrival_time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Base Price (₹)
            </label>

            <input
              type="number"
              name="base_price"
              value={formData.base_price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
           <div>
            <label className="font-semibold block mb-2">
              Available Seat
            </label>

            <input
              type="number"
              name="available_passenger_seats"
              value={formData.available_passenger_seats}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
           <div>
            <label className="font-semibold block mb-2">
             Vehicle Slot
            </label>

            <input
              type="number"
              name="available_vehicle_slots"
              value={formData. available_vehicle_slots}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
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

          <div className="col-span-2 flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/schedules")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Schedule"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}