import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axiosClient from "./axiosClient";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import SingleProduct from "./components/SingleProduct";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminMain from "./components/Admin/AdminMain";
import PersonalInfo from "./components/Admin/PersonalInfo";
import AdminSide from "./components/Admin/AdminSide";
import ManageItems from "./components/Admin/ManageItems";
import ManageOrders from "./components/Admin/ManageOrders";
import { useStateContext } from "./context/ContextProvider";
import Map from "./components/Map";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Sucess from "./Sucess";
import EditItems from "./components/Admin/EditItems";
import EditSingle from "./components/Admin/EditSingle";
import SingleOrder from "./components/Admin/SingleOrder";
function App() {
  const { token, setUser } = useStateContext();
  useEffect(() => {
    axiosClient.get("/user").then((data) => {
      setUser(data.data);
      console.log(data);
    });
  }, [token]);

  return (
    <div>
      <>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/singleProduct" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/map" element={<Map />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/AdminMain" element={<AdminMain />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<Sucess />} />

          <Route path="/adminside" element={<AdminSide />}>
            <Route path="manage-items" element={<ManageItems />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="userInfo" element={<PersonalInfo />} />
            <Route path="dashboard" element={<AdminMain />} />
            <Route path="EditItems" element={<EditItems />} />
            <Route path="editsingleItem/:id" element={<EditSingle />} />
            <Route path="singleorder/:id" element={<SingleOrder />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
