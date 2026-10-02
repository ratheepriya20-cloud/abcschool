import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FaComments,
  FaPaperPlane,
  FaSearch,
  FaUserGraduate,
  FaUsers,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";

import {
  getLoggedInTeacher,
} from "../../data/teacherAuthData";

import {
  getStudents,
} from "../../data/studentsData";

import {
  getParents,
} from "../../data/parentsData";

import {
  CHAT_TYPES,
  SENDER_TYPES,
  getChatsForTeacher,
  getOrCreateStudentTeacherChat,
  getOrCreateParentTeacherChat,
  sendTeacherChatMessage,
  markTeacherChatRead,
  getUnreadCountForChat,
} from "../../data/teacherChatData";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";
import "./TeacherMessages.css";

const normal = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const classValue = (
  value
) =>
  normal(value).replace(
    /^class\s*/,
    ""
  );

const TeacherMessages = ({
  initialStudent = null,
  initialType = "student",
}) => {
  const [teacher, setTeacher] =
    useState(
      getLoggedInTeacher()
    );

  const [students, setStudents] =
    useState([]);

  const [parents, setParents] =
    useState([]);

  const [chats, setChats] =
    useState([]);

  const [tab, setTab] =
    useState(
      initialType === "parent"
        ? "parent"
        : "student"
    );

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  const [
    selectedChat,
    setSelectedChat,
  ] = useState(null);

  const [search, setSearch] =
    useState("");

  const [text, setText] =
    useState("");

  const bottomRef =
    useRef(null);

  const teacherId =
    teacher?.id ||
    teacher?.teacherId ||
    teacher?.employeeId ||
    "";

  /* ===============================
     LOAD
  =============================== */

  const refresh = useCallback(
    () => {
      const current =
        getLoggedInTeacher();

      setTeacher(current);

      setStudents(
        getStudents() || []
      );

      setParents(
        getParents() || []
      );

      const id =
        current?.id ||
        current?.teacherId ||
        current?.employeeId;

      if (id) {
        setChats(
          getChatsForTeacher(
            id
          )
        );
      }
    },
    []
  );

  useEffect(() => {
    refresh();

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

  /* ===============================
     ASSIGNED STUDENTS
  =============================== */

  const myStudents =
    useMemo(() => {
      const assigned =
        Array.isArray(
          teacher?.classes
        )
          ? teacher.classes
          : [];

      return students.filter(
        (student) =>
          assigned.some(
            (item) => {
              const c =
                classValue(
                  item.className ||
                    item.class
                ) ===
                classValue(
                  student.className ||
                    student.class
                );

              const s =
                !item.section ||
                normal(
                  item.section
                ) ===
                  normal(
                    student.section
                  );

              return c && s;
            }
          )
      );
    }, [
      students,
      teacher,
    ]);

  /* ===============================
     PARENT
  =============================== */

  const parentOf = useCallback(
    (student) => {
      return (
        parents.find(
          (parent) =>
            String(
              parent.id ||
                parent.parentId
            ) ===
            String(
              student.parentId
            )
        ) ||
        parents.find(
          (parent) =>
            String(
              parent.studentId
            ) ===
            String(student.id)
        ) ||
        null
      );
    },
    [parents]
  );

  /* ===============================
     CHAT FINDER
  =============================== */

  const existingChat = (
    student,
    type
  ) => {
    const expected =
      type === "parent"
        ? CHAT_TYPES.PARENT_TEACHER
        : CHAT_TYPES.STUDENT_TEACHER;

    return (
      chats.find(
        (chat) =>
          chat.type ===
            expected &&
          String(
            chat.studentId
          ) ===
            String(
              student.id
            )
      ) || null
    );
  };

  /* ===============================
     CONTACTS
  =============================== */

  const contacts =
    useMemo(() => {
      return myStudents
        .map((student) => {
          const parent =
            parentOf(student);

          if (
            tab === "parent" &&
            !parent
          ) {
            return null;
          }

          const chat =
            existingChat(
              student,
              tab
            );

          const unread =
            chat
              ? getUnreadCountForChat(
                  chat,
                  SENDER_TYPES.TEACHER,
                  teacherId
                )
              : 0;

          return {
            student,
            parent,
            chat,
            unread,
          };
        })
        .filter(Boolean)
        .filter((item) => {
          const name =
            tab === "parent"
              ? item.parent?.name
              : item.student
                  ?.name;

          return normal(
            name
          ).includes(
            normal(search)
          );
        });
    }, [
      myStudents,
      parents,
      chats,
      tab,
      search,
      teacherId,
      parentOf,
    ]);

  /* ===============================
     OPEN CHAT
  =============================== */

  const openChat = (
    student
  ) => {
    let chat;

    if (tab === "parent") {
      const parent =
        parentOf(student);

      if (!parent) {
        return;
      }

      chat =
        getOrCreateParentTeacherChat(
          student,
          parent,
          teacher
        );
    } else {
      chat =
        getOrCreateStudentTeacherChat(
          student,
          teacher
        );
    }

    if (!chat) {
      return;
    }

    /*
      Actual chat open =
      incoming messages read.
    */

    markTeacherChatRead(
      chat.id,
      SENDER_TYPES.TEACHER,
      teacherId
    );

    const latestChats =
      getChatsForTeacher(
        teacherId
      );

    const latest =
      latestChats.find(
        (item) =>
          item.id === chat.id
      );

    setChats(
      latestChats
    );

    setSelectedStudent(
      student
    );

    setSelectedChat(
      latest || chat
    );
  };

  /* ===============================
     NOTIFICATION SE OPEN
  =============================== */

  useEffect(() => {
    if (
      !initialStudent ||
      !teacherId
    ) {
      return;
    }

    const type =
      initialType === "parent"
        ? "parent"
        : "student";

    setTab(type);

    let chat;

    if (type === "parent") {
      const parent =
        parentOf(
          initialStudent
        );

      if (!parent) return;

      chat =
        getOrCreateParentTeacherChat(
          initialStudent,
          parent,
          teacher
        );
    } else {
      chat =
        getOrCreateStudentTeacherChat(
          initialStudent,
          teacher
        );
    }

    if (!chat) return;

    markTeacherChatRead(
      chat.id,
      SENDER_TYPES.TEACHER,
      teacherId
    );

    const latestChats =
      getChatsForTeacher(
        teacherId
      );

    setChats(
      latestChats
    );

    setSelectedStudent(
      initialStudent
    );

    setSelectedChat(
      latestChats.find(
        (item) =>
          item.id === chat.id
      ) || chat
    );
  }, [
    initialStudent,
    initialType,
    teacherId,
    teacher,
    parentOf,
  ]);

  /* ===============================
     KEEP OPEN CHAT LIVE
  =============================== */

  useEffect(() => {
    if (
      !selectedChat ||
      !teacherId
    ) {
      return;
    }

    const latest =
      getChatsForTeacher(
        teacherId
      ).find(
        (item) =>
          item.id ===
          selectedChat.id
      );

    if (!latest) {
      return;
    }

    const unread =
      getUnreadCountForChat(
        latest,
        SENDER_TYPES.TEACHER,
        teacherId
      );

    /*
      Chat already open hai,
      so new incoming message
      seen/read.
    */

    if (unread > 0) {
      markTeacherChatRead(
        latest.id,
        SENDER_TYPES.TEACHER,
        teacherId
      );

      const reread =
        getChatsForTeacher(
          teacherId
        ).find(
          (item) =>
            item.id ===
            latest.id
        );

      setSelectedChat(
        reread || latest
      );
    } else {
      setSelectedChat(
        latest
      );
    }
  }, [
    chats,
    selectedChat?.id,
    teacherId,
  ]);

  /* ===============================
     SEND TEACHER MESSAGE
  =============================== */

  const send = (event) => {
    event.preventDefault();

    const message =
      text.trim();

    if (
      !message ||
      !selectedChat
    ) {
      return;
    }

    sendTeacherChatMessage(
      selectedChat.id,
      {
        senderType:
          SENDER_TYPES.TEACHER,

        senderId:
          teacherId,

        senderName:
          teacher?.name ||
          "Teacher",

        message,
      }
    );

    setText("");

    const latestChats =
      getChatsForTeacher(
        teacherId
      );

    setChats(
      latestChats
    );

    setSelectedChat(
      latestChats.find(
        (item) =>
          item.id ===
          selectedChat.id
      ) || selectedChat
    );
  };

  /* ===============================
     SCROLL
  =============================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    selectedChat?.messages
      ?.length,
  ]);

  const currentParent =
    selectedStudent
      ? parentOf(
          selectedStudent
        )
      : null;

  const currentName =
    tab === "parent"
      ? currentParent?.name
      : selectedStudent?.name;

  return (
    <div className="teacherMsg-page">

      <div className="teacherMsg-top">

        <div>
          <span>
            COMMUNICATION HUB
          </span>

          <h1>
            Private Conversations
          </h1>

          <p>
            Real-time private
            conversations with students
            and parents.
          </p>
        </div>

        <FaComments />

      </div>

      <div className="teacherMsg-layout">

        {/* LEFT */}

        <aside className="teacherMsg-sidebar">

          <div className="teacherMsg-tabs">

            <button
              className={
                tab === "student"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setTab(
                  "student"
                );

                setSelectedChat(
                  null
                );

                setSelectedStudent(
                  null
                );
              }}
            >
              <FaUserGraduate />

              Students
            </button>

            <button
              className={
                tab === "parent"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setTab(
                  "parent"
                );

                setSelectedChat(
                  null
                );

                setSelectedStudent(
                  null
                );
              }}
            >
              <FaUsers />

              Parents
            </button>

          </div>

          <div className="teacherMsg-search">
            <FaSearch />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search conversation..."
            />
          </div>

          <div className="teacherMsg-list">

            {contacts.map(
              ({
                student,
                parent,
                chat,
                unread,
              }) => {
                const name =
                  tab === "parent"
                    ? parent?.name
                    : student.name;

                return (
                  <button
                    key={`${tab}-${student.id}`}
                    className={`teacherMsg-person ${
                      selectedStudent
                        ?.id ===
                      student.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      openChat(
                        student
                      )
                    }
                  >

                    <div className="teacherMsg-avatar">
                      {name?.[0]}
                    </div>

                    <div className="teacherMsg-personInfo">

                      <div>
                        <strong>
                          {name}
                        </strong>

                        {unread >
                          0 && (
                          <b>
                            {unread}
                          </b>
                        )}
                      </div>

                      <span>
                        {tab ===
                        "parent"
                          ? `${student.name}'s Parent`
                          : `${
                              student.className ||
                              ""
                            } ${
                              student.section ||
                              ""
                            }`}
                      </span>

                      {chat
                        ?.lastMessage && (
                        <p
                          className={
                            unread
                              ? "unread"
                              : ""
                          }
                        >
                          {
                            chat.lastMessage
                          }
                        </p>
                      )}

                    </div>

                    {unread > 0 && (
                      <i />
                    )}

                  </button>
                );
              }
            )}

          </div>

        </aside>

        {/* CHAT */}

        <main className="teacherMsg-chat">

          {selectedChat ? (
            <>

              <header className="teacherMsg-chatHeader">

                <button
                  className="teacherMsg-back"
                  onClick={() => {
                    setSelectedChat(
                      null
                    );

                    setSelectedStudent(
                      null
                    );
                  }}
                >
                  <FaArrowLeft />
                </button>

                <div className="teacherMsg-avatar">
                  {currentName?.[0]}
                </div>

                <div>
                  <h3>
                    {currentName}
                  </h3>

                  <p>
                    {tab === "parent"
                      ? `Parent of ${selectedStudent?.name}`
                      : `${selectedStudent?.className || ""} ${selectedStudent?.section || ""}`}
                  </p>
                </div>

                <span className="teacherMsg-private">
                  <FaLock />
                  Private
                </span>

              </header>

              <section className="teacherMsg-conversation">

                {(selectedChat.messages ||
                  []).map(
                  (message) => {
                    const mine =
                      message.senderType ===
                        SENDER_TYPES.TEACHER &&
                      String(
                        message.senderId
                      ) ===
                        String(
                          teacherId
                        );

                    return (
                      <div
                        key={
                          message.id
                        }
                        className={`teacherMsg-row ${
                          mine
                            ? "mine"
                            : ""
                        }`}
                      >

                        <div className="teacherMsg-bubble">

                          {!mine && (
                            <small>
                              {
                                message.senderName
                              }
                            </small>
                          )}

                          <p>
                            {
                              message.message
                            }
                          </p>

                          <time>
                            {new Date(
                              message.createdAt
                            ).toLocaleTimeString(
                              "en-IN",
                              {
                                hour:
                                  "2-digit",
                                minute:
                                  "2-digit",
                              }
                            )}
                          </time>

                        </div>

                      </div>
                    );
                  }
                )}

                <div
                  ref={bottomRef}
                />

              </section>

              <form
                className="teacherMsg-compose"
                onSubmit={send}
              >

                <input
                  value={text}
                  onChange={(e) =>
                    setText(
                      e.target.value
                    )
                  }
                  placeholder={`Message ${currentName || ""}`}
                />

                <button
                  disabled={
                    !text.trim()
                  }
                >
                  <FaPaperPlane />
                  <span>Send</span>
                </button>

              </form>

            </>
          ) : (
            <div className="teacherMsg-empty">

              <FaComments />

              <h2>
                Start a conversation
              </h2>

              <p>
                Select a student or
                parent from the left.
              </p>

            </div>
          )}

        </main>

      </div>

    </div>
  );
};

export default TeacherMessages;