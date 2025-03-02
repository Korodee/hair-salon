"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FiCalendar, FiImage, FiLogOut } from "react-icons/fi";
import { RiFileHistoryLine } from "react-icons/ri";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
    close();
  }

  return (
    <>
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

        {/* Logout button (NOT a Link, opens modal) */}
        <button
          onClick={open}
          aria-label="Logout"
          className="flex flex-col items-center text-gray-400 transition hover:text-white"
        >
          <div className="p-2 rounded-lg">
            <FiLogOut size={20} color="#EF4444" />
          </div>
        </button>
      </nav>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-red-500"
              >
                Logout
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50">
                Are you sure you want to logout?
              </p>
              <div className="mt-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:outline-white float-right"
                  onClick={handleLogout}
                >
                  Yes
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
