"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react"; // ✅ Import this
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import BottomNav from "./components/bottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bookings", href: "/dashboard/booking" },
    { name: "Bookings History", href: "/dashboard/booking-history" },
    { name: "Photo Gallery", href: "/dashboard/gallery" },
    { name: "Rewards", href: "/dashboard/rewards" },
    { name: "Profile", href: "/dashboard/profile" },
  ];

  const activePage =
    navItems.find((item) => item.href === pathname)?.name || "Dashboard";

  return (
    <SessionProvider> {/* ✅ Wrap entire layout in SessionProvider */}
      <div className="flex h-screen bg-white">
        <div className="md:w-64">
          <Sidebar />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-[100svh]">
          <Navbar activePage={activePage} />
           <main
          className="flex-1 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50  pb-20 md:pb-0 
    p-4 overflow-y-auto"
        >
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </SessionProvider>
  );
}
