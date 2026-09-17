
import React from "react";
import { FaArrowRight, FaBell } from "react-icons/fa";
import "./ParentNotices.css";

const ParentNotices = ({ notices, onNotice }) => {
  return (
    <div className="abnotices-page">
      <div className="abnotices-heading">
        <span className="abnotices-label">SCHOOL UPDATES</span>
        <h1>Notices</h1>
        <p>Stay updated with the latest school announcements.</p>
      </div>

      <div className="abnotices-panel">
        <div className="abnotices-panel-header">
          <div>
            <span className="abnotices-label">ANNOUNCEMENTS</span>
            <h2>School Notices</h2>
          </div>

          <div className="abnotices-count">
            <FaBell />
            <span>{notices.length} Notices</span>
          </div>
        </div>

        <div className="abnotices-list">
          {notices.map((notice) => (
            <button
              className="abnotices-card"
              key={notice.id}
              onClick={() => onNotice(notice)}
            >
              <div className="abnotices-icon">
                <FaBell />
              </div>

              <div className="abnotices-content">
                <div className="abnotices-top">
                  <span className="abnotices-category">
                    {notice.category}
                  </span>

                  <small className="abnotices-date">
                    {notice.date}
                  </small>
                </div>

                <h3>{notice.title}</h3>

                <p>
                  {notice.description || notice.content}
                </p>
              </div>

              <div className="abnotices-arrow">
                <FaArrowRight />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentNotices;

