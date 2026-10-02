import React from "react";

import {
  FaBullhorn,
  FaCalendarAlt,
  FaExclamationCircle,
  FaGraduationCap,
  FaInfoCircle,
} from "react-icons/fa";

import "./ParentNotices.css";

const ParentNotices = ({
  notices = [],
}) => {

  const getIcon = (
    category
  ) => {

    if (
      category === "Important"
    ) {
      return FaExclamationCircle;
    }

    if (
      category === "Academic"
    ) {
      return FaGraduationCap;
    }

    return FaInfoCircle;
  };


  return (
    <div className="pp-page">

      <section className="pp-page-hero">

        <span className="pp-eyebrow">
          SCHOOL COMMUNICATION
        </span>

        <h1>
          Notices & Announcements
        </h1>

        <p>
          Important school notices,
          academic announcements and
          information for parents.
        </p>

      </section>


      <section className="pp-notice-grid">

        {notices.map(
          (notice) => {

            const Icon =
              getIcon(
                notice.category
              );

            return (

              <article
                className="pp-notice-card"
                key={notice.id}
              >

                <div className="pp-notice-top">

                  <span className="pp-notice-icon">
                    <Icon />
                  </span>

                  <span className="pp-category">
                    {notice.category}
                  </span>

                </div>


                <span className="pp-notice-label">
                  <FaBullhorn />
                  SCHOOL NOTICE
                </span>


                <h2>
                  {notice.title}
                </h2>


                <p>
                  {notice.description}
                </p>


                <div className="pp-notice-date">

                  <FaCalendarAlt />

                  {notice.date}

                </div>

              </article>

            );
          }
        )}

      </section>

    </div>
  );
};


export default ParentNotices;