import React, { useContext } from "react";
import Layout from "./components/signinFolder/Layout";
import Register from "./components/signinFolder/Register";
import { homeContext } from "./components/homepageLayout/HomeLayout";
function App() {
  const { accountName, Loader } = useContext(homeContext);
  return (
    <>
      {accountName ? (
        <>
          <Register />
          <Layout />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
