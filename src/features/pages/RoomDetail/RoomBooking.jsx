function RoomBooking({
  price,
  refundable,
  checkIn,
  checkOut,
  guests,
  setCheckIn,
  setGuests,
  setCheckOut,
}) {
  return (
    <div className="relative">
      <div className="sticky top-24">
        <div className="rounded-xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">₹{price}</p>
            <p className="text-gray-500">/ month</p>
          </div>

          <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-2">
            <div>
              <label
                className="block text-xs font-bold uppercase text-gray-500"
                htmlFor="check-in"
              >
                Check-in
              </label>
              <input
                id="check-in"
                type="text"
                className="w-full border-0 p-1 bg-transparent focus:outline-none"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="border-l border-gray-300 pl-2">
              <label
                className="block text-xs font-bold uppercase text-gray-500"
                htmlFor="check-out"
              >
                Check-out
              </label>
              <input
                id="check-out"
                type="text"
                className="w-full border-0 p-1 bg-transparent focus:outline-none"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-bold uppercase text-gray-500 mb-1"
              htmlFor="guests"
            >
              Guests
            </label>
            <select
              id="guests"
              className="w-full border border-gray-300 rounded-lg p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option>1 guest</option>
              <option>2 guests</option>
            </select>
          </div>

          <button className="w-full h-12 bg-blue-500 text-white text-base font-bold rounded-lg hover:bg-blue-600 transition-colors">
            Request to Book
          </button>

          <div className="flex justify-between text-sm">
            <p className="text-gray-500">₹{price} x 1 month</p>
            <p>{price}</p>
          </div>

          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Service fee</p>
            <p>₹500</p>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between font-bold">
            <p>Total</p>
            <p>₹{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomBooking;
