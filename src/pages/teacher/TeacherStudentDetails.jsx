import React, {
  useMemo,
  useState,
} from "react";

import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartBar,
  FaCheckCircle,
  FaEdit,
  FaEnvelope,
  FaExclamationTriangle,
  FaGraduationCap,
  FaIdCard,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaSave,
  FaSchool,
  FaTimes,
  FaTint,
  FaUserGraduate,
  FaUserShield,
  FaUsers,
  FaVenusMars,
} from "react-icons/fa";

import "./TeacherStudentDetails.css";


const EMPTY_VALUE = "—";


/* =========================================================
   TEACHER STUDENT DETAILS

   Teacher can VIEW everything.

   Teacher can EDIT ONLY:
   - Class
   - Section
   - Phone / Mobile

   No delete.
   No name edit.
   No admission no edit.
   No roll no edit.
   No email edit.
   No DOB edit.
   No status edit.
   No address edit.
========================================================= */

const TeacherStudentDetails = ({

  student,

  parent = null,

  attendance = [],

  results = [],

  fees = [],

  assignments = [],

  onBack,

  onUpdate,

  onMessageStudent,

  onMessageParent,

  classOptions = [],

  sectionOptionsForClass,

}) => {


  /* =======================================================
     EDIT MODAL
  ======================================================= */

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);


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


  /* =======================================================
     ONLY ALLOWED EDIT FIELDS
  ======================================================= */

  const [
    formData,
    setFormData,
  ] = useState({

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


  /* =======================================================
     SAFE ARRAYS
  ======================================================= */

  const attendanceData =
    Array.isArray(
      attendance
    )
      ? attendance
      : [];


  const resultsData =
    Array.isArray(
      results
    )
      ? results
      : [];


  const feesData =
    Array.isArray(
      fees
    )
      ? fees
      : [];


  const assignmentsData =
    Array.isArray(
      assignments
    )
      ? assignments
      : [];


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

  };


  /* =======================================================
     STUDENT INITIAL
  ======================================================= */

  const studentInitial =

    student?.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ||
    "S";


  /* =======================================================
     ATTENDANCE PERCENTAGE
  ======================================================= */

  const attendancePercentage =
    useMemo(() => {

      if (
        !attendanceData.length
      ) {

        return 0;

      }


      /*
        Agar records:

        status: "Present"
        status: "Absent"
      */

      const statusRecords =
        attendanceData.filter(
          (item) =>
            item?.status
        );


      if (
        statusRecords.length
      ) {

        const present =
          statusRecords.filter(
            (item) =>
              String(
                item.status
              ).toLowerCase() ===
              "present"
          ).length;


        return Math.round(

          (
            present /
            statusRecords.length
          ) *
            100

        );

      }


      /*
        Agar attendance record me
        direct percentage hai.
      */

      const percentageRecord =
        attendanceData.find(
          (item) =>
            item?.percentage !==
            undefined
        );


      if (
        percentageRecord
      ) {

        return (
          Number(
            percentageRecord.percentage
          ) ||
          0
        );

      }


      return 0;

    }, [
      attendanceData,
    ]);


  /* =======================================================
     RESULT AVERAGE
  ======================================================= */

  const resultAverage =
    useMemo(() => {

      if (
        !resultsData.length
      ) {

        return 0;

      }


      const values =
        resultsData
          .map(
            (item) =>
              Number(
                item?.percentage ??
                item?.marks
              )
          )
          .filter(
            (value) =>
              !Number.isNaN(
                value
              )
          );


      if (
        !values.length
      ) {

        return 0;

      }


      const total =
        values.reduce(
          (
            sum,
            value
          ) =>
            sum +
            value,
          0
        );


      return Math.round(
        total /
          values.length
      );

    }, [
      resultsData,
    ]);


  /* =======================================================
     PENDING FEES
  ======================================================= */

  const pendingFees =
    useMemo(
      () =>
        feesData.filter(
          (item) =>
            String(
              item?.status ||
              ""
            ).toLowerCase() ===
            "pending"
        ).length,
      [
        feesData,
      ]
    );


  /* =======================================================
     CURRENT SECTION OPTIONS
  ======================================================= */

  const currentSectionOptions =
    useMemo(() => {

      if (
        typeof sectionOptionsForClass !==
        "function"
      ) {

        return [];

      }


      const options =
        sectionOptionsForClass(
          formData.className
        );


      return Array.isArray(
        options
      )
        ? options
        : [];

    }, [
      sectionOptionsForClass,
      formData.className,
    ]);


  /* =======================================================
     OPEN EDIT
  ======================================================= */

  const openEdit = () => {

    /*
      Har baar edit open hone par
      latest student data load karo.
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


    setEditOpen(true);

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
      (
        previous
      ) => {

        /*
          Class change hone par
          section validate/reset hoga.
        */

        if (
          name ===
          "className"
        ) {

          const nextSections =

            typeof sectionOptionsForClass ===
            "function"

              ? sectionOptionsForClass(
                  value
                )

              : [];


          return {

            ...previous,

            className:
              value,


            section:

              Array.isArray(
                nextSections
              ) &&
              nextSections.length ===
                1

                ? nextSections[0]

                : Array.isArray(
                    nextSections
                  ) &&
                  nextSections.includes(
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
     UPDATE

     SECURITY:
     Sirf className, section, mobile
     parent component ko bheje jayenge.
  ======================================================= */

  const handleUpdate = () => {

    const className =
      String(
        formData.className ||
        ""
      ).trim();


    const section =
      String(
        formData.section ||
        ""
      ).trim();


    const mobile =
      String(
        formData.mobile ||
        ""
      ).trim();


    if (
      !className
    ) {

      showPopup(
        "error",
        "Class is required."
      );

      return;

    }


    /*
      IMPORTANT:
      Never send full form/student object.

      Sirf teacher allowed fields.
    */

    const allowedChanges = {

      className,

      section,

      mobile,

    };


    if (
      onUpdate
    ) {

      const result =
        onUpdate(

          student?.studentId ||
          student?.id ||
          student?.admissionNo,

          allowedChanges

        );


      /*
        Parent validation fail kare
        to modal close nahi hoga.
      */

      if (
        result &&
        result.ok ===
          false
      ) {

        showPopup(

          "error",

          result.message ||
            "Unable to update student."

        );


        return;

      }

    }


    setEditOpen(false);


    showPopup(

      "success",

      "Student updated successfully."

    );

  };


  /* =======================================================
     NO STUDENT
  ======================================================= */

  if (
    !student
  ) {

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

            onClick={
              onBack
            }

          >

            <FaArrowLeft />

            Back to Students

          </button>

        )}


      </div>

    );

  }


  /* =======================================================
     DISPLAY VALUES
  ======================================================= */

  const mobile =

    student?.mobile ||
    student?.phone ||
    "";


  const address = [

    student?.address,

    student?.city,

    student?.state,

    student?.pincode,

  ]
    .filter(Boolean)
    .join(", ");


  /* =======================================================
     PAGE
  ======================================================= */

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

          onClick={
            onBack
          }

        >

          <FaArrowLeft />

          Back to Students

        </button>


        <div className="tsd-top-actions">


          {/* ONLY EDIT BUTTON */}

          <button

            type="button"

            className="tsd-edit-btn"

            onClick={
              openEdit
            }

          >

            <FaEdit />

            Edit Class / Section / Phone

          </button>


          {/*
            DELETE BUTTON REMOVED

            Teacher student ko delete
            nahi kar sakta.
          */}


        </div>


      </div>


      {/* ===================================================
          PROFILE
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

              {student.name ||
                "Student"}

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
                  EMPTY_VALUE}


                {student.section
                  ? ` - ${student.section}`
                  : ""}

              </span>


              <span>

                <FaUserGraduate />

                Roll No.{" "}

                {student.rollNo ||
                  EMPTY_VALUE}

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

          icon={
            FaCalendarCheck
          }

          value={`${attendancePercentage}%`}

          title="Attendance"

          text="Overall attendance"

        />


        <StatCard

          icon={
            FaChartBar
          }

          value={`${resultAverage}%`}

          title="Academic Score"

          text="Average performance"

        />


        <StatCard

          icon={
            FaBookOpen
          }

          value={
            assignmentsData.length
          }

          title="Assignments"

          text="Assigned work"

        />


        <StatCard

          icon={
            FaMoneyBillWave
          }

          value={
            pendingFees
          }

          title="Pending Fees"

          text="Pending fee records"

        />


      </section>


      {/* ===================================================
          INFORMATION
      =================================================== */}

      <section className="tsd-information-grid">


        {/* PERSONAL DETAILS */}

        <InfoSection

          icon={
            FaUserGraduate
          }

          label="STUDENT INFORMATION"

          title="Personal Details"

        >


          <div className="tsd-details-grid">


            <Detail

              icon={
                FaUserGraduate
              }

              label="Full Name"

              value={
                student.name
              }

            />


            <Detail

              icon={
                FaIdCard
              }

              label="Admission Number"

              value={
                student.admissionNo
              }

            />


            <Detail

              icon={
                FaCalendarAlt
              }

              label="Date of Birth"

              value={
                student.dob
              }

            />


            <Detail

              icon={
                FaVenusMars
              }

              label="Gender"

              value={
                student.gender
              }

            />


            <Detail

              icon={
                FaTint
              }

              label="Blood Group"

              value={
                student.bloodGroup
              }

            />


            <Detail

              icon={
                FaPhoneAlt
              }

              label="Mobile"

              value={
                mobile
              }

            />


            <Detail

              icon={
                FaEnvelope
              }

              label="Email"

              value={
                student.email
              }

            />


            <Detail

              icon={
                FaUserShield
              }

              label="Status"

              value={
                student.status ||
                "Active"
              }

            />


          </div>


        </InfoSection>


        {/* ACADEMIC DETAILS */}

        <InfoSection

          icon={
            FaGraduationCap
          }

          label="ACADEMIC INFORMATION"

          title="Class Details"

        >


          <div className="tsd-details-grid">


            <Detail

              icon={
                FaSchool
              }

              label="Class"

              value={
                student.className
              }

            />


            <Detail

              icon={
                FaGraduationCap
              }

              label="Section"

              value={
                student.section
              }

            />


            <Detail

              icon={
                FaUserGraduate
              }

              label="Roll Number"

              value={
                student.rollNo
              }

            />


            <Detail

              icon={
                FaIdCard
              }

              label="Parent ID"

              value={
                student.parentId
              }

            />


          </div>


        </InfoSection>


        {/* ADDRESS */}

        <InfoSection

          icon={
            FaMapMarkerAlt
          }

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

                {address ||
                  "Address not available"}

              </strong>

            </div>


          </div>


        </InfoSection>


        {/* PARENT */}

        <InfoSection

          icon={
            FaUsers
          }

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

                Parent information is not
                available.

              </span>


            </div>

          )}


        </InfoSection>


      </section>


      {/* ===================================================
          COMMUNICATION
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


          {onMessageStudent && (

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

          )}


          {onMessageParent && (

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

          )}


        </div>


      </section>


      {/* ===================================================
          RESULTS
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

                  <th>
                    Subject
                  </th>

                  <th>
                    Exam
                  </th>

                  <th>
                    Marks
                  </th>

                  <th>
                    Grade
                  </th>

                </tr>

              </thead>


              <tbody>


                {resultsData
                  .slice(
                    0,
                    6
                  )
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
                            EMPTY_VALUE}

                        </td>


                        <td>

                          {result.marks ??
                            result.percentage ??
                            EMPTY_VALUE}

                        </td>


                        <td>

                          <span className="tsd-grade">

                            {result.grade ||
                              EMPTY_VALUE}

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

            icon={
              FaChartBar
            }

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

            {assignmentsData.length} Assignments

          </strong>


        </div>


        {assignmentsData.length ? (

          <div className="tsd-assignment-grid">


            {assignmentsData
              .slice(
                0,
                6
              )
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
                          EMPTY_VALUE}

                      </small>


                    </div>


                  </div>

                )
              )}


          </div>

        ) : (

          <RecordEmpty

            icon={
              FaBookOpen
            }

            text="No assignments available."

          />

        )}


      </section>


      {/* ===================================================
          EDIT MODAL

          ONLY:
          CLASS
          SECTION
          PHONE
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

                  Edit Class, Section & Phone

                </h2>


                <p>

                  Other student details
                  are read-only for
                  teachers.

                </p>

              </div>


              <button

                type="button"

                onClick={() =>
                  setEditOpen(
                    false
                  )
                }

              >

                <FaTimes />

              </button>


            </div>


            <div className="tsd-form">


              {/* CLASS */}

              <SelectField

                label="Class"

                name="className"

                value={
                  formData.className
                }

                onChange={
                  handleChange
                }

                options={
                  classOptions
                }

                required

              />


              {/* SECTION */}

              {currentSectionOptions.length ? (

                <SelectField

                  label="Section"

                  name="section"

                  value={
                    formData.section
                  }

                  onChange={
                    handleChange
                  }

                  options={
                    currentSectionOptions
                  }

                />

              ) : (

                <InputField

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

              <InputField

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


            <div className="tsd-modal-footer">


              <button

                type="button"

                className="cancel"

                onClick={() =>
                  setEditOpen(
                    false
                  )
                }

              >

                Cancel

              </button>


              <button

                type="button"

                className="save"

                onClick={
                  handleUpdate
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
   STAT CARD
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


      <h3>

        {title}

      </h3>


      <p>

        {text}

      </p>

    </div>


  </div>

);


/* =========================================================
   INFO SECTION
========================================================= */

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


/* =========================================================
   DETAIL
========================================================= */

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

        {value ||
          EMPTY_VALUE}

      </strong>

    </div>


  </div>

);


/* =========================================================
   EMPTY RECORD
========================================================= */

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


/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({

  label,

  required,

  ...props

}) => (

  <div className="tsd-field">


    <label>

      {label}

      {required && (

        <sup>
          *
        </sup>

      )}

    </label>


    <input
      {...props}
    />


  </div>

);


/* =========================================================
   SELECT FIELD
========================================================= */

const SelectField = ({

  label,

  options = [],

  required,

  ...props

}) => (

  <div className="tsd-field">


    <label>

      {label}

      {required && (

        <sup>
          *
        </sup>

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


export default TeacherStudentDetails;