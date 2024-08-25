import React from "react";
import SingleOffer from "./SingleOffer";
import imgClot from "../assets/images/shoe.png";
import img from "../assets/images/01887450250-a1.jpg";
const AvailableOffers = () => {
  return (
    <div className="">
      <SingleOffer
        title="Clothes"
        description="Collection 2024-2025"
        img={img}
      />
      <SingleOffer
        reverse={true}
        title="Shoes"
        description="for Everyone"
        img={imgClot}
      />
    </div>
  );
};

export default AvailableOffers;
