import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/API";
import toast from "react-hot-toast";

export default function BookingTicket() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [passengerSeats, setPassengerSeats] = useState(1);
  const [vehicleSlots, setVehicleSlots] = useState(0);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      const res = await api.get(`/api/schedules/${scheduleId}`);
      setSchedule(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load schedule");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = schedule
    ? (passengerSeats + vehicleSlots) * schedule.base_price
    : 0;

  const handleBooking = async () => {
    try {
      setBooking(true);
      const res = await api.post("/api/bookings", {
       schedule_id: scheduleId,
       passenger_seats: passengerSeats,
       vehicle_slots: vehicleSlots
});

if (res.data.waitlisted) {

    toast.success(
        `Added to Waitlist!\n\nWaiting Number: WL${res.data.waitlist_number}`
    );

} else {

    toast.success("Booking Successful!");

}
  navigate("/my-bookings");
    }catch (err) {
    console.error(err);
    console.log(err.response?.data);

    toast.error(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Booking Failed"
    );
  }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        <img
         src={
  schedule.image_url
    ? `${import.meta.env.VITE_API_URL}${schedule.image_url}`
    : "https://via.placeholder.com/500x250?text=Ferry"
}
                  alt={schedule.ferry_name}
          className="w-full h-52 object-cover rounded-t-2xl"
        />
      
        <div className="p-8">

          <h1 className="text-3xl font-bold text-blue-700">
            {schedule.ferry_name}
          </h1>

          <p className="text-gray-500 mt-2">
            Book your ferry ticket quickly and securely.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <div>

              <h2 className="text-lg font-semibold mb-4">
                Schedule Details
              </h2>

              <div className="space-y-3 text-gray-700">

                <p>
                  <strong>Origin:</strong> {schedule.origin}
                </p>

                <p>
                  <strong>Destination:</strong>{" "}
                  {schedule.destination}
                </p>

                <p>
                  <strong>Departure:</strong><br />
                  {new Date(
                    schedule.departure_time
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Arrival:</strong><br />
                  {new Date(
                    schedule.arrival_time
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    {schedule.status}
                  </span>
                </p>

              </div>

            </div>

            <div>

              <h2 className="text-lg font-semibold mb-4">
                Booking Details
              </h2>

              <div className="space-y-5">

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Passenger Seats
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={passengerSeats}
                    onChange={(e) =>
                      setPassengerSeats(Number(e.target.value))
                    }
                    className="w-full border rounded-lg p-3"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Vehicle Slots
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={vehicleSlots}
                    onChange={(e) =>
                      setVehicleSlots(Number(e.target.value))
                    }
                    className="w-full border rounded-lg p-3"
                  />

                </div>

                <div className="bg-blue-50 rounded-xl p-5">

                  <h3 className="text-lg font-semibold mb-3">
                    Booking Summary
                  </h3>

                  <p className="mb-2">
                    Price Per Seat / Vehicle:
                    <span className="font-bold text-green-600 ml-2">
                      ₹{schedule.base_price}
                    </span>
                  </p>

                  <p className="mb-2">
                    Passenger Seats:
                    <span className="font-semibold ml-2">
                      {passengerSeats}
                    </span>
                  </p>

                  <p className="mb-2">
                    Vehicle Slots:
                    <span className="font-semibold ml-2">
                      {vehicleSlots}
                    </span>
                  </p>

                  <hr className="my-3" />

                  <p className="text-2xl font-bold text-blue-700">
                    Total: ₹{totalAmount}
                  </p>

                </div>

                <button
                  onClick={handleBooking}
                  disabled={booking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  {booking
                    ? "Booking..."
                    : "Confirm Booking"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}