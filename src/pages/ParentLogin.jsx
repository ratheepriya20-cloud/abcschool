import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGraduationCap,
  FaShieldAlt,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import "./ParentLogin.css";
import Navbar from "../components/Navbar";

const ParentLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const showPopup = (type, title, message) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "",
      title: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = true;

      showPopup(
        "error",
        "Parent ID Required",
        "Please enter your Parent ID or registered mobile number to continue."
      );

      setErrors(newErrors);
      return false;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;

      showPopup(
        "error",
        "Password Required",
        "Please enter your password before continuing."
      );

      setErrors(newErrors);
      return false;
    }

    if (formData.password.length < 6) {
      newErrors.password = true;

      showPopup(
        "error",
        "Invalid Password",
        "Your password must contain at least 6 characters. Please check and try again."
      );

      setErrors(newErrors);
      return false;
    }

    setErrors({});

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      showPopup(
        "success",
        "Welcome Back!",
        "Your login details have been verified successfully. You can now access the Parent Portal."
      );
    }, 1200);
  };

  const handleForgotPassword = () => {
    showPopup(
      "help",
      "Need Help?",
      "For password reset assistance, please contact the school office using your registered details."
    );
  };

  const handleSuccessContinue = () => {
    closePopup();
    navigate("/parent-dashboard");
  };

  return (
    <>
    <Navbar />
    <main className="abnew-parent-page">

      <div className="abnew-background-grid"></div>

      <div className="abnew-orbit abnew-orbit-one"></div>
      <div className="abnew-orbit abnew-orbit-two"></div>

      <div className="abnew-floating-icon abnew-icon-one">
        <FaGraduationCap />
      </div>

      <div className="abnew-floating-icon abnew-icon-two">
        <FaShieldAlt />
      </div>

      <div className="abnew-login-shell">

        <section className="abnew-visual-panel">

          <div className="abnew-visual-top">
            <div className="abnew-mini-logo">
              <span>AB</span>
            </div>

            <div>
              <strong>AB PUBLIC SCHOOL</strong>
              <small>LEARN • LEAD • EXCEL</small>
            </div>
          </div>

          <div className="abnew-visual-content">

            <div className="abnew-seal">
              <div className="abnew-seal-ring">
                <span>AB</span>
                <FaGraduationCap />
                <small>EST. 2019</small>
              </div>
            </div>

            <span className="abnew-overline">
              PARENT CONNECT
            </span>

            <h1>
              Everything about
              <strong>your child's school life.</strong>
            </h1>

            <p>
              One secure place to stay updated with attendance,
              academics, results, notices and important school
              information.
            </p>

          </div>

          <div className="abnew-visual-bottom">

            <div className="abnew-stat">
              <strong>01</strong>
              <span>Secure<br />Access</span>
            </div>

            <div className="abnew-stat-line"></div>

            <div className="abnew-stat">
              <strong>24/7</strong>
              <span>Parent<br />Connection</span>
            </div>

            <div className="abnew-stat-line"></div>

            <div className="abnew-stat">
              <strong>100%</strong>
              <span>School<br />Updates</span>
            </div>

          </div>

        </section>

        <section className="abnew-form-panel">

          <div className="abnew-form-container">

            <div className="abnew-form-header">

              <div className="abnew-form-tag">
                <FaUser />
                PARENT PORTAL
              </div>

              <h2>
                Welcome
                <span>back.</span>
              </h2>

              <p>
                Sign in to continue to your account
              </p>

            </div>

            <form
              className="abnew-login-form"
              onSubmit={handleSubmit}
            >

              <div className="abnew-field">

                <label>
                  PARENT ID / MOBILE NUMBER
                </label>

                <div
                  className={`abnew-input ${
                    errors.username
                      ? "abnew-input-error"
                      : ""
                  }`}
                >
                  <div className="abnew-input-icon">
                    <FaUser />
                  </div>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter Parent ID or mobile"
                  />

                </div>

              </div>

              <div className="abnew-field">

                <div className="abnew-password-label">

                  <label>
                    PASSWORD
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>

                </div>

                <div
                  className={`abnew-input ${
                    errors.password
                      ? "abnew-input-error"
                      : ""
                  }`}
                >

                  <div className="abnew-input-icon">
                    <FaLock />
                  </div>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className="abnew-eye"
                    onClick={() =>
                      setShowPassword(!showPassword)
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

              <div className="abnew-options">

                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>

                <div className="abnew-security">
                  <FaShieldAlt />
                  Secure login
                </div>

              </div>

              <button
                type="submit"
                className="abnew-login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="abnew-loader"></span>
                    Verifying...
                  </>
                ) : (
                  <>
                    <span>Sign In to Parent Portal</span>
                    <FaArrowRight />
                  </>
                )}

              </button>

            </form>

            <div className="abnew-support">

              <div className="abnew-support-icon">
                <FaQuestionCircle />
              </div>

              <div>
                <span>Having trouble signing in?</span>

                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                >
                  Get help from school
                </button>
              </div>

            </div>

            <button
              className="abnew-back"
              onClick={() => navigate("/")}
            >
              <span>←</span>
              Back to school website
            </button>

          </div>

        </section>

      </div>

      {popup.show && (
        <div
          className="abnew-popup-overlay"
          onClick={closePopup}
        >

          <div
            className={`abnew-popup abnew-popup-${popup.type}`}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="abnew-popup-close"
              onClick={closePopup}
            >
              <FaTimes />
            </button>

            <div className="abnew-popup-decoration"></div>

            <div className="abnew-popup-icon">

              {popup.type === "error" && (
                <FaExclamationTriangle />
              )}

              {popup.type === "success" && (
                <FaCheckCircle />
              )}

              {popup.type === "help" && (
                <FaQuestionCircle />
              )}

            </div>

            <span className="abnew-popup-label">
              {popup.type === "error"
                ? "LOGIN ERROR"
                : popup.type === "success"
                ? "SUCCESS"
                : "ACCOUNT SUPPORT"}
            </span>

            <h3>{popup.title}</h3>

            <p>{popup.message}</p>

            {popup.type === "error" && (
              <button
                className="abnew-popup-action"
                onClick={closePopup}
              >
                Try Again
                <FaArrowRight />
              </button>
            )}

            {popup.type === "help" && (
              <div className="abnew-popup-help">

                <div>
                  <FaPhoneAlt />
                </div>

                <span>
                  Please contact the school office
                  for assistance.
                </span>

              </div>
            )}

            {popup.type === "success" && (
              <button
                className="abnew-popup-action"
                onClick={handleSuccessContinue}
              >
                Continue to Dashboard
                <FaArrowRight />
              </button>
            )}

            {popup.type === "help" && (
              <button
                className="abnew-popup-action"
                onClick={closePopup}
              >
                Close
              </button>
            )}

          </div>

        </div>
      )}

    </main>
    </>
  );
};

export default ParentLogin;