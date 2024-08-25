import React, { useEffect, useState } from "react";
import { FaEye, FaMedal } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

const Signup = () => {
  const [showForm, setShowForm] = useState(false);
  const { token, setToken, setUser } = useStateContext();
  const [isPassword, setispasword] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",

    email: "",
    password: "",
    password_confirmation: "",
  });
  const changeType = () => {
    setispasword(!isPassword);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 100); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axiosClient
        .post("/register", formData)
        .then((data) => {
          console.log(data);
          setUser(data.data.user);
          setToken(data.data.token);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error);
        });
    } catch (error) {
      setError(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div
      className={`bg-gray-50  font-sans transition-opacity duration-1000 ${
        showForm ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-4 md:p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold m-6 md:m-0">
              Log in
            </h2>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <div className="relative flex justify-between flex-row w-full gap-2">
                  <div className="w-[50%]">
                    <label className="font-semibold text-sm mb-2 block">
                      First Name
                    </label>
                    <input
                      id="username"
                      name="first_name"
                      type="text"
                      required
                      onChange={handleChange}
                      aria-required="true"
                      className=" text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter user name"
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="font-semibold text-sm mb-2 block">
                      Last Name
                    </label>
                    <input
                      id="username"
                      name="last_name"
                      type="text"
                      required
                      onChange={handleChange}
                      aria-required="true"
                      className=" text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter user name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="font-semibold text-sm mb-2 block"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    aria-required="true"
                    className="w-full text-gray-800 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter valid email"
                  />
                  <MdEmail className="w-4 h-4 absolute right-4 cursor-pointer" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-semibold text-sm mb-2 block"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={isPassword ? "password" : "text"}
                    required
                    onChange={handleChange}
                    aria-required="true"
                    className="w-full text-gray-800 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter password"
                  />
                  <FaEye
                    className="w-4 h-4 absolute right-4 cursor-pointer text-gray-700"
                    onClick={changeType}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-semibold text-sm mb-2 block"
                >
                  Repeat Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password_confirmation"
                    onChange={handleChange}
                    type={isPassword ? "password" : "text"}
                    required
                    aria-required="true"
                    className="w-full text-gray-800 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter password"
                  />
                  <FaEye
                    className="w-4 h-4 absolute right-4 cursor-pointer text-gray-700"
                    onClick={changeType}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-black hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-medium tracking-wide text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className="relative flex items-center justify-center mt-3 w-full py-3 text-sm font-medium tracking-wide bg-white rounded-lg hover:bg-black outline-none ring-1 ring-black hover:text-white transition-all duration-300"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="absolute left-3 w-6"
                    alt="Google logo"
                  />
                  <span className="ml-8">Continue with Google</span>
                </button>
              </div>

              <p className="text-gray-800 text-sm !mt-8 text-center">
                Already have an account?{" "}
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
