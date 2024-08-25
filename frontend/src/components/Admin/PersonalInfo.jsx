import React, { useState } from "react";
import axiosClient from "../../axiosClient";

const PersonalInfo = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(FormData);
    axiosClient.post("/updateInfo", FormData).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={handlesubmit}>
          <div className="pt-3">
            <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
              Personal Information
            </label>
          </div>

          <div className="mb-5">
            <label
              htmlFor="pass"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Enter new password"
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pass"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Repeat Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="pass"
              placeholder="Password Confirmation"
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
