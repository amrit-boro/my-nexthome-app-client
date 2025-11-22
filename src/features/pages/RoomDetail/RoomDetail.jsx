import { useState, useEffect } from "react";
import RoomHeader from "./RoomHeader";
import RoomFooter from "./RoomFooter";
import RoomBooking from "./RoomBooking";
import RoomReview from "./RoomReview";
import { useParams } from "react-router-dom";
import { useRoomdetails } from "../../../hooks/usePgdetail";

// Helper to map API amenity strings to Icons/Labels
const getAmenityDetails = (key) => {
  const mapping = {
    wifi: { icon: "📶", name: "High-Speed Wi-Fi" },
    ac: { icon: "❄️", name: "Air Conditioning" },
    food: { icon: "🍳", name: "Food Included" },
    powerBackup: { icon: "🔋", name: "Power Backup" },
    tv: { icon: "📺", name: "TV" },
    laundry: { icon: "🧺", name: "Laundry" },
    parking: { icon: "🚗", name: "Parking" },
    cleaning: { icon: "🧹", name: "Daily Cleaning" },
  };
  // Fallback for unknown amenities
  return mapping[key] || { icon: "✨", name: key };
};

function RoomDetail() {
  const [activeTab, setActiveTab] = useState("description");
  const [checkIn, setCheckIn] = useState("Add date");
  const [checkOut, setCheckOut] = useState("Add date");
  const [guests, setGuests] = useState("1 guest");

  const { id } = useParams();
  const { data, isLoading } = useRoomdetails(id);

  // 1. SAFEGUARD: Handle Loading or Missing Data
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading details...
      </div>
    );
  if (!data || !data.result || data.result.length === 0)
    return <div>No PG details found.</div>;

  // 3. IMAGE CONFIGURATION
  // IMPORTANT: Replace this with your actual backend server URL where images are stored
  const BASE_IMAGE_URL = "http://localhost:8000/";

  // 2. EXTRACT DATA: The console log shows the data is in an array at index 0
  const pgData = data.result[0];

  // Fallback image if API has no images
  const defaultImage =
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop";

  // Map API images to full URLs
  const displayImages =
    pgData.images && pgData.images.length > 0
      ? pgData.images.map((img) => ({ url: `${BASE_IMAGE_URL}${img}` })) // without parethesis js will confused its an function or what ...????
      : [{ url: defaultImage }];

  // Ensure we have at least 5 images for the grid layout (duplicate if necessary or use placeholders)
  while (displayImages.length < 5) {
    displayImages.push({ url: defaultImage });
  }

  // 4. MAP AMENITIES
  const displayAmenities = pgData.included_amenities
    ? pgData.included_amenities.map((item) => getAmenityDetails(item))
    : [];

  // Hardcoded review stats (Since API doesn't seem to have review details yet)
  const reviewDistribution = [
    { stars: 5, percentage: 50 },
    { stars: 4, percentage: 35 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-red-500">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-red-500">
          ⯨
        </span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-red-500">
          ☆
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <RoomHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dynamic Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-blue-500"
          >
            Home
          </a>
          <span className="text-sm text-gray-500">/</span>
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-blue-500"
          >
            {pgData.city}
          </a>
          <span className="text-sm text-gray-500">/</span>
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-blue-500"
          >
            {pgData.areaname}
          </a>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm font-medium truncate max-w-xs">
            {pgData.title}
          </span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black mb-2 capitalize">
              {pgData.title}
            </h1>
            <p className="text-gray-500">
              {pgData.areaname}, {pgData.city}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {pgData.status}
            </span>
            {/* Placeholder reviews until API has them */}
            <span className="text-red-500 text-xl">★</span>
            <span className="font-bold">4.5</span>
            <span className="text-gray-500 text-sm">(120 reviews)</span>
          </div>
        </div>

        {/* Image Gallery - Using mapped displayImages */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-8">
          <div className="col-span-4 md:col-span-2 row-span-2 rounded-xl overflow-hidden cursor-pointer">
            <div
              className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${displayImages[0].url})` }}
            ></div>
          </div>
          {displayImages.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className="col-span-2 md:col-span-1 rounded-lg overflow-hidden cursor-pointer"
            >
              <div
                className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${img.url})` }}
              ></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Host Info */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold">
                  Hosted by User #{pgData.user_id}
                </h2>
                <p className="text-gray-500">
                  {pgData.property_type || "PG"} · {pgData.areaname}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
            </div>

            {/* Amenities - Dynamic */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold mb-4">
                What this place offers
              </h3>
              {displayAmenities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayAmenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-2xl">{amenity.icon}</span>
                      <span className="capitalize">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No amenities listed.</p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-col gap-4">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {["description", "reviews", "rules", "map"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                      }`}
                    >
                      {tab === "rules" ? "House Rules" : tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "description" && (
                <div className="py-4">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {pgData.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-bold text-black">Near Me:</h4>
                    <p className="text-gray-600">{pgData.nearme}</p>
                  </div>
                </div>
              )}

              {/* Other tabs remain the same for now */}
              {activeTab === "reviews" && (
                <div className="py-4">
                  <p className="text-gray-600">Reviews content...</p>
                </div>
              )}
              {activeTab === "rules" && (
                <div className="py-4">
                  <p className="text-gray-600">House rules...</p>
                </div>
              )}
              {activeTab === "map" && (
                <div className="py-4">
                  <p className="text-gray-600">Map content...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          {/* Passing dynamic price and details to Booking component */}
          <RoomBooking
            price={pgData.monthlyfees}
            refundable={pgData.refundable}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            setCheckIn={setCheckIn}
            setGuests={setGuests}
            setCheckOut={setCheckOut}
          />
        </div>

        <RoomReview
          reviewDistribution={reviewDistribution}
          renderStars={renderStars}
        />

        {/* Location Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <h3 className="text-2xl font-bold mb-4">Location</h3>
          <p className="text-gray-500 mb-4">
            {pgData.address}, {pgData.areaname}, {pgData.city}
          </p>
          <div className="w-full h-96 rounded-xl overflow-hidden bg-gray-300">
            {/* If you have coordinates in your DB later, you can use them here. 
                For now, using a static map image */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop"
              alt="Map showing location"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
      <RoomFooter />
    </div>
  );
}

export default RoomDetail;
