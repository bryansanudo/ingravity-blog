import React, { useContext } from "react";
import { UserContext } from "@/context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

const LayoutRequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="mx-auto px-6 mt-10">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
