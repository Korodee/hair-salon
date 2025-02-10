"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import BottomNav from "./components/bottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bookings", href: "/dashboard/booking" },
    { name: "Gallery", href: "/dashboard/gallery" },
    { name: "Rewards", href: "/dashboard/rewards" },
  ];

  const activePage =
    navItems.find((item) => item.href === pathname)?.name || "Dashboard";

  return (
    <div className="flex h-screen bg-white">
      <div className="md:w-64">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1  flex flex-col overflow-hidden">
        <Navbar activePage={activePage} />
        <main
          className="flex-1 bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]
    backdrop-blur-lg bg-white/30 p-4 overflow-y-auto pb-20 md:pb-0"
        >
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
