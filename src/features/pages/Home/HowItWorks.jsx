import {
  Search,
  Home,
  Eye,
  Briefcase,
  Facebook,
  Twitter,
  Github,
} from "lucide-react";

function HowItWorks() {
  const howItWorks = [
    {
      icon: <Search className="w-10 h-10" />,
      title: "1. Search",
      description:
        "Enter your desired location and browse through hundreds of verified PGs and rooms that match your criteria.",
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "2. Visit",
      description:
        "Schedule a visit to your shortlisted properties at your convenience, or take a virtual tour online.",
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "3. Book",
      description:
        "Love the place? Book it instantly and securely through our platform and get ready to move in.",
    },
  ];

  return (
    <section className="py-8 md:py-14 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto text-center">
      {/* Heading */}
      <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
        How It Works
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-8 sm:mb-10">
        Finding your next home is as easy as one, two, three. Follow these
        simple steps to get started.
      </p>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
        {howItWorks.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-3 sm:gap-4 px-3 sm:px-4 py-4 sm:py-5 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full text-blue-500">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
