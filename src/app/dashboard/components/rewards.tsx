import { useState } from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";

export default function Rewards({ points }: { points: number }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const maxPoints = 200;
  const percentage = (points / maxPoints) * 100;

  return (
    <div className="relative bg-gradient-to-r from-[#1c0336df] to-[#1c0336df] p-6 rounded-3xl shadow-lg w-full mx-auto text-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 md:max-h-[200px]">
      {/* Left Section - Balance Info */}
      <div className="relative z-10 p-3 text-center md:text-left flex-1 rounded-2xl overflow-hidden">
        {/* Info Icon */}
        <div
          className="absolute top-0 left-1 z-20 cursor-pointer text-gray-300 hover:text-white transition-all duration-200 ease-in-out"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FiInfo size={20} />
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-6 left-0 bg-gradient-to-br from-[#5F0A87] to-[#A4508B] text-white text-[13px] p-3 rounded-lg shadow-lg w-[14.5rem]"
            >
              Earn points by engaging, booking, and more! Redeem for rewards
              plus 10% off your next service. Confirmation email sent instantly!
            </motion.div>
          )}
        </div>
        <h3 className="text-xl text-center font-semibold text-[#FB3CB2]">
          Point Balance
        </h3>
        <div className="w-full max-w-xs mx-auto">
          <div className="text-center mb-2">
            <p className="text-lg text-white/70 font-bold">{points} pts</p>
          </div>
          <div className="relative w-full h-3 bg-[#3b2072] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#FB3CB2] rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[12px] text-gray-300 mt-2">
            {points < 200
              ? `You're almost there! Earn ${
                  200 - points
                } more points to get 10% off your next appointment.`
              : "Congratulations! You can now redeem your points."}
          </p>
        </div>
      </div>

      {/* Right Section - Rewards */}
      <div className="relative z-10 text-center flex-1 bg-[#3b2072] p-6 rounded-2xl shadow-md flex flex-col justify-center overflow-hidden">
        <h3 className="text-2xl font-semibold tracking-wide text-[#FB3CB2]">
          Your Rewards
        </h3>
        <div className="relative py-2 inline-block">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -inset-0.5 bg-gradient-to-r from-[#3f283650] to-[#E02A9F] blur-xl rounded-full"
          />
          <span className="relative inline-block px-6 py-2 bg-[#1c0336a8] text-[#FB3CB2] font-bold text-md rounded-full shadow-inner">
            10% OFF
          </span>
        </div>
        <button
          disabled={points < 200}
          className={`mt-2 px-4 py-1 md:w-[180px] mx-auto text-md font-semibold rounded-full shadow-md ${
            points < 200
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-300 "
              : "opacity-100 cursor-pointer bg-gradient-to-r from-[#FB3CB2] to-[#A4508B]"
          }`}
        >
          {points < 200 ? "Earn more points" : "Redeem Points"}
        </button>
      </div>
    </div>
  );
}
