import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserState from "../context/UserState";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(UserState);

  if (state.authPending) return <h5>Loading...</h5>;

  if (!state.isPersisted) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
