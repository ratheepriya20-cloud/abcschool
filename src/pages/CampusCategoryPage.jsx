import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import "./CampusCategoryPage.css";

const CampusCategoryPage = ({
  label,
  title,
  highlight,
  description,
  image,
  features = [],
}) => {
  const navigate = useNavigate();

  return (
    <main className="campusCategoryPage">

      <section className="campusCategoryHero">

        <img
          src={image}
          alt={title}
        />

        <div className="campusCategoryOverlay" />

        <div className="campusCategoryContent">

          <button
            className="campusCategoryBack"
            onClick={() =>
              navigate("/campus-life")
            }
          >
            <FaArrowLeft />
            Campus Life
          </button>

          <span>
            {label}
          </span>

          <h1>
            {title}
            {highlight && (
              <em>
                {highlight}
              </em>
            )}
          </h1>

          <p>
            {description}
          </p>

        </div>

      </section>


      <section className="campusCategoryFeatureGrid">

        {features.map(
          (item, index) => (
            <article key={index}>

              <span>
                {String(index + 1)
                  .padStart(2, "0")}
              </span>

              <h2>
                {item.title}
              </h2>

              <p>
                {item.text}
              </p>

              <FaArrowRight />

            </article>
          )
        )}

      </section>

    </main>
  );
};

export default CampusCategoryPage;