import {
  FaShip,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";

export default function MyBookings() {
  const bookings = [
    {
      id: "BK1250",
      ferry: "MV Green Line-1",
      from: "Dhaka",
      to: "Barishal",
      date: "24 May 2025",
      departure: "08:00 AM",
      arrival: "12:00 PM",
      passengers: 2,
      amount: "$50",
      status: "Confirmed",
    },
    {
      id: "BK1251",
      ferry: "MV Padma Star",
      from: "Dhaka",
      to: "Barishal",
      date: "28 May 2025",
      departure: "01:00 PM",
      arrival: "05:00 PM",
      passengers: 1,
      amount: "$22",
      status: "Pending",
    },
    {
      id: "BK1252",
      ferry: "MV Meghna Express",
      from: "Barishal",
      to: "Dhaka",
      date: "02 Jun 2025",
      departure: "06:00 PM",
      arrival: "10:00 PM",
      passengers: 3,
      amount: "$60",
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Confirmed")
      return "bg-green-100 text-green-700";

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            My Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your ferry reservations
          </p>
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Left Side */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {booking.ferry}
                      </h2>

                      <p className="text-gray-500">
                        Booking ID: {booking.id}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Route
                      </p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        {booking.from} → {booking.to}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Travel Date
                      </p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" />
                        {booking.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Departure
                      </p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaClock className="text-blue-600" />
                        {booking.departure}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Arrival
                      </p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaClock className="text-blue-600" />
                        {booking.arrival}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="lg:w-64 border-l lg:pl-6">
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">
                      Passengers
                    </p>

                    <p className="font-bold text-xl">
                      {booking.passengers}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">
                      Total Amount
                    </p>

                    <p className="text-3xl font-bold text-blue-600">
                      {booking.amount}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2">
                      <FaTicketAlt />
                      View Ticket
                    </button>

                    {booking.status !== "Completed" && (
                      <button className="border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Example */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center mt-10">
            <FaShip className="text-6xl text-gray-300 mx-auto mb-5" />

            <h2 className="text-2xl font-bold mb-3">
              No bookings found
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't booked any ferry tickets yet.
            </p>

            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700">
              Book Your First Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}