import React, { useMemo } from "react";

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaBookOpen,
  FaCalendarAlt,
} from "react-icons/fa";

import "./ParentAssignments.css";

const ParentAssignments = ({
  student,
  assignments = [],
}) => {

  const submitted =
    useMemo(
      () =>
        assignments.filter(
          (item) =>
            item.status ===
            "Submitted"
        ).length,
      [assignments]
    );


  const pending =
    assignments.length -
    submitted;


  return (
    <div className="pp-page">

      <section className="pp-page-hero">

        <span className="pp-eyebrow">
          HOMEWORK & TASKS
        </span>

        <h1>
          Assignments
        </h1>

        <p>
          Track assigned academic work,
          deadlines and submission status
          for {student?.name || "your child"}.
        </p>

      </section>


      <section className="pp-summary-grid">

        <AssignmentSummary
          icon={FaClipboardList}
          value={assignments.length}
          label="Total Assignments"
        />

        <AssignmentSummary
          icon={FaCheckCircle}
          value={submitted}
          label="Submitted"
        />

        <AssignmentSummary
          icon={FaClock}
          value={pending}
          label="Pending"
        />

      </section>


      <section className="pp-assignment-grid">

        {assignments.map(
          (assignment) => (

            <article
              className="pp-assignment-card"
              key={assignment.id}
            >

              <div className="pp-assignment-top">

                <span className="pp-assignment-icon">
                  <FaBookOpen />
                </span>

                <span
                  className={`pp-status ${
                    assignment.status ===
                    "Submitted"
                      ? "success"
                      : "warning"
                  }`}
                >

                  {assignment.status ===
                  "Submitted" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaClock />
                  )}

                  {assignment.status}

                </span>

              </div>


              <span className="pp-subject">
                {assignment.subject}
              </span>


              <h2>
                {assignment.title}
              </h2>


              <div className="pp-assignment-dates">

                <div>
                  <FaCalendarAlt />

                  <span>
                    Assigned
                    <strong>
                      {assignment.assignedDate}
                    </strong>
                  </span>
                </div>


                <div>
                  <FaClock />

                  <span>
                    Due Date
                    <strong>
                      {assignment.dueDate}
                    </strong>
                  </span>
                </div>

              </div>

            </article>

          )
        )}

      </section>

    </div>
  );
};


const AssignmentSummary = ({
  icon: Icon,
  value,
  label,
}) => (
  <article className="pp-summary-card">

    <span>
      <Icon />
    </span>

    <div>
      <strong>{value}</strong>
      <p>{label}</p>
    </div>

  </article>
);


export default ParentAssignments;