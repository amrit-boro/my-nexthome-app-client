import { useState } from "react";

function ResponsiveFilter() {
  const [priceRange, setPriceRange] = useState([500, 15000]);
  const [filters, setFilters] = useState({
    roomConfig: { "1BHK": false, "2BHK": false },
    amenities: {
      wifi: false,
      parking: false,
      ac: false,
      laundry: false,
      meal: false,
      housekeeping: false,
    },
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleRoomConfig = (type) => {
    setFilters((prev) => ({
      ...prev,
      roomConfig: { ...prev.roomConfig, [type]: !prev.roomConfig[type] },
    }));
  };

  const toggleAmenity = (key) => {
    setFilters((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [key]: !prev.amenities[key] },
    }));
  };

  const resetFilters = () => {
    setPriceRange([500, 15000]);
    setFilters({
      roomConfig: { "1BHK": false, "2BHK": false },
      amenities: {
        wifi: false,
        parking: false,
        ac: false,
        laundry: false,
        meal: false,
        housekeeping: false,
      },
    });
  };

  const handleApply = () => {
    console.log("Applied filters:", { priceRange, filters });
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full h-10 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-4 xl:col-span-3 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="lg:sticky lg:top-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Price Range</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>

                  <div className="relative w-full h-6 flex items-center">
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          Math.min(Number(e.target.value), priceRange[1] - 500),
                          priceRange[1],
                        ])
                      }
                      className="w-full absolute appearance-none bg-transparent z-10 cursor-pointer"
                      style={{
                        WebkitAppearance: "none",
                        height: "20px",
                      }}
                    />
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Math.max(Number(e.target.value), priceRange[0] + 500),
                        ])
                      }
                      className="w-full absolute appearance-none bg-transparent z-20 cursor-pointer"
                      style={{
                        WebkitAppearance: "none",
                        height: "20px",
                      }}
                    />

                    {/* Range Track */}
                    <div className="absolute w-full h-1.5 bg-gray-200 rounded-full pointer-events-none"></div>
                    <div
                      className="absolute h-1.5 bg-blue-500 rounded-full pointer-events-none"
                      style={{
                        left: `${
                          ((priceRange[0] - 500) / (15000 - 500)) * 100
                        }%`,
                        right: `${
                          100 - ((priceRange[1] - 500) / (15000 - 500)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Room Configuration */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Room Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleRoomConfig("1BHK")}
                    className={`h-9 px-3 rounded-md border text-sm transition-colors ${
                      filters.roomConfig["1BHK"]
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    1 BHK
                  </button>
                  <button
                    onClick={() => toggleRoomConfig("2BHK")}
                    className={`h-9 px-3 rounded-md border text-sm transition-colors ${
                      filters.roomConfig["2BHK"]
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    2 BHK
                  </button>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-3">Amenities</h4>
                <div className="space-y-2.5">
                  {[
                    { key: "wifi", label: "Wi-Fi" },
                    { key: "parking", label: "Parking" },
                    { key: "ac", label: "AC" },
                    { key: "laundry", label: "Laundry" },
                    { key: "meal", label: "Meals" },
                    { key: "housekeeping", label: "Housekeeping" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        checked={filters.amenities[key]}
                        onChange={() => toggleAmenity(key)}
                      />
                      <span className="text-sm group-hover:text-blue-600">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={handleApply}
                  className="flex-1 h-9 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 h-9 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold mb-4">Property Listings</h2>

              {/* Sample Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="w-full h-32 bg-gray-200 rounded-md mb-2"></div>
                    <h3 className="text-sm font-semibold mb-1">Property {i}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      2 BHK Apartment
                    </p>
                    <p className="text-sm font-bold text-blue-600">
                      ₹{(5000 + i * 1000).toLocaleString()}/mo
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default ResponsiveFilter;
