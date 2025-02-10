export default function Profile() {
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full mb-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 w-full mb-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
