import { useState } from "react";
import { motion } from "framer-motion";

export default function Rewards({ points }: { points: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#1C0336] h-[200px] p-6 rounded-3xl shadow-lg w-full space-y-3 text-white text-center">
      <h3 className="text-xl font-semibold text-[#FB3CB2]">Your Rewards</h3>
      <p className="text-gray-300 text-base">
        You have <strong className="text-[#FB3CB2]">{points} points</strong>.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-[#FB3CB2] text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#E02A9F] focus:ring-4 focus:ring-[#FB3CB2]/50"
      >
        Redeem Points
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
