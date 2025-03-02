"use client";
import { useResendVerificationToken } from "@/queries/authQuery";
import { ErrorResponse } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckInbox() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { mutate: resendVerificationToken, isLoading } =
    useResendVerificationToken();

  const handleResendVerificationToken = () => {
    if (!email) return;

    resendVerificationToken(
      { email },
      {
        onSuccess: (response) => {
          toast.success(response.message);
        },
        onError: (error: ErrorResponse) => {
          toast.error(error.response?.data?.message || "An error occurred");
        },
      }
    );
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex py-2 px-6 md:py-6 md:px-6 rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          {/* Braidz World Logo */}
          <div className="absolute top-6 md:left-6">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">B</span>
                </div>
                <span className="text-lg font-semibold text-black">
                  Braidzworld
                </span>
              </div>
            </Link>
          </div>
          <div className="mt-[6rem] md:mt-0">
            {/* Main Content */}
            <h2 className="text-3xl text-center text-[#0C1421] font-bold">
              Check your inbox
            </h2>
            <p className="text-[#313957] text-center mt-2">
              We’ve sent you a magic link at{" "}
              <span className="text-[#103FC1]">{email}</span>. Make sure to
              check your spam folder.
            </p>

            {/* Button */}
            <button
              type="button"
              className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
              onClick={() => (window.location.href = "/auth/signup")}
            >
              Back to Sign Up
            </button>

            {/* Resend Link */}
            <p className="text-[#313957] mt-6 text-center text-sm">
              Didn&apos;t see any email?{" "}
              {isLoading ? (
                <span className="inline-flex items-center text-[#103FC1] font-medium">
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
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
                  Resending...
                </span>
              ) : (
                <a
                  onClick={handleResendVerificationToken}
                  className="text-[#103FC1] font-medium cursor-pointer"
                >
                  Resend link
                </a>
              )}
            </p>

            <p className="text-gray-400 text-xs text-center mt-6">
              ©️ 2025 All Rights Reserved
            </p>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 hidden md:block  items-center justify-center p-4">
          <div className="relative  w-full h-full rounded-xl overflow-hidden">
            <Image
              src="/img/signup.png"
              alt="Barber shop"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
