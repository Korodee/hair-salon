"use client";
import Rewards from "./components/rewards";
import News from "./components/news";
import Banner from "./components/banner";
import { useApplicationContext } from "@/context/appContext";
import { useState, useEffect } from "react";
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
import { getAllBookedDates, getAvailableSlots } from "@/services/bookingServices";

export default function Dashboard() {
  const { user } = useApplicationContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [allBookedDates, setAllBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

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

  const handleDateSelect = async (dateKey: string) => {
    const selectedDate = new Date(dateKey);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      setSelectedDate(dateKey);
      try {
        const response = await getAvailableSlots(dateKey);
        setAvailableSlots(response.availableSlots);
        setBookedSlots(response.bookedSlots || []);
      } catch (error) {
        console.error("Failed to fetch available slots:", error);
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
          <div className="rounded-2xl bg-white p-4">
            <div className="flex justify-between w-full my-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-300"
              >
                {/* Left arrow icon */}
              </button>
              <h2 className="text-xl text-black font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-300"
              >
                {/* Right arrow icon */}
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
                length: (endDate.getTime() - startDate.getTime()) / 86400000 + 1,
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

            {/* Time Slots for Selected Date */}
            {selectedDate && (
              <div className="mt-4 p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-4 text-center text-2xl">
                  Available times on{" "}
                  {selectedDate
                    ? format(new Date(selectedDate), "MMMM d, yyyy")
                    : ""}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {availableSlots
                    .concat(
                      bookedSlots
                        .filter((booking) => booking.date === selectedDate)
                        .map((booking) => booking.time)
                    )
                    .map((slot, idx) => {
                      const isBookedTime = bookedSlots.some(
                        (booking) =>
                          booking.date === selectedDate && booking.time === slot
                      );

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg text-center ${
                            isBookedTime
                              ? "bg-blue-500 text-white"
                              : "bg-green-200 text-green-900"
                          }`}
                        >
                          {slot} {isBookedTime && "(Booked)"}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-1/3">
          <News />
        </div>{" "}
      </div>
    </div>
  );
}
