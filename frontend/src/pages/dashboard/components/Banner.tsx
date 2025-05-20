import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">
        Welcome back, {user?.name || "Guest"}!
      </h2>
      <p className="text-indigo-100 mb-6">
        Manage your appointments and explore our services.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/dashboard/booking")}
          className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <FaCalendarAlt className="mr-2" />
          Book Now
        </button>
        <button
          onClick={() => navigate("/dashboard/booking-history")}
          className="flex items-center px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors"
        >
          <FaHistory className="mr-2" />
          View History
        </button>
      </div>
    </div>
  );
};

export default Banner;
