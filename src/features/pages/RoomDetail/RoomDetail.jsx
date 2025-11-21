import { useState } from "react";
import RoomHeader from "./RoomHeader";
import RoomFooter from "./RoomFooter";
import RoomBooking from "./RoomBooking";
import RoomReview from "./RoomReview";

function RoomDetail() {
  const [activeTab, setActiveTab] = useState("description");
  const [checkIn, setCheckIn] = useState("Add date");
  const [checkOut, setCheckOut] = useState("Add date");
  const [guests, setGuests] = useState("1 guest");

  const images = [
    {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      alt: "Main living area",
    },
    {
      url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
      alt: "Bedroom with desk",
    },
    {
      url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
      alt: "Modern kitchen",
    },
    {
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
      alt: "Clean bathroom",
    },
    {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      alt: "Co-working space",
    },
  ];

  const amenities = [
    { icon: "📶", name: "High-Speed Wi-Fi" },
    { icon: "❄️", name: "Air Conditioning" },
    { icon: "🚗", name: "Free Parking" },
    { icon: "🍳", name: "Fully Equipped Kitchen" },
    { icon: "💻", name: "Dedicated Workspace" },
    { icon: "📺", name: "Smart TV" },
    { icon: "🧺", name: "Washing Machine" },
    { icon: "🌿", name: "Private Balcony" },
  ];

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
      {/* Header */}
      <RoomHeader />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
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
            Mumbai
          </a>
          <span className="text-sm text-gray-500">/</span>
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-blue-500"
          >
            Andheri West
          </a>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm font-medium">Modern Coliving Space</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black mb-2">
              Modern Coliving Space with Great Amenities
            </h1>
            <p className="text-gray-500">Andheri West, Mumbai</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">★</span>
            <span className="font-bold">4.5</span>
            <span className="text-gray-500 text-sm">(120 reviews)</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-8">
          <div className="col-span-4 md:col-span-2 row-span-2 rounded-xl overflow-hidden cursor-pointer">
            <div
              className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${images[0].url})` }}
            ></div>
          </div>
          {images.slice(1).map((img, idx) => (
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Host Info */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold">
                  Entire room hosted by Aryan
                </h2>
                <p className="text-gray-500">
                  2 guests · 1 bedroom · 1 bed · 1 private bathroom
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
            </div>

            {/* Amenities */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-2xl">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
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
                  <p className="text-gray-600 leading-relaxed">
                    Welcome to your home away from home in the heart of Andheri
                    West! This modern and bright coliving space is perfect for
                    students, young professionals, and digital nomads. The
                    private room is thoughtfully designed for comfort and
                    productivity, featuring a comfortable bed, a dedicated
                    workspace, and ample storage.
                    <br />
                    <br />
                    You'll have access to a fully equipped shared kitchen, a
                    vibrant common area to relax and socialize, and a high-speed
                    internet connection that ensures you stay connected. The
                    building is secure, well-maintained, and located just
                    minutes away from local markets, cafes, and public
                    transport.
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="py-4">
                  <p className="text-gray-600">
                    Reviews content would go here...
                  </p>
                </div>
              )}

              {activeTab === "rules" && (
                <div className="py-4">
                  <p className="text-gray-600">
                    House rules content would go here...
                  </p>
                </div>
              )}

              {activeTab === "map" && (
                <div className="py-4">
                  <p className="text-gray-600">Map content would go here...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}

          <RoomBooking
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            setCheckIn={setCheckIn}
            setGuests={setGuests}
            setCheckOut={setCheckOut}
          />
        </div>

        {/* Reviews Section */}
        <RoomReview
          reviewDistribution={reviewDistribution}
          renderStars={renderStars}
        />

        {/* Map Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <h3 className="text-2xl font-bold mb-4">Location</h3>
          <p className="text-gray-500 mb-4">
            Andheri West, Mumbai, Maharashtra, India
          </p>
          <div className="w-full h-96 rounded-xl overflow-hidden bg-gray-300">
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
