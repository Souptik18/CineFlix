import React, { useContext, useEffect, useMemo, useState } from "react";
import { homeContext } from "./HomeLayout";
import { nanoid } from "@reduxjs/toolkit";
import { ID } from "appwrite";
import { account, databases } from "../../appwrite/config";
import { ToastContainer } from "react-toastify";

function MovieDetails() {
  const { checkRef, ContentLoader, emailName, toast, ToastContainer, Bounce } =
    useContext(homeContext);
  const [detail, setDetail] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const arr = checkRef.current || [];
      const movieID = arr[arr.length - 1];

      const url = `http://www.omdbapi.com/?i=${movieID}&plot=full&apikey=ab0f82b6`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("Response data:", data);
        setDetail(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchDetails();
  }, [checkRef]);

  // console.log(emailName);
  // console.log(checkRef);

  const handleAddFav = async () => {
    setFavourite((prevFavourite) => !prevFavourite);
    const arr = checkRef.current;
    const movieID = arr[arr.length - 1];
    let newFavs;
    if (!favourite) {
      newFavs = [...favs, movieID];
      setFavs(newFavs);
      try {
        const documentId = ID.unique();
        const data = await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          documentId,
          { email: emailName, imdbIDs: newFavs }
        );
        toast.success("Movie added to favourites", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        // console.log(data);
      } catch (error) {
        console.log("error chill", error);
      }
    } else {
      newFavs = favs.filter((id) => id !== movieID);
      setFavs(newFavs);
    }
  };

  // console.log(favs);

  return (
    <>
      {detail ? (
        <div className="mx-auto max-w-7xl px-2 md:px-4 flex-col justify-center items-center h-screen">
          <div className="bg-slate-200 p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold mb-4">
              {detail.Title}
              <span
                className="float-right cursor-pointer"
                onClick={(e) => handleAddFav(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${favourite ? "red" : "white"}`}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold"> Plot: </span>
              {detail.Plot || "No Result"}
            </div>
            <div>
              <span className="font-bold">Year: </span>
              {detail.Year || "No Result"}
            </div>
            <div>
              <span className="font-bold">Rated: </span>
              {detail.Rated || "No Result"}
            </div>
            <div>
              <span className="font-bold">Released: </span>
              {detail.Released || "No Result"}
            </div>
            <div>
              <span className="font-bold">Runtime: </span>
              {detail.Runtime || "No Result"}
            </div>
            <div>
              <span className="font-bold">Genre: </span>
              {detail.Genre || "No Result"}
            </div>
            <div>
              <span className="font-bold">Director: </span>
              {detail.Director || "No Result"}
            </div>
            <div>
              <span className="font-bold">Writer: </span>
              {detail.Writer || "No Result"}
            </div>
            <div>
              <span className="font-bold">Actors: </span>
              {detail.Actors || "No Result"}
            </div>
            <div>
              <span className="font-bold">Language: </span>
              {detail.Language || "No Result"}
            </div>
            <div>
              <span className="font-bold">Country: </span>
              {detail.Country || "No Result"}
            </div>
            <div>
              <span className="font-bold">Awards: </span>
              {detail.Awards || "No Result"}
            </div>
            {detail.Ratings.map((rating) => (
              <div key={nanoid()} className="mt-2">
                <div className="font-bold">
                  Source - {rating.Source || "No Result"}
                </div>
                <div className="text-gray-700">
                  Value - {rating.Value || "No Result"}
                </div>
              </div>
            ))}
            <center>
              <img
                src={detail.Poster || ""}
                alt={detail.Title || "Poster not available"}
                className="flex mt-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 text-center"
              />
            </center>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <>
          {
            <div className="flex h-screen justify-center items-center">
              <div className="text-center">
                <div>{ContentLoader()}</div>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
}

export default MovieDetails;
