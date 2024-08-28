import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51NI8o1CqAiB6mhcMlOLrkCTKSQ0fCDiS1eRzdjZnTDk5JCBbNItKcYEWaQ3yLHRDRO3U5LkCqqLrdKpDNgf3uZN900T4dhQTuY"
  );

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
