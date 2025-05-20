import { Link } from "react-router-dom";
import { useApplicationContext } from "../../context/appContext.jsx";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user } = useApplicationContext();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Hair Salon
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <FaUserCircle className="h-6 w-6" />
              <span className="hidden md:block">
                {user?.firstName} {user?.lastName}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
