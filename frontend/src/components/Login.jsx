import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

const Login = () => {
  const { user, token, setToken, setUser } = useStateContext();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 100); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);
  console.log(user);
  const [error, setError] = useState();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axiosClient
        .post("/login", formData)
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home if token is present
    }
  }, [token, navigate]); // Include navigate in depend

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
            {error && (
              <p className="text-red-600 flex justify-center">{error}</p>
            )}
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="font-semibold text-sm mb-2 block"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    id="username"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
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
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required
                    aria-required="true"
                    className="w-full text-gray-800 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    aria-hidden="true"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
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
                  type="submit"
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
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
