import React, { useMemo } from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "./StudentAssignments.css";

const StudentAssignments = ({
  assignments = [],
  student,
}) => {
  /* =====================================================
     CURRENT STUDENT ID
  ===================================================== */

  const studentId =
    student?.id ||
    student?.studentId ||
    "";

  /* =====================================================
     FILTER STUDENT ASSIGNMENTS
     Dashboard se already filtered data aaye to bhi chalega.
  ===================================================== */

  const studentAssignments = useMemo(() => {
    if (!Array.isArray(assignments)) {
      return [];
    }

    if (!studentId) {
      return assignments;
    }

    return assignments.filter((item) => {
      /*
        Agar assignment ke andar studentId hi nahi hai,
        iska matlab dashboard/class level filtering
        already ho sakti hai.
      */

      if (!item?.studentId) {
        return true;
      }

      return (
        String(item.studentId) ===
        String(studentId)
      );
    });
  }, [assignments, studentId]);

  /* =====================================================
     DATE FORMAT
  ===================================================== */

  const formatDate = (value) => {
    if (!value) {
      return "Not Provided";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =====================================================
     STATUS
  ===================================================== */

  const getStatus = (assignment) => {
    const status =
      assignment?.status ||
      assignment?.submissionStatus ||
      "Pending";

    return status;
  };

  const getStatusClass = (status) => {
    const cleanStatus = String(status)
      .toLowerCase()
      .trim();

    if (
      cleanStatus === "submitted" ||
      cleanStatus === "completed"
    ) {
      return "submitted";
    }

    if (
      cleanStatus === "overdue" ||
      cleanStatus === "late"
    ) {
      return "overdue";
    }

    return "pending";
  };

  /* =====================================================
     COUNTS
  ===================================================== */

  const totalAssignments =
    studentAssignments.length;

  const completedAssignments =
    studentAssignments.filter((item) => {
      const status = getStatus(item)
        .toLowerCase()
        .trim();

      return (
        status === "submitted" ||
        status === "completed"
      );
    }).length;

  const pendingAssignments =
    studentAssignments.filter((item) => {
      const status = getStatus(item)
        .toLowerCase()
        .trim();

      return ![
        "submitted",
        "completed",
      ].includes(status);
    }).length;

  return (
    <div className="stuPage">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="stuHero small">
        <span>ACADEMIC WORK</span>

        <h1>My Assignments</h1>

        <p>
          View assignments, subjects, assigned dates,
          due dates and submission status.
        </p>
      </section>

      {/* =================================================
          ASSIGNMENT SUMMARY
      ================================================= */}

      <section className="stuAssignmentSummary">

        <div className="stuAssignmentSummaryCard">
          <div className="stuAssignmentSummaryIcon">
            <FaClipboardList />
          </div>

          <div>
            <span>Total Assignments</span>
            <strong>{totalAssignments}</strong>
          </div>
        </div>

        <div className="stuAssignmentSummaryCard">
          <div className="stuAssignmentSummaryIcon completed">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedAssignments}</strong>
          </div>
        </div>

        <div className="stuAssignmentSummaryCard">
          <div className="stuAssignmentSummaryIcon pending">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingAssignments}</strong>
          </div>
        </div>

      </section>

      {/* =================================================
          ASSIGNMENTS
      ================================================= */}

      {studentAssignments.length > 0 ? (
        <div className="stuCards">

          {studentAssignments.map(
            (assignment, index) => {
              const status =
                getStatus(assignment);

              const statusClass =
                getStatusClass(status);

              return (
                <article
                  className="stuCard"
                  key={
                    assignment.id ||
                    `assignment-${index}`
                  }
                >

                  {/* TOP */}

                  <div className="stuCardTop">

                    <span className="stuAssignmentSubject">
                      <FaBookOpen />

                      {assignment.subject ||
                        "General"}
                    </span>

                    <span
                      className={`stuStatus ${statusClass}`}
                    >
                      {status}
                    </span>

                  </div>

                  {/* TITLE */}

                  <h3>
                    {assignment.title ||
                      assignment.assignmentTitle ||
                      "Assignment"}
                  </h3>

                  {/* DESCRIPTION */}

                  <p>
                    {assignment.description ||
                      assignment.details ||
                      assignment.instructions ||
                      "Complete the assigned work and submit it before the due date."}
                  </p>

                  {/* META */}

                  <div className="stuMeta">

                    <span>
                      <FaCalendarAlt />

                      <span>
                        <small>
                          Assigned
                        </small>

                        <strong>
                          {formatDate(
                            assignment.assignedDate ||
                            assignment.assignedOn ||
                            assignment.date
                          )}
                        </strong>
                      </span>
                    </span>

                    <span>
                      <FaClock />

                      <span>
                        <small>
                          Due Date
                        </small>

                        <strong>
                          {formatDate(
                            assignment.dueDate ||
                            assignment.deadline
                          )}
                        </strong>
                      </span>
                    </span>

                  </div>

                  {/* TEACHER */}

                  {(assignment.teacherName ||
                    assignment.teacher) && (
                    <div className="stuAssignmentTeacher">
                      <span>
                        Assigned by
                      </span>

                      <strong>
                        {assignment.teacherName ||
                          assignment.teacher}
                      </strong>
                    </div>
                  )}

                </article>
              );
            }
          )}

        </div>
      ) : (
        <div className="stuEmpty">

          <FaClipboardList />

          <h3>
            No Assignments Available
          </h3>

          <p>
            There are currently no assignments
            available for you.
          </p>

        </div>
      )}

    </div>
  );
};

export default StudentAssignments;