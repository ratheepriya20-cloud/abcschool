import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FaArrowLeft,
  FaCheckDouble,
  FaComments,
  FaPaperPlane,
  FaUserTie,
} from "react-icons/fa";

import {
  SENDER_TYPES,
  getChatsForParent,
  getOrCreateParentTeacherChat,
  sendTeacherChatMessage,
  markTeacherChatRead,
  getUnreadCountForChat,
} from "../../data/teacherChatData";

import "./ParentTeacherChat.css";

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

const formatTime = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDay = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getTeacherId = (teacher) =>
  teacher?.id ||
  teacher?.teacherId ||
  teacher?.employeeId ||
  "";

const ParentTeacherChat = ({
  parent,
  student,
  teachers = [],
}) => {
  const [chats, setChats] = useState([]);

  const [selectedTeacher, setSelectedTeacher] =
    useState(null);

  const [selectedChat, setSelectedChat] =
    useState(null);

  const [text, setText] = useState("");

  const [mobileChatOpen, setMobileChatOpen] =
    useState(false);

  const [version, setVersion] =
    useState(0);

  const bottomRef = useRef(null);

  /* =====================================================
     IDS
  ===================================================== */

  const parentId =
    parent?.id ||
    parent?.parentId ||
    "";

  const studentId =
    student?.id ||
    student?.studentId ||
    student?.admissionNo ||
    "";

  /* =====================================================
     REFRESH CHATS
  ===================================================== */

  const refreshChats = useCallback(() => {
    if (!parentId) {
      setChats([]);
      return;
    }

    const latest =
      getChatsForParent(parentId) || [];

    setChats(latest);

    setVersion(
      (value) => value + 1
    );

    /*
      Agar conversation already open hai,
      teacher ka latest reply bhi isi waqt
      selectedChat me update hoga.
    */

    setSelectedChat((currentChat) => {
      if (!currentChat) {
        return currentChat;
      }

      return (
        latest.find(
          (chat) =>
            chat.id === currentChat.id
        ) || currentChat
      );
    });
  }, [parentId]);

  /* =====================================================
     FIRST LOAD
  ===================================================== */

  useEffect(() => {
    refreshChats();
  }, [refreshChats]);

  /* =====================================================
     LIVE TEACHER REPLY

     teacherChatData.js message save karte waqt
     abpsTeacherChatUpdated dispatch karta hai.

     Isliye Teacher reply karte hi Parent side
     automatically refresh hogi.
  ===================================================== */

  useEffect(() => {
    const handleChatUpdate = () => {
      refreshChats();
    };

    window.addEventListener(
      "abpsTeacherChatUpdated",
      handleChatUpdate
    );

    window.addEventListener(
      "abpsDataUpdated",
      handleChatUpdate
    );

    window.addEventListener(
      "storage",
      handleChatUpdate
    );

    return () => {
      window.removeEventListener(
        "abpsTeacherChatUpdated",
        handleChatUpdate
      );

      window.removeEventListener(
        "abpsDataUpdated",
        handleChatUpdate
      );

      window.removeEventListener(
        "storage",
        handleChatUpdate
      );
    };
  }, [refreshChats]);

  /* =====================================================
     FILTER MY TEACHERS
  ===================================================== */

  const myTeachers = useMemo(() => {
    if (!Array.isArray(teachers)) {
      return [];
    }

    return teachers.filter((teacher) => {
      const status =
        normalize(
          teacher?.status || "active"
        );

      if (
        status &&
        status !== "active"
      ) {
        return false;
      }

      /*
        Dashboard already myTeachers bhej raha hai,
        phir bhi yahan safety filter hai.
      */

      if (
        !Array.isArray(teacher?.classes) ||
        teacher.classes.length === 0
      ) {
        return true;
      }

      return teacher.classes.some(
        (item) => {
          const teacherClass =
            normalizeClass(
              item?.className ||
                item?.class
            );

          const childClass =
            normalizeClass(
              student?.className ||
                student?.class
            );

          const teacherSection =
            normalize(
              item?.section
            );

          const childSection =
            normalize(
              student?.section
            );

          const classMatches =
            !teacherClass ||
            teacherClass ===
              childClass;

          const sectionMatches =
            !teacherSection ||
            teacherSection ===
              childSection;

          return (
            classMatches &&
            sectionMatches
          );
        }
      );
    });
  }, [
    teachers,
    student,
  ]);

  /* =====================================================
     FIND EXISTING CHAT
  ===================================================== */

  const getTeacherChat =
    useCallback(
      (teacher) => {
        const teacherId =
          getTeacherId(teacher);

        if (!teacherId) {
          return null;
        }

        return (
          chats.find(
            (chat) =>
              normalize(
                chat?.teacherId
              ) ===
                normalize(
                  teacherId
                ) &&
              normalize(
                chat?.studentId
              ) ===
                normalize(
                  studentId
                )
          ) || null
        );
      },
      [
        chats,
        studentId,
      ]
    );

  /* =====================================================
     TEACHER LIST DATA
  ===================================================== */

  const teacherRows = useMemo(() => {
    return myTeachers
      .map((teacher) => {
        const chat =
          getTeacherChat(teacher);

        const unread = chat
          ? getUnreadCountForChat(
              chat,
              SENDER_TYPES.PARENT,
              parentId
            )
          : 0;

        return {
          teacher,
          chat,
          unread,
        };
      })
      .sort((a, b) => {
        const aDate =
          new Date(
            a.chat?.lastMessageAt ||
              a.chat?.updatedAt ||
              0
          ).getTime();

        const bDate =
          new Date(
            b.chat?.lastMessageAt ||
              b.chat?.updatedAt ||
              0
          ).getTime();

        return bDate - aDate;
      });
  }, [
    myTeachers,
    getTeacherChat,
    parentId,
    version,
  ]);

  /* =====================================================
     OPEN CHAT
  ===================================================== */

  const openChat = (teacher) => {
    if (
      !parentId ||
      !studentId ||
      !teacher
    ) {
      return;
    }

    /*
      IMPORTANT:
      Current teacherChatData.js ka signature:
      getOrCreateParentTeacherChat(
        student,
        parent,
        teacher
      )
    */

    const chat =
      getOrCreateParentTeacherChat(
        student,
        parent,
        teacher
      );

    if (!chat) {
      return;
    }

    /*
      Conversation actual open hui.
      Ab teacher ke incoming messages read.
    */

    markTeacherChatRead(
      chat.id,
      SENDER_TYPES.PARENT,
      parentId
    );

    const latestChats =
      getChatsForParent(parentId) || [];

    const latestChat =
      latestChats.find(
        (item) =>
          item.id === chat.id
      ) || chat;

    setChats(latestChats);

    setSelectedTeacher(
      teacher
    );

    setSelectedChat(
      latestChat
    );

    setMobileChatOpen(true);

    setVersion(
      (value) => value + 1
    );
  };

  /* =====================================================
     KEEP OPEN CHAT LIVE

     Teacher reply karega:
     chats refresh ->
     yeh effect latest messages lega ->
     selectedChat update ->
     reply turant screen par dikhega.
  ===================================================== */

  useEffect(() => {
    if (
      !selectedChat?.id ||
      !parentId
    ) {
      return;
    }

    const latest =
      getChatsForParent(
        parentId
      ).find(
        (chat) =>
          chat.id ===
          selectedChat.id
      );

    if (!latest) {
      return;
    }

    const unread =
      getUnreadCountForChat(
        latest,
        SENDER_TYPES.PARENT,
        parentId
      );

    /*
      Parent isi chat ko dekh raha hai,
      isliye incoming teacher reply ko read mark.
    */

    if (unread > 0) {
      markTeacherChatRead(
        latest.id,
        SENDER_TYPES.PARENT,
        parentId
      );

      const reread =
        getChatsForParent(
          parentId
        ).find(
          (chat) =>
            chat.id ===
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
    parentId,
  ]);

  /* =====================================================
     SEND PARENT MESSAGE
  ===================================================== */

  const sendMessage = (event) => {
    event.preventDefault();

    const message =
      text.trim();

    if (
      !message ||
      !selectedChat ||
      !parentId
    ) {
      return;
    }

    sendTeacherChatMessage(
      selectedChat.id,
      {
        senderType:
          SENDER_TYPES.PARENT,

        senderId:
          parentId,

        senderName:
          parent?.name ||
          "Parent",

        message,
      }
    );

    setText("");

    const latestChats =
      getChatsForParent(
        parentId
      );

    const latest =
      latestChats.find(
        (chat) =>
          chat.id ===
          selectedChat.id
      );

    setChats(
      latestChats
    );

    setSelectedChat(
      latest ||
        selectedChat
    );

    setVersion(
      (value) => value + 1
    );
  };

  /* =====================================================
     AUTO SCROLL
  ===================================================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    selectedChat?.messages?.length,
  ]);

  /* =====================================================
     SELECT FIRST EXISTING CONVERSATION

     Teacher ne pehle reply kiya hua hai to Parent ko
     blank panel nahi milega. Latest existing conversation
     automatically open ho jayegi.
  ===================================================== */

  useEffect(() => {
    if (
      selectedChat ||
      teacherRows.length === 0
    ) {
      return;
    }

    const existing =
      teacherRows.find(
        (item) =>
          item.chat
      );

    if (existing) {
      openChat(
        existing.teacher
      );
    }
  }, [
    teacherRows,
    selectedChat,
  ]);

  /* =====================================================
     MESSAGES
  ===================================================== */

  const messages =
    selectedChat?.messages || [];

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <div className="parentChat-page">

      {/* HERO */}

      <section className="parentChat-hero">

        <div className="parentChat-heroContent">

          <span className="parentChat-eyebrow">
            PRIVATE COMMUNICATION
          </span>

          <h2>
            Parent–Teacher Messages
          </h2>

          <p>
            Communicate directly with your
            child's teachers. Teacher replies
            will appear here automatically.
          </p>

        </div>

        <div className="parentChat-heroIcon">
          <FaComments />
        </div>

      </section>

      {/* STUDENT INFO */}

      <section className="parentChat-studentBar">

        <div className="parentChat-studentIcon">
          {student?.name
            ?.charAt(0)
            ?.toUpperCase() || "S"}
        </div>

        <div>
          <span>
            CHAT REGARDING
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
          </p>
        </div>

      </section>

      {/* CHAT LAYOUT */}

      <section className="parentChat-layout">

        {/* =============================
            TEACHER LIST
        ============================= */}

        <aside
          className={`parentChat-sidebar ${
            mobileChatOpen
              ? "mobile-hidden"
              : ""
          }`}
        >

          <div className="parentChat-sidebarHeader">

            <div>
              <span>
                YOUR TEACHERS
              </span>

              <h3>
                Conversations
              </h3>
            </div>

            <span className="parentChat-teacherCount">
              {teacherRows.length}
            </span>

          </div>

          <div className="parentChat-teacherList">

            {teacherRows.length ===
            0 ? (
              <div className="parentChat-emptyTeachers">

                <FaUserTie />

                <h4>
                  No Teachers Found
                </h4>

                <p>
                  Teachers assigned to this
                  class will appear here.
                </p>

              </div>
            ) : (
              teacherRows.map(
                ({
                  teacher,
                  chat,
                  unread,
                }) => {
                  const teacherId =
                    getTeacherId(
                      teacher
                    );

                  const active =
                    normalize(
                      getTeacherId(
                        selectedTeacher
                      )
                    ) ===
                    normalize(
                      teacherId
                    );

                  return (
                    <button
                      type="button"
                      key={
                        teacherId ||
                        teacher?.name
                      }
                      className={`parentChat-teacher ${
                        active
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        openChat(
                          teacher
                        )
                      }
                    >

                      <div className="parentChat-teacherAvatar">
                        {teacher?.name
                          ?.charAt(0)
                          ?.toUpperCase() ||
                          "T"}
                      </div>

                      <div className="parentChat-teacherInfo">

                        <div className="parentChat-teacherNameRow">

                          <strong>
                            {teacher?.name ||
                              "Teacher"}
                          </strong>

                          {chat?.lastMessageAt && (
                            <small>
                              {formatTime(
                                chat.lastMessageAt
                              )}
                            </small>
                          )}

                        </div>

                        <span>
                          {teacher?.designation ||
                            teacher?.subject ||
                            teacher?.department ||
                            "Teacher"}
                        </span>

                        <p
                          className={
                            unread > 0
                              ? "has-unread"
                              : ""
                          }
                        >
                          {chat?.lastMessage ||
                            "Start a private conversation"}
                        </p>

                      </div>

                      {unread > 0 && (
                        <span className="parentChat-unread">
                          {unread > 99
                            ? "99+"
                            : unread}
                        </span>
                      )}

                    </button>
                  );
                }
              )
            )}

          </div>

        </aside>

        {/* =============================
            CONVERSATION
        ============================= */}

        <div
          className={`parentChat-conversation ${
            mobileChatOpen
              ? "mobile-open"
              : ""
          }`}
        >

          {!selectedChat ||
          !selectedTeacher ? (
            <div className="parentChat-welcome">

              <div className="parentChat-welcomeIcon">
                <FaComments />
              </div>

              <span>
                PRIVATE MESSAGING
              </span>

              <h3>
                Select a Teacher
              </h3>

              <p>
                Select one of your child's
                teachers to view previous
                messages or start a new
                conversation.
              </p>

            </div>
          ) : (
            <>

              {/* HEADER */}

              <header className="parentChat-chatHeader">

                <button
                  type="button"
                  className="parentChat-back"
                  onClick={() =>
                    setMobileChatOpen(
                      false
                    )
                  }
                >
                  <FaArrowLeft />
                </button>

                <div className="parentChat-chatAvatar">
                  {selectedTeacher?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "T"}
                </div>

                <div className="parentChat-chatTeacher">

                  <strong>
                    {selectedTeacher?.name ||
                      selectedChat?.teacherName ||
                      "Teacher"}
                  </strong>

                  <span>
                    <i />
                    Teacher • Private Chat
                  </span>

                </div>

                <div className="parentChat-secureLabel">
                  <FaCheckDouble />
                  Secure
                </div>

              </header>

              {/* MESSAGES */}

              <div className="parentChat-messages">

                {messages.length ===
                0 ? (
                  <div className="parentChat-noMessages">

                    <FaComments />

                    <h4>
                      No Messages Yet
                    </h4>

                    <p>
                      Send a message to start
                      this conversation.
                    </p>

                  </div>
                ) : (
                  messages.map(
                    (
                      message,
                      index
                    ) => {
                      const isParent =
                        message?.senderType ===
                        SENDER_TYPES.PARENT;

                      const isTeacher =
                        message?.senderType ===
                        SENDER_TYPES.TEACHER;

                      const previous =
                        messages[
                          index - 1
                        ];

                      const showDate =
                        !previous ||
                        formatDay(
                          previous?.createdAt
                        ) !==
                          formatDay(
                            message?.createdAt
                          );

                      return (
                        <React.Fragment
                          key={
                            message?.id ||
                            index
                          }
                        >

                          {showDate && (
                            <div className="parentChat-dateDivider">
                              <span>
                                {formatDay(
                                  message?.createdAt
                                )}
                              </span>
                            </div>
                          )}

                          <div
                            className={`parentChat-messageRow ${
                              isParent
                                ? "parent"
                                : "teacher"
                            }`}
                          >

                            {isTeacher && (
                              <div className="parentChat-messageAvatar">
                                {selectedTeacher
                                  ?.name
                                  ?.charAt(
                                    0
                                  )
                                  ?.toUpperCase() ||
                                  "T"}
                              </div>
                            )}

                            <div
                              className={`parentChat-messageBubble ${
                                isParent
                                  ? "parent"
                                  : "teacher"
                              }`}
                            >

                              {isTeacher && (
                                <span className="parentChat-messageSender">
                                  {message?.senderName ||
                                    selectedTeacher?.name ||
                                    "Teacher"}
                                </span>
                              )}

                              <p>
                                {message?.message}
                              </p>

                              <div className="parentChat-messageMeta">

                                <span>
                                  {formatTime(
                                    message?.createdAt
                                  )}
                                </span>

                                {isParent && (
                                  <FaCheckDouble />
                                )}

                              </div>

                            </div>

                          </div>

                        </React.Fragment>
                      );
                    }
                  )
                )}

                <div ref={bottomRef} />

              </div>

              {/* SEND */}

              <form
                className="parentChat-compose"
                onSubmit={
                  sendMessage
                }
              >

                <div className="parentChat-inputWrap">

                  <textarea
                    value={text}
                    onChange={(event) =>
                      setText(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                          "Enter" &&
                        !event.shiftKey
                      ) {
                        event.preventDefault();

                        sendMessage(
                          event
                        );
                      }
                    }}
                    placeholder={`Message ${
                      selectedTeacher?.name ||
                      "teacher"
                    }...`}
                    rows="1"
                  />

                </div>

                <button
                  type="submit"
                  className="parentChat-send"
                  disabled={
                    !text.trim()
                  }
                >
                  <FaPaperPlane />

                  <span>
                    Send
                  </span>
                </button>

              </form>

            </>
          )}

        </div>

      </section>

    </div>
  );
};

export default ParentTeacherChat;