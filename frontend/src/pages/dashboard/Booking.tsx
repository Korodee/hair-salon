"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { createBooking } from "../../services/bookingServices";

const servicesData = [
  { title: "Haircut", price: "$30" },
  { title: "Hair Coloring", price: "$80" },
  { title: "Hair Styling", price: "$50" },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export default function Booking() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = async () => {
    try {
      const response = await createBooking({
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      });

      if (response.success) {
        toast.success("Booking created successfully!");
        navigate("/dashboard/history");
      }
    } catch {
      toast.error("Failed to create booking");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Service</h2>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a service</option>
            {servicesData.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title} - {service.price}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBooking}
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold"
          disabled={!selectedService || !selectedDate || !selectedTime}
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
}
