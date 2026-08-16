import { useEffect, useState } from "react";
import api from "../services/API";
import { FaShip, FaUsers, FaCar, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Ferries() {
  const [ferries, setFerries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFerries();
  }, []);

  const fetchFerries = async () => {
    try {
      const res = await api.get("/api/ferries/my-ferries");
      setFerries(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load ferries.");
      toast.error("Unable to load ferries.");
    } finally {
      setLoading(false);
    }
  };

  const deleteFerry = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this ferry?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/ferries/${id}`);

      setFerries(ferries.filter((f) => f.id !== id));

      toast.success("Ferry deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete ferry");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Ferries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">
            My Ferries
          </h1>
        </div>

        {ferries.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-12 text-center">

            <FaShip className="text-6xl mx-auto text-gray-300 mb-5"/>

            <h2 className="text-2xl font-bold">
              No Ferries Found
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first ferry.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {ferries.map((ferry) => (

              <div
                key={ferry.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >

            <img
 src={
  ferry.image_url
    ? `${import.meta.env.VITE_API_URL}${ferry.image_url}`
    : "https://via.placeholder.com/500x250?text=Ferry"
}
  alt={ferry.name}
  className="w-full h-52 object-cover rounded-t-2xl"
/>

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-blue-700 mb-4">
                    {ferry.name}
                  </h2>

                  <div className="space-y-3">

                    <p className="flex items-center gap-2">

                      <FaUsers className="text-green-600"/>

                      Passenger Capacity :
                      <strong>{ferry.passenger_capacity}</strong>

                    </p>

                    <p className="flex items-center gap-2">

                      <FaCar className="text-orange-500"/>

                      Vehicle Capacity :
                      <strong>{ferry.vehicle_capacity}</strong>

                    </p>
                    <p>

                      Status :
                      <span
  className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${
    ferry.status === "active"
      ? "bg-green-500"
      : ferry.status === "maintenance"
      ? "bg-yellow-500"
      : "bg-red-500"
  }`}
>
  {ferry.status}
</span>

                    </p>

                  </div>

                  <div className="flex gap-3 mt-6">

                    <button
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
                    >
                      <FaEdit/>

                      Edit
                    </button>

                    <button
                      onClick={() => deleteFerry(ferry.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
                    >
                      <FaTrash/>

                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}