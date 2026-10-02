import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaUserGraduate,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaGraduationCap,
  FaIdCard,
  FaPhoneAlt,
  FaEnvelope,
  FaTimes,
  FaSave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChevronRight,
  FaVenusMars,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

import "./TeacherStudents.css";

import TeacherStudentDetails
  from "./TeacherStudentDetails";

import {
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../data/studentsData";

import {
  getParents,
} from "../../data/parentsData";

import {
  getAttendance,
} from "../../data/attendanceData";

import {
  getResults,
} from "../../data/resultsData";

import {
  getFees,
} from "../../data/feesData";

import {
  getAssignments,
} from "../../data/assignmentsData";


/* =========================================================
   TEACHER STUDENTS
========================================================= */

const TeacherStudents = ({
  teacher,
  students = [],
  onOpenStudentChat,
  onOpenParentChat,
}) => {

  /* =======================================================
     RELATED DATA
  ======================================================= */

  const [parents, setParents] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [results, setResults] =
    useState([]);

  const [fees, setFees] =
    useState([]);

  const [assignments, setAssignments] =
    useState([]);


  /* =======================================================
     UI STATE
  ======================================================= */

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  const [search, setSearch] =
    useState("");

  const [
    classFilter,
    setClassFilter,
  ] = useState("All");

  /*
    IMPORTANT:
    Default All rakha hai.

    Screenshot me Inactive select tha,
    jiski wajah se Active students
    hide ho sakte the.
  */

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    editingStudent,
    setEditingStudent,
  ] = useState(null);

  const [
    deleteStudentData,
    setDeleteStudentData,
  ] = useState(null);

  const [popup, setPopup] =
    useState({
      show: false,
      type: "",
      message: "",
    });


  /* =======================================================
     FORM
  ======================================================= */

  const emptyForm = {
    name: "",
    admissionNo: "",
    className: "",
    section: "",
    rollNo: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    mobile: "",
    email: "",
    parentId: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "Active",
  };

  const [
    formData,
    setFormData,
  ] = useState(emptyForm);


  /* =======================================================
     HELPERS
  ======================================================= */

  const safeArray = (value) =>
    Array.isArray(value)
      ? value
      : [];


  const normalize = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase();


  const normalizeClass = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/^class\s*/i, "")
      .trim();


  const getStudentId = (student) =>
    student?.studentId ||
    student?.id ||
    student?.admissionNo ||
    "";


  /* =======================================================
     LOAD RELATED DATA
  ======================================================= */

  const loadRelatedData =
    useCallback(() => {

      try {

        setParents(
          safeArray(
            getParents?.()
          )
        );

        setAttendance(
          safeArray(
            getAttendance?.()
          )
        );

        setResults(
          safeArray(
            getResults?.()
          )
        );

        setFees(
          safeArray(
            getFees?.()
          )
        );

        setAssignments(
          safeArray(
            getAssignments?.()
          )
        );

      } catch (error) {

        console.error(
          "Teacher student related data error:",
          error
        );

      }

    }, []);


  /* =======================================================
     LIVE DATA SYNC
  ======================================================= */

  useEffect(() => {

    loadRelatedData();


    const handleUpdate = () => {
      loadRelatedData();
    };


    window.addEventListener(
      "abpsDataUpdated",
      handleUpdate
    );

    window.addEventListener(
      "storage",
      handleUpdate
    );


    return () => {

      window.removeEventListener(
        "abpsDataUpdated",
        handleUpdate
      );

      window.removeEventListener(
        "storage",
        handleUpdate
      );

    };

  }, [loadRelatedData]);


  /* =======================================================
     TEACHER STUDENTS

     IMPORTANT:
     Dashboard already teacher.classes
     ke according students filter karke
     "students" prop me bhej raha hai.

     Yahan dobara filter NAHI karenge.
  ======================================================= */

  const teacherStudents =
    useMemo(() => {

      return Array.isArray(students)
        ? students
        : [];

    }, [students]);


  /* =======================================================
     AVAILABLE CLASSES
  ======================================================= */

  const availableClasses =
    useMemo(() => {

      const classes =
        teacherStudents
          .map(
            (student) =>
              String(
                student?.className ||
                ""
              ).trim()
          )
          .filter(Boolean);


      return [
        ...new Set(classes),
      ];

    }, [teacherStudents]);


  /* =======================================================
     FILTER STUDENTS
  ======================================================= */

  const filteredStudents =
    useMemo(() => {

      const searchText =
        normalize(search);


      return teacherStudents.filter(
        (student) => {

          const matchesSearch =
            !searchText ||
            [
              student?.name,
              student?.admissionNo,
              student?.rollNo,
              student?.className,
              student?.section,
              student?.email,
              student?.mobile,
            ].some(
              (value) =>
                normalize(
                  value
                ).includes(
                  searchText
                )
            );


          const matchesClass =
            classFilter === "All" ||
            normalizeClass(
              student?.className
            ) ===
              normalizeClass(
                classFilter
              );


          const matchesStatus =
            statusFilter === "All" ||
            normalize(
              student?.status ||
                "Active"
            ) ===
              normalize(
                statusFilter
              );


          return (
            matchesSearch &&
            matchesClass &&
            matchesStatus
          );

        }
      );

    }, [
      teacherStudents,
      search,
      classFilter,
      statusFilter,
    ]);


  /* =======================================================
     STATS
  ======================================================= */

  const activeCount =
    teacherStudents.filter(
      (student) =>
        normalize(
          student?.status ||
            "Active"
        ) === "active"
    ).length;


  const maleCount =
    teacherStudents.filter(
      (student) =>
        normalize(
          student?.gender
        ) === "male"
    ).length;


  const femaleCount =
    teacherStudents.filter(
      (student) =>
        normalize(
          student?.gender
        ) === "female"
    ).length;


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


    window.setTimeout(() => {

      setPopup({
        show: false,
        type: "",
        message: "",
      });

    }, 3000);

  };


  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };


  /* =======================================================
     CHECK TEACHER CLASS ACCESS
  ======================================================= */

  const canTeacherManageClass = (
    className,
    section
  ) => {

    const teacherClasses =
      Array.isArray(
        teacher?.classes
      )
        ? teacher.classes
        : [];


    if (
      teacherClasses.length === 0
    ) {
      return false;
    }


    return teacherClasses.some(
      (assigned) => {

        const classMatches =
          normalizeClass(
            assigned?.className ||
              assigned?.class
          ) ===
          normalizeClass(
            className
          );


        const assignedSection =
          normalize(
            assigned?.section
          );


        const sectionMatches =
          !assignedSection ||
          assignedSection ===
            normalize(section);


        return (
          classMatches &&
          sectionMatches
        );

      }
    );

  };


  /* =======================================================
     ADD STUDENT
  ======================================================= */

  const openAddStudent = () => {

    setEditingStudent(null);


    const teacherClasses =
      Array.isArray(
        teacher?.classes
      )
        ? teacher.classes
        : [];


    let defaultClass = "";
    let defaultSection = "";


    if (
      teacherClasses.length === 1
    ) {

      defaultClass =
        teacherClasses[0]
          ?.className ||
        teacherClasses[0]
          ?.class ||
        "";


      defaultSection =
        teacherClasses[0]
          ?.section ||
        "";

    }


    setFormData({
      ...emptyForm,

      className:
        defaultClass,

      section:
        defaultSection,
    });


    setFormOpen(true);

  };


  /* =======================================================
     EDIT STUDENT
  ======================================================= */

  const openEditStudent = (
    student
  ) => {

    setEditingStudent(
      student
    );


    setFormData({

      name:
        student?.name || "",

      admissionNo:
        student?.admissionNo || "",

      className:
        student?.className || "",

      section:
        student?.section || "",

      rollNo:
        student?.rollNo || "",

      gender:
        student?.gender || "",

      dob:
        student?.dob || "",

      bloodGroup:
        student?.bloodGroup || "",

      mobile:
        student?.mobile ||
        student?.phone ||
        "",

      email:
        student?.email || "",

      parentId:
        student?.parentId || "",

      address:
        student?.address || "",

      city:
        student?.city || "",

      state:
        student?.state || "",

      pincode:
        student?.pincode || "",

      status:
        student?.status ||
        "Active",

    });


    setFormOpen(true);

  };


  /* =======================================================
     SAVE STUDENT
  ======================================================= */

  const handleSaveStudent = () => {

    if (
      !formData.name.trim()
    ) {

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


    if (
      !canTeacherManageClass(
        formData.className,
        formData.section
      )
    ) {

      showPopup(
        "error",
        "You can only manage students from your assigned class and section."
      );

      return;
    }


    try {

      if (editingStudent) {

        updateStudent(
          getStudentId(
            editingStudent
          ),
          {
            ...editingStudent,
            ...formData,
          }
        );


        showPopup(
          "success",
          "Student updated successfully."
        );

      } else {

        addStudent({
          ...formData,
        });


        showPopup(
          "success",
          "Student added successfully."
        );

      }


      setFormOpen(false);

      setEditingStudent(null);

      setFormData(
        emptyForm
      );


      loadRelatedData();

    } catch (error) {

      console.error(
        "Student save error:",
        error
      );


      showPopup(
        "error",
        "Unable to save student."
      );

    }

  };


  /* =======================================================
     DELETE STUDENT
  ======================================================= */

  const confirmDelete = () => {

    if (
      !deleteStudentData
    ) {
      return;
    }


    try {

      deleteStudent(
        getStudentId(
          deleteStudentData
        )
      );


      if (
        getStudentId(
          selectedStudent
        ) ===
        getStudentId(
          deleteStudentData
        )
      ) {

        setSelectedStudent(
          null
        );

      }


      setDeleteStudentData(
        null
      );


      showPopup(
        "success",
        "Student deleted successfully."
      );


      loadRelatedData();

    } catch (error) {

      console.error(
        "Student delete error:",
        error
      );


      showPopup(
        "error",
        "Unable to delete student."
      );

    }

  };


  /* =======================================================
     SELECTED STUDENT RELATED DATA
  ======================================================= */

  const selectedStudentId =
    getStudentId(
      selectedStudent
    );


  const selectedParent =
    useMemo(() => {

      if (
        !selectedStudent
      ) {
        return null;
      }


      /*
        First:
        student.parentId -> parent.id
      */

      const byParentId =
        parents.find(
          (parent) =>
            String(
              parent?.id ||
                parent?.parentId ||
                ""
            ) ===
            String(
              selectedStudent?.parentId ||
                ""
            )
        );


      if (byParentId) {
        return byParentId;
      }


      /*
        Fallback:
        parent.studentId
      */

      return (
        parents.find(
          (parent) =>
            String(
              parent?.studentId ||
                ""
            ) ===
            String(
              selectedStudentId
            )
        ) ||
        null
      );

    }, [
      parents,
      selectedStudent,
      selectedStudentId,
    ]);


  const studentAttendance =
    useMemo(() => {

      return attendance.filter(
        (item) =>
          String(
            item?.studentId ||
              item?.id ||
              ""
          ) ===
          String(
            selectedStudentId
          )
      );

    }, [
      attendance,
      selectedStudentId,
    ]);


  const studentResults =
    useMemo(() => {

      return results.filter(
        (item) =>
          String(
            item?.studentId ||
              ""
          ) ===
          String(
            selectedStudentId
          )
      );

    }, [
      results,
      selectedStudentId,
    ]);


  const studentFees =
    useMemo(() => {

      return fees.filter(
        (item) =>
          String(
            item?.studentId ||
              ""
          ) ===
          String(
            selectedStudentId
          )
      );

    }, [
      fees,
      selectedStudentId,
    ]);


  const studentAssignments =
    useMemo(() => {

      if (
        !selectedStudent
      ) {
        return [];
      }


      return assignments.filter(
        (item) => {

          /*
            Student specific
          */

          if (
            item?.studentId
          ) {

            return (
              String(
                item.studentId
              ) ===
              String(
                selectedStudentId
              )
            );

          }


          /*
            Class specific
          */

          const classMatches =
            !item?.className ||
            normalizeClass(
              item.className
            ) ===
              normalizeClass(
                selectedStudent.className
              );


          const sectionMatches =
            !item?.section ||
            normalize(
              item.section
            ) ===
              normalize(
                selectedStudent.section
              );


          return (
            classMatches &&
            sectionMatches
          );

        }
      );

    }, [
      assignments,
      selectedStudent,
      selectedStudentId,
    ]);


  /* =======================================================
     STUDENT DETAILS PAGE
  ======================================================= */

  if (selectedStudent) {

    return (

      <TeacherStudentDetails

        student={
          selectedStudent
        }

        parent={
          selectedParent
        }

        attendance={
          studentAttendance
        }

        results={
          studentResults
        }

        fees={
          studentFees
        }

        assignments={
          studentAssignments
        }

        onBack={() =>
          setSelectedStudent(
            null
          )
        }

        onUpdate={(
          id,
          changes
        ) => {

          updateStudent(
            id,
            changes
          );


          setSelectedStudent(
            (previous) => ({
              ...previous,
              ...changes,
            })
          );


          showPopup(
            "success",
            "Student updated successfully."
          );

        }}

        onDelete={() =>
          setDeleteStudentData(
            selectedStudent
          )
        }

        onMessageStudent={() => {

          if (
            onOpenStudentChat
          ) {

            onOpenStudentChat(
              selectedStudent
            );

          }

        }}

        onMessageParent={() => {

          if (
            onOpenParentChat
          ) {

            onOpenParentChat(
              selectedStudent
            );

          }

        }}

      />

    );

  }


  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (

    <div className="tstudents-page">


      {/* ===================================================
          POPUP
      =================================================== */}

      {popup.show && (

        <div
          className={`tstudents-popup ${popup.type}`}
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
          HEADER
      =================================================== */}

      <section className="tstudents-hero">

        <div>

          <span className="tstudents-eyebrow">
            STUDENT MANAGEMENT
          </span>

          <h1>
            My Students
          </h1>

          <p>
            View and manage students
            assigned to your class and
            section.
          </p>

          <div className="tstudents-teacher-tags">

            <span>
              <FaGraduationCap />

              {teacher?.name ||
                "Teacher"}
            </span>

            <span>
              <FaIdCard />

              {teacher?.employeeId ||
                "Employee"}
            </span>

          </div>

        </div>


        <div className="tstudents-hero-actions">

          <button
            type="button"
            className="tstudents-refresh-btn"
            onClick={
              loadRelatedData
            }
          >

            <FaSyncAlt />

            Refresh

          </button>


          <button
            type="button"
            className="tstudents-add-btn"
            onClick={
              openAddStudent
            }
          >

            <FaPlus />

            Add Student

          </button>

        </div>

      </section>


      {/* ===================================================
          STATS
      =================================================== */}

      <section className="tstudents-stats">

        <StudentStat
          icon={FaUsers}
          value={
            teacherStudents.length
          }
          label="My Students"
        />

        <StudentStat
          icon={FaCheckCircle}
          value={
            activeCount
          }
          label="Active Students"
        />

        <StudentStat
          icon={FaUserGraduate}
          value={
            maleCount
          }
          label="Male Students"
        />

        <StudentStat
          icon={FaGraduationCap}
          value={
            femaleCount
          }
          label="Female Students"
        />

      </section>


      {/* ===================================================
          SEARCH & FILTER
      =================================================== */}

      <section className="tstudents-toolbar">


        <div className="tstudents-search">

          <FaSearch />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search by name, admission no., roll no..."
          />

        </div>


        <div className="tstudents-filter">

          <FaFilter />

          <select
            value={
              classFilter
            }
            onChange={(event) =>
              setClassFilter(
                event.target.value
              )
            }
          >

            <option value="All">
              All Classes
            </option>

            {availableClasses.map(
              (className) => (

                <option
                  key={
                    className
                  }
                  value={
                    className
                  }
                >

                  {className}

                </option>

              )
            )}

          </select>

        </div>


        <div className="tstudents-filter">

          <FaCheckCircle />

          <select
            value={
              statusFilter
            }
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

      </section>


      {/* ===================================================
          LIST HEADING
      =================================================== */}

      <div className="tstudents-list-heading">

        <div>

          <span>
            ASSIGNED STUDENTS
          </span>

          <h2>
            Student Records
          </h2>

          <p>

            {
              filteredStudents.length
            }{" "}

            student
            {
              filteredStudents.length !==
              1
                ? "s"
                : ""
            }{" "}

            found

          </p>

        </div>

      </div>


      {/* ===================================================
          STUDENT CARDS
      =================================================== */}

      {filteredStudents.length >
      0 ? (

        <section className="tstudents-grid">

          {filteredStudents.map(
            (student) => (

              <StudentCard

                key={
                  getStudentId(
                    student
                  )
                }

                student={
                  student
                }

                onView={() =>
                  setSelectedStudent(
                    student
                  )
                }

                onEdit={() =>
                  openEditStudent(
                    student
                  )
                }

                onDelete={() =>
                  setDeleteStudentData(
                    student
                  )
                }

              />

            )
          )}

        </section>

      ) : (

        <div className="tstudents-empty">

          <div className="tstudents-empty-icon">
            <FaUserGraduate />
          </div>

          <span>
            STUDENT RECORDS
          </span>

          <h2>
            No Students Found
          </h2>

          <p>

            {teacherStudents.length ===
            0
              ? "No students are currently assigned to your class or section."
              : "No students match your current search or filters."}

          </p>

        </div>

      )}


      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {formOpen && (

        <div className="tstudents-modal-overlay">

          <div className="tstudents-modal">


            <div className="tstudents-modal-head">

              <div>

                <span>

                  {editingStudent
                    ? "UPDATE STUDENT"
                    : "NEW STUDENT"}

                </span>

                <h2>

                  {editingStudent
                    ? "Edit Student Details"
                    : "Add Student"}

                </h2>

                <p>
                  Manage student
                  information for your
                  assigned class.
                </p>

              </div>


              <button
                type="button"
                className="tstudents-modal-close"
                onClick={() =>
                  setFormOpen(
                    false
                  )
                }
              >

                <FaTimes />

              </button>

            </div>


            <div className="tstudents-form">


              <FormInput
                label="Student Name"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter student name"
                required
              />


              <FormInput
                label="Admission No."
                name="admissionNo"
                value={
                  formData.admissionNo
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. ABPS-2026-0142"
                required
              />


              <FormInput
                label="Class"
                name="className"
                value={
                  formData.className
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Class 10"
                required
              />


              <FormInput
                label="Section"
                name="section"
                value={
                  formData.section
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. A"
              />


              <FormInput
                label="Roll Number"
                name="rollNo"
                value={
                  formData.rollNo
                }
                onChange={
                  handleChange
                }
                placeholder="Roll no."
              />


              <FormSelect
                label="Gender"
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
              />


              <FormInput
                label="Date of Birth"
                type="date"
                name="dob"
                value={
                  formData.dob
                }
                onChange={
                  handleChange
                }
              />


              <FormInput
                label="Blood Group"
                name="bloodGroup"
                value={
                  formData.bloodGroup
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. B+"
              />


              <FormInput
                label="Mobile"
                name="mobile"
                value={
                  formData.mobile
                }
                onChange={
                  handleChange
                }
                placeholder="Mobile number"
              />


              <FormInput
                label="Email"
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="Student email"
              />


              <FormInput
                label="Parent ID"
                name="parentId"
                value={
                  formData.parentId
                }
                onChange={
                  handleChange
                }
                placeholder="Linked parent ID"
              />


              <FormSelect
                label="Status"
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                options={[
                  "Active",
                  "Inactive",
                ]}
              />


              <div className="tstudents-field tstudents-full-field">

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
                  placeholder="Enter residential address"
                />

              </div>


              <FormInput
                label="City"
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                placeholder="City"
              />


              <FormInput
                label="State"
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
                placeholder="State"
              />


              <FormInput
                label="Pincode"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleChange
                }
                placeholder="Pincode"
              />

            </div>


            <div className="tstudents-modal-footer">

              <button
                type="button"
                className="tstudents-cancel"
                onClick={() =>
                  setFormOpen(
                    false
                  )
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="tstudents-save"
                onClick={
                  handleSaveStudent
                }
              >

                <FaSave />

                {editingStudent
                  ? "Update Student"
                  : "Add Student"}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {deleteStudentData && (

        <div className="tstudents-modal-overlay">

          <div className="tstudents-delete-modal">


            <div className="tstudents-delete-icon">
              <FaTrash />
            </div>


            <span>
              DELETE STUDENT
            </span>


            <h2>

              Delete{" "}
              {
                deleteStudentData.name
              }?

            </h2>


            <p>
              This will remove the
              student from the shared
              school student records.
            </p>


            <div className="tstudents-delete-info">

              <strong>

                {
                  deleteStudentData.admissionNo
                }

              </strong>

              <small>

                {
                  deleteStudentData.className
                }

                {deleteStudentData.section
                  ? ` - ${deleteStudentData.section}`
                  : ""}

              </small>

            </div>


            <div className="tstudents-delete-actions">

              <button
                type="button"
                onClick={() =>
                  setDeleteStudentData(
                    null
                  )
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="delete"
                onClick={
                  confirmDelete
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
   STUDENT CARD
========================================================= */

const StudentCard = ({
  student,
  onView,
  onEdit,
  onDelete,
}) => {

  const initial =
    student?.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ||
    "S";


  const active =
    normalizeValue(
      student?.status ||
        "Active"
    ) === "active";


  return (

    <article className="tstudents-card">


      <div className="tstudents-card-top">

        <div className="tstudents-avatar">
          {initial}
        </div>


        <div
          className={`tstudents-status ${
            active
              ? "active"
              : "inactive"
          }`}
        >

          <i />

          {student?.status ||
            "Active"}

        </div>

      </div>


      <div className="tstudents-card-main">

        <span className="tstudents-card-label">
          STUDENT
        </span>

        <h3>
          {student?.name ||
            "Student"}
        </h3>

        <div className="tstudents-card-id">

          <FaIdCard />

          {student?.admissionNo ||
            "No Admission ID"}

        </div>

      </div>


      <div className="tstudents-card-details">


        <div>

          <FaGraduationCap />

          <span>

            <small>
              CLASS
            </small>

            <strong>

              {student?.className ||
                "—"}

              {student?.section
                ? ` - ${student.section}`
                : ""}

            </strong>

          </span>

        </div>


        <div>

          <FaUserGraduate />

          <span>

            <small>
              ROLL NO.
            </small>

            <strong>
              {student?.rollNo ||
                "—"}
            </strong>

          </span>

        </div>


        <div>

          <FaVenusMars />

          <span>

            <small>
              GENDER
            </small>

            <strong>
              {student?.gender ||
                "—"}
            </strong>

          </span>

        </div>


        <div>

          <FaCalendarAlt />

          <span>

            <small>
              DOB
            </small>

            <strong>
              {student?.dob ||
                "—"}
            </strong>

          </span>

        </div>

      </div>


      {(student?.mobile ||
        student?.email) && (

        <div className="tstudents-contact">

          {student?.mobile && (

            <span>

              <FaPhoneAlt />

              {student.mobile}

            </span>

          )}


          {student?.email && (

            <span>

              <FaEnvelope />

              {student.email}

            </span>

          )}

        </div>

      )}


      <div className="tstudents-card-actions">

        <button
          type="button"
          className="view"
          onClick={
            onView
          }
        >

          <FaEye />

          View Details

          <FaChevronRight />

        </button>


        <button
          type="button"
          className="edit"
          title="Edit Student"
          onClick={
            onEdit
          }
        >

          <FaEdit />

        </button>


        <button
          type="button"
          className="trash"
          title="Delete Student"
          onClick={
            onDelete
          }
        >

          <FaTrash />

        </button>

      </div>

    </article>

  );

};


/* =========================================================
   NORMALIZE HELPER FOR CHILD COMPONENT
========================================================= */

const normalizeValue = (
  value
) =>
  String(value ?? "")
    .trim()
    .toLowerCase();


/* =========================================================
   STUDENT STAT
========================================================= */

const StudentStat = ({
  icon: Icon,
  value,
  label,
}) => (

  <div className="tstudents-stat">

    <div>
      <Icon />
    </div>

    <section>

      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>

    </section>

  </div>

);


/* =========================================================
   FORM INPUT
========================================================= */

const FormInput = ({
  label,
  required,
  ...props
}) => (

  <div className="tstudents-field">

    <label>

      {label}

      {required && (
        <sup>*</sup>
      )}

    </label>

    <input
      {...props}
    />

  </div>

);


/* =========================================================
   FORM SELECT
========================================================= */

const FormSelect = ({
  label,
  options = [],
  ...props
}) => (

  <div className="tstudents-field">

    <label>
      {label}
    </label>

    <select
      {...props}
    >

      <option value="">
        Select {label}
      </option>

      {options.map(
        (option) => (

          <option
            key={
              option
            }
            value={
              option
            }
          >
            {option}
          </option>

        )
      )}

    </select>

  </div>

);


export default TeacherStudents;