import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaHistory,
  FaImages,
  FaUser,
} from "react-icons/fa";

const navigation = [
  { name: "Home", href: "/dashboard", icon: FaHome },
  { name: "Book", href: "/dashboard/booking", icon: FaCalendarAlt },
  { name: "History", href: "/dashboard/history", icon: FaHistory },
  { name: "Gallery", href: "/dashboard/gallery", icon: FaImages },
  { name: "Profile", href: "/dashboard/profile", icon: FaUser },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-around">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
