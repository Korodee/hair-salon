"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";

export default function Navbar({ activePage }: { activePage: string }) {
  return (
    <div className="bg-white p-4 shadow-md flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {" "}
        <div className="md:hidden w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">B</span>
        </div>{" "}
        <h1 className="text-2xl text-black font-semibold">{activePage}</h1>
      </div>

      <Link
        href="/dashboard/profile"
        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
      >
        <FiUser size={24} className="text-gray-700" />
      </Link>
    </div>
  );
}
