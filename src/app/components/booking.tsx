"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ArrowRight } from "lucide-react";

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
    <div className="flex justify-center md:justify-normal items-center mt-2">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-3 flex w-fit items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-sm font-medium transition-all duration-300 transform hover:bg-white hover:text-black hover:scale-105 group"
      >
        Book an Appointment
        <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full transition-all duration-300 transform group-hover:bg-black group-hover:text-white">
          <ArrowRight size={14} />
        </span>
      </button>

      {isModalOpen && (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
          ></div>
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-[16px] shadow-lg w-full md:max-w-md relative">
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
                fromDate={today}
                fromMonth={today}
                className="rounded-lg  bg-white p-4 shadow-md w-full flex justify-center"
                modifiersClassNames={{
                  selected: "bg-blue-600 text-white rounded-full font-bold",
                  today:
                    "border border-blue-600 text-blue-700 font-bold rounded-full",
                  disabled: "text-gray-400 opacity-50",
                }}
                styles={{
                  caption: {
                    color: "#1D4ED8",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                  nav: { display: "flex", justifyContent: "space-between" },
                  head_cell: { color: "#374151", fontWeight: "bold" },
                  day: { color: "#111827", fontSize: "16px", padding: "5px" },
                  day_selected: {
                    backgroundColor: "#1D4ED8",
                    color: "white",
                    borderRadius: "8px",
                  },
                  day_today: {
                    backgroundColor: "#E5E7EB",
                    color: "#1D4ED8",
                    fontWeight: "bold",
                    borderRadius: "100%",
                  },
                }}
              />

              {selectedDate && (
                <div>
                  <h4 className="mt-4 font-medium text-black">
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
                            : "bg-gray-200 text-[#0e0e0e]"
                        } px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-600`}
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
