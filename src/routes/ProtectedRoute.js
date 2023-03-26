import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import UserState from "../context/UserState";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(UserState);

  if (state.authPending) return <div className="flex flex-col items-center justify-center h-screen"><Loader color='bg-purple-500' /></div>;

  if (!state.isPersisted) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
