"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";

export default function Navbar({ activePage }: { activePage: string }) {
  return (
    <div className="bg-white p-6 shadow-md flex items-center justify-between">
      <h1 className="text-2xl text-black font-semibold">{activePage}</h1>

      <Link
        href="/dashboard/profile"
        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
      >
        <FiUser size={24} className="text-gray-700" />
      </Link>
    </div>
  );
}
