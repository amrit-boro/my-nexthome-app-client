import { useState } from "react";
import PropertyList from "./PropertyList";

function Filter() {
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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full h-9 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-medium flex items-center justify-center gap-2"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Compact Filters Sidebar */}
          <div
            className={`lg:col-span-3 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="lg:sticky lg:top-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2 text-gray-700">
                  Price Range
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>

                  <div className="relative w-full h-5 flex items-center">
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
                      style={{ WebkitAppearance: "none", height: "18px" }}
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
                      style={{ WebkitAppearance: "none", height: "18px" }}
                    />

                    <div className="absolute w-full h-1 bg-gray-200 rounded-full pointer-events-none"></div>
                    <div
                      className="absolute h-1 bg-blue-500 rounded-full pointer-events-none"
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
              <div className="mb-4">
                <h4 className="text-xs font-medium mb-2 text-gray-700">
                  Room Type
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => toggleRoomConfig("1BHK")}
                    className={`h-8 px-2 rounded text-xs font-medium transition-colors ${
                      filters.roomConfig["1BHK"]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    1 BHK
                  </button>
                  <button
                    onClick={() => toggleRoomConfig("2BHK")}
                    className={`h-8 px-2 rounded text-xs font-medium transition-colors ${
                      filters.roomConfig["2BHK"]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    2 BHK
                  </button>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-3">
                <h4 className="text-xs font-medium mb-2 text-gray-700">
                  Amenities
                </h4>
                <div className="space-y-1.5">
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
                      className="flex items-center gap-2 cursor-pointer group py-0.5"
                    >
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 text-blue-500 rounded focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        checked={filters.amenities[key]}
                        onChange={() => toggleAmenity(key)}
                      />
                      <span className="text-xs group-hover:text-blue-600 transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={handleApply}
                  className="flex-1 h-8 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 h-8 bg-gray-100 text-gray-700 text-xs font-semibold rounded hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <PropertyList />
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default Filter;
