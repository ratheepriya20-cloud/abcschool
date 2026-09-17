
import React from "react";
import {
  FaGraduationCap,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaClipboardList,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaChevronRight,
  FaCalendarAlt,
  FaEye,
  FaCreditCard,
  FaDownload,
} from "react-icons/fa";
import "./ParentOverview.css";

const ParentOverview = ({
  profile,
  onNavigate,
  assignments,
  notices,
  events,
  fees,
  results,
  onAssignment,
  onNotice,
  onEvent,
  onPayment,
  onDownloadReceipt,
}) => {
  const pendingAssignments = assignments.filter(
    (item) => !item.submitted
  ).length;

  const pendingFees = fees.filter(
    (item) => item.status === "Pending"
  );

  const totalPending = pendingFees.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="aboverview-page">
      <div className="aboverview-welcome">
        <div className="aboverview-welcome-content">
          <span className="aboverview-eyebrow">PARENT PORTAL</span>
          <h1>Welcome back, {profile.parent}</h1>
          <p>
            Here is your child's latest academic and school information.
          </p>
        </div>

        <div className="aboverview-student-badge">
          <div className="aboverview-student-icon">
            <FaGraduationCap />
          </div>

          <div className="aboverview-student-info">
            <strong>{profile.student}</strong>
            <span>{profile.className}</span>
          </div>
        </div>
      </div>

      <div className="aboverview-stat-grid">
        <div className="aboverview-stat-card aboverview-stat-blue">
          <div className="aboverview-stat-icon">
            <FaGraduationCap />
          </div>

          <div className="aboverview-stat-content">
            <span>Attendance</span>
            <strong>92%</strong>
          </div>
        </div>

        <div className="aboverview-stat-card aboverview-stat-sky">
          <div className="aboverview-stat-icon">
            <FaCalendarCheck />
          </div>

          <div className="aboverview-stat-content">
            <span>Present Days</span>
            <strong>168</strong>
          </div>
        </div>

        <div className="aboverview-stat-card aboverview-stat-gold">
          <div className="aboverview-stat-icon">
            <FaMoneyBillWave />
          </div>

          <div className="aboverview-stat-content">
            <span>Pending Fees</span>
            <strong>
              ₹{totalPending.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="aboverview-stat-card aboverview-stat-purple">
          <div className="aboverview-stat-icon">
            <FaChartBar />
          </div>

          <div className="aboverview-stat-content">
            <span>Average Marks</span>
            <strong>92.4%</strong>
          </div>
        </div>
      </div>

      <div className="aboverview-content-grid">
        <div className="aboverview-panel">
          <div className="aboverview-panel-header">
            <div>
              <span className="aboverview-section-label">
                ACADEMICS
              </span>
              <h2>Recent Assignments</h2>
            </div>

            <button
              className="aboverview-text-button"
              onClick={() => onNavigate("Assignments")}
            >
              View All
              <FaArrowRight />
            </button>
          </div>

          <div className="aboverview-assignment-list">
            {assignments.slice(0, 3).map((assignment) => (
              <div
                className="aboverview-assignment-row"
                key={assignment.id}
              >
                <div className="aboverview-assignment-icon">
                  <FaBookOpen />
                </div>

                <div className="aboverview-assignment-info">
                  <strong>
                    {assignment.title || assignment.subject}
                  </strong>

                  <span>
                    {assignment.subject} • Due {assignment.due}
                  </span>
                </div>

                <div
                  className={`aboverview-status ${
                    assignment.submitted
                      ? "aboverview-status-success"
                      : "aboverview-status-pending"
                  }`}
                >
                  {assignment.submitted ? (
                    <>
                      <FaCheckCircle />
                      Submitted
                    </>
                  ) : (
                    <>
                      <FaClock />
                      Pending
                    </>
                  )}
                </div>

                <button
                  className="aboverview-row-arrow"
                  onClick={() => onAssignment(assignment)}
                  aria-label="View assignment"
                >
                  <FaChevronRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="aboverview-panel">
          <div className="aboverview-panel-header">
            <div>
              <span className="aboverview-section-label">
                UPDATES
              </span>
              <h2>Latest Notices</h2>
            </div>

            <button
              className="aboverview-text-button"
              onClick={() => onNavigate("Notices")}
            >
              View All
              <FaArrowRight />
            </button>
          </div>

          <div className="aboverview-notice-list">
            {notices.map((notice) => (
              <button
                className="aboverview-notice-row"
                key={notice.id}
                onClick={() => onNotice(notice)}
              >
                <div className="aboverview-notice-date">
                  <span>{notice.date.split(" ")[0]}</span>
                  <small>{notice.date.split(" ")[1]}</small>
                </div>

                <div className="aboverview-notice-info">
                  <strong>{notice.title}</strong>
                  <span>{notice.category}</span>
                </div>

                <FaChevronRight />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="aboverview-content-grid">
        <div className="aboverview-panel">
          <div className="aboverview-panel-header">
            <div>
              <span className="aboverview-section-label">
                SCHOOL LIFE
              </span>
              <h2>Upcoming Events</h2>
            </div>

            <button
              className="aboverview-text-button"
              onClick={() => onNavigate("Events")}
            >
              View All
              <FaArrowRight />
            </button>
          </div>

          <div className="aboverview-event-list">
            {events.map((event) => (
              <button
                className="aboverview-event-row"
                key={event.id}
                onClick={() => onEvent(event)}
              >
                <div className="aboverview-event-icon">
                  <FaCalendarAlt />
                </div>

                <div className="aboverview-event-info">
                  <strong>{event.title}</strong>
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>

                <FaChevronRight />
              </button>
            ))}
          </div>
        </div>

        <div className="aboverview-panel">
          <div className="aboverview-panel-header">
            <div>
              <span className="aboverview-section-label">
                FINANCE
              </span>
              <h2>Fee Summary</h2>
            </div>

            <button
              className="aboverview-text-button"
              onClick={() => onNavigate("Fees")}
            >
              View Fees
              <FaArrowRight />
            </button>
          </div>

          <div className="aboverview-fee-summary">
            {fees.map((fee) => (
              <div
                className="aboverview-fee-row"
                key={fee.id}
              >
                <div className="aboverview-fee-info">
                  <strong>{fee.title}</strong>

                  <span
                    className={
                      fee.status === "Paid"
                        ? "aboverview-paid"
                        : "aboverview-pending"
                    }
                  >
                    {fee.status}
                  </span>
                </div>

                <strong className="aboverview-fee-amount">
                  ₹{fee.amount.toLocaleString("en-IN")}
                </strong>
              </div>
            ))}

            {pendingFees.length > 0 && (
              <button
                className="aboverview-primary-button"
                onClick={onPayment}
              >
                <FaCreditCard />
                Pay Pending Fee
              </button>
            )}

            <button
              className="aboverview-secondary-button"
              onClick={onDownloadReceipt}
            >
              <FaDownload />
              Download Receipt
            </button>
          </div>
        </div>
      </div>

      <div className="aboverview-quick-grid">
        <button
          className="aboverview-quick-card"
          onClick={() => onNavigate("Attendance")}
        >
          <div className="aboverview-quick-icon">
            <FaCalendarCheck />
          </div>

          <div className="aboverview-quick-content">
            <strong>Attendance</strong>
            <span>Check monthly attendance</span>
          </div>

          <FaArrowRight className="aboverview-quick-arrow" />
        </button>

        <button
          className="aboverview-quick-card"
          onClick={() => onNavigate("Results")}
        >
          <div className="aboverview-quick-icon">
            <FaChartBar />
          </div>

          <div className="aboverview-quick-content">
            <strong>Results</strong>
            <span>View academic performance</span>
          </div>

          <FaArrowRight className="aboverview-quick-arrow" />
        </button>

        <button
          className="aboverview-quick-card"
          onClick={() => onNavigate("Assignments")}
        >
          <div className="aboverview-quick-icon">
            <FaClipboardList />
          </div>

          <div className="aboverview-quick-content">
            <strong>Assignments</strong>
            <span>
              {pendingAssignments} pending assignments
            </span>
          </div>

          <FaArrowRight className="aboverview-quick-arrow" />
        </button>

        <button
          className="aboverview-quick-card"
          onClick={() => onNavigate("Notices")}
        >
          <div className="aboverview-quick-icon">
            <FaEye />
          </div>

          <div className="aboverview-quick-content">
            <strong>School Notices</strong>
            <span>Latest school announcements</span>
          </div>

          <FaArrowRight className="aboverview-quick-arrow" />
        </button>
      </div>
    </div>
  );
};

export default ParentOverview;

