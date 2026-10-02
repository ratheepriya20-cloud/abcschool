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
  FaUserTie,
  FaBookOpen,
  FaEnvelope,
  FaArrowLeft,
  FaCircle,
  FaLock,
  FaCheckDouble,
} from "react-icons/fa";

import "./StudentTeacherChat.css";

import {
  getChatsForStudent,
  getOrCreateStudentTeacherChat,
  sendTeacherChatMessage,
  markTeacherChatRead,
  getUnreadCountForChat,
  SENDER_TYPES,
  TEACHER_CHAT_EVENT,
} from "../../data/teacherChatData";


const StudentTeacherChat = ({
  student,
  teachers = [],
}) => {
  /* =====================================================
     STATE
  ===================================================== */

  const [
    selectedTeacherId,
    setSelectedTeacherId,
  ] = useState("");

  const [
    selectedChatId,
    setSelectedChatId,
  ] = useState("");

  const [
    chats,
    setChats,
  ] = useState([]);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    sending,
    setSending,
  ] = useState(false);

  const [
    mobileChatOpen,
    setMobileChatOpen,
  ] = useState(false);

  const messagesEndRef =
    useRef(null);

  /* =====================================================
     STUDENT ID
  ===================================================== */

  const studentId =
    student?.id ||
    student?.studentId ||
    student?.admissionNo ||
    "";

  /* =====================================================
     LOAD STUDENT CHATS
  ===================================================== */

  const loadChats =
    useCallback(() => {
      if (!studentId) {
        setChats([]);
        return [];
      }

      const latestChats =
        getChatsForStudent(
          studentId
        ) || [];

      setChats(
        latestChats
      );

      return latestChats;
    }, [studentId]);

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  /* =====================================================
     SELECTED TEACHER
  ===================================================== */

  const selectedTeacher =
    useMemo(() => {
      if (!selectedTeacherId) {
        return null;
      }

      return (
        teachers.find(
          (teacher) =>
            String(
              teacher?.id ||
              teacher?.teacherId ||
              teacher?.employeeId
            ) ===
            String(
              selectedTeacherId
            )
        ) || null
      );
    }, [
      teachers,
      selectedTeacherId,
    ]);

  /* =====================================================
     SELECTED CHAT
  ===================================================== */

  const selectedChat =
    useMemo(() => {
      if (!selectedChatId) {
        return null;
      }

      return (
        chats.find(
          (chat) =>
            String(chat?.id) ===
            String(
              selectedChatId
            )
        ) || null
      );
    }, [
      chats,
      selectedChatId,
    ]);

  /* =====================================================
     SCROLL BOTTOM
  ===================================================== */

  const scrollToBottom = (
    behavior = "smooth"
  ) => {
    window.setTimeout(
      () => {
        messagesEndRef.current
          ?.scrollIntoView({
            behavior,
            block: "end",
          });
      },
      80
    );
  };

  /* =====================================================
     OPEN TEACHER CHAT

     IMPORTANT:
     teacherChatData.js expects:

     getOrCreateStudentTeacherChat(
       student,
       teacher
     )
  ===================================================== */

  const openTeacherChat = (
    teacher
  ) => {
    setError("");

    if (!student) {
      setError(
        "Student information is not available."
      );

      return;
    }

    if (!studentId) {
      setError(
        "Student ID is not available."
      );

      return;
    }

    if (!teacher) {
      setError(
        "Teacher information is not available."
      );

      return;
    }

    const teacherId =
      teacher?.id ||
      teacher?.teacherId ||
      teacher?.employeeId ||
      "";

    if (!teacherId) {
      setError(
        "Teacher ID is not available."
      );

      return;
    }

    /* -------------------------------------
       SELECT TEACHER
    ------------------------------------- */

    setSelectedTeacherId(
      String(teacherId)
    );

    /* -------------------------------------
       GET OR CREATE CHAT

       CORRECT SIGNATURE
    ------------------------------------- */

    const chat =
      getOrCreateStudentTeacherChat(
        student,
        teacher
      );

    if (!chat?.id) {
      console.error(
        "Unable to create student teacher chat",
        {
          student,
          teacher,
        }
      );

      setError(
        "Unable to open this conversation."
      );

      return;
    }

    /* -------------------------------------
       SELECT CHAT
    ------------------------------------- */

    setSelectedChatId(
      String(chat.id)
    );

    /* -------------------------------------
       MARK CHAT READ
    ------------------------------------- */

    markTeacherChatRead(
      chat.id,
      SENDER_TYPES.STUDENT,
      studentId
    );

    /* -------------------------------------
       RELOAD FROM LOCAL STORAGE
    ------------------------------------- */

    const latestChats =
      getChatsForStudent(
        studentId
      ) || [];

    /*
      Newly created chat storage me
      immediately available honi chahiye.

      Safety ke liye agar nahi mili,
      current chat manually add.
    */

    const exists =
      latestChats.some(
        (item) =>
          String(item.id) ===
          String(chat.id)
      );

    const finalChats =
      exists
        ? latestChats
        : [
            chat,
            ...latestChats,
          ];

    setChats(
      finalChats
    );

    /* -------------------------------------
       MOBILE OPEN
    ------------------------------------- */

    setMobileChatOpen(
      true
    );

    scrollToBottom(
      "auto"
    );
  };

  /* =====================================================
     LIVE CHAT UPDATE

     Teacher message bheje to student side
     immediately update.
  ===================================================== */

  useEffect(() => {
    const handleChatUpdate =
      () => {
        if (!studentId) {
          return;
        }

        const latestChats =
          getChatsForStudent(
            studentId
          ) || [];

        setChats(
          latestChats
        );

        /*
          Agar current conversation
          open hai to usko read mark.
        */

        if (
          selectedChatId
        ) {
          const activeChat =
            latestChats.find(
              (chat) =>
                String(
                  chat.id
                ) ===
                String(
                  selectedChatId
                )
            );

          if (activeChat) {
            markTeacherChatRead(
              activeChat.id,
              SENDER_TYPES.STUDENT,
              studentId
            );

            const updated =
              getChatsForStudent(
                studentId
              ) || [];

            setChats(
              updated
            );
          }
        }

        scrollToBottom();
      };

    window.addEventListener(
      TEACHER_CHAT_EVENT,
      handleChatUpdate
    );

    window.addEventListener(
      "abpsTeacherChatUpdated",
      handleChatUpdate
    );

    window.addEventListener(
      "storage",
      handleChatUpdate
    );

    return () => {
      window.removeEventListener(
        TEACHER_CHAT_EVENT,
        handleChatUpdate
      );

      window.removeEventListener(
        "abpsTeacherChatUpdated",
        handleChatUpdate
      );

      window.removeEventListener(
        "storage",
        handleChatUpdate
      );
    };
  }, [
    studentId,
    selectedChatId,
  ]);

  /* =====================================================
     MARK OPEN CHAT READ
  ===================================================== */

  useEffect(() => {
    if (
      !selectedChat?.id ||
      !studentId
    ) {
      return;
    }

    markTeacherChatRead(
      selectedChat.id,
      SENDER_TYPES.STUDENT,
      studentId
    );

    scrollToBottom(
      "auto"
    );
  }, [
    selectedChat?.id,
    selectedChat?.messages?.length,
    studentId,
  ]);

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const handleSendMessage = (
    event
  ) => {
    event?.preventDefault?.();

    const cleanMessage =
      message.trim();

    if (!cleanMessage) {
      return;
    }

    if (!studentId) {
      setError(
        "Student information is not available."
      );

      return;
    }

    if (!selectedTeacher) {
      setError(
        "Please select a teacher first."
      );

      return;
    }

    if (!selectedChat?.id) {
      setError(
        "Please open the conversation first."
      );

      return;
    }

    setSending(true);
    setError("");

    /*
      IMPORTANT:
      teacherChatData.js returns
      created MESSAGE directly.
      It does NOT return {success:true}.
    */

    const createdMessage =
      sendTeacherChatMessage(
        selectedChat.id,
        {
          senderType:
            SENDER_TYPES.STUDENT,

          senderId:
            studentId,

          senderName:
            student?.name ||
            student?.studentName ||
            "Student",

          message:
            cleanMessage,
        }
      );

    if (!createdMessage) {
      setError(
        "Message could not be sent."
      );

      setSending(false);

      return;
    }

    setMessage("");

    /* -------------------------------------
       REFRESH CHAT
    ------------------------------------- */

    const latestChats =
      getChatsForStudent(
        studentId
      ) || [];

    setChats(
      latestChats
    );

    setSending(false);

    scrollToBottom();
  };

  /* =====================================================
     ENTER SEND
     SHIFT + ENTER NEW LINE
  ===================================================== */

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSendMessage(
        event
      );
    }
  };

  /* =====================================================
     UNREAD COUNT
  ===================================================== */

  const getTeacherUnreadCount = (
    teacher
  ) => {
    if (
      !teacher ||
      !studentId
    ) {
      return 0;
    }

    const teacherId =
      teacher?.id ||
      teacher?.teacherId ||
      teacher?.employeeId ||
      "";

    const chat =
      chats.find(
        (item) =>
          String(
            item?.teacherId
          ) ===
          String(
            teacherId
          )
      );

    if (!chat) {
      return 0;
    }

    return (
      getUnreadCountForChat(
        chat,
        SENDER_TYPES.STUDENT,
        studentId
      ) || 0
    );
  };

  /* =====================================================
     GET CHAT OF TEACHER
  ===================================================== */

  const getTeacherChat = (
    teacher
  ) => {
    const teacherId =
      teacher?.id ||
      teacher?.teacherId ||
      teacher?.employeeId ||
      "";

    return (
      chats.find(
        (chat) =>
          String(
            chat?.teacherId
          ) ===
          String(
            teacherId
          )
      ) || null
    );
  };

  /* =====================================================
     LAST MESSAGE
  ===================================================== */

  const getLastMessage = (
    teacher
  ) => {
    const chat =
      getTeacherChat(
        teacher
      );

    if (!chat) {
      return "";
    }

    return (
      chat?.lastMessage ||
      ""
    );
  };

  /* =====================================================
     FORMAT TIME
  ===================================================== */

  const formatTime = (
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

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* =====================================================
     MOBILE BACK
  ===================================================== */

  const closeMobileChat =
    () => {
      setMobileChatOpen(
        false
      );
    };

  /* =====================================================
     NO TEACHERS
  ===================================================== */

  if (!teachers.length) {
    return (
      <div className="stuChat-page">

        <section className="stuChat-hero">

          <div>

            <span>
              PRIVATE COMMUNICATION
            </span>

            <h1>
              Chat With Your Teachers
            </h1>

            <p>
              Private student and teacher
              communication.
            </p>

          </div>

          <div className="stuChat-privacy">

            <FaLock />

            <span>

              <strong>
                Private Channel
              </strong>

              <small>
                Student ↔ Teacher
              </small>

            </span>

          </div>

        </section>

        <div className="stuChat-empty">

          <FaUserTie />

          <h2>
            No Teacher Assigned
          </h2>

          <p>
            No teacher has been assigned
            to your class yet.
          </p>

        </div>

      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="stuChat-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="stuChat-hero">

        <div>

          <span>
            PRIVATE COMMUNICATION
          </span>

          <h1>
            Chat With Your Teachers
          </h1>

          <p>
            Select your teacher and send
            private messages directly.
          </p>

        </div>

        <div className="stuChat-privacy">

          <FaLock />

          <span>

            <strong>
              Private Channel
            </strong>

            <small>
              Student ↔ Teacher
            </small>

          </span>

        </div>

      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="stuChat-error">
          {error}
        </div>
      )}

      {/* =================================================
          CHAT LAYOUT
      ================================================= */}

      <section className="stuChat-layout">

        {/* ===============================================
            LEFT SIDE
        =============================================== */}

        <aside
          className={`stuChat-teachers ${
            mobileChatOpen
              ? "stuChat-mobileHidden"
              : ""
          }`}
        >

          <div className="stuChat-listHeader">

            <div>

              <span>
                MY FACULTY
              </span>

              <h2>
                Teachers
              </h2>

            </div>

            <div className="stuChat-teacherCount">
              {teachers.length}
            </div>

          </div>

          {/* TEACHER LIST */}

          <div className="stuChat-teacherList">

            {teachers.map(
              (
                teacher,
                index
              ) => {
                const teacherId =
                  teacher?.id ||
                  teacher?.teacherId ||
                  teacher?.employeeId ||
                  `teacher-${index}`;

                const active =
                  String(
                    selectedTeacherId
                  ) ===
                  String(
                    teacherId
                  );

                const unread =
                  getTeacherUnreadCount(
                    teacher
                  );

                const lastMessage =
                  getLastMessage(
                    teacher
                  );

                return (
                  <button
                    key={teacherId}
                    type="button"

                    className={`stuChat-teacherItem ${
                      active
                        ? "active"
                        : ""
                    }`}

                    onClick={() =>
                      openTeacherChat(
                        teacher
                      )
                    }
                  >

                    {/* AVATAR */}

                    <div className="stuChat-teacherAvatar">

                      {teacher?.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "T"}

                      <span className="stuChat-onlineDot" />

                    </div>

                    {/* INFO */}

                    <div className="stuChat-teacherInfo">

                      <strong>
                        {teacher?.name ||
                          "Teacher"}
                      </strong>

                      {lastMessage ? (

                        <span className="stuChat-preview">
                          {lastMessage}
                        </span>

                      ) : (

                        <span>

                          <FaBookOpen />

                          {teacher?.subject ||
                            teacher?.designation ||
                            "Teacher"}

                        </span>

                      )}

                    </div>

                    {/* UNREAD */}

                    {unread > 0 && (
                      <span className="stuChat-unread">

                        {unread > 99
                          ? "99+"
                          : unread}

                      </span>
                    )}

                  </button>
                );
              }
            )}

          </div>

          <div className="stuChat-listFooter">

            <FaLock />

            <span>
              Messages are private between
              you and your teacher.
            </span>

          </div>

        </aside>

        {/* ===============================================
            RIGHT SIDE
        =============================================== */}

        <div
          className={`stuChat-conversation ${
            mobileChatOpen
              ? "stuChat-mobileOpen"
              : ""
          }`}
        >

          {selectedTeacher &&
          selectedChat ? (
            <>

              {/* =========================================
                  CHAT HEADER
              ========================================= */}

              <header className="stuChat-chatHeader">

                <button
                  type="button"
                  className="stuChat-back"
                  onClick={
                    closeMobileChat
                  }
                >
                  <FaArrowLeft />
                </button>

                <div className="stuChat-activeAvatar">

                  {selectedTeacher?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "T"}

                </div>

                <div className="stuChat-activeInfo">

                  <strong>
                    {selectedTeacher?.name ||
                      "Teacher"}
                  </strong>

                  <span>

                    <FaCircle />

                    {selectedTeacher?.subject ||
                      selectedTeacher?.designation ||
                      "Teacher"}

                  </span>

                </div>

                <div className="stuChat-privateBadge">

                  <FaLock />

                  Private

                </div>

              </header>

              {/* =========================================
                  MESSAGES
              ========================================= */}

              <div className="stuChat-messages">

                {!Array.isArray(
                  selectedChat?.messages
                ) ||
                selectedChat.messages
                  .length === 0 ? (

                  <div className="stuChat-start">

                    <div>
                      <FaComments />
                    </div>

                    <h3>
                      Start a Conversation
                    </h3>

                    <p>
                      Send your first message
                      to{" "}

                      <strong>
                        {selectedTeacher?.name}
                      </strong>
                      .
                    </p>

                  </div>

                ) : (

                  selectedChat.messages.map(
                    (
                      item,
                      index
                    ) => {
                      const own =
                        item?.senderType ===
                          SENDER_TYPES.STUDENT &&
                        String(
                          item?.senderId
                        ) ===
                          String(
                            studentId
                          );

                      return (
                        <div
                          key={
                            item?.id ||
                            `message-${index}`
                          }

                          className={`stuChat-messageRow ${
                            own
                              ? "own"
                              : "other"
                          }`}
                        >

                          {/* TEACHER AVATAR */}

                          {!own && (
                            <div className="stuChat-messageAvatar">

                              {selectedTeacher
                                ?.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "T"}

                            </div>
                          )}

                          <div className="stuChat-messageWrap">

                            {!own && (
                              <span className="stuChat-sender">

                                {item?.senderName ||
                                  selectedTeacher?.name ||
                                  "Teacher"}

                              </span>
                            )}

                            <div className="stuChat-bubble">

                              <p>
                                {item?.message}
                              </p>

                              <div className="stuChat-messageTime">

                                <small>
                                  {formatTime(
                                    item?.createdAt
                                  )}
                                </small>

                                {own && (
                                  <FaCheckDouble />
                                )}

                              </div>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )
                )}

                <div
                  ref={
                    messagesEndRef
                  }
                />

              </div>

              {/* =========================================
                  COMPOSER
              ========================================= */}

              <form
                className="stuChat-compose"
                onSubmit={
                  handleSendMessage
                }
              >

                <div className="stuChat-inputWrap">

                  <textarea
                    value={
                      message
                    }

                    onChange={(
                      event
                    ) =>
                      setMessage(
                        event.target
                          .value
                      )
                    }

                    onKeyDown={
                      handleKeyDown
                    }

                    placeholder={`Message ${
                      selectedTeacher
                        ?.name ||
                      "teacher"
                    }...`}

                    rows={1}

                    maxLength={
                      1000
                    }
                  />

                  <span>
                    {message.length}
                    /1000
                  </span>

                </div>

                <button
                  type="submit"

                  className="stuChat-send"

                  disabled={
                    sending ||
                    !message.trim()
                  }
                >

                  <FaPaperPlane />

                  <span>
                    {sending
                      ? "Sending..."
                      : "Send"}
                  </span>

                </button>

              </form>

            </>
          ) : (

            /* ===========================================
               SELECT TEACHER
            =========================================== */

            <div className="stuChat-noSelection">

              <FaEnvelope />

              <h2>
                Select a Teacher
              </h2>

              <p>
                Choose a teacher from the
                left side to start your
                private conversation.
              </p>

            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default StudentTeacherChat;