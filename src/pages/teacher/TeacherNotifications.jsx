import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBell,
  FaCheckDouble,
  FaComments,
  FaUserGraduate,
  FaUsers,
  FaClock,
  FaChevronRight,
  FaBullhorn,
} from "react-icons/fa";

import {
  PORTAL_TYPES,
  PORTAL_NOTIFICATION_EVENT,
  getNotificationsForUser,
  markPortalNotificationRead,
  markAllPortalNotificationsRead,
} from "../../data/portalNotificationsData";

import {
  getChatsForTeacher,
  markTeacherChatRead,
  SENDER_TYPES,
  CHAT_TYPES,
} from "../../data/teacherChatData";

import "./TeacherNotifications.css";

const TeacherNotifications = ({
  teacher,
  students = [],
  onNavigate,
  onOpenChat,
}) => {
  const [version, setVersion] =
    useState(0);

  const teacherId =
    teacher?.id ||
    teacher?.teacherId ||
    "";

  /* =====================================================
     CURRENT USER
  ===================================================== */

  const notificationUser = useMemo(
    () => ({
      role: PORTAL_TYPES.TEACHER,

      userId: teacherId,

      teacherId,

      studentIds: students
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
      students,
    ]
  );

  /* =====================================================
     REFRESH
  ===================================================== */

  const refresh = useCallback(() => {
    setVersion(
      (value) => value + 1
    );
  }, []);

  useEffect(() => {
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
  }, [refresh]);

  /* =====================================================
     NORMAL PORTAL NOTIFICATIONS
  ===================================================== */

  const portalNotifications =
    useMemo(() => {
      if (!teacherId) {
        return [];
      }

      return (
        getNotificationsForUser(
          notificationUser
        ) || []
      );
    }, [
      teacherId,
      notificationUser,
      version,
    ]);

  /* =====================================================
     TEACHER CHATS
  ===================================================== */

  const teacherChats = useMemo(() => {
    if (!teacherId) {
      return [];
    }

    return (
      getChatsForTeacher(
        teacherId
      ) || []
    );
  }, [
    teacherId,
    version,
  ]);

  /* =====================================================
     READER KEY
  ===================================================== */

  const teacherReaderKey =
    `${SENDER_TYPES.TEACHER}:${teacherId}`;

  /* =====================================================
     UNREAD MESSAGE NOTIFICATIONS
  ===================================================== */

  const unreadMessageNotifications =
    useMemo(() => {
      const result = [];

      teacherChats.forEach((chat) => {
        const messages =
          Array.isArray(chat.messages)
            ? chat.messages
            : [];

        const unreadMessages =
          messages.filter(
            (message) => {
              const sentByTeacher =
                message.senderType ===
                SENDER_TYPES.TEACHER;

              const readBy =
                Array.isArray(
                  message.readBy
                )
                  ? message.readBy
                  : [];

              return (
                !sentByTeacher &&
                !readBy.includes(
                  teacherReaderKey
                )
              );
            }
          );

        if (!unreadMessages.length) {
          return;
        }

        const lastUnread =
          unreadMessages[
            unreadMessages.length - 1
          ];

        const isParentChat =
          chat.type ===
            CHAT_TYPES.PARENT_TEACHER ||
          lastUnread.senderType ===
            SENDER_TYPES.PARENT;

        const senderName =
          lastUnread.senderName ||
          chat.parentName ||
          chat.studentName ||
          "User";

        const student =
          students.find(
            (item) =>
              String(
                item.id ||
                  item.studentId
              ) ===
              String(
                chat.studentId
              )
          ) || null;

        result.push({
          id: `chat-${chat.id}`,

          notificationType:
            "message",

          chatId: chat.id,

          chat,

          student,

          messageType:
            isParentChat
              ? "parent"
              : "student",

          title: isParentChat
            ? `New Parent Message — ${senderName}`
            : `New Student Message — ${senderName}`,

          message:
            lastUnread.message ||
            "You have a new private message.",

          createdAt:
            lastUnread.createdAt ||
            chat.updatedAt ||
            chat.lastMessageAt,

          unreadCount:
            unreadMessages.length,

          senderName,

          section: "messages",
        });
      });

      return result;
    }, [
      teacherChats,
      teacherReaderKey,
      students,
    ]);

  /* =====================================================
     NORMAL NOTIFICATIONS CONVERT
  ===================================================== */

  const dataNotifications =
    useMemo(() => {
      return portalNotifications.map(
        (notification) => ({
          ...notification,

          notificationType:
            "data",
        })
      );
    }, [portalNotifications]);

  /* =====================================================
     COMBINED LIST
  ===================================================== */

  const allNotifications =
    useMemo(() => {
      return [
        ...unreadMessageNotifications,
        ...dataNotifications,
      ].sort((a, b) => {
        return (
          new Date(
            b.createdAt || 0
          ).getTime() -
          new Date(
            a.createdAt || 0
          ).getTime()
        );
      });
    }, [
      unreadMessageNotifications,
      dataNotifications,
    ]);

  /* =====================================================
     DATA UNREAD
  ===================================================== */

  const portalReaderKey =
    `${PORTAL_TYPES.TEACHER}:${teacherId}`;

  const unreadDataCount =
    portalNotifications.filter(
      (notification) =>
        !(
          notification.readBy || []
        ).includes(
          portalReaderKey
        )
    ).length;

  const unreadMessageCount =
    unreadMessageNotifications.reduce(
      (total, item) =>
        total +
        Number(
          item.unreadCount || 0
        ),
      0
    );

  const totalUnread =
    unreadDataCount +
    unreadMessageCount;

  /* =====================================================
     DATE
  ===================================================== */

  const formatDate = (value) => {
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
      return String(value);
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

  /* =====================================================
     OPEN DATA NOTIFICATION
  ===================================================== */

  const openDataNotification = (
    notification
  ) => {
    markPortalNotificationRead(
      notification.id,
      PORTAL_TYPES.TEACHER,
      teacherId
    );

    refresh();

    if (
      notification.section &&
      onNavigate
    ) {
      onNavigate(
        notification.section
      );
    }
  };

  /* =====================================================
     OPEN MESSAGE NOTIFICATION
  ===================================================== */

  const openMessageNotification = (
    notification
  ) => {
    /*
      IMPORTANT:
      Notification click karne par actual
      conversation open ho rahi hai.

      Isi time us chat ke messages read.
    */

    markTeacherChatRead(
      notification.chatId,
      SENDER_TYPES.TEACHER,
      teacherId
    );

    refresh();

    if (onOpenChat) {
      onOpenChat({
        student:
          notification.student,

        type:
          notification.messageType,
      });

      return;
    }

    if (onNavigate) {
      onNavigate("messages");
    }
  };

  /* =====================================================
     MARK DATA NOTIFICATIONS READ
  ===================================================== */

  const markAllDataRead = () => {
    markAllPortalNotificationsRead(
      notificationUser
    );

    refresh();
  };

  return (
    <div className="teacherNotify-page">

      {/* HERO */}

      <section className="teacherNotify-hero">

        <div>
          <span>
            NOTIFICATION CENTER
          </span>

          <h1>
            Notifications
          </h1>

          <p>
            View new school updates
            and unread private messages
            from students and parents.
          </p>
        </div>

        <div className="teacherNotify-heroRight">

          <div className="teacherNotify-bellBig">
            <FaBell />

            {totalUnread > 0 && (
              <strong>
                {totalUnread > 99
                  ? "99+"
                  : totalUnread}
              </strong>
            )}
          </div>

        </div>

      </section>

      {/* SUMMARY */}

      <section className="teacherNotify-summary">

        <div className="teacherNotify-summaryCard">

          <div className="teacherNotify-summaryIcon">
            <FaBell />
          </div>

          <section>
            <strong>
              {totalUnread}
            </strong>

            <span>
              Total Unread
            </span>
          </section>

        </div>

        <div className="teacherNotify-summaryCard">

          <div className="teacherNotify-summaryIcon">
            <FaComments />
          </div>

          <section>
            <strong>
              {unreadMessageCount}
            </strong>

            <span>
              Unread Messages
            </span>
          </section>

        </div>

        <div className="teacherNotify-summaryCard">

          <div className="teacherNotify-summaryIcon">
            <FaBullhorn />
          </div>

          <section>
            <strong>
              {unreadDataCount}
            </strong>

            <span>
              School Updates
            </span>
          </section>

        </div>

      </section>

      {/* HEADING */}

      <div className="teacherNotify-heading">

        <div>
          <span>
            RECENT ACTIVITY
          </span>

          <h2>
            Your Notifications
          </h2>

          <p>
            Unread messages remain here
            until you open the actual
            conversation.
          </p>
        </div>

        {unreadDataCount > 0 && (
          <button
            type="button"
            onClick={
              markAllDataRead
            }
          >
            <FaCheckDouble />

            Mark school updates read
          </button>
        )}

      </div>

      {/* NOTIFICATION LIST */}

      {allNotifications.length >
      0 ? (
        <div className="teacherNotify-list">

          {allNotifications.map(
            (notification) => {
              const isMessage =
                notification.notificationType ===
                "message";

              const isParent =
                notification.messageType ===
                "parent";

              const dataUnread =
                !isMessage &&
                !(
                  notification.readBy ||
                  []
                ).includes(
                  portalReaderKey
                );

              return (
                <button
                  key={
                    notification.id
                  }
                  type="button"
                  className={`teacherNotify-item ${
                    isMessage
                      ? "message"
                      : ""
                  } ${
                    dataUnread ||
                    isMessage
                      ? "unread"
                      : ""
                  }`}
                  onClick={() => {
                    if (isMessage) {
                      openMessageNotification(
                        notification
                      );
                    } else {
                      openDataNotification(
                        notification
                      );
                    }
                  }}
                >

                  {/* ICON */}

                  <div
                    className={`teacherNotify-itemIcon ${
                      isMessage
                        ? "messageIcon"
                        : ""
                    }`}
                  >
                    {isMessage ? (
                      isParent ? (
                        <FaUsers />
                      ) : (
                        <FaUserGraduate />
                      )
                    ) : (
                      <FaBell />
                    )}
                  </div>

                  {/* CONTENT */}

                  <section className="teacherNotify-itemContent">

                    <div className="teacherNotify-itemTitle">

                      <strong>
                        {notification.title ||
                          "School Update"}
                      </strong>

                      {(isMessage ||
                        dataUnread) && (
                        <i />
                      )}

                      {isMessage &&
                        notification.unreadCount >
                          0 && (
                          <b>
                            {
                              notification.unreadCount
                            }{" "}
                            new
                          </b>
                        )}

                    </div>

                    <p>
                      {notification.message ||
                        "New update available."}
                    </p>

                    <div className="teacherNotify-meta">

                      {isMessage && (
                        <span>
                          <FaComments />

                          {isParent
                            ? "Parent → Teacher"
                            : "Student → Teacher"}
                        </span>
                      )}

                      <span>
                        <FaClock />

                        {formatDate(
                          notification.createdAt
                        )}
                      </span>

                    </div>

                  </section>

                  {/* ARROW */}

                  <div className="teacherNotify-arrow">
                    <FaChevronRight />
                  </div>

                </button>
              );
            }
          )}

        </div>
      ) : (
        <div className="teacherNotify-empty">

          <div>
            <FaCheckDouble />
          </div>

          <h3>
            You're all caught up
          </h3>

          <p>
            There are no unread
            messages or new school
            notifications.
          </p>

        </div>
      )}

    </div>
  );
};

export default TeacherNotifications;