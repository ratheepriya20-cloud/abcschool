import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaGraduationCap,
  FaUserFriends,
  FaIdCard,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
  FaUserGraduate,
} from "react-icons/fa";

import {
  createParentAccount,
  getParentSession,
} from "../../data/parentAuthData";

import "./ParentSignup.css";


const ParentSignup = () => {
  const navigate =
    useNavigate();


  const [
    formData,
    setFormData,
  ] = useState({
    parentId: "",
    studentAdmissionNo: "",
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword,
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
     INPUT
  ======================================================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };


  /* =======================================================
     MESSAGE
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
      3500
    );
  };


  /* =======================================================
     SIGNUP
  ======================================================= */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const {
      parentId,
      studentAdmissionNo,
      name,
      mobile,
      email,
      password,
      confirmPassword,
    } = formData;


    /* REQUIRED */

    if (
      !parentId.trim() ||
      !studentAdmissionNo.trim() ||
      !name.trim() ||
      !mobile.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      showMessage(
        "error",
        "Required Fields",
        "Please fill all required fields."
      );

      return;
    }


    /* MOBILE */

    const cleanMobile =
      mobile.replace(/\D/g, "");

    if (
      cleanMobile.length !== 10
    ) {
      showMessage(
        "error",
        "Invalid Mobile Number",
        "Please enter your 10 digit registered mobile number."
      );

      return;
    }


    /* EMAIL */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email.trim()
      )
    ) {
      showMessage(
        "error",
        "Invalid Email",
        "Please enter a valid email address."
      );

      return;
    }


    /* PASSWORD */

    if (
      password.length < 6
    ) {
      showMessage(
        "error",
        "Weak Password",
        "Password must contain at least 6 characters."
      );

      return;
    }


    if (
      password !==
      confirmPassword
    ) {
      showMessage(
        "error",
        "Password Mismatch",
        "Password and Confirm Password do not match."
      );

      return;
    }


    setLoading(true);


    const result =
      createParentAccount({
        parentId,
        studentAdmissionNo,
        name,
        mobile:
          cleanMobile,
        email,
        password,
      });


    if (!result.success) {
      setLoading(false);

      showMessage(
        "error",
        result.code ===
          "ACCOUNT_EXISTS"
          ? "Account Already Exists"
          : "Unable to Create Account",
        result.message
      );

      return;
    }


    showMessage(
      "success",
      "Account Created",
      "Your Parent Portal account has been created successfully. Login using your new password."
    );


    setLoading(false);


    window.setTimeout(
      () => {
        navigate(
          "/parent/login",
          {
            replace: true,

            state: {
              accountCreated: true,
              identifier:
                formData.email,
            },
          }
        );
      },
      900
    );
  };


  return (
    <div className="psign-page">


      {/* ===================================================
          POPUP
      =================================================== */}

      {popup.show && (
        <div
          className={
            `psign-popup ${popup.type}`
          }
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


      {/* ===================================================
          HOME
      =================================================== */}

      <button
        type="button"
        className="psign-home"

        onClick={() =>
          navigate("/")
        }
      >
        <FaHome />

        Back to Website
      </button>


      <div className="psign-wrapper">


        {/* =================================================
            LEFT
        ================================================= */}

        <section className="psign-info">


          <div className="psign-brand">

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


          <div className="psign-info-content">

            <span className="psign-label">
              CREATE PARENT ACCOUNT
            </span>


            <h1>
              Stay Connected
              <br />

              With Your Child's
              <br />

              <em>
                School Journey.
              </em>
            </h1>


            <p>
              Create your secure Parent Portal
              account using the parent and
              student information already
              registered with AB Public School.
            </p>


            <div className="psign-points">

              <div>
                <FaCheckCircle />

                <span>
                  View attendance and results
                </span>
              </div>


              <div>
                <FaCheckCircle />

                <span>
                  Track assignments and fees
                </span>
              </div>


              <div>
                <FaCheckCircle />

                <span>
                  Receive school notices and events
                </span>
              </div>

            </div>

          </div>


          <div className="psign-security">

            <FaShieldAlt />

            Only verified parents and guardians
            can create a Parent Portal account.

          </div>

        </section>


        {/* =================================================
            RIGHT FORM
        ================================================= */}

        <section className="psign-form-side">


          <div className="psign-card">


            <div className="psign-icon">
              <FaUserFriends />
            </div>


            <span className="psign-card-label">
              PARENT REGISTRATION
            </span>


            <h2>
              Create Account
            </h2>


            <p className="psign-description">
              Enter the same parent and student
              details registered with the school.
            </p>


            <form
              onSubmit={
                handleSubmit
              }
            >


              {/* PARENT ID */}

              <div className="psign-field">

                <label>
                  Parent ID
                </label>

                <div className="psign-input">

                  <FaIdCard />

                  <input
                    type="text"
                    name="parentId"

                    value={
                      formData.parentId
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="e.g. PAR-1001"
                  />

                </div>

              </div>


              {/* STUDENT ADMISSION */}

              <div className="psign-field">

                <label>
                  Student Admission Number
                </label>

                <div className="psign-input">

                  <FaUserGraduate />

                  <input
                    type="text"
                    name="studentAdmissionNo"

                    value={
                      formData.studentAdmissionNo
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="e.g. ABPS-2026-0142"
                  />

                </div>

              </div>


              {/* NAME + MOBILE */}

              <div className="psign-two">


                <div className="psign-field">

                  <label>
                    Parent Name
                  </label>

                  <div className="psign-input">

                    <FaUser />

                    <input
                      type="text"
                      name="name"

                      value={
                        formData.name
                      }

                      onChange={
                        handleChange
                      }

                      placeholder="Full name"
                    />

                  </div>

                </div>


                <div className="psign-field">

                  <label>
                    Registered Mobile
                  </label>

                  <div className="psign-input">

                    <FaPhoneAlt />

                    <input
                      type="tel"
                      name="mobile"

                      value={
                        formData.mobile
                      }

                      onChange={
                        handleChange
                      }

                      placeholder="10 digit mobile"

                      maxLength="10"
                    />

                  </div>

                </div>


              </div>


              {/* EMAIL */}

              <div className="psign-field">

                <label>
                  Email Address
                </label>

                <div className="psign-input">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"

                    value={
                      formData.email
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="Enter email address"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="psign-two">


                <div className="psign-field">

                  <label>
                    Create Password
                  </label>

                  <div className="psign-input">

                    <FaLock />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }

                      name="password"

                      value={
                        formData.password
                      }

                      onChange={
                        handleChange
                      }

                      placeholder="Min. 6 characters"
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


                <div className="psign-field">

                  <label>
                    Confirm Password
                  </label>

                  <div className="psign-input">

                    <FaLock />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }

                      name="confirmPassword"

                      value={
                        formData.confirmPassword
                      }

                      onChange={
                        handleChange
                      }

                      placeholder="Repeat password"
                    />


                    <button
                      type="button"

                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>


              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="psign-submit"

                disabled={
                  loading
                }
              >
                {loading
                  ? "Creating Account..."
                  : "Create Parent Account"}

                {!loading && (
                  <FaArrowRight />
                )}
              </button>


            </form>


            {/* LOGIN */}

            <div className="psign-login-link">

              <span>
                Already have an account?
              </span>

              <button
                type="button"

                onClick={() =>
                  navigate(
                    "/parent/login"
                  )
                }
              >
                Parent Login
              </button>

            </div>


          </div>

        </section>


      </div>

    </div>
  );
};


export default ParentSignup;