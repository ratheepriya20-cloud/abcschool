import React from "react";
import {
  FaCalendarAlt,
} from "react-icons/fa";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";

import "./TeacherEvents.css";

const TeacherEvents = ({
  events = [],
}) => (
  <div className="teacherRead-page">
    <PageHero
      eyebrow="SCHOOL CALENDAR"
      title="Events"
      description="View upcoming school events and activities."
      icon={FaCalendarAlt}
    />

    {events.length ? (
      <div className="teacherRead-cardGrid">
        {events.map(
          (item) => (
            <article
              className="teacherRead-card"
              key={item.id}
            >
              <div className="teacherRead-cardTop">
                <div>
                  <FaCalendarAlt />
                </div>

                <span>
                  {item.category ||
                    "Event"}
                </span>
              </div>

              <h3>
                {item.title ||
                  item.name ||
                  "School Event"}
              </h3>

              <p>
                {item.description ||
                  item.details ||
                  ""}
              </p>

              <div className="teacherRead-meta">
                <span>
                  <FaCalendarAlt />
                  {item.date ||
                    item.eventDate ||
                    "-"}
                </span>
              </div>
            </article>
          )
        )}
      </div>
    ) : (
      <Empty text="No events available." />
    )}
  </div>
);

export default TeacherEvents;