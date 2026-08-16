import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/API";
import toast from "react-hot-toast";

export default function AddFerry() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
  name: "",
  passenger_capacity: "",
  vehicle_capacity: "",
  amenities: "",
  status: "active",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 const handleFileChange = (e) => {
    setImage(e.target.files[0]);
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formDataWithImage = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataWithImage.append(key, formData[key]);
      });
      if (image) {
        formDataWithImage.append("image", image);
      }

      await api.post("/api/ferries", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ferry added successfully!");

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
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
          Ferry Image
          </label>

           <input
           type="file"
           name="image"
            accept="image/*"
           onChange={handleFileChange}
            className="w-full border rounded-lg p-3"
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