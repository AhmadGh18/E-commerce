import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const nav = useNavigate();
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen font-title">
      <div className="bg-white h-[60vh] w-[80%] max-w-md rounded-lg shadow-lg flex items-center justify-center flex-col p-8 mt-[-10px]">
        <div className="text-5xl bg-green-500 w-[80px] h-[80px] flex rounded-full items-center justify-center mb-6">
          <FaCheck className="text-white" />
        </div>
        <h1 className="text-2xl font-title font-bold text-center mb-4">
          Thank you for your order!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your order was placed successfully and will be delivered in 2 days.
        </p>
        <div className="flex space-x-4 w-full">
          <button
            onClick={() => nav("/")}
            className="bg-black text-white py-2 px-4 rounded-lg w-1/2 hover:bg-gray-800 transition duration-300"
          >
            Back to Home Page
          </button>
          <button className="bg-white border border-black text-black font-bold py-2 px-4 rounded-lg w-1/2 hover:bg-gray-100 transition duration-300">
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
