"use client";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function CheckInbox() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const resendVerificationMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axios.post(
        `${API_URL}/auth/resend-verification`,
        data
      );
      return response.data;
    },
  });

  const handleResendVerificationToken = () => {
    if (!email) return;

    resendVerificationMutation.mutate(
      { email },
      {
        onSuccess: (response) => {
          toast.success(response.message);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "An error occurred");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <FaEnvelope className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your inbox
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We have sent you an email with instructions to verify your account.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleResendVerificationToken}
            disabled={resendVerificationMutation.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {resendVerificationMutation.isPending
              ? "Sending..."
              : "Resend verification email"}
          </button>
          <div className="text-center">
            <RouterLink
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Return to login
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
