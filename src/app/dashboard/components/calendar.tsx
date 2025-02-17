"use client";

import { useState } from "react";
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
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dialog } from "@headlessui/react";

const adminAvailability: Record<string, string[]> = {
  "2025-02-10": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-02-12": ["9:30 AM", "11:30 AM"],
  "2025-02-15": ["12:00 PM", "2:00 PM", "4:00 PM"],
  "2025-02-22": ["10:00 AM", "1:00 PM", "3:00 PM"],
};

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="px-2 rounded-2xl">
      <h1 className="text-2xl font-bold pt-3 text-black">Calendar</h1>
      <p className="text-gray-500 pb-2">
        This calendar shows available dates and times for appointments.
      </p>
      <div className="flex py-2 justify-between items-center mb-4">
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
          length: (endDate.getTime() - startDate.getTime()) / 86400000 + 1,
        }).map((_, index) => {
          const day = addDays(startDate, index);
          const dateKey = format(day, "yyyy-MM-dd");
          const isAvailable = adminAvailability[dateKey];

          return (
            <div key={dateKey} className="relative">
              <button
                onClick={() => isAvailable && setSelectedDate(dateKey)}
                className={`p-3 rounded-lg transition w-full text-center ${
                  !isSameMonth(day, currentMonth)
                    ? "text-gray-400"
                    : isToday(day)
                    ? "bg-blue-500 text-white"
                    : isAvailable
                    ? "bg-green-300 text-green-900 hover:bg-green-200"
                    : "bg-white text-gray-500 hover:bg-gray-200"
                }`}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>

      <Dialog
        open={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white p-5 rounded-3xl shadow-lg w-80">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Available Times
          </h2>
          <div className="mt-3 space-y-2">
            {selectedDate &&
              adminAvailability[selectedDate]?.map((slot, idx) => (
                <p
                  key={idx}
                  className="text-center text-gray-700 bg-gray-100 px-3 py-1 rounded-md"
                >
                  {slot}
                </p>
              ))}
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
  );
}
