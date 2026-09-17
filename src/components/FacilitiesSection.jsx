import React from "react";
import { useNavigate } from "react-router-dom";
import "./FacilitiesSection.css";

import facilityImage from "../assets/school-facilities.jpg";

const facilities = [
  {
    icon: "⌘",
    title: "Smart Classrooms",
    text: "Interactive learning with modern digital teaching tools.",
  },
  {
    icon: "⚗",
    title: "Science Labs",
    text: "Practical experiments that turn concepts into experiences.",
  },
  {
    icon: "▣",
    title: "Computer Lab",
    text: "Technology-focused learning in a modern computer environment.",
  },
  {
    icon: "⚽",
    title: "Sports & Games",
    text: "Opportunities to build fitness, teamwork and confidence.",
  },
  {
    icon: "▤",
    title: "Library",
    text: "A learning space filled with books and useful resources.",
  },
  {
    icon: "♬",
    title: "Activity Rooms",
    text: "Creative spaces for music, art and co-curricular activities.",
  },
];

const FacilitiesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="facilitiesSection">

      <div className="facilitiesContainer">

        {/* TOP HEADING */}
        <div className="facilitiesHeading">

          <div>
            <span className="facilitiesLabel">
              SCHOOL FACILITIES
            </span>

            <h2>
              An Environment
              <span>Made to Inspire.</span>
            </h2>
          </div>

          <p>
            From technology-enabled classrooms to sports and
            creative spaces, we provide an environment where
            students can learn, explore and grow.
          </p>

        </div>


        {/* MAIN AREA */}
        <div className="facilitiesMain">

          {/* IMAGE */}
          <div className="facilitiesVisual">

            <div className="facilitiesImageFrame">

              <img
                src={facilityImage}
                alt="School campus and facilities"
              />

              <div className="facilitiesImageOverlay"></div>

              <div className="facilitiesImageText">
                <span>OUR CAMPUS</span>
                <strong>Learn. Explore. Grow.</strong>
              </div>

            </div>

            <div className="facilitiesGoldShape"></div>

          </div>


          {/* CARDS */}
          <div className="facilitiesGrid">

            {facilities.map((facility, index) => (
              <div
                className="facilityCard"
                key={facility.title}
              >

                <div className="facilityTop">

                  <span className="facilityIcon">
                    {facility.icon}
                  </span>

                  <span className="facilityIndex">
                    0{index + 1}
                  </span>

                </div>

                <h3>{facility.title}</h3>

                <p>{facility.text}</p>

                <span className="facilityArrow">
                  ↗
                </span>

              </div>
            ))}

          </div>

        </div>


        {/* CTA */}
        <div className="facilitiesCTA">

          <div>
            <strong>
              Discover everything our campus offers.
            </strong>

            <span>
              Explore our facilities and learning spaces.
            </span>
          </div>

          <button
            onClick={() => navigate("/facilities")}
          >
            View All Facilities
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default FacilitiesSection;