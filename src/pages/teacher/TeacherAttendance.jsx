import React from "react";

import {
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";

import "./TeacherAttendance.css";

/* =========================================================
   PAGE HERO
   ========================================================= */

const PageHero = ({
  eyebrow,
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="teacherRead-hero">
      <div className="teacherRead-heroContent">
        <span className="teacherRead-eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className="teacherRead-heroIcon">
        {Icon && <Icon />}
      </div>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
   ========================================================= */

const Empty = ({ text }) => {
  return (
    <div className="teacherRead-empty">
      <div className="teacherRead-emptyIcon">
        <FaClipboardList />
      </div>

      <h3>No Attendance Records</h3>

      <p>{text}</p>
    </div>
  );
};

/* =========================================================
   TEACHER ATTENDANCE
   ========================================================= */

const TeacherAttendance = ({
  attendance = [],
  students = [],
}) => {
  /* ===============================
     GET STUDENT
     =============================== */

  const getStudent = (id) =>
    students.find(
      (student) =>
        String(student.id) === String(id)
    );

  return (
    <div className="teacherRead-page">

      {/* =========================
          HERO
          ========================= */}

      <PageHero
        eyebrow="READ ONLY"
        title="Student Attendance"
        description="View attendance records for your assigned students."
        icon={FaCalendarCheck}
      />

      {/* =========================
          ATTENDANCE TABLE
          ========================= */}

      {attendance.length ? (
        <div className="teacherRead-tableBox">
          <div className="teacherRead-tableScroll">
            <table className="teacherRead-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item) => {
                  const student =
                    getStudent(
                      item.studentId
                    );

                  return (
                    <tr key={item.id}>
                      {/* STUDENT */}

                      <td>
                        <strong>
                          {student?.name ||
                            item.studentName ||
                            "Student"}
                        </strong>
                      </td>

                      {/* CLASS */}

                      <td>
                        {student?.className ||
                          item.className ||
                          "-"}

                        {student?.section
                          ? ` - ${student.section}`
                          : ""}
                      </td>

                      {/* DATE */}

                      <td>
                        {item.date || "-"}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`teacherRead-status ${String(
                            item.status || ""
                          )
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {item.status || "-"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* =========================
           EMPTY STATE
           ========================= */

        <Empty
          text="No attendance records found for your assigned students."
        />
      )}
    </div>
  );
};

export default TeacherAttendance;