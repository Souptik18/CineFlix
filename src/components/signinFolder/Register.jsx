import React, { useEffect, useState } from "react";
import loginPic from "../images/loginPic.jpg";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { account } from "../../appwrite/config";
import { redirect } from "react-router-dom";
import { ID } from "appwrite";
function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(account);
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    Register();
  };
  const Register = async () => {
    try {
      let response = await account.create(ID.unique(), email, password, name);

      var session = await account.createEmailPasswordSession(email, password);
      const checkSession = await account.getSession("current");
      console.log(session);
      if (checkSession) {
        setTimeout(() => navigate("/home"), 2000);
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      let response = await account.createOAuth2Session(
        "google",
        "http://localhost:5173/home",
        "http://localhost:5173/fail"
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginPic})` }}
      className="bg-slate-400 flex justify-center items-center h-screen"
    >
      <div className="w-full max-w-md">
        <form
          style={{ boxShadow: "0 0 8px 0 orange, 0 5px 10px 0 yellow" }}
          className="bg-slate-500 shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4 text-white">Register</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emailID"
            >
              Email
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emailID"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Enter Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className=" absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="mt-4  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <br />
          <hr className="border-1 bg-slate-200 " />
          <div class=" space-y-3 mt-10">
            <button
              onClick={() => handleGoogleAuth()}
              type="button"
              class="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span class="mr-2 inline-block">
                <svg
                  class="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </form>
        <p className="text-white font-extralight">
          Already a User?{" "}
          <button onClick={() => navigate("/login")}>Log In</button>
        </p>
      </div>
    </div>
  );
}

export default Register;
