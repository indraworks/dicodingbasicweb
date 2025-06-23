import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  const { user } = useUser();
  //selelu di buang ke page login jika gak authorize!
  return user ? children : <Navigate to="/login" replace />;
};

export default RequiredAuth;
