import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGraduationCap,
} from "react-icons/fa";

import {
  loginUser,
  getSession,
  logoutUser,
  ROLES,
} from "../../data/authData";

import "./AdminLogin.css";


const AdminLogin = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  // =========================================================
  // STATES
  // =========================================================

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    popup,
    setPopup,
  ] = useState({
    show: false,
    type: "",
    message: "",
  });


  // =========================================================
  // SHOW MESSAGE
  // =========================================================

  const showMessage = (
    type,
    message
  ) => {

    setPopup({
      show: true,
      type,
      message,
    });

    window.setTimeout(
      () => {

        setPopup({
          show: false,
          type: "",
          message: "",
        });

      },
      3000
    );
  };


  // =========================================================
  // REDIRECT ACCORDING TO ROLE
  // =========================================================

  const redirectByRole = (
    session
  ) => {

    if (!session) {
      return;
    }


    // =======================================================
    // SUPER ADMIN
    // =======================================================

    if (
      session.role ===
      ROLES.SUPER_ADMIN
    ) {

      navigate(
        "/admin/super",
        {
          replace: true,
        }
      );

      return;
    }


    // =======================================================
    // SUB ADMIN
    // =======================================================

    if (
      session.role ===
      ROLES.SUB_ADMIN
    ) {

      navigate(
        "/admin/sub",
        {
          replace: true,
        }
      );

      return;
    }


    // =======================================================
    // OTHER ROLE
    // =======================================================

    showMessage(
      "error",
      "This account does not have admin access."
    );
  };


  // =========================================================
  // EXISTING SESSION CHECK
  // =========================================================

  useEffect(() => {

    /*
      IMPORTANT:

      Agar ProtectedRoute ne user ko
      wrong admin dashboard se login
      page par bheja hai:

      Super Admin -> /admin/sub
      ya
      Sub Admin -> /admin/super

      tab old session ke basis par
      automatically dashboard open
      nahi karna.
    */

    if (
      location.state?.forceLogin
    ) {

      /*
        Old admin session remove kar do
        taaki user dusre admin account
        se properly login kar sake.
      */

      logoutUser();

      return;
    }


    // Normal /login open hua hai

    const session =
      getSession();


    if (!session) {
      return;
    }


    /*
      Agar already Super Admin login hai
      to Super dashboard.

      Agar already Sub Admin login hai
      to Sub dashboard.
    */

    if (
      session.role ===
        ROLES.SUPER_ADMIN ||
      session.role ===
        ROLES.SUB_ADMIN
    ) {

      redirectByRole(
        session
      );

      return;
    }


  }, [
    location.state,
  ]);


  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = (
    event
  ) => {

    event.preventDefault();


    // =======================================================
    // EMAIL VALIDATION
    // =======================================================

    if (!email.trim()) {

      showMessage(
        "error",
        "Please enter your email address."
      );

      return;
    }


    // =======================================================
    // PASSWORD VALIDATION
    // =======================================================

    if (!password.trim()) {

      showMessage(
        "error",
        "Please enter your password."
      );

      return;
    }


    setLoading(true);


    try {

      // =====================================================
      // REMOVE PREVIOUS ADMIN SESSION
      // =====================================================

      /*
        Bahut important:

        Login button press karne par
        previous Super/Sub session hata do.

        Ab jo credentials enter kiye hain
        wahi new session banayenge.
      */

      logoutUser();


      // =====================================================
      // LOGIN USER
      // =====================================================

      const result =
        loginUser(
          email.trim(),
          password
        );


      console.log(
        "LOGIN RESULT:",
        result
      );


      // =====================================================
      // LOGIN FAILED
      // =====================================================

      if (
        !result ||
        !result.success
      ) {

        showMessage(
          "error",
          result?.message ||
            "Invalid email or password."
        );

        return;
      }


      // =====================================================
      // GET NEW SESSION
      // =====================================================

      const session =
        result.session ||
        getSession();


      if (!session) {

        showMessage(
          "error",
          "Login session could not be created."
        );

        return;
      }


      console.log(
        "NEW ADMIN SESSION:",
        session
      );

      console.log(
        "NEW ADMIN ROLE:",
        session.role
      );


      // =====================================================
      // ONLY ADMIN ROLES ALLOWED
      // =====================================================

      const isAdmin =
        session.role ===
          ROLES.SUPER_ADMIN ||
        session.role ===
          ROLES.SUB_ADMIN;


      if (!isAdmin) {

        /*
          Teacher / Student / Parent /
          Client ko admin portal me
          enter nahi karna.
        */

        logoutUser();


        showMessage(
          "error",
          "This account does not have admin access."
        );

        return;
      }


      // =====================================================
      // SUCCESS
      // =====================================================

      showMessage(
        "success",
        `Welcome ${
          session.name ||
          "Administrator"
        }`
      );


      // =====================================================
      // REDIRECT EXACTLY BY ROLE
      // =====================================================

      window.setTimeout(
        () => {

          /*
            SUPER ADMIN
            role = super-admin
            ↓
            /admin/super

            SUB ADMIN
            role = sub-admin
            ↓
            /admin/sub
          */

          redirectByRole(
            session
          );

        },
        500
      );


    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );


      showMessage(
        "error",
        "Something went wrong. Please try again."
      );


    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="ab-admin-login-page">


      {/* =====================================================
          POPUP
      ===================================================== */}

      {popup.show && (

        <div
          className={
            `ab-admin-login-popup ${popup.type}`
          }
        >

          {popup.type ===
          "success" ? (

            <FaCheckCircle />

          ) : (

            <FaExclamationTriangle />

          )}


          <span>
            {popup.message}
          </span>

        </div>

      )}


      {/* =====================================================
          MAIN LOGIN CONTAINER
      ===================================================== */}

      <div className="ab-admin-login-shell">


        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <section className="ab-admin-login-intro">

          <div className="ab-admin-login-intro-content">


            {/* SCHOOL LOGO */}

            <div className="ab-admin-login-school-logo">

              <FaGraduationCap />

            </div>


            {/* SCHOOL NAME */}

            <span className="ab-admin-login-school-label">

              AB PUBLIC SCHOOL

            </span>


            {/* HEADING */}

            <h1>

              School
              <br />

              Administration

            </h1>


            {/* DESCRIPTION */}

            <p>

              Secure administrative
              access for authorized
              school administrators.

            </p>


            {/* FEATURES */}

            <div className="ab-admin-login-feature-list">


              {/* FEATURE 1 */}

              <div>

                <span>

                  <FaUserShield />

                </span>


                <section>

                  <strong>

                    Role Based Access

                  </strong>


                  <p>

                    Super Admin and
                    Sub Admin accounts
                    receive access
                    according to their
                    assigned role.

                  </p>

                </section>

              </div>


              {/* FEATURE 2 */}

              <div>

                <span>

                  <FaShieldAlt />

                </span>


                <section>

                  <strong>

                    Protected Dashboard

                  </strong>


                  <p>

                    A valid administrator
                    login is required
                    before opening the
                    dashboard.

                  </p>

                </section>

              </div>


            </div>

          </div>


          {/* DECORATION */}

          <div
            className="
              ab-admin-login-shape
              shape-one
            "
          />

          <div
            className="
              ab-admin-login-shape
              shape-two
            "
          />

        </section>


        {/* ===================================================
            RIGHT SIDE LOGIN
        =================================================== */}

        <section className="ab-admin-login-form-area">


          <form
            className="ab-admin-login-card"
            onSubmit={
              handleLogin
            }
          >


            {/* ICON */}

            <div className="ab-admin-login-icon">

              <FaUserShield />

            </div>


            {/* SMALL LABEL */}

            <span className="ab-admin-login-small-label">

              ADMINISTRATIVE ACCESS

            </span>


            {/* TITLE */}

            <h2>

              Admin Login

            </h2>


            {/* DESCRIPTION */}

            <p className="ab-admin-login-description">

              Enter your registered
              Super Admin or Sub Admin
              credentials to continue.

            </p>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="ab-admin-login-field">


              <label
                htmlFor="admin-email"
              >

                Email Address

              </label>


              <div className="ab-admin-login-input">


                <FaEnvelope />


                <input
                  id="admin-email"
                  type="email"

                  value={
                    email
                  }

                  onChange={
                    (event) =>
                      setEmail(
                        event.target.value
                      )
                  }

                  placeholder="Enter admin email"

                  autoComplete="username"

                  disabled={
                    loading
                  }
                />


              </div>

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="ab-admin-login-field">


              <label
                htmlFor="admin-password"
              >

                Password

              </label>


              <div className="ab-admin-login-input">


                <FaLock />


                <input
                  id="admin-password"

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  value={
                    password
                  }

                  onChange={
                    (event) =>
                      setPassword(
                        event.target.value
                      )
                  }

                  placeholder="Enter password"

                  autoComplete="current-password"

                  disabled={
                    loading
                  }
                />


                <button
                  type="button"

                  className="ab-admin-password-toggle"

                  onClick={
                    () =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                  }

                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (

                    <FaEyeSlash />

                  ) : (

                    <FaEye />

                  )}

                </button>


              </div>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"

              className="ab-admin-login-submit"

              disabled={
                loading
              }
            >

              <span>

                {loading
                  ? "Signing In..."
                  : "Sign In to Dashboard"}

              </span>


              {!loading && (

                <FaArrowRight />

              )}

            </button>


            {/* =================================================
                SECURITY MESSAGE
            ================================================= */}

            <div className="ab-admin-login-security">


              <FaShieldAlt />


              <span>

                Only authorized
                Super Admin and
                Sub Admin accounts
                can access the
                administration portal.

              </span>


            </div>


          </form>

        </section>


      </div>

    </div>

  );
};


export default AdminLogin;