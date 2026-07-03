import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaShip,
} from "react-icons/fa";

export default function Schedule() {
  const [ferries] = useState([
    {
      id: 1,
      name: "MV Green Line",
      from: "Dhaka",
      to: "Barishal",
      departure: "08:00 AM",
      arrival: "12:00 PM",
      seats: 45,
      price: 25,
      image:
        "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600",
    },
    {
      id: 2,
      name: "MV Padma Star",
      from: "Dhaka",
      to: "Barishal",
      departure: "01:00 PM",
      arrival: "05:00 PM",
      seats: 30,
      price: 22,
      image:
        "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600",
    },
    {
      id: 3,
      name: "MV Meghna Express",
      from: "Dhaka",
      to: "Barishal",
      departure: "06:00 PM",
      arrival: "10:00 PM",
      seats: 20,
      price: 20,
      image:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-5">
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Ferry Schedules
        </h1>

        <p className="text-gray-500">
          Search and book your ferry tickets
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-10">
        <div className="grid md:grid-cols-4 gap-5">
          {/* From */}
          <div>
            <label className="text-gray-600 text-sm">From</label>

            <div className="flex items-center border rounded-lg p-3 mt-2">
              <FaMapMarkerAlt className="text-blue-600 mr-3" />
              <select className="w-full outline-none">
                <option>Dhaka</option>
                <option>Barishal</option>
                <option>Chattogram</option>
              </select>
            </div>
          </div>

          {/* To */}
          <div>
            <label className="text-gray-600 text-sm">To</label>

            <div className="flex items-center border rounded-lg p-3 mt-2">
              <FaMapMarkerAlt className="text-blue-600 mr-3" />
              <select className="w-full outline-none">
                <option>Barishal</option>
                <option>Dhaka</option>
                <option>Chattogram</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-gray-600 text-sm">Date</label>

            <div className="flex items-center border rounded-lg p-3 mt-2">
              <FaCalendarAlt className="text-blue-600 mr-3" />
              <input type="date" className="w-full outline-none" />
            </div>
          </div>

          {/* Passenger */}
          <div>
            <label className="text-gray-600 text-sm">Passengers</label>

            <div className="flex items-center border rounded-lg p-3 mt-2">
              <FaUsers className="text-blue-600 mr-3" />
              <select className="w-full outline-none">
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4 Passengers</option>
              </select>
            </div>
          </div>
        </div>

        <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          Search Ferry
        </button>
      </div>

      {/* Ferry Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6">
          {ferries.map((ferry) => (
            <div
              key={ferry.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col lg:flex-row items-center gap-6"
            >
              {/* Image */}
              <img
                src={ferry.image}
                alt={ferry.name}
                className="w-60 h-36 rounded-xl object-cover"
              />

              {/* Ferry Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{ferry.name}</h2>

                <p className="text-gray-500 mt-2">
                  {ferry.from} → {ferry.to}
                </p>

                <div className="flex gap-8 mt-4">
                  <div>
                    <p className="text-gray-500 text-sm">Departure</p>
                    <p className="font-bold text-lg">
                      {ferry.departure}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Arrival</p>
                    <p className="font-bold text-lg">
                      {ferry.arrival}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Seats</p>
                    <p className="font-bold text-green-600">
                      {ferry.seats} Available
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  ${ferry.price}
                </p>

                <p className="text-gray-500 mb-4">
                  per passenger
                </p>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <FaShip />
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}