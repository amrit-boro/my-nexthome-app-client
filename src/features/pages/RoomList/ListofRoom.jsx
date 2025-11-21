import { useMemo, useState } from "react";
import RHeader from "./RHeader";
import PropertyList from "./PropertyList";
import RoomMap from "./RoomMap";

function ListofRoom() {
  const [sortBy, setSortBy] = useState("Relevance");
  const [priceRange, setPriceRange] = useState([2000, 15000]);

  const [filters, setFilters] = useState({
    roomConfig: {
      "1BHK": false,
      "2BHK": false,
    },
    amenities: {
      wifi: true,
      parking: false,
      ac: true,
      laundry: false,
      meal: false,
      housekeeping: true,
    },
  });

  const initialProperties = [
    {
      id: 0,
      type: "FOR STUDENTS",
      name: "Cozy Haven PG",
      location: "Koramangala, Bangalore",
      rating: 4.5,
      reviews: 45,
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    },
    {
      id: 1,
      type: "SHARED ROOM",
      name: "Urban Nest Coliving",
      location: "HSR Layout, Bangalore",
      rating: 5,
      reviews: 82,
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      type: "SINGLE ROOM",
      name: "Peaceful Quarters",
      location: "Indiranagar, Bangalore",
      rating: 4,
      reviews: 21,
      price: 14500,
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      type: "1 BHK",
      name: "Modern Living",
      location: "Whitefield, Bangalore",
      rating: 5,
      reviews: 65,
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      type: "SHARED ROOM",
      name: "Student's Corner",
      location: "Marathahalli, Bangalore",
      rating: 4.5,
      reviews: 33,
      price: 9000,
      image:
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      type: "SINGLE ROOM",
      name: "City View Rooms",
      location: "Jayanagar, Bangalore",
      rating: 4,
      reviews: 50,
      price: 13000,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    },
  ];

  // state that actually holds visible listings (demo: start with initialProperties)
  const [listings, setListings] = useState(initialProperties);

  const toggleRoomConfig = (config) => {
    setFilters((prev) => ({
      ...prev,
      roomConfig: {
        ...prev.roomConfig,
        [config]: !prev.roomConfig[config],
      },
    }));
  };

  const toggleAmenity = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const resetFilters = () => {
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
    setPriceRange([2000, 15000]);
    setListings(initialProperties);
  };

  // Build canonical payload from UI state
  const buildFilterPayload = () => {
    const selectedRoomConfigs = Object.entries(filters.roomConfig)
      .filter(([, val]) => val)
      .map(([k]) => k); // e.g. ["1BHK"]

    const selectedAmenities = Object.entries(filters.amenities)
      .filter(([, val]) => val)
      .map(([k]) => k); // e.g. ["wifi","ac"]

    const payload = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      roomConfig: selectedRoomConfigs, // array (empty = none selected)
      amenities: selectedAmenities, // array
      sortBy,
    };

    return payload;
  };

  // Example client-side filter (demo). You can remove / replace with server call.
  const applyFiltersClientSide = (payload) => {
    const filtered = initialProperties.filter((p) => {
      // price check
      if (p.price < payload.minPrice || p.price > payload.maxPrice)
        return false;

      // room config check:
      if (payload.roomConfig.length > 0) {
        // normalize property type so we can check 1BHK vs "1 BHK" in data
        const normalizedType = p.type.replace(/\s/g, "").toUpperCase(); // "1BHK", "FORSTUDENTS", ...
        const matchesRoom = payload.roomConfig.some(
          (rc) => rc.replace(/\s/g, "").toUpperCase() === normalizedType
        );
        if (!matchesRoom) return false;
      }

      // amenities: our demo properties don't have amenity lists, so we skip actual amenity filtering here.
      // In a real app you would check p.amenities includes payload.amenities

      return true;
    });

    // apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (payload.sortBy === "Price: Low to High") return a.price - b.price;
      if (payload.sortBy === "Price: High to Low") return b.price - a.price;
      if (payload.sortBy === "Rating") return b.rating - a.rating;
      return 0; // Relevance: default order
    });

    return sorted;
  };

  // called when user clicks Apply Filters
  const handleApply = async () => {
    const payload = buildFilterPayload();
    console.log("Filter payload:", payload);

    // === Option A: Client-side demo filter (what you see here) ===
    const newListings = applyFiltersClientSide(payload);
    setListings(newListings);

    // === Option B: Send to server (uncomment & change URL) ===
    /*
    try {
      const res = await fetch('/api/listings/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setListings(data.listings || []);
    } catch (err) {
      console.error(err);
    }
    */
  };

  // derived count (based on full dataset or server response depending on your flow)
  const resultsCount = listings.length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <RHeader />
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h1 className="text-4xl font-black mb-1">
                PGs & Rooms in Bangalore
              </h1>
              <p className="text-gray-500">
                Showing {resultsCount} of {initialProperties.length} results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-500">
                Sort by:
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 xl:col-span-4">
                <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold mb-6">Filters</h3>

                  {/* Price Range */}
                  <div className="mb-8">
                    <p className="text-base font-medium mb-4">Price Range</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>

                      <div className="relative w-full h-8 flex items-center">
                        <input
                          type="range"
                          min="500"
                          max="15000"
                          step="500"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Math.min(
                                Number(e.target.value),
                                priceRange[1] - 500
                              ),
                              priceRange[1],
                            ])
                          }
                          className="w-full absolute appearance-none bg-transparent z-10 cursor-pointer"
                          style={{ WebkitAppearance: "none" }}
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
                              Math.max(
                                Number(e.target.value),
                                priceRange[0] + 500
                              ),
                            ])
                          }
                          className="w-full absolute appearance-none bg-transparent z-20 cursor-pointer"
                          style={{ WebkitAppearance: "none" }}
                        />

                        {/* Range Track */}
                        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                        <div
                          className="absolute h-2 bg-blue-500 rounded-full"
                          style={{
                            left: `${
                              ((priceRange[0] - 500) / (15000 - 500)) * 100
                            }%`,
                            right: `${
                              100 -
                              ((priceRange[1] - 500) / (15000 - 500)) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Room Configuration */}
                  <div className="mb-8">
                    <h4 className="text-base font-medium mb-4">
                      Room Configuration
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => toggleRoomConfig("1BHK")}
                        className={`h-10 px-3 rounded-md border transition-colors ${
                          filters.roomConfig["1BHK"]
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        1 BHK
                      </button>
                      <button
                        onClick={() => toggleRoomConfig("2BHK")}
                        className={`h-10 px-3 rounded-md border transition-colors ${
                          filters.roomConfig["2BHK"]
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        2 BHK
                      </button>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium mb-4">Amenities</h4>
                    <div className="space-y-4">
                      {[
                        { key: "wifi", label: "Wi-Fi" },
                        { key: "parking", label: "Parking" },
                        { key: "ac", label: "Air Conditioning" },
                        { key: "laundry", label: "Laundry" },
                        { key: "meal", label: "Meal Included" },
                        { key: "housekeeping", label: "Housekeeping" },
                      ].map(({ key, label }) => (
                        <label
                          key={key}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                            checked={filters.amenities[key]}
                            onChange={() => toggleAmenity(key)}
                          />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleApply}
                      className="flex-1 h-11 bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={resetFilters}
                      className="flex-1 h-11 bg-gray-200 text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-300 transition-colors"
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

          {/* Map */}
          <RoomMap />
        </div>
      </main>
    </div>
  );
}

export default ListofRoom;
