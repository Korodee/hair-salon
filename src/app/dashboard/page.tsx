"use client";

import { useState } from "react";
import Rewards from "../components/rewards";
import Gallery from "../components/gallery";
import News from "../components/news";
import Banner from "../components/banner";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import Link from "next/link";
import Calendar from "../components/calendar";

export default function Dashboard() {
  const [user] = useState({ name: "Jane Doe", points: 120 });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]
    backdrop-blur-lg bg-white/30
    "
    >
      {/* Header Section with Logo and Dashboard Text */}
      <div className="bg-white p-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <span className="text-lg font-semibold text-black">
                Braidzworld
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
      <div className="px-4 md:px-6">
        {/* Dashboard Text */}´
        <div className="text-3xl font-bold mb-4 text-black">Dashboard</div>
        <div className="mb-2">
          <div className="md:flex md:space-x-2 space-y-4 md:space-y-0 justify-between">
            {/* Card 1: Welcome */}
            <div className="md:w-1/2">
              <Banner />
            </div>
            {/* Card 2: Latest News */}
            <div className="md:w-1/2">
              <Rewards points={user.points} />
            </div>
          </div>
        </div>
        <div>
          <Calendar />
        </div>
        <div className="md:flex md:space-x-2 my-3 space-y-4 md:space-y-0 justify-between">
          <div className="md:w-1/3">
            <News />
          </div>{" "}
          <div className="md:w-2/3">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}
