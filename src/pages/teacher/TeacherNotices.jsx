import React from "react";
import {
  FaBullhorn,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";
import "./TeacherNotices.css";

const TeacherNotices = ({
  notices = [],
}) => (
  <div className="teacherRead-page">
    <PageHero
      eyebrow="SCHOOL COMMUNICATION"
      title="Notices"
      description="Read official school notices. Teacher access is read-only."
      icon={FaBullhorn}
    />

    {notices.length ? (
      <div className="teacherRead-cardGrid">
        {notices.map(
          (item) => (
            <article
              className="teacherRead-card"
              key={item.id}
            >
              <div className="teacherRead-cardTop">
                <div>
                  <FaBullhorn />
                </div>

                <span>
                  {item.category ||
                    "School"}
                </span>
              </div>

              <h3>
                {item.title ||
                  "School Notice"}
              </h3>

              <p>
                {item.fullNotice ||
                  item.description ||
                  item.message ||
                  ""}
              </p>

              <div className="teacherRead-meta">
                <span>
                  <FaCalendarAlt />
                  {item.date ||
                    item.createdAt ||
                    "-"}
                </span>
              </div>
            </article>
          )
        )}
      </div>
    ) : (
      <Empty text="No notices available." />
    )}
  </div>
);

export default TeacherNotices;