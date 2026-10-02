import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaGraduationCap,
  FaUserFriends,
  FaIdCard,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
  FaCalendarCheck,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  loginParent,
  getParentSession,
} from "../../data/parentAuthData";

import "./ParentLogin.css";


const ParentLogin = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();


  const [
    identifier,
    setIdentifier,
  ] = useState(
    location.state?.identifier || ""
  );


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
    title: "",
    message: "",
  });


  /* =======================================================
     ALREADY LOGGED IN
  ======================================================= */

  useEffect(() => {
    const session =
      getParentSession();

    if (
      session?.role === "parent"
    ) {
      navigate(
        "/parent/dashboard",
        {
          replace: true,
        }
      );
    }
  }, [navigate]);


  /* =======================================================
     ACCOUNT CREATED MESSAGE
  ======================================================= */

  useEffect(() => {
    if (
      location.state?.accountCreated
    ) {
      setPopup({
        show: true,

        type:
          "success",

        title:
          "Account Created",

        message:
          "Your Parent Portal account is ready. Login using the password you just created.",
      });


      const timer =
        window.setTimeout(
          () => {
            setPopup({
              show: false,
              type: "",
              title: "",
              message: "",
            });
          },
          3500
        );


      return () =>
        window.clearTimeout(
          timer
        );
    }
  }, [location.state]);


  /* =======================================================
     POPUP
  ======================================================= */

  const showMessage = (
    type,
    title,
    message
  ) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });


    window.setTimeout(
      () => {
        setPopup({
          show: false,
          type: "",
          title: "",
          message: "",
        });
      },
      3200
    );
  };


  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLogin = (
    event
  ) => {
    event.preventDefault();


    if (!identifier.trim()) {
      showMessage(
        "error",
        "Account Required",
        "Please enter your Email Address or Parent ID."
      );

      return;
    }


    if (!password) {
      showMessage(
        "error",
        "Password Required",
        "Please enter your password."
      );

      return;
    }


    setLoading(true);


    const result =
      loginParent(
        identifier,
        password
      );


    if (!result.success) {
      setLoading(false);

      showMessage(
        "error",
        "Login Failed",
        result.message
      );

      return;
    }


    showMessage(
      "success",
      "Login Successful",
      `Welcome back, ${result.user.name}.`
    );


    setLoading(false);


    window.setTimeout(
      () => {
        navigate(
          "/parent/dashboard",
          {
            replace: true,
          }
        );
      },
      550
    );
  };


  return (
    <div className="plogin-page">


      {/* POPUP */}

      {popup.show && (
        <div
          className={
            `plogin-popup ${popup.type}`
          }
        >
          <span className="plogin-popup-icon">

            {popup.type ===
            "success" ? (
              <FaCheckCircle />
            ) : (
              <FaExclamationTriangle />
            )}

          </span>


          <div>
            <strong>
              {popup.title}
            </strong>

            <p>
              {popup.message}
            </p>
          </div>

        </div>
      )}


      {/* HOME */}

      <button
        type="button"
        className="plogin-home"

        onClick={() =>
          navigate("/")
        }
      >
        <FaHome />

        Back to Website
      </button>


      <div className="plogin-wrapper">


        {/* =================================================
            LEFT
        ================================================= */}

        <section className="plogin-info">


          <div className="plogin-brand">

            <span>
              <FaGraduationCap />
            </span>

            <div>
              <small>
                AB PUBLIC SCHOOL
              </small>

              <strong>
                Parent Portal
              </strong>
            </div>

          </div>


          <div className="plogin-info-content">

            <span className="plogin-label">
              PARENT ACCESS
            </span>


            <h1>
              Stay Informed.
              <br />

              Stay Connected.
              <br />

              <em>
                Stay Involved.
              </em>
            </h1>


            <p>
              Login to securely access your
              child's attendance, academic
              progress, assignments, fees and
              important school updates.
            </p>


            <div className="plogin-features">

              <div>
                <FaCalendarCheck />

                <span>
                  Attendance
                </span>
              </div>


              <div>
                <FaChartLine />

                <span>
                  Results
                </span>
              </div>


              <div>
                <FaMoneyBillWave />

                <span>
                  Fees
                </span>
              </div>

            </div>

          </div>


          <div className="plogin-secure">

            <FaShieldAlt />

            Secure access for verified parents
            and guardians.

          </div>

        </section>


        {/* =================================================
            LOGIN
        ================================================= */}

        <section className="plogin-form-side">


          <div className="plogin-card">


            <div className="plogin-icon">
              <FaUserFriends />
            </div>


            <span className="plogin-card-label">
              PARENT LOGIN
            </span>


            <h2>
              Welcome Back
            </h2>


            <p className="plogin-description">
              Login using your registered Email
              Address or Parent ID and the
              password created during signup.
            </p>


            <form
              onSubmit={
                handleLogin
              }
            >


              {/* IDENTIFIER */}

              <div className="plogin-field">

                <label>
                  Email / Parent ID
                </label>

                <div className="plogin-input">

                  <FaIdCard />

                  <input
                    type="text"

                    value={
                      identifier
                    }

                    onChange={
                      (event) =>
                        setIdentifier(
                          event.target.value
                        )
                    }

                    placeholder="Email or PAR-1001"

                    disabled={
                      loading
                    }
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="plogin-field">

                <label>
                  Password
                </label>

                <div className="plogin-input">

                  <FaLock />

                  <input
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

                    placeholder="Enter your password"

                    disabled={
                      loading
                    }
                  />


                  <button
                    type="button"

                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
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


              {/* LOGIN */}

              <button
                type="submit"
                className="plogin-submit"

                disabled={
                  loading
                }
              >
                {loading
                  ? "Signing In..."
                  : "Sign In to Parent Portal"}

                {!loading && (
                  <FaArrowRight />
                )}
              </button>


            </form>


            {/* CREATE */}

            <div className="plogin-create">

              <span>
                First time here?
              </span>

              <button
                type="button"

                onClick={() =>
                  navigate(
                    "/parent/signup"
                  )
                }
              >
                Create Parent Account
              </button>

            </div>


            {/* NOTE */}

            <div className="plogin-note">

              <FaShieldAlt />

              <p>
                Your Parent Portal account only
                provides access to the student
                linked with your verified school
                record.
              </p>

            </div>


          </div>

        </section>


      </div>

    </div>
  );
};


export default ParentLogin;