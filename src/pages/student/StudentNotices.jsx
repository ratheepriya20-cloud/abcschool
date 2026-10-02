import React from "react";
import "./StudentNotices.css";

const StudentNotices = ({
  notices = [],
}) => {
  return (
    <div className="stuPage">
      <section className="stuHero small">
        <span>SCHOOL UPDATES</span>
        <h1>Notices</h1>
        <p>
          Important notices from school.
        </p>
      </section>

      {notices.length === 0 ? (
        <div className="stuEmpty">
          No notice available.
        </div>
      ) : (
        <div className="stuCards">
          {notices.map(
            (notice, index) => (
              <article
                className="stuCard"
                key={
                  notice.id || index
                }
              >
                <div className="stuCardTop">
                  <span>
                    {notice.category ||
                      "School"}
                  </span>

                  <span>
                    {notice.date || ""}
                  </span>
                </div>

                <h3>
                  {notice.title}
                </h3>

                <p>
                  {notice.description ||
                    notice.text ||
                    notice.fullNotice ||
                    ""}
                </p>
              </article>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default StudentNotices;