import React, { useMemo } from "react";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarMinus,
  FaUserGraduate,
  FaCalendarAlt,
} from "react-icons/fa";

import "./StudentAttendance.css";

const StudentAttendance = ({
  attendance = [],
  student,
}) => {
  /* =====================================================
     STUDENT NAME
  ===================================================== */

  const studentName =
    student?.name ||
    student?.studentName ||
    "Student";

  /* =====================================================
     DATE NORMALIZE
  ===================================================== */

  const normalizeDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (value) => {
    if (!value) return "-";

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
     TODAY
  ===================================================== */

  const todayKey = useMemo(() => {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;
  }, []);

  const todayAttendance = useMemo(() => {
    return attendance.find((item) => {
      const attendanceDate =
        item?.date ||
        item?.attendanceDate ||
        item?.createdAt;

      return (
        normalizeDate(attendanceDate) ===
        todayKey
      );
    });
  }, [attendance, todayKey]);

  const todayStatus =
    todayAttendance?.status ||
    "Not Marked";

  const todayStatusClass = String(
    todayStatus
  )
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  /* =====================================================
     COUNTS
  ===================================================== */

  const totalRecords =
    attendance.length;

  const presentCount =
    attendance.filter(
      (item) =>
        String(item?.status)
          .toLowerCase()
          .trim() === "present"
    ).length;

  const absentCount =
    attendance.filter(
      (item) =>
        String(item?.status)
          .toLowerCase()
          .trim() === "absent"
    ).length;

  const leaveCount =
    attendance.filter(
      (item) =>
        String(item?.status)
          .toLowerCase()
          .trim() === "leave"
    ).length;

  const attendancePercentage =
    totalRecords > 0
      ? Math.round(
          (presentCount / totalRecords) *
            100
        )
      : 0;

  /* =====================================================
     STATUS ICON
  ===================================================== */

  const getTodayIcon = () => {
    switch (
      String(todayStatus)
        .toLowerCase()
        .trim()
    ) {
      case "present":
        return <FaCheckCircle />;

      case "absent":
        return <FaTimesCircle />;

      case "leave":
        return <FaCalendarMinus />;

      default:
        return <FaCalendarAlt />;
    }
  };

  return (
    <div className="stuAttendance-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="stuAttendance-hero">

        <div className="stuAttendance-heroContent">

          <span className="stuAttendance-eyebrow">
            ATTENDANCE RECORD
          </span>

          <h1>
            My Attendance
          </h1>

          <p>
            Hello{" "}
            <strong>{studentName}</strong>,
            view your latest attendance,
            daily status and overall
            attendance summary.
          </p>

        </div>

        <div className="stuAttendance-heroIcon">
          <FaCalendarCheck />
        </div>

      </section>

      {/* =================================================
          TODAY STATUS
      ================================================= */}

      <section className="stuAttendance-today">

        <div
          className={`stuAttendance-todayIcon ${todayStatusClass}`}
        >
          {getTodayIcon()}
        </div>

        <div className="stuAttendance-todayInfo">

          <span>
            TODAY'S ATTENDANCE
          </span>

          <h2>
            {studentName}
          </h2>

          <p>
            Your attendance status for today
          </p>

        </div>

        <div
          className={`stuAttendance-todayStatus ${todayStatusClass}`}
        >
          <small>Today's Status</small>

          <strong>
            {todayStatus}
          </strong>
        </div>

      </section>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <section className="stuAttendance-summary">

        <div className="stuAttendance-summaryCard">

          <div className="stuAttendance-summaryIcon total">
            <FaCalendarCheck />
          </div>

          <div>
            <span>Total Records</span>

            <strong>
              {totalRecords}
            </strong>
          </div>

        </div>

        <div className="stuAttendance-summaryCard">

          <div className="stuAttendance-summaryIcon present">
            <FaCheckCircle />
          </div>

          <div>
            <span>Present</span>

            <strong>
              {presentCount}
            </strong>
          </div>

        </div>

        <div className="stuAttendance-summaryCard">

          <div className="stuAttendance-summaryIcon absent">
            <FaTimesCircle />
          </div>

          <div>
            <span>Absent</span>

            <strong>
              {absentCount}
            </strong>
          </div>

        </div>

        <div className="stuAttendance-summaryCard">

          <div className="stuAttendance-summaryIcon leave">
            <FaCalendarMinus />
          </div>

          <div>
            <span>Leave</span>

            <strong>
              {leaveCount}
            </strong>
          </div>

        </div>

        <div className="stuAttendance-summaryCard percentage">

          <div className="stuAttendance-summaryIcon percentage">
            <FaUserGraduate />
          </div>

          <div>
            <span>Attendance</span>

            <strong>
              {attendancePercentage}%
            </strong>
          </div>

        </div>

      </section>

      {/* =================================================
          RECORD HEADING
      ================================================= */}

      <section className="stuAttendance-heading">

        <div>
          <span>
            ATTENDANCE HISTORY
          </span>

          <h2>
            Daily Attendance Records
          </h2>

          <p>
            Your latest attendance records
            are shown below.
          </p>
        </div>

      </section>

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="stuAttendance-tableBox">

        {attendance.length === 0 ? (

          <div className="stuAttendance-empty">

            <FaCalendarCheck />

            <h3>
              No Attendance Available
            </h3>

            <p>
              Your attendance records will
              appear here once they are
              updated.
            </p>

          </div>

        ) : (

          <div className="stuAttendance-tableScroll">

            <table className="stuAttendance-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {attendance.map(
                  (item, index) => {

                    const status =
                      item?.status ||
                      "Not Marked";

                    const statusClass =
                      String(status)
                        .toLowerCase()
                        .trim()
                        .replace(
                          /\s+/g,
                          "-"
                        );

                    return (
                      <tr
                        key={
                          item.id ||
                          `attendance-${index}`
                        }
                      >

                        <td>
                          <strong>
                            {formatDate(
                              item.date ||
                              item.attendanceDate
                            )}
                          </strong>
                        </td>

                        <td>
                          {studentName}
                        </td>

                        <td>
                          {item.className ||
                            student?.className ||
                            student?.class ||
                            "-"}
                        </td>

                        <td>
                          {item.section ||
                            student?.section ||
                            "-"}
                        </td>

                        <td>
                          <span
                            className={`stuAttendance-status ${statusClass}`}
                          >
                            {status}
                          </span>
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default StudentAttendance;