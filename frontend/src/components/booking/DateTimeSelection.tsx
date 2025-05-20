import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";

// Define types
interface Service {
    id: string;
    name: string;
    duration: number; // in minutes
}

interface TimeSlot {
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

interface DateTimeSelectionProps {
    selectedService: Service;
    onSelectDateTime: (date: Date, startTime: string, endTime: string) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
    selectedService,
    onSelectDateTime,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

    // Generate available dates (next 30 days)
    useEffect(() => {
        const dates: Date[] = [];
        const today = new Date();
        for (let i = 1; i <= 30; i++) {
            dates.push(addDays(today, i));
        }
        setAvailableDates(dates);
    }, []);

    // Fetch time slots when date is selected
    const { data: slots, isLoading } = useQuery<TimeSlot[]>(
        ["timeSlots", selectedDate, selectedService?.duration],
        async () => {
            if (!selectedDate || !selectedService?.duration) return [];
            const response = await fetch(
                `/api/bookings/available-slots?date=${selectedDate.toISOString()}&duration=${
                    selectedService.duration
                }`
            );
            return response.json();
        },
        {
            enabled: !!selectedDate && !!selectedService?.duration,
        }
    );

    useEffect(() => {
        if (slots) {
            setTimeSlots(slots);
        }
    }, [slots]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (startTime: string, endTime: string) => {
        if (selectedDate) {
            onSelectDateTime(selectedDate, startTime, endTime);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                    {availableDates.map((date) => (
                        <button
                            key={date.toISOString()}
                            onClick={() => handleDateSelect(date)}
                            className={`p-2 rounded-lg ${
                                selectedDate?.toDateString() ===
                                date.toDateString()
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                            {format(date, "MMM d")}
                        </button>
                    ))}
                </div>
            </div>

            {selectedDate && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Available Time Slots
                    </h3>
                    {isLoading ? (
                        <div>Loading time slots...</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((slot) => (
                                <button
                                    key={`${slot.startTime}-${slot.endTime}`}
                                    onClick={() =>
                                        handleTimeSelect(
                                            slot.startTime,
                                            slot.endTime
                                        )
                                    }
                                    className={`p-3 rounded-lg ${
                                        slot.isAvailable
                                            ? "bg-green-100 hover:bg-green-200"
                                            : "bg-red-100 cursor-not-allowed"
                                    }`}
                                    disabled={!slot.isAvailable}
                                >
                                    {slot.startTime} - {slot.endTime}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DateTimeSelection;
