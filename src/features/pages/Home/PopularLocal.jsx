import { Search, Home, Eye, Briefcase } from "lucide-react";

function PopularLocal() {
  const localities = [
    {
      name: "Koramangala",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop",
    },
    {
      name: "HSR Layout",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop",
    },
    {
      name: "Marathahalli",
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=800&fit=crop",
    },
    {
      name: "Whitefield",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop",
    },
  ];

  return (
    <section className="py-8 md:py-14 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto">
      <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-2">
        Explore Popular Localities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {localities.map((locality, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden group aspect-[4/5] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${locality.image})` }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Text */}
            <h3 className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white text-lg sm:text-xl font-semibold drop-shadow-md">
              {locality.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularLocal;
