import React from "react";

import {
  FaUser,
  FaUserGraduate,
  FaEnvelope,
  FaPhoneAlt,
  FaIdCard,
  FaGraduationCap,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import "./ParentProfile.css";

const ParentProfile = ({
  parent,
  student,
}) => {

  return (
    <div className="pp-page">

      <section className="pp-page-hero">

        <span className="pp-eyebrow">
          ACCOUNT DETAILS
        </span>

        <h1>
          Parent Profile
        </h1>

        <p>
          View registered parent information
          and linked student details.
        </p>

      </section>


      <section className="pp-profile-grid">


        {/* PARENT */}

        <article className="pp-profile-card">

          <div className="pp-profile-banner">

            <div className="pp-profile-avatar">

              <FaUser />

            </div>

          </div>


          <div className="pp-profile-body">

            <span className="pp-eyebrow">
              PARENT ACCOUNT
            </span>

            <h2>
              {parent?.name || "Parent"}
            </h2>

            <p className="pp-profile-role">
              {parent?.relationship ||
                "Parent / Guardian"}
            </p>


            <div className="pp-profile-details">

              <ProfileRow
                icon={FaIdCard}
                label="Parent ID"
                value={
                  parent?.id || "—"
                }
              />

              <ProfileRow
                icon={FaUsers}
                label="Relationship"
                value={
                  parent?.relationship ||
                  "—"
                }
              />

              <ProfileRow
                icon={FaEnvelope}
                label="Email"
                value={
                  parent?.email || "—"
                }
              />

              <ProfileRow
                icon={FaPhoneAlt}
                label="Mobile"
                value={
                  parent?.mobile || "—"
                }
              />

            </div>

          </div>

        </article>


        {/* STUDENT */}

        <article className="pp-profile-card">

          <div className="pp-profile-banner student">

            <div className="pp-profile-avatar">

              <FaUserGraduate />

            </div>

          </div>


          <div className="pp-profile-body">

            <span className="pp-eyebrow">
              LINKED STUDENT
            </span>

            <h2>
              {student?.name ||
                "Student"}
            </h2>

            <p className="pp-profile-role">
              {student?.className}
              {" "}
              {student?.section
                ? `- ${student.section}`
                : ""}
            </p>


            <div className="pp-profile-details">

              <ProfileRow
                icon={FaIdCard}
                label="Admission No."
                value={
                  student?.admissionNo ||
                  "—"
                }
              />

              <ProfileRow
                icon={FaGraduationCap}
                label="Class"
                value={
                  student?.className ||
                  "—"
                }
              />

              <ProfileRow
                icon={FaUsers}
                label="Section"
                value={
                  student?.section ||
                  "—"
                }
              />

              <ProfileRow
                icon={FaIdCard}
                label="Roll Number"
                value={
                  student?.rollNo ||
                  "—"
                }
              />

            </div>

          </div>

        </article>

      </section>


      <section className="pp-security-card">

        <span>
          <FaShieldAlt />
        </span>

        <div>

          <h3>
            Secure Parent Account
          </h3>

          <p>
            Student information is available
            only through the registered
            parent account.
          </p>

        </div>

      </section>

    </div>
  );
};


const ProfileRow = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="pp-profile-row">

    <span>
      <Icon />
    </span>

    <div>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>

  </div>
);


export default ParentProfile;