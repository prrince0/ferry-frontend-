import { useState } from "react";
import { FaEnvelope, FaLock, FaShip } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";
import api from "../../services/API";
import bgImage from "../../assets/zhang-fengsheng-Vt7Z34h8lfo-unsplash.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Login Successful!");

      navigate("/home");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
 }; 

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center w-1/2 p-12 text-white">
          <FaShip className="text-7xl mb-6 text-cyan-300" />

          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Ferry Management
            <br />
            System
          </h1>

          <p className="text-xl text-gray-200">
            Safe Journey, Happy Voyage
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full md:w-[420px] bg-white/15 backdrop-blur-lg border border-white/20 p-10 text-white">
          <h2 className="text-4xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-200 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2">Email</label>

              <div className="flex items-center bg-white/20 rounded-xl px-4 py-3 border border-white/20">
                <FaEnvelope className="mr-3 text-gray-300" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none w-full placeholder-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block mb-2">Password</label>

              <div className="flex items-center bg-white/20 rounded-xl px-4 py-3 border border-white/20">
                <FaLock className="mr-3 text-gray-300" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent outline-none w-full placeholder-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="hover:text-cyan-300 transition"
              >
                Forgot Password?
              </button>
            </div>

            <p className="text-center mt-4">
                 Are you an administrator?
                 <Link to="/admin/login" className="text-blue-600 ml-1">
                   Admin Login
                   </Link>
            </p>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-xl font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-2 text-cyan-300 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}