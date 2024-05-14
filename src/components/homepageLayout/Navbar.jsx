import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/DarkTheme/ThemeSlice";
import { account } from "../../appwrite/config";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { homeContext } from "./HomeLayout";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkModeEnabled = useSelector((state) => state.theme.darkModeEnabled);
  const { toast, ToastContainer, Bounce, accountName } =
    useContext(homeContext);
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        className={` relative w-full bg-${darkModeEnabled ? "black" : "white"}`}
      >
        <div className=" flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <NavLink to="/home">
              <span
                className={`font-bold ${
                  darkModeEnabled ? "text-white" : "text-black"
                }`}
              >
                CineFlix
              </span>
            </NavLink>
          </div>
          <div className="hidden grow items-start lg:flex">
            <ul className="ml-12 inline-flex space-x-8">
              <li>
                <NavLink
                  to="/home"
                  className={`inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-500 ${
                    darkModeEnabled ? "text-slate-200" : "text-black"
                  }`}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/home/favourites"
                  className={`inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-500 ${
                    darkModeEnabled ? "text-slate-200" : "text-black"
                  }`}
                >
                  Favourites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/contact"
                  className={`inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-500 ${
                    darkModeEnabled ? "text-slate-200" : "text-black"
                  }`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4 lg:block">
            <div>
              <span
                className={`text-gray-800 font-bold ${
                  darkModeEnabled ? "text-slate-200" : "text-black"
                }`}
              >
                {" "}
                {accountName}
              </span>
              <button
                type="button"
                className={`rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                  darkModeEnabled ? "text-slate-200" : "text-black"
                }`}
                onClick={() => dispatch(toggleDarkMode())}
              >
                {`${darkModeEnabled ? "Light" : "Dark"}`} Theme
              </button>
              <button
                type="button"
                className={`${
                  darkModeEnabled ? "text-slate-200" : "text-black"
                } rounded-md border-2 border${
                  darkModeEnabled ? "-green-800" : "-white"
                } px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Navbar;
