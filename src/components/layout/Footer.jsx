

import { FaFacebook, FaInstagram, FaTwitter, FaShip } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        
        {/* Company */}
        <div>
          <div className="flex items-center gap-3 text-2xl font-bold mb-4">
            <FaShip />
            FerryMS
          </div>

          <p className="text-gray-400">
            Safe Journey, Happy Voyage.
            Modern ferry booking and management platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Schedule</li>
            <li>Booking</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Online Booking</li>
            <li>Seat Reservation</li>
            <li>Vehicle Transport</li>
            <li>Live Tracking</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p className="text-gray-400 mb-2">
            support@ferryms.com
          </p>

          <p className="text-gray-400 mb-4">
            +91 9876543210
          </p>

          <div className="flex gap-4 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-blue-500" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-5 text-gray-400">
        © 2025 Ferry Management System. All rights reserved.
      </div>
    </footer>
  );
}