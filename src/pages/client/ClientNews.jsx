import React, { useEffect, useMemo, useState } from "react";
import {
  FaNewspaper,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
  FaImage,
  FaEye,
} from "react-icons/fa";

import "./ClientNews.css";

import {
  getNews,
  addNews,
  updateNews,
  deleteNews,
  initializeNews,
} from "../../data/newsData";

const emptyForm = {
  title: "",
  category: "School",
  date: "",
  shortDescription: "",
  fullDescription: "",
  image: "",
  status: "Published",
};

const ClientNews = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  /* =========================
     LOAD
  ========================= */

  const loadNews = () => {
    initializeNews?.();
    setNews(getNews() || []);
  };

  useEffect(() => {
    loadNews();
  }, []);

  /* =========================
     FILTER
  ========================= */

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const text = `
        ${item.title || ""}
        ${item.category || ""}
        ${item.shortDescription || ""}
      `.toLowerCase();

      const searchMatch = text.includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        item.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [news, search, statusFilter]);

  /* =========================
     MODAL
  ========================= */

  const openAdd = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      date: new Date().toISOString().split("T")[0],
    });

    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      category: item.category || "School",
      date: item.date || "",
      shortDescription:
        item.shortDescription ||
        item.description ||
        "",
      fullDescription:
        item.fullDescription ||
        item.fullNews ||
        "",
      image: item.image || "",
      status: item.status || "Published",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  /* =========================
     INPUT
  ========================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     IMAGE
  ========================= */

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image 1.5MB se chhoti rakho.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     SAVE
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("News title required hai.");
      return;
    }

    if (!formData.date) {
      alert("News date required hai.");
      return;
    }

    if (editingId) {
      updateNews(editingId, formData);
    } else {
      addNews(formData);
    }

    loadNews();
    closeModal();
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Kya aap is news ko delete karna chahte ho?"
    );

    if (!confirmed) return;

    deleteNews(id);
    loadNews();
  };

  return (
    <div className="clientNews-page">

      {/* HEADER */}

      <section className="clientNews-header">
        <div>
          <span>PUBLIC WEBSITE</span>

          <h1>News Management</h1>

          <p>
            Add, edit and manage news displayed on the
            public school website.
          </p>
        </div>

        <button type="button" onClick={openAdd}>
          <FaPlus />
          Add News
        </button>
      </section>

      {/* TOOLBAR */}

      <section className="clientNews-toolbar">
        <div className="clientNews-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </section>

      {/* CARDS */}

      <section className="clientNews-grid">
        {filteredNews.map((item) => (
          <article className="clientNews-card" key={item.id}>

            <div className="clientNews-image">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <div className="clientNews-placeholder">
                  <FaNewspaper />
                </div>
              )}

              <span
                className={`clientNews-status ${
                  item.status?.toLowerCase() || "draft"
                }`}
              >
                {item.status || "Draft"}
              </span>
            </div>

            <div className="clientNews-content">
              <div className="clientNews-meta">
                <span>{item.category || "School"}</span>
                <small>{item.date || "No date"}</small>
              </div>

              <h3>{item.title}</h3>

              <p>
                {item.shortDescription ||
                  item.description ||
                  "No description added."}
              </p>

              <div className="clientNews-actions">
                <button
                  type="button"
                  className="clientNews-edit"
                  onClick={() => openEdit(item)}
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  type="button"
                  className="clientNews-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </article>
        ))}

        {!filteredNews.length && (
          <div className="clientNews-empty">
            <FaNewspaper />
            <strong>No news found</strong>
            <span>Add a news item to get started.</span>
          </div>
        )}
      </section>

      {/* MODAL */}

      {modalOpen && (
        <div className="clientNews-overlay">
          <div className="clientNews-modal">

            <button
              type="button"
              className="clientNews-close"
              onClick={closeModal}
            >
              <FaTimes />
            </button>

            <span className="clientNews-modalLabel">
              WEBSITE NEWS
            </span>

            <h2>
              {editingId ? "Edit News" : "Add News"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="clientNews-field">
                <label>News Title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter news title"
                />
              </div>

              <div className="clientNews-two">

                <div className="clientNews-field">
                  <label>Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="School">School</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Event">Event</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Achievement">Achievement</option>
                  </select>
                </div>

                <div className="clientNews-field">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="clientNews-field">
                <label>Short Description</label>

                <textarea
                  rows="3"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Short description for news card"
                />
              </div>

              <div className="clientNews-field">
                <label>Full News</label>

                <textarea
                  rows="6"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Enter complete news details"
                />
              </div>

              <div className="clientNews-two">

                <div className="clientNews-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>
                </div>

                <div className="clientNews-field">
                  <label>News Image</label>

                  <label className="clientNews-upload">
                    <FaImage />
                    Select Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </label>
                </div>
              </div>

              {formData.image && (
                <div className="clientNews-formImage">
                  <img
                    src={formData.image}
                    alt="News preview"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        image: "",
                      }))
                    }
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              <div className="clientNews-formActions">
                <button
                  type="button"
                  className="clientNews-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="clientNews-save"
                >
                  <FaSave />

                  {editingId
                    ? "Update News"
                    : "Publish News"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientNews;