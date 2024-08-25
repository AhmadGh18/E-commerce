import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const Guest = () => {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Guest;
