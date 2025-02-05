"use client";
import Image from "next/image";
import Link from "next/link";

export default function RecoverPassword() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/auth/login/recover-password/reset";
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex p-6 rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          {/* Korode Salon Logo */}
          <div className="absolute top-8 md:left-6 transform md:-translate-x-1/2 md:transform-none">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">K</span>
                </div>
                <span className="text-lg font-semibold text-black">
                  Korode Salon
                </span>
              </div>
            </Link>
          </div>
          <div className="mt-[6rem] md:mt-0">
            <h2 className="text-3xl text-[#0C1421] font-bold">
              Recover Password
            </h2>
            <p className="text-[#313957] mt-2">
              Enter the email address associated with your account.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#0C1421]">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
              >
                Send Verification Link
              </button>
            </form>

            <p className="text-[#313957] mt-6 text-center text-sm">
              Didn&apos;t see any email?{" "}
              <a
                href="/auth/resend-link"
                className="text-[#103FC1] font-medium"
              >
                Resend link
              </a>
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
              src="/img/login.png"
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
