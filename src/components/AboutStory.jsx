import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheck,
  FaUsers,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";
import "./AboutStory.css";
import schoolimage from "../assets/school-campus.jpg";

const AboutStory = () => {
  const cards = [
    {
      icon: <FaLightbulb />,
      number: "01",
      title: "Explore",
      text: "Students discover their interests through experiences beyond textbooks.",
    },
    {
      icon: <FaUsers />,
      number: "02",
      title: "Connect",
      text: "Activities build teamwork, communication and meaningful relationships.",
    },
    {
      icon: <FaTrophy />,
      number: "03",
      title: "Grow",
      text: "Every experience develops confidence, character and leadership.",
    },
  ];

  return (
    <section className="abpsStoryPro">
      <div className="abpsStoryProContainer">

        {/* SECTION TOP */}
        <div className="abpsStoryProTop">
          <div className="abpsStoryProLabel">
            <span></span>
            BEYOND THE CLASSROOM
          </div>

          <div className="abpsStoryProTopLine"></div>

          <span className="abpsStoryProNumber">02</span>
        </div>

        {/* MAIN */}
        <div className="abpsStoryProLayout">

          {/* LEFT IMAGE */}
          <div className="abpsStoryProImageColumn">
            <div className="abpsStoryProImageBox">

              <img
                src={schoolimage}
                alt="AB Public School campus"
              />

              <div className="abpsStoryProImageOverlay"></div>

              <div className="abpsStoryProImageText">
                <span>AB PUBLIC SCHOOL</span>
                <strong>
                  Learning Beyond
                  <br />
                  The Classroom
                </strong>
              </div>

              <div className="abpsStoryProImageCorner">
                <span>25+</span>
                <small>YEARS</small>
              </div>

            </div>

            <div className="abpsStoryProImageBottom">
              <span>01</span>
              <p>Every experience becomes part of the journey.</p>
            </div>
          </div>

          {/* MIDDLE CONTENT */}
          <div className="abpsStoryProContent">

            <span className="abpsStoryProEyebrow">
              MORE THAN A CLASSROOM
            </span>

            <h2>
              Helping Students
              <em> Discover More.</em>
            </h2>

            <div className="abpsStoryProGoldLine"></div>

            <p className="abpsStoryProLead">
              Education becomes meaningful when students get the
              freedom to explore their interests, experience new
              possibilities and express themselves with confidence.
            </p>

            <p className="abpsStoryProDescription">
              At AB Public School, classroom learning is enriched
              through sports, arts, cultural activities, clubs,
              competitions and technology. These opportunities help
              students develop creativity, collaboration,
              communication and leadership skills.
            </p>

            <Link
              to="/activities"
              className="abpsStoryProButton"
            >
              Explore Student Life
              <FaArrowRight />
            </Link>

          </div>

          {/* RIGHT CARDS */}
          <div className="abpsStoryProCards">

            {cards.map((card) => (
              <article
                className="abpsStoryProCard"
                key={card.number}
              >
                <div className="abpsStoryProCardTop">
                  <div className="abpsStoryProCardIcon">
                    {card.icon}
                  </div>

                  <span>{card.number}</span>
                </div>

                <h3>{card.title}</h3>

                <div className="abpsStoryProCardLine"></div>

                <p>{card.text}</p>
              </article>
            ))}

          </div>
        </div>

        {/* BOTTOM STATEMENT */}
        <div className="abpsStoryProBottom">
          <div className="abpsStoryProBottomTitle">
            <FaCheck />
            <span>OUR BELIEF</span>
          </div>

          <p>
            Every student has something special to discover,
            develop and share with the world.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutStory;