import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlay, FaArrowDown } from "react-icons/fa";
import "./AboutHero.css";

import aboutSchool from "../assets/school-building.jpg";

const AboutHero = () => {
  const navigate = useNavigate();

  const scrollToStory = () => {
    const section = document.getElementById("our-story");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="absAboutHero">
      {/* =========================
          SINGLE BACKGROUND IMAGE
      ========================== */}
      <div className="absAboutHero__image">
        <img
          src={aboutSchool}
          alt="AB Public School campus"
        />

        <div className="absAboutHero__imageShade" />
      </div>

      {/* LEFT WHITE GRADIENT */}
      <div className="absAboutHero__leftGradient" />

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div className="absAboutHero__container">
        <div className="absAboutHero__content">
          <div className="absAboutHero__label">
            <span>01</span>
            <i />
            <strong>ABOUT US</strong>
          </div>

          <h1>
            We Don’t Just
           
            Teach Lessons.
         

            <span>
              We Shape
              <br />
              Who They Become.
            </span>
          </h1>

          <p className="absAboutHero__description">
            At AB Public School, education goes beyond textbooks.
            We inspire curious minds, build strong character, and
            empower every child to create a brighter tomorrow.
          </p>

          <div className="absAboutHero__actions">
            <button
              type="button"
              className="absAboutHero__storyBtn"
              onClick={scrollToStory}
            >
              Explore Our Story
              <FaArrowRight />
            </button>

          </div>
        </div>

        {/* =========================
            RIGHT VALUES
        ========================== */}
        <aside className="absAboutHero__values">
          <div>
            <span>DISCIPLINE</span>
            <i />
          </div>

          <div>
            <span>KNOWLEDGE</span>
            <i />
          </div>

          <div>
            <span>CREATIVITY</span>
            <i />
          </div>

          <div>
            <span>LEADERSHIP</span>
            <i />
          </div>
        </aside>

        {/* =========================
            FOUNDATION CARD
        ========================== */}
        <div className="absAboutHero__foundation">
          <div className="absAboutHero__foundationTitle">
            <span>OUR</span>
            <strong>FOUNDATION</strong>
            <i />
          </div>

          <div className="absAboutHero__foundationItem">
            <strong>LEARN</strong>

            <p>
              deeply
              <span>•</span>
            </p>
          </div>

          <div className="absAboutHero__foundationItem">
            <strong>THINK</strong>

            <p>
              independently
              <span>•</span>
            </p>
          </div>

          <div className="absAboutHero__foundationItem">
            <strong>GROW</strong>

            <p>
              confidently
              <span>•</span>
            </p>
          </div>

          <div className="absAboutHero__established">
            <span>ABPS</span>
            <small>ESTD. 2001</small>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default AboutHero;