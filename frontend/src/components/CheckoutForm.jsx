import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const CheckoutForm = () => {
  const { User } = useStateContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [uid, setuserId] = useState(null);
  useEffect(() => {
    if (User && User.id) {
      setuserId(User.id);
    }
  }, [User]);

  const [location, setUserLocation] = useState(
    JSON.parse(localStorage.getItem("UserLocation"))
  );
  console.log(location);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("UpdatedCartItems"))
  );

  useEffect(() => {
    const calculateFinalPrice = () => {
      const cartItems =
        JSON.parse(localStorage.getItem("UpdatedCartItems")) || [];
      const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity, 10);
        return total + price * quantity;
      }, 0);
      setFinalPrice(totalPrice);
    };

    calculateFinalPrice();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosClient.post("/payment", {
        payment_method_id: paymentMethod.id,
        amount: finalPrice, /// here was *100
        total_price: finalPrice,
        longitude: location.longitude,
        latitude: location.latitude,
        city: location.city,
        cartItems: cartItems,
        user_id: uid,
      });

      if (response.data.success) {
        setSuccess(true);

        localStorage.removeItem("UpdatedCartItems");
        localStorage.removeItem("CartItems");

        window.location.href = "/payment-success";
      } else {
        setError(response.data.message || "Payment failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p>Your total is ${finalPrice.toFixed(2)}</p>
      {success && <p className="text-green-500 mb-4">Payment successful!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="border rounded-lg p-3 bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
