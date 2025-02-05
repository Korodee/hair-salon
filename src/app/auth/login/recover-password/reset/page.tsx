import Image from "next/image";

export default function RecoverPassword() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex p-6 rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          {/* Korode Salon Logo */}
          <div className="absolute top-8 md:left-6 transform md:-translate-x-1/2 md:transform-none">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <span className="text-lg font-semibold text-black">
                Korode Salon
              </span>
            </div>
          </div>
          <div className="mt-[6rem] md:mt-0">
            <h2 className="text-3xl text-[#0C1421] font-bold">
              Recover Password
            </h2>
            <p className="text-[#313957] mt-2">
              Enter your new password and confirm
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="block text-[#0C1421]"> New password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-none"
                />
              </div>

              <div>
                <label className="block text-[#0C1421]">Confirm password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
              >
                Reset Password
              </button>
            </form>

            <p className="text-[#313957] mt-6 text-center text-sm">
              Remember your password?{" "}
              <a href="/auth/login" className="text-[#103FC1] font-medium">
                Back to login
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
