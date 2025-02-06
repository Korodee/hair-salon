import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react"; // Importing the Info icon

export default function Rewards({ points }: { points: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const progress = Math.min((points / 200) * 100, 100); // Assuming 200 points is the goal

  return (
    <div className="relative md:h-[200px] bg-gradient-to-r from-[#1c0336df] to-[#1c0336df] p-6 rounded-3xl shadow-lg w-full mx-auto text-white space-y-4">
      <div className="relative z-10 text-center space-y-2 h-full flex flex-col justify-center mt-0">
        {/* Info Icon with Tooltip */}
        <div
          className="absolute top-2 right-2 text-white cursor-pointer text-xl"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <Info className="w-6 h-6" />
          {/* Tooltip with animation */}
          {isTooltipVisible && (
            <motion.div
              className="absolute top-[-60px] right-0 bg-black text-white text-xs p-2 rounded-md shadow-lg w-48"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              Earn points by booking appointments and enjoying salon services.
              Redeem your points for exclusive rewards and discounts!
            </motion.div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-wide text-[#FB3CB2]">
          Your Rewards
        </h3>
        {/* Points Display */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -inset-0.5 bg-gradient-to-r from-[#3f283650] to-[#E02A9F] blur-xl rounded-full"
          />
          <span className="relative inline-block px-6 py-2 bg-[#1c0336a8] text-[#FB3CB2] font-bold text-md rounded-full shadow-inner">
            {points} points
          </span>
        </div>
        <p className="text-sm text-gray-300 mt-1">
          {points < 200
            ? `You're almost there! Earn ${200 - points} more points to redeem.`
            : "Congratulations! You can now redeem your points."}
        </p>
        {/* Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-1 md:w-[200px] mx-auto text-md bg-gradient-to-r from-pink-600 to-purple-500 text-gray-200 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out 
          hover:scale-105 hover:shadow-xl hover:from-purple-700 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        >
          Redeem Points
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50 ">
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
