import { useState, useEffect } from "react";
import { useApplicationContext } from "../../context/appContext.jsx";
import { getUserBookings } from "../../services/bookingServices";
import { toast } from "react-hot-toast";
import { FaCalendarAlt, FaClock, FaSpinner } from "react-icons/fa";

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export default function History() {
  const { user } = useApplicationContext();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBookings();
        setBookings(response.data);
      } catch (error) {
        toast.error("Failed to fetch booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Booking History</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No bookings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't made any bookings yet.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.service}
                        </p>
                        <div className="flex items-center mt-1">
                          <FaClock className="h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString()} at{" "}
                            {booking.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
