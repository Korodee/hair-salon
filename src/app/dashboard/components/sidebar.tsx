"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiCalendar, FiImage, FiGift, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname(); // Get the current route

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
    { name: "Bookings", href: "/dashboard/booking", icon: <FiCalendar /> },
    { name: "Gallery", href: "/dashboard/gallery", icon: <FiImage /> },
    { name: "Rewards", href: "/dashboard/rewards", icon: <FiGift /> },
  ];

  return (
    <aside className="md:w-64 h-screen bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">B</span>
            </div>
            <span className="text-lg font-semibold text-black hidden sm:block">
              Braidzworld
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer
                ${
                  pathname === item.href
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {item.icon}
              <span className="font-medium hidden sm:block">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 w-full px-4 py-2 text-red-500 rounded-lg hover:bg-red-50 transition">
          <FiLogOut />
          <span className="font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
