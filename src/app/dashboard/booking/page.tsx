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
import { useRouter } from "next/navigation";

// Service data structure with durations
interface ServiceOption {
  id: string;
  name: string;
  duration: number; // Duration in hours
  category: string;
  price: string;
}

// Service options
const serviceOptions: ServiceOption[] = [
  { id: "small-knotless", name: "Small Knotless", duration: 8.5, category: "Knotless Braids", price: "$225.00" },
  { id: "medium-knotless", name: "Medium Knotless", duration: 5.5, category: "Knotless Braids", price: "$140.00" },
  { id: "large-knotless", name: "Large Knotless", duration: 3.5, category: "Knotless Braids", price: "$100.00" },
  { id: "cornrows-2-10", name: "2-10 Straight Cornrows", duration: 4.5, category: "Cornrows", price: "$130.00" },
  { id: "cornrows-12-16", name: "12-16 Straight Cornrows", duration: 4.5, category: "Cornrows", price: "$170.00" },
  { id: "cornrows-freestyle", name: "Freestyle Cornrows", duration: 6.5, category: "Cornrows", price: "$200.00" },
  { id: "small-locs", name: "Small Locs", duration: 6.5, category: "Invisible Locs", price: "$225.00" },
  { id: "smedium-locs", name: "Smedium Locs", duration: 5.5, category: "Invisible Locs", price: "$180.00" },
  { id: "short-twist", name: "Short Twist", duration: 7.5, category: "Senegalese Twists", price: "$200.00" },
  { id: "medium-twist", name: "Medium Twist", duration: 6, category: "Senegalese Twists", price: "$140.00" }
];

// Group services by category
const groupedServices = serviceOptions.reduce((acc, service) => {
  if (!acc[service.category]) {
    acc[service.category] = [];
  }
  acc[service.category].push(service);
  return acc;
}, {} as Record<string, ServiceOption[]>);

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<
    { date: string; time: string; userId: string; service?: string; duration?: number; occupiedHours?: string[] }[]
  >([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userBookedDates, setUserBookedDates] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const { setUser } = useApplicationContext();
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

  const handleSelectTime = (time: string) => {
    if (!selectedService) {
      toast.error("Please select a service first");
      return;
    }
    
    // Check if this time slot can accommodate the service duration
    const [hour] = time.split(':').map(Number);
    const endHour = hour + selectedService.duration;
    
    // Make sure the booking doesn't go beyond operating hours (9am-6pm)
    if (endHour > 18) {
      toast.error(`This service requires ${selectedService.duration} hours and would extend beyond our operating hours (6pm)`);
      return;
    }
    
    // Create an array of all hours this booking would occupy
    const requiredHours = [];
    for (let h = hour; h < endHour; h++) {
      requiredHours.push(`${Math.floor(h)}:00`);
    }
    
    // Check if all required hours are available
    const unavailableHours = requiredHours.filter(h => !availableSlots.includes(h));
    
    if (unavailableHours.length > 0) {
      toast.error(`This service requires ${selectedService.duration} hours, but some of these hours are already booked`);
      return;
    }
    
    setSelectedTime(time);
    setIsPaymentModalOpen(true);
  };

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await getAvailableSlots(date);
      setAvailableSlots(response.availableSlots);
      setBookedSlots(response.bookedSlots || []);
      setCurrentUserId(response.currentUserId);
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
      if (!selectedDate || !selectedTime || !selectedService) {
        toast.error("Please select a date, time, and service.");
        return;
      }
      
      const response = await createBooking({
        date: selectedDate,
        time: selectedTime,
        service: selectedService.name,
        duration: selectedService.duration
      });

      if (response.booking) {
        toast.success("Booking confirmed successfully!");
        setIsPaymentModalOpen(false);
        fetchAllBookedDates();

        const response = await getCurrentUser();
        if (response) {
          setUser(response);
        }
        
        // Reset selections
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedService(null);
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
      setUserBookedDates(response.userBookedDates || []);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
  };
  
  // Add useEffect to fetch all booked dates on component mount
  useEffect(() => {
    fetchAllBookedDates();
  }, []);

  useEffect(() => {
    // When a booking is successfully created, refresh the booked dates
    if (selectedDate === null && selectedTime === null) {
      fetchAllBookedDates();
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className="rounded-2xl">
      <div>
        <div
          className="relative bg-gray-900 text-white rounded-md overflow-hidden h-28 shadow-lg bg-cover bg-center"
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

        {/* Service Selection Section */}
        <div className="mt-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(groupedServices).map(([category, services]) => (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-medium mb-2 text-gray-700">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-3 border rounded-lg text-left transition ${
                        selectedService?.id === service.id
                          ? "border-purple-500 bg-purple-50 ring-2 ring-purple-500 shadow-md"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <div className="font-medium text-black">{service.name}</div>
                      <div className="text-sm text-gray-500">
                        {service.duration < 1 
                          ? `${Math.round(service.duration * 60)} min` 
                          : `${Math.floor(service.duration)} hr ${service.duration % 1 > 0 
                              ? `${Math.round((service.duration % 1) * 60)} min` 
                              : ""}`}
                      </div>
                      <div className="text-purple-700 font-semibold mt-1">{service.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between w-full my-4">
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-300"
            >
              <FiChevronLeft size={20} color="black" />
            </button>
            <h2 className="text-xl text-black font-semibold">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={handleNextMonth}
              title="Next Month"
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
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              // Check if the date has any bookings by this user
              const isUserBookedDate = userBookedDates.includes(dateKey);
              
              return (
                <button
                  key={dateKey}
                  onClick={() => handleDateSelect(dateKey)}
                  disabled={day < today}
                  title={`${format(day, "MMMM d, yyyy")}`}
                  className={`p-3 rounded-lg transition ${
                    !isSameMonth(day, currentMonth)
                      ? "text-gray-400"
                      : isToday(day)
                      ? "bg-blue-500 text-white"
                      : isUserBookedDate
                      ? "bg-green-500 text-white" // Green ONLY for current user's bookings
                      : "bg-white text-gray-500 hover:bg-gray-200" // No special color for dates with bookings by others
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
                {selectedService 
                  ? `Available times for ${selectedService.name} on ${format(new Date(selectedDate), "MMMM d, yyyy")}`
                  : `Select a service before choosing a time on ${format(new Date(selectedDate), "MMMM d, yyyy")}`
                }
              </h3>
              
              {!selectedService && (
                <p className="text-center text-red-500 mb-4">
                  Please select a service from the options above
                </p>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableSlots
                  .concat(
                    bookedSlots
                      .filter((booking) => booking.date === selectedDate)
                      .map((booking) => booking.time)
                  )
                  .map((slot, idx) => {
                    const bookedSlot = bookedSlots.find(
                      (booking) =>
                        booking.date === selectedDate && booking.time === slot
                    );
                    
                    const isBookedTime = !!bookedSlot;
                    const isBookedByCurrentUser = isBookedTime && bookedSlot?.userId === currentUserId;
                    
                    // Disable button if service is selected and the duration would go beyond business hours
                    let isDisabledDueToHours = false;
                    let durationWarning = '';
                    
                    if (selectedService) {
                      const [hour] = slot.split(':').map(Number);
                      const endHour = hour + selectedService.duration;
                      
                      // Check if booking would go beyond operating hours
                      if (endHour > 18) {
                        isDisabledDueToHours = true;
                        durationWarning = 'Service would exceed operating hours';
                      } else {
                        // Check if all required hours are available
                        const requiredHours = [];
                        for (let h = hour; h < endHour; h++) {
                          requiredHours.push(`${Math.floor(h)}:00`);
                        }
                        
                        // Check for conflicts with existing bookings
                        const unavailableHours = requiredHours.filter(h => {
                          return !availableSlots.includes(h) && h !== slot;
                        });
                        
                        if (unavailableHours.length > 0) {
                          isDisabledDueToHours = true;
                          durationWarning = 'Overlaps with existing bookings';
                        }
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          isBookedTime || isDisabledDueToHours ? null : handleSelectTime(slot)
                        }
                        title={`${slot} ${isBookedTime ? (isBookedByCurrentUser
                          ? "- You booked this slot" 
                          : "- Already booked") : isDisabledDueToHours 
                            ? `- ${durationWarning}` 
                            : "- Available"}`}
                        className={`transition-all duration-200 transform ${
                          isBookedTime
                            ? isBookedByCurrentUser
                              ? "bg-blue-500 text-white cursor-not-allowed" // Blue for current user's bookings
                              : "bg-gray-500 text-white cursor-not-allowed" // Gray for others' bookings
                            : isDisabledDueToHours
                              ? "bg-yellow-100 text-yellow-800 cursor-not-allowed" // Yellow for duration issues
                              : "bg-gradient-to-r from-green-200 to-green-300 text-black"
                        } py-3 px-6 rounded-lg shadow-lg text-lg font-medium ${
                          isBookedTime || isDisabledDueToHours
                            ? ""
                            : "hover:scale-105 hover:shadow-xl hover:from-green-500 hover:to-green-600"
                        } focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50`}
                      >
                        {slot} 
                        {isBookedTime 
                          ? (isBookedByCurrentUser ? " (BOOKED)" : " (Unavailable)")
                          : isDisabledDueToHours
                            ? ` (${durationWarning})`
                            : ""
                        }
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
            className="fixed inset-0 z-50 flex items-center backdrop-blur-[2px] justify-center"
          >
            <div className="fixed inset-0 bg-gray-500 opacity-50" />
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
              <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Confirm Booking
              </Dialog.Title>
              
              {selectedService && (
                <div className="mb-6 bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">{selectedService.name}</h3>
                  <p className="text-sm text-gray-600">
                    Duration: {selectedService.duration < 1 
                      ? `${Math.round(selectedService.duration * 60)} minutes` 
                      : `${Math.floor(selectedService.duration)} hour${Math.floor(selectedService.duration) > 1 ? 's' : ''}${
                          selectedService.duration % 1 > 0 
                            ? ` ${Math.round((selectedService.duration % 1) * 60)} minutes` 
                            : ""
                        }`}
                  </p>
                  <p className="text-purple-700 font-semibold">{selectedService.price}</p>
                  <p className="mt-2 text-sm text-gray-700">
                    Time: {selectedTime} - {
                      selectedTime && (() => {
                        const [hour] = selectedTime.split(':').map(Number);
                        const endHour = Math.floor(hour + selectedService.duration);
                        const endMinutes = Math.round((selectedService.duration % 1) * 60);
                        return `${endHour}:${endMinutes > 0 ? endMinutes : '00'}`;
                      })()
                    }
                  </p>
                  <p className="text-sm text-gray-700">
                    Date: {selectedDate && format(new Date(selectedDate), "MMMM d, yyyy")}
                  </p>
                </div>
              )}
              
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
