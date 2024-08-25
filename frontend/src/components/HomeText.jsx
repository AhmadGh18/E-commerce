import React, { useEffect, useState } from "react";
import model from "../assets/images/pexels-frendsmans-1926769-removebg-preview.png";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeText = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Delay for fade-in

    return () => clearTimeout(timer); // Clean up timeout on component unmount
  }, []);
  const nav = useNavigate();
  const change = () => {
    nav("/shop");
  };
  return (
    <div>
      <div className="h-[90vh] flex flex-col md:flex-row items-center justify-evenly">
        <div className="flex flex-col text-center md:text-left px-4 md:px-0 items-center md:items-start mt-[-100px]">
          <h6 className="text-red-600 uppercase text-base md:text-lg tracking-wide leading-tight mb-3">
            Summer Collection
          </h6>
          <h1 className="text-3xl md:text-5xl tracking-wide leading-snug font-title mb-4">
            Fall - Winter <br />
            Collection 2025
          </h1>
          <p className="text-sm md:text-base tracking-wide leading-relaxed mb-4">
            A great place to buy clothes for all genders <br />
            and all sizes starting from 2$
          </p>
          <button
            onClick={change}
            className="bg-black text-white w-[120px] md:w-[140px] h-12 mt-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-800 transition duration-300"
          >
            <span>Shop Now</span>
            <FaArrowRight className="text-white text-lg" />
          </button>
        </div>
        <div className="hidden md:block">
          <img
            src={model}
            className={`w-auto h-[80%] transition-opacity duration-700 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            alt="Fall - Winter Collection"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeText;
