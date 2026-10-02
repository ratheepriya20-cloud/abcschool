import React from "react";

import {
  FaNewspaper,
  FaCalendarAlt,
  FaTag,
  FaClock,
} from "react-icons/fa";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";
import "./TeacherNews.css";

const TeacherNews = ({ news = [] }) => {
  const formatDate = (value) => {
    if (!value) return "Date not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="teacherNews-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="teacherNews-hero">

        <div className="teacherNews-heroContent">

          <span className="teacherNews-eyebrow">
            SCHOOL UPDATES
          </span>

          <h1>Latest News</h1>

          <p>
            Stay informed about school achievements,
            activities, announcements and important
            campus updates.
          </p>

          <div className="teacherNews-readOnly">
            <FaNewspaper />
            Read Only Access
          </div>

        </div>

        <div className="teacherNews-heroVisual">

          <div className="teacherNews-heroIcon">
            <FaNewspaper />
          </div>

          <span>AB Public School</span>

        </div>

      </section>

      {/* =========================================
          HEADING
      ========================================= */}

      <section className="teacherNews-heading">

        <div>
          <span>LATEST STORIES</span>

          <h2>School News & Highlights</h2>

          <p>
            Latest news published by the school
            administration will appear here.
          </p>
        </div>

        <div className="teacherNews-count">
          <strong>{news.length}</strong>
          <span>Total News</span>
        </div>

      </section>

      {/* =========================================
          NEWS
      ========================================= */}

      {news.length > 0 ? (

        <div className="teacherNews-grid">

          {news.map((item, index) => {

            const title =
              item?.title ||
              item?.heading ||
              item?.name ||
              "School News";

            const description =
              item?.description ||
              item?.content ||
              item?.details ||
              item?.fullNews ||
              item?.message ||
              "No additional information available.";

            const category =
              item?.category ||
              item?.type ||
              "School News";

            const date =
              item?.date ||
              item?.publishedDate ||
              item?.createdAt;

            return (
              <article
                className="teacherNews-card"
                key={
                  item?.id ||
                  `teacher-news-${index}`
                }
              >

                {/* TOP ACCENT */}

                <div className="teacherNews-cardAccent" />

                {/* ICON */}

                <div className="teacherNews-cardHeader">

                  <div className="teacherNews-cardIcon">
                    <FaNewspaper />
                  </div>

                  <span className="teacherNews-category">
                    <FaTag />
                    {category}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="teacherNews-cardContent">

                  <span className="teacherNews-cardLabel">
                    SCHOOL UPDATE
                  </span>

                  <h3>{title}</h3>

                  <p>{description}</p>

                </div>

                {/* FOOTER */}

                <div className="teacherNews-cardFooter">

                  <span>
                    <FaCalendarAlt />
                    {formatDate(date)}
                  </span>

                  <span>
                    <FaClock />
                    Published
                  </span>

                </div>

              </article>
            );
          })}

        </div>

      ) : (

        <div className="teacherNews-empty">

          <div>
            <FaNewspaper />
          </div>

          <h3>No News Available</h3>

          <p>
            New school updates published by the
            administration will appear here.
          </p>

        </div>

      )}

    </div>
  );
};

export default TeacherNews;