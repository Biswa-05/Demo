import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ authUser, children }) {
  const location = useLocation();

  if (!authUser) {
    // User is not logged in -> redirect to /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in -> allow access
  return children;
}
