"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FiCalendar, FiImage, FiLogOut } from "react-icons/fi";
import { RiFileHistoryLine } from "react-icons/ri";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: <MdDashboard size={20} /> },
  {
    name: "Bookings",
    href: "/dashboard/booking",
    icon: <FiCalendar size={20} />,
  },
  { name: "Gallery", href: "/dashboard/gallery", icon: <FiImage size={20} /> },
  {
    name: "History",
    href: "/dashboard/booking-history",
    icon: <RiFileHistoryLine size={20} />,
  },
  // { name: "Rewards", href: "/dashboard/rewards", icon: <FiGift size={20} /> },
  {
    name: "Logout",
    href: "/dashboard/settings",
    icon: <FiLogOut size={20} color="#EF4444" />,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed md:hidden bottom-4 left-8 right-8 rounded-2xl bg-black text-white flex justify-around py-3 shadow-lg">
      {navItems.map(({ name, href, icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-label={name}
            className={`flex flex-col items-center text-gray-400 transition ${
              isActive ? "text-pink-500" : "hover:text-white"
            }`}
          >
            <div className="p-2 rounded-lg">{icon}</div>
          </Link>
        );
      })}
    </nav>
  );
}
