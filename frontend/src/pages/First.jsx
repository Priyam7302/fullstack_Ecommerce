import React from "react";
import { Outlet } from "react-router-dom";
import HeaderSwitcher from "../components/HeaderSwitcher";
import Footer from "../components/Footer";

function First() {
  return (
    <div>
      <HeaderSwitcher />
      <Outlet />
      <Footer />
    </div>
  );
}

export default First;
