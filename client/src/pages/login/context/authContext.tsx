import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import IauthContext from "../interface/authContextInterface.ts";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext<IauthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authLogin, setAuthLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  const ctrl = new AbortController();

  const profileReq = async () => {
    const data = await axios
      .get("http://localhost:4996/api/user/profile", {
        withCredentials: true,
        signal: ctrl.signal,
      })
      .then((res) => {
        if (cancelled) return;
        setLoading(false);
        setAuthLogin(true);
        setEmail(res.data.user.email);
        console.log("Auth Cont finished");
      })
      .catch((err) => {
        console.log("AUTH ERR: ", err);
        if (cancelled) return;
        setAuthLogin(false);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
  };

  useEffect(() => {
    profileReq();
    return () => {
      ctrl.abort();
      setCancelled(true);
    };
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ authLogin, setAuthLogin, email, setEmail }}
      >
        {loading ? <h1>Loading authentication ....</h1> : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
