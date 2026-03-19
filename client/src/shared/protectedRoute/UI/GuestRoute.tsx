import { useContext } from "react";
import { AuthContext } from "../../../pages/login/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("AuthProvider missing");
  const { authLogin } = ctxt;

  if (authLogin) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
};

export default GuestRoute;
