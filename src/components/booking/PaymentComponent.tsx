import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormProps {
    onSuccess: () => void;
    onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
    onSuccess,
    onError,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/booking/success`,
                },
            });

            if (error) {
                onError(error.message || "An error occurred during payment");
            } else {
                onSuccess();
            }
        } catch {
            onError("An unexpected error occurred");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-50"
            >
                {isProcessing ? "Processing..." : "Pay $25.00 CAD Deposit"}
            </button>
        </form>
    );
};

interface PaymentComponentProps {
    bookingDetails: {
        service: string;
        style: string;
        duration: string;
        price: string;
        date: Date;
        startTime: string;
        endTime: string;
    };
    onSuccess: () => void;
    onError: (error: string) => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
    bookingDetails,
    onSuccess,
    onError,
}) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch("/api/bookings/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...bookingDetails,
                        userId: "current-user-id", // Replace with actual user ID
                    }),
                });

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch {
                onError("Failed to create payment intent");
            }
        };

        createPaymentIntent();
    }, [bookingDetails, onError]);

    if (!clientSecret) {
        return <div>Loading payment form...</div>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onSuccess={onSuccess} onError={onError} />
        </Elements>
    );
};

export default PaymentComponent;
