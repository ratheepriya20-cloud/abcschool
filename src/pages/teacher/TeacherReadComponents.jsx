import React from "react";

import {
  FaInbox,
} from "react-icons/fa";

/* =========================================================
   SHARED PAGE HERO
   ========================================================= */

export const PageHero = ({
  eyebrow = "READ ONLY",
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="teacherRead-hero">

      <div className="teacherRead-heroContent">

        <span className="teacherRead-eyebrow">
          {eyebrow}
        </span>

        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}

      </div>

      {Icon && (
        <div className="teacherRead-heroIcon">
          <Icon />
        </div>
      )}

    </div>
  );
};


/* =========================================================
   SHARED EMPTY STATE
   ========================================================= */

export const Empty = ({
  title = "No Records Available",
  text = "No records are available right now.",
}) => {
  return (
    <div className="teacherRead-empty">

      <div className="teacherRead-emptyIcon">
        <FaInbox />
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
};  