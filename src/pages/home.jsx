import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/API";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSlider from "../components/common/HeroSlider";

import {
  FaShip,
  FaClock,
  FaShieldAlt,
  FaCar,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

export default function Home() {

  const navigate = useNavigate();

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const handleSearch = async () => {
    try {

      const res = await api.get("/search/search", {
       params: {
       origin: departure,
       destination,
       date: travelDate,
      },
  });

      navigate("/schedule", {
        state: {
          schedules: res.data,
        },
      });

    } catch (err) {
      console.error(err);
      alert("No schedules found");
    }
  };

  const features = [
    {
      icon: <FaShip className="text-4xl text-blue-600" />,
      title: "Online Ferry Booking",
      desc: "Book ferry tickets anytime from anywhere.",
    },
    {
      icon: <FaCar className="text-4xl text-green-600" />,
      title: "Vehicle Transport",
      desc: "Reserve space for cars, bikes and trucks.",
    },
    {
      icon: <FaClock className="text-4xl text-orange-600" />,
      title: "Real Time Schedule",
      desc: "Get live updates for departures and arrivals.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-purple-600" />,
      title: "Safe Journey",
      desc: "Modern ferries with enhanced safety systems.",
    },
  ];

  const routes = [
    {
      from: "Mumbai",
      to: "Goa",
      duration: "8 Hours",
    },
    {
      from: "Kochi",
      to: "Lakshadweep",
      duration: "10 Hours",
    },
    {
      from: "Chennai",
      to: "Andaman",
      duration: "12 Hours",
    },
  ];

  return (
    <>
      <Navbar />

      <HeroSlider />

      <section className="-mt-20 relative z-20 px-6">
  <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* Departure */}
      <input
        type="text"
        placeholder="Departure"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Destination */}
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Date */}
      <input
        type="date"
        value={travelDate}
        onChange={(e) => setTravelDate(e.target.value)}
        className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2 text-lg font-semibold"
      >
        <FaSearch />
        Search
      </button>

    </div>

  </div>
</section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition"
              >
                <div className="flex justify-center mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Popular Routes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {routes.map((route, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
              >
                <div className="bg-blue-600 text-white p-6 text-center">
                  <FaMapMarkerAlt className="text-4xl mx-auto mb-4" />

                  <h3 className="text-2xl font-bold">
                    {route.from}
                  </h3>

                  <p className="text-xl my-3">⛴️</p>

                  <h3 className="text-2xl font-bold">
                    {route.to}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Duration: {route.duration}
                  </p>

                  <button
                    onClick={() => navigate("/schedule")}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    View Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-5xl font-bold">50+</h2>
            <p className="mt-3 text-lg">Ferries</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">100+</h2>
            <p className="mt-3 text-lg">Routes</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold">99%</h2>
            <p className="mt-3 text-lg">On Time Arrival</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}