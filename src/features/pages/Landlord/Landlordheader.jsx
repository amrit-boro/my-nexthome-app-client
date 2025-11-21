import { Link, NavLink } from "react-router-dom";
import { useGetUser } from "../../../hooks/useUser";

function Landlordheader() {
  const { data: user, isLoggedIn } = useGetUser();
  console.log("user", user);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 md:gap-3">
            <svg
              className="w-5 h-5 md:w-5.5 md:h-5.5 text-blue-500"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
            <NavLink
              to="/"
              className="text-gray-900 text-sm md:text-base font-bold"
            >
              PG-Finder
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Landlordheader;
