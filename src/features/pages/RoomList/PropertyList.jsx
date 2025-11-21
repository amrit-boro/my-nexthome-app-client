import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { data, Link } from "react-router-dom";
import { getAllPg } from "../../../services/apiPGs";
import ListingSpinner from "../../../ui/ListingSpinner";

function PropertyList() {
  const [favorites, setFavorites] = useState([1, 4]);

  const {
    isLoading,
    data: pgDetails,
    error,
  } = useQuery({
    queryKey: ["pgDetails"],
    queryFn: getAllPg,
  });
  const propertyArray = pgDetails?.data?.data;
  console.log(propertyArray);

  if (isLoading) return <ListingSpinner size={10} color="blue-500" centered />;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ⯨
        </span>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-yellow-500">
          ☆
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="col-span-12 xl:col-span-8">
      <div className="space-y-6 h-[calc(100vh-13rem)] overflow-y-auto pr-2">
        {propertyArray.map((property) => (
          <div
            key={property.propertyId}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 hover:shadow-lg hover:border-blue-500/50 transition-all duration-300"
          >
            <div
              className="w-1/3 aspect-[4/3] rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url($})` }}
            ></div>
            <div className="w-2/3 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-blue-500 font-semibold mb-1">
                    Boys pg
                  </div>
                  <h4 className="text-lg font-bold">{property.title}</h4>
                  <p className="text-sm text-gray-500">
                    {property.city},{property.areaName}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className={`transition-colors ${
                    favorites.includes(property.id)
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  {favorites.includes(property.id) ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">{renderStars(3.5)}</div>
                <span className="text-xs text-gray-500">(40 reviews)</span>
              </div>
              <div className="mt-auto pt-2 flex justify-between items-end">
                <div>
                  <span className="text-xl font-black text-blue-500">
                    ₹{property.monthlyRentBase}
                  </span>
                  <span className="text-sm text-gray-500"> / month</span>
                </div>
                <Link
                  to="/roomDetail"
                  className="text-sm font-bold text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
