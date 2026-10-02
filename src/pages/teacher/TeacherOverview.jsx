import React, {
  useMemo,
} from "react";

import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaGraduationCap,
  FaBookOpen,
  FaComments,
  FaIdBadge,
  FaEnvelope,
  FaPhoneAlt,
  FaAward,
  FaChevronRight,
  FaShieldAlt,
  FaLayerGroup,
} from "react-icons/fa";

import "./TeacherOverview.css";


/* =========================================================
   TEACHER OVERVIEW
========================================================= */

const TeacherOverview = ({
  teacher,
  students = [],
  onStudents,
  onActiveStudents,
  onClasses,
  onMessages,
}) => {


  /* =========================================================
     ACTIVE STUDENTS
  ========================================================= */

  const activeStudents =
    useMemo(() => {

      return students.filter(
        (student) =>
          String(
            student.status ||
              "Active"
          )
            .trim()
            .toLowerCase() ===
          "active"
      ).length;

    }, [students]);


  /* =========================================================
     TEACHER CLASSES
  ========================================================= */

  const teacherClasses =
    Array.isArray(
      teacher?.classes
    )
      ? teacher.classes
      : [];


  /* =========================================================
     CLASS STUDENT COUNT
  ========================================================= */

  const getClassStudentCount = (
    classItem
  ) => {

    return students.filter(
      (student) => {

        const classMatch =
          String(
            student.className ||
              ""
          )
            .trim()
            .toLowerCase() ===
          String(
            classItem.className ||
              ""
          )
            .trim()
            .toLowerCase();


        const sectionMatch =
          !classItem.section ||
          String(
            student.section ||
              ""
          )
            .trim()
            .toLowerCase() ===
            String(
              classItem.section ||
                ""
            )
              .trim()
              .toLowerCase();


        return (
          classMatch &&
          sectionMatch
        );

      }
    ).length;

  };


  /* =========================================================
     NO TEACHER
  ========================================================= */

  if (!teacher) {
    return null;
  }


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="teacher-overview-page">


      {/* =====================================================
          HERO / WELCOME
      ===================================================== */}

      <section className="teacher-overview-hero">


        <div className="teacher-overview-hero-content">


          <span className="teacher-overview-label">
            TEACHER WORKSPACE
          </span>


          <h1>

            Welcome back,{" "}

            <strong>
              {teacher.name}
            </strong>

          </h1>


          <p>

            View your assigned classes,
            manage student profiles and
            stay connected with students
            and parents from your teacher
            workspace.

          </p>


          {/* HERO TAGS */}

          <div className="teacher-overview-hero-tags">


            <div>

              <FaIdBadge />

              <span>

                <small>
                  Employee ID
                </small>

                <strong>
                  {teacher.employeeId}
                </strong>

              </span>

            </div>


            <div>

              <FaBookOpen />

              <span>

                <small>
                  Subject
                </small>

                <strong>

                  {teacher.subject ||
                    "Not Assigned"}

                </strong>

              </span>

            </div>


            <div>

              <FaLayerGroup />

              <span>

                <small>
                  Classes
                </small>

                <strong>
                  {
                    teacherClasses.length
                  }
                </strong>

              </span>

            </div>


          </div>

        </div>


        {/* HERO ART */}

        <div className="teacher-overview-hero-art">


          <div className="teacher-overview-art-circle">

            <FaChalkboardTeacher />

          </div>


          <span className="teacher-overview-art-dot dot-one" />

          <span className="teacher-overview-art-dot dot-two" />

          <span className="teacher-overview-art-dot dot-three" />


        </div>


      </section>


      {/* =====================================================
          CLICKABLE STATISTICS
      ===================================================== */}

      <section className="teacher-overview-stats">


        {/* MY STUDENTS */}

        <OverviewStat

          icon={
            FaUserGraduate
          }

          value={
            students.length
          }

          label="My Students"

          description="Total assigned students"

          onClick={
            onStudents
          }

        />


        {/* ACTIVE STUDENTS */}

        <OverviewStat

          icon={
            FaUsers
          }

          value={
            activeStudents
          }

          label="Active Students"

          description="Currently active profiles"

          onClick={
            onActiveStudents ||
            onStudents
          }

        />


        {/* ASSIGNED CLASSES */}

        <OverviewStat

          icon={
            FaGraduationCap
          }

          value={
            teacherClasses.length
          }

          label="Assigned Classes"

          description="Classes under your access"

          onClick={
            onClasses ||
            onStudents
          }

        />


        {/* PRIVATE COMMUNICATION */}

        <OverviewStat

          icon={
            FaComments
          }

          value="Private"

          label="Communication"

          description="Students & parents"

          onClick={
            onMessages
          }

        />


      </section>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <section className="teacher-overview-main-grid">


        {/* ===================================================
            ASSIGNED CLASSES
        =================================================== */}

        <article
          className="
            teacher-overview-card
            teacher-overview-classes
          "
        >


          <CardHeading

            icon={
              FaGraduationCap
            }

            label="CLASS ACCESS"

            title="My Assigned Classes"

          />


          <p className="teacher-overview-card-description">

            You can access and manage
            students only from the
            classes assigned to your
            teacher account.

          </p>


          <div className="teacher-overview-class-list">


            {teacherClasses.length >
            0 ? (

              teacherClasses.map(
                (
                  classItem,
                  index
                ) => (

                  <div
                    className="teacher-overview-class-item"
                    key={`${classItem.className}-${classItem.section}-${index}`}
                  >


                    <div className="teacher-overview-class-icon">

                      <FaGraduationCap />

                    </div>


                    <div className="teacher-overview-class-info">


                      <span>
                        ASSIGNED CLASS
                      </span>


                      <h3>

                        {classItem.className ||
                          "Class"}

                      </h3>


                      <p>

                        Section{" "}

                        <strong>

                          {classItem.section ||
                            "All"}

                        </strong>

                      </p>


                    </div>


                    <div className="teacher-overview-class-count">


                      <strong>

                        {
                          getClassStudentCount(
                            classItem
                          )
                        }

                      </strong>


                      <span>
                        Students
                      </span>


                    </div>


                  </div>

                )
              )

            ) : (

              <div className="teacher-overview-no-data">


                <FaGraduationCap />


                <h3>
                  No Class Assigned
                </h3>


                <p>

                  Please contact the
                  administrator to assign
                  a class to this teacher
                  account.

                </p>


              </div>

            )}


          </div>


          <button
            type="button"
            className="teacher-overview-primary-btn"
            onClick={
              onStudents
            }
          >

            <FaUserGraduate />

            Manage My Students

            <FaChevronRight />

          </button>


        </article>


        {/* ===================================================
            TEACHER PROFILE
        =================================================== */}

        <article
          className="
            teacher-overview-card
            teacher-overview-profile
          "
        >


          <CardHeading

            icon={
              FaChalkboardTeacher
            }

            label="MY PROFILE"

            title="Teacher Information"

          />


          <div className="teacher-overview-profile-top">


            <div className="teacher-overview-profile-avatar">

              {teacher.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "T"}

            </div>


            <div>


              <h3>
                {teacher.name}
              </h3>


              <p>

                {teacher.designation ||
                  "Teacher"}

              </p>


              <span>

                <FaShieldAlt />

                Active Teacher

              </span>


            </div>


          </div>


          <div className="teacher-overview-profile-details">


            <ProfileItem

              icon={
                FaIdBadge
              }

              label="Employee ID"

              value={
                teacher.employeeId
              }

            />


            <ProfileItem

              icon={
                FaBookOpen
              }

              label="Subject"

              value={
                teacher.subject
              }

            />


            <ProfileItem

              icon={
                FaAward
              }

              label="Qualification"

              value={
                teacher.qualification
              }

            />


            <ProfileItem

              icon={
                FaChalkboardTeacher
              }

              label="Experience"

              value={
                teacher.experience
              }

            />


            <ProfileItem

              icon={
                FaEnvelope
              }

              label="School Email"

              value={
                teacher.email
              }

            />


            <ProfileItem

              icon={
                FaPhoneAlt
              }

              label="School Contact"

              value={
                teacher.schoolContact
              }

            />


          </div>


        </article>


      </section>


      {/* =====================================================
          PRIVATE COMMUNICATION
      ===================================================== */}

      <section className="teacher-overview-communication">


        <div className="teacher-overview-communication-content">


          <span>
            PRIVATE COMMUNICATION
          </span>


          <h2>
            Stay Connected With
            Students & Parents
          </h2>


          <p>

            Student conversations and
            parent conversations are
            kept in separate
            communication channels
            inside the teacher portal.

          </p>


          <button
            type="button"
            onClick={
              onMessages
            }
          >

            Open Private Messages

            <FaChevronRight />

          </button>


        </div>


        <div className="teacher-overview-chat-options">


          {/* STUDENT CHAT */}

          <button
            type="button"
            className="teacher-overview-chat-card"
            onClick={
              onMessages
            }
          >


            <div>

              <FaUserGraduate />

            </div>


            <span>


              <small>
                PRIVATE CHANNEL
              </small>


              <strong>
                Teacher ↔ Student
              </strong>


              <p>

                Communicate directly
                with an assigned
                student.

              </p>


            </span>


            <FaChevronRight
              className="teacher-overview-chat-arrow"
            />


          </button>


          {/* PARENT CHAT */}

          <button
            type="button"
            className="teacher-overview-chat-card"
            onClick={
              onMessages
            }
          >


            <div>

              <FaUsers />

            </div>


            <span>


              <small>
                PRIVATE CHANNEL
              </small>


              <strong>
                Teacher ↔ Parent
              </strong>


              <p>

                Stay connected with the
                student's linked
                parent.

              </p>


            </span>


            <FaChevronRight
              className="teacher-overview-chat-arrow"
            />


          </button>


        </div>


      </section>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="teacher-overview-actions">


        <div className="teacher-overview-section-heading">


          <span>
            QUICK ACCESS
          </span>


          <h2>
            What would you like to
            manage?
          </h2>


          <p>

            Access the most important
            teacher tools directly from
            your dashboard.

          </p>


        </div>


        <div className="teacher-overview-action-grid">


          {/* STUDENTS */}

          <button
            type="button"
            onClick={
              onStudents
            }
          >


            <div>

              <FaUserGraduate />

            </div>


            <span>


              <strong>
                Student Profiles
              </strong>


              <small>

                View, add, edit and
                manage assigned
                students.

              </small>


            </span>


            <FaChevronRight />


          </button>


          {/* MESSAGES */}

          <button
            type="button"
            onClick={
              onMessages
            }
          >


            <div>

              <FaComments />

            </div>


            <span>


              <strong>
                Private Messages
              </strong>


              <small>

                Communicate with
                students and their
                parents.

              </small>


            </span>


            <FaChevronRight />


          </button>


        </div>


      </section>


    </div>

  );

};


/* =========================================================
   CLICKABLE STAT COMPONENT
========================================================= */

const OverviewStat = ({
  icon: Icon,
  value,
  label,
  description,
  onClick,
}) => {

  return (

    <button
      type="button"
      className="
        teacher-overview-stat-card
        teacher-overview-stat-clickable
      "
      onClick={
        onClick
      }
      aria-label={`Open ${label}`}
    >


      <div className="teacher-overview-stat-icon">

        <Icon />

      </div>


      <div className="teacher-overview-stat-content">


        <strong>
          {value}
        </strong>


        <h3>
          {label}
        </h3>


        <p>
          {description}
        </p>


      </div>


      <div className="teacher-overview-stat-arrow">

        <FaChevronRight />

      </div>


    </button>

  );

};


/* =========================================================
   CARD HEADING
========================================================= */

const CardHeading = ({
  icon: Icon,
  label,
  title,
}) => {

  return (

    <div className="teacher-overview-card-heading">


      <div>

        <Icon />

      </div>


      <span>


        <small>
          {label}
        </small>


        <h2>
          {title}
        </h2>


      </span>


    </div>

  );

};


/* =========================================================
   PROFILE ITEM
========================================================= */

const ProfileItem = ({
  icon: Icon,
  label,
  value,
}) => {

  return (

    <div className="teacher-overview-profile-item">


      <div>

        <Icon />

      </div>


      <span>


        <small>
          {label}
        </small>


        <strong>

          {value ||
            "Not Available"}

        </strong>


      </span>


    </div>

  );

};


export default TeacherOverview;