import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaGraduationCap,
  FaCommentDots,
  FaInbox,
  FaCheckCircle,
  FaClock,
  FaFilter,
} from "react-icons/fa";

import {
  getInquiries,
  changeInquiryStatus,
  deleteInquiry,
} from "../../../data/inquiriesData";

import "./Inquiries.css";


const Inquiries = () => {

  const [inquiries, setInquiries] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [
    selectedInquiry,
    setSelectedInquiry,
  ] = useState(null);


  // ========================================
  // LOAD
  // ========================================

  const loadInquiries = () => {

    const data = getInquiries();

    setInquiries(
      Array.isArray(data)
        ? data
        : []
    );
  };


  // ========================================
  // AUTO UPDATE
  // ========================================

  useEffect(() => {

    loadInquiries();


    const handleUpdate = () => {
      loadInquiries();
    };


    // Same tab
    window.addEventListener(
      "abpsInquiryUpdated",
      handleUpdate
    );


    window.addEventListener(
      "abpsDataUpdated",
      handleUpdate
    );


    // Different tab
    window.addEventListener(
      "storage",
      handleUpdate
    );


    return () => {

      window.removeEventListener(
        "abpsInquiryUpdated",
        handleUpdate
      );

      window.removeEventListener(
        "abpsDataUpdated",
        handleUpdate
      );

      window.removeEventListener(
        "storage",
        handleUpdate
      );

    };

  }, []);


  // ========================================
  // FILTER
  // ========================================

  const filteredInquiries =
    useMemo(() => {

      return inquiries.filter(
        (item) => {

          const query =
            search
              .trim()
              .toLowerCase();


          const matchesSearch =
            !query ||
            item.name
              ?.toLowerCase()
              .includes(query) ||

            item.phone
              ?.includes(query) ||

            item.email
              ?.toLowerCase()
              .includes(query) ||

            item.inquiryType
              ?.toLowerCase()
              .includes(query) ||

            item.className
              ?.toLowerCase()
              .includes(query);


          const matchesStatus =
            statusFilter === "All" ||
            item.status ===
              statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      inquiries,
      search,
      statusFilter,
    ]);


  // ========================================
  // COUNTS
  // ========================================

  const totalCount =
    inquiries.length;


  const newCount =
    inquiries.filter(
      (item) =>
        item.status === "New"
    ).length;


  const contactedCount =
    inquiries.filter(
      (item) =>
        item.status === "Contacted"
    ).length;


  const closedCount =
    inquiries.filter(
      (item) =>
        item.status === "Closed"
    ).length;


  // ========================================
  // STATUS CHANGE
  // ========================================

  const handleStatusChange = (
    id,
    status
  ) => {

    changeInquiryStatus(
      id,
      status
    );

    loadInquiries();


    if (
      selectedInquiry?.id === id
    ) {

      setSelectedInquiry(
        (prev) => ({
          ...prev,
          status,
        })
      );

    }
  };


  // ========================================
  // DELETE
  // ========================================

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this inquiry?"
      );


    if (!confirmDelete) {
      return;
    }


    deleteInquiry(id);

    loadInquiries();


    if (
      selectedInquiry?.id === id
    ) {
      setSelectedInquiry(null);
    }
  };


  return (

    <div className="sai-page">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="sai-header">

        <div>

          <span className="sai-label">
            COMMUNICATION
          </span>

          <h1>
            Website Inquiries
          </h1>

          <p>
            View and manage inquiries
            submitted from the school
            website.
          </p>

        </div>

      </div>


      {/* ==================================
          STATS
      ================================== */}

      <div className="sai-stats">

        <div className="sai-stat-card">

          <div className="sai-stat-icon">
            <FaInbox />
          </div>

          <div>
            <span>
              Total Inquiries
            </span>

            <strong>
              {totalCount}
            </strong>
          </div>

        </div>


        <div className="sai-stat-card">

          <div className="sai-stat-icon">
            <FaClock />
          </div>

          <div>
            <span>
              New
            </span>

            <strong>
              {newCount}
            </strong>
          </div>

        </div>


        <div className="sai-stat-card">

          <div className="sai-stat-icon">
            <FaPhoneAlt />
          </div>

          <div>
            <span>
              Contacted
            </span>

            <strong>
              {contactedCount}
            </strong>
          </div>

        </div>


        <div className="sai-stat-card">

          <div className="sai-stat-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>
              Closed
            </span>

            <strong>
              {closedCount}
            </strong>
          </div>

        </div>

      </div>


      {/* ==================================
          TOOLBAR
      ================================== */}

      <div className="sai-toolbar">

        <div className="sai-search">

          <FaSearch />

          <input
            type="text"
            value={search}
            placeholder="Search name, phone, email, class..."
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        <div className="sai-filter">

          <FaFilter />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>

      </div>


      {/* ==================================
          TABLE
      ================================== */}

      <div className="sai-table-card">

        <div className="sai-table-scroll">

          <table className="sai-table">

            <thead>

              <tr>

                <th>Parent / Visitor</th>

                <th>Contact</th>

                <th>Inquiry</th>

                <th>Class</th>

                <th>Submitted</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredInquiries.length >
              0 ? (

                filteredInquiries.map(
                  (item) => (

                    <tr key={item.id}>

                      <td>

                        <div className="sai-person">

                          <div className="sai-avatar">
                            <FaUser />
                          </div>

                          <div>

                            <strong>
                              {item.name}
                            </strong>

                            <small>
                              {item.id}
                            </small>

                          </div>

                        </div>

                      </td>


                      <td>

                        <div className="sai-contact">

                          <span>
                            <FaPhoneAlt />
                            {item.phone ||
                              "—"}
                          </span>

                          <span>
                            <FaEnvelope />
                            {item.email ||
                              "No email"}
                          </span>

                        </div>

                      </td>


                      <td>

                        <span className="sai-type">
                          {
                            item.inquiryType
                          }
                        </span>

                      </td>


                      <td>

                        {item.className ||
                          "—"}

                      </td>


                      <td>

                        <span className="sai-date">
                          {item.submittedAt ||
                            "—"}
                        </span>

                      </td>


                      <td>

                        <select
                          className={`sai-status sai-status-${(
                            item.status ||
                            "New"
                          )
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                          value={
                            item.status ||
                            "New"
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.value
                            )
                          }
                        >

                          <option value="New">
                            New
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="Closed">
                            Closed
                          </option>

                        </select>

                      </td>


                      <td>

                        <div className="sai-actions">

                          <button
                            type="button"
                            className="sai-view-btn"
                            title="View inquiry"
                            onClick={() =>
                              setSelectedInquiry(
                                item
                              )
                            }
                          >
                            <FaEye />
                          </button>


                          <button
                            type="button"
                            className="sai-delete-btn"
                            title="Delete inquiry"
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
                    className="sai-empty"
                  >

                    <FaInbox />

                    <h3>
                      No inquiries found
                    </h3>

                    <p>
                      New website inquiries
                      will automatically
                      appear here.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==================================
          VIEW DETAILS MODAL
      ================================== */}

      {selectedInquiry && (

        <div className="sai-modal-overlay">

          <div className="sai-modal">

            <button
              type="button"
              className="sai-modal-close"
              onClick={() =>
                setSelectedInquiry(
                  null
                )
              }
            >
              <FaTimes />
            </button>


            <div className="sai-modal-head">

              <span>
                INQUIRY DETAILS
              </span>

              <h2>
                {
                  selectedInquiry.name
                }
              </h2>

              <p>
                {
                  selectedInquiry
                    .submittedAt
                }
              </p>

            </div>


            <div className="sai-detail-grid">


              <div className="sai-detail">

                <FaUser />

                <div>
                  <span>Name</span>

                  <strong>
                    {
                      selectedInquiry.name
                    }
                  </strong>
                </div>

              </div>


              <div className="sai-detail">

                <FaPhoneAlt />

                <div>
                  <span>Phone</span>

                  <strong>
                    {
                      selectedInquiry.phone
                    }
                  </strong>
                </div>

              </div>


              <div className="sai-detail">

                <FaEnvelope />

                <div>
                  <span>Email</span>

                  <strong>
                    {selectedInquiry.email ||
                      "Not provided"}
                  </strong>
                </div>

              </div>


              <div className="sai-detail">

                <FaGraduationCap />

                <div>
                  <span>Class</span>

                  <strong>
                    {selectedInquiry.className ||
                      "Not applicable"}
                  </strong>
                </div>

              </div>

            </div>


            <div className="sai-detail-section">

              <span>
                Inquiry Type
              </span>

              <strong>
                {
                  selectedInquiry
                    .inquiryType
                }
              </strong>

            </div>


            <div className="sai-message-box">

              <div>
                <FaCommentDots />

                <span>
                  Message
                </span>
              </div>

              <p>
                {
                  selectedInquiry
                    .description
                }
              </p>

            </div>


            <div className="sai-modal-status">

              <label>
                Inquiry Status
              </label>

              <select
                value={
                  selectedInquiry.status ||
                  "New"
                }
                onChange={(e) =>
                  handleStatusChange(
                    selectedInquiry.id,
                    e.target.value
                  )
                }
              >

                <option value="New">
                  New
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Inquiries;