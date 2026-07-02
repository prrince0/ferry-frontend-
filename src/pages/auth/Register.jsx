import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[420px]">
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
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="relative mb-4">
          <FaPhone className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FaLock className="absolute left-4 top-4 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-4 top-4 text-gray-400" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Register
        </button>

        <p className="text-center text-gray-500 mt-5">
          Already have an account?
          <span className="text-blue-600 cursor-pointer ml-1">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}