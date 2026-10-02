import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PARENT_SESSION_KEY = "abpsParentSession";

const ParentProtectedRoute = ({ children }) => {
  const location = useLocation();

  let session = null;

  try {
    const savedSession = localStorage.getItem(PARENT_SESSION_KEY);

    if (savedSession) {
      session = JSON.parse(savedSession);
    }
  } catch (error) {
    console.error("Parent session read error:", error);

    localStorage.removeItem(PARENT_SESSION_KEY);
  }

  // Login nahi hai
  if (!session) {
    return (
      <Navigate
        to="/parent/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // Galat role ki session hai
  if (session.role !== "parent") {
    localStorage.removeItem(PARENT_SESSION_KEY);

    return (
      <Navigate
        to="/parent/login"
        replace
      />
    );
  }

  // Inactive parent ko dashboard access nahi
  if (
    session.status &&
    session.status !== "Active"
  ) {
    localStorage.removeItem(PARENT_SESSION_KEY);

    return (
      <Navigate
        to="/parent/login"
        replace
        state={{
          accountInactive: true,
        }}
      />
    );
  }

  return children;
};

export default ParentProtectedRoute;