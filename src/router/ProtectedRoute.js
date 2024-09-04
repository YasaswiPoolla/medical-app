import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ children }) => {
  const storedData = JSON.parse(secureLocalStorage.getItem("reactlocal"));
  const isAuthenticated = () => {
    if (storedData?.headers?.token) {
      return true;
    } else {
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
