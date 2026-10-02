import React from "react";

import {
  FaClipboardList,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";

import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";

import "./TeacherAssignments.css";

const TeacherAssignments = ({
  assignments = [],
}) => {
  return (
    <div className="teacherRead-page">

      {/* =========================
          HERO
      ========================= */}

      <PageHero
        eyebrow="READ ONLY"
        title="Assignments"
        description="View assignments available for your assigned classes."
        icon={FaClipboardList}
      />

      {/* =========================
          ASSIGNMENTS
      ========================= */}

      {assignments.length > 0 ? (
        <div className="teacherRead-cardGrid">

          {assignments.map((item, index) => {
            const status =
              item?.status || "Active";

            const statusClass = String(status)
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-");

            return (
              <article
                className="teacherRead-card"
                key={
                  item?.id ||
                  `teacher-assignment-${index}`
                }
              >

                {/* CARD TOP */}

                <div className="teacherRead-cardTop">

                  <div className="teacherRead-cardIcon">
                    <FaClipboardList />
                  </div>

                  <span
                    className={`teacherRead-cardStatus ${statusClass}`}
                  >
                    {status}
                  </span>

                </div>

                {/* SUBJECT */}

                <small className="teacherRead-cardLabel">
                  {item?.subject ||
                    "Assignment"}
                </small>

                {/* TITLE */}

                <h3>
                  {item?.title ||
                    item?.topic ||
                    "Assignment"}
                </h3>

                {/* DESCRIPTION */}

                <p>
                  {item?.description ||
                    item?.details ||
                    "No description available."}
                </p>

                {/* META INFORMATION */}

                <div className="teacherRead-meta">

                  <span>
                    <FaBookOpen />

                    {item?.className ||
                      item?.class ||
                      "All Classes"}

                    {item?.section
                      ? ` - ${item.section}`
                      : ""}
                  </span>

                  <span>
                    <FaCalendarAlt />

                    Due:{" "}
                    {item?.dueDate ||
                      item?.due ||
                      "-"}
                  </span>

                </div>

              </article>
            );
          })}

        </div>
      ) : (

        <Empty
          title="No Assignments Available"
          text="No assignments are available for your assigned classes."
        />

      )}

    </div>
  );
};

export default TeacherAssignments;