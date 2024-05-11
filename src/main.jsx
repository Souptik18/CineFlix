import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/signinFolder/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Homepage from "./components/homepageLayout/Homepage.jsx";
import Contact from "./components/homepageLayout/Contact.jsx";
import MyFavouritesPage from "./components/homepageLayout/MyFavouritesPage.jsx";
import themeReducer from "../src/features/DarkTheme/ThemeSlice.jsx";
import HomeLayout from "./components/homepageLayout/HomeLayout.jsx";
import Register from "./components/signinFolder/Register.jsx";
import MovieDetails from "./components/homepageLayout/MovieDetails.jsx";
import TopMovies from "./components/homepageLayout/TopMovies.jsx";
const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "movie/:i",
        element: <MovieDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "topMovies/:i",
        element: <TopMovies />,
      },
      {
        path: "favourites",
        element: <MyFavouritesPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
