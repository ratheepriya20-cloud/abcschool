import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaGraduationCap,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  loginAdmin,
  loginParent,
} from "../data/authData";

import "./AccountAuth.css";

const AccountAuth = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState("choose");
  const [loginType, setLoginType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setStep("choose");
    setLoginType("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError("");
    setSuccess("");
    setLoading(false);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleTypeSelect = (type) => {
    resetMessages();

    setLoginType(type);
    setStep("login");
  };

  const handleBack = () => {
    resetMessages();

    setStep("choose");
    setLoginType("");
    setEmail("");
    setPassword("");
  };

  const handleParentSignup = () => {
    onClose();

    navigate("/parent/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      let result;

      if (loginType === "parent") {
        result = loginParent(
          email.trim(),
          password
        );
      } else {
        result = loginAdmin(
          email.trim(),
          password
        );
      }

      if (!result?.success) {
        setError(
          result?.message ||
            "Invalid email or password."
        );

        setLoading(false);
        return;
      }

      setSuccess("Login successful. Redirecting...");

      setTimeout(() => {
        onClose();

        if (loginType === "parent") {
          navigate("/parent", {
            replace: true,
          });

          return;
        }

        const role = result.admin?.role;

        if (role === "major-admin") {
          navigate("/admin", {
            replace: true,
          });
        } else if (role === "sub-admin") {
          navigate("/admin/sub-admin", {
            replace: true,
          });
        } else {
          setError("Unauthorized account role.");
        }
      }, 500);
    } catch (err) {
      console.error(
        "Account login error:",
        err
      );

      setError(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div
      className="abpsAccountAuthOverlay"
      onMouseDown={(e) => {
        if (
          e.target.classList.contains(
            "abpsAccountAuthOverlay"
          )
        ) {
          onClose();
        }
      }}
    >
      <div className="abpsAccountAuthModal">

        {/* CLOSE */}
        <button
          type="button"
          className="abpsAccountAuthClose"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* LEFT SIDE */}
        <div className="abpsAccountAuthVisual">

          <div className="abpsAccountAuthVisualIcon">
            <FaGraduationCap />
          </div>

          <span className="abpsAccountAuthVisualLabel">
            AB PUBLIC SCHOOL
          </span>

          <h2>
            One Account.
            <br />
            One Secure Portal.
          </h2>

          <p>
            Sign in to access your school
            account and continue to your
            personalized portal.
          </p>

          <div className="abpsAccountAuthSecurity">
            <FaShieldAlt />

            <div>
              <strong>Secure Access</strong>
              <span>
                Your account is protected
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="abpsAccountAuthContent">

          {/* ============================= */}
          {/* CHOOSE ACCOUNT */}
          {/* ============================= */}

          {step === "choose" && (
            <div className="abpsAccountAuthPanel">

              <span className="abpsAccountAuthEyebrow">
                WELCOME BACK
              </span>

              <h1>Sign In</h1>

              <p className="abpsAccountAuthIntro">
                Choose your account type to
                continue.
              </p>

              <div className="abpsAccountTypeGrid">

                {/* PARENT */}
                <button
                  type="button"
                  className="abpsAccountTypeCard"
                  onClick={() =>
                    handleTypeSelect("parent")
                  }
                >
                  <span className="abpsAccountTypeIcon">
                    <FaUser />
                  </span>

                  <span className="abpsAccountTypeText">
                    <strong>Parent</strong>

                    <small>
                      Access your child's
                      school portal
                    </small>
                  </span>

                  <FaArrowRight className="abpsAccountTypeArrow" />
                </button>

                {/* ADMIN */}
                <button
                  type="button"
                  className="abpsAccountTypeCard"
                  onClick={() =>
                    handleTypeSelect("admin")
                  }
                >
                  <span className="abpsAccountTypeIcon">
                    <FaUserShield />
                  </span>

                  <span className="abpsAccountTypeText">
                    <strong>Admin</strong>

                    <small>
                      Manage school
                      administration
                    </small>
                  </span>

                  <FaArrowRight className="abpsAccountTypeArrow" />
                </button>

              </div>

              <div className="abpsAccountAuthNote">
                <FaShieldAlt />

                <span>
                  Admin accounts are created
                  and managed by the Major Admin.
                </span>
              </div>

            </div>
          )}

          {/* ============================= */}
          {/* LOGIN */}
          {/* ============================= */}

          {step === "login" && (
            <div className="abpsAccountAuthPanel">

              <button
                type="button"
                className="abpsAccountBackButton"
                onClick={handleBack}
              >
                <FaArrowLeft />
                Back
              </button>

              <span className="abpsAccountAuthEyebrow">
                {loginType === "parent"
                  ? "PARENT ACCESS"
                  : "ADMIN ACCESS"}
              </span>

              <h1>
                {loginType === "parent"
                  ? "Parent Login"
                  : "Admin Login"}
              </h1>

              <p className="abpsAccountAuthIntro">
                {loginType === "parent"
                  ? "Sign in to access your child's school information."
                  : "Sign in to access the administration portal."}
              </p>

              {/* ERROR */}
              {error && (
                <div className="abpsAccountAuthMessage abpsAccountAuthError">
                  <FaExclamationTriangle />
                  <span>{error}</span>
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="abpsAccountAuthMessage abpsAccountAuthSuccess">
                  <FaCheckCircle />
                  <span>{success}</span>
                </div>
              )}

              <form
                className="abpsAccountLoginForm"
                onSubmit={handleLogin}
              >

                {/* EMAIL */}
                <div className="abpsAccountField">

                  <label htmlFor="accountEmail">
                    Email Address
                  </label>

                  <div className="abpsAccountInputWrap">
                    <FaEnvelope />

                    <input
                      id="accountEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      autoComplete="email"
                    />
                  </div>

                </div>

                {/* PASSWORD */}
                <div className="abpsAccountField">

                  <label htmlFor="accountPassword">
                    Password
                  </label>

                  <div className="abpsAccountInputWrap">
                    <FaLock />

                    <input
                      id="accountPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="abpsAccountPasswordToggle"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
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

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="abpsAccountLoginButton"
                  disabled={loading}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}

                  {!loading && <FaArrowRight />}
                </button>

              </form>

              {/* PARENT CREATE ACCOUNT */}
              {loginType === "parent" && (
                <div className="abpsAccountCreateBox">

                  <p>
                    Don't have a parent account?
                  </p>

                  <button
                    type="button"
                    onClick={handleParentSignup}
                  >
                    Create Account
                    <FaArrowRight />
                  </button>

                </div>
              )}

              {/* ADMIN INFO */}
              {loginType === "admin" && (
                <div className="abpsAdminLoginInfo">

                  <FaShieldAlt />

                  <div>
                    <strong>
                      Administrator Access
                    </strong>

                    <span>
                      Admin accounts are created
                      by the Major Admin.
                    </span>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AccountAuth;