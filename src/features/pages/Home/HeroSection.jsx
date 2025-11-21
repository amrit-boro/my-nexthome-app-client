import { useState } from "react";
import { Search, Home, Eye, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("PG");

  return (
    <>
      <section
        className="relative min-h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.48) 100%), url(https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&h=900&fit=crop)",
        }}
      >
        <div className="text-center px-4 sm:px-6 max-w-3xl">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
            Find Your Next Home
          </h1>

          <p className="text-white/90 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Discover the perfect PG or room that fits your lifestyle and budget.
            Search from thousands of verified listings.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault(); /* handle submit if needed */
            }}
            className="w-full mx-auto max-w-2xl"
            aria-label="Search form"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-xl">
              {/* Property type select */}
              <div className="flex items-center w-full sm:w-1/3 h-12 sm:h-12 bg-white rounded-lg overflow-hidden">
                <div className="flex items-center justify-center px-3">
                  <Home className="text-gray-500 w-4 h-4" aria-hidden="true" />
                </div>
                <select
                  aria-label="Property type"
                  className="flex-1 px-3 text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option>Girls PG</option>
                  <option>Boys PG</option>
                  <option>Room</option>
                  <option>Hotel</option>
                  <option>Apartment</option>
                </select>
              </div>
              {/* Location input */}
              <div className="flex items-center w-full sm:w-1/2 h-12 sm:h-12 bg-white rounded-lg overflow-hidden">
                <div className="flex items-center justify-center px-3">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                </div>
                <input
                  aria-label="Enter location or city"
                  type="text"
                  className="flex-1 px-3 text-sm sm:text-sm bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-white/50 placeholder:text-gray-400"
                  placeholder="Enter location or city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Search button */}
              <div className="w-full sm:w-auto min-w-[110px]">
                <Link
                  to="/room"
                  className="inline-flex items-center justify-center h-12 w-full px-4 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
                  role="button"
                  aria-label="Search"
                >
                  Search
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
