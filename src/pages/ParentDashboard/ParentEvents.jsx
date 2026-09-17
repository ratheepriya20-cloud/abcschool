
import React from "react";
import {
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./ParentEvents.css";

const ParentEvents = ({ events = [], onEvent }) => {
  return (
    <div className="abevents-page">
      <div className="abevents-heading">
        <span className="abevents-section-label">
          SCHOOL LIFE
        </span>

        <h1>Events</h1>

        <p>
          Explore upcoming school events and activities.
        </p>
      </div>

      <div className="abevents-grid">
        {events.length > 0 ? (
          events.map((event, index) => {
            const dateParts = event.date
              ? event.date.split(" ")
              : ["", ""];

            return (
              <button
                className="abevents-card"
                key={event.id || index}
                onClick={() => onEvent(event)}
              >
                <div className="abevents-date">
                  <strong>{dateParts[0]}</strong>
                  <span>{dateParts[1]}</span>
                </div>

                <div className="abevents-body">
                  <h3>{event.title}</h3>

                  <span className="abevents-time">
                    {event.time}
                  </span>

                  <div className="abevents-location">
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </div>

                  <p>
                    {event.description ||
                      "Parents are welcome to participate in this school event."}
                  </p>
                </div>

                <div className="abevents-footer">
                  <span>View Details</span>
                  <FaArrowRight />
                </div>
              </button>
            );
          })
        ) : (
          <div className="abevents-empty">
            No upcoming events available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentEvents;

