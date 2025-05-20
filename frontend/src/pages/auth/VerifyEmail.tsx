"use client";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const verifyEmailMutation = useMutation({
    mutationFn: async (data: { token: string }) => {
      const response = await axios.post(`${API_URL}/auth/verify-email`, data);
      return response.data;
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification token");
      navigate("/login");
      return;
    }

    verifyEmailMutation.mutate(
      { token },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Email verified successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Failed to verify email"
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
      }
    );
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            {verifyEmailMutation.isPending ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            ) : verifyEmailMutation.isSuccess ? (
              <FaCheckCircle className="h-12 w-12 text-green-600" />
            ) : verifyEmailMutation.isError ? (
              <FaTimesCircle className="h-12 w-12 text-red-600" />
            ) : null}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {verifyEmailMutation.isPending
              ? "Verifying your email..."
              : verifyEmailMutation.isSuccess
              ? "Email Verified!"
              : "Verification Failed"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {verifyEmailMutation.isPending
              ? "Please wait while we verify your email address."
              : verifyEmailMutation.isSuccess
              ? "Your email has been successfully verified. You will be redirected to login."
              : "There was an error verifying your email. You will be redirected to login."}
          </p>
        </div>
      </div>
    </div>
  );
}
