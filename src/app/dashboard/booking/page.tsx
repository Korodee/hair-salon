"use client";

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
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import StripeCheckout from "react-stripe-checkout";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import {
  createBooking,
  getAvailableSlots,
  getAllBookedDates,
} from "@/services/bookingServices";
import { getCurrentUser } from "@/services/authService";
import { useApplicationContext } from "@/context/appContext";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<
    { date: string; time: string }[]
  >([]);
  const [allBookedDates, setAllBookedDates] = useState<string[]>([]);
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const { setUser } = useApplicationContext();

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setIsPaymentModalOpen(true);
  };

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await getAvailableSlots(date);
      setAvailableSlots(response.availableSlots);
      setBookedSlots(response.bookedSlots || []);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    }
  };

  const handleDateSelect = (dateKey: string) => {
    const selectedDate = new Date(dateKey);
    const today = new Date();
    // Clear time part for accurate date comparison
    today.setHours(0, 0, 0, 0);

    // Only proceed if the selected date is today or in the future
    if (selectedDate >= today) {
      setSelectedDate(dateKey);
      fetchAvailableSlots(dateKey);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select a date and time.");
        return;
      }
      const response = await createBooking({
        date: selectedDate,
        time: selectedTime,
      });

      if (response.booking) {
        toast.success("Booking confirmed successfully!");
        setIsPaymentModalOpen(false);
        fetchAllBookedDates();

        const response = await getCurrentUser();
        if (response) {
          setUser(response);
        }

        // Refresh available slots
        //fetchAvailableSlots(date);
      } else {
        toast.error("Failed to confirm booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking creation failed:", error);
      toast.error("Failed to confirm booking. Please try again.");
    }
  };
  const fetchAllBookedDates = async () => {
    try {
      const response = await getAllBookedDates();
      setAllBookedDates(response.bookedDates);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
  };
  // Add useEffect to fetch all booked dates on component mount
  useEffect(() => {
    fetchAllBookedDates();
  }, []);

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
              const isAvailable = availableSlots.includes(dateKey);
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
                      : isAvailable
                      ? "bg-green-300 text-green-900 hover:bg-green-200"
                      : "bg-white text-gray-500 hover:bg-gray-200"
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
                      <button
                        key={idx}
                        onClick={() =>
                          isBookedTime ? null : handleSelectTime(slot)
                        }
                        className={`transition-all duration-200 transform ${
                          isBookedTime
                            ? "bg-blue-500 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-green-200 to-green-300 text-black"
                        } py-3 px-6 rounded-lg shadow-lg text-lg font-medium ${
                          isBookedTime
                            ? ""
                            : "hover:scale-105 hover:shadow-xl hover:from-green-500 hover:to-green-600"
                        } focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50`}
                      >
                        {slot} {isBookedTime && "(Booked)"}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Payment Modal */}
          <Dialog
            open={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="fixed inset-0 bg-gray-500 opacity-50" />
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
              <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Confirm Booking for {selectedTime} on{" "}
                {selectedDate && format(new Date(selectedDate), "MMMM d, yyyy")}
              </Dialog.Title>
              <p className="text-gray-700 mb-6 text-center">
                A $25 deposit is required to confirm your appointment.
              </p>
              <div className="flex justify-center mb-4">
                <StripeCheckout
                  stripeKey="your-public-key"
                  token={handlePaymentSuccess}
                  amount={2500}
                  currency="USD"
                  name="Appointment Booking"
                  description="Deposit for your appointment"
                />
              </div>
              <div className="flex justify-center flex-col gap-4">
                <button
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                  }}
                  className="p-2 bg-red-500 text-white rounded-lg w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    handlePaymentSuccess();
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="p-2 bg-green-500 text-white rounded-lg w-full"
                >
                  Pay
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
