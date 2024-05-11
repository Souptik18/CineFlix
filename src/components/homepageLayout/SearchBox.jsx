import React, { useState } from "react";
import { useSelector } from "react-redux";

function SearchBox({ setSearch, search }) {
  const darkModeEnabled = useSelector((state) => state.theme.darkModeEnabled);

  return (
    <div className={`${darkModeEnabled ? "bg-black" : "bg-white"}`}>
      <div className=" relative bg-slate-800">
        <input
          className="flex w-96 h-12 rounded-xl border border-green bg-transparent px-2 py-2 text-sm placeholder:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed text-white"
          type="text"
          placeholder="Type to search movies to add in favourites"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSearch("")}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
