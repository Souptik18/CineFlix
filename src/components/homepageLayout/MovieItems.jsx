import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { homeContext } from "./HomeLayout";

function MovieItems({ movie }) {
  const { checkRef } = useContext(homeContext);

  const handleDetails = (imdbID) => {
    checkRef.current.push(imdbID);
    // console.log(checkRef.current);
  };

  if (!movie || movie.length === 0) {
    return (
      <p className="font-thin text-xl text-center text-slate-500 bg-slate-800 p-8">
        No movies found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-slate-800 p-4">
      {movie.map((item) => (
        <div key={item.imdbID} className="flex flex-col items-center">
          <NavLink to={`/home/movie/:i=${item.imdbID}`}>
            <img
              onClick={() => handleDetails(item.imdbID)}
              className="h-full w-5/5 rounded-lg hover:transition-all hover:scale-105 hover:duration-500 hover:ease-in-out"
              src={item.Poster}
              alt={item.Title}
            />
            <p className="float-left mt-1 text-white">{item.Title}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default MovieItems;
