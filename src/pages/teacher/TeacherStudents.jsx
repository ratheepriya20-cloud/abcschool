import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaEdit,
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaFilter,
  FaGraduationCap,
  FaIdCard,
  FaPhoneAlt,
  FaSave,
  FaSearch,
  FaSyncAlt,
  FaTimes,
  FaUserGraduate,
  FaUsers,
  FaVenusMars,
} from "react-icons/fa";

import "./TeacherStudents.css";

import TeacherStudentDetails from "./TeacherStudentDetails";

import {
  updateStudent,
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
   EDIT FORM

   IMPORTANT:
   Teacher sirf ye 3 fields edit kar sakta hai:
   1. Class
   2. Section
   3. Mobile / Phone
========================================================= */

const EMPTY_EDIT_FORM = {
  className: "",
  section: "",
  mobile: "",
};


/* =========================================================
   HELPERS
========================================================= */

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


const safeArray = (value) =>
  Array.isArray(value)
    ? value
    : [];


const getStudentId = (student) =>
  student?.studentId ||
  student?.id ||
  student?.admissionNo ||
  "";


/* =========================================================
   COMPONENT
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

  const [
    parents,
    setParents,
  ] = useState([]);

  const [
    attendance,
    setAttendance,
  ] = useState([]);

  const [
    results,
    setResults,
  ] = useState([]);

  const [
    fees,
    setFees,
  ] = useState([]);

  const [
    assignments,
    setAssignments,
  ] = useState([]);


  /* =======================================================
     UI STATE
  ======================================================= */

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    classFilter,
    setClassFilter,
  ] = useState("All");


  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");


  /* =======================================================
     EDIT MODAL
  ======================================================= */

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);


  const [
    editingStudent,
    setEditingStudent,
  ] = useState(null);


  const [
    formData,
    setFormData,
  ] = useState(
    EMPTY_EDIT_FORM
  );


  /* =======================================================
     POPUP
  ======================================================= */

  const [
    popup,
    setPopup,
  ] = useState({
    show: false,
    type: "",
    message: "",
  });


  const showPopup = useCallback(
    (
      type,
      message
    ) => {

      setPopup({
        show: true,
        type,
        message,
      });


      window.setTimeout(
        () => {

          setPopup({
            show: false,
            type: "",
            message: "",
          });

        },
        3000
      );

    },
    []
  );


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


    const handleDataUpdate = () => {
      loadRelatedData();
    };


    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdate
    );


    window.addEventListener(
      "storage",
      handleDataUpdate
    );


    return () => {

      window.removeEventListener(
        "abpsDataUpdated",
        handleDataUpdate
      );


      window.removeEventListener(
        "storage",
        handleDataUpdate
      );

    };

  }, [
    loadRelatedData,
  ]);


  /* =======================================================
     TEACHER STUDENTS
  ======================================================= */

  const teacherStudents =
    useMemo(
      () =>
        Array.isArray(students)
          ? students
          : [],
      [
        students,
      ]
    );


  /* =======================================================
     TEACHER ASSIGNED CLASSES
  ======================================================= */

  const teacherClasses =
    useMemo(() => {

      if (
        !Array.isArray(
          teacher?.classes
        )
      ) {
        return [];
      }


      return teacher.classes
        .map(
          (item) => {

            /*
              Agar classes array me simple string hai:

              ["10", "11"]

              tab bhi handle hoga.
            */

            if (
              typeof item ===
              "string"
            ) {

              return {
                className:
                  item.trim(),
                section: "",
              };

            }


            /*
              Agar format hai:

              {
                className: "10",
                section: "A"
              }
            */

            return {

              className:
                String(
                  item?.className ||
                  item?.class ||
                  ""
                ).trim(),

              section:
                String(
                  item?.section ||
                  ""
                ).trim(),

            };

          }
        )
        .filter(
          (item) =>
            item.className
        );

    }, [
      teacher,
    ]);


  /* =======================================================
     EDITABLE CLASS OPTIONS
  ======================================================= */

  const editableClassOptions =
    useMemo(() => {

      const names =
        teacherClasses
          .map(
            (item) =>
              item.className
          )
          .filter(Boolean);


      return [
        ...new Set(names),
      ];

    }, [
      teacherClasses,
    ]);


  /* =======================================================
     EDITABLE SECTION OPTIONS
  ======================================================= */

  const editableSectionOptions =
    useMemo(() => {

      if (
        !formData.className
      ) {
        return [];
      }


      const sections =
        teacherClasses
          .filter(
            (item) =>
              normalizeClass(
                item.className
              ) ===
              normalizeClass(
                formData.className
              )
          )
          .map(
            (item) =>
              item.section
          )
          .filter(Boolean);


      return [
        ...new Set(sections),
      ];

    }, [
      teacherClasses,
      formData.className,
    ]);


  /* =======================================================
     AVAILABLE CLASSES FOR FILTER
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

    }, [
      teacherStudents,
    ]);


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
              student?.phone,
            ].some(
              (value) =>
                normalize(
                  value
                ).includes(
                  searchText
                )
            );


          const matchesClass =
            classFilter ===
              "All" ||
            normalizeClass(
              student?.className
            ) ===
              normalizeClass(
                classFilter
              );


          const matchesStatus =
            statusFilter ===
              "All" ||
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
    useMemo(
      () =>
        teacherStudents.filter(
          (student) =>
            normalize(
              student?.status ||
              "Active"
            ) ===
            "active"
        ).length,
      [
        teacherStudents,
      ]
    );


  const maleCount =
    useMemo(
      () =>
        teacherStudents.filter(
          (student) =>
            normalize(
              student?.gender
            ) ===
            "male"
        ).length,
      [
        teacherStudents,
      ]
    );


  const femaleCount =
    useMemo(
      () =>
        teacherStudents.filter(
          (student) =>
            normalize(
              student?.gender
            ) ===
            "female"
        ).length,
      [
        teacherStudents,
      ]
    );


  /* =======================================================
     CHECK CLASS ACCESS
  ======================================================= */

  const canTeacherManageClass =
    useCallback(
      (
        className,
        section
      ) => {

        if (
          !teacherClasses.length
        ) {
          return false;
        }


        return teacherClasses.some(
          (assigned) => {

            const classMatches =
              normalizeClass(
                assigned.className
              ) ===
              normalizeClass(
                className
              );


            const assignedSection =
              normalize(
                assigned.section
              );


            const requestedSection =
              normalize(
                section
              );


            /*
              Agar teacher ke assigned record me
              section blank hai to us class ke
              kisi bhi section ko allow karenge.

              Agar section assigned hai to same
              section hi allow hoga.
            */

            const sectionMatches =
              !assignedSection ||
              assignedSection ===
                requestedSection;


            return (
              classMatches &&
              sectionMatches
            );

          }
        );

      },
      [
        teacherClasses,
      ]
    );


  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEditStudent = (
    student
  ) => {

    setEditingStudent(
      student
    );


    /*
      IMPORTANT:
      Sirf allowed fields form me load honge.
    */

    setFormData({

      className:
        student?.className ||
        "",

      section:
        student?.section ||
        "",

      mobile:
        student?.mobile ||
        student?.phone ||
        "",

    });


    setFormOpen(true);

  };


  /* =======================================================
     CLOSE EDIT
  ======================================================= */

  const closeEditStudent = () => {

    setFormOpen(false);

    setEditingStudent(
      null
    );

    setFormData(
      EMPTY_EDIT_FORM
    );

  };


  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => {

        /*
          Agar class change hoti hai
          to section reset / auto select hoga.
        */

        if (
          name ===
          "className"
        ) {

          const matchingSections =
            teacherClasses
              .filter(
                (item) =>
                  normalizeClass(
                    item.className
                  ) ===
                  normalizeClass(
                    value
                  )
              )
              .map(
                (item) =>
                  item.section
              )
              .filter(Boolean);


          return {

            ...previous,

            className:
              value,

            section:
              matchingSections.length ===
              1
                ? matchingSections[0]
                : matchingSections.includes(
                    previous.section
                  )
                ? previous.section
                : "",

          };

        }


        return {

          ...previous,

          [name]:
            value,

        };

      }
    );

  };


  /* =======================================================
     SECURE UPDATE
  ======================================================= */

  const saveAllowedStudentChanges =
    useCallback(
      (
        student,
        changes
      ) => {

        const className =
          String(
            changes?.className ??
            ""
          ).trim();


        const section =
          String(
            changes?.section ??
            ""
          ).trim();


        const mobile =
          String(
            changes?.mobile ??
            ""
          ).trim();


        if (
          !className
        ) {

          return {

            ok: false,

            message:
              "Class is required.",

          };

        }


        /*
          Teacher sirf apni assigned
          class / section me student
          ko manage kar sakta hai.
        */

        if (
          !canTeacherManageClass(
            className,
            section
          )
        ) {

          return {

            ok: false,

            message:
              "You can only assign students to your assigned class and section.",

          };

        }


        const id =
          getStudentId(
            student
          );


        if (
          !id
        ) {

          return {

            ok: false,

            message:
              "Student ID not found.",

          };

        }


        /*
          ===================================================
          MOST IMPORTANT SECURITY PART

          Teacher se sirf ye 3 fields
          database/storage ko jayengi.

          Even agar frontend/devtools se
          name/email/status bhejne ki try ho,
          wo yahan ignore ho jayega.
          ===================================================
        */

        const allowedChanges = {

          className,

          section,

          mobile,

        };


        try {

          updateStudent(
            id,
            allowedChanges
          );


          /*
            Details page open ho to
            selected student bhi update karo.
          */

          if (
            selectedStudent &&
            getStudentId(
              selectedStudent
            ) === id
          ) {

            setSelectedStudent(
              (previous) => ({

                ...previous,

                ...allowedChanges,

              })
            );

          }


          return {

            ok: true,

            changes:
              allowedChanges,

          };

        } catch (error) {

          console.error(
            "Student update error:",
            error
          );


          return {

            ok: false,

            message:
              "Unable to update student.",

          };

        }

      },
      [
        canTeacherManageClass,
        selectedStudent,
      ]
    );


  /* =======================================================
     SAVE FROM MAIN PAGE
  ======================================================= */

  const handleSaveStudent = () => {

    if (
      !editingStudent
    ) {
      return;
    }


    const result =
      saveAllowedStudentChanges(
        editingStudent,
        formData
      );


    if (
      !result.ok
    ) {

      showPopup(
        "error",
        result.message
      );

      return;

    }


    showPopup(
      "success",
      "Student updated successfully."
    );


    closeEditStudent();

    loadRelatedData();

  };


  /* =======================================================
     SELECTED STUDENT DATA
  ======================================================= */

  const selectedStudentId =
    getStudentId(
      selectedStudent
    );


  /* =======================================================
     PARENT
  ======================================================= */

  const selectedParent =
    useMemo(() => {

      if (
        !selectedStudent
      ) {
        return null;
      }


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


      if (
        byParentId
      ) {
        return byParentId;
      }


      return (

        parents.find(
          (parent) =>
            String(
              parent?.studentId ||
              ""
            ) ===
            String(
              selectedStudentId ||
              ""
            )
        ) ||
        null

      );

    }, [
      parents,
      selectedStudent,
      selectedStudentId,
    ]);


  /* =======================================================
     ATTENDANCE
  ======================================================= */

  const studentAttendance =
    useMemo(
      () =>
        attendance.filter(
          (item) =>
            String(
              item?.studentId ||
              item?.id ||
              ""
            ) ===
            String(
              selectedStudentId ||
              ""
            )
        ),
      [
        attendance,
        selectedStudentId,
      ]
    );


  /* =======================================================
     RESULTS
  ======================================================= */

  const studentResults =
    useMemo(
      () =>
        results.filter(
          (item) =>
            String(
              item?.studentId ||
              ""
            ) ===
            String(
              selectedStudentId ||
              ""
            )
        ),
      [
        results,
        selectedStudentId,
      ]
    );


  /* =======================================================
     FEES
  ======================================================= */

  const studentFees =
    useMemo(
      () =>
        fees.filter(
          (item) =>
            String(
              item?.studentId ||
              ""
            ) ===
            String(
              selectedStudentId ||
              ""
            )
        ),
      [
        fees,
        selectedStudentId,
      ]
    );


  /* =======================================================
     ASSIGNMENTS
  ======================================================= */

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
            Student specific assignment
          */

          if (
            item?.studentId
          ) {

            return (
              String(
                item.studentId
              ) ===
              String(
                selectedStudentId ||
                ""
              )
            );

          }


          /*
            Class specific assignment
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
     DETAILS PAGE
  ======================================================= */

  if (
    selectedStudent
  ) {

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


        /*
          Details page se bhi sirf
          allowed fields save hongi.
        */

        onUpdate={(
          _id,
          changes
        ) => {

          const result =
            saveAllowedStudentChanges(
              selectedStudent,
              changes
            );


          if (
            result.ok
          ) {

            showPopup(
              "success",
              "Student updated successfully."
            );

            loadRelatedData();

          }


          return result;

        }}


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


        classOptions={
          editableClassOptions
        }


        sectionOptionsForClass={(
          className
        ) => {

          const sections =
            teacherClasses
              .filter(
                (item) =>
                  normalizeClass(
                    item.className
                  ) ===
                  normalizeClass(
                    className
                  )
              )
              .map(
                (item) =>
                  item.section
              )
              .filter(Boolean);


          return [
            ...new Set(
              sections
            ),
          ];

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
            View assigned students.
            Teachers can edit only class,
            section and phone number.
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

        </div>

      </section>


      {/* ===================================================
          STATS
      =================================================== */}

      <section className="tstudents-stats">


        <StudentStat

          icon={
            FaUsers
          }

          value={
            teacherStudents.length
          }

          label="My Students"

        />


        <StudentStat

          icon={
            FaCheckCircle
          }

          value={
            activeCount
          }

          label="Active Students"

        />


        <StudentStat

          icon={
            FaUserGraduate
          }

          value={
            maleCount
          }

          label="Male Students"

        />


        <StudentStat

          icon={
            FaGraduationCap
          }

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

            value={
              search
            }

            onChange={(
              event
            ) =>
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

            onChange={(
              event
            ) =>
              setClassFilter(
                event.target.value
              )
            }

          >

            <option value="All">
              All Classes
            </option>


            {availableClasses.map(
              (
                className
              ) => (

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

            onChange={(
              event
            ) =>
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

            {filteredStudents.length}

            {" "}

            student

            {filteredStudents.length !==
            1
              ? "s"
              : ""}

            {" "}

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
            (
              student
            ) => (

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
          EDIT MODAL

          ONLY:
          CLASS
          SECTION
          PHONE
      =================================================== */}

      {formOpen &&
        editingStudent && (

        <div className="tstudents-modal-overlay">


          <div className="tstudents-modal">


            <div className="tstudents-modal-head">


              <div>

                <span>
                  UPDATE STUDENT
                </span>


                <h2>
                  Edit Class, Section & Phone
                </h2>


                <p>
                  Only these three fields
                  can be changed by a
                  teacher.
                </p>

              </div>


              <button

                type="button"

                className="tstudents-modal-close"

                onClick={
                  closeEditStudent
                }

              >

                <FaTimes />

              </button>


            </div>


            <div className="tstudents-form">


              {/* CLASS */}

              <FormSelect

                label="Class"

                name="className"

                value={
                  formData.className
                }

                onChange={
                  handleChange
                }

                options={
                  editableClassOptions
                }

                required

              />


              {/* SECTION */}

              {editableSectionOptions.length >
              0 ? (

                <FormSelect

                  label="Section"

                  name="section"

                  value={
                    formData.section
                  }

                  onChange={
                    handleChange
                  }

                  options={
                    editableSectionOptions
                  }

                />

              ) : (

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

              )}


              {/* PHONE */}

              <FormInput

                label="Phone Number"

                name="mobile"

                type="tel"

                value={
                  formData.mobile
                }

                onChange={
                  handleChange
                }

                placeholder="Phone number"

              />


            </div>


            <div className="tstudents-modal-footer">


              <button

                type="button"

                className="tstudents-cancel"

                onClick={
                  closeEditStudent
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

                Update Student

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
}) => {

  const initial =
    student?.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ||
    "S";


  const active =
    normalize(
      student?.status ||
      "Active"
    ) ===
    "active";


  const mobile =
    student?.mobile ||
    student?.phone ||
    "";


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


      {(mobile ||
        student?.email) && (

        <div className="tstudents-contact">


          {mobile && (

            <span>

              <FaPhoneAlt />

              {mobile}

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

          title="Edit Class, Section & Phone"

          onClick={
            onEdit
          }

        >

          <FaEdit />

        </button>


      </div>


    </article>

  );

};


/* =========================================================
   STAT CARD
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
   INPUT
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
   SELECT
========================================================= */

const FormSelect = ({
  label,
  options = [],
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


    <select
      {...props}
    >

      <option value="">

        Select {label}

      </option>


      {options.map(
        (
          option
        ) => (

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