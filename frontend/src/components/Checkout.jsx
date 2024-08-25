import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { User, token } = useStateContext();
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/login");
    }
  }, []);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("CartItems")) || [];
    const fetchProductDetails = async () => {
      const updatedCart = await Promise.all(
        storedItems.map(async (item) => {
          const response = await axios.get(
            `http://localhost:8000/api/singleitem/${item.id}`
          );
          return {
            ...response.data.product,
            color: item.color,
            size: item.size,
            quantity: 1,
          };
        })
      );
      setCartItems(updatedCart);

      // Initialize quantities state with item ids, colors, and sizes and default quantity of 1
      setQuantities(
        updatedCart.reduce((acc, item) => {
          const key = `${item.id}-${item.color}-${item.size}`;
          acc[key] = 1;
          return acc;
        }, {})
      );
    };
    fetchProductDetails();
  }, []);

  const handleQuantityChange = (item, delta) => {
    const key = `${item.id}-${item.color}-${item.size}`;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [key]: Math.max(1, (prevQuantities[key] || 1) + delta),
    }));
  };

  const handleDelete = (item) => {
    const key = `${item.id}-${item.color}-${item.size}`;
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => {
        const cartKey = `${cartItem.id}-${cartItem.color}-${cartItem.size}`;
        return cartKey !== key;
      })
    );
    setQuantities((prevQuantities) => {
      const { [key]: _, ...newQuantities } = prevQuantities;
      return newQuantities;
    });
    const updatedLocalStorage = JSON.parse(
      localStorage.getItem("CartItems")
    ).filter(
      (cartItem) =>
        cartItem.id !== item.id ||
        cartItem.color !== item.color ||
        cartItem.size !== item.size
    );
    localStorage.setItem("CartItems", JSON.stringify(updatedLocalStorage));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {cartItems.map((item) => {
        const key = `${item.id}-${item.color}-${item.size}`;
        return (
          <div
            key={key}
            className="flex items-center mb-4 bg-white p-4 rounded-lg shadow-md"
          >
            <img
              className="w-24 h-24 object-cover rounded-md mr-4"
              src={`http://localhost:8000/storage/${item.thumbnail}`} // Ensure the image URL is correctly formatted
              alt={item.title}
              onError={(e) => (e.target.src = "default-image-url.jpg")} // Optional: Fallback image
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600">Color: {item.color}</p>
              <p className="text-sm text-gray-600">Size: {item.size}</p>
              <div className="flex items-center mt-2">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full"
                  onClick={() => handleQuantityChange(item, -1)}
                >
                  -
                </button>
                <span className="px-4 text-lg font-semibold">
                  {quantities[key] || 1}
                </span>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-800">${item.price}</p>
            <button
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-full"
              onClick={() => handleDelete(item)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button className="mt-4 px-6 py-2 bg-black text-white font-bold rounded-lg shadow hover:bg-gray-800 transition-colors duration-300 ease-in-out">
        Proseed
      </button>
    </div>
  );
};

export default Checkout;
