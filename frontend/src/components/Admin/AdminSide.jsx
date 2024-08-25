import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const AdminSide = () => {
  const { User } = useStateContext();
  const [loading, setLoading] = useState(true); // Loading state
  const nav = useNavigate();

  useEffect(() => {
    if (User.type) {
      setLoading(false); // Data is loaded
      if (User.type !== "admin") {
        nav("/"); // Redirect if not admin
        console.log(User.type);
      }
    }
  }, [User, nav]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while waiting for User data
  }

  return (
    <div>
      <SideBar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSide;
