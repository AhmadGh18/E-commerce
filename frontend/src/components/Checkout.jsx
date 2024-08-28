import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient"; // Ensure this is correctly configured
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Checkout = () => {
  const { token } = useStateContext();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/");
    }
  }, []);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const storedItems = JSON.parse(localStorage.getItem("CartItems")) || [];

      try {
        const updatedCart = await Promise.all(
          storedItems.map(async (item) => {
            try {
              const response = await axiosClient.get(`/singleitem/${item.id}`);
              return {
                ...response.data.product,
                color: item.color,
                size: item.size,
                quantity:
                  quantities[`${item.id}-${item.color}-${item.size}`] || 1,
              };
            } catch (error) {
              console.error("API Error:", error);
              return null; // Handle error by returning null
            }
          })
        );

        const validCart = updatedCart.filter((item) => item !== null);
        setCartItems(validCart);

        // Initialize quantities state
        setQuantities(
          validCart.reduce((acc, item) => {
            const key = `${item.id}-${item.color}-${item.size}`;
            acc[key] = acc[key] || 1; // Ensure initial quantity is 1 if not set
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  const handleQuantityChange = (item, delta) => {
    const key = `${item.id}-${item.color}-${item.size}`;
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(1, (prevQuantities[key] || 1) + delta);
      return {
        ...prevQuantities,
        [key]: newQuantity,
      };
    });
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
  const handleClick = () => {
    // Combine cartItems and quantities to create the new structure
    const updatedItems = cartItems.map((item) => {
      const key = `${item.id}-${item.color}-${item.size}`;
      return {
        product_id: item.id,
        color: item.color,
        price: item.price,
        size: item.size,
        quantity: quantities[key] || 1,
      };
    });

    // Save to local storage
    localStorage.setItem("UpdatedCartItems", JSON.stringify(updatedItems));
    nav("/map");
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
      <button
        onClick={handleClick}
        className="mt-4 px-6 py-2 bg-black text-white font-bold rounded-lg shadow hover:bg-gray-800 transition-colors duration-300 ease-in-out"
      >
        Proceed
      </button>
    </div>
  );
};

export default Checkout;
