export default function Rewards({ points }: { points: number }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xs w-full space-y-4">
      <h3 className="text-2xl font-semibold text-blue-600">Your Rewards</h3>
      <p className="text-gray-600 text-lg">
        You have <strong className="text-blue-500">{points} points</strong>.
      </p>
      <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
        Redeem Points
      </button>
    </div>
  );
}
