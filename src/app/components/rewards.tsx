import { useState } from "react";
import { motion } from "framer-motion";

export default function Rewards({ points }: { points: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxPoints = 200; // Set the max points threshold
  const percentage = (points / maxPoints) * 100;

  return (
    <div className="relative bg-gradient-to-r from-[#1c0336df] to-[#1c0336df] p-6 rounded-3xl shadow-lg w-full mx-auto text-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 md:max-h-[200px]">
      {/* Left Section - Balance Info */}
      <div className="relative z-10 p-3 text-center md:text-left flex-1 rounded-2xl overflow-hidden">
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
          <p className="text-sm text-gray-300 mt-2">
            {points < 200
              ? `You're almost there! Earn ${
                  200 - points
                } more points to get 10% off your next appointment.`
              : "Congratulations! You can now redeem your points."}
          </p>
        </div>
      </div>

      {/* Right Section - Rewards */}
      <div className="relative z-10 text-center flex-1 bg-[#3b2072] p-6 rounded-2xl shadow-md flex flex-col justify-center  overflow-hidden">
        <h3 className="text-2xl font-semibold tracking-wide text-[#FB3CB2]">
          Your Rewards
        </h3>
        <div className="relative inline-block mt-">
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
          disabled
          className="mt-2 px-4 py-1 md:w-[200px] mx-auto text-md bg-gray-400 text-gray-300 font-semibold rounded-full shadow-md opacity-50 cursor-not-allowed"
        >
          Redeem Points
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white text-[#1C0336] p-6 rounded-lg shadow-xl max-w-xs w-full text-center relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-[#1C0336] text-2xl font-bold hover:text-[#FB3CB2]"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold">Redeem Your Points</h3>
            <p className="text-gray-700 mt-2 text-sm">
              Your points can be redeemed for exclusive rewards, discounts, and
              special offers. Make the most of your loyalty!
            </p>
            <button className="mt-4 bg-[#FB3CB2] text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#E02A9F] focus:ring-4 focus:ring-[#FB3CB2]/50">
              Redeem Now
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
