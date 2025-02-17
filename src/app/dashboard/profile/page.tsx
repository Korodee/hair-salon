export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Profile Details */}
      <div className="text-black/80">
        <div className="flex justify-between">
          <div className="mb-6">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="border p-3 w-full rounded-lg mt-1"
            />
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              value="johndoe@example.com"
              readOnly
              className="border p-3 w-full rounded-lg bg-gray-200 cursor-not-allowed mt-1"
            />
          </div>
        </div>
        {/* Booking Info */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg flex justify-between">
          <span className="text-lg font-medium">
            Total Bookings: <strong>12</strong>
          </span>
          <button className="text-blue-600 hover:underline">
            View History
          </button>
        </div>

        {/* Rewards */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <span className="text-lg font-medium">Reward Points</span>
          <div className="flex justify-between mt-2">
            <span>
              Total: <strong>1500</strong>
            </span>
            <span>
              Redeemed: <strong>500</strong>
            </span>
          </div>
        </div>

        {/* Change Password */}
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Change Password
        </button>
      </div>
    </div>
  );
}
