import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSlider from "../components/common/HeroSlider";

import {
  FaShip,
  FaClock,
  FaShieldAlt,
  FaCar,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Home() {
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

      {/* Hero Section */}
      <HeroSlider />

      {/* Search Box */}
      <section className="-mt-20 relative z-20 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Departure"
            className="border p-4 rounded-lg"
          />

          <input
            type="text"
            placeholder="Destination"
            className="border p-4 rounded-lg"
          />

          <input
            type="date"
            className="border p-4 rounded-lg"
          />

          <input
            type="number"
            placeholder="Passengers"
            className="border p-4 rounded-lg"
          />

          <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Search
          </button>
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

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
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
            <h2 className="text-5xl font-bold">25K+</h2>
            <p className="mt-3 text-lg">Passengers</p>
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