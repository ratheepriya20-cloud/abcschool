import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    const currentUser =
      localStorage.getItem("abpsCurrentUser");

    if (currentUser) {
      navigate("/parent-dashboard");
    }
  }, [navigate]);

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email) {
      showPopup(
        "error",
        "Email Required",
        "Please enter your registered email address."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showPopup(
        "error",
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (!password) {
      showPopup(
        "error",
        "Password Required",
        "Please enter your password."
      );
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("abpsUsers")) || [];

    if (users.length === 0) {
      showPopup(
        "error",
        "Account Not Found",
        "No account has been created yet. Please create your parent account first."
      );
      return;
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email
    );

    if (!user) {
      showPopup(
        "error",
        "Account Not Found",
        "No account is registered with this email. Please sign up first."
      );
      return;
    }

    if (user.password !== password) {
      showPopup(
        "error",
        "Incorrect Password",
        "The password you entered is incorrect. Please try again."
      );
      return;
    }

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    localStorage.setItem(
      "abpsCurrentUser",
      JSON.stringify(loggedInUser)
    );

    showPopup(
      "success",
      "Welcome Back!",
      `You have successfully signed in, ${user.name}.`
    );
  };

  const continueToDashboard = () => {
    closePopup();
    navigate("/parent-dashboard");
  };

  return (
    <div className="abpssignin-page">

      <div className="abpssignin-glow"></div>

      <div className="abpssignin-wrapper">

        <div className="abpssignin-card">

          <div className="abpssignin-brand">
            <div className="abpssignin-logo">
              AB
            </div>

            <div>
              <strong>AB PUBLIC SCHOOL</strong>
              <span>Parent Portal</span>
            </div>
          </div>

          <div className="abpssignin-heading">
            <span>WELCOME BACK</span>

            <h1>Sign In</h1>

            <p>
              Sign in to access your parent portal
              and stay connected with the school.
            </p>
          </div>

          <form
            className="abpssignin-form"
            onSubmit={handleSubmit}
          >

            <div className="abpssignin-field">

              <label>Email Address</label>

              <div className="abpssignin-input">
                <FaUser />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter registered email"
                />
              </div>

            </div>

            <div className="abpssignin-field">

              <div className="abpssignin-label-row">
                <label>Password</label>

                <button
                  type="button"
                  className="abpssignin-forgot"
                  onClick={() =>
                    showPopup(
                      "error",
                      "Password Reset",
                      "Please contact the school office to reset your parent portal password."
                    )
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <div className="abpssignin-input">
                <FaLock />

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
                  className="abpssignin-eye"
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
              className="abpssignin-submit"
            >
              Sign In
              <FaArrowRight />
            </button>

          </form>

          <div className="abpssignin-divider">
            <span>NEW TO THE PARENT PORTAL?</span>
          </div>

          <Link
            to="/sign-up"
            className="abpssignin-create"
          >
            Create Parent Account
            <FaArrowRight />
          </Link>

          <Link
            to="/"
            className="abpssignin-back"
          >
            Back to School Website
          </Link>

        </div>

      </div>

      {popup.show && (
        <div className="abpssignin-popup-overlay">

          <div
            className={`abpssignin-popup ${
              popup.type === "success"
                ? "abpssignin-popup-success"
                : "abpssignin-popup-error"
            }`}
          >

            <button
              type="button"
              className="abpssignin-popup-close"
              onClick={closePopup}
            >
              <FaTimes />
            </button>

            <div className="abpssignin-popup-icon">
              {popup.type === "success" ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationTriangle />
              )}
            </div>

            <h2>{popup.title}</h2>

            <p>{popup.message}</p>

            {popup.type === "success" ? (
              <button
                type="button"
                className="abpssignin-popup-btn"
                onClick={continueToDashboard}
              >
                Go to Parent Dashboard
              </button>
            ) : (
              <button
                type="button"
                className="abpssignin-popup-btn"
                onClick={closePopup}
              >
                Try Again
              </button>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default SignIn;