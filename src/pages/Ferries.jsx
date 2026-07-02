import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const scheduleData = [
  { ferry: "MV Ganga", route: "Patna → Varanasi", departure: "06:00 AM", arrival: "09:30 AM", capacity: "180/200", status: "On time" },
  { ferry: "MV Brahmaputra", route: "Guwahati → Dibrugarh", departure: "08:15 AM", arrival: "12:00 PM", capacity: "95/120", status: "On time" },
  { ferry: "MV Kaveri", route: "Kochi → Lakshadweep", departure: "09:00 AM", arrival: "03:00 PM", capacity: "210/250", status: "Delayed" },
  { ferry: "MV Yamuna", route: "Delhi → Allahabad", departure: "11:30 AM", arrival: "05:45 PM", capacity: "60/150", status: "Boarding" },
  { ferry: "MV Godavari", route: "Rajamundry → Kakinada", departure: "02:00 PM", arrival: "04:00 PM", capacity: "0/180", status: "Boarding" },
];

const statusStyle = {
  "On time": { background: "rgba(78,203,130,0.15)", color: "#4ecb82" },
  "Delayed":  { background: "rgba(224,108,108,0.15)", color: "#e06c6c" },
  "Boarding": { background: "rgba(77,184,212,0.15)", color: "#4db8d4" },
};

const navItems = [
  { icon: "ti-layout-dashboard", label: "Dashboard", path: "/dashboard" },
  { icon: "ti-ship",             label: "Ferries",   path: "/ferries" },
  { icon: "ti-calendar",         label: "Schedules", path: "/schedules" },
  { icon: "ti-ticket",           label: "Bookings",  path: "/my-bookings" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("/dashboard");
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    setToday(d.toLocaleDateString("en-IN", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }));
  }, []);

  const handleNav = (path) => {
    setActive(path);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "sans-serif", background: "linear-gradient(180deg, #0a2a4a 0%, #1a5276 60%, #1a7a9a 100%)" }}>

      {/* Sidebar */}
      <div style={{ width: 210, background: "rgba(0,0,0,0.28)", borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", padding: "1.25rem 0", minHeight: "100vh" }}>

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 1rem 1.5rem" }}>
          <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚓</div>
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>FerryOps</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Operations System</div>
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, letterSpacing: 1, padding: "0 1rem 6px", textTransform: "uppercase" }}>Main</div>

        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => handleNav(item.path)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 1rem", cursor: "pointer", fontSize: 13,
              color: active === item.path ? "#fff" : "rgba(255,255,255,0.5)",
              background: active === item.path ? "rgba(255,255,255,0.1)" : "transparent",
              borderRight: active === item.path ? "2px solid #4db8d4" : "2px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <i className={`ti ${item.icon}`} style={{ fontSize: 17 }} aria-hidden="true" />
            {item.label}
          </div>
        ))}

        {/* Bottom nav */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, letterSpacing: 1, padding: "0 1rem 6px", textTransform: "uppercase" }}>Account</div>
          <div
            onClick={() => handleNav("/settings")}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 1rem", cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.5)" }}
          >
            <i className="ti ti-settings" style={{ fontSize: 17 }} aria-hidden="true" />
            Settings
          </div>
          <div
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 1rem", cursor: "pointer", fontSize: 13, color: "rgba(224,108,108,0.8)" }}
          >
            <i className="ti ti-logout" style={{ fontSize: 17 }} aria-hidden="true" />
            Logout
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "1.75rem 2rem", overflowY: "auto" }}>

        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 500 }}>Dashboard</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2 }}>{today}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "5px 14px 5px 5px" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a7abd", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 500 }}>
              {initials}
            </div>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{user?.full_name || "Admin"}</span>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: "1.75rem" }}>
          {[
            { icon: "ti-ship",           label: "Active ferries", value: "12",    change: "↑ 2 since yesterday", up: true },
            { icon: "ti-ticket",         label: "Total bookings", value: "1,482", change: "↑ 8% this week",      up: true },
            { icon: "ti-clock",          label: "On-time rate",   value: "94%",   change: "↓ 2% vs last week",   up: false },
            { icon: "ti-currency-rupee", label: "Revenue today",  value: "₹84K",  change: "↑ 12% vs yesterday",  up: true },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "1rem 1.25rem" }}>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 14 }} aria-hidden="true" />
                {s.label}
              </div>
              <div style={{ color: "#fff", fontSize: 24, fontWeight: 500 }}>{s.value}</div>
              <div style={{ fontSize: 11, marginTop: 4, color: s.up ? "#4ecb82" : "#e06c6c" }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Schedule table */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Ferry schedule</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Today's trips</div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.06)" }}>
                  {["Ferry", "Route", "Departure", "Arrival", "Capacity", "Status"].map((h) => (
                    <th key={h} style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500, padding: "11px 16px", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ color: "#fff", padding: "11px 16px", fontWeight: 500, whiteSpace: "nowrap" }}>{row.ferry}</td>
                    <td style={{ color: "rgba(255,255,255,0.7)", padding: "11px 16px", whiteSpace: "nowrap" }}>{row.route}</td>
                    <td style={{ color: "rgba(255,255,255,0.7)", padding: "11px 16px", whiteSpace: "nowrap" }}>{row.departure}</td>
                    <td style={{ color: "rgba(255,255,255,0.7)", padding: "11px 16px", whiteSpace: "nowrap" }}>{row.arrival}</td>
                    <td style={{ color: "rgba(255,255,255,0.7)", padding: "11px 16px", whiteSpace: "nowrap" }}>{row.capacity}</td>
                    <td style={{ padding: "11px 16px" }}>
                      <span style={{ ...statusStyle[row.status], padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}