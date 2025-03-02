"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiCalendar, FiImage, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { RiFileHistoryLine } from "react-icons/ri";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
    { name: "Bookings", href: "/dashboard/booking", icon: <FiCalendar /> },
    { name: "Gallery", href: "/dashboard/gallery", icon: <FiImage /> },
    {
      name: "History",
      href: "/dashboard/booking-history",
      icon: <RiFileHistoryLine />,
    },
  ];

  return (
    <>
      <aside className="md:w-64 h-screen hidden md:flex bg-white/50 backdrop-blur-xl shadow-lg flex-col">
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
                    : "text-gray-700 hover:bg-gray-200"
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
          <button
            onClick={open}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-500 rounded-lg hover:bg-red-50 transition"
          >
            <FiLogOut />
            <span className="font-medium hidden sm:block">Logout</span>
          </button>
        </div>
      </aside>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
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
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 float-right"
                  onClick={() => {
                    router.push("/auth/login");
                    localStorage.removeItem("authToken");
                    close();
                  }}
                >
                  Yes
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
