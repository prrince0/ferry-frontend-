import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/API";

export default function AddFerry() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    passenger_capacity: "",
    vehicle_capacity: "",
    image_url: "",
    amenities: "",
    status: "active",
  });

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

      await api.post("/ferries", formData);

      alert("Ferry added successfully!");

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add ferry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add New Ferry
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Ferry Name */}
          <div>
            <label className="block mb-2 font-medium">
              Ferry Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
              placeholder="Enter ferry name"
            />
          </div>

          {/* Passenger Capacity */}
          <div>
            <label className="block mb-2 font-medium">
              Passenger Capacity
            </label>

            <input
              type="number"
              name="passenger_capacity"
              value={formData.passenger_capacity}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Vehicle Capacity */}
          <div>
            <label className="block mb-2 font-medium">
              Vehicle Capacity
            </label>

            <input
              type="number"
              name="vehicle_capacity"
              value={formData.vehicle_capacity}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="https://example.com/ferry.jpg"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block mb-2 font-medium">
              Amenities
            </label>

            <textarea
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-3"
              placeholder="WiFi, AC, Cafeteria, Parking..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Add Ferry"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/ferries")}
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