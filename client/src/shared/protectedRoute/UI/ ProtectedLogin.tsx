import React, { createContext, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import IProtected from "../interface/ProtectedInterface.ts";
import { AuthContext } from "../../../pages/login/context/authContext.tsx";

const ProtectedLogin = ({ children }: IProtected) => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;
  if (!authLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLogin;
