import { useEffect, useState } from "react";
import api from "../services/API";
import {
  FaShip,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/my-bookings");
      console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "waiting":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }


  const handleCancelBooking = async (bookingId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {
   await api.delete(`/bookings/${bookingId}`);

    alert("Booking cancelled successfully.");
      setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              booking_status: "cancelled",
            }
          : booking
      )
    );
    //loadBookings();

  } catch (err) {
    console.error(err);
    alert("Failed to cancel booking.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-5">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your ferry reservations
          </p>
        </div>

        {bookings.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <FaShip className="text-6xl text-gray-300 mx-auto mb-5" />

            <h2 className="text-2xl font-bold">
              No Bookings Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't booked any ferry yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div className="flex-1">

                    <div className="flex justify-between items-center mb-5">

                      <div>

                        <h2 className="text-2xl font-bold">
                          {booking.ferry_name}
                        </h2>

                        <p className="text-gray-500">
                          Booking ID : #{booking.id}
                        </p>

                      </div>

                      <span
                        className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                          booking.booking_status
                        )}`}
                      >
                        {booking.booking_status === "waiting"
                          ? `WL ${booking.waitlist_number}`
                          : booking.booking_status}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                      <div>

                        <p className="text-gray-500 text-sm">
                          Route
                        </p>

                        <p className="font-semibold flex items-center gap-2">

                          <FaMapMarkerAlt className="text-blue-600" />

                          {booking.origin} → {booking.destination}

                        </p>

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          Travel Date
                        </p>

                        <p className="font-semibold flex items-center gap-2">

                          <FaCalendarAlt className="text-blue-600" />

                          {new Date(
                            booking.departure_time
                          ).toLocaleDateString()}

                        </p>

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          Departure
                        </p>

                        <p className="font-semibold flex items-center gap-2">

                          <FaClock className="text-blue-600" />

                          {new Date(
                            booking.departure_time
                          ).toLocaleTimeString()}

                        </p>

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          Arrival
                        </p>

                        <p className="font-semibold flex items-center gap-2">

                          <FaClock className="text-blue-600" />

                          {new Date(
                            booking.arrival_time
                          ).toLocaleTimeString()}

                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="lg:w-64 border-l lg:pl-6">

                    <div className="mb-4">

                      <p className="text-gray-500 text-sm">
                        Passenger Seats
                      </p>

                      <p className="text-xl font-bold">
                        {booking.passenger_seats}
                      </p>

                    </div>

                    <div className="mb-4">

                      <p className="text-gray-500 text-sm">
                        Vehicle Slots
                      </p>

                      <p className="text-xl font-bold">
                        {booking.vehicle_slots}
                      </p>

                    </div>

                    <div className="mb-6">

                      <p className="text-gray-500 text-sm">
                        Total Amount
                      </p>

                      <p className="text-3xl font-bold text-blue-600">
                        ₹{booking.total_price}
                      </p>

                    </div>

                    <div className="flex flex-col gap-3">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                        <FaTicketAlt />

                        View Ticket

                      </button>
{booking.booking_status === "confirmed" ||
 booking.booking_status === "waiting" ? (
  <button
    onClick={() => handleCancelBooking(booking.id)}
    className="border border-red-500 text-red-500 py-3 px-4 rounded-xl hover:bg-red-500 hover:text-white transition"
  >
    Cancel Booking
  </button>
) : null}

                    </div>

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