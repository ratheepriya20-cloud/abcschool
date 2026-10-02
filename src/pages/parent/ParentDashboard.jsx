import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaChevronRight,
  FaBell,
  FaShieldAlt,
  FaArrowLeft,
  FaHeadset,
  FaUserGraduate,
  FaComments,
  FaNewspaper,
} from "react-icons/fa";

import "./ParentDashboard.css";

/* =========================================================
   PARENT PAGES
========================================================= */

import ParentOverview from "./ParentOverview";
import ParentAttendance from "./ParentAttendance";
import ParentFees from "./ParentFees";
import ParentResults from "./ParentResults";
import ParentAssignments from "./ParentAssignments";
import ParentNotices from "./ParentNotices";
import ParentEvents from "./ParentEvents";
import ParentProfile from "./ParentProfile";

import ParentTeacherChat from "./ParentTeacherChat";
import ParentNews from "./ParentNews";

/* =========================================================
   AUTH
========================================================= */

import {
  getLoggedInParent,
  getLoggedInParentStudent,
  logoutParent,
} from "../../data/parentAuthData";

/* =========================================================
   SCHOOL DATA
========================================================= */

import { getAttendance } from "../../data/attendanceData";
import { getFees } from "../../data/feesData";
import { getResults } from "../../data/resultsData";
import { getAssignments } from "../../data/assignmentsData";
import { getNotices } from "../../data/noticesData";
import { getEvents } from "../../data/eventsData";
import { getTeachers } from "../../data/teachersData";
import { getPublishedNews } from "../../data/newsData";

/* =========================================================
   CHAT
========================================================= */

import {
  getChatsForParent,
  getUnreadTeacherChatCount,
  SENDER_TYPES,
} from "../../data/teacherChatData";

/* =========================================================
   NOTIFICATIONS
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
  markAllPortalNotificationsRead,
} from "../../data/portalNotificationsData";

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

    
const ParentNotificationsView = ({
  notifications = [],
  unreadNotifications = [],
  parentId,
  onNotificationClick,
  onReadAll,
  onOpenMessages,
  unreadChatCount = 0,
}) => {
  const unreadIds = useMemo(
    () =>
      new Set(
        unreadNotifications.map(
          (item) => String(item.id)
        )
      ),
    [unreadNotifications]
  );

  const hasPortalNotifications =
    notifications.length > 0;

  const hasUnreadMessages =
    unreadChatCount > 0;

  const hasAnyUpdate =
    hasPortalNotifications ||
    hasUnreadMessages;

  return (
    <div className="parentNotification-page">

      {/* =========================
          HERO
      ========================= */}

      <div className="parentNotification-hero">

        <div className="parentNotification-heroText">

          <span className="parentNotification-label">
            PARENT PORTAL
          </span>

          <h2>
            Notifications
          </h2>

          <p>
            Important school updates, announcements
            and teacher messages related to your child
            will appear here.
          </p>

        </div>


        <div className="parentNotification-actions">

          {hasUnreadMessages && (
            <button
              type="button"
              onClick={onOpenMessages}
              className="parentNotification-messageBtn"
            >
              <FaComments />

              <span className="parentNotification-messageText">
                Messages
              </span>

              <strong>
                {unreadChatCount}
              </strong>
            </button>
          )}


          {unreadNotifications.length > 0 && (
            <button
              type="button"
              onClick={onReadAll}
              className="parentNotification-readAll"
            >
              Mark All Read
            </button>
          )}

        </div>

      </div>


      {/* =========================
          SUMMARY
      ========================= */}

      <div className="parentNotification-summary">

        <div className="parentNotification-summaryCard">

          <span className="parentNotification-summaryIcon">
            <FaBell />
          </span>

          <div>
            <small>
              SCHOOL UPDATES
            </small>

            <strong>
              {unreadNotifications.length}
            </strong>

            <p>
              Unread portal notifications
            </p>
          </div>

        </div>


        <button
          type="button"
          className="parentNotification-summaryCard parentNotification-summaryMessage"
          onClick={onOpenMessages}
        >

          <span className="parentNotification-summaryIcon">
            <FaComments />
          </span>

          <div>
            <small>
              TEACHER MESSAGES
            </small>

            <strong>
              {unreadChatCount}
            </strong>

            <p>
              Unread private messages
            </p>
          </div>

          <FaChevronRight className="parentNotification-summaryArrow" />

        </button>

      </div>


      {/* =========================
          TITLE
      ========================= */}

      <div className="parentNotification-listHeading">

        <div>
          <span>
            RECENT ACTIVITY
          </span>

          <h3>
            Your Notifications
          </h3>

          <p>
            Select an update to open its related
            section.
          </p>
        </div>


        <strong>
          {notifications.length + unreadChatCount}
          {" "}
          {notifications.length + unreadChatCount === 1
            ? "Update"
            : "Updates"}
        </strong>

      </div>


      {/* =========================
          EMPTY
      ========================= */}

      {!hasAnyUpdate ? (

        <div className="parentNotification-empty">

          <span>
            <FaBell />
          </span>

          <h3>
            You're All Caught Up
          </h3>

          <p>
            There are no new notifications or
            unread messages for your account
            right now.
          </p>

        </div>

      ) : (

        <div className="parentNotification-list">

          {/* =========================
              MESSAGE CARD
          ========================= */}

          {hasUnreadMessages && (

            <button
              type="button"
              className="parentNotification-card unread parentNotification-chatCard"
              onClick={onOpenMessages}
            >

              <div className="parentNotification-icon chat">
                <FaComments />
              </div>


              <div className="parentNotification-content">

                <div className="parentNotification-top">

                  <h3>
                    New Teacher Message
                  </h3>

                  <span className="parentNotification-new">
                    New
                  </span>

                </div>


                <p>
                  You have{" "}
                  <strong>
                    {unreadChatCount}
                  </strong>{" "}
                  unread{" "}
                  {unreadChatCount === 1
                    ? "message"
                    : "messages"}{" "}
                  from your child's teacher.
                </p>


                <div className="parentNotification-meta">

                  <span>
                    Messages
                  </span>

                  <small>
                    Open conversation
                  </small>

                </div>

              </div>


              <FaChevronRight className="parentNotification-arrow" />

            </button>

          )}


          {/* =========================
              PORTAL NOTIFICATIONS
          ========================= */}

          {notifications.map(
            (notification) => {

              const unread =
                unreadIds.has(
                  String(notification.id)
                );

              return (
                <button
                  key={notification.id}
                  type="button"
                  className={`parentNotification-card ${
                    unread
                      ? "unread"
                      : ""
                  }`}
                  onClick={() =>
                    onNotificationClick(
                      notification
                    )
                  }
                >

                  <div className="parentNotification-icon">
                    <FaBell />
                  </div>


                  <div className="parentNotification-content">

                    <div className="parentNotification-top">

                      <h3>
                        {notification.title ||
                          "School Update"}
                      </h3>

                      {unread && (
                        <span className="parentNotification-new">
                          New
                        </span>
                      )}

                    </div>


                    <p>
                      {notification.message ||
                        "A new school update is available."}
                    </p>


                    <div className="parentNotification-meta">

                      <span>
                        {notification.section ||
                          "General"}
                      </span>

                      {notification.createdAt && (
                        <small>
                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </small>
                      )}

                    </div>

                  </div>


                  <FaChevronRight className="parentNotification-arrow" />

                </button>
              );
            }
          )}

        </div>

      )}

    </div>
  );
};
/* =========================================================
   PARENT DASHBOARD
========================================================= */

const ParentDashboard = () => {
  const navigate = useNavigate();

  /* =======================================================
     AUTH DATA

     NO HARDCODED AARAV / RAHUL
  ======================================================= */

  const [parent, setParent] =
    useState(() => {
      try {
        return getLoggedInParent?.() || null;
      } catch {
        return null;
      }
    });

  const [student, setStudent] =
    useState(() => {
      try {
        return (
          getLoggedInParentStudent?.() ||
          null
        );
      } catch {
        return null;
      }
    });

  /* =======================================================
     UI
  ======================================================= */

  const [activePage, setActivePage] =
    useState("overview");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [
    refreshVersion,
    setRefreshVersion,
  ] = useState(0);

  /* =======================================================
     SCHOOL DATA
  ======================================================= */

  const [schoolData, setSchoolData] =
    useState({
      attendance: [],
      fees: [],
      results: [],
      assignments: [],
      notices: [],
      events: [],
      teachers: [],
      news: [],
      chats: [],
    });

  /* =======================================================
     IDS
  ======================================================= */

  const parentId =
    parent?.id ||
    parent?.parentId ||
    "";

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
     LOAD REAL DATA
  ======================================================= */

  const loadSchoolData =
    useCallback(() => {
      try {
        const currentParent =
          getLoggedInParent?.();

        const currentStudent =
          getLoggedInParentStudent?.();

        if (
          !currentParent ||
          !currentStudent
        ) {
          navigate(
            "/parent/login",
            {
              replace: true,
            }
          );

          return;
        }

        setParent(currentParent);
        setStudent(currentStudent);

        const currentParentId =
          currentParent?.id ||
          currentParent?.parentId ||
          "";

        setSchoolData({
          attendance:
            getAttendance?.() || [],

          fees:
            getFees?.() || [],

          results:
            getResults?.() || [],

          assignments:
            getAssignments?.() || [],

          notices:
            getNotices?.() || [],

          events:
            getEvents?.() || [],

          teachers:
            getTeachers?.() || [],

          news:
            getPublishedNews?.() || [],

          chats:
            currentParentId
              ? getChatsForParent(
                  currentParentId
                ) || []
              : [],
        });

        setRefreshVersion(
          (value) => value + 1
        );
      } catch (error) {
        console.error(
          "Parent dashboard data error:",
          error
        );
      }
    }, [navigate]);

  /* =======================================================
     LIVE REFRESH
  ======================================================= */

  useEffect(() => {
    loadSchoolData();

    const handleDataUpdate = () => {
      loadSchoolData();
    };

    const handleNotificationUpdate =
      () => {
        setRefreshVersion(
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
        "abpsTeacherChatUpdated",
        handleNotificationUpdate
      );

      window.removeEventListener(
        PORTAL_NOTIFICATION_EVENT,
        handleNotificationUpdate
      );
    };
  }, [loadSchoolData]);

  /* =======================================================
     STRICT CHILD FILTER

     Personal record me studentId missing hai
     to Parent ko record nahi dikhega.
  ======================================================= */

  const belongsToMyChild =
    useCallback(
      (item) => {
        if (!studentId) {
          return false;
        }

        const recordStudentId =
          item?.studentId ||
          item?.student?.studentId ||
          item?.student?.id ||
          "";

        if (!recordStudentId) {
          return false;
        }

        return (
          normalize(recordStudentId) ===
          normalize(studentId)
        );
      },
      [studentId]
    );

  /* =======================================================
     CHILD ATTENDANCE
  ======================================================= */

  const myAttendance =
    useMemo(
      () =>
        (
          schoolData.attendance ||
          []
        ).filter(
          belongsToMyChild
        ),
      [
        schoolData.attendance,
        belongsToMyChild,
      ]
    );

  /* =======================================================
     CHILD RESULTS
  ======================================================= */

  const myResults =
    useMemo(
      () =>
        (
          schoolData.results ||
          []
        ).filter(
          belongsToMyChild
        ),
      [
        schoolData.results,
        belongsToMyChild,
      ]
    );

  /* =======================================================
     CHILD FEES
  ======================================================= */

  const myFees =
    useMemo(
      () =>
        (
          schoolData.fees ||
          []
        ).filter(
          belongsToMyChild
        ),
      [
        schoolData.fees,
        belongsToMyChild,
      ]
    );

  /* =======================================================
     CHILD ASSIGNMENTS
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
          Student-specific assignment.
        */

        if (item?.studentId) {
          return (
            normalize(
              item.studentId
            ) ===
            normalize(studentId)
          );
        }

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

        if (
          normalizeClass(itemClass) !==
          normalizeClass(currentClass)
        ) {
          return false;
        }

        /*
          Section target.
        */

        if (
          item?.section &&
          normalize(item.section) !==
            normalize(student?.section)
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
     CHILD NOTICES
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
          Student-specific.
        */

        if (item?.studentId) {
          return (
            normalize(
              item.studentId
            ) ===
            normalize(studentId)
          );
        }

        const itemClass =
          item?.className ||
          item?.class ||
          "";

        /*
          Class-specific.
        */

        if (itemClass) {
          const currentClass =
            student?.className ||
            student?.class ||
            "";

          if (
            normalizeClass(
              itemClass
            ) !==
            normalizeClass(
              currentClass
            )
          ) {
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
     CHILD EVENTS
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

        if (item?.studentId) {
          return (
            normalize(
              item.studentId
            ) ===
            normalize(studentId)
          );
        }

        const itemClass =
          item?.className ||
          item?.class ||
          "";

        if (itemClass) {
          const currentClass =
            student?.className ||
            student?.class ||
            "";

          if (
            normalizeClass(
              itemClass
            ) !==
            normalizeClass(
              currentClass
            )
          ) {
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

        return true;
      });
    }, [
      schoolData.events,
      student,
      studentId,
    ]);

  /* =======================================================
     TEACHERS FOR CHILD
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
            const teacherClass =
              item?.className ||
              item?.class ||
              "";

            const currentClass =
              student?.className ||
              student?.class ||
              "";

            if (
              normalizeClass(
                teacherClass
              ) !==
              normalizeClass(
                currentClass
              )
            ) {
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

            return true;
          }
        );
      });
    }, [
      schoolData.teachers,
      student,
      studentId,
    ]);

  /* =======================================================
     NEWS

     News is general school content.
  ======================================================= */

  const myNews =
    useMemo(
      () =>
        schoolData.news || [],
      [schoolData.news]
    );

  /* =======================================================
     NOTIFICATION USER

     CRITICAL:
     parentId + linked studentId
  ======================================================= */

  const notificationUser =
    useMemo(
      () => ({
        role:
          PORTAL_TYPES.PARENT,

        userId:
          parentId,

        parentId,

        studentId,

        studentIds:
          studentId
            ? [studentId]
            : [],

        className:
          student?.className ||
          student?.class ||
          "",

        section:
          student?.section ||
          "",
      }),
      [
        parentId,
        studentId,
        student,
      ]
    );

  /* =======================================================
     ALL RELEVANT NOTIFICATIONS
  ======================================================= */

  const allNotifications =
    useMemo(() => {
      if (
        !parentId ||
        !studentId
      ) {
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
          "Parent notifications error:",
          error
        );

        return [];
      }
    }, [
      parentId,
      studentId,
      notificationUser,
      refreshVersion,
    ]);

  /* =======================================================
     UNREAD PORTAL NOTIFICATIONS
  ======================================================= */

  const unreadPortalNotifications =
    useMemo(() => {
      if (
        !parentId ||
        !studentId
      ) {
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
          "Parent unread notification error:",
          error
        );

        return [];
      }
    }, [
      parentId,
      studentId,
      notificationUser,
      refreshVersion,
    ]);

  /* =======================================================
     CHAT UNREAD
  ======================================================= */

  const unreadChatCount =
    useMemo(() => {
      if (!parentId) {
        return 0;
      }

      try {
        return (
          getUnreadTeacherChatCount(
            SENDER_TYPES.PARENT,
            parentId
          ) || 0
        );
      } catch (error) {
        console.error(
          "Parent chat unread error:",
          error
        );

        return 0;
      }
    }, [
      parentId,
      refreshVersion,
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
        if (
          !parentId ||
          !studentId
        ) {
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
        parentId,
        studentId,
        notificationUser,
        refreshVersion,
      ]
    );

  /* =======================================================
     MENU
  ======================================================= */

  const menuItems =
    useMemo(
      () => [
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
          id: "fees",
          label: "Fees",
          icon: FaMoneyBillWave,
          dot:
            sectionHasDot(
              "fees"
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
          id: "assignments",
          label: "Assignments",
          icon: FaClipboardList,
          dot:
            sectionHasDot(
              "assignments"
            ),
        },

        {
          id: "messages",
          label: "Messages",
          icon: FaComments,
          dot:
            unreadChatCount > 0,
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
          id: "news",
          label: "News",
          icon: FaNewspaper,
          dot:
            sectionHasDot(
              "news"
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
          id: "profile",
          label: "Profile",
          icon: FaUser,
          dot:
            sectionHasDot(
              "students"
            ) ||
            sectionHasDot(
              "parents"
            ),
        },
      ],
      [
        totalUnread,
        unreadChatCount,
        sectionHasDot,
      ]
    );

  /* =======================================================
     CURRENT PAGE
  ======================================================= */

  const currentPage =
    useMemo(
      () =>
        menuItems.find(
          (item) =>
            item.id ===
            activePage
        ),
      [
        menuItems,
        activePage,
      ]
    );

  /* =======================================================
     CHANGE PAGE
  ======================================================= */

  const changePage =
    useCallback(
      (page) => {
        setActivePage(page);
        setSidebarOpen(false);

        /*
          Normal section open hone par
          us section ki relevant notifications
          read ho jayengi.
        */

        if (
          ![
            "overview",
            "notifications",
            "messages",
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
              "Parent notification read error:",
              error
            );
          }

          setRefreshVersion(
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
  ======================================================= */

  const handleNotificationClick =
    useCallback(
      (notification) => {
        if (
          !notification ||
          !parentId
        ) {
          return;
        }

        /*
          ONLY clicked notification read.
        */

        try {
          markPortalNotificationRead(
            notification.id,
            PORTAL_TYPES.PARENT,
            parentId
          );
        } catch (error) {
          console.error(
            "Parent notification click error:",
            error
          );
        }

        let targetPage =
          notification.section ||
          "notifications";

        /*
          Child profile or parent profile update.
        */

        if (
          targetPage ===
            "students" ||
          targetPage ===
            "parents"
        ) {
          targetPage =
            "profile";
        }

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

        setRefreshVersion(
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
      [
        parentId,
      ]
    );

  /* =======================================================
     READ ALL
  ======================================================= */

  const handleReadAll =
    useCallback(() => {
      if (!parentId) {
        return;
      }

      try {
        markAllPortalNotificationsRead(
          notificationUser
        );
      } catch (error) {
        console.error(
          "Parent read all error:",
          error
        );
      }

      setRefreshVersion(
        (value) =>
          value + 1
      );
    }, [
      parentId,
      notificationUser,
    ]);

  /* =======================================================
     OPEN MESSAGES
  ======================================================= */

  const handleOpenMessages =
    useCallback(() => {
      setActivePage(
        "messages"
      );

      setSidebarOpen(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    try {
      logoutParent?.();
    } catch (error) {
      console.error(
        "Parent logout error:",
        error
      );

      /*
        Legacy fallback.
      */

      localStorage.removeItem(
        "abpsParentSession"
      );

      localStorage.removeItem(
        "abpsParentLoggedIn"
      );
    }

    navigate(
      "/parent/login",
      {
        replace: true,
      }
    );
  };

  /* =======================================================
     BACK HOME
  ======================================================= */

  const goHome = () => {
    navigate("/");
  };

  /* =======================================================
     AUTH GUARD
  ======================================================= */

  if (
    !parent ||
    !student
  ) {
    return null;
  }

  /* =======================================================
     PAGE CONTENT
  ======================================================= */

  const renderPage = () => {
    switch (activePage) {

      /* ===================================================
         OVERVIEW
      =================================================== */

      case "overview":
        return (
          <ParentOverview
            parent={parent}
            student={student}
            attendance={
              myAttendance
            }
            fees={
              myFees
            }
            results={
              myResults
            }
            assignments={
              myAssignments
            }
            notices={
              myNotices
            }
            events={
              myEvents
            }
            onNavigate={
              changePage
            }
          />
        );

      /* ===================================================
         NOTIFICATIONS
      =================================================== */

      case "notifications":
        return (
          <ParentNotificationsView
            notifications={
              allNotifications
            }

            unreadNotifications={
              unreadPortalNotifications
            }

            parentId={
              parentId
            }

            unreadChatCount={
              unreadChatCount
            }

            onNotificationClick={
              handleNotificationClick
            }

            onReadAll={
              handleReadAll
            }

            onOpenMessages={
              handleOpenMessages
            }
          />
        );

      /* ===================================================
         ATTENDANCE
      =================================================== */

      case "attendance":
        return (
          <ParentAttendance
            student={student}
            attendance={
              myAttendance
            }
          />
        );

      /* ===================================================
         FEES
      =================================================== */

      case "fees":
        return (
          <ParentFees
            student={student}
            fees={myFees}
          />
        );

      /* ===================================================
         RESULTS
      =================================================== */

      case "results":
        return (
          <ParentResults
            student={student}
            results={
              myResults
            }
          />
        );

      /* ===================================================
         ASSIGNMENTS
      =================================================== */

      case "assignments":
        return (
          <ParentAssignments
            student={student}
            assignments={
              myAssignments
            }
          />
        );

      /* ===================================================
         MESSAGES
      =================================================== */

      case "messages":
        return (
          <ParentTeacherChat
            parent={parent}
            student={student}
            teachers={
              myTeachers
            }
          />
        );

      /* ===================================================
         NOTICES
      =================================================== */

      case "notices":
        return (
          <ParentNotices
            notices={
              myNotices
            }
          />
        );

      /* ===================================================
         NEWS
      =================================================== */

      case "news":
        return (
          <ParentNews
            news={
              myNews
            }
          />
        );

      /* ===================================================
         EVENTS
      =================================================== */

      case "events":
        return (
          <ParentEvents
            events={
              myEvents
            }
          />
        );

      /* ===================================================
         PROFILE
      =================================================== */

      case "profile":
        return (
          <ParentProfile
            parent={parent}
            student={student}
          />
        );

      /* ===================================================
         DEFAULT
      =================================================== */

      default:
        return (
          <ParentOverview
            parent={parent}
            student={student}
            attendance={
              myAttendance
            }
            fees={
              myFees
            }
            results={
              myResults
            }
            assignments={
              myAssignments
            }
            notices={
              myNotices
            }
            events={
              myEvents
            }
            onNavigate={
              changePage
            }
          />
        );
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="ab-parent-dashboard">

      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="ab-parent-overlay"
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
        className={`ab-parent-sidebar ${
          sidebarOpen
            ? "is-open"
            : ""
        }`}
      >

        {/* SIDEBAR TOP */}

        <div className="ab-parent-sidebar-top">

          <div className="ab-parent-brand">

            <div className="ab-parent-brand-icon">
              <FaGraduationCap />
            </div>

            <div>
              <span>
                AB PUBLIC SCHOOL
              </span>

              <strong>
                Parent Portal
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="ab-parent-mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

        </div>

        {/* =================================================
            CURRENT LINKED STUDENT
        ================================================= */}

        <div className="ab-parent-student-mini">

          <div className="ab-parent-student-avatar">
            <FaUserGraduate />
          </div>

          <div className="ab-parent-student-mini-info">

            <span>
              STUDENT
            </span>

            <strong>
              {student?.name ||
                "Student"}
            </strong>

            <p>
              {student?.className ||
                student?.class ||
                ""}

              {student?.section
                ? ` - ${student.section}`
                : ""}
            </p>

          </div>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="ab-parent-navigation">

          <span className="ab-parent-nav-label">
            PORTAL MENU
          </span>

          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              const active =
                activePage ===
                item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  className={`ab-parent-nav-item ${
                    active
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    changePage(
                      item.id
                    )
                  }
                >

                  <span className="ab-parent-nav-icon">
                    <Icon />
                  </span>

                  <span className="ab-parent-nav-text">
                    {item.label}
                  </span>

                  {item.dot && (
                    <span
                      className="ab-parent-nav-dot"
                      title="New update"
                    />
                  )}

                  <FaChevronRight className="ab-parent-nav-arrow" />

                </button>
              );
            }
          )}

        </nav>

        {/* =================================================
            SIDEBAR FOOTER
        ================================================= */}

        <div className="ab-parent-sidebar-footer">

          <button
            type="button"
            className="ab-parent-home-button"
            onClick={goHome}
          >
            <FaArrowLeft />

            <span>
              Back to Website
            </span>
          </button>

          <button
            type="button"
            className="ab-parent-logout-button"
            onClick={
              handleLogout
            }
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

          <div className="ab-parent-secure">

            <FaShieldAlt />

            <span>
              Secure Parent Access
            </span>

          </div>

        </div>

      </aside>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="ab-parent-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="ab-parent-header">

          <div className="ab-parent-header-left">

            <button
              type="button"
              className="ab-parent-menu-button"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <div className="ab-parent-page-heading">

              <span>
                PARENT PORTAL
              </span>

              <h1>
                {currentPage?.label ||
                  "Overview"}
              </h1>

            </div>

          </div>

          {/* RIGHT */}

          <div className="ab-parent-header-right">

            <button
              type="button"
              className="ab-parent-support-button"
            >
              <FaHeadset />

              <span>
                Support
              </span>
            </button>

            {/* =============================================
                BELL
            ============================================= */}

            <button
              type="button"
              className="ab-parent-notification-button"
              onClick={() =>
                changePage(
                  "notifications"
                )
              }
              aria-label="Notifications"
            >
              <FaBell />

              {totalUnread > 0 && (
                <>
                  <span className="ab-parent-notification-dot" />

                  <span className="ab-parent-notification-count">
                    {totalUnread > 99
                      ? "99+"
                      : totalUnread}
                  </span>
                </>
              )}

            </button>

            {/* PROFILE */}

            <button
              type="button"
              className="ab-parent-profile-button"
              onClick={() =>
                changePage(
                  "profile"
                )
              }
            >

              <span className="ab-parent-profile-avatar">
                {parent?.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "P"}
              </span>

              <span className="ab-parent-profile-text">

                <small>
                  Logged in as
                </small>

                <strong>
                  {parent?.name ||
                    "Parent"}
                </strong>

              </span>

            </button>

          </div>

        </header>

        {/* =================================================
            MOBILE STUDENT BAR
        ================================================= */}

        <section className="ab-parent-mobile-student">

          <div>
            <FaUserGraduate />
          </div>

          <section>

            <span>
              Viewing Student
            </span>

            <strong>
              {student?.name ||
                "Student"}
            </strong>

            <p>
              {student?.className ||
                student?.class ||
                ""}

              {student?.section
                ? ` • Section ${student.section}`
                : ""}

              {student?.admissionNo
                ? ` • ${student.admissionNo}`
                : ""}
            </p>

          </section>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="ab-parent-content">
          {renderPage()}
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="ab-parent-dashboard-footer">

          <p>
            © 2026 AB Public School.
            Parent Portal.
          </p>

          <span>
            <FaShieldAlt />
            Protected school account
          </span>

        </footer>

      </main>

    </div>
  );
};

export default ParentDashboard;