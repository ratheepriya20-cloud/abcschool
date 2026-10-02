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
  FaUserGraduate,
  FaComments,
  FaSignOutAlt,
  FaGraduationCap,
  FaShieldAlt,
  FaBell,
  FaCalendarCheck,
  FaClipboardList,
  FaChartBar,
  FaMoneyBillWave,
  FaBullhorn,
  FaCalendarAlt,
  FaNewspaper,
  FaChevronRight,
} from "react-icons/fa";

import {
  getLoggedInTeacher,
  logoutTeacher,
} from "../../data/teacherAuthData";

import { getStudents } from "../../data/studentsData";
import { getAttendance } from "../../data/attendanceData";
import { getAssignments } from "../../data/assignmentsData";
import { getResults } from "../../data/resultsData";
import { getFees } from "../../data/feesData";
import { getNotices } from "../../data/noticesData";
import { getEvents } from "../../data/eventsData";
import { getNews } from "../../data/newsData";

import {
  PORTAL_TYPES,
  PORTAL_NOTIFICATION_EVENT,
  startPortalNotificationListener,
  getUnreadNotificationsForUser,
  hasUnreadNotificationForSection,
  markNotificationSectionRead,
} from "../../data/portalNotificationsData";

import {
  getUnreadTeacherChatCount,
  SENDER_TYPES,
} from "../../data/teacherChatData";

import TeacherStudents from "./TeacherStudents";
import TeacherMessages from "./TeacherMessages";
import TeacherNotifications from "./TeacherNotifications";

import TeacherAttendance from "./TeacherAttendance";
import TeacherAssignments from "./TeacherAssignments";
import TeacherResults from "./TeacherResults";
import TeacherFees from "./TeacherFees";
import TeacherNotices from "./TeacherNotices";
import TeacherNews from "./TeacherNews";
import TeacherEvents from "./TeacherEvents";

import "./TeacherDashboard.css";

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

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(() =>
    getLoggedInTeacher()
  );

  const [schoolData, setSchoolData] = useState({
    students: [],
    attendance: [],
    assignments: [],
    results: [],
    fees: [],
    notices: [],
    news: [],
    events: [],
  });

  const [activePage, setActivePage] =
    useState("overview");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [messageStudent, setMessageStudent] =
    useState(null);

  const [messageType, setMessageType] =
    useState("student");

  const [
    notificationVersion,
    setNotificationVersion,
  ] = useState(0);

  const teacherId =
    teacher?.id ||
    teacher?.teacherId ||
    "";

  /* =====================================================
     NOTIFICATION LISTENER
  ===================================================== */

  useEffect(() => {
    startPortalNotificationListener();
  }, []);

  /* =====================================================
     LOAD DATA
  ===================================================== */

  const loadData = useCallback(() => {
    const currentTeacher =
      getLoggedInTeacher();

    if (!currentTeacher) {
      navigate("/teacher/login", {
        replace: true,
      });

      return;
    }

    setTeacher(currentTeacher);

    setSchoolData({
      students: getStudents?.() || [],
      attendance: getAttendance?.() || [],
      assignments: getAssignments?.() || [],
      results: getResults?.() || [],
      fees: getFees?.() || [],
      notices: getNotices?.() || [],
      news: getNews?.() || [],
      events: getEvents?.() || [],
    });

    setNotificationVersion(
      (value) => value + 1
    );
  }, [navigate]);

  /* =====================================================
     LIVE EVENTS
  ===================================================== */

  useEffect(() => {
    loadData();

    const handleDataUpdate = () => {
      loadData();
    };

    const handleNotificationUpdate = () => {
      setNotificationVersion(
        (value) => value + 1
      );
    };

    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdate
    );

    window.addEventListener(
      "storage",
      handleDataUpdate
    );

    window.addEventListener(
      "abpsTeacherSessionUpdated",
      handleDataUpdate
    );

    window.addEventListener(
      "abpsTeacherChatUpdated",
      handleNotificationUpdate
    );

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
        "abpsTeacherSessionUpdated",
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

  /* =====================================================
     ASSIGNED STUDENTS
  ===================================================== */

  const myStudents = useMemo(() => {
    if (!teacher) return [];

    const classes =
      Array.isArray(teacher.classes)
        ? teacher.classes
        : [];

    if (!classes.length) {
      return [];
    }

    return schoolData.students.filter(
      (student) =>
        classes.some((assigned) => {
          const classMatch =
            normalizeClass(
              assigned?.className ||
                assigned?.class
            ) ===
            normalizeClass(
              student?.className ||
                student?.class
            );

          const teacherSection =
            normalize(assigned?.section);

          const studentSection =
            normalize(student?.section);

          return (
            classMatch &&
            (!teacherSection ||
              teacherSection ===
                studentSection)
          );
        })
    );
  }, [teacher, schoolData.students]);

  /* =====================================================
     STUDENT IDS
  ===================================================== */

  const myStudentIds = useMemo(() => {
    const ids = new Set();

    myStudents.forEach((student) => {
      [
        student?.id,
        student?.studentId,
        student?.admissionNo,
      ]
        .filter(Boolean)
        .forEach((id) =>
          ids.add(String(id))
        );
    });

    return ids;
  }, [myStudents]);

  /* =====================================================
     STUDENT FILTER
  ===================================================== */

  const belongsToMyStudent = useCallback(
    (item) => {
      const possibleIds = [
        item?.studentId,
        item?.student?.id,
        item?.admissionNo,
      ]
        .filter(Boolean)
        .map(String);

      return possibleIds.some((id) =>
        myStudentIds.has(id)
      );
    },
    [myStudentIds]
  );

  /* =====================================================
     CLASS FILTER
  ===================================================== */

  const belongsToMyClass = useCallback(
    (item) => {
      const itemClass =
        item?.className ||
        item?.class;

      if (!itemClass) {
        return true;
      }

      const classes =
        Array.isArray(teacher?.classes)
          ? teacher.classes
          : [];

      return classes.some((assigned) => {
        const classMatch =
          normalizeClass(
            assigned?.className ||
              assigned?.class
          ) ===
          normalizeClass(itemClass);

        const teacherSection =
          normalize(assigned?.section);

        const itemSection =
          normalize(item?.section);

        return (
          classMatch &&
          (!teacherSection ||
            !itemSection ||
            teacherSection ===
              itemSection)
        );
      });
    },
    [teacher]
  );

  /* =====================================================
     FILTERED DATA
  ===================================================== */

  const myAttendance = useMemo(
    () =>
      schoolData.attendance.filter(
        belongsToMyStudent
      ),
    [
      schoolData.attendance,
      belongsToMyStudent,
    ]
  );

  const myResults = useMemo(
    () =>
      schoolData.results.filter(
        belongsToMyStudent
      ),
    [
      schoolData.results,
      belongsToMyStudent,
    ]
  );

  const myFees = useMemo(
    () =>
      schoolData.fees.filter(
        belongsToMyStudent
      ),
    [
      schoolData.fees,
      belongsToMyStudent,
    ]
  );

  const myAssignments = useMemo(
    () =>
      schoolData.assignments.filter(
        (item) =>
          item?.studentId
            ? belongsToMyStudent(item)
            : belongsToMyClass(item)
      ),
    [
      schoolData.assignments,
      belongsToMyStudent,
      belongsToMyClass,
    ]
  );

  const myNotices = useMemo(
    () =>
      schoolData.notices.filter(
        (item) =>
          item?.studentId
            ? belongsToMyStudent(item)
            : belongsToMyClass(item)
      ),
    [
      schoolData.notices,
      belongsToMyStudent,
      belongsToMyClass,
    ]
  );

  const myNews = useMemo(
    () =>
      schoolData.news.filter(
        (item) =>
          item?.studentId
            ? belongsToMyStudent(item)
            : belongsToMyClass(item)
      ),
    [
      schoolData.news,
      belongsToMyStudent,
      belongsToMyClass,
    ]
  );

  const myEvents = useMemo(
    () =>
      schoolData.events.filter(
        (item) =>
          item?.studentId
            ? belongsToMyStudent(item)
            : belongsToMyClass(item)
      ),
    [
      schoolData.events,
      belongsToMyStudent,
      belongsToMyClass,
    ]
  );

  /* =====================================================
     NOTIFICATION USER
  ===================================================== */

  const notificationUser = useMemo(
    () => ({
      role: PORTAL_TYPES.TEACHER,

      userId: teacherId,

      teacherId,

      studentIds: myStudents
        .map(
          (student) =>
            student.id ||
            student.studentId
        )
        .filter(Boolean),

      classes:
        Array.isArray(teacher?.classes)
          ? teacher.classes
          : [],
    }),
    [
      teacherId,
      teacher,
      myStudents,
    ]
  );

  /* =====================================================
     DATA NOTIFICATIONS
  ===================================================== */

  const unreadDataNotifications =
    useMemo(() => {
      if (!teacherId) {
        return [];
      }

      return (
        getUnreadNotificationsForUser(
          notificationUser
        ) || []
      );
    }, [
      teacherId,
      notificationUser,
      notificationVersion,
    ]);

  /* =====================================================
     PRIVATE MESSAGE UNREAD COUNT
  ===================================================== */

  const unreadMessages =
    useMemo(() => {
      if (!teacherId) {
        return 0;
      }

      return (
        getUnreadTeacherChatCount(
          SENDER_TYPES.TEACHER,
          teacherId
        ) || 0
      );
    }, [
      teacherId,
      notificationVersion,
    ]);

  /* =====================================================
     TOTAL BELL COUNT
  ===================================================== */

  const totalUnread =
    unreadDataNotifications.length +
    unreadMessages;

  /* =====================================================
     SECTION DOT
  ===================================================== */

  const hasDot = useCallback(
    (section) => {
      if (!teacherId) {
        return false;
      }

      return hasUnreadNotificationForSection(
        notificationUser,
        section
      );
    },
    [
      teacherId,
      notificationUser,
      notificationVersion,
    ]
  );

  /* =====================================================
     OPEN PAGE
  ===================================================== */

  const openPage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);

    /*
      IMPORTANT:

      messages ko yahan read nahi karna.

      Private message tabhi read hoga
      jab actual chat conversation open hogi.
    */

    if (
      ![
        "overview",
        "notifications",
        "students",
        "messages",
      ].includes(page)
    ) {
      markNotificationSectionRead(
        notificationUser,
        page
      );

      setNotificationVersion(
        (value) => value + 1
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     OPEN STUDENT CHAT
  ===================================================== */

  const openStudentMessage = (
    student
  ) => {
    setMessageStudent(student);

    setMessageType("student");

    setActivePage("messages");

    setSidebarOpen(false);
  };

  /* =====================================================
     OPEN PARENT CHAT
  ===================================================== */

  const openParentMessage = (
    student
  ) => {
    setMessageStudent(student);

    setMessageType("parent");

    setActivePage("messages");

    setSidebarOpen(false);
  };

  /* =====================================================
     NOTIFICATION -> CHAT
  ===================================================== */

  const openNotificationChat = ({
    student = null,
    type = "student",
  } = {}) => {
    setMessageStudent(student);

    setMessageType(type);

    setActivePage("messages");

    setSidebarOpen(false);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logoutTeacher();

    navigate("/teacher/login", {
      replace: true,
    });
  };

  if (!teacher) {
    return null;
  }

  /* =====================================================
     MENU
  ===================================================== */

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: FaHome,
    },

    {
      id: "notifications",
      label: "Notifications",
      icon: FaBell,
      dot: totalUnread > 0,
      count: totalUnread,
    },

    {
      id: "students",
      label: "My Students",
      icon: FaUserGraduate,
    },

    {
      id: "attendance",
      label: "Attendance",
      icon: FaCalendarCheck,
      dot: hasDot("attendance"),
    },

    {
      id: "assignments",
      label: "Assignments",
      icon: FaClipboardList,
      dot: hasDot("assignments"),
    },

    {
      id: "results",
      label: "Results",
      icon: FaChartBar,
      dot: hasDot("results"),
    },

    {
      id: "fees",
      label: "Fees",
      icon: FaMoneyBillWave,
      dot: hasDot("fees"),
    },

    {
      id: "notices",
      label: "Notices",
      icon: FaBullhorn,
      dot: hasDot("notices"),
    },

    {
      id: "news",
      label: "News",
      icon: FaNewspaper,
      dot: hasDot("news"),
    },

    {
      id: "events",
      label: "Events",
      icon: FaCalendarAlt,
      dot: hasDot("events"),
    },

    {
      id: "messages",
      label: "Private Messages",
      icon: FaComments,

      /*
        Message ke liye actual unread count.
      */

      dot: unreadMessages > 0,

      count: unreadMessages,
    },
  ];

  const currentMenu =
    menuItems.find(
      (item) =>
        item.id === activePage
    );

  /* =====================================================
     PAGE RENDER
  ===================================================== */

  const renderPage = () => {
    switch (activePage) {
      case "notifications":
        return (
          <TeacherNotifications
            teacher={teacher}
            students={myStudents}
            onNavigate={openPage}
            onOpenChat={
              openNotificationChat
            }
          />
        );

      case "students":
        return (
          <TeacherStudents
            teacher={teacher}
            students={myStudents}
            onOpenStudentChat={
              openStudentMessage
            }
            onOpenParentChat={
              openParentMessage
            }
          />
        );

      case "attendance":
        return (
          <TeacherAttendance
            teacher={teacher}
            students={myStudents}
            attendance={
              myAttendance
            }
          />
        );

      case "assignments":
        return (
          <TeacherAssignments
            teacher={teacher}
            students={myStudents}
            assignments={
              myAssignments
            }
          />
        );

      case "results":
        return (
          <TeacherResults
            teacher={teacher}
            students={myStudents}
            results={myResults}
          />
        );

      case "fees":
        return (
          <TeacherFees
            teacher={teacher}
            students={myStudents}
            fees={myFees}
          />
        );

      case "notices":
        return (
          <TeacherNotices
            teacher={teacher}
            notices={myNotices}
          />
        );

      case "news":
        return (
          <TeacherNews
            news={myNews}
          />
        );

      case "events":
        return (
          <TeacherEvents
            teacher={teacher}
            events={myEvents}
          />
        );

      case "messages":
        return (
          <TeacherMessages
            key={`${
              messageStudent?.id ||
              "all"
            }-${messageType}`}
            initialStudent={
              messageStudent
            }
            initialType={
              messageType
            }
          />
        );

      default:
        return (
          <TeacherHome
            teacher={teacher}
            students={myStudents}
            totalUnread={
              totalUnread
            }
            unreadMessages={
              unreadMessages
            }
            onNavigate={
              openPage
            }
          />
        );
    }
  };

  return (
    <div className="teacherDashLight-page">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="teacherDashLight-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Close sidebar"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`teacherDashLight-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* BRAND */}

        <div className="teacherDashLight-brand">

          <div className="teacherDashLight-brandIcon">
            <FaGraduationCap />
          </div>

          <div className="teacherDashLight-brandText">
            <strong>
              AB PUBLIC
            </strong>

            <span>
              TEACHER PORTAL
            </span>
          </div>

          <button
            type="button"
            className="teacherDashLight-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes />
          </button>

        </div>

        {/* PROFILE */}

        <div className="teacherDashLight-miniProfile">

          <div className="teacherDashLight-avatar">
            {teacher.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "T"}
          </div>

          <div>
            <strong>
              {teacher.name}
            </strong>

            <span>
              {teacher.designation ||
                "Teacher"}
            </span>

            <small>
              {teacher.employeeId}
            </small>
          </div>

        </div>

        <div className="teacherDashLight-menuTitle">
          TEACHER MENU
        </div>

        {/* MENU */}

        <nav className="teacherDashLight-nav">

          {menuItems.map(
            (item) => (
              <SidebarButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={
                  activePage ===
                  item.id
                }
                showDot={
                  item.dot
                }
                count={
                  item.count || 0
                }
                onClick={() => {
                  if (
                    item.id ===
                    "messages"
                  ) {
                    setMessageStudent(
                      null
                    );

                    setMessageType(
                      "student"
                    );
                  }

                  openPage(
                    item.id
                  );
                }}
              />
            )
          )}

        </nav>

        {/* BOTTOM */}

        <div className="teacherDashLight-sidebarBottom">

          <div className="teacherDashLight-accessBox">

            <FaShieldAlt />

            <div>
              <strong>
                Teacher Access
              </strong>

              <span>
                Secure school portal
              </span>
            </div>

          </div>

          <button
            type="button"
            className="teacherDashLight-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="teacherDashLight-main">

        {/* TOPBAR */}

        <header className="teacherDashLight-topbar">

          <div className="teacherDashLight-topbarLeft">

            <button
              type="button"
              className="teacherDashLight-menuButton"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FaBars />
            </button>

            <div>
              <span>
                AB Public School
              </span>

              <h2>
                {currentMenu?.label ||
                  "Teacher Dashboard"}
              </h2>
            </div>

          </div>

          <div className="teacherDashLight-topbarRight">

            {/* BELL */}

            <button
              type="button"
              className="teacherDashLight-bell"
              onClick={() =>
                openPage(
                  "notifications"
                )
              }
              aria-label="Notifications"
            >

              <FaBell />

              {totalUnread > 0 && (
                <span className="teacherDashLight-bellCount">
                  {totalUnread > 99
                    ? "99+"
                    : totalUnread}
                </span>
              )}

            </button>

            {/* USER */}

            <div className="teacherDashLight-topUser">

              <div>
                {teacher.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "T"}
              </div>

              <span>
                <strong>
                  {teacher.name}
                </strong>

                <small>
                  {teacher.employeeId}
                </small>
              </span>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="teacherDashLight-content">
          {renderPage()}
        </div>

      </main>

    </div>
  );
};

/* =========================================================
   OVERVIEW
========================================================= */

const TeacherHome = ({
  teacher,
  students = [],
  totalUnread = 0,
  unreadMessages = 0,
  onNavigate,
}) => {
  const classes =
    Array.isArray(teacher?.classes)
      ? teacher.classes
      : [];

  return (
    <div className="teacherPortal-home">

      <section className="teacherPortal-hero">

        <div>
          <span>
            TEACHER WORKSPACE
          </span>

          <h1>
            Welcome back,{" "}
            <strong>
              {teacher.name}
            </strong>
          </h1>

          <p>
            View students, academic
            records, school updates and
            private messages from
            students and parents.
          </p>
        </div>

        <div className="teacherPortal-heroIcon">
          <FaGraduationCap />
        </div>

      </section>

      <section className="teacherPortal-stats">

        <QuickCard
          icon={FaUserGraduate}
          value={students.length}
          label="My Students"
          onClick={() =>
            onNavigate("students")
          }
        />

        <QuickCard
          icon={FaGraduationCap}
          value={classes.length}
          label="My Classes"
          onClick={() =>
            onNavigate("students")
          }
        />

        <QuickCard
          icon={FaBell}
          value={totalUnread}
          label="New Notifications"
          onClick={() =>
            onNavigate(
              "notifications"
            )
          }
        />

        <QuickCard
          icon={FaComments}
          value={unreadMessages}
          label="Unread Messages"
          showAlert={
            unreadMessages > 0
          }
          onClick={() =>
            onNavigate("messages")
          }
        />

      </section>

      <div className="teacherPortal-sectionHeading">

        <span>
          QUICK ACCESS
        </span>

        <h2>
          Teacher Workspace
        </h2>

        <p>
          Access school information
          from one place.
        </p>

      </div>

      <section className="teacherPortal-accessGrid">

        {[
          [
            "attendance",
            "Attendance",
            "Student attendance",
            FaCalendarCheck,
          ],

          [
            "assignments",
            "Assignments",
            "Class assignments",
            FaClipboardList,
          ],

          [
            "results",
            "Results",
            "Student results",
            FaChartBar,
          ],

          [
            "fees",
            "Fees",
            "Fee records",
            FaMoneyBillWave,
          ],

          [
            "notices",
            "Notices",
            "School notices",
            FaBullhorn,
          ],

          [
            "news",
            "News",
            "Latest school news",
            FaNewspaper,
          ],

          [
            "events",
            "Events",
            "Upcoming events",
            FaCalendarAlt,
          ],

          [
            "messages",
            "Private Messages",
            unreadMessages > 0
              ? `${unreadMessages} unread message(s)`
              : "Student & parent chats",
            FaComments,
          ],
        ].map(
          ([
            id,
            label,
            description,
            Icon,
          ]) => (
            <button
              key={id}
              type="button"
              onClick={() =>
                onNavigate(id)
              }
            >
              <div>
                <Icon />
              </div>

              <section>
                <strong>
                  {label}
                </strong>

                <span>
                  {description}
                </span>
              </section>

              <FaChevronRight />
            </button>
          )
        )}

      </section>

    </div>
  );
};

/* =========================================================
   QUICK CARD
========================================================= */

const QuickCard = ({
  icon: Icon,
  value,
  label,
  onClick,
  showAlert = false,
}) => (
  <button
    type="button"
    className={`teacherPortal-stat ${
      showAlert
        ? "has-alert"
        : ""
    }`}
    onClick={onClick}
  >

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

    {showAlert && (
      <i className="teacherPortal-statAlert" />
    )}

  </button>
);

/* =========================================================
   SIDEBAR BUTTON
========================================================= */

const SidebarButton = ({
  icon: Icon,
  label,
  active,
  onClick,
  showDot = false,
  count = 0,
}) => (
  <button
    type="button"
    className={`teacherDashLight-navButton ${
      active ? "active" : ""
    }`}
    onClick={onClick}
  >

    <Icon />

    <span>
      {label}
    </span>

    {count > 0 ? (
      <b className="teacherDashLight-messageCount">
        {count > 99
          ? "99+"
          : count}
      </b>
    ) : (
      showDot && (
        <i className="teacherDashLight-notificationDot" />
      )
    )}

  </button>
);

export default TeacherDashboard;