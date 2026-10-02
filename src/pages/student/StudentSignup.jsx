import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaGraduationCap,
  FaUserGraduate,
  FaIdCard,
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
} from "react-icons/fa";

import {
  createStudentAccount,
  getStudentSession,
} from "../../data/studentAuthData";

import "./StudentSignup.css";


const StudentSignup = () => {

  const navigate =
    useNavigate();


  const [
    formData,
    setFormData,
  ] = useState({
    admissionNo: "",
    name: "",
    dob: "",
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
     CHANGE
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
      3500
    );

  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (
    event
  ) => {

    event.preventDefault();


    const {
      admissionNo,
      name,
      dob,
      email,
      password,
      confirmPassword,
    } = formData;


    if (
      !admissionNo.trim() ||
      !name.trim() ||
      !dob ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {

      showMessage(
        "error",
        "Required Fields",
        "Please fill all fields."
      );

      return;

    }


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
        "Password and confirm password do not match."
      );

      return;

    }


    setLoading(true);


    const result =
      createStudentAccount({
        admissionNo,
        name,
        dob,
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
      "Your student portal account has been created. Please login with your new password."
    );


    setLoading(false);


    window.setTimeout(
      () => {

        navigate(
          "/student/login",
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

    <div className="ssign-page">


      {/* POPUP */}

      {popup.show && (

        <div
          className={`ssign-popup ${popup.type}`}
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


      {/* HOME */}

      <button
        type="button"
        className="ssign-home"
        onClick={() =>
          navigate("/")
        }
      >

        <FaHome />

        Back to Website

      </button>


      <div className="ssign-wrapper">


        {/* ===============================================
            LEFT
        =============================================== */}

        <section className="ssign-info">


          <div className="ssign-brand">

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


          <div className="ssign-info-content">

            <span className="ssign-label">

              CREATE YOUR STUDENT ACCOUNT

            </span>


            <h1>

              Your Learning.
              <br />

              Your Progress.
              <br />

              <em>
                One Portal.
              </em>

            </h1>


            <p>

              Create your secure student
              account using the information
              already registered with the
              school.

            </p>


            <div className="ssign-points">

              <div>

                <FaCheckCircle />

                <span>
                  View academic information
                </span>

              </div>


              <div>

                <FaCheckCircle />

                <span>
                  Access assignments and results
                </span>

              </div>


              <div>

                <FaCheckCircle />

                <span>
                  Secure student-only access
                </span>

              </div>

            </div>

          </div>


          <div className="ssign-security">

            <FaShieldAlt />

            Only existing AB Public School
            students can create an account.

          </div>

        </section>


        {/* ===============================================
            FORM
        =============================================== */}

        <section className="ssign-form-side">


          <div className="ssign-card">


            <div className="ssign-icon">

              <FaUserGraduate />

            </div>


            <span className="ssign-card-label">

              STUDENT REGISTRATION

            </span>


            <h2>
              Create Account
            </h2>


            <p className="ssign-description">

              Enter the same student details
              registered in the school records.

            </p>


            <form
              onSubmit={
                handleSubmit
              }
            >


              {/* ADMISSION */}

              <div className="ssign-field">

                <label>
                  Admission Number
                </label>

                <div className="ssign-input">

                  <FaIdCard />

                  <input
                    type="text"
                    name="admissionNo"

                    value={
                      formData.admissionNo
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="e.g. ABPS-2026-0142"
                  />

                </div>

              </div>


              {/* NAME */}

              <div className="ssign-field">

                <label>
                  Student Name
                </label>

                <div className="ssign-input">

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

                    placeholder="Enter full name"
                  />

                </div>

              </div>


              <div className="ssign-two">


                {/* DOB */}

                <div className="ssign-field">

                  <label>
                    Date of Birth
                  </label>

                  <div className="ssign-input">

                    <FaCalendarAlt />

                    <input
                      type="date"
                      name="dob"

                      value={
                        formData.dob
                      }

                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div className="ssign-field">

                  <label>
                    Email
                  </label>

                  <div className="ssign-input">

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

                      placeholder="Student email"
                    />

                  </div>

                </div>


              </div>


              {/* PASSWORD */}

              <div className="ssign-field">

                <label>
                  Create Password
                </label>

                <div className="ssign-input">

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

                    placeholder="Minimum 6 characters"
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


              {/* CONFIRM */}

              <div className="ssign-field">

                <label>
                  Confirm Password
                </label>

                <div className="ssign-input">

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

                    placeholder="Re-enter password"
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


              {/* SUBMIT */}

              <button
                type="submit"

                className="ssign-submit"

                disabled={
                  loading
                }
              >

                {loading
                  ? "Creating Account..."
                  : "Create Student Account"}

                {!loading && (
                  <FaArrowRight />
                )}

              </button>


            </form>


            <div className="ssign-login-link">

              <span>
                Already have an account?
              </span>


              <button
                type="button"

                onClick={() =>
                  navigate(
                    "/student/login"
                  )
                }
              >

                Student Login

              </button>

            </div>


          </div>

        </section>


      </div>

    </div>

  );
};


export default StudentSignup;