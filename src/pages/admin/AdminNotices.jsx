import React, { useState } from "react";

import {
  FaBullhorn,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./AdminNotices.css";

const STORAGE_KEY = "abpsAdminNotices";

const defaultNotice = {
  title: "",
  category: "General",
  date: "",
  description: "",
  important: false,
};

const AdminNotices = () => {

  const [notices, setNotices] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(defaultNotice);

  const [selectedNotice, setSelectedNotice] = useState(null);

  const [message, setMessage] = useState("");

  const saveNotices = (updatedNotices) => {
    setNotices(updatedNotices);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedNotices)
    );
  };

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      ...defaultNotice,
      date: new Date().toISOString().split("T")[0],
    });

    setShowForm(true);
  };

  const openEditForm = (notice) => {
    setEditingId(notice.id);

    setFormData({
      title: notice.title || "",
      category: notice.category || "General",
      date: notice.date || "",
      description: notice.description || "",
      important: Boolean(notice.important),
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(defaultNotice);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter notice title.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter notice description.");
      return;
    }

    if (editingId) {

      const updated = notices.map((notice) =>
        notice.id === editingId
          ? {
              ...notice,
              ...formData,
            }
          : notice
      );

      saveNotices(updated);

      setMessage("Notice updated successfully.");

    } else {

      const newNotice = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      saveNotices([newNotice, ...notices]);

      setMessage("Notice added successfully.");
    }

    closeForm();

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const deleteNotice = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const updated = notices.filter(
      (notice) => notice.id !== id
    );

    saveNotices(updated);

    setMessage("Notice deleted successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className="abadminnotices">

      {/* HEADER */}

      <div className="abadminnotices-header">

        <div>

          <span className="abadminnotices-eyebrow">
            CONTENT MANAGEMENT
          </span>

          <h1>School Notices</h1>

          <p>
            Add, edit and manage important announcements
            that will appear in the Parent Portal.
          </p>

        </div>

        <button
          className="abadminnotices-add-btn"
          onClick={openAddForm}
        >
          <FaPlus />
          Add New Notice
        </button>

      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="abadminnotices-message">
          <FaCheckCircle />
          {message}
        </div>
      )}

      {/* TABLE */}

      <div className="abadminnotices-card">

        <div className="abadminnotices-card-head">

          <div>
            <strong>
              All Notices
            </strong>

            <span>
              {notices.length} notice
              {notices.length !== 1 ? "s" : ""}
            </span>
          </div>

          <FaBullhorn />

        </div>

        {notices.length === 0 ? (

          <div className="abadminnotices-empty">

            <div>
              <FaBullhorn />
            </div>

            <h3>No Notices Added</h3>

            <p>
              Start by creating your first school notice.
            </p>

            <button onClick={openAddForm}>
              <FaPlus />
              Create Notice
            </button>

          </div>

        ) : (

          <div className="abadminnotices-table-wrap">

            <table>

              <thead>
                <tr>
                  <th>Notice</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {notices.map((notice) => (

                  <tr key={notice.id}>

                    <td>
                      <div className="abadminnotices-title-cell">

                        <div className="abadminnotices-row-icon">
                          <FaBullhorn />
                        </div>

                        <div>
                          <strong>
                            {notice.title}
                          </strong>

                          <span>
                            {notice.description}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="abadminnotices-category">
                        {notice.category || "General"}
                      </span>
                    </td>

                    <td>
                      {notice.date || "—"}
                    </td>

                    <td>

                      {notice.important ? (
                        <span className="abadminnotices-important">
                          Important
                        </span>
                      ) : (
                        <span className="abadminnotices-normal">
                          Normal
                        </span>
                      )}

                    </td>

                    <td>

                      <div className="abadminnotices-actions">

                        <button
                          title="View"
                          onClick={() =>
                            setSelectedNotice(notice)
                          }
                        >
                          <FaEye />
                        </button>

                        <button
                          title="Edit"
                          onClick={() =>
                            openEditForm(notice)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          title="Delete"
                          onClick={() =>
                            deleteNotice(notice.id)
                          }
                          className="delete"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* FORM MODAL */}

      {showForm && (

        <div className="abadminnotices-modal-overlay">

          <div className="abadminnotices-form-modal">

            <div className="abadminnotices-modal-head">

              <div>
                <span>
                  {editingId
                    ? "UPDATE NOTICE"
                    : "NEW NOTICE"}
                </span>

                <h2>
                  {editingId
                    ? "Edit School Notice"
                    : "Create School Notice"}
                </h2>
              </div>

              <button onClick={closeForm}>
                <FaTimes />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="abadminnotices-form-grid">

                <div className="abadminnotices-field full">

                  <label>
                    Notice Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter notice title"
                  />

                </div>

                <div className="abadminnotices-field">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>General</option>
                    <option>Academic</option>
                    <option>Examination</option>
                    <option>Holiday</option>
                    <option>Admission</option>
                    <option>Fee</option>
                    <option>Event</option>
                    <option>Important</option>
                  </select>

                </div>

                <div className="abadminnotices-field">

                  <label>
                    Notice Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />

                </div>

                <div className="abadminnotices-field full">

                  <label>
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write complete notice details..."
                    rows="6"
                  />

                </div>

                <label className="abadminnotices-checkbox">

                  <input
                    type="checkbox"
                    name="important"
                    checked={formData.important}
                    onChange={handleChange}
                  />

                  <span>
                    Mark this notice as important
                  </span>

                </label>

              </div>

              <div className="abadminnotices-form-footer">

                <button
                  type="button"
                  className="cancel"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save"
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

      {/* VIEW MODAL */}

      {selectedNotice && (

        <div className="abadminnotices-modal-overlay">

          <div className="abadminnotices-view-modal">

            <button
              className="abadminnotices-view-close"
              onClick={() => setSelectedNotice(null)}
            >
              <FaTimes />
            </button>

            <div className="abadminnotices-view-icon">
              <FaBullhorn />
            </div>

            <span>
              {selectedNotice.category || "General"}
            </span>

            <h2>
              {selectedNotice.title}
            </h2>

            <div className="abadminnotices-view-date">
              {selectedNotice.date || "No date"}
            </div>

            {selectedNotice.important && (
              <div className="abadminnotices-view-important">
                <FaExclamationTriangle />
                Important Notice
              </div>
            )}

            <p>
              {selectedNotice.description}
            </p>

            <button
              className="abadminnotices-view-done"
              onClick={() => setSelectedNotice(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminNotices;