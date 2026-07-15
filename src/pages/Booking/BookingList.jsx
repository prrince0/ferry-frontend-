import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaTimesCircle,
  FaTicketAlt,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import api from "../../services/API";

export default function BookingList() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setFilteredBookings(
      bookings.filter(
        (booking) =>
          booking.passenger_name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          booking.ferry_name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          booking.origin
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          booking.destination
            ?.toLowerCase()
            .includes(search.toLowerCase())
      )
    );
  }, [search, bookings]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
      setFilteredBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.put(`/bookings/${id}/cancel`);

      fetchBookings();

      alert("Booking cancelled successfully");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to cancel booking"
      );
    }
  };

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.total_amount || 0),
    0
  );

  const cancelled = bookings.filter(
    (booking) => booking.booking_status === "cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Booking Management
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage passenger bookings.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaTicketAlt
            className="text-blue-600"
            size={35}
          />

          <div>

            <p>Total Bookings</p>

            <h2 className="text-3xl font-bold">
              {bookings.length}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaMoneyBillWave
            className="text-green-600"
            size={35}
          />

          <div>

            <p>Total Revenue</p>

            <h2 className="text-3xl font-bold">
              ₹{totalRevenue}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaTimesCircle
            className="text-red-600"
            size={35}
          />

          <div>

            <p>Cancelled</p>

            <h2 className="text-3xl font-bold">
              {cancelled}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaUsers
            className="text-purple-600"
            size={35}
          />

          <div>

            <p>Passengers</p>

            <h2 className="text-3xl font-bold">
              {bookings.length}
            </h2>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Passenger, Ferry or Route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-12 pr-4"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="py-4">ID</th>
              <th>Passenger</th>
              <th>Ferry</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Seats</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredBookings.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center py-10"
                >
                  No Bookings Found
                </td>

              </tr>

            ) : (

              filteredBookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="text-center py-4">
                    {booking.id}
                  </td>

                  <td className="text-center">
                    {booking.passenger_name}
                  </td>

                  <td className="text-center">
                    {booking.ferry_name}
                  </td>

                  <td className="text-center">
                    {booking.origin} → {booking.destination}
                  </td>

                  <td className="text-center">
                    {new Date(
                      booking.departure_time
                    ).toLocaleString()}
                  </td>

                  <td className="text-center">
                    {booking.seats}
                  </td>

                  <td className="text-center">
                    ₹{booking.total_amount}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        booking.booking_status ===
                        "confirmed"
                          ? "bg-green-500"
                          : booking.booking_status ===
                            "cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.booking_status}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/bookings/${booking.id}`
                          )
                        }
                        className="bg-blue-500 text-white p-2 rounded-lg"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() =>
                          cancelBooking(booking.id)
                        }
                        className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        <FaTimesCircle />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}