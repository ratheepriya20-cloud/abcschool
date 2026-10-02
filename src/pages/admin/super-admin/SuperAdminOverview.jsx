import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaCommentDots,
  FaEnvelope,
  FaClipboardList,
  FaBullhorn,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

import "./SuperAdminOverview.css";

import {
  getStudents,
} from "../../../data/studentsData";

import {
  getTeachers,
} from "../../../data/teachersData";

import {
  getParents,
} from "../../../data/parentsData";

import {
  getAttendance,
} from "../../../data/attendanceData";

import {
  getFees,
} from "../../../data/feesData";

import {
  getAssignments,
} from "../../../data/assignmentsData";

import {
  getNotices,
} from "../../../data/noticesData";

import {
  getInquiries,
} from "../../../data/inquiriesData";

import {
  getContactMessages,
} from "../../../data/contactMessagesData";

const SuperAdminOverview = ({
  onNavigate,
}) => {
  const [dashboard, setDashboard] =
    useState({
      students: [],
      teachers: [],
      parents: [],
      attendance: [],
      fees: [],
      assignments: [],
      notices: [],
      inquiries: [],
      messages: [],
    });

  const loadDashboard = () => {
    setDashboard({
      students:
        getStudents() || [],

      teachers:
        getTeachers() || [],

      parents:
        getParents() || [],

      attendance:
        getAttendance() || [],

      fees:
        getFees() || [],

      assignments:
        getAssignments() || [],

      notices:
        getNotices() || [],

      inquiries:
        getInquiries() || [],

      messages:
        getContactMessages() || [],
    });
  };

  useEffect(() => {
    loadDashboard();

    const update = () => {
      loadDashboard();
    };

    window.addEventListener(
      "abpsDataUpdated",
      update
    );

    window.addEventListener(
      "storage",
      update
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        update
      );

      window.removeEventListener(
        "storage",
        update
      );
    };
  }, []);

  const newInquiries =
    dashboard.inquiries.filter(
      (item) =>
        item.status === "New"
    );

  const newMessages =
    dashboard.messages.filter(
      (item) =>
        item.status === "New"
    );

  const pendingFees =
    dashboard.fees.filter(
      (item) =>
        item.status === "Pending" ||
        item.status === "Overdue"
    );

  const activeStudents =
    dashboard.students.filter(
      (item) =>
        item.status !== "Inactive"
    );

  const stats = [
    {
      title:
        "Total Students",
      value:
        dashboard.students.length,
      icon: FaUserGraduate,
      page: "students",
    },

    {
      title:
        "Total Teachers",
      value:
        dashboard.teachers.length,
      icon:
        FaChalkboardTeacher,
      page: "teachers",
    },

    {
      title:
        "Total Parents",
      value:
        dashboard.parents.length,
      icon: FaUsers,
      page: "parents",
    },

    {
      title:
        "Attendance Records",
      value:
        dashboard.attendance.length,
      icon:
        FaCalendarCheck,
      page: "attendance",
    },

    {
      title:
        "Pending Fees",
      value:
        pendingFees.length,
      icon:
        FaMoneyBillWave,
      page: "fees",
    },

    {
      title:
        "New Inquiries",
      value:
        newInquiries.length,
      icon: FaCommentDots,
      page: "inquiries",
    },

    {
      title:
        "New Messages",
      value:
        newMessages.length,
      icon: FaEnvelope,
      page:
        "contactMessages",
    },

    {
      title:
        "Assignments",
      value:
        dashboard
          .assignments.length,
      icon:
        FaClipboardList,
      page: "assignments",
    },
  ];

  return (
    <div className="sao-page">

      <div className="sao-header">

        <div>

          <span className="sao-label">
            SUPER ADMIN
          </span>

          <h1>
            School Overview
          </h1>

          <p>
            Monitor students,
            academics, communication
            and school administration
            from one place.
          </p>

        </div>

        <div className="sao-date">

          <FaClock />

          {new Date().toLocaleDateString(
            "en-IN",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}

        </div>

      </div>

      <div className="sao-stats">

        {stats.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <button
                type="button"
                className="sao-stat-card"
                key={item.title}
                onClick={() =>
                  onNavigate?.(
                    item.page
                  )
                }
              >

                <div className="sao-stat-head">

                  <div>
                    <Icon />
                  </div>

                  <FaArrowRight />

                </div>

                <strong>
                  {item.value}
                </strong>

                <span>
                  {item.title}
                </span>

              </button>
            );
          }
        )}

      </div>

      <div className="sao-grid">

        {/* RECENT INQUIRIES */}

        <section className="sao-panel">

          <PanelHeader
            label="COMMUNICATION"
            title="Recent Inquiries"
            onClick={() =>
              onNavigate?.(
                "inquiries"
              )
            }
          />

          <div className="sao-list">

            {dashboard.inquiries
              .slice(0, 5)
              .map((item) => (

                <button
                  type="button"
                  className="sao-list-item"
                  key={item.id}
                  onClick={() =>
                    onNavigate?.(
                      "inquiries"
                    )
                  }
                >

                  <div className="sao-list-avatar">
                    {item.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "I"}
                  </div>

                  <div className="sao-list-content">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.inquiryType}

                      {item.className
                        ? ` • ${item.className}`
                        : ""}
                    </span>

                  </div>

                  <Status
                    value={
                      item.status ||
                      "New"
                    }
                  />

                </button>

              ))}

            {!dashboard
              .inquiries.length && (
              <Empty
                text="No inquiries yet."
              />
            )}

          </div>

        </section>

        {/* QUICK SUMMARY */}

        <section className="sao-panel">

          <PanelHeader
            label="SCHOOL STATUS"
            title="Quick Summary"
          />

          <div className="sao-summary">

            <SummaryItem
              icon={
                FaUserGraduate
              }
              label="Active Students"
              value={
                activeStudents.length
              }
            />

            <SummaryItem
              icon={
                FaMoneyBillWave
              }
              label="Pending Fees"
              value={
                pendingFees.length
              }
            />

            <SummaryItem
              icon={
                FaCommentDots
              }
              label="New Inquiries"
              value={
                newInquiries.length
              }
            />

            <SummaryItem
              icon={FaEnvelope}
              label="New Messages"
              value={
                newMessages.length
              }
            />

            <SummaryItem
              icon={
                FaClipboardList
              }
              label="Assignments"
              value={
                dashboard
                  .assignments.length
              }
            />

            <SummaryItem
              icon={FaBullhorn}
              label="Notices"
              value={
                dashboard
                  .notices.length
              }
            />

          </div>

        </section>

      </div>

      {/* SECOND ROW */}

      <div className="sao-grid sao-grid-second">

        <section className="sao-panel">

          <PanelHeader
            label="ACADEMICS"
            title="Recent Assignments"
            onClick={() =>
              onNavigate?.(
                "assignments"
              )
            }
          />

          <div className="sao-simple-list">

            {dashboard.assignments
              .slice(0, 5)
              .map((item) => (

                <div
                  key={item.id}
                  className="sao-simple-item"
                >

                  <div>
                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.subject}
                      {" • "}
                      {item.className}
                      {item.section
                        ? `-${item.section}`
                        : ""}
                    </span>
                  </div>

                  <small>
                    {item.dueDate ||
                      "No due date"}
                  </small>

                </div>

              ))}

            {!dashboard
              .assignments.length && (
              <Empty
                text="No assignments available."
              />
            )}

          </div>

        </section>

        <section className="sao-panel">

          <PanelHeader
            label="SCHOOL UPDATES"
            title="Latest Notices"
            onClick={() =>
              onNavigate?.(
                "notices"
              )
            }
          />

          <div className="sao-simple-list">

            {dashboard.notices
              .slice(0, 5)
              .map((item) => (

                <div
                  key={item.id}
                  className="sao-simple-item"
                >

                  <div>
                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.category ||
                        "General"}
                    </span>
                  </div>

                  <small>
                    {item.date || "—"}
                  </small>

                </div>

              ))}

            {!dashboard
              .notices.length && (
              <Empty
                text="No notices available."
              />
            )}

          </div>

        </section>

      </div>

    </div>
  );
};

const PanelHeader = ({
  label,
  title,
  onClick,
}) => (
  <div className="sao-panel-header">

    <div>
      <span>{label}</span>
      <h2>{title}</h2>
    </div>

    {onClick && (
      <button
        type="button"
        onClick={onClick}
      >
        View All
        <FaArrowRight />
      </button>
    )}

  </div>
);

const Status = ({
  value,
}) => (
  <span
    className={`sao-status sao-status-${String(
      value
    )
      .toLowerCase()
      .replace(/\s+/g, "-")}`}
  >
    {value}
  </span>
);

const SummaryItem = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="sao-summary-item">

    <div>
      <Icon />
    </div>

    <span>
      {label}
    </span>

    <strong>
      {value}
    </strong>

  </div>
);

const Empty = ({
  text,
}) => (
  <div className="sao-empty">
    {text}
  </div>
);

export default SuperAdminOverview;