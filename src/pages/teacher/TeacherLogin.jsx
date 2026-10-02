import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaChalkboardTeacher,
  FaIdBadge,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGraduationCap,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getLoggedInTeacher,
  loginTeacher,
} from "../../data/teacherAuthData";

import "./TeacherLogin.css";

const TeacherLogin = () => {
  const navigate =
    useNavigate();

  const [employeeId, setEmployeeId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [popup, setPopup] =
    useState({
      show: false,
      type: "",
      message: "",
    });

  /* =======================================================
     ALREADY LOGGED IN
  ======================================================= */

  useEffect(() => {
    const teacher =
      getLoggedInTeacher();

    if (teacher) {
      navigate(
        "/teacher/dashboard",
        {
          replace: true,
        }
      );
    }
  }, [navigate]);

  /* =======================================================
     POPUP
  ======================================================= */

  const showMessage = (
    type,
    message
  ) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (!employeeId.trim()) {
      showMessage(
        "error",
        "Please enter Employee ID."
      );

      return;
    }

    if (!password) {
      showMessage(
        "error",
        "Please enter your password."
      );

      return;
    }

    setLoading(true);

    const result =
      loginTeacher(
        employeeId,
        password
      );

    setLoading(false);

    if (!result.success) {
      showMessage(
        "error",
        result.message
      );

      return;
    }

    showMessage(
      "success",
      `Welcome ${result.teacher.name}`
    );

    setTimeout(() => {
      navigate(
        "/teacher/dashboard",
        {
          replace: true,
        }
      );
    }, 500);
  };

  return (
    <div className="teacher-login-page">

      {popup.show && (
        <div
          className={`teacher-login-popup ${popup.type}`}
        >
          {popup.type ===
          "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationTriangle />
          )}

          {popup.message}
        </div>
      )}

      <div className="teacher-login-shell">

        {/* LEFT */}

        <section className="teacher-login-brand">

          <div className="teacher-login-brand-content">

            <div className="teacher-login-logo">
              <FaGraduationCap />
            </div>

            <span>
              AB PUBLIC SCHOOL
            </span>

            <h1>
              Teacher
              <br />
              Portal
            </h1>

            <p>
              Manage your assigned
              students and stay
              connected with students
              and parents.
            </p>

            <div className="teacher-login-points">

              <div>
                <FaShieldAlt />

                <span>
                  <strong>
                    Secure Access
                  </strong>

                  Only registered active
                  teachers can login.
                </span>
              </div>

              <div>
                <FaChalkboardTeacher />

                <span>
                  <strong>
                    My Students
                  </strong>

                  Access only your
                  assigned classes.
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* FORM */}

        <section className="teacher-login-form-side">

          <form
            className="teacher-login-card"
            onSubmit={
              handleSubmit
            }
          >

            <span className="teacher-login-small">
              TEACHER ACCESS
            </span>

            <h2>
              Welcome Back
            </h2>

            <p>
              Enter your school
              Employee ID and password.
            </p>

            <div className="teacher-login-field">

              <label>
                Employee ID
              </label>

              <div>

                <FaIdBadge />

                <input
                  type="text"
                  value={
                    employeeId
                  }
                  onChange={(e) =>
                    setEmployeeId(
                      e.target.value
                    )
                  }
                  placeholder="e.g. EMP-101"
                  autoComplete="username"
                />

              </div>

            </div>

            <div className="teacher-login-field">

              <label>
                Password
              </label>

              <div>

                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) =>
                        !prev
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
              className="teacher-login-submit"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}

              {!loading && (
                <FaArrowRight />
              )}
            </button>

            <div className="teacher-login-help">

              <FaShieldAlt />

              <span>
                Login is available only
                for active teachers
                registered by the
                school.
              </span>

            </div>

          </form>

        </section>

      </div>

    </div>
  );
};

export default TeacherLogin;