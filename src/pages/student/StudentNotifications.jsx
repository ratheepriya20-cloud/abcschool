import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBell,
  FaCheckDouble,
  FaClipboardList,
  FaCalendarCheck,
  FaChartBar,
  FaMoneyBillWave,
  FaBullhorn,
  FaCalendarAlt,
  FaNewspaper,
  FaUserGraduate,
  FaClock,
  FaComments,
  FaUserTie,
  FaChevronRight,
} from "react-icons/fa";

import "./StudentNotifications.css";

/* =========================================================
   PORTAL NOTIFICATIONS
   ========================================================= */

import {
  PORTAL_TYPES,
  PORTAL_NOTIFICATION_EVENT,
  getNotificationsForUser,
  markPortalNotificationRead,
  markAllPortalNotificationsRead,
} from "../../data/portalNotificationsData";

/* =========================================================
   PRIVATE CHAT
   ========================================================= */

import {
  getChatsForStudent,
  markTeacherChatRead,
  SENDER_TYPES,
} from "../../data/teacherChatData";

const StudentNotifications = ({
  student,
  onNavigate,
}) => {
  const [version, setVersion] =
    useState(0);

  /* =======================================================
     STUDENT
     ======================================================= */

  const studentId =
    student?.id ||
    student?.studentId ||
    "";

  const readerKey =
    `${SENDER_TYPES.STUDENT}:${studentId}`;

  /* =======================================================
     USER INFO
     ======================================================= */

  const userInfo = useMemo(
    () => ({
      role: PORTAL_TYPES.STUDENT,

      userId: studentId,

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
      student?.className,
      student?.class,
      student?.section,
    ]
  );

  /* =======================================================
     PORTAL NOTIFICATIONS
     ======================================================= */

  const portalNotifications =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      return (
        getNotificationsForUser(
          userInfo
        ) || []
      );
    }, [
      userInfo,
      version,
      studentId,
    ]);

  /* =======================================================
     STUDENT ↔ TEACHER CHATS
     ======================================================= */

  const studentChats =
    useMemo(() => {
      if (!studentId) {
        return [];
      }

      return (
        getChatsForStudent(
          studentId
        ) || []
      );
    }, [
      studentId,
      version,
    ]);

  /* =======================================================
     ACTUAL UNREAD TEACHER MESSAGES
     ======================================================= */

  const chatNotifications =
    useMemo(() => {
      const items = [];

      studentChats.forEach(
        (chat) => {
          const messages =
            Array.isArray(
              chat?.messages
            )
              ? chat.messages
              : [];

          const unreadMessages =
            messages.filter(
              (message) => {
                const fromTeacher =
                  message.senderType ===
                  SENDER_TYPES.TEACHER;

                const alreadyRead =
                  (
                    message.readBy ||
                    []
                  ).includes(
                    readerKey
                  );

                return (
                  fromTeacher &&
                  !alreadyRead
                );
              }
            );

          if (
            unreadMessages.length === 0
          ) {
            return;
          }

          const lastMessage =
            unreadMessages[
              unreadMessages.length - 1
            ];

          items.push({
            id:
              `student-chat-${chat.id}`,

            type: "chat",

            section: "chat",

            chatId: chat.id,

            teacherId:
              chat.teacherId,

            teacherName:
              chat.teacherName ||
              lastMessage.senderName ||
              "Teacher",

            title:
              unreadMessages.length > 1
                ? `${unreadMessages.length} new messages from ${
                    chat.teacherName ||
                    lastMessage.senderName ||
                    "Teacher"
                  }`
                : `New message from ${
                    chat.teacherName ||
                    lastMessage.senderName ||
                    "Teacher"
                  }`,

            message:
              lastMessage.message ||
              "You received a new private message.",

            actorName:
              chat.teacherName ||
              lastMessage.senderName ||
              "Teacher",

            createdAt:
              lastMessage.createdAt ||
              chat.updatedAt ||
              chat.lastMessageAt,

            unreadCount:
              unreadMessages.length,

            unread: true,
          });
        }
      );

      return items;
    }, [
      studentChats,
      readerKey,
    ]);

  /* =======================================================
     COMBINE BOTH NOTIFICATION TYPES
     ======================================================= */

  const notifications =
    useMemo(() => {
      const normalItems =
        portalNotifications.map(
          (item) => ({
            ...item,

            type:
              item.type ||
              "portal",

            unread:
              !(
                item.readBy ||
                []
              ).includes(
                `${PORTAL_TYPES.STUDENT}:${studentId}`
              ),
          })
        );

      return [
        ...chatNotifications,
        ...normalItems,
      ].sort((a, b) => {
        const first =
          new Date(
            b.createdAt || 0
          ).getTime();

        const second =
          new Date(
            a.createdAt || 0
          ).getTime();

        return first - second;
      });
    }, [
      portalNotifications,
      chatNotifications,
      studentId,
    ]);

  /* =======================================================
     COUNTS
     ======================================================= */

  const portalUnreadCount =
    portalNotifications.filter(
      (item) =>
        !(
          item.readBy ||
          []
        ).includes(
          `${PORTAL_TYPES.STUDENT}:${studentId}`
        )
    ).length;

  const chatUnreadCount =
    chatNotifications.reduce(
      (total, item) =>
        total +
        Number(
          item.unreadCount || 0
        ),
      0
    );

  const unreadCount =
    portalUnreadCount +
    chatUnreadCount;

  /* =======================================================
     LIVE UPDATE
     ======================================================= */

  useEffect(() => {
    const refresh = () => {
      setVersion(
        (value) =>
          value + 1
      );
    };

    window.addEventListener(
      PORTAL_NOTIFICATION_EVENT,
      refresh
    );

    window.addEventListener(
      "abpsTeacherChatUpdated",
      refresh
    );

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        PORTAL_NOTIFICATION_EVENT,
        refresh
      );

      window.removeEventListener(
        "abpsTeacherChatUpdated",
        refresh
      );

      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, []);

  /* =======================================================
     ICON
     ======================================================= */

  const getIcon = (
    section
  ) => {
    switch (section) {
      case "attendance":
        return (
          <FaCalendarCheck />
        );

      case "assignments":
        return (
          <FaClipboardList />
        );

      case "results":
        return (
          <FaChartBar />
        );

      case "fees":
        return (
          <FaMoneyBillWave />
        );

      case "notices":
        return (
          <FaBullhorn />
        );

      case "news":
        return (
          <FaNewspaper />
        );

      case "events":
        return (
          <FaCalendarAlt />
        );

      case "chat":
        return (
          <FaComments />
        );

      default:
        return (
          <FaBell />
        );
    }
  };

  /* =======================================================
     DATE
     ======================================================= */

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* =======================================================
     CLICK NOTIFICATION
     ======================================================= */

  const handleNotification = (
    notification
  ) => {
    /*
      CHAT NOTIFICATION
    */

    if (
      notification.type ===
      "chat"
    ) {
      if (
        notification.chatId &&
        studentId
      ) {
        markTeacherChatRead(
          notification.chatId,
          SENDER_TYPES.STUDENT,
          studentId
        );
      }

      setVersion(
        (value) =>
          value + 1
      );

      if (onNavigate) {
        onNavigate("chat");
      }

      return;
    }

    /*
      NORMAL PORTAL NOTIFICATION
    */

    markPortalNotificationRead(
      notification.id,
      PORTAL_TYPES.STUDENT,
      studentId
    );

    setVersion(
      (value) =>
        value + 1
    );

    if (
      onNavigate &&
      notification.section
    ) {
      onNavigate(
        notification.section
      );
    }
  };

  /* =======================================================
     MARK PORTAL NOTIFICATIONS READ

     IMPORTANT:
     Chat messages ko yahan read nahi kar rahe.
     Teacher message tabhi read hoga jab student
     actual conversation open karega.
     ======================================================= */

  const handleMarkAllRead =
    () => {
      markAllPortalNotificationsRead(
        userInfo
      );

      setVersion(
        (value) =>
          value + 1
      );
    };

  /* =======================================================
     UI
     ======================================================= */

  return (
    <div className="stuNotify-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="stuNotify-hero">

        <div className="stuNotify-heroContent">

          <span>
            SCHOOL UPDATES
          </span>

          <h1>
            Notifications
          </h1>

          <p>
            View academic updates,
            attendance, fees, results,
            events and private messages
            from your teachers.
          </p>

        </div>

        <div className="stuNotify-heroBell">

          <FaBell />

          {unreadCount > 0 && (
            <span>
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          )}

        </div>

      </section>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <section className="stuNotify-summary">

        <div className="stuNotify-summaryCard">

          <div className="stuNotify-summaryIcon">
            <FaBell />
          </div>

          <div>
            <span>
              Total Updates
            </span>

            <strong>
              {notifications.length}
            </strong>
          </div>

        </div>

        <div className="stuNotify-summaryCard">

          <div className="stuNotify-summaryIcon portal">
            <FaClipboardList />
          </div>

          <div>
            <span>
              School Updates
            </span>

            <strong>
              {portalUnreadCount}
            </strong>
          </div>

        </div>

        <div className="stuNotify-summaryCard">

          <div className="stuNotify-summaryIcon chat">
            <FaComments />
          </div>

          <div>
            <span>
              Teacher Messages
            </span>

            <strong>
              {chatUnreadCount}
            </strong>
          </div>

        </div>

      </section>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="stuNotify-toolbar">

        <div>

          <span className="stuNotify-toolbarLabel">
            LATEST ACTIVITY
          </span>

          <strong>
            Latest Updates
          </strong>

          <p>
            {unreadCount > 0
              ? `${unreadCount} unread update${
                  unreadCount === 1
                    ? ""
                    : "s"
                }`
              : "You're all caught up"}
          </p>

        </div>

        {portalUnreadCount >
          0 && (
          <button
            type="button"
            onClick={
              handleMarkAllRead
            }
          >
            <FaCheckDouble />

            Mark school updates read
          </button>
        )}

      </div>

      {/* =================================================
          LIST
      ================================================= */}

      <div className="stuNotify-list">

        {notifications.length >
        0 ? (
          notifications.map(
            (notification) => {

              const isChat =
                notification.type ===
                "chat";

              const unread =
                isChat
                  ? true
                  : notification.unread;

              return (
                <button
                  type="button"
                  key={
                    notification.id
                  }
                  className={`stuNotify-item ${
                    unread
                      ? "unread"
                      : ""
                  } ${
                    isChat
                      ? "message"
                      : ""
                  }`}
                  onClick={() =>
                    handleNotification(
                      notification
                    )
                  }
                >

                  {/* ICON */}

                  <div
                    className={`stuNotify-icon ${
                      isChat
                        ? "messageIcon"
                        : ""
                    }`}
                  >
                    {getIcon(
                      notification.section
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="stuNotify-content">

                    <div className="stuNotify-titleRow">

                      <div>
                        {isChat && (
                          <span className="stuNotify-type">
                            PRIVATE MESSAGE
                          </span>
                        )}

                        <strong>
                          {
                            notification.title
                          }
                        </strong>
                      </div>

                      {unread && (
                        <span className="stuNotify-newDot" />
                      )}

                    </div>

                    <p>
                      {
                        notification.message
                      }
                    </p>

                    <div className="stuNotify-meta">

                      <span>
                        {isChat
                          ? (
                            <FaUserTie />
                          )
                          : (
                            <FaUserGraduate />
                          )}

                        {notification.actorName ||
                          "AB Public School"}
                      </span>

                      <span>
                        <FaClock />

                        {formatDate(
                          notification.createdAt
                        )}
                      </span>

                      {isChat &&
                        notification.unreadCount >
                          0 && (
                          <span className="stuNotify-messageCount">
                            {
                              notification.unreadCount
                            }{" "}
                            unread
                          </span>
                        )}

                    </div>

                  </div>

                  <FaChevronRight className="stuNotify-arrow" />

                </button>
              );
            }
          )
        ) : (
          <div className="stuNotify-empty">

            <FaBell />

            <span>
              ALL CAUGHT UP
            </span>

            <h2>
              No Notifications
            </h2>

            <p>
              New school updates and
              teacher messages will
              appear here.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default StudentNotifications;