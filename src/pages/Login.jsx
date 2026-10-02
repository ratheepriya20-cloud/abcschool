import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
  ROLES,
} from "../data/authData";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const result = loginUser(
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    const user = result.user;

    switch (user.role) {
      case ROLES.SUPER_ADMIN:
        navigate("/admin/super");
        break;

      case ROLES.SUB_ADMIN:
        navigate("/admin/sub");
        break;

      case ROLES.TEACHER:
        navigate(
          "/teacher/dashboard"
        );
        break;

      case ROLES.STUDENT:
        navigate(
          "/student/dashboard"
        );
        break;

      case ROLES.PARENT:
        navigate(
          "/parent/dashboard"
        );
        break;

      case ROLES.CLIENT:
        navigate(
          "/client/dashboard"
        );
        break;

      default:
        navigate("/");
    }
  };

  return (
    <main className="abps-login-page">

      <section className="abps-login-card">

        <span className="abps-login-label">
          AB PUBLIC SCHOOL
        </span>

        <h1>
          Portal Login
        </h1>

        <p>
          Sign in to access your
          school portal.
        </p>

        {error && (
          <div className="abps-login-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >

          <label>
            Email Address
          </label>

          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </section>

    </main>
  );
};

export default Login;