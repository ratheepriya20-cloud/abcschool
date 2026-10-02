import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaClipboardList,
  FaBookOpen,
  FaChartBar,
  FaMoneyBillWave,
  FaBullhorn,
  FaCalendarAlt,
  FaUserShield,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaBell,
  FaSchool,
  FaGraduationCap,
  FaShieldAlt,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

import "./SubAdminDashboard.css";


/* =========================================================
   CRUD PAGES
========================================================= */

import StudentsAdmin from "../super-admin/StudentsAdmin";
import ParentsAdmin from "../super-admin/ParentsAdmin";
import TeachersAdmin from "../super-admin/TeachersAdmin";

import AttendanceAdmin from "../super-admin/AttendanceAdmin";
import AssignmentsAdmin from "../super-admin/AssignmentsAdmin";
import HomeworkAdmin from "../super-admin/HomeworkAdmin";

import ResultsAdmin from "../super-admin/ResultsAdmin";
import FeesAdmin from "../super-admin/FeesAdmin";

import NoticesAdmin from "../super-admin/NoticesAdmin";
import EventsAdmin from "../super-admin/EventsAdmin";


/* =========================================================
   DATA
========================================================= */

import {
  getStudents,
} from "../../../data/studentsData";

import {
  getParents,
} from "../../../data/parentsData";

import {
  getTeachers,
} from "../../../data/teachersData";

import {
  getAttendance,
} from "../../../data/attendanceData";

import {
  getAssignments,
} from "../../../data/assignmentsData";

import {
  getFees,
} from "../../../data/feesData";

import {
  getNotices,
} from "../../../data/noticesData";

import {
  getEvents,
} from "../../../data/eventsData";


/* =========================================================
   AUTH
========================================================= */

import {
  getSession,
  logoutUser,
} from "../../../data/authData";


/* =========================================================
   SAFE ARRAY
========================================================= */

const safeArray = (value) => {
  return Array.isArray(value)
    ? value
    : [];
};


/* =========================================================
   NOTICE UNIQUE KEY

   id available ho to id use hoga.
   id na ho to notice ki details se stable key banegi.
========================================================= */

const getNoticeKey = (
  notice,
  index = 0
) => {
  if (notice?.id) {
    return String(notice.id);
  }

  return [
    notice?.title || "notice",
    notice?.date || "no-date",
    notice?.category || "general",
    index,
  ].join("-");
};


/* =========================================================
   SUB ADMIN DASHBOARD
========================================================= */

const SubAdminDashboard = () => {
  const navigate = useNavigate();


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
     NOTIFICATION STATE
  ======================================================= */

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);


  const [
    readNoticeIds,
    setReadNoticeIds,
  ] = useState([]);


  /* =======================================================
     SESSION
  ======================================================= */

  const [
    admin,
    setAdmin,
  ] = useState(() => {
    try {
      return getSession?.() || null;
    } catch (error) {
      console.error(
        "Sub Admin session error:",
        error
      );

      return null;
    }
  });


  /* =======================================================
     DASHBOARD DATA
  ======================================================= */

  const [
    dashboard,
    setDashboard,
  ] = useState({
    students: [],
    parents: [],
    teachers: [],
    attendance: [],
    assignments: [],
    fees: [],
    notices: [],
    events: [],
  });


  /* =======================================================
     ADMIN DETAILS
  ======================================================= */

  const adminName =
    admin?.name ||
    admin?.fullName ||
    "Sub Admin";


  const adminDesignation =
    admin?.designation ||
    "Sub Administrator";


  const adminDepartment =
    admin?.department ||
    "Administration";


  const adminInitials =
    adminName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) =>
        word.charAt(0)
      )
      .join("")
      .toUpperCase() || "SA";


  /* =======================================================
     NOTIFICATION STORAGE KEY

     Har Sub Admin ka read status alag rahega.
  ======================================================= */

  const notificationStorageKey =
    useMemo(() => {
      const adminKey =
        admin?.id ||
        admin?.email ||
        admin?.name ||
        "sub-admin";

      return `abpsSubAdminReadNotices_${adminKey}`;
    }, [
      admin?.id,
      admin?.email,
      admin?.name,
    ]);


  /* =======================================================
     LOAD READ NOTIFICATION IDS
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          notificationStorageKey
        );

      if (!saved) {
        setReadNoticeIds([]);
        return;
      }

      const parsed =
        JSON.parse(saved);

      setReadNoticeIds(
        Array.isArray(parsed)
          ? parsed
          : []
      );
    } catch (error) {
      console.error(
        "Read notification load error:",
        error
      );

      setReadNoticeIds([]);
    }
  }, [notificationStorageKey]);


  /* =======================================================
     LOAD DASHBOARD
  ======================================================= */

  const loadDashboard =
    useCallback(() => {
      try {
        setDashboard({
          students:
            safeArray(
              getStudents?.()
            ),

          parents:
            safeArray(
              getParents?.()
            ),

          teachers:
            safeArray(
              getTeachers?.()
            ),

          attendance:
            safeArray(
              getAttendance?.()
            ),

          assignments:
            safeArray(
              getAssignments?.()
            ),

          fees:
            safeArray(
              getFees?.()
            ),

          notices:
            safeArray(
              getNotices?.()
            ),

          events:
            safeArray(
              getEvents?.()
            ),
        });
      } catch (error) {
        console.error(
          "Sub Admin dashboard load error:",
          error
        );
      }
    }, []);


  /* =======================================================
     LIVE AUTO SYNC
  ======================================================= */

  useEffect(() => {
    loadDashboard();


    const handleDataUpdated = () => {
      loadDashboard();
    };


    const handleStorage = () => {
      loadDashboard();

      try {
        setAdmin(
          getSession?.() || null
        );
      } catch (error) {
        console.error(
          "Session storage update error:",
          error
        );
      }
    };


    const handleSessionUpdated = () => {
      try {
        setAdmin(
          getSession?.() || null
        );
      } catch (error) {
        console.error(
          "Session update error:",
          error
        );
      }
    };


    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdated
    );


    window.addEventListener(
      "storage",
      handleStorage
    );


    window.addEventListener(
      "abpsSessionUpdated",
      handleSessionUpdated
    );


    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        handleDataUpdated
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );

      window.removeEventListener(
        "abpsSessionUpdated",
        handleSessionUpdated
      );
    };
  }, [loadDashboard]);


  /* =======================================================
     SAVE READ IDS
  ======================================================= */

  const saveReadNoticeIds = (
    ids
  ) => {
    try {
      localStorage.setItem(
        notificationStorageKey,
        JSON.stringify(ids)
      );
    } catch (error) {
      console.error(
        "Notification read save error:",
        error
      );
    }
  };


  /* =======================================================
     MARK SINGLE NOTICE READ
  ======================================================= */

  const markNoticeRead = (
    notice,
    index
  ) => {
    const noticeKey =
      getNoticeKey(
        notice,
        index
      );

    setReadNoticeIds(
      (current) => {
        if (
          current.includes(
            noticeKey
          )
        ) {
          return current;
        }

        const updated = [
          ...current,
          noticeKey,
        ];

        saveReadNoticeIds(
          updated
        );

        return updated;
      }
    );
  };


  /* =======================================================
     MARK ALL NOTICES READ
  ======================================================= */

  const markAllNoticesRead = () => {
    const allIds =
      dashboard.notices.map(
        (notice, index) =>
          getNoticeKey(
            notice,
            index
          )
      );

    setReadNoticeIds(
      allIds
    );

    saveReadNoticeIds(
      allIds
    );
  };


  /* =======================================================
     UNREAD NOTICES
  ======================================================= */

  const unreadNotices =
    useMemo(() => {
      return dashboard.notices.filter(
        (notice, index) => {
          const noticeKey =
            getNoticeKey(
              notice,
              index
            );

          return !readNoticeIds.includes(
            noticeKey
          );
        }
      );
    }, [
      dashboard.notices,
      readNoticeIds,
    ]);


  const unreadNoticeCount =
    unreadNotices.length;


  /* =======================================================
     SUB ADMIN ACCESS
  ======================================================= */

  const allowedModules = [
    "overview",

    "students",
    "parents",
    "teachers",

    "attendance",
    "assignments",
    "homework",
    "results",
    "fees",

    "notices",
    "events",
  ];


  const hasAccess = (
    page
  ) => {
    return allowedModules.includes(
      page
    );
  };


  /* =======================================================
     SIDEBAR MENU
  ======================================================= */

  const menuGroups =
    useMemo(
      () => [
        {
          title: "Dashboard",

          items: [
            {
              id: "overview",
              label: "Overview",
              icon: FaHome,
            },
          ],
        },

        {
          title:
            "School Management",

          items: [
            {
              id: "students",
              label: "Students",
              icon: FaUserGraduate,
            },

            {
              id: "parents",
              label: "Parents",
              icon: FaUsers,
            },

            {
              id: "teachers",
              label: "Teachers",
              icon:
                FaChalkboardTeacher,
            },
          ],
        },

        {
          title: "Academics",

          items: [
            {
              id: "attendance",
              label: "Attendance",
              icon:
                FaCalendarCheck,
            },

            {
              id: "assignments",
              label: "Assignments",
              icon:
                FaClipboardList,
            },

            {
              id: "homework",
              label: "Homework",
              icon: FaBookOpen,
            },

            {
              id: "results",
              label: "Results",
              icon: FaChartBar,
            },

            {
              id: "fees",
              label: "Fees",
              icon:
                FaMoneyBillWave,
            },
          ],
        },

        {
          title:
            "Communication",

          items: [
            {
              id: "notices",
              label: "Notices",
              icon: FaBullhorn,
            },

            {
              id: "events",
              label: "Events",
              icon:
                FaCalendarAlt,
            },
          ],
        },
      ],
      []
    );


  /* =======================================================
     CHANGE PAGE
  ======================================================= */

  const changePage = (
    page
  ) => {
    setNotificationOpen(
      false
    );

    if (!hasAccess(page)) {
      setActivePage(
        "accessDenied"
      );

      setSidebarOpen(
        false
      );

      return;
    }

    setActivePage(page);

    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =======================================================
     OPEN NOTICE FROM NOTIFICATION
  ======================================================= */

  const openNotice = (
    notice,
    index
  ) => {
    markNoticeRead(
      notice,
      index
    );

    setNotificationOpen(
      false
    );

    changePage("notices");
  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    try {
      logoutUser?.();
    } catch (error) {
      console.error(
        "Sub Admin logout error:",
        error
      );
    }

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };


  /* =======================================================
     CALCULATIONS
  ======================================================= */

  const activeStudents =
    dashboard.students.filter(
      (student) =>
        String(
          student?.status ||
            "Active"
        ).toLowerCase() !==
        "inactive"
    );


  const activeTeachers =
    dashboard.teachers.filter(
      (teacher) =>
        String(
          teacher?.status ||
            "Active"
        ).toLowerCase() !==
        "inactive"
    );


  const pendingFees =
    dashboard.fees.filter(
      (fee) => {
        const status =
          String(
            fee?.status || ""
          ).toLowerCase();

        return (
          status ===
            "pending" ||
          status ===
            "overdue"
        );
      }
    );


  /* =======================================================
     STAT CARDS
  ======================================================= */

  const stats = [
    {
      title:
        "Total Students",
      value:
        dashboard.students.length,
      icon: FaUserGraduate,
      page: "students",
      theme: "blue",
    },

    {
      title:
        "Total Teachers",
      value:
        dashboard.teachers.length,
      icon:
        FaChalkboardTeacher,
      page: "teachers",
      theme: "purple",
    },

    {
      title:
        "Total Parents",
      value:
        dashboard.parents.length,
      icon: FaUsers,
      page: "parents",
      theme: "cyan",
    },

    {
      title: "Attendance",
      value:
        dashboard.attendance
          .length,
      icon:
        FaCalendarCheck,
      page: "attendance",
      theme: "green",
    },

    {
      title: "Assignments",
      value:
        dashboard.assignments
          .length,
      icon:
        FaClipboardList,
      page: "assignments",
      theme: "orange",
    },

    {
      title:
        "Pending Fees",
      value:
        pendingFees.length,
      icon:
        FaMoneyBillWave,
      page: "fees",
      theme: "red",
    },

    {
      title: "Notices",
      value:
        dashboard.notices.length,
      icon: FaBullhorn,
      page: "notices",
      theme: "gold",
    },

    {
      title: "Events",
      value:
        dashboard.events.length,
      icon:
        FaCalendarAlt,
      page: "events",
      theme: "violet",
    },
  ];


  /* =======================================================
     OVERVIEW
  ======================================================= */

  const renderOverview = () => {
    return (
      <div className="sub-overview">

        {/* WELCOME */}

        <section className="sub-welcome-card">

          <div className="sub-welcome-left">

            <span className="sub-small-label">
              SUB ADMIN PORTAL
            </span>

            <h1>
              Welcome,{" "}
              <span>
                {adminName}
              </span>
            </h1>

            <p>
              Manage school students,
              parents, teachers,
              attendance, assignments,
              homework, results, fees,
              notices and events from one
              dashboard. All changes are
              connected with the same data
              used by Super Admin.
            </p>

            <div className="sub-hero-points">

              <span>
                <FaGraduationCap />
                School Management
              </span>

              <span>
                <FaShieldAlt />
                Secure Sub Admin
              </span>

              <span>
                <FaCheckCircle />
                Shared Live Data
              </span>

            </div>

          </div>


          <div className="sub-welcome-school">

            <div className="sub-school-icon">
              <FaSchool />
            </div>

            <div>

              <small>
                AB PUBLIC SCHOOL
              </small>

              <strong>
                Educate. Empower. Excel.
              </strong>

              <span>
                Sub Administrator Portal
              </span>

            </div>

          </div>

        </section>


        {/* STATS */}

        <section className="sub-stats-grid">

          {stats.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <button
                  type="button"
                  key={item.title}
                  className={`sub-stat-card sub-stat-${item.theme}`}
                  onClick={() =>
                    changePage(
                      item.page
                    )
                  }
                >

                  <div className="sub-stat-top">

                    <div className="sub-stat-icon">
                      <Icon />
                    </div>

                    <div className="sub-stat-arrow">
                      <FaChevronRight />
                    </div>

                  </div>

                  <strong>
                    {item.value}
                  </strong>

                  <span>
                    {item.title}
                  </span>

                  <small>
                    Manage complete records
                  </small>

                </button>
              );
            }
          )}

        </section>


        {/* DASHBOARD GRID */}

        <section className="sub-dashboard-grid">

          {/* STUDENTS */}

          <div className="sub-panel sub-students-panel">

            <PanelHeading
              label="SCHOOL MANAGEMENT"
              title="Recent Students"
              onClick={() =>
                changePage(
                  "students"
                )
              }
            />

            <div className="sub-table-wrap">

              {dashboard.students
                .length > 0 ? (

                <table>

                  <thead>
                    <tr>
                      <th>
                        Student
                      </th>

                      <th>
                        Admission No.
                      </th>

                      <th>
                        Class
                      </th>

                      <th>
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {dashboard.students
                      .slice(0, 5)
                      .map(
                        (
                          student,
                          index
                        ) => (

                          <tr
                            key={
                              student?.id ||
                              student
                                ?.admissionNo ||
                              index
                            }
                          >

                            <td>

                              <div className="sub-student">

                                <div className="sub-student-avatar">
                                  {student
                                    ?.name
                                    ?.charAt(
                                      0
                                    )
                                    ?.toUpperCase() ||
                                    "S"}
                                </div>

                                <div>

                                  <strong>
                                    {student
                                      ?.name ||
                                      "Student"}
                                  </strong>

                                  <small>
                                    Roll No.{" "}
                                    {student
                                      ?.rollNo ||
                                      "—"}
                                  </small>

                                </div>

                              </div>

                            </td>

                            <td>
                              {student
                                ?.admissionNo ||
                                "—"}
                            </td>

                            <td>

                              {student
                                ?.className ||
                                "—"}

                              {student
                                ?.section
                                ? ` - ${student.section}`
                                : ""}

                            </td>

                            <td>

                              <Status
                                value={
                                  student
                                    ?.status ||
                                  "Active"
                                }
                              />

                            </td>

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              ) : (

                <Empty
                  Icon={
                    FaUserGraduate
                  }
                  text="No students available."
                />

              )}

            </div>

          </div>


          {/* ATTENDANCE */}

          <div className="sub-panel">

            <PanelHeading
              label="ACADEMIC MANAGEMENT"
              title="Attendance Summary"
              onClick={() =>
                changePage(
                  "attendance"
                )
              }
            />

            <div className="sub-attendance-area">

              <div className="sub-attendance-main">

                <div className="sub-attendance-circle">

                  <FaCalendarCheck />

                  <strong>
                    {
                      dashboard
                        .attendance
                        .length
                    }
                  </strong>

                  <span>
                    Records
                  </span>

                </div>

              </div>


              <div className="sub-summary-list">

                <SummaryRow
                  label="Active Students"
                  value={
                    activeStudents
                      .length
                  }
                />

                <SummaryRow
                  label="Active Teachers"
                  value={
                    activeTeachers
                      .length
                  }
                />

                <SummaryRow
                  label="Attendance Records"
                  value={
                    dashboard
                      .attendance
                      .length
                  }
                />

                <button
                  type="button"
                  className="sub-summary-button"
                  onClick={() =>
                    changePage(
                      "attendance"
                    )
                  }
                >
                  Manage Attendance

                  <FaChevronRight />
                </button>

              </div>

            </div>

          </div>


          {/* NOTICES */}

          <div className="sub-panel">

            <PanelHeading
              label="COMMUNICATION"
              title="Recent Notices"
              onClick={() =>
                changePage(
                  "notices"
                )
              }
            />

            <div className="sub-simple-list">

              {dashboard.notices
                .length > 0 ? (

                dashboard.notices
                  .slice(0, 5)
                  .map(
                    (
                      notice,
                      index
                    ) => (

                      <div
                        className="sub-simple-item"
                        key={
                          notice?.id ||
                          index
                        }
                      >

                        <div className="sub-list-icon notice">
                          <FaBullhorn />
                        </div>

                        <div className="sub-list-content">

                          <strong>
                            {notice
                              ?.title ||
                              "School Notice"}
                          </strong>

                          <span>
                            {notice
                              ?.category ||
                              "General"}
                          </span>

                        </div>

                        <small>
                          {notice
                            ?.date ||
                            "—"}
                        </small>

                      </div>

                    )
                  )

              ) : (

                <Empty
                  Icon={FaBullhorn}
                  text="No notices available."
                />

              )}

            </div>

          </div>


          {/* EVENTS */}

          <div className="sub-panel">

            <PanelHeading
              label="SCHOOL CALENDAR"
              title="Upcoming Events"
              onClick={() =>
                changePage(
                  "events"
                )
              }
            />

            <div className="sub-simple-list">

              {dashboard.events
                .length > 0 ? (

                dashboard.events
                  .slice(0, 5)
                  .map(
                    (
                      event,
                      index
                    ) => (

                      <div
                        className="sub-simple-item"
                        key={
                          event?.id ||
                          index
                        }
                      >

                        <div className="sub-list-icon event">
                          <FaCalendarAlt />
                        </div>

                        <div className="sub-list-content">

                          <strong>
                            {event
                              ?.title ||
                              "School Event"}
                          </strong>

                          <span>
                            {event
                              ?.location ||
                              "School Campus"}
                          </span>

                        </div>

                        <small>
                          {event
                            ?.date ||
                            "—"}
                        </small>

                      </div>

                    )
                  )

              ) : (

                <Empty
                  Icon={
                    FaCalendarAlt
                  }
                  text="No events available."
                />

              )}

            </div>

          </div>

        </section>


        {/* ACCESS */}

        <section className="sub-permissions-panel">

          <div className="sub-permission-heading">

            <div>

              <span>
                SUB ADMIN ACCESS
              </span>

              <h2>
                Management Access
              </h2>

              <p>
                You can manage school
                records just like Super
                Admin. Inquiry and Contact
                Messages are not available
                in this portal.
              </p>

            </div>


            <div className="sub-permission-lock">
              <FaUserShield />
            </div>

          </div>


          <div className="sub-permission-grid">

            {[
              "Students",
              "Parents",
              "Teachers",
              "Attendance",
              "Assignments",
              "Homework",
              "Results",
              "Fees",
              "Notices",
              "Events",
            ].map(
              (module) => (

                <div
                  key={module}
                  className="sub-permission-item allowed"
                >

                  <div className="sub-permission-icon">
                    <FaCheckCircle />
                  </div>

                  <div>

                    <span>
                      {module}
                    </span>

                    <strong>
                      Add / Edit / Delete
                    </strong>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

      </div>
    );
  };


  /* =======================================================
     CONTENT
  ======================================================= */

  const renderContent = () => {
    switch (activePage) {
      case "overview":
        return renderOverview();

      case "students":
        return <StudentsAdmin />;

      case "parents":
        return <ParentsAdmin />;

      case "teachers":
        return <TeachersAdmin />;

      case "attendance":
        return <AttendanceAdmin />;

      case "assignments":
        return <AssignmentsAdmin />;

      case "homework":
        return <HomeworkAdmin />;

      case "results":
        return <ResultsAdmin />;

      case "fees":
        return <FeesAdmin />;

      case "notices":
        return <NoticesAdmin />;

      case "events":
        return <EventsAdmin />;

      case "accessDenied":
        return <AccessDenied />;

      default:
        return renderOverview();
    }
  };


  /* =======================================================
     CURRENT PAGE TITLE
  ======================================================= */

  const getCurrentPageTitle =
    () => {
      for (
        const group
        of menuGroups
      ) {
        const found =
          group.items.find(
            (item) =>
              item.id ===
              activePage
          );

        if (found) {
          return found.label;
        }
      }

      return "Overview";
    };


  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="sub-dashboard">

      {/* MOBILE SIDEBAR OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="sub-overlay"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}


      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`sub-sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        {/* BRAND */}

        <div className="sub-brand">

          <div className="sub-logo">
            <FaGraduationCap />
          </div>

          <div className="sub-brand-text">

            <strong>
              AB PUBLIC SCHOOL
            </strong>

            <span>
              Sub Admin Portal
            </span>

          </div>

          <button
            type="button"
            className="sub-close"
            aria-label="Close menu"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes />
          </button>

        </div>


        {/* PROFILE */}

        <div className="sub-profile">

          <div className="sub-avatar">
            {adminInitials}
          </div>

          <div className="sub-profile-info">

            <strong>
              {adminName}
            </strong>

            <span>
              {adminDesignation}
            </span>

            <small>
              {adminDepartment}
            </small>

          </div>

        </div>


        {/* NAV */}

        <nav className="sub-nav">

          {menuGroups.map(
            (group) => (

              <div
                className="sub-nav-group"
                key={group.title}
              >

                <p>
                  {group.title}
                </p>

                {group.items.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={
                          activePage ===
                          item.id
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          changePage(
                            item.id
                          )
                        }
                      >

                        <span className="sub-menu-icon">
                          <Icon />
                        </span>

                        <span className="sub-menu-label">
                          {item.label}
                        </span>

                        <FaChevronRight className="sub-arrow" />

                      </button>
                    );
                  }
                )}

              </div>

            )
          )}

        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="sub-sidebar-bottom">

          <div className="sub-security">

            <div className="sub-security-icon">
              <FaUserShield />
            </div>

            <div>

              <strong>
                Secure Access
              </strong>

              <span>
                Inquiry & messages
                restricted
              </span>

            </div>

          </div>


          <button
            type="button"
            className="sub-logout"
            onClick={
              handleLogout
            }
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>


      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="sub-main">

        {/* TOPBAR */}

        <header className="sub-topbar">

          <div className="sub-top-left">

            <button
              type="button"
              className="sub-toggle"
              aria-label="Open menu"
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
            >
              <FaBars />
            </button>


            <div className="sub-top-title">

              <span>
                SUB ADMIN DASHBOARD
              </span>

              <strong>
                {getCurrentPageTitle()}
              </strong>

            </div>

          </div>


          <div className="sub-top-right">

            {/* EVENTS */}

            <button
              type="button"
              className="sub-top-icon"
              aria-label="Events"
              onClick={() =>
                changePage(
                  "events"
                )
              }
            >
              <FaCalendarAlt />
            </button>


            {/* =============================================
                NOTIFICATION
            ============================================= */}

            <div className="sub-notification-wrap">

              <button
                type="button"
                className={`sub-bell ${
                  notificationOpen
                    ? "active"
                    : ""
                }`}
                aria-label="Notifications"
                aria-expanded={
                  notificationOpen
                }
                onClick={() =>
                  setNotificationOpen(
                    (prev) =>
                      !prev
                  )
                }
              >

                <FaBell />

                {/* Only unread count */}

                {unreadNoticeCount >
                  0 && (

                  <span className="sub-bell-count">
                    {unreadNoticeCount >
                    9
                      ? "9+"
                      : unreadNoticeCount}
                  </span>

                )}

              </button>


              {/* OUTSIDE CLICK */}

              {notificationOpen && (

                <button
                  type="button"
                  className="sub-notification-backdrop"
                  aria-label="Close notifications"
                  onClick={() =>
                    setNotificationOpen(
                      false
                    )
                  }
                />

              )}


              {/* DROPDOWN */}

              {notificationOpen && (

                <div className="sub-notification-panel">

                  {/* HEADER */}

                  <div className="sub-notification-header">

                    <div>

                      <span>
                        NOTIFICATIONS
                      </span>

                      <h3>
                        School Updates
                      </h3>

                      <p>
                        {unreadNoticeCount >
                        0
                          ? `${unreadNoticeCount} unread notification${
                              unreadNoticeCount >
                              1
                                ? "s"
                                : ""
                            }`
                          : "You're all caught up"}
                      </p>

                    </div>


                    <div className="sub-notification-total">
                      {
                        unreadNoticeCount
                      }
                    </div>

                  </div>


                  {/* MARK ALL */}

                  {unreadNoticeCount >
                    0 && (

                    <div className="sub-notification-tools">

                      <span>
                        New school notices
                      </span>

                      <button
                        type="button"
                        onClick={
                          markAllNoticesRead
                        }
                      >
                        <FaCheckCircle />

                        Mark all read
                      </button>

                    </div>

                  )}


                  {/* LIST */}

                  <div className="sub-notification-list">

                    {dashboard.notices
                      .length > 0 ? (

                      dashboard.notices
                        .slice(0, 7)
                        .map(
                          (
                            notice,
                            index
                          ) => {
                            const noticeKey =
                              getNoticeKey(
                                notice,
                                index
                              );

                            const isRead =
                              readNoticeIds.includes(
                                noticeKey
                              );

                            return (

                              <button
                                type="button"
                                key={
                                  noticeKey
                                }
                                className={`sub-notification-item ${
                                  isRead
                                    ? "read"
                                    : "unread"
                                }`}
                                onClick={() =>
                                  openNotice(
                                    notice,
                                    index
                                  )
                                }
                              >

                                <div className="sub-notification-icon">
                                  <FaBullhorn />
                                </div>


                                <div className="sub-notification-content">

                                  <div className="sub-notification-title-row">

                                    <strong>
                                      {notice
                                        ?.title ||
                                        "School Notice"}
                                    </strong>

                                    {!isRead && (
                                      <span className="sub-notification-dot" />
                                    )}

                                  </div>


                                  <p>
                                    {notice
                                      ?.description ||
                                      notice
                                        ?.fullNotice ||
                                      `A new ${
                                        notice
                                          ?.category ||
                                        "school"
                                      } notice is available.`}
                                  </p>


                                  <div className="sub-notification-meta">

                                    <span>
                                      {notice
                                        ?.category ||
                                        "General"}
                                    </span>

                                    <small>
                                      {notice
                                        ?.date ||
                                        "Recently"}
                                    </small>

                                  </div>

                                </div>

                              </button>

                            );
                          }
                        )

                    ) : (

                      <div className="sub-notification-empty">

                        <div>
                          <FaBell />
                        </div>

                        <strong>
                          No Notifications
                        </strong>

                        <p>
                          New school notices
                          will appear here.
                        </p>

                      </div>

                    )}

                  </div>


                  {/* FOOTER */}

                  {dashboard.notices
                    .length > 0 && (

                    <button
                      type="button"
                      className="sub-notification-view-all"
                      onClick={() => {
                        setNotificationOpen(
                          false
                        );

                        changePage(
                          "notices"
                        );
                      }}
                    >
                      View All Notices

                      <FaChevronRight />
                    </button>

                  )}

                </div>

              )}

            </div>


            {/* USER */}

            <div className="sub-top-user">

              <div className="sub-top-avatar">
                {adminInitials}
              </div>

              <section>

                <strong>
                  {adminName}
                </strong>

                <small>
                  {adminDepartment}
                </small>

              </section>

            </div>

          </div>

        </header>


        {/* PAGE */}

        <main className="sub-content">
          {renderContent()}
        </main>

      </div>

    </div>
  );
};


/* =========================================================
   PANEL HEADING
========================================================= */

const PanelHeading = ({
  label,
  title,
  onClick,
}) => {
  return (
    <div className="sub-panel-heading">

      <div>

        <span>
          {label}
        </span>

        <h2>
          {title}
        </h2>

      </div>

      {onClick && (

        <button
          type="button"
          onClick={onClick}
        >
          Manage

          <FaChevronRight />
        </button>

      )}

    </div>
  );
};


/* =========================================================
   STATUS
========================================================= */

const Status = ({
  value,
}) => {
  const statusClass =
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(
        /\s+/g,
        "-"
      );

  return (
    <span
      className={`sub-status sub-status-${statusClass}`}
    >
      {value}
    </span>
  );
};


/* =========================================================
   SUMMARY
========================================================= */

const SummaryRow = ({
  label,
  value,
}) => {
  return (
    <div className="sub-summary-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
};


/* =========================================================
   EMPTY
========================================================= */

const Empty = ({
  Icon,
  text,
}) => {
  return (
    <div className="sub-empty">

      {Icon && <Icon />}

      <span>
        {text}
      </span>

    </div>
  );
};


/* =========================================================
   ACCESS DENIED
========================================================= */

const AccessDenied = () => {
  return (
    <div className="sub-access-denied">

      <div className="sub-denied-icon">
        <FaLock />
      </div>

      <span>
        RESTRICTED MODULE
      </span>

      <h1>
        Access Denied
      </h1>

      <p>
        Inquiry, Contact Messages and
        Sub Admin Management are not
        available in the Sub Admin
        portal.
      </p>

    </div>
  );
};


export default SubAdminDashboard;