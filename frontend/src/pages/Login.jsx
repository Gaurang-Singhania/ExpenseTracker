import React, { useState } from "react";
import { createUser, loginUser } from "../Api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import login from "../assets/login-image.avif";
import Sidebar from "../components/SideBar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [cookies, setCookie] = useCookies();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username")?.value;

    try {
      if (isLogin) {
        const response = await loginUser(email, password);

        if (response.status === "success") {
          const userData = response.data;
          setCookie("userId", userData);
          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/dashboard", { replace: true });
        } else {
          toast.error("Invalid email or password. Please try again!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        const response = await createUser(username, email, password);
        if (response.status === "success") {
          const userData = response.data;
          setCookie("userId", userData);
          toast.success("Registration successful! You can now log in.");
          toggleForm(); // Automatically switch to login form after successful registration
        } else {
          toast.error("Registration failed. Please try again!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div>
        <Sidebar />
      </div>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex justify-center mb-8">
            <h4 className="text-black text-xl font-bold">Login/Register</h4>
          </div>
          <img src={login} alt="Expense Tracker" className="w-full" />
          <form onSubmit={handleSubmit} className="mt-6">
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-lg font-bold text-gray-700 mb-3 flex justify-between">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <div
                className="text-lg text-black mb-3 "
                onClick={toggleForm}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 w-full rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-500"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
