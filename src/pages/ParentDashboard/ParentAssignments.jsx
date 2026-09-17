
import React from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import "./ParentAssignments.css";

const ParentAssignments = ({
  assignments = [],
  onAssignment,
}) => {
  const submittedCount = assignments.filter(
    (item) => item.submitted
  ).length;

  const pendingCount = assignments.filter(
    (item) => !item.submitted
  ).length;

  return (
    <div className="abassign-page">
      <div className="abassign-heading">
        <span className="abassign-section-label">
          ACADEMICS
        </span>

        <h1>Assignments</h1>

        <p>
          Check your child's current assignments and
          submission status.
        </p>
      </div>

      <div className="abassign-summary">
        <div className="abassign-summary-card">
          <span>Total Assignments</span>
          <strong>{assignments.length}</strong>
        </div>

        <div className="abassign-summary-card">
          <span>Submitted</span>
          <strong>{submittedCount}</strong>
        </div>

        <div className="abassign-summary-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>
      </div>

      <div className="abassign-panel">
        <div className="abassign-panel-header">
          <div>
            <span className="abassign-section-label">
              ASSIGNMENT LIST
            </span>

            <h2>Recent Assignments</h2>
          </div>
        </div>

        <div className="abassign-list">
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <div
                className="abassign-row"
                key={assignment.id || index}
              >
                <div className="abassign-icon">
                  <FaBookOpen />
                </div>

                <div className="abassign-info">
                  <strong>
                    {assignment.title ||
                      assignment.subject ||
                      "Assignment"}
                  </strong>

                  <span>
                    {assignment.subject || "Academic"}{" "}
                    • {assignment.teacher || "Teacher"}
                  </span>

                  <small>
                    Assigned: {assignment.assigned || "N/A"}{" "}
                    • Due: {assignment.due || "N/A"}
                  </small>
                </div>

                <div
                  className={
                    assignment.submitted
                      ? "abassign-status abassign-status-success"
                      : "abassign-status abassign-status-pending"
                  }
                >
                  {assignment.submitted ? (
                    <>
                      <FaCheckCircle />
                      <span>Submitted</span>
                    </>
                  ) : (
                    <>
                      <FaClock />
                      <span>Pending</span>
                    </>
                  )}
                </div>

                <button
                  className="abassign-arrow"
                  onClick={() => onAssignment(assignment)}
                  aria-label="View assignment details"
                >
                  <FaArrowRight />
                </button>
              </div>
            ))
          ) : (
            <div className="abassign-empty">
              No assignments available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentAssignments;

