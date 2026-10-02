import React, { useMemo } from "react";

import {
  FaUserGraduate,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartLine,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

import "./ParentOverview.css";
const ParentOverview = ({
  parent,
  student,
  attendance = [],
  fees = [],
  results = [],
  assignments = [],
  notices = [],
  events = [],
  onNavigate,
}) => {
  const attendancePercentage = useMemo(() => {
    if (!attendance.length) return 0;

    const totalPresent = attendance.reduce(
      (sum, item) => sum + Number(item.present || 0),
      0
    );

    const totalWorking = attendance.reduce(
      (sum, item) => sum + Number(item.workingDays || 0),
      0
    );

    if (!totalWorking) return 0;

    return Math.round(
      (totalPresent / totalWorking) * 100
    );
  }, [attendance]);

  const pendingFees = useMemo(() => {
    return fees
      .filter((fee) => fee.status === "Pending")
      .reduce(
        (sum, fee) =>
          sum + Number(fee.amount || 0),
        0
      );
  }, [fees]);

  const averageResult = useMemo(() => {
    if (!results.length) return 0;

    const percentages = results.map((item) => {
      const marks = Number(item.marks || 0);
      const total = Number(item.totalMarks || 100);

      return total
        ? (marks / total) * 100
        : 0;
    });

    return Math.round(
      percentages.reduce(
        (sum, value) => sum + value,
        0
      ) / percentages.length
    );
  }, [results]);

  const pendingAssignments =
    assignments.filter(
      (item) => item.status !== "Submitted"
    ).length;

  return (
    <div className="pp-page">

      {/* HERO */}

      <section className="pp-overview-hero">

        <div className="pp-overview-hero-content">

          <span className="pp-eyebrow">
            PARENT DASHBOARD
          </span>

          <h1>
            Welcome, {parent?.name || "Parent"}
          </h1>

          <p>
            Stay informed about your child's
            academic progress, attendance,
            assignments, fees and school
            activities.
          </p>

          <div className="pp-hero-tags">
            <span>
              <FaGraduationCap />
              {student?.className || "Class"}
              {" "}
              {student?.section || ""}
            </span>

            <span>
              Admission No.{" "}
              {student?.admissionNo || "—"}
            </span>
          </div>

        </div>

        <div className="pp-overview-student">

          <div className="pp-big-avatar">
            <FaUserGraduate />
          </div>

          <span>STUDENT PROFILE</span>

          <h2>
            {student?.name || "Student"}
          </h2>

          <p>
            Roll No. {student?.rollNo || "—"}
          </p>

          <strong>
            {student?.status || "Active"}
          </strong>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="pp-stat-grid">

        <OverviewStat
          icon={FaCalendarCheck}
          value={`${attendancePercentage}%`}
          title="Attendance"
          text="Overall attendance"
          onClick={() =>
            onNavigate?.("attendance")
          }
        />

        <OverviewStat
          icon={FaChartLine}
          value={`${averageResult}%`}
          title="Academic Score"
          text="Average performance"
          onClick={() =>
            onNavigate?.("results")
          }
        />

        <OverviewStat
          icon={FaMoneyBillWave}
          value={`₹${pendingFees.toLocaleString(
            "en-IN"
          )}`}
          title="Pending Fees"
          text={
            pendingFees
              ? "Payment required"
              : "All dues cleared"
          }
          onClick={() =>
            onNavigate?.("fees")
          }
        />

        <OverviewStat
          icon={FaClipboardList}
          value={pendingAssignments}
          title="Assignments"
          text="Pending submissions"
          onClick={() =>
            onNavigate?.("assignments")
          }
        />

      </section>


      {/* MAIN GRID */}

      <section className="pp-overview-grid">

        {/* ASSIGNMENTS */}

        <div className="pp-card">

          <CardHeader
            eyebrow="ACADEMICS"
            title="Recent Assignments"
            icon={FaClipboardList}
            onClick={() =>
              onNavigate?.("assignments")
            }
          />

          <div className="pp-list">

            {assignments
              .slice(0, 4)
              .map((item) => (

                <div
                  className="pp-list-row"
                  key={item.id}
                >

                  <div className="pp-list-icon">
                    <FaClipboardList />
                  </div>

                  <div className="pp-list-content">

                    <strong>
                      {item.title}
                    </strong>

                    <p>
                      {item.subject}
                    </p>

                  </div>

                  <span
                    className={`pp-status ${
                      item.status === "Submitted"
                        ? "success"
                        : "warning"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              ))}

          </div>

        </div>


        {/* NOTICES */}

        <div className="pp-card">

          <CardHeader
            eyebrow="SCHOOL UPDATES"
            title="Latest Notices"
            icon={FaBullhorn}
            onClick={() =>
              onNavigate?.("notices")
            }
          />

          <div className="pp-list">

            {notices
              .slice(0, 3)
              .map((notice) => (

                <div
                  className="pp-list-row"
                  key={notice.id}
                >

                  <div className="pp-list-icon gold">
                    <FaBullhorn />
                  </div>

                  <div className="pp-list-content">

                    <strong>
                      {notice.title}
                    </strong>

                    <p>
                      {notice.date}
                    </p>

                  </div>

                  <span className="pp-category">
                    {notice.category}
                  </span>

                </div>

              ))}

          </div>

        </div>


        {/* FEES */}

        <div className="pp-card">

          <CardHeader
            eyebrow="FINANCE"
            title="Fee Summary"
            icon={FaMoneyBillWave}
            onClick={() =>
              onNavigate?.("fees")
            }
          />

          <div className="pp-fee-mini-grid">

            {fees
              .slice(0, 3)
              .map((fee) => (

                <div
                  className="pp-fee-mini"
                  key={fee.id}
                >

                  <span>
                    {fee.title}
                  </span>

                  <strong>
                    ₹
                    {Number(
                      fee.amount || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <p
                    className={
                      fee.status === "Paid"
                        ? "paid"
                        : "pending"
                    }
                  >
                    {fee.status === "Paid" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaClock />
                    )}

                    {fee.status}
                  </p>

                </div>

              ))}

          </div>

        </div>


        {/* EVENTS */}

        <div className="pp-card">

          <CardHeader
            eyebrow="UPCOMING"
            title="School Events"
            icon={FaCalendarAlt}
            onClick={() =>
              onNavigate?.("events")
            }
          />

          <div className="pp-event-mini-list">

            {events
              .slice(0, 3)
              .map((event) => (

                <div
                  className="pp-event-mini"
                  key={event.id}
                >

                  <div className="pp-event-date">
                    <FaCalendarAlt />
                  </div>

                  <div>

                    <strong>
                      {event.title}
                    </strong>

                    <p>
                      {event.date}
                    </p>

                    <span>
                      {event.location}
                    </span>

                  </div>

                </div>

              ))}

          </div>

        </div>

      </section>

    </div>
  );
};


const OverviewStat = ({
  icon: Icon,
  value,
  title,
  text,
  onClick,
}) => (
  <button
    type="button"
    className="pp-stat-card"
    onClick={onClick}
  >

    <span className="pp-stat-icon">
      <Icon />
    </span>

    <div>
      <strong>{value}</strong>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>

    <FaArrowRight className="pp-stat-arrow" />

  </button>
);


const CardHeader = ({
  eyebrow,
  title,
  icon: Icon,
  onClick,
}) => (
  <div className="pp-card-header">

    <div>

      <span>
        {eyebrow}
      </span>

      <h2>
        {title}
      </h2>

    </div>

    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${title}`}
    >
      <Icon />
      <FaArrowRight />
    </button>

  </div>
);


export default ParentOverview;