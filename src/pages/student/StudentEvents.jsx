import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from "react-icons/fa";

import "./StudentEvents.css";

const StudentEvents = ({ events = [] }) => {
  const formatDate = (value) => {
    if (!value) return "Date not provided";

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
    <div className="studentEvents-page">

      <section className="studentEvents-hero">
        <div className="studentEvents-heroContent">
          <span>SCHOOL CALENDAR</span>

          <h1>Events</h1>

          <p>
            Stay updated with upcoming school events,
            activities, celebrations and important
            programmes.
          </p>
        </div>

        <div className="studentEvents-heroIcon">
          <FaCalendarAlt />
        </div>
      </section>

      <section className="studentEvents-heading">
        <div>
          <span>UPCOMING EVENTS</span>

          <h2>School Events & Activities</h2>

          <p>
            Important upcoming events published by
            the school will appear here.
          </p>
        </div>

        <div className="studentEvents-count">
          <strong>{events.length}</strong>
          <span>Total Events</span>
        </div>
      </section>

      {events.length > 0 ? (
        <div className="studentEvents-grid">
          {events.map((event, index) => (
            <article
              className="studentEvents-card"
              key={event.id || `event-${index}`}
            >
              <div className="studentEvents-cardTop">
                <div className="studentEvents-icon">
                  <FaCalendarCheck />
                </div>

                <span className="studentEvents-category">
                  {event.category || "School Event"}
                </span>
              </div>

              <h3>
                {event.title ||
                  event.name ||
                  "School Event"}
              </h3>

              <p>
                {event.description ||
                  event.details ||
                  "Event information will be available here."}
              </p>

              <div className="studentEvents-meta">
                <span>
                  <FaCalendarAlt />

                  <span>
                    <small>Date</small>
                    <strong>
                      {formatDate(
                        event.date ||
                        event.eventDate
                      )}
                    </strong>
                  </span>
                </span>

                {event.time && (
                  <span>
                    <FaClock />

                    <span>
                      <small>Time</small>
                      <strong>{event.time}</strong>
                    </span>
                  </span>
                )}
              </div>

              {event.location && (
                <div className="studentEvents-location">
                  <FaMapMarkerAlt />

                  <span>
                    {event.location}
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="studentEvents-empty">
          <FaCalendarAlt />

          <h3>No Events Available</h3>

          <p>
            There are currently no upcoming
            school events available.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentEvents;