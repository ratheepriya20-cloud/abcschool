import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";

import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    // Demo Admin Login
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "abpsAdminLoggedIn",
        "true"
      );

      navigate("/admin");
    } else {
      setError("Invalid admin username or password.");
    }
  };

  return (
    <div className="abadminlogin-page">

      <div className="abadminlogin-card">

        <div className="abadminlogin-brand">

          <div className="abadminlogin-logo">
            AB
          </div>

          <div>
            <h1>AB Public School</h1>
            <p>Administration Portal</p>
          </div>

        </div>

        <div className="abadminlogin-heading">

          <div className="abadminlogin-icon">
            <FaUserShield />
          </div>

          <h2>Admin Login</h2>

          <p>
            Sign in to manage the school portal
          </p>

        </div>

        {error && (
          <div className="abadminlogin-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="abadminlogin-field">

            <label>Admin Username</label>

            <div className="abadminlogin-input">

              <FaUserShield />

              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

            </div>

          </div>

          <div className="abadminlogin-field">

            <label>Password</label>

            <div className="abadminlogin-input">

              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="abadminlogin-eye"
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

          <button
            type="submit"
            className="abadminlogin-submit"
          >
            <span>Login to Admin Panel</span>
            <FaArrowRight />
          </button>

        </form>

        <div className="abadminlogin-footer">

          <FaGraduationCap />

          <span>
            AB Public School • Secure Administration
          </span>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;