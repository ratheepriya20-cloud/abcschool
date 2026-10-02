import {
  createId,
  ABPS_PORTAL_DATA_CHANGED_EVENT,
} from "./storage";

/* =========================================================
   STORAGE / EVENTS
========================================================= */

export const PORTAL_NOTIFICATIONS_KEY =
  "abpsPortalNotifications";

export const PORTAL_NOTIFICATION_EVENT =
  "abpsPortalNotificationUpdated";

/* =========================================================
   PORTAL TYPES
========================================================= */

export const PORTAL_TYPES = {
  STUDENT: "student",
  PARENT: "parent",
  TEACHER: "teacher",
  SUPER_ADMIN: "super-admin",
  SUB_ADMIN: "sub-admin",
};

/* =========================================================
   MODULE MAP
========================================================= */

const MODULE_MAP = {
  abpsStudents: {
    section: "students",
    title: "Student Details",
  },

  abpsAttendance: {
    section: "attendance",
    title: "Attendance",
  },

  abpsAssignments: {
    section: "assignments",
    title: "Assignment",
  },

  abpsResults: {
    section: "results",
    title: "Result",
  },

  abpsFees: {
    section: "fees",
    title: "Fee",
  },

  abpsNotices: {
    section: "notices",
    title: "Notice",
  },

  abpsNews: {
    section: "news",
    title: "News",
  },

  abpsEvents: {
    section: "events",
    title: "Event",
  },

  abpsTeachers: {
    section: "teachers",
    title: "Teacher Details",
  },

  abpsParents: {
    section: "parents",
    title: "Parent Details",
  },
};

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const normalizeClass = (value) =>
  normalize(value)
    .replace(/^class\s*/i, "")
    .trim();

const sameId = (a, b) => {
  if (!a || !b) {
    return false;
  }

  return normalize(a) === normalize(b);
};

const getStudentId = (item = {}) =>
  item?.studentId ||
  item?.student?.studentId ||
  item?.student?.id ||
  item?.id ||
  item?.admissionNo ||
  null;

const getParentId = (item = {}) =>
  item?.parentId ||
  item?.parent?.parentId ||
  item?.parent?.id ||
  item?.id ||
  null;

const getTeacherId = (item = {}) =>
  item?.teacherId ||
  item?.teacher?.teacherId ||
  item?.teacher?.id ||
  item?.id ||
  item?.employeeId ||
  null;

/* =========================================================
   READ NOTIFICATIONS
========================================================= */

export const getPortalNotifications = () => {
  try {
    const data = localStorage.getItem(
      PORTAL_NOTIFICATIONS_KEY
    );

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Portal notifications read error:",
      error
    );

    return [];
  }
};

/* =========================================================
   SAVE NOTIFICATIONS
========================================================= */

const savePortalNotifications = (
  notifications
) => {
  try {
    localStorage.setItem(
      PORTAL_NOTIFICATIONS_KEY,
      JSON.stringify(notifications)
    );

    window.dispatchEvent(
      new Event(
        PORTAL_NOTIFICATION_EVENT
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Portal notifications save error:",
      error
    );

    return false;
  }
};

/* =========================================================
   ACTION LABEL
========================================================= */

const getActionLabel = (action) => {
  switch (
    normalize(action)
  ) {
    case "add":
      return "added";

    case "delete":
      return "removed";

    case "update":
      return "updated";

    default:
      return "updated";
  }
};

/* =========================================================
   ITEM NAME
========================================================= */

const getItemName = (item = {}) =>
  item?.name ||
  item?.title ||
  item?.studentName ||
  item?.parentName ||
  item?.subject ||
  item?.exam ||
  item?.admissionNo ||
  "";

/* =========================================================
   CURRENT ACTOR
========================================================= */

const safeSession = (key) => {
  try {
    const data =
      localStorage.getItem(key);

    return data
      ? JSON.parse(data)
      : null;
  } catch {
    return null;
  }
};

const getCurrentActor = () => {
  /*
    ADMIN
  */

  const admin =
    safeSession(
      "abpsSession"
    );

  if (admin) {
    return {
      id:
        admin.id ||
        admin.userId ||
        "",

      name:
        admin.name ||
        "Administrator",

      role:
        admin.role ||
        PORTAL_TYPES.SUPER_ADMIN,
    };
  }

  /*
    TEACHER
  */

  const teacher =
    safeSession(
      "abpsTeacherSession"
    );

  if (teacher) {
    return {
      id:
        teacher.teacherId ||
        teacher.id ||
        "",

      name:
        teacher.name ||
        "Teacher",

      role:
        PORTAL_TYPES.TEACHER,
    };
  }

  /*
    PARENT
  */

  const parent =
    safeSession(
      "abpsParentSession"
    );

  if (parent) {
    return {
      id:
        parent.parentId ||
        parent.id ||
        "",

      name:
        parent.name ||
        parent.parentName ||
        "Parent",

      role:
        PORTAL_TYPES.PARENT,
    };
  }

  /*
    STUDENT
  */

  const student =
    safeSession(
      "abpsStudentSession"
    );

  if (student) {
    return {
      id:
        student.studentId ||
        student.id ||
        "",

      name:
        student.name ||
        "Student",

      role:
        PORTAL_TYPES.STUDENT,
    };
  }

  return null;
};

/* =========================================================
   ADD NOTIFICATION
========================================================= */

export const addPortalNotification = ({
  section,
  title,
  message,

  action = "update",

  studentId = null,
  studentIds = [],

  parentId = null,
  teacherId = null,

  className = null,
  sectionName = null,

  targetRoles = [],

  actor = null,

  sourceKey = null,
  sourceItemId = null,
}) => {
  try {
    const notifications =
      getPortalNotifications();

    const notification = {
      id:
        createId?.(
          "PNOT"
        ) ||
        `PNOT-${Date.now()}`,

      section:
        section ||
        "general",

      title:
        title ||
        "School Update",

      message:
        message ||
        "A new update is available.",

      action,

      studentId:
        studentId ||
        null,

      studentIds:
        Array.isArray(
          studentIds
        )
          ? studentIds
          : [],

      parentId:
        parentId ||
        null,

      teacherId:
        teacherId ||
        null,

      className:
        className ||
        null,

      sectionName:
        sectionName ||
        null,

      targetRoles:
        Array.isArray(
          targetRoles
        )
          ? targetRoles
          : [],

      actor:
        actor ||
        getCurrentActor(),

      sourceKey:
        sourceKey ||
        null,

      sourceItemId:
        sourceItemId ||
        null,

      readBy: [],

      createdAt:
        new Date().toISOString(),
    };

    savePortalNotifications([
      notification,
      ...notifications,
    ]);

    return notification;
  } catch (error) {
    console.error(
      "Add portal notification error:",
      error
    );

    return null;
  }
};

/* =========================================================
   CREATE FROM DATA CHANGE

   PRIVACY RULES:

   STUDENT MASTER:
   Update => exact student + linked parent.
   Add/Delete => admin only.

   PARENT MASTER:
   Update => exact parent.
   Add/Delete => admin only.

   PERSONAL STUDENT DATA:
   Attendance / Result / Fee =>
   exact student + linked parent.

   Assignment / Notice / Event =>
   exact student OR class/section OR global.

========================================================= */

export const createNotificationFromDataChange =
  (detail = {}) => {
    try {
      const {
        key,
        action = "write",
        changedItem,
        previousItem,
        itemId,
      } = detail || {};

      const module =
        MODULE_MAP[key];

      /*
        Unknown/internal storage.
      */

      if (!module) {
        return null;
      }

      /*
        Initialization par notification nahi.
      */

      if (
        normalize(action) ===
        "initialize"
      ) {
        return null;
      }

      const item =
        changedItem ||
        previousItem ||
        {};

      const cleanAction =
        normalize(action);

      const actionLabel =
        getActionLabel(
          cleanAction
        );

      const itemName =
        getItemName(item);

      let studentId = null;
      let parentId = null;
      let teacherId = null;

      let className =
        item?.className ||
        item?.class ||
        null;

      let sectionName =
        item?.section ||
        null;

      let targetRoles = [
        PORTAL_TYPES.SUPER_ADMIN,
        PORTAL_TYPES.SUB_ADMIN,
      ];

      /* =====================================================
         STUDENT MASTER
      ===================================================== */

      if (
        key ===
        "abpsStudents"
      ) {
        studentId =
          getStudentId(item);

        parentId =
          item?.parentId ||
          null;

        /*
          Add/Delete kisi existing student
          ya parent ko nahi batana.
        */

        if (
          cleanAction === "add" ||
          cleanAction === "delete"
        ) {
          targetRoles = [
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        } else {
          /*
            Exact same student +
            uska linked parent.
          */

          targetRoles = [
            PORTAL_TYPES.STUDENT,
            PORTAL_TYPES.PARENT,
            PORTAL_TYPES.TEACHER,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        }
      }

      /* =====================================================
         PARENT MASTER
      ===================================================== */

      else if (
        key ===
        "abpsParents"
      ) {
        parentId =
          getParentId(item);

        studentId =
          item?.studentId ||
          null;

        if (
          cleanAction === "add" ||
          cleanAction === "delete"
        ) {
          targetRoles = [
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        } else {
          /*
            Parent details update:
            exact parent only.
            Student ko parent details
            notification nahi.
          */

          targetRoles = [
            PORTAL_TYPES.PARENT,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        }
      }

      /* =====================================================
         ATTENDANCE
      ===================================================== */

      else if (
        key ===
        "abpsAttendance"
      ) {
        studentId =
          item?.studentId ||
          item?.student?.id ||
          null;

        if (studentId) {
          targetRoles = [
            PORTAL_TYPES.STUDENT,
            PORTAL_TYPES.PARENT,
            PORTAL_TYPES.TEACHER,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        } else {
          /*
            Student ID missing hai to
            Student/Parent ko broadcast nahi.
          */

          targetRoles = [
            PORTAL_TYPES.TEACHER,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        }
      }

      /* =====================================================
         RESULTS
      ===================================================== */

      else if (
        key ===
        "abpsResults"
      ) {
        studentId =
          item?.studentId ||
          item?.student?.id ||
          null;

        if (studentId) {
          targetRoles = [
            PORTAL_TYPES.STUDENT,
            PORTAL_TYPES.PARENT,
            PORTAL_TYPES.TEACHER,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        } else {
          targetRoles = [
            PORTAL_TYPES.TEACHER,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        }
      }

      /* =====================================================
         FEES
      ===================================================== */

      else if (
        key ===
        "abpsFees"
      ) {
        studentId =
          item?.studentId ||
          item?.student?.id ||
          null;

        if (studentId) {
          targetRoles = [
            PORTAL_TYPES.STUDENT,
            PORTAL_TYPES.PARENT,
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        } else {
          targetRoles = [
            PORTAL_TYPES.SUPER_ADMIN,
            PORTAL_TYPES.SUB_ADMIN,
          ];
        }
      }

      /* =====================================================
         ASSIGNMENTS
      ===================================================== */

      else if (
        key ===
        "abpsAssignments"
      ) {
        studentId =
          item?.studentId ||
          null;

        targetRoles = [
          PORTAL_TYPES.STUDENT,
          PORTAL_TYPES.PARENT,
          PORTAL_TYPES.TEACHER,
          PORTAL_TYPES.SUPER_ADMIN,
          PORTAL_TYPES.SUB_ADMIN,
        ];
      }

      /* =====================================================
         NOTICES
      ===================================================== */

      else if (
        key ===
        "abpsNotices"
      ) {
        studentId =
          item?.studentId ||
          null;

        targetRoles = [
          PORTAL_TYPES.STUDENT,
          PORTAL_TYPES.PARENT,
          PORTAL_TYPES.TEACHER,
          PORTAL_TYPES.SUPER_ADMIN,
          PORTAL_TYPES.SUB_ADMIN,
        ];
      }

      /* =====================================================
         EVENTS
      ===================================================== */

      else if (
        key ===
        "abpsEvents"
      ) {
        studentId =
          item?.studentId ||
          null;

        targetRoles = [
          PORTAL_TYPES.STUDENT,
          PORTAL_TYPES.PARENT,
          PORTAL_TYPES.TEACHER,
          PORTAL_TYPES.SUPER_ADMIN,
          PORTAL_TYPES.SUB_ADMIN,
        ];
      }

      /* =====================================================
         NEWS
      ===================================================== */

      else if (
        key ===
        "abpsNews"
      ) {
        targetRoles = [
          PORTAL_TYPES.STUDENT,
          PORTAL_TYPES.PARENT,
          PORTAL_TYPES.TEACHER,
          PORTAL_TYPES.SUPER_ADMIN,
          PORTAL_TYPES.SUB_ADMIN,
        ];
      }

      /* =====================================================
         TEACHER MANAGEMENT

         Student/Parent ko teacher add/delete/update
         ka management notification nahi.
      ===================================================== */

      else if (
        key ===
        "abpsTeachers"
      ) {
        teacherId =
          getTeacherId(item);

        targetRoles = [
          PORTAL_TYPES.SUPER_ADMIN,
          PORTAL_TYPES.SUB_ADMIN,
        ];
      }

      /* =====================================================
         MESSAGE
      ===================================================== */

      const message =
        itemName
          ? `${module.title} "${itemName}" has been ${actionLabel}.`
          : `${module.title} has been ${actionLabel}.`;

      return addPortalNotification({
        section:
          module.section,

        title:
          module.title,

        message,

        action:
          cleanAction,

        studentId,

        parentId,

        teacherId,

        className,

        sectionName,

        targetRoles,

        actor:
          getCurrentActor(),

        sourceKey:
          key,

        sourceItemId:
          item?.id ||
          itemId ||
          null,
      });
    } catch (error) {
      console.error(
        "Create notification from data change error:",
        error
      );

      return null;
    }
  };

/* =========================================================
   READER KEY
========================================================= */

export const createPortalReaderKey = (
  role,
  userId
) =>
  `${String(role || "")}:${String(
    userId || ""
  )}`;

/* =========================================================
   STUDENT TARGET CHECK
========================================================= */

const isForStudent = (
  notification,
  userInfo
) => {
  const currentStudentId =
    userInfo?.studentId ||
    userInfo?.userId ||
    "";

  if (!currentStudentId) {
    return false;
  }

  /*
    Exact student notification.
  */

  if (
    notification?.studentId
  ) {
    return sameId(
      notification.studentId,
      currentStudentId
    );
  }

  /*
    Multiple exact students.
  */

  if (
    Array.isArray(
      notification?.studentIds
    ) &&
    notification.studentIds.length >
      0
  ) {
    return notification.studentIds.some(
      (id) =>
        sameId(
          id,
          currentStudentId
        )
    );
  }

  /*
    Student profile notification
    without studentId must NEVER
    broadcast.
  */

  if (
    notification?.section ===
    "students"
  ) {
    return false;
  }

  /*
    Personal modules must NEVER
    broadcast without studentId.
  */

  if (
    [
      "attendance",
      "results",
      "fees",
    ].includes(
      notification?.section
    )
  ) {
    return false;
  }

  /*
    Class target.
  */

  if (
    notification?.className
  ) {
    const currentClass =
      userInfo?.className ||
      userInfo?.class ||
      "";

    if (!currentClass) {
      return false;
    }

    if (
      normalizeClass(
        notification.className
      ) !==
      normalizeClass(
        currentClass
      )
    ) {
      return false;
    }
  }

  /*
    Section target.
  */

  if (
    notification?.sectionName
  ) {
    const currentSection =
      userInfo?.section ||
      "";

    if (!currentSection) {
      return false;
    }

    if (
      normalize(
        notification.sectionName
      ) !==
      normalize(
        currentSection
      )
    ) {
      return false;
    }
  }

  /*
    Global assignment/notice/event/news.
  */

  return true;
};

/* =========================================================
   PARENT TARGET CHECK
========================================================= */

const isForParent = (
  notification,
  userInfo
) => {
  const currentParentId =
    userInfo?.parentId ||
    userInfo?.userId ||
    "";

  const currentStudentId =
    userInfo?.studentId ||
    "";

  const studentIds =
    Array.isArray(
      userInfo?.studentIds
    )
      ? userInfo.studentIds
      : currentStudentId
      ? [currentStudentId]
      : [];

  if (!currentParentId) {
    return false;
  }

  /*
    Exact parent notification.
  */

  if (
    notification?.parentId
  ) {
    return sameId(
      notification.parentId,
      currentParentId
    );
  }

  /*
    Exact child notification.
  */

  if (
    notification?.studentId
  ) {
    if (
      studentIds.length === 0
    ) {
      return false;
    }

    return studentIds.some(
      (id) =>
        sameId(
          id,
          notification.studentId
        )
    );
  }

  /*
    Multiple children target.
  */

  if (
    Array.isArray(
      notification?.studentIds
    ) &&
    notification.studentIds.length >
      0
  ) {
    return notification.studentIds.some(
      (notificationStudentId) =>
        studentIds.some(
          (myStudentId) =>
            sameId(
              notificationStudentId,
              myStudentId
            )
        )
    );
  }

  /*
    Parent profile update without
    parentId must never broadcast.
  */

  if (
    notification?.section ===
    "parents"
  ) {
    return false;
  }

  /*
    Student profile update without
    studentId must never broadcast.
  */

  if (
    notification?.section ===
    "students"
  ) {
    return false;
  }

  /*
    Personal child data without
    studentId must never broadcast.
  */

  if (
    [
      "attendance",
      "results",
      "fees",
    ].includes(
      notification?.section
    )
  ) {
    return false;
  }

  /*
    Class target.
  */

  if (
    notification?.className
  ) {
    const currentClass =
      userInfo?.className ||
      userInfo?.class ||
      "";

    if (!currentClass) {
      return false;
    }

    if (
      normalizeClass(
        notification.className
      ) !==
      normalizeClass(
        currentClass
      )
    ) {
      return false;
    }
  }

  /*
    Section target.
  */

  if (
    notification?.sectionName
  ) {
    const currentSection =
      userInfo?.section ||
      "";

    if (!currentSection) {
      return false;
    }

    if (
      normalize(
        notification.sectionName
      ) !==
      normalize(
        currentSection
      )
    ) {
      return false;
    }
  }

  /*
    Global notice/event/assignment/news.
  */

  return true;
};

/* =========================================================
   TEACHER TARGET CHECK
========================================================= */

const isForTeacher = (
  notification,
  userInfo
) => {
  if (
    notification?.teacherId
  ) {
    const currentTeacherId =
      userInfo?.teacherId ||
      userInfo?.userId ||
      "";

    if (!currentTeacherId) {
      return false;
    }

    return sameId(
      notification.teacherId,
      currentTeacherId
    );
  }

  return true;
};

/* =========================================================
   IS NOTIFICATION FOR USER
========================================================= */

export const isNotificationForUser = (
  notification,
  userInfo = {}
) => {
  if (
    !notification ||
    !userInfo
  ) {
    return false;
  }

  const role =
    userInfo.role;

  if (!role) {
    return false;
  }

  /*
    Role must be targeted.
  */

  const roles =
    Array.isArray(
      notification.targetRoles
    )
      ? notification.targetRoles
      : [];

  if (
    roles.length > 0 &&
    !roles.includes(role)
  ) {
    return false;
  }

  /*
    STUDENT
  */

  if (
    role ===
    PORTAL_TYPES.STUDENT
  ) {
    return isForStudent(
      notification,
      userInfo
    );
  }

  /*
    PARENT
  */

  if (
    role ===
    PORTAL_TYPES.PARENT
  ) {
    return isForParent(
      notification,
      userInfo
    );
  }

  /*
    TEACHER
  */

  if (
    role ===
    PORTAL_TYPES.TEACHER
  ) {
    return isForTeacher(
      notification,
      userInfo
    );
  }

  /*
    Admin/Sub Admin
  */

  if (
    role ===
      PORTAL_TYPES.SUPER_ADMIN ||
    role ===
      PORTAL_TYPES.SUB_ADMIN
  ) {
    return true;
  }

  return false;
};

/* =========================================================
   GET NOTIFICATIONS FOR USER
========================================================= */

export const getNotificationsForUser = (
  userInfo
) => {
  try {
    return getPortalNotifications()
      .filter((notification) =>
        isNotificationForUser(
          notification,
          userInfo
        )
      )
      .sort(
        (a, b) =>
          new Date(
            b.createdAt || 0
          ).getTime() -
          new Date(
            a.createdAt || 0
          ).getTime()
      );
  } catch (error) {
    console.error(
      "Get user notifications error:",
      error
    );

    return [];
  }
};

/* =========================================================
   CHECK READ
========================================================= */

export const isPortalNotificationRead = (
  notification,
  role,
  userId
) => {
  if (!notification) {
    return true;
  }

  const readerKey =
    createPortalReaderKey(
      role,
      userId
    );

  return Array.isArray(
    notification.readBy
  )
    ? notification.readBy.includes(
        readerKey
      )
    : false;
};

/* =========================================================
   GET UNREAD
========================================================= */

export const getUnreadNotificationsForUser =
  (userInfo) => {
    if (
      !userInfo?.role ||
      !userInfo?.userId
    ) {
      return [];
    }

    const notifications =
      getNotificationsForUser(
        userInfo
      );

    const readerKey =
      createPortalReaderKey(
        userInfo.role,
        userInfo.userId
      );

    return notifications.filter(
      (notification) =>
        !(
          Array.isArray(
            notification.readBy
          ) &&
          notification.readBy.includes(
            readerKey
          )
        )
    );
  };

/* =========================================================
   SECTION HAS UNREAD
========================================================= */

export const hasUnreadNotificationForSection =
  (
    userInfo,
    section
  ) => {
    if (
      !userInfo ||
      !section
    ) {
      return false;
    }

    return getUnreadNotificationsForUser(
      userInfo
    ).some(
      (notification) =>
        normalize(
          notification.section
        ) ===
        normalize(section)
    );
  };

/* =========================================================
   MARK ONE READ
========================================================= */

export const markPortalNotificationRead = (
  notificationId,
  role,
  userId
) => {
  if (
    !notificationId ||
    !role ||
    !userId
  ) {
    return false;
  }

  const notifications =
    getPortalNotifications();

  const readerKey =
    createPortalReaderKey(
      role,
      userId
    );

  let changed = false;

  const updated =
    notifications.map(
      (notification) => {
        if (
          String(
            notification.id
          ) !==
          String(
            notificationId
          )
        ) {
          return notification;
        }

        const readBy =
          Array.isArray(
            notification.readBy
          )
            ? notification.readBy
            : [];

        if (
          readBy.includes(
            readerKey
          )
        ) {
          return notification;
        }

        changed = true;

        return {
          ...notification,

          readBy: [
            ...readBy,
            readerKey,
          ],
        };
      }
    );

  if (changed) {
    savePortalNotifications(
      updated
    );
  }

  return changed;
};

/* =========================================================
   MARK SECTION READ
========================================================= */

export const markNotificationSectionRead =
  (
    userInfo,
    section
  ) => {
    if (
      !userInfo?.role ||
      !userInfo?.userId ||
      !section
    ) {
      return false;
    }

    const notifications =
      getPortalNotifications();

    const readerKey =
      createPortalReaderKey(
        userInfo.role,
        userInfo.userId
      );

    let changed = false;

    const updated =
      notifications.map(
        (notification) => {
          /*
            Only notification actually
            belonging to this user.
          */

          if (
            !isNotificationForUser(
              notification,
              userInfo
            )
          ) {
            return notification;
          }

          if (
            normalize(
              notification.section
            ) !==
            normalize(section)
          ) {
            return notification;
          }

          const readBy =
            Array.isArray(
              notification.readBy
            )
              ? notification.readBy
              : [];

          if (
            readBy.includes(
              readerKey
            )
          ) {
            return notification;
          }

          changed = true;

          return {
            ...notification,

            readBy: [
              ...readBy,
              readerKey,
            ],
          };
        }
      );

    if (changed) {
      savePortalNotifications(
        updated
      );
    }

    return changed;
  };

/* =========================================================
   MARK ALL READ

   IMPORTANT:
   Only notifications actually visible
   to this exact user are marked.
========================================================= */

export const markAllPortalNotificationsRead =
  (userInfo) => {
    if (
      !userInfo?.role ||
      !userInfo?.userId
    ) {
      return false;
    }

    const notifications =
      getPortalNotifications();

    const readerKey =
      createPortalReaderKey(
        userInfo.role,
        userInfo.userId
      );

    let changed = false;

    const updated =
      notifications.map(
        (notification) => {
          if (
            !isNotificationForUser(
              notification,
              userInfo
            )
          ) {
            return notification;
          }

          const readBy =
            Array.isArray(
              notification.readBy
            )
              ? notification.readBy
              : [];

          if (
            readBy.includes(
              readerKey
            )
          ) {
            return notification;
          }

          changed = true;

          return {
            ...notification,

            readBy: [
              ...readBy,
              readerKey,
            ],
          };
        }
      );

    if (changed) {
      savePortalNotifications(
        updated
      );
    }

    return changed;
  };

/* =========================================================
   SINGLETON LISTENER
========================================================= */

let notificationListenerStarted =
  false;

export const startPortalNotificationListener =
  () => {
    if (
      notificationListenerStarted
    ) {
      return;
    }

    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    notificationListenerStarted =
      true;

    window.addEventListener(
      ABPS_PORTAL_DATA_CHANGED_EVENT,
      (event) => {
        createNotificationFromDataChange(
          event?.detail || {}
        );
      }
    );
  };