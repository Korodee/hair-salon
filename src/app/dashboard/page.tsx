"use client";
import Rewards from "./components/rewards";
import News from "./components/news";
import Banner from "./components/banner";
import { useApplicationContext } from "@/context/appContext";
import { useState, useEffect } from "react";
import Spinner from "./components/spinner";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";
import {
  getAllBookedDates,
  getAvailableSlots,
} from "@/services/bookingServices";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { user } = useApplicationContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [allBookedDates, setAllBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const fetchAllBookedDates = async () => {
    try {
      const response = await getAllBookedDates();
      setAllBookedDates(response.bookedDates);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleDateSelect = async (dateKey: string) => {
    const selectedDate = new Date(dateKey);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      setSelectedDate(dateKey);
      setLoading(true); // Start loading

      try {
        const response = await getAvailableSlots(dateKey);
        setAvailableSlots(response.availableSlots);
      } catch (error) {
        console.error("Failed to fetch available slots:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  useEffect(() => {
    fetchAllBookedDates();
  }, []);

  return (
    <div>
      {/* Dashboard Content */}
      <div className="mb-2">
        <div className="md:flex md:space-x-2 space-y-4 md:space-y-0 justify-between">
          {/* Card 1: Welcome */}
          <div className="md:w-1/2">
            <Banner />
          </div>
          {/* Card 2: Latest News */}
          <div className="md:w-1/2">
            <Rewards points={user?.rewardPoints} />
          </div>
        </div>
      </div>
      <div className="md:flex md:space-x-2 my-3 space-y-4 md:space-y-0 justify-between">
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold pt-3 text-black">Calendar</h1>
          <p className="text-gray-500 pb-4">
            This calendar shows available dates and times for appointments.
          </p>
          <div className="rounded-2xl  p-4">
            <div className="flex justify-between w-full my-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-300"
              >
                <FiChevronLeft size={20} color="black" />
              </button>
              <h2 className="text-xl text-black font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-300"
              >
                <FiChevronRight size={20} color="black" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-semibold">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({
                length:
                  (endDate.getTime() - startDate.getTime()) / 86400000 + 1,
              }).map((_, index) => {
                const day = addDays(startDate, index);
                const dateKey = format(day, "yyyy-MM-dd");
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isBookedDate = allBookedDates.includes(dateKey);

                return (
                  <button
                    key={dateKey}
                    onClick={() => handleDateSelect(dateKey)}
                    disabled={day < today}
                    className={`p-3 rounded-lg transition ${
                      !isSameMonth(day, currentMonth)
                        ? "text-gray-400"
                        : isToday(day)
                        ? "bg-blue-500 text-white"
                        : isBookedDate
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-500"
                    } ${
                      day < today
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>

            <Dialog
              open={!!selectedDate}
              onClose={() => setSelectedDate(null)}
              className="fixed inset-0 flex items-center backdrop-blur-[2px] justify-center p-4"
            >
              <div className="bg-white p-5 rounded-3xl shadow-lg w-80">
                <h2 className="text-lg text-center font-semibold text-gray-800 border-b pb-2">
                  Available Times on{" "}
                  {selectedDate &&
                    format(new Date(selectedDate), "MMMM d, yyyy")}
                </h2>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  {loading ? (
                    <div className="col-span-2">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      {selectedDate &&
                        availableSlots.map((slot, idx) => (
                          <p
                            key={idx}
                            className="text-center text-gray-700 bg-gray-100 px-3 py-2 rounded-md"
                          >
                            {slot}
                          </p>
                        ))}
                    </>
                  )}
                </div>

                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </Dialog>
          </div>
        </div>
        <div className="md:w-1/3">
          <News />
        </div>{" "}
      </div>
    </div>
  );
}
