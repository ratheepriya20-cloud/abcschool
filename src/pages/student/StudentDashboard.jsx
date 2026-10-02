import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarCheck,
  FaClipboardList,
  FaChartBar,
  FaMoneyBillWave,
  FaBullhorn,
  FaCalendarAlt,
  FaComments,
  FaUserGraduate,
  FaSignOutAlt,
  FaGraduationCap,
  FaBell,
  FaChevronRight,
} from "react-icons/fa";

import "./StudentDashboard.css";

/* =========================================================
   STUDENT AUTH
========================================================= */

import {
  getLoggedInStudent,
  logoutStudent,
} from "../../data/studentAuthData";

/* =========================================================
   SCHOOL DATA
========================================================= */

import { getAttendance } from "../../data/attendanceData";

import { getAssignments } from "../../data/assignmentsData";

import { getResults } from "../../data/resultsData";

import { getFees } from "../../data/feesData";

import { getNotices } from "../../data/noticesData";

import { getEvents } from "../../data/eventsData";

import { getTeachers } from "../../data/teachersData";

/* =========================================================
   CHAT
========================================================= */

import {
  getUnreadTeacherChatCount,
  SENDER_TYPES,
} from "../../data/teacherChatData";

/* =========================================================
   COMMON NOTIFICATIONS
========================================================= */

import {
  PORTAL_TYPES,
  PORTAL_NOTIFICATION_EVENT,
  startPortalNotificationListener,
  getNotificationsForUser,
  getUnreadNotificationsForUser,
  hasUnreadNotificationForSection,
  markNotificationSectionRead,
  markPortalNotificationRead,
} from "../../data/portalNotificationsData";

/* =========================================================
   STUDENT PAGES
========================================================= */

import StudentOverview from "./StudentOverview";

import StudentNotifications from "./StudentNotifications";

import StudentAttendance from "./StudentAttendance";

import StudentAssignments from "./StudentAssignments";

import StudentResults from "./StudentResults";

import StudentFees from "./StudentFees";

import StudentNotices from "./StudentNotices";

import StudentEvents from "./StudentEvents";

import StudentTeacherChat from "./StudentTeacherChat";

import StudentProfile from "./StudentProfile";

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

/* =========================================================
   STUDENT DASHBOARD
========================================================= */

const StudentDashboard = () => {
  const navigate = useNavigate();

  /* =======================================================
     LOGGED IN STUDENT

     IMPORTANT:
     Koi hardcoded student nahi hai.
  ======================================================= */

  const [student, setStudent] =
    useState(() => {
      try {
        return (
          getLoggedInStudent?.() ||
          null
        );
      } catch (error) {
        console.error(
          "Student session error:",
          error
        );

        return null;
      }
    });

  /* =======================================================
     PAGE STATE
  ======================================================= */

  const [
    activePage,
    setActivePage,
  ] = useState("overview");

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /* =======================================================
     SCHOOL DATA
  ======================================================= */

  const [
    schoolData,
    setSchoolData,
  ] = useState({
    attendance: [],
    assignments: [],
    results: [],
    fees: [],
    notices: [],
    events: [],
    teachers: [],
  });

  /* =======================================================
     NOTIFICATION REFRESH VERSION
  ======================================================= */

  const [
    notificationVersion,
    setNotificationVersion,
  ] = useState(0);

  /* =======================================================
     CURRENT STUDENT ID
  ======================================================= */

  const studentId =
    student?.id ||
    student?.studentId ||
    student?.admissionNo ||
    "";

  /* =======================================================
     START NOTIFICATION LISTENER
  ======================================================= */

  useEffect(() => {
    startPortalNotificationListener();
  }, []);

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadData =
    useCallback(() => {
      try {
        const currentStudent =
          getLoggedInStudent?.();

        /*
          Session nahi hai to login.
        */

        if (!currentStudent) {
          navigate(
            "/student/login",
            {
              replace: true,
            }
          );

          return;
        }

        /*
          IMPORTANT:
          Student state hamesha current
          logged-in student se refresh hogi.
        */

        setStudent(
          currentStudent
        );

        setSchoolData({
          attendance:
            getAttendance?.() ||
            [],

          assignments:
            getAssignments?.() ||
            [],

          results:
            getResults?.() ||
            [],

          fees:
            getFees?.() ||
            [],

          notices:
            getNotices?.() ||
            [],

          events:
            getEvents?.() ||
            [],

          teachers:
            getTeachers?.() ||
            [],
        });

        setNotificationVersion(
          (value) =>
            value + 1
        );
      } catch (error) {
        console.error(
          "Student dashboard load error:",
          error
        );
      }
    }, [navigate]);

  /* =======================================================
     LIVE DATA UPDATE
  ======================================================= */

  useEffect(() => {
    loadData();

    const handleDataUpdate =
      () => {
        loadData();
      };

    const handleNotificationUpdate =
      () => {
        setNotificationVersion(
          (value) =>
            value + 1
        );
      };

    /*
      Admin / Teacher data changes.
    */

    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdate
    );

    /*
      Different tab localStorage update.
    */

    window.addEventListener(
      "storage",
      handleDataUpdate
    );

    /*
      Teacher chat message.
    */

    window.addEventListener(
      "abpsTeacherChatUpdated",
      handleNotificationUpdate
    );

    /*
      Portal notification.
    */

    window.addEventListener(
      PORTAL_NOTIFICATION_EVENT,
      handleNotificationUpdate
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

      window.removeEventListener(
        "abpsTeacherChatUpdated",
        handleNotificationUpdate
      );

      window.removeEventListener(
        PORTAL_NOTIFICATION_EVENT,
        handleNotificationUpdate
      );
    };
  }, [loadData]);

  /* =======================================================
     PERSONAL RECORD HELPER

     IMPORTANT:
     Personal records me studentId nahi mila
     to record show nahi hoga.
  ======================================================= */

  const belongsToCurrentStudent =
    useCallback(
      (item) => {
        if (!studentId) {
          return false;
        }

        const itemStudentId =
          item?.studentId ||
          item?.student?.studentId ||
          item?.student?.id ||
          "";

        if (!itemStudentId) {
          return false;
        }

        return (
          normalize(
            itemStudentId
          ) ===
          normalize(
            studentId
          )
        );
      },
      [studentId]
    );

  /* =======================================================
     MY ATTENDANCE
  ======================================================= */

  const myAttendance =
    useMemo(() => {
      return (
        schoolData.attendance ||
        []
      ).filter(
        belongsToCurrentStudent
      );
    }, [
      schoolData.attendance,
      belongsToCurrentStudent,
    ]);

  /* =======================================================
     MY RESULTS
  ======================================================= */

  const myResults =
    useMemo(() => {
      return (
        schoolData.results ||
        []
      ).filter(
        belongsToCurrentStudent
      );
    }, [
      schoolData.results,
      belongsToCurrentStudent,
    ]);

  /* =======================================================
     MY FEES
  ======================================================= */

  const myFees =
    useMemo(() => {
      return (
        schoolData.fees ||
        []
      ).filter(
        belongsToCurrentStudent
      );
    }, [
      schoolData.fees,
      belongsToCurrentStudent,
    ]);

  /* =======================================================
     MY ASSIGNMENTS
  ======================================================= */

  const myAssignments =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      return (
        schoolData.assignments ||
        []
      ).filter((item) => {
        /*
          Exact student assignment.
        */

        if (
          item?.studentId
        ) {
          return (
            normalize(
              item.studentId
            ) ===
            normalize(
              studentId
            )
          );
        }

        /*
          Class-targeted assignment.
        */

        const itemClass =
          item?.className ||
          item?.class ||
          "";

        /*
          Global assignment.
        */

        if (!itemClass) {
          return true;
        }

        const currentClass =
          student?.className ||
          student?.class ||
          "";

        const classMatches =
          normalizeClass(
            itemClass
          ) ===
          normalizeClass(
            currentClass
          );

        if (!classMatches) {
          return false;
        }

        /*
          Section check.
        */

        const itemSection =
          normalize(
            item?.section
          );

        const currentSection =
          normalize(
            student?.section
          );

        if (
          itemSection &&
          itemSection !==
            currentSection
        ) {
          return false;
        }

        return true;
      });
    }, [
      schoolData.assignments,
      student,
      studentId,
    ]);

  /* =======================================================
     MY NOTICES
  ======================================================= */

  const myNotices =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      return (
        schoolData.notices ||
        []
      ).filter((item) => {
        /*
          Exact student notice.
        */

        if (
          item?.studentId
        ) {
          return (
            normalize(
              item.studentId
            ) ===
            normalize(
              studentId
            )
          );
        }

        /*
          Class specific.
        */

        const itemClass =
          item?.className ||
          item?.class ||
          "";

        if (itemClass) {
          const currentClass =
            student?.className ||
            student?.class ||
            "";

          const classMatches =
            normalizeClass(
              itemClass
            ) ===
            normalizeClass(
              currentClass
            );

          if (!classMatches) {
            return false;
          }

          if (
            item?.section &&
            normalize(
              item.section
            ) !==
              normalize(
                student?.section
              )
          ) {
            return false;
          }
        }

        /*
          Global notice.
        */

        return true;
      });
    }, [
      schoolData.notices,
      student,
      studentId,
    ]);

  /* =======================================================
     MY EVENTS
  ======================================================= */

  const myEvents =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      return (
        schoolData.events ||
        []
      ).filter((item) => {
        /*
          Exact student event.
        */

        if (
          item?.studentId
        ) {
          return (
            normalize(
              item.studentId
            ) ===
            normalize(
              studentId
            )
          );
        }

        /*
          Class specific event.
        */

        const itemClass =
          item?.className ||
          item?.class ||
          "";

        if (itemClass) {
          const currentClass =
            student?.className ||
            student?.class ||
            "";

          const classMatches =
            normalizeClass(
              itemClass
            ) ===
            normalizeClass(
              currentClass
            );

          if (!classMatches) {
            return false;
          }

          if (
            item?.section &&
            normalize(
              item.section
            ) !==
              normalize(
                student?.section
              )
          ) {
            return false;
          }
        }

        /*
          Global event.
        */

        return true;
      });
    }, [
      schoolData.events,
      student,
      studentId,
    ]);

  /* =======================================================
     MY TEACHERS
  ======================================================= */

  const myTeachers =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      return (
        schoolData.teachers ||
        []
      ).filter((teacher) => {
        /*
          Only active teachers.
        */

        if (
          normalize(
            teacher?.status ||
              "Active"
          ) !== "active"
        ) {
          return false;
        }

        const classes =
          Array.isArray(
            teacher?.classes
          )
            ? teacher.classes
            : [];

        return classes.some(
          (item) => {
            const currentClass =
              student?.className ||
              student?.class ||
              "";

            const teacherClass =
              item?.className ||
              item?.class ||
              "";

            const classMatches =
              normalizeClass(
                teacherClass
              ) ===
              normalizeClass(
                currentClass
              );

            if (!classMatches) {
              return false;
            }

            const teacherSection =
              normalize(
                item?.section
              );

            const currentSection =
              normalize(
                student?.section
              );

            return (
              !teacherSection ||
              teacherSection ===
                currentSection
            );
          }
        );
      });
    }, [
      schoolData.teachers,
      student,
      studentId,
    ]);

  /* =======================================================
     NOTIFICATION USER

     THIS IS THE IMPORTANT FILTER.

     Jo student login hai usi ka ID
     notification system ko diya jayega.
  ======================================================= */

  const notificationUser =
    useMemo(
      () => ({
        role:
          PORTAL_TYPES.STUDENT,

        userId:
          studentId,

        studentId,

        className:
          student?.className ||
          student?.class ||
          "",

        section:
          student?.section ||
          "",
      }),
      [
        studentId,
        student,
      ]
    );

  /* =======================================================
     ALL RELEVANT NOTIFICATIONS

     portalNotificationsData.js already
     exact student filtering karega.
  ======================================================= */

  const allNotifications =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      try {
        return (
          getNotificationsForUser(
            notificationUser
          ) || []
        );
      } catch (error) {
        console.error(
          "Student notifications error:",
          error
        );

        return [];
      }
    }, [
      notificationUser,
      notificationVersion,
      studentId,
    ]);

  /* =======================================================
     UNREAD PORTAL NOTIFICATIONS
  ======================================================= */

  const unreadPortalNotifications =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      try {
        return (
          getUnreadNotificationsForUser(
            notificationUser
          ) || []
        );
      } catch (error) {
        console.error(
          "Unread notification error:",
          error
        );

        return [];
      }
    }, [
      notificationUser,
      notificationVersion,
      studentId,
    ]);

  /* =======================================================
     CHAT UNREAD
  ======================================================= */

  const unreadChatCount =
    useMemo(() => {
      if (!studentId) {
        return 0;
      }

      try {
        return (
          getUnreadTeacherChatCount(
            SENDER_TYPES.STUDENT,
            studentId
          ) || 0
        );
      } catch (error) {
        console.error(
          "Chat unread error:",
          error
        );

        return 0;
      }
    }, [
      studentId,
      notificationVersion,
    ]);

  /* =======================================================
     TOTAL UNREAD
  ======================================================= */

  const totalUnread =
    unreadPortalNotifications.length +
    unreadChatCount;

  /* =======================================================
     SECTION DOT
  ======================================================= */

  const sectionHasDot =
    useCallback(
      (sectionName) => {
        if (!studentId) {
          return false;
        }

        try {
          return (
            hasUnreadNotificationForSection(
              notificationUser,
              sectionName
            ) || false
          );
        } catch {
          return false;
        }
      },
      [
        studentId,
        notificationUser,
        notificationVersion,
      ]
    );

  /* =======================================================
     NORMAL PAGE OPEN
  ======================================================= */

  const openPage =
    useCallback(
      (page) => {
        setActivePage(page);

        setSidebarOpen(false);

        /*
          Section page manually open karne par
          us section ki relevant notifications
          current student ke liye read.
        */

        if (
          ![
            "overview",
            "notifications",
            "chat",
            "profile",
          ].includes(page)
        ) {
          try {
            markNotificationSectionRead(
              notificationUser,
              page
            );
          } catch (error) {
            console.error(
              "Section notification read error:",
              error
            );
          }

          setNotificationVersion(
            (value) =>
              value + 1
          );
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      [notificationUser]
    );

  /* =======================================================
     NOTIFICATION CLICK

     Click:
     1. Sirf clicked notification read
     2. Related page open
     3. Red number/dot refresh
  ======================================================= */

  const handleNotificationClick =
    useCallback(
      (notification) => {
        if (
          !notification ||
          !studentId
        ) {
          return;
        }

        try {
          markPortalNotificationRead(
            notification.id,
            PORTAL_TYPES.STUDENT,
            studentId
          );
        } catch (error) {
          console.error(
            "Notification read error:",
            error
          );
        }

        let targetPage =
          notification.section ||
          "notifications";

        /*
          Student details changed:
          My Profile open.
        */

        if (
          targetPage ===
          "students"
        ) {
          targetPage =
            "profile";
        }

        /*
          Safe aliases.
        */

        if (
          targetPage ===
          "assignment"
        ) {
          targetPage =
            "assignments";
        }

        if (
          targetPage ===
          "result"
        ) {
          targetPage =
            "results";
        }

        if (
          targetPage ===
          "fee"
        ) {
          targetPage =
            "fees";
        }

        setNotificationVersion(
          (value) =>
            value + 1
        );

        setActivePage(
          targetPage
        );

        setSidebarOpen(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      [studentId]
    );

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    try {
      logoutStudent?.();
    } catch (error) {
      console.error(
        "Student logout error:",
        error
      );
    }

    navigate(
      "/student/login",
      {
        replace: true,
      }
    );
  };

  /* =======================================================
     NO STUDENT
  ======================================================= */

  if (!student) {
    return null;
  }

  /* =======================================================
     MENU
  ======================================================= */

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: FaHome,
      dot: false,
    },

    {
      id: "notifications",
      label: "Notifications",
      icon: FaBell,
      dot:
        totalUnread > 0,
    },

    {
      id: "attendance",
      label: "Attendance",
      icon: FaCalendarCheck,
      dot:
        sectionHasDot(
          "attendance"
        ),
    },

    {
      id: "assignments",
      label: "Assignments",
      icon: FaClipboardList,
      dot:
        sectionHasDot(
          "assignments"
        ),
    },

    {
      id: "results",
      label: "Results",
      icon: FaChartBar,
      dot:
        sectionHasDot(
          "results"
        ),
    },

    {
      id: "fees",
      label: "Fees",
      icon: FaMoneyBillWave,
      dot:
        sectionHasDot(
          "fees"
        ),
    },

    {
      id: "notices",
      label: "Notices",
      icon: FaBullhorn,
      dot:
        sectionHasDot(
          "notices"
        ),
    },

    {
      id: "events",
      label: "Events",
      icon: FaCalendarAlt,
      dot:
        sectionHasDot(
          "events"
        ),
    },

    {
      id: "chat",
      label: "Private Chat",
      icon: FaComments,
      dot:
        unreadChatCount > 0,
    },

    {
      id: "profile",
      label: "My Profile",
      icon: FaUserGraduate,
      dot:
        sectionHasDot(
          "students"
        ),
    },
  ];

  /* =======================================================
     CURRENT MENU
  ======================================================= */

  const currentMenu =
    menuItems.find(
      (item) =>
        item.id ===
        activePage
    );

  /* =======================================================
     RENDER PAGE
  ======================================================= */

  const renderPage = () => {
    switch (activePage) {
      /* ===================================================
         NOTIFICATIONS
      =================================================== */

      case "notifications":
        return (
          <StudentNotifications
            student={student}

            notifications={
              allNotifications
            }

            unreadNotifications={
              unreadPortalNotifications
            }

            onNavigate={
              openPage
            }

            onNotificationClick={
              handleNotificationClick
            }
          />
        );

      /* ===================================================
         ATTENDANCE
      =================================================== */

      case "attendance":
        return (
          <StudentAttendance
            attendance={
              myAttendance
            }

            student={student}
          />
        );

      /* ===================================================
         ASSIGNMENTS
      =================================================== */

      case "assignments":
        return (
          <StudentAssignments
            assignments={
              myAssignments
            }

            student={student}
          />
        );

      /* ===================================================
         RESULTS
      =================================================== */

      case "results":
        return (
          <StudentResults
            results={
              myResults
            }

            student={student}
          />
        );

      /* ===================================================
         FEES
      =================================================== */

      case "fees":
        return (
          <StudentFees
            fees={
              myFees
            }

            student={student}
          />
        );

      /* ===================================================
         NOTICES
      =================================================== */

      case "notices":
        return (
          <StudentNotices
            notices={
              myNotices
            }

            student={student}
          />
        );

      /* ===================================================
         EVENTS
      =================================================== */

      case "events":
        return (
          <StudentEvents
            events={
              myEvents
            }

            student={student}
          />
        );

      /* ===================================================
         PRIVATE CHAT
      =================================================== */

      case "chat":
        return (
          <StudentTeacherChat
            student={student}

            teachers={
              myTeachers
            }
          />
        );

      /* ===================================================
         PROFILE
      =================================================== */

      case "profile":
        return (
          <StudentProfile
            student={student}
          />
        );

      /* ===================================================
         OVERVIEW
      =================================================== */

      case "overview":
      default:
        return (
          <StudentOverview
            student={student}

            attendance={
              myAttendance
            }

            assignments={
              myAssignments
            }

            results={
              myResults
            }

            fees={
              myFees
            }

            notices={
              myNotices
            }

            events={
              myEvents
            }

            teachers={
              myTeachers
            }

            onNavigate={
              openPage
            }
          />
        );
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="studentDash-page">

      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="studentDash-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Close sidebar"
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`studentDash-sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        {/* BRAND */}

        <div className="studentDash-brand">

          <div className="studentDash-brandIcon">
            <FaGraduationCap />
          </div>

          <div className="studentDash-brandText">
            <strong>
              AB PUBLIC
            </strong>

            <span>
              STUDENT PORTAL
            </span>
          </div>

          <button
            type="button"
            className="studentDash-close"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

        </div>

        {/* STUDENT MINI PROFILE */}

        <div className="studentDash-miniProfile">

          <div className="studentDash-avatar">
            {student?.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "S"}
          </div>

          <div className="studentDash-miniInfo">

            <strong>
              {student?.name ||
                "Student"}
            </strong>

            <span>
              {student?.className ||
                student?.class ||
                "Student"}

              {student?.section
                ? ` - ${student.section}`
                : ""}
            </span>

            <small>
              {student?.admissionNo ||
                studentId}
            </small>

          </div>

        </div>

        {/* MENU TITLE */}

        <div className="studentDash-menuTitle">
          STUDENT MENU
        </div>

        {/* MENU */}

        <nav className="studentDash-nav">

          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`studentDash-navButton ${
                    activePage ===
                    item.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    openPage(
                      item.id
                    )
                  }
                >

                  <span className="studentDash-navIcon">
                    <Icon />
                  </span>

                  <span className="studentDash-navLabel">
                    {item.label}
                  </span>

                  {item.dot && (
                    <span
                      className="studentDash-notificationDot"
                      title="New update"
                    />
                  )}

                  <FaChevronRight
                    className="studentDash-navArrow"
                  />

                </button>
              );
            }
          )}

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="studentDash-sidebarBottom">

          <button
            type="button"
            className="studentDash-logout"
            onClick={
              handleLogout
            }
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="studentDash-main">

        {/* =================================================
            TOPBAR
        ================================================= */}

        <header className="studentDash-topbar">

          <div className="studentDash-topbarLeft">

            <button
              type="button"
              className="studentDash-menuButton"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <div className="studentDash-pageHeading">

              <span>
                AB PUBLIC SCHOOL
              </span>

              <h2>
                {currentMenu?.label ||
                  "Student Dashboard"}
              </h2>

            </div>

          </div>

          {/* TOPBAR RIGHT */}

          <div className="studentDash-topbarRight">

            {/* NOTIFICATION BELL */}

            <button
              type="button"
              className="studentDash-bell"
              onClick={() =>
                openPage(
                  "notifications"
                )
              }
              aria-label="Notifications"
            >
              <FaBell />

              {totalUnread > 0 && (
                <>
                  <span className="studentDash-bellDot" />

                  <span className="studentDash-bellCount">
                    {totalUnread > 99
                      ? "99+"
                      : totalUnread}
                  </span>
                </>
              )}

            </button>

            {/* USER */}

            <div className="studentDash-topUser">

              <div className="studentDash-topAvatar">
                {student?.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "S"}
              </div>

              <span>
                <strong>
                  {student?.name ||
                    "Student"}
                </strong>

                <small>
                  {student?.admissionNo ||
                    studentId}
                </small>
              </span>

            </div>

          </div>

        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="studentDash-content">
          {renderPage()}
        </div>

      </main>

    </div>
  );
};

export default StudentDashboard;