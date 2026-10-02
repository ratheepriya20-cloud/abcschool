/* =========================================================
   AB PUBLIC SCHOOL
   PRIVATE CHAT SYSTEM

   STUDENT  <-> TEACHER
   PARENT   <-> TEACHER

   WhatsApp style:
   - two way messaging
   - unread count
   - readBy tracking
   - separate private conversations
   ========================================================= */

export const TEACHER_CHAT_KEY =
  "abpsTeacherPrivateChats";

export const TEACHER_CHAT_EVENT =
  "abpsTeacherChatUpdated";

export const CHAT_TYPES = {
  STUDENT_TEACHER:
    "student-teacher",

  PARENT_TEACHER:
    "parent-teacher",
};

export const SENDER_TYPES = {
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
};

/* =========================================================
   HELPERS
========================================================= */

const createId = (
  prefix = "CHAT"
) => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

const clean = (value) =>
  String(value ?? "").trim();

const same = (a, b) =>
  clean(a) === clean(b);

const getStudentId = (
  student
) =>
  student?.id ||
  student?.studentId ||
  student?.admissionNo ||
  "";

const getTeacherId = (
  teacher
) =>
  teacher?.id ||
  teacher?.teacherId ||
  teacher?.employeeId ||
  "";

const getParentId = (
  parent
) =>
  parent?.id ||
  parent?.parentId ||
  "";

/* =========================================================
   READ / WRITE
========================================================= */

export const getTeacherChats =
  () => {
    try {
      const saved =
        localStorage.getItem(
          TEACHER_CHAT_KEY
        );

      if (!saved) {
        return [];
      }

      const parsed =
        JSON.parse(saved);

      return Array.isArray(
        parsed
      )
        ? parsed
        : [];
    } catch (error) {
      console.error(
        "Chat read error:",
        error
      );

      return [];
    }
  };

const saveTeacherChats = (
  chats
) => {
  try {
    localStorage.setItem(
      TEACHER_CHAT_KEY,
      JSON.stringify(chats)
    );

    window.dispatchEvent(
      new CustomEvent(
        TEACHER_CHAT_EVENT,
        {
          detail: {
            key:
              TEACHER_CHAT_KEY,
          },
        }
      )
    );

    window.dispatchEvent(
      new CustomEvent(
        "abpsDataUpdated",
        {
          detail: {
            key:
              TEACHER_CHAT_KEY,
          },
        }
      )
    );

    return chats;
  } catch (error) {
    console.error(
      "Chat save error:",
      error
    );

    return [];
  }
};

/* =========================================================
   FIND STUDENT <-> TEACHER CHAT
========================================================= */

export const findStudentTeacherChat =
  (
    studentId,
    teacherId
  ) => {
    return (
      getTeacherChats().find(
        (chat) =>
          chat.type ===
            CHAT_TYPES.STUDENT_TEACHER &&
          same(
            chat.studentId,
            studentId
          ) &&
          same(
            chat.teacherId,
            teacherId
          )
      ) || null
    );
  };

/* =========================================================
   FIND PARENT <-> TEACHER CHAT
========================================================= */

export const findParentTeacherChat =
  (
    parentId,
    teacherId,
    studentId
  ) => {
    return (
      getTeacherChats().find(
        (chat) =>
          chat.type ===
            CHAT_TYPES.PARENT_TEACHER &&
          same(
            chat.parentId,
            parentId
          ) &&
          same(
            chat.teacherId,
            teacherId
          ) &&
          (
            !studentId ||
            same(
              chat.studentId,
              studentId
            )
          )
      ) || null
    );
  };

/* =========================================================
   CREATE / GET STUDENT CHAT
========================================================= */

export const getOrCreateStudentTeacherChat =
  (
    student,
    teacher
  ) => {
    const studentId =
      getStudentId(student);

    const teacherId =
      getTeacherId(teacher);

    if (
      !studentId ||
      !teacherId
    ) {
      console.error(
        "Student/Teacher ID missing"
      );

      return null;
    }

    const existing =
      findStudentTeacherChat(
        studentId,
        teacherId
      );

    if (existing) {
      return existing;
    }

    const now =
      new Date().toISOString();

    const chat = {
      id: createId("CHAT"),

      type:
        CHAT_TYPES.STUDENT_TEACHER,

      studentId,
      studentName:
        student?.name ||
        "Student",

      teacherId,
      teacherName:
        teacher?.name ||
        "Teacher",

      className:
        student?.className ||
        student?.class ||
        "",

      section:
        student?.section ||
        "",

      messages: [],

      lastMessage: "",
      lastMessageAt: "",

      createdAt: now,
      updatedAt: now,
    };

    const chats =
      getTeacherChats();

    saveTeacherChats([
      chat,
      ...chats,
    ]);

    return chat;
  };

/* =========================================================
   CREATE / GET PARENT CHAT
========================================================= */

export const getOrCreateParentTeacherChat =
  (
    student,
    parent,
    teacher
  ) => {
    const studentId =
      getStudentId(student);

    const parentId =
      getParentId(parent);

    const teacherId =
      getTeacherId(teacher);

    if (
      !studentId ||
      !parentId ||
      !teacherId
    ) {
      console.error(
        "Student/Parent/Teacher ID missing"
      );

      return null;
    }

    const existing =
      findParentTeacherChat(
        parentId,
        teacherId,
        studentId
      );

    if (existing) {
      return existing;
    }

    const now =
      new Date().toISOString();

    const chat = {
      id: createId("CHAT"),

      type:
        CHAT_TYPES.PARENT_TEACHER,

      studentId,
      studentName:
        student?.name ||
        "Student",

      parentId,
      parentName:
        parent?.name ||
        "Parent",

      teacherId,
      teacherName:
        teacher?.name ||
        "Teacher",

      className:
        student?.className ||
        student?.class ||
        "",

      section:
        student?.section ||
        "",

      messages: [],

      lastMessage: "",
      lastMessageAt: "",

      createdAt: now,
      updatedAt: now,
    };

    const chats =
      getTeacherChats();

    saveTeacherChats([
      chat,
      ...chats,
    ]);

    return chat;
  };

/* =========================================================
   SEND MESSAGE

   Same function teeno use karenge:
   Teacher / Student / Parent
========================================================= */

export const sendTeacherChatMessage =
  (
    chatId,
    {
      senderType,
      senderId,
      senderName,
      message,
    }
  ) => {
    const text =
      clean(message);

    if (
      !chatId ||
      !senderType ||
      !senderId ||
      !text
    ) {
      return null;
    }

    const chats =
      getTeacherChats();

    let createdMessage =
      null;

    const now =
      new Date().toISOString();

    const updated =
      chats.map((chat) => {
        if (
          !same(
            chat.id,
            chatId
          )
        ) {
          return chat;
        }

        createdMessage = {
          id:
            createId("MSG"),

          senderType,

          senderId:
            clean(senderId),

          senderName:
            senderName ||
            "User",

          message: text,

          createdAt: now,

          /*
            Sender ne apna message
            already dekha hua hai.
          */

          readBy: [
            `${senderType}:${clean(
              senderId
            )}`,
          ],
        };

        return {
          ...chat,

          messages: [
            ...(Array.isArray(
              chat.messages
            )
              ? chat.messages
              : []),

            createdMessage,
          ],

          lastMessage: text,
          lastMessageAt:
            now,

          updatedAt: now,
        };
      });

    saveTeacherChats(
      updated
    );

    return createdMessage;
  };

/* =========================================================
   MARK ONE CHAT READ
========================================================= */

export const markTeacherChatRead =
  (
    chatId,
    viewerType,
    viewerId
  ) => {
    if (
      !chatId ||
      !viewerType ||
      !viewerId
    ) {
      return;
    }

    const readerKey =
      `${viewerType}:${clean(
        viewerId
      )}`;

    const chats =
      getTeacherChats();

    let changed = false;

    const updated =
      chats.map((chat) => {
        if (
          !same(
            chat.id,
            chatId
          )
        ) {
          return chat;
        }

        const messages =
          (
            Array.isArray(
              chat.messages
            )
              ? chat.messages
              : []
          ).map(
            (message) => {
              /*
                Apne khud ke sent
                message ko read
                process nahi karna.
              */

              if (
                message.senderType ===
                  viewerType &&
                same(
                  message.senderId,
                  viewerId
                )
              ) {
                return message;
              }

              const readBy =
                Array.isArray(
                  message.readBy
                )
                  ? message.readBy
                  : [];

              if (
                readBy.includes(
                  readerKey
                )
              ) {
                return message;
              }

              changed = true;

              return {
                ...message,

                readBy: [
                  ...readBy,
                  readerKey,
                ],
              };
            }
          );

        return {
          ...chat,
          messages,
        };
      });

    if (changed) {
      saveTeacherChats(
        updated
      );
    }

    return updated;
  };

/* =========================================================
   UNREAD COUNT OF ONE CHAT
========================================================= */

export const getUnreadCountForChat =
  (
    chat,
    viewerType,
    viewerId
  ) => {
    if (
      !chat ||
      !viewerType ||
      !viewerId
    ) {
      return 0;
    }

    const readerKey =
      `${viewerType}:${clean(
        viewerId
      )}`;

    const messages =
      Array.isArray(
        chat.messages
      )
        ? chat.messages
        : [];

    return messages.filter(
      (message) => {
        /*
          Own messages are not
          incoming unread.
        */

        if (
          message.senderType ===
            viewerType &&
          same(
            message.senderId,
            viewerId
          )
        ) {
          return false;
        }

        const readBy =
          Array.isArray(
            message.readBy
          )
            ? message.readBy
            : [];

        return !readBy.includes(
          readerKey
        );
      }
    ).length;
  };

/* =========================================================
   TEACHER CHATS
========================================================= */

export const getChatsForTeacher =
  (teacherId) => {
    return getTeacherChats()
      .filter((chat) =>
        same(
          chat.teacherId,
          teacherId
        )
      )
      .sort(
        (a, b) =>
          new Date(
            b.lastMessageAt ||
              b.updatedAt ||
              0
          ).getTime() -
          new Date(
            a.lastMessageAt ||
              a.updatedAt ||
              0
          ).getTime()
      );
  };

/* =========================================================
   STUDENT CHATS
========================================================= */

export const getChatsForStudent =
  (studentId) => {
    return getTeacherChats()
      .filter(
        (chat) =>
          chat.type ===
            CHAT_TYPES.STUDENT_TEACHER &&
          same(
            chat.studentId,
            studentId
          )
      )
      .sort(
        (a, b) =>
          new Date(
            b.lastMessageAt ||
              b.updatedAt ||
              0
          ).getTime() -
          new Date(
            a.lastMessageAt ||
              a.updatedAt ||
              0
          ).getTime()
      );
  };

/* =========================================================
   PARENT CHATS
========================================================= */

export const getChatsForParent =
  (parentId) => {
    return getTeacherChats()
      .filter(
        (chat) =>
          chat.type ===
            CHAT_TYPES.PARENT_TEACHER &&
          same(
            chat.parentId,
            parentId
          )
      )
      .sort(
        (a, b) =>
          new Date(
            b.lastMessageAt ||
              b.updatedAt ||
              0
          ).getTime() -
          new Date(
            a.lastMessageAt ||
              a.updatedAt ||
              0
          ).getTime()
      );
  };

/* =========================================================
   TOTAL UNREAD
========================================================= */

export const getUnreadTeacherChatCount =
  (
    viewerType,
    viewerId
  ) => {
    if (
      !viewerType ||
      !viewerId
    ) {
      return 0;
    }

    let chats = [];

    if (
      viewerType ===
      SENDER_TYPES.TEACHER
    ) {
      chats =
        getChatsForTeacher(
          viewerId
        );
    }

    if (
      viewerType ===
      SENDER_TYPES.STUDENT
    ) {
      chats =
        getChatsForStudent(
          viewerId
        );
    }

    if (
      viewerType ===
      SENDER_TYPES.PARENT
    ) {
      chats =
        getChatsForParent(
          viewerId
        );
    }

    return chats.reduce(
      (total, chat) =>
        total +
        getUnreadCountForChat(
          chat,
          viewerType,
          viewerId
        ),
      0
    );
  };

/* =========================================================
   CHAT BY ID
========================================================= */

export const getTeacherChatById =
  (chatId) => {
    return (
      getTeacherChats().find(
        (chat) =>
          same(
            chat.id,
            chatId
          )
      ) || null
    );
  };

/* =========================================================
   DELETE CHAT
========================================================= */

export const deleteTeacherChat =
  (chatId) => {
    const chats =
      getTeacherChats().filter(
        (chat) =>
          !same(
            chat.id,
            chatId
          )
      );

    saveTeacherChats(
      chats
    );

    return chats;
  };