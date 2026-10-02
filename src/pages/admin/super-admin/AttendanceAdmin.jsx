import React, { useMemo, useState } from "react";

import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserGraduate,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import "./AttendanceAdmin.css";

import useSchoolData from "../../../hooks/useSchoolData";

import {
  ATTENDANCE_KEY,
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../../../data/attendanceData";

import {
  STUDENTS_KEY,
  getStudents,
} from "../../../data/studentsData";


const AttendanceAdmin = () => {
  /* =========================================================
     DATA
  ========================================================= */

  const [attendance] = useSchoolData(
    ATTENDANCE_KEY,
    getAttendance
  );

  const [students] = useSchoolData(
    STUDENTS_KEY,
    getStudents
  );


  /* =========================================================
     DATE
  ========================================================= */

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7);

  const currentYear = new Date()
    .getFullYear()
    .toString();


  /* =========================================================
     STATES
  ========================================================= */

  const [view, setView] =
    useState("daily");

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);

  const [selectedYear, setSelectedYear] =
    useState(currentYear);

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      studentId: "",
      studentName: "",
      className: "",
      section: "",
      date: today,
      status: "Present",
      remarks: "",
    });


  /* =========================================================
     HELPERS
  ========================================================= */

  const getDateValue = (item) =>
    item.date ||
    item.attendanceDate ||
    "";

  const normalizeStatus = (
    status = ""
  ) =>
    String(status)
      .toLowerCase()
      .trim();


  /* =========================================================
     MAX 10 STUDENTS
  ========================================================= */

  const availableStudents =
    useMemo(() => {
      return Array.isArray(students)
        ? students
            .filter(
              (student) =>
                student.status !==
                "Inactive"
            )
            .slice(0, 10)
        : [];
    }, [students]);


  /* =========================================================
     OPEN ADD MODAL
  ========================================================= */

  const handleAdd = () => {
    setEditingId(null);

    setFormData({
      studentId: "",
      studentName: "",
      className: "",
      section: "",
      date: selectedDate,
      status: "Present",
      remarks: "",
    });

    setShowModal(true);
  };


  /* =========================================================
     STUDENT SELECT
  ========================================================= */

  const handleStudentChange = (
    event
  ) => {
    const studentId =
      event.target.value;

    const student =
      availableStudents.find(
        (item) =>
          String(item.id) ===
            String(studentId) ||
          String(item.studentId) ===
            String(studentId)
      );

    if (!student) {
      setFormData((prev) => ({
        ...prev,

        studentId: "",
        studentName: "",
        className: "",
        section: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,

      studentId:
        student.id ||
        student.studentId ||
        "",

      studentName:
        student.name ||
        student.studentName ||
        "",

      className:
        student.className ||
        student.class ||
        "",

      section:
        student.section ||
        "",
    }));
  };


  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleInputChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = (
    event
  ) => {
    event.preventDefault();

    if (!formData.studentId) {
      window.alert(
        "Please select a student."
      );

      return;
    }

    if (!formData.date) {
      window.alert(
        "Please select attendance date."
      );

      return;
    }

    if (!formData.status) {
      window.alert(
        "Please select attendance status."
      );

      return;
    }


    /* -----------------------------------------
       Prevent duplicate daily attendance
    ----------------------------------------- */

    const duplicate =
      attendance.find(
        (item) =>
          String(
            item.studentId
          ) ===
            String(
              formData.studentId
            ) &&
          getDateValue(item) ===
            formData.date &&
          item.id !== editingId
      );

    if (duplicate) {
      window.alert(
        "Attendance for this student is already added for this date."
      );

      return;
    }


    const payload = {
      studentId:
        formData.studentId,

      studentName:
        formData.studentName,

      className:
        formData.className,

      section:
        formData.section,

      date:
        formData.date,

      status:
        formData.status,

      remarks:
        formData.remarks.trim(),
    };


    if (editingId) {
      updateAttendance(
        editingId,
        payload
      );
    } else {
      addAttendance(payload);
    }


    setSelectedDate(
      formData.date
    );

    setShowModal(false);

    setEditingId(null);
  };


  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      studentId:
        item.studentId ||
        "",

      studentName:
        item.studentName ||
        item.name ||
        "",

      className:
        item.className ||
        "",

      section:
        item.section ||
        "",

      date:
        getDateValue(item) ||
        today,

      status:
        item.status ||
        "Present",

      remarks:
        item.remarks ||
        "",
    });

    setShowModal(true);
  };


  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (item) => {
    const confirmed =
      window.confirm(
        `Delete ${item.studentName || "student"}'s attendance for ${getDateValue(item)}?`
      );

    if (!confirmed) {
      return;
    }

    deleteAttendance(
      item.id
    );
  };


  /* =========================================================
     DAILY
  ========================================================= */

  const dailyRecords =
    useMemo(() => {
      return attendance
        .filter(
          (item) =>
            getDateValue(item) ===
            selectedDate
        )
        .slice(0, 10);
    }, [
      attendance,
      selectedDate,
    ]);


  /* =========================================================
     DAILY SUMMARY
  ========================================================= */

  const dailySummary =
    useMemo(() => {
      const result = {
        present: 0,
        absent: 0,
        leave: 0,
        late: 0,
      };

      dailyRecords.forEach(
        (item) => {
          const status =
            normalizeStatus(
              item.status
            );

          if (
            Object.prototype
              .hasOwnProperty.call(
                result,
                status
              )
          ) {
            result[status] += 1;
          }
        }
      );

      return result;
    }, [dailyRecords]);


  /* =========================================================
     WEEK DATES
  ========================================================= */

  const weekDates =
    useMemo(() => {
      const selected =
        new Date(
          `${selectedDate}T00:00:00`
        );

      const day =
        selected.getDay();

      const difference =
        day === 0
          ? -6
          : 1 - day;

      const monday =
        new Date(selected);

      monday.setDate(
        selected.getDate() +
          difference
      );

      return Array.from(
        {
          length: 6,
        },
        (_, index) => {
          const date =
            new Date(monday);

          date.setDate(
            monday.getDate() +
              index
          );

          return date
            .toISOString()
            .split("T")[0];
        }
      );
    }, [selectedDate]);


  /* =========================================================
     WEEKLY
  ========================================================= */

  const weeklyRecords =
    useMemo(() => {
      const map = {};

      attendance
        .filter((item) =>
          weekDates.includes(
            getDateValue(item)
          )
        )
        .forEach((item) => {
          const key =
            item.studentId ||
            item.studentName;

          if (!key) {
            return;
          }

          if (!map[key]) {
            map[key] = {
              studentId:
                item.studentId ||
                "",

              studentName:
                item.studentName ||
                item.name ||
                "Student",

              className:
                item.className ||
                "",

              section:
                item.section ||
                "",

              days: {},

              present: 0,
              absent: 0,
              leave: 0,
              late: 0,
            };
          }

          const status =
            normalizeStatus(
              item.status
            );

          map[key].days[
            getDateValue(item)
          ] = status;

          if (
            status === "present"
          ) {
            map[key].present++;
          }

          if (
            status === "absent"
          ) {
            map[key].absent++;
          }

          if (
            status === "leave"
          ) {
            map[key].leave++;
          }

          if (
            status === "late"
          ) {
            map[key].late++;
          }
        });


      return Object.values(map)
        .map((student) => {
          const total =
            student.present +
            student.absent +
            student.leave +
            student.late;

          return {
            ...student,

            percentage:
              total > 0
                ? Math.round(
                    (
                      student.present /
                      total
                    ) * 100
                  )
                : 0,
          };
        })
        .slice(0, 10);
    }, [
      attendance,
      weekDates,
    ]);


  /* =========================================================
     MONTHLY
  ========================================================= */

  const monthlyRecords =
    useMemo(() => {
      return createSummaryRecords(
        attendance.filter(
          (item) =>
            getDateValue(item)
              .startsWith(
                selectedMonth
              )
        )
      );
    }, [
      attendance,
      selectedMonth,
    ]);


  /* =========================================================
     YEARLY
  ========================================================= */

  const yearlyRecords =
    useMemo(() => {
      return createSummaryRecords(
        attendance.filter(
          (item) =>
            getDateValue(item)
              .startsWith(
                selectedYear
              )
        )
      );
    }, [
      attendance,
      selectedYear,
    ]);


  /* =========================================================
     TODAY
  ========================================================= */

  const todayRecords =
    useMemo(() => {
      return attendance.filter(
        (item) =>
          getDateValue(item) ===
          today
      );
    }, [
      attendance,
      today,
    ]);


  const todayPresent =
    useMemo(() => {
      return todayRecords.filter(
        (item) =>
          normalizeStatus(
            item.status
          ) === "present"
      ).length;
    }, [todayRecords]);


  /* =========================================================
     TOP PERCENTAGES
  ========================================================= */

  const weeklyPercentage =
    calculateAttendancePercentage(
      attendance.filter(
        (item) =>
          weekDates.includes(
            getDateValue(item)
          )
      )
    );

  const monthlyPercentage =
    calculateAttendancePercentage(
      attendance.filter(
        (item) =>
          getDateValue(item)
            .startsWith(
              selectedMonth
            )
      )
    );

  const yearlyPercentage =
    calculateAttendancePercentage(
      attendance.filter(
        (item) =>
          getDateValue(item)
            .startsWith(
              selectedYear
            )
      )
    );


  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="attendance-admin-page">

      {/* HEADER */}

      <section className="attendance-header">

        <div>

          <span className="attendance-label">
            ACADEMICS
          </span>

          <h1>
            Attendance Management
          </h1>

          <p>
            Add and manage student attendance
            with daily, weekly, monthly and
            yearly reports.
          </p>

        </div>


        <div className="attendance-header-icon">
          <FaCalendarCheck />
        </div>

      </section>


      {/* TOP CARDS */}

      <section className="attendance-overall-summary">

        <OverallCard
          title="Total Students"
          value={
            availableStudents.length
          }
          subtitle="Registered Students"
          icon={FaUserGraduate}
          type="students"
        />

        <OverallCard
          title="Present Today"
          value={`${todayPresent}/${availableStudents.length}`}
          subtitle="Today's Attendance"
          icon={FaCheckCircle}
          type="today"
        />

        <OverallCard
          title="Weekly Attendance"
          value={`${weeklyPercentage}%`}
          subtitle="Current Week"
          icon={FaCalendarWeek}
          type="week"
        />

        <OverallCard
          title="Monthly Attendance"
          value={`${monthlyPercentage}%`}
          subtitle="Selected Month"
          icon={FaCalendarAlt}
          type="month"
        />

        <OverallCard
          title="Yearly Attendance"
          value={`${yearlyPercentage}%`}
          subtitle={selectedYear}
          icon={FaCalendarCheck}
          type="year"
        />

      </section>


      {/* TABS */}

      <section className="attendance-tabs">

        <button
          type="button"
          className={
            view === "daily"
              ? "active"
              : ""
          }
          onClick={() =>
            setView("daily")
          }
        >
          <FaCalendarDay />
          Daily
        </button>


        <button
          type="button"
          className={
            view === "weekly"
              ? "active"
              : ""
          }
          onClick={() =>
            setView("weekly")
          }
        >
          <FaCalendarWeek />
          Weekly
        </button>


        <button
          type="button"
          className={
            view === "monthly"
              ? "active"
              : ""
          }
          onClick={() =>
            setView("monthly")
          }
        >
          <FaCalendarAlt />
          Monthly
        </button>


        <button
          type="button"
          className={
            view === "yearly"
              ? "active"
              : ""
          }
          onClick={() =>
            setView("yearly")
          }
        >
          <FaCalendarCheck />
          Yearly
        </button>

      </section>


      {/* =====================================================
          DAILY
      ===================================================== */}

      {view === "daily" && (
        <>

          <section className="attendance-filter">

            <div>
              <span>
                ATTENDANCE DATE
              </span>

              <strong>
                Daily Attendance
              </strong>
            </div>


            <div className="attendance-filter-actions">

              <input
                type="date"
                value={
                  selectedDate
                }
                onChange={(
                  event
                ) =>
                  setSelectedDate(
                    event.target
                      .value
                  )
                }
              />


              <button
                type="button"
                className="attendance-add-btn"
                onClick={
                  handleAdd
                }
              >
                <FaPlus />

                Add Attendance
              </button>

            </div>

          </section>


          {/* DAILY COUNTS */}

          <section className="attendance-summary-grid">

            <SummaryCard
              title="Present"
              value={
                dailySummary.present
              }
              icon={
                FaCheckCircle
              }
              type="present"
            />

            <SummaryCard
              title="Absent"
              value={
                dailySummary.absent
              }
              icon={
                FaTimesCircle
              }
              type="absent"
            />

            <SummaryCard
              title="Leave"
              value={
                dailySummary.leave
              }
              icon={
                FaCalendarAlt
              }
              type="leave"
            />

            <SummaryCard
              title="Late"
              value={
                dailySummary.late
              }
              icon={FaClock}
              type="late"
            />

          </section>


          {/* TABLE */}

          <section className="attendance-card">

            <div className="attendance-card-header">

              <div>
                <span>
                  DAILY RECORD
                </span>

                <h2>
                  Student Attendance
                </h2>
              </div>

              <strong>
                {dailyRecords.length}
                {" "}Records
              </strong>

            </div>


            <div className="attendance-table-wrap">

              <table className="attendance-table daily-attendance-table">

                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Student ID</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>


                <tbody>

                  {dailyRecords.length >
                  0 ? (

                    dailyRecords.map(
                      (item) => (

                        <tr
                          key={
                            item.id
                          }
                        >

                          <td>

                            <div className="attendance-student">

                              <span>
                                <FaUserGraduate />
                              </span>

                              <strong>
                                {item.studentName ||
                                  item.name ||
                                  "-"}
                              </strong>

                            </div>

                          </td>


                          <td>
                            {item.studentId ||
                              "-"}
                          </td>


                          <td>
                            {item.className ||
                              "-"}
                          </td>


                          <td>
                            {item.section ||
                              "-"}
                          </td>


                          <td>

                            <StatusBadge
                              status={
                                item.status
                              }
                            />

                          </td>


                          <td>
                            {item.remarks ||
                              "-"}
                          </td>


                          <td>

                            <div className="attendance-actions">

                              <button
                                type="button"
                                className="attendance-edit"
                                title="Edit Attendance"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                              >
                                <FaEdit />
                              </button>


                              <button
                                type="button"
                                className="attendance-delete"
                                title="Delete Attendance"
                                onClick={() =>
                                  handleDelete(
                                    item
                                  )
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="attendance-empty"
                      >
                        No attendance found
                        for this date.

                        <button
                          type="button"
                          className="attendance-empty-add"
                          onClick={
                            handleAdd
                          }
                        >
                          <FaPlus />

                          Add Attendance
                        </button>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>

        </>
      )}


      {/* =====================================================
          WEEKLY
      ===================================================== */}

      {view === "weekly" && (
        <>

          <section className="attendance-filter">

            <div>
              <span>
                SELECT WEEK
              </span>

              <strong>
                Weekly Attendance
              </strong>
            </div>

            <input
              type="date"
              value={
                selectedDate
              }
              onChange={(event) =>
                setSelectedDate(
                  event.target.value
                )
              }
            />

          </section>


          <section className="attendance-card">

            <div className="attendance-card-header">

              <div>
                <span>
                  WEEKLY REPORT
                </span>

                <h2>
                  Monday – Saturday
                </h2>
              </div>

              <strong>
                {weeklyRecords.length}
                {" "}Students
              </strong>

            </div>


            <div className="attendance-table-wrap">

              <table className="attendance-table weekly-table">

                <thead>

                  <tr>

                    <th>
                      Student
                    </th>


                    {weekDates.map(
                      (date) => (

                        <th
                          key={
                            date
                          }
                        >
                          {new Date(
                            `${date}T00:00:00`
                          ).toLocaleDateString(
                            "en-US",
                            {
                              weekday:
                                "short",
                            }
                          )}
                        </th>

                      )
                    )}


                    <th>
                      Present
                    </th>

                    <th>
                      Absent
                    </th>

                    <th>
                      %
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {weeklyRecords.length >
                  0 ? (

                    weeklyRecords.map(
                      (student) => (

                        <tr
                          key={
                            student.studentId ||
                            student.studentName
                          }
                        >

                          <td>

                            <div className="weekly-student">

                              <strong>
                                {student.studentName}
                              </strong>

                              <span>
                                {student.studentId}
                                {" • "}
                                {student.className}
                                {student.section
                                  ? `-${student.section}`
                                  : ""}
                              </span>

                            </div>

                          </td>


                          {weekDates.map(
                            (date) => (

                              <td
                                key={
                                  date
                                }
                              >

                                <DayStatus
                                  status={
                                    student
                                      .days[
                                      date
                                    ]
                                  }
                                />

                              </td>

                            )
                          )}


                          <td>

                            <b className="number-present">
                              {student.present}
                            </b>

                          </td>


                          <td>

                            <b className="number-absent">
                              {student.absent}
                            </b>

                          </td>


                          <td>

                            <PercentageBadge
                              value={
                                student.percentage
                              }
                            />

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <EmptyRow
                      colSpan={10}
                      text="No weekly attendance records found."
                    />

                  )}

                </tbody>

              </table>

            </div>

          </section>

        </>
      )}


      {/* =====================================================
          MONTHLY
      ===================================================== */}

      {view === "monthly" && (
        <>

          <section className="attendance-filter">

            <div>
              <span>
                SELECT MONTH
              </span>

              <strong>
                Monthly Attendance
              </strong>
            </div>

            <input
              type="month"
              value={
                selectedMonth
              }
              onChange={(event) =>
                setSelectedMonth(
                  event.target.value
                )
              }
            />

          </section>


          <SummaryReportTable
            title="Monthly Attendance Summary"
            label="MONTHLY REPORT"
            records={
              monthlyRecords
            }
          />

        </>
      )}


      {/* =====================================================
          YEARLY
      ===================================================== */}

      {view === "yearly" && (
        <>

          <section className="attendance-filter">

            <div>
              <span>
                SELECT YEAR
              </span>

              <strong>
                Yearly Attendance
              </strong>
            </div>


            <select
              value={
                selectedYear
              }
              onChange={(event) =>
                setSelectedYear(
                  event.target.value
                )
              }
            >

              <option value="2026">
                2026
              </option>

              <option value="2025">
                2025
              </option>

              <option value="2024">
                2024
              </option>

            </select>

          </section>


          <SummaryReportTable
            title="Yearly Attendance Summary"
            label="YEARLY REPORT"
            records={
              yearlyRecords
            }
          />

        </>
      )}


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="attendance-modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="attendance-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="attendance-modal-close"
              onClick={() =>
                setShowModal(false)
              }
            >
              <FaTimes />
            </button>


            <div className="attendance-modal-heading">

              <span>
                ATTENDANCE RECORD
              </span>

              <h2>
                {editingId
                  ? "Edit Attendance"
                  : "Add Attendance"}
              </h2>

              <p>
                Select a registered student
                and mark the attendance.
              </p>

            </div>


            <form
              className="attendance-form"
              onSubmit={
                handleSave
              }
            >

              {/* STUDENT */}

              <div className="attendance-form-group full">

                <label>
                  Student *
                </label>

                <select
                  value={
                    formData.studentId
                  }
                  onChange={
                    handleStudentChange
                  }
                  required
                >

                  <option value="">
                    Select Student
                  </option>


                  {availableStudents.map(
                    (student) => {

                      const id =
                        student.id ||
                        student.studentId;

                      return (
                        <option
                          key={id}
                          value={id}
                        >
                          {student.name ||
                            student.studentName}
                          {" - "}
                          {id}
                        </option>
                      );
                    }
                  )}

                </select>

              </div>


              {/* STUDENT ID */}

              <div className="attendance-form-group">

                <label>
                  Student ID
                </label>

                <input
                  type="text"
                  value={
                    formData.studentId
                  }
                  readOnly
                />

              </div>


              {/* NAME */}

              <div className="attendance-form-group">

                <label>
                  Student Name
                </label>

                <input
                  type="text"
                  value={
                    formData.studentName
                  }
                  readOnly
                />

              </div>


              {/* CLASS */}

              <div className="attendance-form-group">

                <label>
                  Class
                </label>

                <input
                  type="text"
                  value={
                    formData.className
                  }
                  readOnly
                />

              </div>


              {/* SECTION */}

              <div className="attendance-form-group">

                <label>
                  Section
                </label>

                <input
                  type="text"
                  value={
                    formData.section
                  }
                  readOnly
                />

              </div>


              {/* DATE */}

              <div className="attendance-form-group">

                <label>
                  Attendance Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleInputChange
                  }
                  required
                />

              </div>


              {/* STATUS */}

              <div className="attendance-form-group">

                <label>
                  Status *
                </label>

                <select
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleInputChange
                  }
                  required
                >

                  <option value="Present">
                    Present
                  </option>

                  <option value="Absent">
                    Absent
                  </option>

                  <option value="Leave">
                    Leave
                  </option>

                  <option value="Late">
                    Late
                  </option>

                </select>

              </div>


              {/* REMARKS */}

              <div className="attendance-form-group full">

                <label>
                  Remarks
                </label>

                <textarea
                  name="remarks"
                  value={
                    formData.remarks
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Optional attendance remarks..."
                  rows="4"
                />

              </div>


              <div className="attendance-form-actions">

                <button
                  type="button"
                  className="attendance-cancel-btn"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="attendance-save-btn"
                >
                  <FaSave />

                  {editingId
                    ? "Update Attendance"
                    : "Save Attendance"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};


/* =========================================================
   SUMMARY CREATOR
========================================================= */

const createSummaryRecords = (
  records
) => {
  const map = {};

  records.forEach((item) => {
    const key =
      item.studentId ||
      item.studentName;

    if (!key) {
      return;
    }

    if (!map[key]) {
      map[key] = {
        studentId:
          item.studentId ||
          "",

        studentName:
          item.studentName ||
          item.name ||
          "Student",

        className:
          item.className ||
          "",

        section:
          item.section ||
          "",

        present: 0,
        absent: 0,
        leave: 0,
        late: 0,
      };
    }

    const status =
      String(
        item.status || ""
      )
        .toLowerCase()
        .trim();

    if (
      status === "present"
    ) {
      map[key].present++;
    }

    if (
      status === "absent"
    ) {
      map[key].absent++;
    }

    if (
      status === "leave"
    ) {
      map[key].leave++;
    }

    if (
      status === "late"
    ) {
      map[key].late++;
    }
  });


  return Object.values(map)
    .map((student) => {
      const workingDays =
        student.present +
        student.absent +
        student.leave +
        student.late;

      return {
        ...student,

        workingDays,

        percentage:
          workingDays > 0
            ? Math.round(
                (
                  student.present /
                  workingDays
                ) * 100
              )
            : 0,
      };
    })
    .slice(0, 10);
};


/* =========================================================
   PERCENTAGE
========================================================= */

const calculateAttendancePercentage = (
  records
) => {
  if (!records.length) {
    return 0;
  }

  const present =
    records.filter(
      (item) =>
        String(
          item.status || ""
        ).toLowerCase() ===
        "present"
    ).length;

  return Math.round(
    (
      present /
      records.length
    ) * 100
  );
};


/* =========================================================
   OVERALL CARD
========================================================= */

const OverallCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  type,
}) => (
  <article
    className={`attendance-overall-card ${type}`}
  >

    <div className="attendance-overall-icon">
      <Icon />
    </div>

    <div className="attendance-overall-content">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        {subtitle}
      </small>

    </div>

  </article>
);


/* =========================================================
   DAILY SUMMARY
========================================================= */

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  type,
}) => (
  <article
    className={`attendance-summary-card ${type}`}
  >

    <div>
      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>
    </div>

    <div className="attendance-summary-icon">
      <Icon />
    </div>

  </article>
);


/* =========================================================
   STATUS
========================================================= */

const StatusBadge = ({
  status,
}) => {
  const value =
    String(
      status || ""
    )
      .toLowerCase()
      .trim();

  return (
    <span
      className={`attendance-status ${value}`}
    >

      {value === "present" && (
        <FaCheckCircle />
      )}

      {value === "absent" && (
        <FaTimesCircle />
      )}

      {value === "leave" && (
        <FaCalendarAlt />
      )}

      {value === "late" && (
        <FaClock />
      )}

      {status || "-"}

    </span>
  );
};


/* =========================================================
   DAY STATUS
========================================================= */

const DayStatus = ({
  status,
}) => {
  if (!status) {
    return (
      <span className="day-status empty">
        -
      </span>
    );
  }

  const letter = {
    present: "P",
    absent: "A",
    leave: "L",
    late: "LT",
  }[status];

  return (
    <span
      className={`day-status ${status}`}
    >
      {letter}
    </span>
  );
};


/* =========================================================
   PERCENTAGE BADGE
========================================================= */

const PercentageBadge = ({
  value,
}) => {
  let type = "low";

  if (value >= 90) {
    type = "excellent";
  } else if (value >= 75) {
    type = "good";
  } else if (value >= 60) {
    type = "average";
  }

  return (
    <span
      className={`attendance-percentage ${type}`}
    >
      {value}%
    </span>
  );
};


/* =========================================================
   SUMMARY TABLE
========================================================= */

const SummaryReportTable = ({
  title,
  label,
  records,
}) => (
  <section className="attendance-card">

    <div className="attendance-card-header">

      <div>
        <span>
          {label}
        </span>

        <h2>
          {title}
        </h2>
      </div>

      <strong>
        {records.length}
        {" "}Students
      </strong>

    </div>


    <div className="attendance-table-wrap">

      <table className="attendance-table summary-attendance-table">

        <thead>
          <tr>
            <th>Student</th>
            <th>ID</th>
            <th>Class</th>
            <th>Days</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Leave</th>
            <th>Late</th>
            <th>%</th>
          </tr>
        </thead>


        <tbody>

          {records.length > 0 ? (

            records.map(
              (student) => (

                <tr
                  key={
                    student.studentId ||
                    student.studentName
                  }
                >

                  <td>

                    <div className="weekly-student">

                      <strong>
                        {student.studentName}
                      </strong>

                    </div>

                  </td>


                  <td>
                    {student.studentId ||
                      "-"}
                  </td>


                  <td>
                    {student.className ||
                      "-"}

                    {student.section
                      ? `-${student.section}`
                      : ""}
                  </td>


                  <td>
                    {student.workingDays}
                  </td>


                  <td>
                    <b className="number-present">
                      {student.present}
                    </b>
                  </td>


                  <td>
                    <b className="number-absent">
                      {student.absent}
                    </b>
                  </td>


                  <td>
                    {student.leave}
                  </td>


                  <td>
                    {student.late}
                  </td>


                  <td>

                    <PercentageBadge
                      value={
                        student.percentage
                      }
                    />

                  </td>

                </tr>

              )
            )

          ) : (

            <EmptyRow
              colSpan={9}
              text="No attendance records found."
            />

          )}

        </tbody>

      </table>

    </div>

  </section>
);


/* =========================================================
   EMPTY ROW
========================================================= */

const EmptyRow = ({
  colSpan,
  text,
}) => (
  <tr>
    <td
      colSpan={colSpan}
      className="attendance-empty"
    >
      {text}
    </td>
  </tr>
);


export default AttendanceAdmin;