import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaEye,
  FaTrash,
  FaTimes,
  FaCommentDots,
  FaInbox,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "./ContactMessagesAdmin.css";

import {
  CONTACT_MESSAGES_KEY,
  getContactMessages,
  changeContactMessageStatus,
  deleteContactMessage,
} from "../../../data/contactMessagesData";


const ContactMessagesAdmin = () => {
  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedMessage, setSelectedMessage] =
    useState(null);


  // ==========================================
  // LOAD DATA
  // ==========================================

  const loadMessages = () => {
    const data = getContactMessages();

    setMessages(
      Array.isArray(data)
        ? data
        : []
    );
  };


  // ==========================================
  // AUTO REFRESH
  // ==========================================

  useEffect(() => {
    loadMessages();

    const handleDataUpdate = (event) => {
      if (
        !event.detail?.key ||
        event.detail.key ===
          CONTACT_MESSAGES_KEY
      ) {
        loadMessages();
      }
    };

    const handleStorage = (event) => {
      if (
        !event.key ||
        event.key ===
          CONTACT_MESSAGES_KEY
      ) {
        loadMessages();
      }
    };

    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        handleDataUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);


  // ==========================================
  // FILTER
  // ==========================================

  const filteredMessages = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return messages.filter((item) => {
      const matchesSearch =
        !query ||
        item.name
          ?.toLowerCase()
          .includes(query) ||
        item.phone
          ?.toLowerCase()
          .includes(query) ||
        item.email
          ?.toLowerCase()
          .includes(query) ||
        item.subject
          ?.toLowerCase()
          .includes(query) ||
        item.message
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    messages,
    search,
    statusFilter,
  ]);


  // ==========================================
  // COUNTS
  // ==========================================

  const totalMessages =
    messages.length;

  const newMessages =
    messages.filter(
      (item) =>
        item.status === "New"
    ).length;

  const readMessages =
    messages.filter(
      (item) =>
        item.status === "Read"
    ).length;

  const repliedMessages =
    messages.filter(
      (item) =>
        item.status === "Replied"
    ).length;


  // ==========================================
  // OPEN MESSAGE
  // ==========================================

  const handleView = (item) => {
    setSelectedMessage(item);

    if (item.status === "New") {
      changeContactMessageStatus(
        item.id,
        "Read"
      );

      setSelectedMessage({
        ...item,
        status: "Read",
      });
    }
  };


  // ==========================================
  // CHANGE STATUS
  // ==========================================

  const handleStatusChange = (
    id,
    status
  ) => {
    changeContactMessageStatus(
      id,
      status
    );

    setSelectedMessage((prev) => {
      if (
        !prev ||
        prev.id !== id
      ) {
        return prev;
      }

      return {
        ...prev,
        status,
      };
    });
  };


  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this contact message?"
      );

    if (!confirmDelete) {
      return;
    }

    deleteContactMessage(id);

    if (
      selectedMessage?.id === id
    ) {
      setSelectedMessage(null);
    }
  };


  return (
    <div className="cmadmin-page">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="cmadmin-header">

        <div>

          <span className="cmadmin-label">
            COMMUNICATION
          </span>

          <h1>
            Contact Messages
          </h1>

          <p>
            View website contact
            messages and connect with
            parents, visitors and
            prospective families.
          </p>

        </div>

      </div>


      {/* ==============================
          STATS
      ============================== */}

      <div className="cmadmin-stats">

        <StatCard
          icon={<FaInbox />}
          title="Total Messages"
          value={totalMessages}
        />

        <StatCard
          icon={<FaClock />}
          title="New Messages"
          value={newMessages}
        />

        <StatCard
          icon={<FaEye />}
          title="Read"
          value={readMessages}
        />

        <StatCard
          icon={<FaCheckCircle />}
          title="Replied"
          value={repliedMessages}
        />

      </div>


      {/* ==============================
          SEARCH
      ============================== */}

      <div className="cmadmin-toolbar">

        <div className="cmadmin-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search name, phone, email, subject..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        <select
          className="cmadmin-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="All">
            All Messages
          </option>

          <option value="New">
            New
          </option>

          <option value="Read">
            Read
          </option>

          <option value="Replied">
            Replied
          </option>

        </select>

      </div>


      {/* ==============================
          TABLE
      ============================== */}

      <div className="cmadmin-table-card">

        <div className="cmadmin-table-scroll">

          <table>

            <thead>

              <tr>
                <th>Sender</th>
                <th>Contact</th>
                <th>Enquiry Type</th>
                <th>Message</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredMessages.length >
              0 ? (

                filteredMessages.map(
                  (item) => (

                    <tr key={item.id}>

                      {/* NAME */}

                      <td>

                        <div className="cmadmin-sender">

                          <div>
                            {item.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "U"}
                          </div>

                          <strong>
                            {item.name ||
                              "Unknown"}
                          </strong>

                        </div>

                      </td>


                      {/* CONTACT */}

                      <td>

                        <div className="cmadmin-contact">

                          <a
                            href={`tel:${item.phone}`}
                          >
                            <FaPhoneAlt />

                            {item.phone ||
                              "—"}
                          </a>

                          <a
                            href={`mailto:${item.email}`}
                          >
                            <FaEnvelope />

                            {item.email ||
                              "—"}
                          </a>

                        </div>

                      </td>


                      {/* SUBJECT */}

                      <td>

                        <span className="cmadmin-subject">
                          {item.subject ||
                            "General Enquiry"}
                        </span>

                      </td>


                      {/* MESSAGE */}

                      <td>

                        <p className="cmadmin-message-preview">
                          {item.message ||
                            "—"}
                        </p>

                      </td>


                      {/* DATE */}

                      <td className="cmadmin-date">
                        {item.submittedAt ||
                          "—"}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`cmadmin-status cmadmin-status-${String(
                            item.status ||
                              "New"
                          )
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {item.status ||
                            "New"}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div className="cmadmin-actions">

                          <button
                            type="button"
                            className="view"
                            title="View Message"
                            onClick={() =>
                              handleView(
                                item
                              )
                            }
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            className="delete"
                            title="Delete Message"
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="cmadmin-empty"
                  >

                    <FaInbox />

                    <strong>
                      No Contact Messages
                    </strong>

                    <span>
                      Website contact
                      messages will appear
                      here.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==============================
          VIEW MODAL
      ============================== */}

      {selectedMessage && (

        <div
          className="cmadmin-overlay"
          onClick={() =>
            setSelectedMessage(null)
          }
        >

          <div
            className="cmadmin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="cmadmin-close"
              onClick={() =>
                setSelectedMessage(
                  null
                )
              }
            >
              <FaTimes />
            </button>


            <span className="cmadmin-modal-label">
              WEBSITE CONTACT MESSAGE
            </span>


            <h2>
              {selectedMessage.subject ||
                "General Enquiry"}
            </h2>


            {/* PERSON */}

            <div className="cmadmin-person">

              <div className="cmadmin-person-avatar">
                {selectedMessage.name
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "U"}
              </div>

              <div>

                <strong>
                  {selectedMessage.name}
                </strong>

                <span>
                  Submitted{" "}
                  {selectedMessage.submittedAt ||
                    "—"}
                </span>

              </div>

            </div>


            {/* DETAILS */}

            <div className="cmadmin-details">

              <div>

                <span>
                  Full Name
                </span>

                <strong>
                  {selectedMessage.name ||
                    "—"}
                </strong>

              </div>


              <div>

                <span>
                  Enquiry Type
                </span>

                <strong>
                  {selectedMessage.subject ||
                    "General Enquiry"}
                </strong>

              </div>


              <div>

                <span>
                  Phone Number
                </span>

                <strong>
                  {selectedMessage.phone ||
                    "—"}
                </strong>

              </div>


              <div>

                <span>
                  Email Address
                </span>

                <strong>
                  {selectedMessage.email ||
                    "—"}
                </strong>

              </div>

            </div>


            {/* MESSAGE */}

            <div className="cmadmin-full-message">

              <span>
                <FaCommentDots />

                Message
              </span>

              <p>
                {selectedMessage.message ||
                  "No message provided."}
              </p>

            </div>


            {/* CONTACT BUTTONS */}

            <div className="cmadmin-contact-buttons">

              {selectedMessage.phone && (

                <a
                  href={`tel:${selectedMessage.phone}`}
                >
                  <FaPhoneAlt />

                  Call Now
                </a>

              )}


              {selectedMessage.email && (

                <a
                  href={`mailto:${selectedMessage.email}?subject=AB Public School - ${encodeURIComponent(
                    selectedMessage.subject ||
                      "Your Enquiry"
                  )}`}
                >
                  <FaEnvelope />

                  Send Email
                </a>

              )}

            </div>


            {/* STATUS */}

            <div className="cmadmin-status-box">

              <label>
                Message Status
              </label>

              <select
                value={
                  selectedMessage.status ||
                  "New"
                }
                onChange={(e) =>
                  handleStatusChange(
                    selectedMessage.id,
                    e.target.value
                  )
                }
              >

                <option value="New">
                  New
                </option>

                <option value="Read">
                  Read
                </option>

                <option value="Replied">
                  Replied
                </option>

              </select>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


const StatCard = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="cmadmin-stat">

      <div className="cmadmin-stat-icon">
        {icon}
      </div>

      <div>
        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>
      </div>

    </div>
  );
};


export default ContactMessagesAdmin;