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
    const filtered = bookings.filter((booking) =>

      booking.passenger_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      booking.email
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

    );

    setFilteredBookings(filtered);

  }, [search, bookings]);

  const fetchBookings = async () => {

    try {

      const res = await api.get("/api/bookings/admin");
      setBookings(res.data);
      setFilteredBookings(res.data);

    } catch (err) {

      console.error(err);
      alert("Unable to load bookings.");

    } finally {

      setLoading(false);

    }

  };

  const cancelBooking = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      await api.put(`/api/bookings/${id}/cancel`);

      fetchBookings();

      alert("Booking cancelled successfully.");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Unable to cancel booking."
      );

    }

  };

  const totalRevenue = bookings.reduce(
    (sum, booking) =>
      sum + Number(booking.total_price || 0),
    0
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.booking_status === "confirmed"
  ).length;

  const waitingBookings = bookings.filter(
    (booking) => booking.booking_status === "waiting"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.booking_status === "cancelled"
  ).length;

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Booking Management
          </h1>

          <p className="text-gray-500 mt-2">
            View all passenger bookings for your ferries.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaTicketAlt
            size={35}
            className="text-blue-600"
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
            size={35}
            className="text-green-600"
          />

          <div>

            <p>Total Revenue</p>

            <h2 className="text-3xl font-bold">
              ₹{totalRevenue}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaUsers
            size={35}
            className="text-green-600"
          />

          <div>

            <p>Confirmed</p>

            <h2 className="text-3xl font-bold">
              {confirmedBookings}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

          <FaTimesCircle
            size={35}
            className="text-red-600"
          />

          <div>

            <p>Cancelled</p>

            <h2 className="text-3xl font-bold">
              {cancelledBookings}
            </h2>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-8">

        <div className="relative">

          <FaSearch
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Passenger, Email, Ferry or Route..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-lg py-3 pl-12 pr-4"
          />

        </div>

      </div>

      {/* Booking Table Starts Here */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="py-4 px-3">ID</th>

              <th className="px-3">Passenger</th>

              <th className="px-3">Email</th>

              <th className="px-3">Ferry</th>

              <th className="px-3">Route</th>

              <th className="px-3">Departure</th>

              <th className="px-3">Arrival</th>

              <th className="px-3">Passengers</th>

              <th className="px-3">Vehicles</th>

              <th className="px-3">Amount</th>

              <th className="px-3">Status</th>

              <th className="px-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="12"
                  className="text-center py-10 text-lg"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredBookings.length === 0 ? (

              <tr>

                <td
                  colSpan="12"
                  className="text-center py-10 text-lg"
                >
                  No Bookings Found
                </td>

              </tr>

            ) : (

              filteredBookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="text-center py-4">

                    {booking.id}

                  </td>

                  <td className="text-center font-semibold">

                    {booking.passenger_name}

                  </td>

                  <td className="text-center">

                    {booking.email}

                  </td>

                  <td className="text-center text-blue-700 font-semibold">

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

                    {new Date(
                      booking.arrival_time
                    ).toLocaleString()}

                  </td>

                  <td className="text-center">

                    {booking.passenger_seats}

                  </td>

                  <td className="text-center">

                    {booking.vehicle_slots}

                  </td>

                  <td className="text-center font-bold text-green-700">

                    ₹{booking.total_price}

                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold

                      ${
                        booking.booking_status === "confirmed"
                          ? "bg-green-500"
                          : booking.booking_status === "waiting"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >

                      {booking.booking_status}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/bookings/${booking.id}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                      >

                        <FaEye />

                      </button>

                      {booking.booking_status !==
                        "cancelled" && (

                        <button
                          onClick={() =>
                            cancelBooking(booking.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        >

                          <FaTimesCircle />

                        </button>

                      )}

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