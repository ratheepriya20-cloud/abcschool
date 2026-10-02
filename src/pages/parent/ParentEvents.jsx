import React from "react";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import "./ParentEvents.css";

const ParentEvents = ({
  events = [],
}) => {

  return (
    <div className="pp-page">

      <section className="pp-page-hero">

        <span className="pp-eyebrow">
          SCHOOL CALENDAR
        </span>

        <h1>
          Upcoming Events
        </h1>

        <p>
          Keep track of upcoming school
          events, activities and important
          dates.
        </p>

      </section>


      <section className="pp-events-grid">

        {events.map(
          (event, index) => (

            <article
              className="pp-event-card"
              key={event.id}
            >

              <div className="pp-event-number">

                {String(
                  index + 1
                ).padStart(2, "0")}

              </div>


              <div className="pp-event-card-icon">

                <FaCalendarAlt />

              </div>


              <span>
                UPCOMING EVENT
              </span>


              <h2>
                {event.title}
              </h2>


              <div className="pp-event-info">

                <p>
                  <FaCalendarAlt />
                  {event.date}
                </p>

                <p>
                  <FaMapMarkerAlt />
                  {event.location}
                </p>

              </div>


              <div className="pp-event-bottom">

                <span>
                  AB PUBLIC SCHOOL
                </span>

                <FaArrowRight />

              </div>

            </article>

          )
        )}

      </section>

    </div>
  );
};


export default ParentEvents;