import { createContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { account } from "../../appwrite/config";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader/pageLoader/Loader";
import ContentLoader from "../loader/contentLoader/LoaderContent";

export const homeContext = createContext({
  toast,
  ToastContainer,
  Bounce,
  Loader,
  ContentLoader,
  setaccountName: () => {},
  checkRef: [],
  imdbMovie: null,
});
function HomeLayout() {
  const [accountName, setaccountName] = useState();
  const [emailName, setEmailName] = useState("");
  const checkRef = useRef([]);
  const imdbMovie = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    // console.log(accountName);
    // console.log(emailName);
    isLoggedIn();
  }, [accountName, emailName]);

  const isLoggedIn = async () => {
    try {
      const signedIntoAccount = await account.get("current");
      setaccountName(signedIntoAccount.name);
      setEmailName(signedIntoAccount.email);
    } catch (error) {
      console.log("Authentication error:", error);
      navigate("/login");
    }
  };

  return (
    <homeContext.Provider
      value={{
        toast,
        ToastContainer,
        Bounce,
        Loader,
        ContentLoader,
        emailName,
        setaccountName,
        accountName,
        isLoggedIn,
        checkRef,
        imdbMovie,
      }}
    >
      {accountName ? (
        <>
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
        </>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <div className="text-center">
            <Loader />
          </div>
        </div>
      )}
    </homeContext.Provider>
  );
}

export default HomeLayout;
