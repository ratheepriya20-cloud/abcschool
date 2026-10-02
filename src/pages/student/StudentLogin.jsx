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
  FaUserGraduate,
  FaIdCard,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
  FaBookOpen,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";

import {
  loginStudent,
  getStudentSession,
} from "../../data/studentAuthData";

import "./StudentLogin.css";


const StudentLogin = () => {

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
     EXISTING SESSION
  ======================================================= */

  useEffect(() => {

    const session =
      getStudentSession();

    if (
      session?.role === "student"
    ) {

      navigate(
        "/student/dashboard",
        {
          replace: true,
        }
      );

    }

  }, [navigate]);


  /* =======================================================
     CREATED MESSAGE
  ======================================================= */

  useEffect(() => {

    if (
      location.state?.accountCreated
    ) {

      setPopup({
        show: true,
        type: "success",
        title: "Account Created",
        message:
          "Your account is ready. Login with the password you just created.",
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
        "Enter your email or Admission Number."
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
      loginStudent(
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
          "/student/dashboard",
          {
            replace: true,
          }
        );

      },
      550
    );

  };


  return (

    <div className="slogin-page">


      {popup.show && (

        <div
          className={`slogin-popup ${popup.type}`}
        >

          <span>

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


      <button
        type="button"
        className="slogin-home"

        onClick={() =>
          navigate("/")
        }
      >

        <FaHome />

        Back to Website

      </button>


      <div className="slogin-wrapper">


        {/* LEFT */}

        <section className="slogin-info">


          <div className="slogin-brand">

            <span>
              <FaGraduationCap />
            </span>

            <div>

              <small>
                AB PUBLIC SCHOOL
              </small>

              <strong>
                Student Portal
              </strong>

            </div>

          </div>


          <div className="slogin-info-content">

            <span className="slogin-label">

              STUDENT ACCESS

            </span>


            <h1>

              Learn.
              <br />

              Grow.
              <br />

              <em>
                Achieve.
              </em>

            </h1>


            <p>

              Your school information,
              assignments and academic
              progress are available through
              one secure student portal.

            </p>


            <div className="slogin-features">

              <div>

                <FaBookOpen />

                <span>
                  Assignments
                </span>

              </div>


              <div>

                <FaChartLine />

                <span>
                  Results
                </span>

              </div>


              <div>

                <FaClipboardList />

                <span>
                  School Records
                </span>

              </div>

            </div>

          </div>


          <div className="slogin-secure">

            <FaShieldAlt />

            Secure student portal access.

          </div>

        </section>


        {/* FORM */}

        <section className="slogin-form-side">


          <div className="slogin-card">


            <div className="slogin-icon">

              <FaUserGraduate />

            </div>


            <span className="slogin-card-label">

              STUDENT LOGIN

            </span>


            <h2>
              Welcome Back
            </h2>


            <p className="slogin-description">

              Login using your registered
              email or Admission Number and
              the password created during
              signup.

            </p>


            <form
              onSubmit={
                handleLogin
              }
            >


              <div className="slogin-field">

                <label>
                  Email / Admission Number
                </label>


                <div className="slogin-input">

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

                    placeholder="Email or ABPS-2026-0142"

                    disabled={
                      loading
                    }
                  />

                </div>

              </div>


              <div className="slogin-field">

                <label>
                  Password
                </label>


                <div className="slogin-input">

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


              <button
                type="submit"

                className="slogin-submit"

                disabled={
                  loading
                }
              >

                {loading
                  ? "Signing In..."
                  : "Sign In to Student Portal"}

                {!loading && (
                  <FaArrowRight />
                )}

              </button>


            </form>


            <div className="slogin-create">

              <span>
                First time here?
              </span>


              <button
                type="button"

                onClick={() =>
                  navigate(
                    "/student/signup"
                  )
                }
              >

                Create Student Account

              </button>

            </div>


            <div className="slogin-note">

              <FaShieldAlt />

              <p>

                You can only access the
                student profile linked with
                your verified school record.

              </p>

            </div>


          </div>

        </section>


      </div>

    </div>

  );
};


export default StudentLogin;