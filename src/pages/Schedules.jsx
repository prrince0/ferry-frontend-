import { useState, useEffect } from "react";



function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

const statusBadgeStyles = {
  "on-time": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  delayed: "bg-amber-50 text-amber-700 ring-amber-600/20",
  boarding: "bg-sky-50 text-sky-700 ring-sky-600/20",
  departed: "bg-slate-100 text-slate-600 ring-slate-500/20",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
  "sold-out": "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [routeFilter, setRouteFilter] = useState("all");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [seatCounts, setSeatCounts] = useState({});
  const [bookingTripId, setBookingTripId] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const [bookedTripIds, setBookedTripIds] = useState({});

  const fetchSchedule = async (date) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/trips?date=${date}`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to load the schedule.");
      const data = await res.json();
      setTrips(data.trips || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule(selectedDate);
  }, [selectedDate]);

  const routes = ["all", ...new Set(trips.map((t) => t.route).filter(Boolean))];
  const visibleTrips =
    routeFilter === "all" ? trips : trips.filter((t) => t.route === routeFilter);

  const getSeatCount = (tripId) => seatCounts[tripId] ?? 1;

  const adjustSeats = (tripId, delta, maxSeats) => {
    setSeatCounts((prev) => {
      const current = prev[tripId] ?? 1;
      const next = Math.min(Math.max(current + delta, 1), maxSeats || 99);
      return { ...prev, [tripId]: next };
    });
  };

  const handleBook = async (trip) => {
    setBookingError("");
    setBookingTripId(trip.id);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          tripId: trip.id,
          seats: getSeatCount(trip.id),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Could not complete booking.");

      setBookedTripIds((prev) => ({ ...prev, [trip.id]: true }));
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setBookingTripId(null);
    }
  };

  const isPastDate = selectedDate < todayISO();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0B2B40] text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1C5D7A] flex items-center justify-center font-bold text-sm">
            ⚓
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Sailing Schedule</h1>
            <p className="text-xs text-slate-300">Browse sailings and reserve your seat</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => fetchSchedule(selectedDate)}
              className="text-rose-700 font-medium underline"
            >
              Retry
            </button>
          </div>
        )}

        {bookingError && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
            {bookingError}
          </div>
        )}

        {/* Date + route filters */}
        <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              min={todayISO()}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-slate-500 mb-1">Route</label>
            <div className="flex gap-1 flex-wrap">
              {routes.map((route) => (
                <button
                  key={route}
                  onClick={() => setRouteFilter(route)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    routeFilter === route
                      ? "bg-[#0B2B40] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {route === "all" ? "All routes" : route}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sailings list */}
        <div className="space-y-3">
          {loading && (
            <div className="bg-white rounded-xl border border-slate-200 px-5 py-10 text-center text-sm text-slate-400">
              Loading sailings…
            </div>
          )}

          {!loading && isPastDate && (
            <div className="bg-white rounded-xl border border-slate-200 px-5 py-10 text-center text-sm text-slate-400">
              That date has already passed. Pick a current or future date.
            </div>
          )}

          {!loading && !isPastDate && visibleTrips.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 px-5 py-10 text-center text-sm text-slate-400">
              No sailings found for this date and route.
            </div>
          )}

          {!loading &&
            !isPastDate &&
            visibleTrips.map((trip) => {
              const seatsAvailable = trip.seatsAvailable ?? trip.capacity ?? 0;
              const soldOut = trip.status === "cancelled" || seatsAvailable <= 0;
              const alreadyBooked = bookedTripIds[trip.id];
              const seats = getSeatCount(trip.id);

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="text-center w-16 shrink-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {trip.departureTime}
                      </p>
                      <p className="text-[11px] text-slate-400">depart</p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate">{trip.route}</p>
                      <p className="text-xs text-slate-500">
                        {trip.vesselName ? `${trip.vesselName} · ` : ""}
                        {seatsAvailable} seat{seatsAvailable === 1 ? "" : "s"} left
                        {trip.fare != null ? ` · $${trip.fare}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset capitalize ${
                        statusBadgeStyles[soldOut ? "sold-out" : trip.status] ||
                        "bg-slate-100 text-slate-600 ring-slate-500/20"
                      }`}
                    >
                      {soldOut ? "Sold out" : trip.status}
                    </span>

                    {alreadyBooked ? (
                      <span className="text-xs font-medium text-emerald-700">
                        Booked ✓
                      </span>
                    ) : soldOut ? (
                      <button
                        disabled
                        className="rounded-lg bg-slate-200 text-slate-400 text-xs font-semibold px-4 py-2 cursor-not-allowed"
                      >
                        Sold out
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => adjustSeats(trip.id, -1, seatsAvailable)}
                            className="w-7 h-8 text-slate-600 hover:bg-slate-100 text-sm"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-slate-900">
                            {seats}
                          </span>
                          <button
                            onClick={() => adjustSeats(trip.id, 1, seatsAvailable)}
                            className="w-7 h-8 text-slate-600 hover:bg-slate-100 text-sm"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleBook(trip)}
                          disabled={bookingTripId === trip.id}
                          className="rounded-lg bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
                        >
                          {bookingTripId === trip.id ? "Booking..." : "Book"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
}


