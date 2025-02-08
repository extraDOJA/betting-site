import AuthContext from "@/context/authContext";
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
