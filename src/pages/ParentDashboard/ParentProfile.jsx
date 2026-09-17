import React from "react";
import {
  FaUserCircle,
  FaUserEdit,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./ParentProfile.css";

const ParentProfile = ({
  profile,
  setProfile,
  editingProfile,
  setEditingProfile,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <div className="abprofile-page">
      <div className="abprofile-heading">
        <span className="abprofile-label">ACCOUNT</span>

        <h1>Profile</h1>

        <p>
          Manage your parent and student information.
        </p>
      </div>

      <div className="abprofile-layout">
        <div className="abprofile-card abprofile-user-card">
          <div className="abprofile-avatar">
            <FaUserCircle />
          </div>

          <h2>{profile.parent}</h2>

          <p className="abprofile-role">
            Parent Account
          </p>

          <div className="abprofile-verified">
            <FaCheckCircle />
            <span>Verified Account</span>
          </div>

          <div className="abprofile-student-box">
            <span>Student</span>

            <strong>{profile.student}</strong>

            <small>{profile.className}</small>
          </div>
        </div>

        <div className="abprofile-card abprofile-information-card">
          <div className="abprofile-card-header">
            <div>
              <span className="abprofile-label">
                PERSONAL DETAILS
              </span>

              <h2>Account Information</h2>
            </div>

            <button
              className="abprofile-edit-btn"
              onClick={() =>
                setEditingProfile(!editingProfile)
              }
            >
              <FaUserEdit />

              <span>
                {editingProfile
                  ? "Cancel"
                  : "Edit Profile"}
              </span>
            </button>
          </div>

          {editingProfile ? (
            <div className="abprofile-form">
              <div className="abprofile-field">
                <label>Parent Name</label>

                <input
                  type="text"
                  name="parent"
                  value={profile.parent}
                  onChange={handleChange}
                />
              </div>

              <div className="abprofile-field">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="abprofile-field abprofile-full-field">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

              <button
                className="abprofile-save-btn"
                onClick={() =>
                  setEditingProfile(false)
                }
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="abprofile-details">
              <div className="abprofile-detail-item">
                <span>Parent Name</span>
                <strong>{profile.parent}</strong>
              </div>

              <div className="abprofile-detail-item">
                <span>Phone Number</span>
                <strong>{profile.phone}</strong>
              </div>

              <div className="abprofile-detail-item">
                <span>Email Address</span>
                <strong>{profile.email}</strong>
              </div>

              <div className="abprofile-detail-item">
                <span>Student Name</span>
                <strong>{profile.student}</strong>
              </div>

              <div className="abprofile-detail-item">
                <span>Class</span>
                <strong>{profile.className}</strong>
              </div>

              <div className="abprofile-detail-item">
                <span>Admission Number</span>
                <strong>{profile.admission}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="abprofile-security">
        <div className="abprofile-security-icon">
          <FaShieldAlt />
        </div>

        <div className="abprofile-security-content">
          <strong>Your account is secure</strong>

          <p>
            Your parent portal information is protected
            and accessible only through your authorized
            account.
          </p>
        </div>

        <div className="abprofile-security-check">
          <FaCheckCircle />
          <span>Protected</span>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;