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
import StripeCheckout from "react-stripe-checkout";

const adminAvailability: Record<string, string[]> = {
  "2025-02-10": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-02-12": ["9:30 AM", "11:30 AM", "9:30 AM", "11:30 AM"],
  "2025-02-15": ["12:00 PM", "2:00 PM", "4:00 PM"],
  "2025-02-22": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-02-17": ["9:30 AM", "11:30 AM"],
  "2025-02-26": ["12:00 PM", "2:00 PM", "4:00 PM"],
  "2025-02-25": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-02-20": ["9:30 AM", "11:30 AM"],
};

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setIsPaymentModalOpen(true); // Show payment modal after selecting time
  };

  const handlePaymentSuccess = (token: { id: string; email: string }) => {
    // Handle the successful payment logic here
    alert("Payment successful! Your appointment is confirmed.");
    // Optionally log the token details or process it
    console.log("Payment token received:", token);
    // Add logic to store booking info
    setIsPaymentModalOpen(false); // Close payment modal
  };

  return (
    <div className="rounded-2xl">
      <div>
        <div
          className="relative bg-gray-900 text-white rounded-md overflow-hidden h-28  shadow-lg bg-cover bg-center"
          style={{ backgroundImage: "url('/img/bookingImg.jpg')" }}
        >
          {/* Overlay (Optional, for contrast) */}
          <div className="bg-black/70 p-4 h-full w-full flex flex-col justify-center items-start">
            {/* Date Display */}
            <h2 className="text-2xl pb-1 font-semibold relative z-10">
              {format(new Date(), "EEE, d MMM yyyy")}
            </h2>

            {/* Subtitle */}
            <p className="relative z-10 text-gray-300">
              Check availability and book appointments in just a few clicks.
            </p>
          </div>
        </div>

        <div>
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

          {/* Calendar Grid */}
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
                <button
                  key={dateKey}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`p-3 rounded-lg transition ${
                    !isSameMonth(day, currentMonth)
                      ? "text-gray-400"
                      : isToday(day)
                      ? "bg-blue-500 text-white"
                      : isAvailable
                      ? "bg-green-300 text-green-900 hover:bg-green-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
              {adminAvailability[selectedDate] ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {adminAvailability[selectedDate].map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectTime(slot)}
                      className="transition-all duration-200 transform bg-gradient-to-r from-green-200 to-green-300 text-black py-3 px-6 rounded-lg shadow-lg text-lg font-medium hover:scale-105 hover:shadow-xl hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 text-center font-semibold">
                  No available slots.
                </p>
              )}
            </div>
          )}

          {/* Payment Modal */}
          {isPaymentModalOpen && selectedTime && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 max-w-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Confirm Booking for {selectedTime} on{" "}
                  {selectedDate
                    ? format(new Date(selectedDate), "MMMM d, yyyy")
                    : ""}
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                  A $25 deposit is required to confirm your appointment.
                </p>
                <div className="flex justify-center mb-4">
                  <StripeCheckout
                    stripeKey="your-public-key"
                    token={handlePaymentSuccess}
                    amount={2500} // $25 deposit (in cents)
                    currency="USD"
                    name="Appointment Booking"
                    description="Deposit for your appointment"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsPaymentModalOpen(false)}
                    className=" p-2 bg-red-500 text-white rounded-lg w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
