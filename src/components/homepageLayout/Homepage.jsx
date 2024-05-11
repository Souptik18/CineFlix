import React, { useContext, useEffect, useState } from "react";
import { account } from "../../appwrite/config";
import VideoLanding from "./VideoLanding";
import MovieItems from "./MovieItems";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { homeContext } from "./HomeLayout";

function Homepage() {
  const darkModeEnabled = useSelector((state) => state.theme.darkModeEnabled);
  const [email, setEmail] = useState("");
  const { imdbMovie } = useContext(homeContext);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    login();
  }, []);
  useEffect(() => {
    if (search) {
      getMovie();
    } else if (search == "") {
      setMovie([]);
    }
  }, [search]);

  const login = async () => {
    try {
      let loggedIn = await account.get("current");
      setEmail(loggedIn.email);
      setName(loggedIn.name);
    } catch (e) {
      console.log(e);
    }
  };
  const getMovie = async () => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=ab0f82b6`;
    const response = await fetch(url);
    const data = await response.json();
    setMovie(data.Search);
    // console.log(data);
  };
  // console.log(movie);

  const handleImdbMovie = (id) => {
    imdbMovie.current = id;
    // console.log(imdbMovie.current);
  };

  useEffect(() => {
    fetchLatestData();
  }, []);
  const fetchLatestData = async () => {
    const url = "https://imdb-top-100-movies.p.rapidapi.com/";
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
      setTrending(result);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(trending);
  // console.log(Array.isArray(trending));

  return (
    <div className="bg-slate-800">
      {email && name ? (
        <>
          <div
            className={`flex flex-col h-screen ${
              darkModeEnabled ? "bg-gray-900" : "white"
            }`}
          >
            <VideoLanding />
            <div className="flex justify-center bg-slate-800 pt-24">
              <SearchBox setSearch={setSearch} search={search} />
            </div>
            <MovieItems movie={movie} />
            <h2 className="text-3xl font-normal pl-8 pt-24 pb-8 text-slate-400 bg-slate-800">
              Top 100 all time hits{" "}
            </h2>
            <div className="flex justify-center flex-wrap gap-4 bg-slate-800">
              {trending.map((item) => (
                <div key={item.id} className="flex">
                  <NavLink to={`/home/topMovies/${item.id}`}>
                    <img
                      onClick={() => handleImdbMovie(item.id)}
                      src={item.image}
                      alt=""
                      className="hover:scale-105 transition transform duration-300 ease-in-out w-5/5 h-80 object-cover"
                    />
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center text-center">
          <div
            className="animate-spin inline-block size-24 mt-24 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          ></div>
        </div>
      )}
    </div>
  );
}
export default Homepage;
