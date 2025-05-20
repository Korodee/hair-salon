import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaHistory,
  FaImages,
  FaUser,
} from "react-icons/fa";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: FaHome },
  { name: "Book Appointment", href: "/dashboard/booking", icon: FaCalendarAlt },
  { name: "Appointment History", href: "/dashboard/history", icon: FaHistory },
  { name: "Gallery", href: "/dashboard/gallery", icon: FaImages },
  { name: "Profile", href: "/dashboard/profile", icon: FaUser },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? "text-gray-500" : "text-gray-400"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
