import { useState } from "react";
import { Link } from "react-router-dom";

function RHeader() {
  const [searchQuery, setSearchQuery] = useState("Bangalore");

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-blue-500">
              <span className="text-3xl">🏢</span>
              <Link to="/" className="text-xl font-bold">
                PG Finder
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center px-8">
            <div className="w-full max-w-lg">
              <div className="flex items-stretch rounded-lg h-10 shadow-sm">
                <div className="flex items-center justify-center pl-4 bg-white border-y border-l border-gray-200 rounded-l-lg text-gray-500">
                  <span>🔍</span>
                </div>
                <input
                  type="text"
                  className="flex-1 px-4 pl-2 border-y border-r border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Search for PGs in Bangalore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-blue-500">
                Home
              </a>
              <a href="#" className="text-sm font-medium hover:text-blue-500">
                List your property
              </a>
              <a href="#" className="text-sm font-medium hover:text-blue-500">
                About
              </a>
            </nav>
            <button className="px-4 h-10 bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors">
              Log In
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-blue-200"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default RHeader;
