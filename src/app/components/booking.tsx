"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAvailableSlots = (date: Date) => {
    console.log("Fetching available slots for:", date);
    const slots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
    setAvailableSlots(slots);
  };

  const handleDateSelect = (date?: Date) => {
    if (date) {
      setSelectedDate(date);
      fetchAvailableSlots(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time.");
      return;
    }
    // Handle booking process here
    alert("Booking Confirmed");
  };

  return (
    <div className="flex items-center mt-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-black text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
      >
        Book an appointment
      </button>

      {isModalOpen && (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
          ></div>
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-black text-3xl font-semibold opacity-75 hover:opacity-100 focus:outline-none"
              >
                &times;
              </button>
              <h3 className="text-2xl text-black font-bold text-center mb-4">
                Select your appointment
              </h3>

              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                fromDate={today} // Now it strictly prevents selecting past days
                fromMonth={today} // Prevents navigating to past months
                className="rounded-lg bg-gray-100 p-4 shadow-md"
                styles={{
                  caption: { color: "red", fontWeight: "mediu" },
                  nav: { color: "black" },
                  day: { color: "black", fontWeight: "bold" },
                  day_disabled: { color: "gray", pointerEvents: "none" },
                  day_selected: {
                    backgroundColor: "#1D4ED8",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              />

              {selectedDate && (
                <div>
                  <h4 className="mt-4 text-black">
                    Available Time Slots for {format(selectedDate, "PP")}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleTimeSelect(slot)}
                        className={`${
                          selectedTime === slot
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTime && (
                <div className="mt-6">
                  <button
                    onClick={handleBooking}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
                  >
                    Confirm Appointment and Pay $25
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
