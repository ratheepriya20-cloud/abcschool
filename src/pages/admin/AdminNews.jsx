import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaNewspaper,
  FaCalendarAlt,
} from "react-icons/fa";
import "./AdminNews.css";

const STORAGE_KEY = "abpsAdminNews";

const defaultNews = [
  {
    id: 1,
    title: "Students Achieve Excellent Results",
    date: "08 Sep 2026",
    category: "Achievement",
    description:
      "Our students have performed exceptionally well in academics and brought pride to the school.",
  },
  {
    id: 2,
    title: "New Academic Session Activities",
    date: "05 Sep 2026",
    category: "School News",
    description:
      "Various academic and co-curricular activities have been planned for the new academic session.",
  },
];

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "School News",
    description: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setNews(JSON.parse(saved));
    } else {
      setNews(defaultNews);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNews));
    }
  }, []);

  const saveData = (data) => {
    setNews(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    window.dispatchEvent(new Event("abpsDataUpdated"));
  };

  const openAdd = () => {
    setEditId(null);
    setFormData({
      title: "",
      date: "",
      category: "School News",
      description: "",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      title: item.title,
      date: item.date,
      category: item.category,
      description: item.description,
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date || !formData.description.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    if (editId) {
      const updated = news.map((item) =>
        item.id === editId ? { ...item, ...formData } : item
      );

      saveData(updated);
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
      };

      saveData([newItem, ...news]);
    }

    setShowForm(false);
  };

  const deleteNews = (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    saveData(news.filter((item) => item.id !== id));
  };

  return (
    <div className="adminNewsPage">
      <div className="adminNewsHeader">
        <div>
          <span className="adminNewsEyebrow">
            <FaNewspaper /> CONTENT MANAGEMENT
          </span>

          <h1>School News</h1>
          <p>Manage all news displayed on the school website and parent portal.</p>
        </div>

        <button className="adminNewsAddBtn" onClick={openAdd}>
          <FaPlus />
          Add News
        </button>
      </div>

      <div className="adminNewsGrid">
        {news.length === 0 ? (
          <div className="adminNewsEmpty">
            <FaNewspaper />
            <h3>No News Available</h3>
            <p>Add your first school news update.</p>
          </div>
        ) : (
          news.map((item) => (
            <article className="adminNewsCard" key={item.id}>
              <div className="adminNewsCardTop">
                <span>{item.category}</span>
                <FaNewspaper />
              </div>

              <h2>{item.title}</h2>

              <div className="adminNewsDate">
                <FaCalendarAlt />
                {item.date}
              </div>

              <p>{item.description}</p>

              <div className="adminNewsActions">
                <button onClick={() => setViewItem(item)}>
                  <FaEye /> View
                </button>

                <button onClick={() => openEdit(item)}>
                  <FaEdit /> Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteNews(item.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {showForm && (
        <div className="adminNewsOverlay">
          <div className="adminNewsModal">
            <button
              className="adminNewsClose"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <div className="adminNewsModalTitle">
              <FaNewspaper />
              <div>
                <h2>{editId ? "Edit News" : "Add News"}</h2>
                <p>Enter school news details.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                News Title
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter news title"
                />
              </label>

              <div className="adminNewsTwoColumns">
                <label>
                  Date
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="08 Sep 2026"
                  />
                </label>

                <label>
                  Category
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                  >
                    <option>School News</option>
                    <option>Achievement</option>
                    <option>Academic</option>
                    <option>Event</option>
                    <option>Sports</option>
                    <option>Cultural</option>
                    <option>Announcement</option>
                  </select>
                </label>
              </div>

              <label>
                Description
                <textarea
                  rows="6"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write complete news description..."
                />
              </label>

              <button className="adminNewsSubmit" type="submit">
                {editId ? "Update News" : "Publish News"}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewItem && (
        <div className="adminNewsOverlay">
          <div className="adminNewsViewModal">
            <button
              className="adminNewsClose"
              onClick={() => setViewItem(null)}
            >
              <FaTimes />
            </button>

            <span>{viewItem.category}</span>
            <h2>{viewItem.title}</h2>

            <div className="adminNewsDate">
              <FaCalendarAlt />
              {viewItem.date}
            </div>

            <p>{viewItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;