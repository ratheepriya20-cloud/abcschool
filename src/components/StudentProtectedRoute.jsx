import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const STUDENT_SESSION_KEY = "abpsStudentSession";

const StudentProtectedRoute = ({ children }) => {
  const location = useLocation();

  let session = null;

  try {
    const savedSession = localStorage.getItem(STUDENT_SESSION_KEY);

    if (savedSession) {
      session = JSON.parse(savedSession);
    }
  } catch (error) {
    console.error("Student session read error:", error);

    localStorage.removeItem(STUDENT_SESSION_KEY);
  }

  // Student login nahi hai
  if (!session) {
    return (
      <Navigate
        to="/student/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // Galat role
  if (session.role !== "student") {
    localStorage.removeItem(STUDENT_SESSION_KEY);

    return (
      <Navigate
        to="/student/login"
        replace
      />
    );
  }

  // Inactive student
  if (
    session.status &&
    session.status !== "Active"
  ) {
    localStorage.removeItem(STUDENT_SESSION_KEY);

    return (
      <Navigate
        to="/student/login"
        replace
        state={{
          accountInactive: true,
        }}
      />
    );
  }

  return children;
};

export default StudentProtectedRoute;