import React from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  getSession,
} from "../data/authData";

import {
  getLoggedInTeacher,
} from "../data/teacherAuthData";


const ProtectedRoute = ({
  allowedRoles = [],
  children,
}) => {

  const location = useLocation();


  /* =========================================
     TEACHER ROUTE
  ========================================= */

  const isTeacherRoute =
    location.pathname.startsWith(
      "/teacher"
    );


  /* =========================================
     GET SESSION
  ========================================= */

  const session = isTeacherRoute
    ? getLoggedInTeacher()
    : getSession();


  /* =========================================
     NOT LOGGED IN
  ========================================= */

  if (!session) {

    if (isTeacherRoute) {
      return (
        <Navigate
          to="/teacher/login"
          replace
          state={{
            from: location.pathname,
          }}
        />
      );
    }

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }


  /* =========================================
     CHECK ROLE
  ========================================= */

  const hasAccess =
    allowedRoles.length === 0 ||
    allowedRoles.includes(
      session.role
    );


  /* =========================================
     CORRECT ROLE
  ========================================= */

  if (hasAccess) {
    return children;
  }


  /* =========================================
     WRONG ADMIN DASHBOARD

     Super -> /admin/sub = NOT ALLOWED
     Sub   -> /admin/super = NOT ALLOWED
  ========================================= */

  if (
    location.pathname.startsWith(
      "/admin"
    )
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          forceLogin: true,
          accessDenied: true,
        }}
      />
    );
  }


  /* =========================================
     FALLBACK
  ========================================= */

  return (
    <Navigate
      to="/login"
      replace
      state={{
        forceLogin: true,
      }}
    />
  );
};


export default ProtectedRoute;