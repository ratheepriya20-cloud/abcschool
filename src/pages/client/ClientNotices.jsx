import React, { useEffect, useMemo, useState } from "react";

import {
  FaBullhorn,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
  FaExclamationCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import "./ClientNotices.css";

import {
  initializePublicNotices,
  getPublicNotices,
  addPublicNotice,
  updatePublicNotice,
  deletePublicNotice,
} from "../../data/publicNoticesData";

const emptyForm = {
  title: "",
  category: "School",
  date: "",
  description: "",
  fullNotice: "",
  important: false,
  status: "Published",
};

const ClientNotices = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  /* =========================
     LOAD
  ========================= */

  const loadNotices = () => {
    initializePublicNotices();

    setNotices(
      getPublicNotices() || []
    );
  };

  useEffect(() => {
    loadNotices();
  }, []);

  /* =========================
     FILTER
  ========================= */

  const filteredNotices = useMemo(() => {
    return notices.filter((item) => {
      const text = `
        ${item.title || ""}
        ${item.category || ""}
        ${item.description || ""}
      `.toLowerCase();

      const searchMatch =
        text.includes(
          search.toLowerCase()
        );

      const statusMatch =
        filter === "All" ||
        item.status === filter;

      return searchMatch && statusMatch;
    });
  }, [notices, search, filter]);

  /* =========================
     ADD
  ========================= */

  const openAdd = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      date:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    setModalOpen(true);
  };

  /* =========================
     EDIT
  ========================= */

  const openEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      category:
        item.category || "School",
      date: item.date || "",
      description:
        item.description || "",
      fullNotice:
        item.fullNotice || "",
      important:
        Boolean(item.important),
      status:
        item.status || "Published",
    });

    setModalOpen(true);
  };

  /* =========================
     CLOSE
  ========================= */

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  /* =========================
     CHANGE
  ========================= */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================
     SAVE
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert(
        "Notice title required hai."
      );

      return;
    }

    if (!formData.date) {
      alert(
        "Notice date required hai."
      );

      return;
    }

    if (editingId) {
      updatePublicNotice(
        editingId,
        formData
      );
    } else {
      addPublicNotice(
        formData
      );
    }

    loadNotices();
    closeModal();
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmed =
      window.confirm(
        "Kya aap is public notice ko delete karna chahte ho?"
      );

    if (!confirmed) return;

    deletePublicNotice(id);

    loadNotices();
  };

  return (
    <div className="cnotice-page">

      {/* HEADER */}

      <section className="cnotice-header">

        <div>
          <span>
            PUBLIC WEBSITE
          </span>

          <h1>
            Public Notices
          </h1>

          <p>
            Manage notices visible on
            the public school website.
            These are separate from
            internal student and parent
            notices.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
        >
          <FaPlus />

          Add Notice
        </button>

      </section>


      {/* TOOLBAR */}

      <section className="cnotice-toolbar">

        <div className="cnotice-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />
        </div>

        <select
          value={filter}
          onChange={(event) =>
            setFilter(
              event.target.value
            )
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Published">
            Published
          </option>

          <option value="Draft">
            Draft
          </option>
        </select>

      </section>


      {/* LIST */}

      <section className="cnotice-list">

        {filteredNotices.map(
          (item) => (
            <article
              className={`cnotice-card ${
                item.important
                  ? "important"
                  : ""
              }`}
              key={item.id}
            >

              <div className="cnotice-date">

                <FaCalendarAlt />

                <span>
                  {item.date ||
                    "No date"}
                </span>

              </div>


              <div className="cnotice-main">

                <div className="cnotice-meta">

                  <span className="cnotice-category">
                    {item.category ||
                      "School"}
                  </span>

                  {item.important && (
                    <span className="cnotice-important">
                      <FaExclamationCircle />

                      Important
                    </span>
                  )}

                  <span
                    className={`cnotice-status ${
                      item.status
                        ?.toLowerCase()
                    }`}
                  >
                    {item.status ||
                      "Draft"}
                  </span>

                </div>


                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description ||
                    item.fullNotice ||
                    "No description added."}
                </p>

              </div>


              <div className="cnotice-actions">

                <button
                  type="button"
                  className="cnotice-edit"
                  onClick={() =>
                    openEdit(item)
                  }
                >
                  <FaEdit />

                  Edit
                </button>

                <button
                  type="button"
                  className="cnotice-delete"
                  onClick={() =>
                    handleDelete(
                      item.id
                    )
                  }
                >
                  <FaTrash />
                </button>

              </div>

            </article>
          )
        )}


        {!filteredNotices.length && (
          <div className="cnotice-empty">

            <FaBullhorn />

            <strong>
              No notices found
            </strong>

            <span>
              Add a public notice
              to get started.
            </span>

          </div>
        )}

      </section>


      {/* MODAL */}

      {modalOpen && (
        <div className="cnotice-overlay">

          <div className="cnotice-modal">

            <button
              type="button"
              className="cnotice-close"
              onClick={
                closeModal
              }
            >
              <FaTimes />
            </button>


            <span className="cnotice-modalLabel">
              PUBLIC WEBSITE NOTICE
            </span>

            <h2>
              {editingId
                ? "Edit Notice"
                : "Add Notice"}
            </h2>


            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="cnotice-field">

                <label>
                  Notice Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter notice title"
                />

              </div>


              <div className="cnotice-two">

                <div className="cnotice-field">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option value="Admissions">
                      Admissions
                    </option>

                    <option value="School">
                      School
                    </option>

                    <option value="Examination">
                      Examination
                    </option>

                    <option value="Sports">
                      Sports
                    </option>

                    <option value="Event">
                      Event
                    </option>

                    <option value="General">
                      General
                    </option>
                  </select>

                </div>


                <div className="cnotice-field">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={
                      formData.date
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

              </div>


              <div className="cnotice-field">

                <label>
                  Short Description
                </label>

                <textarea
                  rows="3"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Short notice description"
                />

              </div>


              <div className="cnotice-field">

                <label>
                  Full Notice
                </label>

                <textarea
                  rows="6"
                  name="fullNotice"
                  value={
                    formData.fullNotice
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter complete notice"
                />

              </div>


              <div className="cnotice-two">

                <div className="cnotice-field">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>

                </div>


                <label className="cnotice-check">

                  <input
                    type="checkbox"
                    name="important"
                    checked={
                      formData.important
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span>
                    Mark as Important
                  </span>

                </label>

              </div>


              <div className="cnotice-formActions">

                <button
                  type="button"
                  className="cnotice-cancel"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cnotice-save"
                >
                  <FaSave />

                  {editingId
                    ? "Update Notice"
                    : "Publish Notice"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default ClientNotices;