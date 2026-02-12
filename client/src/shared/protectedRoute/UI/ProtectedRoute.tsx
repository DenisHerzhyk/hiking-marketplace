import React from "react";
import { Navigate } from "react-router-dom";
import IProtected from "../interface/ProtectedInterface.ts";

const ProtectedRoute = ({ children, isLoggedIn }: IProtected) => {
  if (!isLoggedIn) {
    <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
