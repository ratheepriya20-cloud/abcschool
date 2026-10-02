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
} from "react-icons/fa";

import {
  getLoggedInStudent,
} from "../../data/studentAuthData";

import {
  getTeachers,
} from "../../data/teachersData";

import {
  SENDER_TYPES,
  getChatsForStudent,
  getOrCreateStudentTeacherChat,
  sendTeacherChatMessage,
  markTeacherChatRead,
  getUnreadCountForChat,
} from "../../data/teacherChatData";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";
import "./StudentTeacherChat.css";

const normalClass = (
  value
) =>
  String(value || "")
    .toLowerCase()
    .replace(/^class\s*/, "")
    .trim();

const StudentTeacherChat =
  () => {
    const [student, setStudent] =
      useState(
        getLoggedInStudent()
      );

    const [teachers, setTeachers] =
      useState(
        getTeachers() || []
      );

    const [chats, setChats] =
      useState([]);

    const [
      selectedTeacher,
      setSelectedTeacher,
    ] = useState(null);

    const [
      selectedChat,
      setSelectedChat,
    ] = useState(null);

    const [text, setText] =
      useState("");

    const bottomRef =
      useRef(null);

    const studentId =
      student?.id ||
      student?.studentId ||
      student?.admissionNo ||
      "";

    const refresh =
      useCallback(() => {
        const current =
          getLoggedInStudent();

        setStudent(current);

        setTeachers(
          getTeachers() || []
        );

        const id =
          current?.id ||
          current?.studentId ||
          current?.admissionNo;

        if (id) {
          setChats(
            getChatsForStudent(
              id
            )
          );
        }
      }, []);

    useEffect(() => {
      refresh();

      window.addEventListener(
        "abpsTeacherChatUpdated",
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
          "storage",
          refresh
        );
      };
    }, [refresh]);

    /* ASSIGNED TEACHERS */

    const myTeachers =
      useMemo(() => {
        return teachers.filter(
          (teacher) =>
            (
              teacher.classes ||
              []
            ).some(
              (item) =>
                normalClass(
                  item.className ||
                    item.class
                ) ===
                  normalClass(
                    student?.className ||
                      student?.class
                  ) &&
                (!item.section ||
                  String(
                    item.section
                  ).toLowerCase() ===
                    String(
                      student?.section ||
                        ""
                    ).toLowerCase())
            )
        );
      }, [
        teachers,
        student,
      ]);

    const openChat = (
      teacher
    ) => {
      const chat =
        getOrCreateStudentTeacherChat(
          student,
          teacher
        );

      if (!chat) return;

      markTeacherChatRead(
        chat.id,
        SENDER_TYPES.STUDENT,
        studentId
      );

      const latest =
        getChatsForStudent(
          studentId
        );

      setChats(latest);

      setSelectedTeacher(
        teacher
      );

      setSelectedChat(
        latest.find(
          (item) =>
            item.id === chat.id
        ) || chat
      );
    };

    /*
      Current open chat receives
      Teacher's new message:
      mark read.
    */

    useEffect(() => {
      if (
        !selectedChat ||
        !studentId
      ) {
        return;
      }

      const latest =
        getChatsForStudent(
          studentId
        ).find(
          (item) =>
            item.id ===
            selectedChat.id
        );

      if (!latest) return;

      const unread =
        getUnreadCountForChat(
          latest,
          SENDER_TYPES.STUDENT,
          studentId
        );

      if (unread > 0) {
        markTeacherChatRead(
          latest.id,
          SENDER_TYPES.STUDENT,
          studentId
        );

        const reread =
          getChatsForStudent(
            studentId
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
      studentId,
    ]);

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
            SENDER_TYPES.STUDENT,

          senderId:
            studentId,

          senderName:
            student?.name ||
            "Student",

          message,
        }
      );

      setText("");

      const latest =
        getChatsForStudent(
          studentId
        );

      setChats(latest);

      setSelectedChat(
        latest.find(
          (item) =>
            item.id ===
            selectedChat.id
        ) || selectedChat
      );
    };

    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [
      selectedChat?.messages
        ?.length,
    ]);

    return (
      <div className="stuChat-page">

        <div className="stuChat-heading">
          <span>
            PRIVATE CHAT
          </span>

          <h1>
            Message Your Teacher
          </h1>

          <p>
            Ask questions and continue
            your conversation privately.
          </p>
        </div>

        <div className="stuChat-layout">

          <aside className="stuChat-people">

            <h3>
              My Teachers
            </h3>

            {myTeachers.map(
              (teacher) => {
                const teacherId =
                  teacher.id ||
                  teacher.teacherId ||
                  teacher.employeeId;

                const chat =
                  chats.find(
                    (item) =>
                      String(
                        item.teacherId
                      ) ===
                      String(
                        teacherId
                      )
                  );

                const unread =
                  chat
                    ? getUnreadCountForChat(
                        chat,
                        SENDER_TYPES.STUDENT,
                        studentId
                      )
                    : 0;

                return (
                  <button
                    key={
                      teacherId
                    }
                    onClick={() =>
                      openChat(
                        teacher
                      )
                    }
                  >
                    <div>
                      {teacher.name?.[0]}
                    </div>

                    <section>
                      <strong>
                        {teacher.name}
                      </strong>

                      <span>
                        {teacher.subject ||
                          teacher.department ||
                          "Teacher"}
                      </span>

                      {chat
                        ?.lastMessage && (
                        <p>
                          {
                            chat.lastMessage
                          }
                        </p>
                      )}
                    </section>

                    {unread >
                      0 && (
                      <b>
                        {unread}
                      </b>
                    )}
                  </button>
                );
              }
            )}

          </aside>

          <main className="stuChat-main">

            {selectedChat ? (
              <>
                <header>
                  <div>
                    {selectedTeacher
                      ?.name?.[0]}
                  </div>

                  <section>
                    <h3>
                      {
                        selectedTeacher
                          ?.name
                      }
                    </h3>

                    <p>
                      Private Teacher
                      Conversation
                    </p>
                  </section>
                </header>

                <div className="stuChat-messages">

                  {(selectedChat.messages ||
                    []).map(
                    (message) => {
                      const mine =
                        message.senderType ===
                        SENDER_TYPES.STUDENT;

                      return (
                        <div
                          key={
                            message.id
                          }
                          className={`stuChat-row ${
                            mine
                              ? "mine"
                              : ""
                          }`}
                        >
                          <div>
                            <p>
                              {
                                message.message
                              }
                            </p>

                            <small>
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
                            </small>
                          </div>
                        </div>
                      );
                    }
                  )}

                  <span
                    ref={bottomRef}
                  />

                </div>

                <form
                  className="stuChat-compose"
                  onSubmit={send}
                >
                  <input
                    value={text}
                    onChange={(e) =>
                      setText(
                        e.target.value
                      )
                    }
                    placeholder="Type a message..."
                  />

                  <button>
                    <FaPaperPlane />
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="stuChat-empty">
                <FaComments />

                <h2>
                  Select Teacher
                </h2>

                <p>
                  Select a teacher to
                  start chatting.
                </p>
              </div>
            )}

          </main>

        </div>

      </div>
    );
  };

export default StudentTeacherChat;