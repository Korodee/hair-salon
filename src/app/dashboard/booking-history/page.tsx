const bookingData = [
  {
    id: "0098",
    amount: "$25",
    date: "June 12, 2020",
    time: "12:00 AM",
    status: "Success",
  },
  {
    id: "0097",
    amount: "$25",
    date: "June 13, 2020",
    time: "11:00 AM",
    status: "Success",
  },
  {
    id: "0096",
    amount: "$25",
    date: "June 11, 2020",
    time: "9:00 AM",
    status: "Pending",
  },
  {
    id: "0095",
    amount: "$25",
    date: "June 13, 2020",
    time: "2:00 PM",
    status: "Failed",
  },
  {
    id: "0094",
    amount: "$25",
    date: "June 6, 2020",
    time: "4:00 PM",
    status: "Success",
  },
  {
    id: "0093",
    amount: "$25",
    date: "June 12, 2020",
    time: "9:00 AM",
    status: "Success",
  },
  {
    id: "0095",
    amount: "$25",
    date: "June 13, 2020",
    time: "2:00 PM",
    status: "Failed",
  },
  {
    id: "0094",
    amount: "$25",
    date: "June 6, 2020",
    time: "4:00 PM",
    status: "Success",
  },
  {
    id: "0093",
    amount: "$25",
    date: "June 12, 2020",
    time: "9:00 AM",
    status: "Success",
  },
];

export default function BookingHistory() {
  return (
    <div className=" rounded-lg">
      {/* <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-semibold text-gray-900">
          See history of your Booking invoice
        </h2>
      </div> */}
      {/* <p className="text-gray-600 mb-4">See history of your Booking invoice</p> */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className=" text-gray-700">
              <th className="p-3 text-left">Booking Invoice</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Status</th>
              {/* <th className="p-3 text-left">Action</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {bookingData.map((invoice, index) => (
              <tr key={index} className="border-t border-gray-400">
                <td className="p-3">Invoice#{invoice.id}</td>
                <td className="p-3">{invoice.amount}</td>
                <td className="p-3">{invoice.date}</td>
                <td className="p-3">{invoice.time}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${
                        invoice.status === "Success"
                          ? "bg-green-100 text-green-600"
                          : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
