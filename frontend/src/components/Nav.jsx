import React, { useState } from "react";
import logo from "../assets/images/event1-1-removebg-preview.png";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { User, setUser } = useStateContext();
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div
      className={`z-100 bg-white navbar flex flex-col md:flex-row justify-around items-center h-16 px-8 font-title font-extralight ${
        isOpen ? "" : "bg-white"
      } md:bg-white transition-colors`}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <img
          className="h-[70px] ml-[-20px]"
          src={logo}
          alt="bites"
          draggable={false}
        />
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <ul
        className={`md:flex bg-white md:items-center md:gap-8 text-lg font-semibold transition-all duration-300 ${
          isOpen
            ? "flex flex-col items-center w-full absolute top-16 left-0 md:static md:bg-white shadow-lg text-black"
            : "opacity-0 translate-y-[-10px] md:opacity-100 md:translate-y-0 md:static  text-black transition-none"
        }`}
      >
        <li>
          <Link
            to="/"
            className={`block px-2 py-1 hover:text-gray-400 ${
              isOpen ? "mt-10" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#about"
            className={`block px-2 py-1 hover:text-gray-400 ${
              isOpen ? "mt-10" : ""
            }`}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={`block px-2 py-1 hover:text-gray-400 ${
              isOpen ? "mt-10" : ""
            }`}
          >
            Contact us
          </a>
        </li>
        <li>
          {User.name ? (
            <span className="capitalize hidden md:block">{User.name}</span>
          ) : (
            <button
              className={`bg-black border text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors ${
                isOpen ? "mt-10 mb-10" : ""
              }`}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
