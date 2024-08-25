import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGreaterThan, FaChevronDown, FaShoppingCart } from "react-icons/fa";
import AllItems from "./AllItems";

const Shop = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [shoppingCarr, setShoppingCart] = useState(
    window.localStorage.getItem("CartItems")
  );

  // Function to clear all filters
  const clearFilters = () => {
    setGender("");
    setAge("");
    setCategory("");
    setPrice("");
    setSearch("");
  };

  // UseEffect to trigger data refetch on filter change
  useEffect(() => {
    // Assuming `AllItems` fetches data based on filters and search term
  }, [gender, age, category, price, search]);

  const filters = { gender, age, category, price, search };

  return (
    <div className="relative z-0">
      {/* Header */}
      <div className="h-[20vh] bg-gray-100 flex items-center font-title z-0">
        <div className="md:ml-[100px] text-lg flex flex-col ml-10 z-0">
          <p className="text-3xl mb-1">Shop</p>
          <div className="flex items-center space-x-2 text-gray-600 z-0">
            <Link to="/" className="underline">
              Home
            </Link>
            <FaGreaterThan className="text-xs" />
            <span>Shop</span>
          </div>
        </div>
      </div>
      <center>
        <div className="flex items-center justify-center p-5">
          <div className="rounded-lg bg-gray-300 p-5">
            <div className="flex">
              <div className="flex w-20 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="pointer-events-none absolute w-5 fill-gray-500 transition"
                >
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-[400px] bg-white pl-2 text-base font-semibold outline-0"
                placeholder="Search"
              />
              <input
                type="button"
                value="Search"
                onClick={() => {
                  /* Trigger search/filter */
                }}
                className="bg-black p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-gray-700 transition-colors"
              />
            </div>
          </div>
        </div>
      </center>
      <div className="flex mr-10 ml-10 flex-col md:flex-row">
        <div className="w-[200px] p-4 space-y-4 bg-white border-r border-gray-300 mt-4">
          {/* Gender Filter */}
          <details className="border rounded-lg w-full border-none p-2 transition-all">
            <summary className="font-semibold text-xl cursor-pointer list-none text-gray-700 flex items-center justify-between text-left">
              <span>Gender</span>
              <span className="mr-2 transform transition-transform duration-300">
                <FaChevronDown className="text-black" />
              </span>
            </summary>
            <div className="mt-3 text-gray-600 text-left p-0">
              <ul className="ml-0 pl-0 mt-3 list-none space-y-2">
                <li className="text-left">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={() => setGender("Male")}
                  />{" "}
                  Male
                </li>
                <li className="text-left">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={() => setGender("Female")}
                  />{" "}
                  Female
                </li>
              </ul>
            </div>
          </details>

          {/* Age Filter */}
          <details className="border rounded-lg w-full border-none p-2 transition-all">
            <summary className="font-semibold text-xl cursor-pointer list-none text-gray-700 flex items-center justify-between text-left">
              <span>Age</span>
              <span className="mr-2 transform transition-transform duration-300">
                <FaChevronDown className="text-black" />
              </span>
            </summary>
            <div className="mt-3 text-gray-600 text-left p-0">
              <ul className="ml-0 pl-0 mt-3 list-none space-y-2">
                <li className="text-left">
                  <input
                    type="radio"
                    name="age"
                    value="Kids"
                    checked={age === "Kids"}
                    onChange={() => setAge("Kids")}
                  />{" "}
                  Kids
                </li>
                <li className="text-left">
                  <input
                    type="radio"
                    name="age"
                    value="Adults"
                    checked={age === "Adults"}
                    onChange={() => setAge("Adults")}
                  />{" "}
                  Adults
                </li>
              </ul>
            </div>
          </details>

          {/* Categories Filter */}
          <details className="border rounded-lg w-full border-none p-2 transition-all">
            <summary className="font-semibold text-xl cursor-pointer list-none text-gray-700 flex items-center justify-between text-left">
              <span>Categories</span>
              <span className="mr-2 transform transition-transform duration-300">
                <FaChevronDown className="text-black" />
              </span>
            </summary>
            <div className="mt-3 text-gray-600 text-left p-0">
              <ul className="ml-0 pl-0 mt-3 list-none space-y-2">
                <li className="text-left">
                  <input
                    type="radio"
                    name="category"
                    value="1" // Adjust according to your category IDs
                    checked={category === "1"}
                    onChange={() => setCategory("1")}
                  />{" "}
                  Clothing
                </li>
                <li className="text-left">
                  <input
                    type="radio"
                    name="category"
                    value="2" // Adjust according to your category IDs
                    checked={category === "2"}
                    onChange={() => setCategory("2")}
                  />{" "}
                  Accessories
                </li>
              </ul>
            </div>
          </details>

          {/* Price Filter */}
          <details className="border rounded-lg w-full border-none p-2 transition-all">
            <summary className="font-semibold text-xl cursor-pointer list-none text-gray-700 flex items-center justify-between text-left">
              <span>Price</span>
              <span className="mr-2 transform transition-transform duration-300">
                <FaChevronDown className="text-black" />
              </span>
            </summary>
            <div className="mt-3 text-gray-600 text-left p-0">
              <ul className="ml-0 pl-0 mt-3 list-none space-y-2">
                <li className="text-left">
                  <input
                    type="radio"
                    name="price"
                    value="0-50"
                    checked={price === "0-50"}
                    onChange={() => setPrice("0-50")}
                  />{" "}
                  $0 - $50
                </li>
                <li className="text-left">
                  <input
                    type="radio"
                    name="price"
                    value="51+"
                    checked={price === "51+"}
                    onChange={() => setPrice("51+")}
                  />{" "}
                  $50+
                </li>
              </ul>
            </div>
          </details>

          {/* Clear Filters Button */}

          <button
            onClick={clearFilters}
            className="w-full mt-4 bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
        <div className="w-full md:w-[calc(100%-200px)] p-4">
          {/* Filtered Results */}
          <AllItems filters={filters} />
        </div>
        {shoppingCarr && (
          <Link to="/checkout">
            <div className="fixed h-[60px] w-[60px] bg-black text-white right-10 bottom-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 cursor-pointer transition-all duration-300">
              <FaShoppingCart className="w-8 h-8" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Shop;
