

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        [name]: onlyNumbers,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name) {
      showPopup(
        "error",
        "Name Required",
        "Please enter your full name."
      );
      return false;
    }

    if (name.length < 3) {
      showPopup(
        "error",
        "Invalid Name",
        "Name should contain at least 3 characters."
      );
      return false;
    }

    if (!email) {
      showPopup(
        "error",
        "Email Required",
        "Please enter your email address."
      );
      return false;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showPopup(
        "error",
        "Invalid Email",
        "Please enter a valid email address."
      );
      return false;
    }

    if (!phone) {
      showPopup(
        "error",
        "Phone Required",
        "Please enter your mobile number."
      );
      return false;
    }

    if (phone.length !== 10) {
      showPopup(
        "error",
        "Invalid Phone",
        "Please enter a valid 10-digit mobile number."
      );
      return false;
    }

    if (!formData.password) {
      showPopup(
        "error",
        "Password Required",
        "Please create a password for your account."
      );
      return false;
    }

    if (formData.password.length < 6) {
      showPopup(
        "error",
        "Weak Password",
        "Password must contain at least 6 characters."
      );
      return false;
    }

    if (!formData.confirmPassword) {
      showPopup(
        "error",
        "Confirm Password",
        "Please confirm your password."
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showPopup(
        "error",
        "Password Mismatch",
        "Password and confirm password do not match."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("abpsUsers")) || [];

    const emailExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() ===
        formData.email.trim().toLowerCase()
    );

    if (emailExists) {
      showPopup(
        "error",
        "Account Already Exists",
        "An account with this email already exists. Please sign in instead."
      );
      return;
    }

    const newUser = {
      id: `ABPS${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "abpsUsers",
      JSON.stringify([...existingUsers, newUser])
    );

    showPopup(
      "success",
      "Account Created Successfully",
      "Your parent account has been created. Please sign in to continue."
    );
  };

  const handleSuccessContinue = () => {
    closePopup();
    navigate("/sign-in");
  };

  return (
    <div className="abpssignup-page">

      <div className="abpssignup-background"></div>

      <div className="abpssignup-wrapper">

        <div className="abpssignup-info">

          <div className="abpssignup-logo">
            AB
          </div>

          <span className="abpssignup-eyebrow">
            PARENT PORTAL
          </span>

          <h1>
            Create Your
            <span>Parent Account</span>
          </h1>

          <p>
            Stay connected with your child's academic
            progress, attendance, notices, events and
            school updates.
          </p>

          <div className="abpssignup-benefits">

            <div className="abpssignup-benefit">
              <FaCheckCircle />
              <span>Track your child's attendance</span>
            </div>

            <div className="abpssignup-benefit">
              <FaCheckCircle />
              <span>View academic results</span>
            </div>

            <div className="abpssignup-benefit">
              <FaCheckCircle />
              <span>Access school notices</span>
            </div>

            <div className="abpssignup-benefit">
              <FaCheckCircle />
              <span>Stay updated with school events</span>
            </div>

          </div>

        </div>

        <div className="abpssignup-card">

          <div className="abpssignup-card-head">
            <span>GET STARTED</span>
            <h2>Create Account</h2>
            <p>
              Enter your details to create your parent portal account.
            </p>
          </div>

          <form
            className="abpssignup-form"
            onSubmit={handleSubmit}
          >

            <div className="abpssignup-field">

              <label>Full Name</label>

              <div className="abpssignup-input">
                <FaUser />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

            </div>

            <div className="abpssignup-field">

              <label>Email Address</label>

              <div className="abpssignup-input">
                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

            </div>

            <div className="abpssignup-field">

              <label>Mobile Number</label>

              <div className="abpssignup-input">
                <FaPhone />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                />
              </div>

            </div>

            <div className="abpssignup-field">

              <label>Password</label>

              <div className="abpssignup-input">
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
                  placeholder="Create password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="abpssignup-eye"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            <div className="abpssignup-field">

              <label>Confirm Password</label>

              <div className="abpssignup-input">
                <FaLock />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  className="abpssignup-eye"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="abpssignup-submit"
            >
              Create Account
              <FaArrowRight />
            </button>

          </form>

          <div className="abpssignup-login">
            <span>Already have an account?</span>

            <Link to="/sign-in">
              Sign In
            </Link>
          </div>

          <Link
            to="/"
            className="abpssignup-back"
          >
            Back to School Website
          </Link>

        </div>

      </div>

      {popup.show && (
        <div className="abpssignup-popup-overlay">

          <div
            className={`abpssignup-popup ${
              popup.type === "success"
                ? "abpssignup-popup-success"
                : "abpssignup-popup-error"
            }`}
          >

            <button
              type="button"
              className="abpssignup-popup-close"
              onClick={closePopup}
            >
              <FaTimes />
            </button>

            <div className="abpssignup-popup-icon">
              {popup.type === "success" ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationTriangle />
              )}
            </div>

            <h3>{popup.title}</h3>

            <p>{popup.message}</p>

            {popup.type === "success" ? (
              <button
                type="button"
                className="abpssignup-popup-btn"
                onClick={handleSuccessContinue}
              >
                Continue to Sign In
              </button>
            ) : (
              <button
                type="button"
                className="abpssignup-popup-btn"
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

export default SignUp;