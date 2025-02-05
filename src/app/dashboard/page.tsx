"use client";

import { useState } from "react";
import Rewards from "../components/rewards";
import Booking from "../components/booking";
import Gallery from "../components/gallery";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import Link from "next/link";

export default function Dashboard() {
  const [user] = useState({ name: "Jane Doe", points: 120 });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section with Logo and Dashboard Text */}
      <div className="bg-white p-6 shadow-md mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <span className="text-lg font-semibold text-black">
                Korode Salon
              </span>
            </div>
          </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
          >
            <FiUser size={24} className="text-gray-700" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-md rounded-lg overflow-hidden">
              <Link
                href="/dashboard/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="mr-2" /> Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="mr-2" /> Settings
              </Link>
              <button className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 w-full">
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-6">
        {/* Dashboard Text */}
        <div className="text-2xl font-bold mb-4 text-black">Dashboard</div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <div>
              <h2 className="text-3xl text-gray-800 font-extrabold tracking-tight">
                Welcome, {user.name} 🎉
              </h2>
              <p className="text-gray-700 mt-2 text-lg font-semibold">
                Enjoy exclusive benefits, discounts, and birthday perks!
              </p>

              <Booking />
            </div>
            <div className="">
              <Rewards points={user.points} />
            </div>
          </div>
        </div>
        <div className="">
          <div className=""></div>
          <div className="">
            {" "}
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}
