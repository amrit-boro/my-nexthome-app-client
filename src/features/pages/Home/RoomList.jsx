import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllPg } from "../../../services/apiPGs";
import ListingSpinner from "../../../ui/ListingSpinner";

function RoomList() {
  const {
    isLoading,
    data: pgDetails,
    error,
  } = useQuery({
    queryKey: ["pgDetails"],
    queryFn: getAllPg,
  });

  const propertyArray = pgDetails?.data?.data?.[0]?.properties || [];

  if (isLoading) return <ListingSpinner size={10} color="blue-500" centered />;
  if (error) return window.alert("sory");

  return (
    <section className="py-8 md:py-14 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto">
      <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-2">
        Featured Listings
      </h2>

      <div className="overflow-x-auto -mx-2 sm:-mx-4 scroll-smooth">
        <div className="flex gap-4 sm:gap-6 p-2 sm:p-4 min-w-max">
          {propertyArray.slice(0, 5).map((listing, index) => {
            // --- FIX START: Image Safety Check ---
            const imageName = listing.images?.[0];

            // If imageName exists, use it. If not, use a placeholder.
            const imageUrl = imageName
              ? `http://localhost:8000/${imageName}`
              : "https://placehold.co/600x400?text=No+Image";
            // --- FIX END ---

            return (
              <div
                key={index}
                className="flex flex-col w-56 sm:w-64 md:w-72 rounded-xl bg-white shadow-sm hover:shadow-md 
                overflow-hidden transition-transform hover:-translate-y-1 duration-200"
              >
                {/* Image */}
                <div
                  className="w-full h-36 sm:h-40 md:h-48 bg-cover bg-center"
                  style={{
                    // Using the safe imageUrl variable here
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                ></div>

                {/* Info */}
                <div className="flex flex-col flex-1 justify-between p-3 sm:p-4 gap-3">
                  <div className="flex flex-col gap-2">
                    {/* Top Row: Type Badge & Rating/Status */}
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {listing.type}
                      </span>
                      {/* Optional: You could put a 'Verified' or Star rating here */}
                    </div>

                    {/* Title */}
                    <h3 className="text-gray-900 font-bold text-lg leading-tight line-clamp-1">
                      {listing.title}
                    </h3>

                    {/* Address with Icon */}
                    <div className="flex items-center text-gray-500 text-xs sm:text-sm gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="truncate">{listing.address}</p>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-gray-900">
                        ₹
                        {Math.floor(listing?.monthlyfees || 0).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        / month
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/roomDetail"
                    className="w-full h-9 sm:h-10 px-3 rounded-lg bg-blue-50 text-blue-600 
                    text-xs sm:text-sm font-bold hover:bg-blue-100 
                    transition-colors flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RoomList;
