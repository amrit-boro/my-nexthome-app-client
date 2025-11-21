import { useState } from "react";
const Icon = ({ name, className = "" }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{
      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    }}
  >
    {name}
  </span>
);

function Gheader() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-4 sm:px-6 lg:px-10 py-3 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-slate-900">
          <div className="w-6 h-6 text-blue-600">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">
            PG-Finder
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-9">
          <a
            className="text-sm font-medium leading-normal text-slate-800 hover:text-blue-600"
            href="#"
          >
            Find a PG
          </a>
          <a
            className="text-sm font-medium leading-normal text-slate-800 hover:text-blue-600"
            href="#"
          >
            List a Property
          </a>
          <a
            className="text-sm font-medium leading-normal text-slate-800 hover:text-blue-600"
            href="#"
          >
            About Us
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-slate-500 flex bg-slate-100 items-center justify-center pl-3 rounded-l-lg">
              <Icon name="search" className="text-xl" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none bg-slate-100 h-full placeholder:text-slate-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </label>
        <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-slate-100 text-slate-800 hover:bg-slate-200">
          <Icon name="notifications" className="text-2xl" />
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOxQWAmPboao1GS1Sq28lW18_fW7T4yUVu-W6vOrHfdkhoZMehujqmU6ROqWEini1fZk_11_sc-3wJjAC4Uh3OgcUh3P2YgTpDTOwS7Yk8NBA_nSfcghqJhKrlRGMDCRj4KN9QzR1olRTvctaRiJIor0PIRKnwwks5ClkAzEKOHJbMHq1X5EN7UeKjCwH3gt1LEjsC37q7E3X20r-WE-z-9R6LD7xio3QqQqjX02G7YqZEjy06JU55y_9Oceu1tXu1_DIEJK-Ej0aF")',
          }}
        />
      </div>
    </header>
  );
}

export default Gheader;
