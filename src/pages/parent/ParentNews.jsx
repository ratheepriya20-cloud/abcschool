import React, { useMemo, useState } from "react";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaTag,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

import "./ParentNews.css";

const ParentNews = ({ news = [] }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  const publishedNews = useMemo(() => {
    return [...news]
      .filter(
        (item) =>
          !item?.status ||
          item.status === "Published"
      )
      .sort(
        (a, b) =>
          new Date(b?.date || 0) -
          new Date(a?.date || 0)
      );
  }, [news]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="parentNews-page">

      <section className="parentNews-hero">
        <div>
          <span className="parentNews-label">
            SCHOOL UPDATES
          </span>

          <h1>Latest School News</h1>

          <p>
            Stay informed about school activities,
            achievements, celebrations and important
            updates.
          </p>
        </div>

        <div className="parentNews-heroIcon">
          <FaNewspaper />
        </div>
      </section>

      {publishedNews.length === 0 ? (
        <div className="parentNews-empty">
          <FaNewspaper />

          <h2>No News Available</h2>

          <p>
            Published school news will appear here.
          </p>
        </div>
      ) : (
        <div className="parentNews-grid">
          {publishedNews.map((item) => (
            <article
              className="parentNews-card"
              key={item.id}
            >
              {item.image ? (
                <div className="parentNews-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              ) : (
                <div className="parentNews-image parentNews-placeholder">
                  <FaNewspaper />
                </div>
              )}

              <div className="parentNews-cardBody">
                <div className="parentNews-meta">
                  <span>
                    <FaCalendarAlt />
                    {formatDate(item.date)}
                  </span>

                  <span>
                    <FaTag />
                    {item.category || "School"}
                  </span>
                </div>

                <h2>{item.title}</h2>

                <p>
                  {item.shortDescription ||
                    item.fullDescription ||
                    "School news update."}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedNews(item)}
                >
                  Read Full News
                  <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedNews && (
        <div
          className="parentNews-modalOverlay"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="parentNews-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="parentNews-close"
              onClick={() => setSelectedNews(null)}
            >
              <FaTimes />
            </button>

            <span className="parentNews-modalLabel">
              {selectedNews.category || "School News"}
            </span>

            <h2>{selectedNews.title}</h2>

            <div className="parentNews-modalDate">
              <FaCalendarAlt />
              {formatDate(selectedNews.date)}
            </div>

            <p>
              {selectedNews.fullDescription ||
                selectedNews.shortDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentNews;