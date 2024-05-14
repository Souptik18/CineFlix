import React, { useContext, useEffect, useState } from "react";
import { Query } from "appwrite";
import { databases } from "../../appwrite/config";
import { homeContext } from "./HomeLayout";

function MyFavouritesPage() {
  const [favList, setFavList] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [checkFav, setCheckFav] = useState(false);
  const { Loader, emailName, ToastContainer, toast, Bounce } =
    useContext(homeContext);

  useEffect(() => {
    const fetchDB = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [Query.equal("email", [emailName])]
        );
        setFavList(response.documents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDB();
  }, [emailName]);
  // console.log(favList);
  useEffect(() => {
    const fetchList = async () => {
      try {
        const movieData = [];
        for (const item of favList) {
          const docID = item.$id;
          const imdbIDs = item.imdbIDs;
          // console.log(docID);
          if (imdbIDs) {
            for (const id of imdbIDs) {
              const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=ab0f82b6`;
              const response = await fetch(url);
              const data = await response.json();

              const movieWithId = {
                ...data,
                $id: docID,
              };
              movieData.push(movieWithId);
            }
          }
        }
        setFetchedData(movieData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchList();
  }, [favList]);
  // console.log(fetchedData);
  const handleDeleteFav = async (id) => {
    // console.log(id);
    try {
      const response = await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      toast.success("Movie deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // console.log(response);
      setFetchedData((prevData) => prevData.filter((item) => item.$id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(fetchedData);
  useEffect(() => {
    const handleCheckFav = () => {
      if (fetchedData.length > 0) {
        setCheckFav(!checkFav);
      } else {
        setCheckFav(false);
      }
    };
    handleCheckFav();
  }, [fetchedData]);

  return (
    <>
      {fetchedData.length !== 0 ? (
        <div className="h-screen bg-slate-500 ">
          <div className="flex flex-wrap text-center justify-center ">
            {fetchedData.map((item) => {
              return (
                <div
                  key={item.imdbID}
                  className="m-4 text-white relative"
                  onMouseEnter={() => setHoveredMovieId(item.imdbID)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                >
                  <img
                    className="max-w-96 max-h-96 hover:scale-105 transition transform duration-500 ease-in-out"
                    src={item.Poster}
                    alt=""
                  />
                  {hoveredMovieId === item.imdbID && (
                    <span className="absolute bottom-[24px] left-2">
                      <svg
                        className="w-8 h-8 border-2 rounded-2xl bg-slate-200"
                        fill="none"
                        stroke="red"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleDeleteFav(item.$id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  )}
                  <p className="">{item.Title}</p>
                </div>
              );
            })}
          </div>
          <ToastContainer />
        </div>
      ) : (
        <>
          {checkFav ? (
            <div className="flex h-screen justify-center items-center">
              <div className="text-center"> {Loader()}</div>
            </div>
          ) : (
            <div className="text-center text-black mt-20">
              <h1> No Movies Added to Favourites</h1>
              <h4>Search Movies and Add to Favourites</h4>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyFavouritesPage;
