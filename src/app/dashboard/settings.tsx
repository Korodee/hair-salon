export default function Settings() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Enable Notifications
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" /> Dark Mode
          </label>
          <button className="bg-black text-white px-4 py-2 rounded-lg mt-4">Save</button>
        </div>
      </div>
    );
  }
  