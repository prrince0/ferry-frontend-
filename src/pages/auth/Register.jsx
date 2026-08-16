import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/API";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/api/auth/register", {
        full_name,
        email,
        password,
      });

      toast.success("Registration Successful");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-xl w-[420px]"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Register to continue
        </p>

        {/* Full Name */}
        <div className="relative mb-4">
          <FaUser className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Full Name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FaLock className="absolute left-4 top-4 text-gray-400" />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-4 top-4 text-gray-400" />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-500 mt-5">
          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer ml-1"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}