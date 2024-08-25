import React, { useEffect, useRef, useState } from "react";

const SingleOffer = ({ reverse = false, title, description, img }) => {
  const offerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !hasAnimated &&
            entry.boundingClientRect.top > 0
          ) {
            entry.target.classList.add("fade-in-up-visible");
            setHasAnimated(true); // Prevent re-animation
          }
        });
      },
      { threshold: 0.4 }
    );

    const current = offerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={offerRef}
      className={`flex flex-col-reverse md:flex-row items-center justify-center font-title font-bold mt-[70px] fade-in-up  ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col font-title">
        <span className="text-3xl md:text-4xl leading-tight tracking-wide text-center md:text-left mr-0 md:mr-12 mt-10">
          {title} <br /> {description}
        </span>
        <p className="mt-10 text-xl uppercase text-red-600 tracking-wide relative inline-block cursor-pointer">
          Shop Now
          <span className="underline-custom"></span>
        </p>
      </div>
      <div className="mt-10 flex justify-center md:mt-0 md:mr-4">
        <img src={img} className="h-[70vh] object-contain" alt="Collection" />
      </div>
    </div>
  );
};

export default SingleOffer;
