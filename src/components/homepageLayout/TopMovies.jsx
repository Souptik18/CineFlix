import React, { useState, useEffect, useContext } from "react";
import { homeContext } from "../homepageLayout/HomeLayout";
import { nanoid } from "@reduxjs/toolkit";
function TopMovies() {
  const { ContentLoader, imdbMovie } = useContext(homeContext);
  const [TopMovieDetails, setTopMovieDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const searchParam = imdbMovie.current;
    const url = `https://imdb-top-100-movies.p.rapidapi.com/${searchParam}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fd5f052ca0msh17df6414e90e622p12a46djsndd703d160c9c",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTopMovieDetails([result]);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {TopMovieDetails ? (
        <div className="flex bg-slate-800 text-white h-vh">
          <div className="w-1/4 p-4">
            <div className="flex flex-col gap-4">
              {TopMovieDetails.map((item) => (
                <div
                  key={nanoid()}
                  className="max-w-md bg-slate-400 shadow-md rounded-lg overflow-hidden"
                >
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-200 m-2">Rating: {item.rating}</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4">
                      <p>Year: {item.year}</p>
                      <p>Director: {item.director}</p>
                      <p>Genre: {item.genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 p-4">
            {TopMovieDetails.map((item) => (
              <div key={nanoid()}>
                <p className="m-2">IMDB Rank- {item.rank}</p>
                <iframe
                  src={item.trailer_embed_link}
                  title={item.title}
                  width="100%"
                  height="500px"
                  allowFullScreen
                ></iframe>
                {item.writers.map((e) => {
                  return (
                    <h5 key={nanoid()} className="mt-2">
                      Writers - {e}
                    </h5>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>{ContentLoader()}</>
      )}
    </>
  );
}

export default TopMovies;
