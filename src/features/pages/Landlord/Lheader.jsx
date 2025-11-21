import { Menu, Upload, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useGetUser } from "../../../hooks/useUser";

function Lheader() {
  const { data: user, isLoggedIn } = useGetUser();
  // console.log("userDetail: ", user?.data);
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 md:px-10 lg:px-20 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 text-blue-500">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <NavLink
          to="/"
          className="text-slate-900 dark:text-white text-lg font-bold"
        >
          Pg Finder
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-slate-800 dark:text-slate-300 text-sm font-medium hover:text-blue-500 transition-colors"
            href="#"
          >
            Dashboard
          </a>
          <a className="text-blue-500 text-sm font-bold" href="#">
            My Listings
          </a>
          <a
            className="text-slate-800 dark:text-slate-300 text-sm font-medium hover:text-blue-500 transition-colors"
            href="#"
          >
            Messages
          </a>
          <a
            className="text-slate-800 dark:text-slate-300 text-sm font-medium hover:text-blue-500 transition-colors"
            href="#"
          >
            Profile
          </a>
        </div>

        {/* User Actions */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link
              to="/landlord"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-green-600 hover:border-green-700 transition-all flex items-center justify-center"
            >
              <img
                src={user?.data?.profilePictureUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
            <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base font-semibold">
              {user?.data?.fullName}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden text-slate-800 dark:text-slate-200">
        <Menu size={24} />
      </button>
    </header>
  );
}

export default Lheader;
