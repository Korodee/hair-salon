"use client";

import { useState, useEffect, useMemo } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    startOfWeek,
    addDays,
    isSameMonth,
    isToday,
    isSameDay,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import Image from "next/image";
import { createBooking, getAllBookedDates } from "@/utils/bookingApi";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

// Service interfaces
interface ServiceStyle {
    style: string;
    duration: string;
    price: string;
}

interface Service {
    icon: string;
    title: string;
    details?: ServiceStyle[];
    variations?: {
        short: ServiceStyle[];
        long: ServiceStyle[];
    };
}

interface BookingStep {
    id: "service" | "style" | "variation" | "date" | "time" | "payment";
    title: string;
}

interface SelectedServiceDetails {
    title: string;
    style?: string;
    variation?: "short" | "long";
    duration: number;
    price: string;
}

interface SessionUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: string;
}

const bookingSteps: BookingStep[] = [
    { id: "service", title: "Choose Service" },
    { id: "style", title: "Choose Style" },
    { id: "variation", title: "Choose Length" },
    { id: "date", title: "Select Date" },
    { id: "time", title: "Select Time" },
    { id: "payment", title: "Payment" },
];

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Services data
const servicesData: Service[] = [
    {
        icon: "/img/twists.png",
        title: "Twists",
        details: [
            {
                style: "Small Twists",
                duration: "8 heures",
                price: "$250.00 CAD",
            },
            {
                style: "Medium Twists",
                duration: "6 heures",
                price: "$200.00 CAD",
            },
            {
                style: "Large Twists",
                duration: "4 heures",
                price: "$150.00 CAD",
            },
        ],
    },
    {
        icon: "/img/cornrows.png",
        title: "Cornrows",
        details: [
            {
                style: "2-10 Straight Cornrows",
                duration: "4 heures 30 minutes",
                price: "$130.00 CAD",
            },
            {
                style: "12-16 Straight Cornrows",
                duration: "4 heures 30 minutes",
                price: "$170.00 CAD",
            },
            {
                style: "Freestyle Cornrows",
                duration: "6 heures 30 minutes",
                price: "$200.00 CAD",
            },
        ],
    },
    {
        icon: "/img/invicible-locs.png",
        title: "Invisible Locs",
        details: [
            {
                style: "Small Locs",
                duration: "6 heures 30 minutes",
                price: "$225.00 CAD",
            },
            {
                style: "Smedium Locs",
                duration: "5 heures 30 minutes",
                price: "$180.00 CAD",
            },
        ],
    },
    {
        icon: "/img/knotless-braids.png",
        title: "Knotless Braids",
        variations: {
            short: [
                {
                    style: "X Small Knotless",
                    duration: "12 heures",
                    price: "$350.00 CAD",
                },
                {
                    style: "Small Knotless",
                    duration: "8 heures 30 minutes",
                    price: "$225.00 CAD",
                },
                {
                    style: "SMedium Knotless",
                    duration: "6 heures 30 minutes",
                    price: "$180.00 CAD",
                },
                {
                    style: "Medium Knotless",
                    duration: "5 heures 30 minutes",
                    price: "$140.00 CAD",
                },
                {
                    style: "Large Knotless",
                    duration: "3 heures 30 minutes",
                    price: "$100.00 CAD",
                },
            ],
            long: [
                {
                    style: "X Small knotless",
                    duration: "15 heures",
                    price: "$450.00 CAD",
                },
                {
                    style: "Small Knotless",
                    duration: "10 heures",
                    price: "$350.00 CAD",
                },
                {
                    style: "SMedium Knotless",
                    duration: "7 heures 30 minutes",
                    price: "$230.00 CAD",
                },
                {
                    style: "Medium Knotless",
                    duration: "6 heures 30 minutes",
                    price: "$190.00 CAD",
                },
                {
                    style: "Large Knotless",
                    duration: "4 heures 30 minutes",
                    price: "$160.00 CAD",
                },
            ],
        },
    },
    {
        icon: "/img/sen-twists.png",
        title: "Senegalese Twists",
        variations: {
            short: [
                {
                    style: "Short Twist",
                    duration: "7 heures 30 minutes",
                    price: "$200.00 CAD",
                },
                {
                    style: "Smedium Twist",
                    duration: "6 heures 30 minutes",
                    price: "$180.00 CAD",
                },
                {
                    style: "Medium Twist",
                    duration: "6 heures",
                    price: "$140.00 CAD",
                },
                {
                    style: "Large Twist",
                    duration: "4 heures 30 minutes",
                    price: "$100.00 CAD",
                },
            ],
            long: [
                {
                    style: "Small Twist",
                    duration: "9 heures",
                    price: "$300.00 CAD",
                },
                {
                    style: "Smedium Twist",
                    duration: "7 heures 30 minutes",
                    price: "$225.00 CAD",
                },
                {
                    style: "Medium Twist",
                    duration: "5 heures 30 minutes",
                    price: "$190.00 CAD",
                },
                {
                    style: "Large Twist",
                    duration: "4 heures 30 minutes",
                    price: "$140.00 CAD",
                },
            ],
        },
    },
    {
        icon: "/img/fulani-braids.png",
        title: "Fulani Braids",
        variations: {
            short: [
                {
                    style: "Flip Over Braids",
                    duration: "7 heures",
                    price: "$200.00 CAD",
                },
                {
                    style: "Freestyle Braids",
                    duration: "6 heures",
                    price: "$190.00 CAD",
                },
                {
                    style: "Basic Fulani Style",
                    duration: "6 heures",
                    price: "$150.00 CAD",
                },
            ],
            long: [
                {
                    style: "Flip Over Braids",
                    duration: "8 heures 30 minutes",
                    price: "$250.00 CAD",
                },
                {
                    style: "Freestyle Braids",
                    duration: "7 heures 30 minutes",
                    price: "$230.00 CAD",
                },
                {
                    style: "Basic Fulani Style",
                    duration: "7 heures 30 minutes",
                    price: "$200.00 CAD",
                },
            ],
        },
    },
    {
        icon: "/img/fake-locs.png",
        title: "Faux Locs",
        details: [
            {
                style: "Smedium Locs",
                duration: "4 heures 30 minutes",
                price: "$180.00 CAD",
            },
            {
                style: "Medium Locs",
                duration: "4 heures",
                price: "$160.00 CAD",
            },
            {
                style: "Large Locs",
                duration: "3 heures 30 minutes",
                price: "$140.00 CAD",
            },
        ],
    },
    {
        icon: "/img/service1.jpg",
        title: "Men's Hair",
        details: [
            {
                style: "Small Twist",
                duration: "2 heures",
                price: "70.00 CAD",
            },
            {
                style: "Medium Twist",
                duration: "1 heure 45 minutes",
                price: "60.00 CAD",
            },
            {
                style: "Large Twist",
                duration: "1 heure",
                price: "50.00 CAD",
            },
            {
                style: "Small Braids",
                duration: "2 heures 30 minutes",
                price: "70.00 CAD",
            },
            {
                style: "Medium Braids",
                duration: "1 heure 45 minutes",
                price: "60.00 CAD",
            },
            {
                style: "Large Braids",
                duration: "1 heure",
                price: "50.00 CAD",
            },
            {
                style: "2-12 Cornrows",
                duration: "1 heure 45 minutes",
                price: "50.00 CAD",
            },
            {
                style: "14-20 Cornrows",
                duration: "2 heures",
                price: "60.00 CAD",
            },
            {
                style: "Retwist Comb",
                duration: "2 heures",
                price: "75.00 CAD",
            },
            {
                style: "Retwist Interlock",
                duration: "2 heures 30 minutes",
                price: "95.00 CAD",
            },
            {
                style: "Retwist Freeform",
                duration: "3 heures",
                price: "190.00 CAD",
            },
            {
                style: "Starter Locs",
                duration: "3 heures 30 minutes",
                price: "85.00 CAD",
            },
        ],
    },
];

export default function BookingPage() {
    const { data: session } = useSession() as {
        data: { user: SessionUser } | null;
    };
    const [currentStep, setCurrentStep] =
        useState<BookingStep["id"]>("service");
    const [selectedService, setSelectedService] = useState<Service | null>(
        null
    );
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedVariation, setSelectedVariation] = useState<
        "short" | "long" | undefined
    >(undefined);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [finalServiceDetails, setFinalServiceDetails] =
        useState<SelectedServiceDetails | null>(null);
    const [bookedDates, setBookedDates] = useState<string[]>([]);

    // Hardcoded time slots from 9 AM to 6 PM in 30-minute intervals
    const hardcodedTimeSlots = useMemo(
        () => [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
        ],
        []
    );

    useEffect(() => {
        // logic using hardcodedTimeSlots
    }, [hardcodedTimeSlots]);

    // Generate available dates for the next 30 days, excluding booked dates
    const availableDates = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const date = addDays(new Date(), i);
            return format(date, "yyyy-MM-dd");
        }).filter((date) => !bookedDates.includes(date));
    }, [bookedDates]);

    // Fetch booked dates on component mount
    useEffect(() => {
        const fetchBookedDates = async () => {
            if (session?.user?.token) {
                try {
                    const data = await getAllBookedDates(session.user.token);
                    setBookedDates(data.bookedDates);
                } catch (error) {
                    console.error("Error fetching booked dates:", error);
                    toast.error("Failed to load booked dates");
                }
            }
        };
        fetchBookedDates();
    }, [session]);

    useEffect(() => {
        if (selectedDate) {
            setSelectedTime(hardcodedTimeSlots[0]);
            setIsLoading(false);
        }
    }, [selectedDate, hardcodedTimeSlots]); // Add 'hardcodedTimeSlots' as a dependency

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        if (service.variations) {
            setCurrentStep("variation");
        } else if (service.details) {
            setCurrentStep("style");
        } else {
            setCurrentStep("date");
        }
    };

    const handleVariationSelect = (type: "short" | "long") => {
        setSelectedVariation(type);
        setCurrentStep("style");
    };

    const handleStyleSelect = (styleDetails: ServiceStyle) => {
        setSelectedStyle(styleDetails.style);
        const durationInMinutes = parseDuration(styleDetails.duration);
        setFinalServiceDetails({
            title: selectedService!.title,
            style: styleDetails.style,
            variation: selectedVariation,
            duration: durationInMinutes,
            price: styleDetails.price,
        });
        setCurrentStep("date");
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentStep("time");
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    // Helper function to parse duration string to minutes
    const parseDuration = (durationStr: string): number => {
        const hours = durationStr.match(/(\d+)\s*heures?/);
        const minutes = durationStr.match(/(\d+)\s*minutes?/);
        return (
            (hours ? parseInt(hours[1]) * 60 : 0) +
            (minutes ? parseInt(minutes[1]) : 0)
        );
    };

    const handlePayment = async () => {
        if (!session?.user?.token) {
            toast.error("Please sign in to make a booking");
            return;
        }

        if (!selectedDate || !selectedTime || !finalServiceDetails) {
            toast.error("Please complete all booking details");
            return;
        }

        setIsLoading(true);
        try {
            // Create the booking first
            const { bookingId } = await createBooking(
                {
                    date: format(selectedDate, "yyyy-MM-dd"),
                    time: selectedTime,
                    service: finalServiceDetails.title,
                    duration: finalServiceDetails.duration / 60, // Convert to hours
                    style: finalServiceDetails.style,
                    variation: selectedVariation,
                },
                session.user.token
            );

            // Then proceed with Stripe payment
            const stripe = await stripePromise;
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service: finalServiceDetails.title,
                    date: format(selectedDate, "yyyy-MM-dd"),
                    time: selectedTime,
                    deposit: 2500, // $25.00 in cents
                    bookingId,
                }),
            });

            const stripeSession = await response.json();

            if (stripeSession.error) {
                throw new Error(stripeSession.error);
            }

            const result = await stripe?.redirectToCheckout({
                sessionId: stripeSession.id,
            });

            if (result?.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to process booking. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        switch (currentStep) {
            case "style":
                if (selectedService?.variations) {
                    setCurrentStep("variation");
                } else {
                    setCurrentStep("service");
                }
                break;
            case "variation":
                setCurrentStep("service");
                break;
            case "date":
                if (selectedService?.variations) {
                    setCurrentStep("style");
                } else if (selectedService?.details) {
                    setCurrentStep("style");
                } else {
                    setCurrentStep("service");
                }
                break;
            case "time":
                setCurrentStep("date");
                break;
            case "payment":
                setCurrentStep("time");
                break;
            default:
                break;
        }
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Book Your Appointment
                    </h1>
                    <p className="mt-3 text-lg text-gray-600">
                        Choose your preferred service and time
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        {bookingSteps
                            .filter(
                                (step) =>
                                    (selectedService?.variations ||
                                        step.id !== "variation") &&
                                    (selectedService?.details ||
                                        selectedService?.variations ||
                                        step.id !== "style")
                            )
                            .map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    className={`flex items-center ${
                                        index !== 0 ? "flex-1" : ""
                                    }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            currentStep === step.id
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                                : "bg-white text-gray-400 shadow-sm"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div
                                        className={`ml-3 text-sm font-medium ${
                                            currentStep === step.id
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {step.title}
                                    </div>
                                    {index < bookingSteps.length - 1 && (
                                        <div
                                            className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                                                currentStep === step.id
                                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                                                    : "bg-gray-200"
                                            }`}
                                        ></div>
                                    )}
                                </motion.div>
                            ))}
                    </div>
                </div>

                {/* Back Button */}
                {currentStep !== "service" && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBack}
                        className="mb-8 flex items-center space-x-2 px-4 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-gray-900 border border-gray-100 hover:border-gray-200"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </motion.button>
                )}

                {/* Service Selection */}
                {currentStep === "service" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {servicesData.map((service) => (
                            <motion.div
                                key={service.title}
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl ${
                                    selectedService?.title === service.title
                                        ? "ring-2 ring-purple-500 shadow-lg"
                                        : "hover:shadow-md"
                                }`}
                                onClick={() => handleServiceSelect(service)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                                        <Image
                                            src={service.icon}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {service.variations
                                                ? "Multiple lengths available"
                                                : service.details
                                                ? `${service.details.length} styles available`
                                                : "Basic service"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Variation Selection */}
                {currentStep === "variation" && selectedService?.variations && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {["short", "long"].map((type) => (
                            <motion.div
                                key={type}
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl ${
                                    selectedVariation === type
                                        ? "ring-2 ring-purple-500 shadow-lg"
                                        : "hover:shadow-md"
                                }`}
                                onClick={() =>
                                    handleVariationSelect(
                                        type as "short" | "long"
                                    )
                                }
                            >
                                <h3 className="text-2xl font-bold text-gray-900 capitalize mb-3">
                                    {type} Length
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    {type === "short"
                                        ? "Shoulder length or above"
                                        : "Below shoulder length"}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Style Selection */}
                {currentStep === "style" && selectedService && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {(selectedService.variations
                            ? selectedService.variations[selectedVariation!]
                            : selectedService.details
                        )?.map((style, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl ${
                                    selectedStyle === style.style
                                        ? "ring-2 ring-purple-500 shadow-lg"
                                        : "hover:shadow-md"
                                }`}
                                onClick={() => handleStyleSelect(style)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {style.style}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {style.duration}
                                        </p>
                                    </div>
                                    <span className="text-xl font-bold text-purple-600">
                                        {style.price}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Date Selection */}
                {currentStep === "date" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Select a Date
                            </h3>
                            <div className="flex items-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={prevMonth}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <FiChevronLeft className="w-6 h-6 text-gray-600" />
                                </motion.button>
                                <span className="text-xl font-semibold text-gray-900">
                                    {format(currentMonth, "MMMM yyyy")}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={nextMonth}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <FiChevronRight className="w-6 h-6 text-gray-600" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day) => (
                                <div
                                    key={day}
                                    className="text-center text-sm font-medium text-gray-500 py-2"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 42 }, (_, i) => {
                                const startOfMonthDate =
                                    startOfMonth(currentMonth);
                                const startWeek = startOfWeek(startOfMonthDate);
                                const day = addDays(startWeek, i);
                                const isCurrentMonth = isSameMonth(
                                    day,
                                    currentMonth
                                );
                                const isSelected = selectedDate
                                    ? isSameDay(day, selectedDate)
                                    : false;
                                const isTodays = isToday(day);
                                const isAvailable = availableDates.some(
                                    (date) => isSameDay(date, day)
                                );

                                return (
                                    <motion.div
                                        key={day.toISOString()}
                                        whileHover={{
                                            scale:
                                                isAvailable && isCurrentMonth
                                                    ? 1.1
                                                    : 1,
                                        }}
                                        whileTap={{
                                            scale:
                                                isAvailable && isCurrentMonth
                                                    ? 0.95
                                                    : 1,
                                        }}
                                        className={`
                      p-3 text-center rounded-xl cursor-pointer transition-all duration-300
                      ${!isCurrentMonth ? "text-gray-300" : "text-gray-900"}
                      ${
                          isSelected
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                              : ""
                      }
                      ${isTodays ? "ring-2 ring-purple-500" : ""}
                      ${
                          isAvailable && isCurrentMonth
                              ? "hover:bg-purple-50"
                              : "cursor-not-allowed opacity-50"
                      }
                    `}
                                        onClick={() =>
                                            isAvailable &&
                                            isCurrentMonth &&
                                            handleDateSelect(day)
                                        }
                                    >
                                        <span className="text-sm font-medium">
                                            {format(day, "d")}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                <span>Unavailable</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 ring-2 ring-purple-500 rounded-full"></div>
                                <span>Today</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Time Selection */}
                {currentStep === "time" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Select a Time
                            </h3>
                            <p className="mt-2 text-lg text-gray-600">
                                {selectedDate &&
                                    `Selected date: ${format(
                                        selectedDate,
                                        "EEEE, MMMM d, yyyy"
                                    )}`}
                            </p>
                            {finalServiceDetails && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Duration:{" "}
                                    {Math.floor(
                                        finalServiceDetails.duration / 60
                                    )}
                                    h {finalServiceDetails.duration % 60}min
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hardcodedTimeSlots.map((time) => (
                                <motion.div
                                    key={time}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-4 text-center rounded-xl cursor-pointer transition-all duration-300 ${
                                        selectedTime === time
                                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                            : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-100"
                                    }`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    <span className="text-lg font-medium">
                                        {time}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-xl text-lg font-medium ${
                                    selectedTime
                                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() =>
                                    selectedTime && setCurrentStep("payment")
                                }
                                disabled={!selectedTime}
                            >
                                Continue to Payment
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Booking Summary
                            </h3>
                            <p className="mt-2 text-lg text-gray-600">
                                Please review your booking details
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-lg">
                                        Service:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-lg">
                                        {finalServiceDetails?.title}
                                        {finalServiceDetails?.style &&
                                            ` - ${finalServiceDetails.style}`}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-lg">
                                        Date & Time:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-lg">
                                        {selectedDate &&
                                            format(
                                                selectedDate,
                                                "EEEE, MMMM d, yyyy"
                                            )}{" "}
                                        at {selectedTime}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-lg">
                                        Duration:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-lg">
                                        {finalServiceDetails &&
                                            `${Math.floor(
                                                finalServiceDetails.duration /
                                                    60
                                            )}h ${
                                                finalServiceDetails.duration %
                                                60
                                            }min`}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-lg">
                                        Total Price:
                                    </span>
                                    <span className="font-semibold text-gray-900 text-lg">
                                        {finalServiceDetails?.price}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-600 text-lg">
                                        Deposit Required:
                                    </span>
                                    <span className="font-semibold text-purple-600 text-lg">
                                        $25.00 CAD
                                    </span>
                                </div>
                                <p className="text-sm text-purple-500 mt-2">
                                    A deposit is required to secure your
                                    booking. The remaining balance will be paid
                                    at the appointment.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="px-8 py-4 rounded-xl text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        Processing...
                                        <svg
                                            className="animate-spin ml-2 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    </span>
                                ) : (
                                    "Pay Deposit ($25.00 CAD)"
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
