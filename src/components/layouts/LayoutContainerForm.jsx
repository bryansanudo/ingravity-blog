import React from "react";
import { Outlet } from "react-router-dom";

const LayoutContainerForm = () => {
  return (
    <div className="mx-auto px-6 mt-10 max-w-screen-sm ">
      <Outlet />
    </div>
  );
};

export default LayoutContainerForm;
