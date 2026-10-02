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
  getLoggedInParent,
  getLoggedInParentStudent,
} from "../../data/parentAuthData";

import {
  getTeachers,
} from "../../data/teachersData";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";
import {
  SENDER_TYPES,
  getChatsForParent,
  getOrCreateParentTeacherChat,
  sendTeacherChatMessage,
  markTeacherChatRead,
  getUnreadCountForChat,
} from "../../data/teacherChatData";

import "./ParentTeacherChat.css";

const classValue = (
  value
) =>
  String(value || "")
    .toLowerCase()
    .replace(/^class\s*/, "")
    .trim();

const ParentTeacherChat =
  () => {
    const [parent, setParent] =
      useState(
        getLoggedInParent()
      );

    const [student, setStudent] =
      useState(
        getLoggedInParentStudent()
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

    const parentId =
      parent?.id ||
      parent?.parentId ||
      "";

    const refresh =
      useCallback(() => {
        const currentParent =
          getLoggedInParent();

        const currentStudent =
          getLoggedInParentStudent();

        setParent(
          currentParent
        );

        setStudent(
          currentStudent
        );

        setTeachers(
          getTeachers() || []
        );

        const id =
          currentParent?.id ||
          currentParent?.parentId;

        if (id) {
          setChats(
            getChatsForParent(
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

    const myTeachers =
      useMemo(() => {
        return teachers.filter(
          (teacher) =>
            (
              teacher.classes ||
              []
            ).some(
              (item) =>
                classValue(
                  item.className ||
                    item.class
                ) ===
                  classValue(
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
        getOrCreateParentTeacherChat(
          student,
          parent,
          teacher
        );

      if (!chat) return;

      markTeacherChatRead(
        chat.id,
        SENDER_TYPES.PARENT,
        parentId
      );

      const latest =
        getChatsForParent(
          parentId
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
      New Teacher message while
      Parent chat is open.
    */

    useEffect(() => {
      if (
        !selectedChat ||
        !parentId
      ) {
        return;
      }

      const latest =
        getChatsForParent(
          parentId
        ).find(
          (item) =>
            item.id ===
            selectedChat.id
        );

      if (!latest) return;

      const unread =
        getUnreadCountForChat(
          latest,
          SENDER_TYPES.PARENT,
          parentId
        );

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
      parentId,
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

      const latest =
        getChatsForParent(
          parentId
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
      <div className="parChat-page">

        <div className="parChat-heading">

          <span>
            PARENT • TEACHER
          </span>

          <h1>
            Teacher Conversations
          </h1>

          <p>
            Privately communicate with
            {student?.name
              ? ` ${student.name}'s`
              : " your child's"}{" "}
            teachers.
          </p>

        </div>

        <div className="parChat-layout">

          <aside className="parChat-people">

            <h3>
              Teachers
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
                        SENDER_TYPES.PARENT,
                        parentId
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

          <main className="parChat-main">

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
                      Private conversation
                      about{" "}
                      {student?.name ||
                        "student"}
                    </p>
                  </section>

                </header>

                <div className="parChat-messages">

                  {(selectedChat.messages ||
                    []).map(
                    (message) => {
                      const mine =
                        message.senderType ===
                        SENDER_TYPES.PARENT;

                      return (
                        <div
                          key={
                            message.id
                          }
                          className={`parChat-row ${
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
                  className="parChat-compose"
                  onSubmit={send}
                >

                  <input
                    value={text}
                    onChange={(e) =>
                      setText(
                        e.target.value
                      )
                    }
                    placeholder="Reply to teacher..."
                  />

                  <button>
                    <FaPaperPlane />
                    Send
                  </button>

                </form>
              </>
            ) : (
              <div className="parChat-empty">

                <FaComments />

                <h2>
                  Select Teacher
                </h2>

                <p>
                  Select a teacher to
                  start a private
                  conversation.
                </p>

              </div>
            )}

          </main>

        </div>

      </div>
    );
  };

export default ParentTeacherChat;