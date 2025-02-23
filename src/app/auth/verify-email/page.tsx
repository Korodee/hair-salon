"use client";
import { useVerifyEmail } from "@/queries/authQuery";
import { ErrorResponse } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerified, setIsVerified] = useState(false);
  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(
        { token },
        {
          onSuccess: (response) => {
            toast.success(response.message);
            setIsVerified(true);
          },
          onError: (error: ErrorResponse) => {
            toast.error(error.response?.data?.message || "An error occurred");
          },
        }
      );
    }
  }, [token, verifyEmail]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex py-2 px-6 md:py-6 md:px-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          <div className="absolute top-8 md:left-6 transform md:-translate-x-1/2 md:transform-none">
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
            <h2 className="text-3xl text-center text-[#0C1421] font-bold">
              {isVerified ? "Email Verified!" : "Verifying Email..."}
            </h2>
            <p className="text-[#313957] text-center mt-2">
              {isVerified
                ? "Your email has been successfully verified. You can now login to your account."
                : "Please wait while we verify your email address."}
            </p>

            {isVerified && (
              <Link
                href="/auth/login"
                className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition block text-center"
              >
                Go to Login
              </Link>
            )}

            <p className="text-gray-400 text-xs text-center mt-6">
              ©️ 2025 All Rights Reserved
            </p>
          </div>
        </div>

        <div className="w-1/2 hidden md:block items-center justify-center p-4">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
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
};

export default VerifyEmail;
