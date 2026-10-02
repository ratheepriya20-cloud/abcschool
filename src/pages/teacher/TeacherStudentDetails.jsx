import React, { useMemo, useState } from "react";

import {
  FaArrowLeft,
  FaUserGraduate,
  FaIdCard,
  FaGraduationCap,
  FaUsers,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaTint,
  FaSchool,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBookOpen,
  FaChartBar,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaUserShield,
} from "react-icons/fa";

import "./TeacherStudentDetails.css";

/*
  IMPORTANT:

  Ye component student object receive karta hai:

  <TeacherStudentDetails
    student={selectedStudent}
    parent={selectedParent}
    attendance={studentAttendance}
    results={studentResults}
    fees={studentFees}
    assignments={studentAssignments}
    onBack={() => setSelectedStudent(null)}
    onUpdate={updateStudent}
    onDelete={deleteStudent}
    onMessageStudent={() => {}}
    onMessageParent={() => {}}
  />

*/

const TeacherStudentDetails = ({
  student,
  parent = null,

  attendance = [],
  results = [],
  fees = [],
  assignments = [],

  onBack,
  onUpdate,
  onDelete,

  onMessageStudent,
  onMessageParent,
}) => {
  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [formData, setFormData] =
    useState(() => ({
      name: student?.name || "",
      admissionNo:
        student?.admissionNo || "",
      rollNo: student?.rollNo || "",
      className:
        student?.className || "",
      section: student?.section || "",
      gender: student?.gender || "",
      dob: student?.dob || "",
      bloodGroup:
        student?.bloodGroup || "",
      mobile:
        student?.mobile ||
        student?.phone ||
        "",
      email: student?.email || "",
      address: student?.address || "",
      city: student?.city || "",
      state: student?.state || "",
      pincode: student?.pincode || "",
      parentId:
        student?.parentId || "",
      status:
        student?.status || "Active",
    }));

  /* =======================================================
     SAFE ARRAYS
  ======================================================= */

  const attendanceData =
    Array.isArray(attendance)
      ? attendance
      : [];

  const resultsData =
    Array.isArray(results)
      ? results
      : [];

  const feesData =
    Array.isArray(fees) ? fees : [];

  const assignmentsData =
    Array.isArray(assignments)
      ? assignments
      : [];

  /* =======================================================
     STUDENT INITIAL
  ======================================================= */

  const studentInitial =
    student?.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "S";

  /* =======================================================
     ATTENDANCE %
  ======================================================= */

  const attendancePercentage =
    useMemo(() => {
      if (!attendanceData.length) {
        return 0;
      }

      /*
        Agar attendance records:
        status: "Present" / "Absent"
      */

      const statusRecords =
        attendanceData.filter(
          (item) => item?.status
        );

      if (statusRecords.length) {
        const present =
          statusRecords.filter(
            (item) =>
              String(
                item.status
              ).toLowerCase() ===
              "present"
          ).length;

        return Math.round(
          (present /
            statusRecords.length) *
            100
        );
      }

      /*
        Agar data me percentage already hai
      */

      const percentageRecord =
        attendanceData.find(
          (item) =>
            item?.percentage !==
            undefined
        );

      if (percentageRecord) {
        return Number(
          percentageRecord.percentage
        );
      }

      return 0;
    }, [attendanceData]);

  /* =======================================================
     RESULTS AVERAGE
  ======================================================= */

  const resultAverage = useMemo(() => {
    if (!resultsData.length) {
      return 0;
    }

    const validResults =
      resultsData.filter(
        (item) =>
          !Number.isNaN(
            Number(
              item?.marks ??
                item?.percentage
            )
          )
      );

    if (!validResults.length) {
      return 0;
    }

    const total =
      validResults.reduce(
        (sum, item) =>
          sum +
          Number(
            item?.percentage ??
              item?.marks ??
              0
          ),
        0
      );

    return Math.round(
      total / validResults.length
    );
  }, [resultsData]);

  /* =======================================================
     FEES
  ======================================================= */

  const pendingFees =
    feesData.filter(
      (item) =>
        String(
          item?.status || ""
        ).toLowerCase() === "pending"
    ).length;

  /* =======================================================
     INPUT
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEdit = () => {
    setFormData({
      name: student?.name || "",
      admissionNo:
        student?.admissionNo || "",
      rollNo: student?.rollNo || "",
      className:
        student?.className || "",
      section: student?.section || "",
      gender: student?.gender || "",
      dob: student?.dob || "",
      bloodGroup:
        student?.bloodGroup || "",
      mobile:
        student?.mobile ||
        student?.phone ||
        "",
      email: student?.email || "",
      address: student?.address || "",
      city: student?.city || "",
      state: student?.state || "",
      pincode: student?.pincode || "",
      parentId:
        student?.parentId || "",
      status:
        student?.status || "Active",
    });

    setEditOpen(true);
  };

  /* =======================================================
     UPDATE
  ======================================================= */

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      showPopup(
        "error",
        "Student name is required."
      );
      return;
    }

    if (
      !formData.admissionNo.trim()
    ) {
      showPopup(
        "error",
        "Admission number is required."
      );
      return;
    }

    if (
      !formData.className.trim()
    ) {
      showPopup(
        "error",
        "Class is required."
      );
      return;
    }

    const updatedStudent = {
      ...student,
      ...formData,
    };

    if (onUpdate) {
      onUpdate(
        student?.id ||
          student?.studentId,
        updatedStudent
      );
    }

    setEditOpen(false);

    showPopup(
      "success",
      "Student details updated successfully."
    );
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = () => {
    if (onDelete) {
      onDelete(
        student?.id ||
          student?.studentId
      );
    }

    setDeleteOpen(false);

    if (onBack) {
      onBack();
    }
  };

  /* =======================================================
     POPUP
  ======================================================= */

  const showPopup = (
    type,
    message
  ) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  /* =======================================================
     NO STUDENT
  ======================================================= */

  if (!student) {
    return (
      <div className="tsd-empty-page">

        <FaUserGraduate />

        <h2>
          Student Not Found
        </h2>

        <p>
          Student details are not
          available.
        </p>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
          >
            <FaArrowLeft />
            Back to Students
          </button>
        )}

      </div>
    );
  }

  return (
    <div className="tsd-page">

      {/* ===================================================
          POPUP
      =================================================== */}

      {popup.show && (
        <div
          className={`tsd-popup ${popup.type}`}
        >
          {popup.type ===
          "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationTriangle />
          )}

          <span>
            {popup.message}
          </span>
        </div>
      )}

      {/* ===================================================
          TOP ACTIONS
      =================================================== */}

      <div className="tsd-top">

        <button
          type="button"
          className="tsd-back"
          onClick={onBack}
        >
          <FaArrowLeft />

          Back to Students
        </button>

        <div className="tsd-top-actions">

          <button
            type="button"
            className="tsd-edit-btn"
            onClick={openEdit}
          >
            <FaEdit />

            Edit Student
          </button>

          <button
            type="button"
            className="tsd-delete-btn"
            onClick={() =>
              setDeleteOpen(true)
            }
          >
            <FaTrash />

            Delete
          </button>

        </div>

      </div>

      {/* ===================================================
          HERO PROFILE
      =================================================== */}

      <section className="tsd-profile-card">

        <div className="tsd-profile-main">

          <div className="tsd-big-avatar">
            {studentInitial}
          </div>

          <div className="tsd-profile-content">

            <span className="tsd-label">
              STUDENT PROFILE
            </span>

            <h1>
              {student.name}
            </h1>

            <div className="tsd-profile-meta">

              <span>
                <FaIdCard />

                {student.admissionNo ||
                  "No Admission ID"}
              </span>

              <span>
                <FaGraduationCap />

                Class{" "}
                {student.className ||
                  "—"}

                {student.section
                  ? ` - ${student.section}`
                  : ""}
              </span>

              <span>
                <FaUserGraduate />

                Roll No.{" "}
                {student.rollNo ||
                  "—"}
              </span>

            </div>

          </div>

        </div>

        <div className="tsd-profile-status">

          <span
            className={
              String(
                student.status ||
                  "Active"
              ).toLowerCase() ===
              "active"
                ? "active"
                : "inactive"
            }
          >
            <i />

            {student.status ||
              "Active"}
          </span>

          <small>
            Student Account
          </small>

        </div>

      </section>

      {/* ===================================================
          QUICK STATS
      =================================================== */}

      <section className="tsd-stats">

        <StatCard
          icon={FaCalendarCheck}
          value={`${attendancePercentage}%`}
          title="Attendance"
          text="Overall attendance"
        />

        <StatCard
          icon={FaChartBar}
          value={`${resultAverage}%`}
          title="Academic Score"
          text="Average performance"
        />

        <StatCard
          icon={FaBookOpen}
          value={
            assignmentsData.length
          }
          title="Assignments"
          text="Assigned work"
        />

        <StatCard
          icon={FaMoneyBillWave}
          value={pendingFees}
          title="Pending Fees"
          text="Pending fee records"
        />

      </section>

      {/* ===================================================
          INFORMATION GRID
      =================================================== */}

      <section className="tsd-information-grid">

        {/* PERSONAL */}

        <InfoSection
          icon={FaUserGraduate}
          label="STUDENT INFORMATION"
          title="Personal Details"
        >

          <div className="tsd-details-grid">

            <Detail
              icon={FaUserGraduate}
              label="Full Name"
              value={student.name}
            />

            <Detail
              icon={FaIdCard}
              label="Admission Number"
              value={
                student.admissionNo
              }
            />

            <Detail
              icon={FaCalendarAlt}
              label="Date of Birth"
              value={student.dob}
            />

            <Detail
              icon={FaVenusMars}
              label="Gender"
              value={student.gender}
            />

            <Detail
              icon={FaTint}
              label="Blood Group"
              value={
                student.bloodGroup
              }
            />

            <Detail
              icon={FaPhoneAlt}
              label="Mobile"
              value={
                student.mobile ||
                student.phone
              }
            />

            <Detail
              icon={FaEnvelope}
              label="Email"
              value={student.email}
            />

            <Detail
              icon={FaUserShield}
              label="Status"
              value={
                student.status ||
                "Active"
              }
            />

          </div>

        </InfoSection>

        {/* ACADEMIC */}

        <InfoSection
          icon={FaGraduationCap}
          label="ACADEMIC INFORMATION"
          title="Class Details"
        >

          <div className="tsd-details-grid">

            <Detail
              icon={FaSchool}
              label="Class"
              value={
                student.className
              }
            />

            <Detail
              icon={FaGraduationCap}
              label="Section"
              value={student.section}
            />

            <Detail
              icon={FaUserGraduate}
              label="Roll Number"
              value={student.rollNo}
            />

            <Detail
              icon={FaIdCard}
              label="Parent ID"
              value={
                student.parentId
              }
            />

          </div>

        </InfoSection>

        {/* ADDRESS */}

        <InfoSection
          icon={FaMapMarkerAlt}
          label="CONTACT INFORMATION"
          title="Address Details"
        >

          <div className="tsd-address">

            <FaMapMarkerAlt />

            <div>

              <span>
                Residential Address
              </span>

              <strong>
                {[
                  student.address,
                  student.city,
                  student.state,
                  student.pincode,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                  "Address not available"}
              </strong>

            </div>

          </div>

        </InfoSection>

        {/* PARENT */}

        <InfoSection
          icon={FaUsers}
          label="PARENT / GUARDIAN"
          title="Parent Details"
        >

          {parent ? (
            <>

              <div className="tsd-parent">

                <div className="tsd-parent-avatar">
                  {parent?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "P"}
                </div>

                <div className="tsd-parent-main">

                  <span>
                    Parent / Guardian
                  </span>

                  <h3>
                    {parent.name ||
                      parent.parentName ||
                      "Parent"}
                  </h3>

                  <div className="tsd-parent-contact">

                    <span>
                      <FaPhoneAlt />

                      {parent.mobile ||
                        parent.phone ||
                        "No mobile"}
                    </span>

                    <span>
                      <FaEnvelope />

                      {parent.email ||
                        "No email"}
                    </span>

                  </div>

                </div>

              </div>

              {onMessageParent && (
                <button
                  type="button"
                  className="tsd-parent-message"
                  onClick={
                    onMessageParent
                  }
                >
                  <FaUsers />

                  Message Parent
                </button>
              )}

            </>
          ) : (
            <div className="tsd-no-parent">

              <FaUsers />

              <span>
                Parent information is
                not available.
              </span>

            </div>
          )}

        </InfoSection>

      </section>

      {/* ===================================================
          PRIVATE COMMUNICATION
      =================================================== */}

      <section className="tsd-communication">

        <div className="tsd-communication-content">

          <span className="tsd-label">
            PRIVATE COMMUNICATION
          </span>

          <h2>
            Stay Connected With Student
            & Parent
          </h2>

          <p>
            Communicate privately with
            this student or their parent.
            Student and parent
            conversations remain
            separate.
          </p>

        </div>

        <div className="tsd-contact-actions">

          <button
            type="button"
            className="student-chat"
            onClick={
              onMessageStudent
            }
          >
            <FaUserGraduate />

            <span>
              <small>
                PRIVATE CHAT
              </small>

              Message Student
            </span>
          </button>

          <button
            type="button"
            className="parent-chat"
            onClick={
              onMessageParent
            }
          >
            <FaUsers />

            <span>
              <small>
                PRIVATE CHAT
              </small>

              Message Parent
            </span>
          </button>

        </div>

      </section>

      {/* ===================================================
          RECENT RESULTS
      =================================================== */}

      <section className="tsd-record-section">

        <div className="tsd-section-heading">

          <div>

            <span>
              ACADEMIC PERFORMANCE
            </span>

            <h2>
              Student Results
            </h2>

          </div>

          <strong>
            {resultsData.length} Records
          </strong>

        </div>

        {resultsData.length ? (
          <div className="tsd-table-wrap">

            <table>

              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Exam</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>

                {resultsData
                  .slice(0, 6)
                  .map(
                    (
                      result,
                      index
                    ) => (
                      <tr
                        key={
                          result.id ||
                          index
                        }
                      >
                        <td>
                          <strong>
                            {result.subject ||
                              "Subject"}
                          </strong>
                        </td>

                        <td>
                          {result.exam ||
                            result.examName ||
                            "—"}
                        </td>

                        <td>
                          {result.marks ??
                            result.percentage ??
                            "—"}
                        </td>

                        <td>
                          <span className="tsd-grade">
                            {result.grade ||
                              "—"}
                          </span>
                        </td>
                      </tr>
                    )
                  )}

              </tbody>

            </table>

          </div>
        ) : (
          <RecordEmpty
            icon={FaChartBar}
            text="No result records available."
          />
        )}

      </section>

      {/* ===================================================
          ASSIGNMENTS
      =================================================== */}

      <section className="tsd-record-section">

        <div className="tsd-section-heading">

          <div>

            <span>
              CLASS WORK
            </span>

            <h2>
              Assignments
            </h2>

          </div>

          <strong>
            {assignmentsData.length}{" "}
            Assignments
          </strong>

        </div>

        {assignmentsData.length ? (
          <div className="tsd-assignment-grid">

            {assignmentsData
              .slice(0, 6)
              .map(
                (
                  assignment,
                  index
                ) => (
                  <div
                    className="tsd-assignment"
                    key={
                      assignment.id ||
                      index
                    }
                  >

                    <div className="tsd-assignment-icon">
                      <FaBookOpen />
                    </div>

                    <div>

                      <span>
                        {assignment.subject ||
                          "Assignment"}
                      </span>

                      <h3>
                        {assignment.title ||
                          "Class Assignment"}
                      </h3>

                      <small>
                        Due:{" "}
                        {assignment.due ||
                          assignment.dueDate ||
                          "—"}
                      </small>

                    </div>

                  </div>
                )
              )}

          </div>
        ) : (
          <RecordEmpty
            icon={FaBookOpen}
            text="No assignments available."
          />
        )}

      </section>

      {/* ===================================================
          EDIT MODAL
      =================================================== */}

      {editOpen && (
        <div className="tsd-modal-overlay">

          <div className="tsd-modal">

            <div className="tsd-modal-head">

              <div>

                <span>
                  UPDATE STUDENT
                </span>

                <h2>
                  Edit Student Details
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEditOpen(false)
                }
              >
                <FaTimes />
              </button>

            </div>

            <div className="tsd-form">

              <Input
                label="Student Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <Input
                label="Admission No."
                name="admissionNo"
                value={
                  formData.admissionNo
                }
                onChange={handleChange}
              />

              <Input
                label="Class"
                name="className"
                value={
                  formData.className
                }
                onChange={handleChange}
              />

              <Input
                label="Section"
                name="section"
                value={
                  formData.section
                }
                onChange={handleChange}
              />

              <Input
                label="Roll Number"
                name="rollNo"
                value={
                  formData.rollNo
                }
                onChange={handleChange}
              />

              <Select
                label="Gender"
                name="gender"
                value={
                  formData.gender
                }
                onChange={handleChange}
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
              />

              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />

              <Input
                label="Blood Group"
                name="bloodGroup"
                value={
                  formData.bloodGroup
                }
                onChange={handleChange}
              />

              <Input
                label="Mobile"
                name="mobile"
                value={
                  formData.mobile
                }
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={
                  formData.email
                }
                onChange={handleChange}
              />

              <Input
                label="Parent ID"
                name="parentId"
                value={
                  formData.parentId
                }
                onChange={handleChange}
              />

              <Select
                label="Status"
                name="status"
                value={
                  formData.status
                }
                onChange={handleChange}
                options={[
                  "Active",
                  "Inactive",
                ]}
              />

              <div className="tsd-field tsd-full-field">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Student address"
                />

              </div>

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />

              <Input
                label="Pincode"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={handleChange}
              />

            </div>

            <div className="tsd-modal-footer">

              <button
                type="button"
                className="cancel"
                onClick={() =>
                  setEditOpen(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="save"
                onClick={handleUpdate}
              >
                <FaSave />

                Update Student
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {deleteOpen && (
        <div className="tsd-modal-overlay">

          <div className="tsd-delete-modal">

            <div className="tsd-delete-icon">
              <FaTrash />
            </div>

            <span>
              DELETE STUDENT
            </span>

            <h2>
              Delete {student.name}?
            </h2>

            <p>
              Are you sure you want to
              delete this student record?
              This action cannot be
              undone.
            </p>

            <div className="tsd-delete-actions">

              <button
                type="button"
                onClick={() =>
                  setDeleteOpen(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm"
                onClick={
                  handleDelete
                }
              >
                <FaTrash />

                Delete Student
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

/* =========================================================
   COMPONENTS
========================================================= */

const StatCard = ({
  icon: Icon,
  value,
  title,
  text,
}) => (
  <div className="tsd-stat-card">

    <div className="tsd-stat-icon">
      <Icon />
    </div>

    <div>

      <strong>
        {value}
      </strong>

      <span>
        {title}
      </span>

      <small>
        {text}
      </small>

    </div>

  </div>
);

const InfoSection = ({
  icon: Icon,
  label,
  title,
  children,
}) => (
  <div className="tsd-info-card">

    <div className="tsd-info-heading">

      <div className="tsd-info-icon">
        <Icon />
      </div>

      <div>

        <span>
          {label}
        </span>

        <h2>
          {title}
        </h2>

      </div>

    </div>

    {children}

  </div>
);

const Detail = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="tsd-detail">

    <div className="tsd-detail-icon">
      <Icon />
    </div>

    <div>

      <span>
        {label}
      </span>

      <strong>
        {value || "—"}
      </strong>

    </div>

  </div>
);

const RecordEmpty = ({
  icon: Icon,
  text,
}) => (
  <div className="tsd-record-empty">

    <Icon />

    <span>
      {text}
    </span>

  </div>
);

const Input = ({
  label,
  ...props
}) => (
  <div className="tsd-field">

    <label>
      {label}
    </label>

    <input {...props} />

  </div>
);

const Select = ({
  label,
  options,
  ...props
}) => (
  <div className="tsd-field">

    <label>
      {label}
    </label>

    <select {...props}>

      <option value="">
        Select {label}
      </option>

      {options.map((option) => (
        <option
          value={option}
          key={option}
        >
          {option}
        </option>
      ))}

    </select>

  </div>
);

export default TeacherStudentDetails;