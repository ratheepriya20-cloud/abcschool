import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaFlask,
  FaLaptop,
  FaUserGraduate,
  FaAtom,
  FaQuoteLeft,
} from "react-icons/fa";

import "./AcademicsSection.css";

import academicImage from "../assets/campus-students.jpg";

const AcademicsSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      icon: <FaBookOpen />,
      title: "Concept Based Learning",
      text: "Strong fundamentals and clear concepts for confident learning.",
    },
    {
      number: "02",
      icon: <FaFlask />,
      title: "Practical Education",
      text: "Activities and experiments that connect knowledge with real life.",
    },
    {
      number: "03",
      icon: <FaUserGraduate />,
      title: "Student Focused Growth",
      text: "Personal guidance that supports every student's progress.",
    },
  ];

  return (
    <section className="abAcademic">
      {/* BACKGROUND DECORATION */}
      <div className="abAcademicBgCircle abAcademicBgCircleOne"></div>
      <div className="abAcademicBgCircle abAcademicBgCircleTwo"></div>

      <div className="abAcademicContainer">
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}
        <div className="abAcademicContent">
          {/* LABEL */}
          <div className="abAcademicLabel">
            <span className="abAcademicLabelLine"></span>

            <div className="abAcademicLabelIcon">
              <FaBookOpen />
            </div>

            <p>ACADEMICS & LEARNING</p>

            <span className="abAcademicLabelLine"></span>
          </div>

          {/* HEADING */}
          <h2 className="abAcademicHeading">
            Excellence
            <span>Begins With</span>
            Learning
          </h2>

          <div className="abAcademicHeadingLine"></div>

          {/* DESCRIPTION */}
          <p className="abAcademicIntro">
            At our school, education goes beyond textbooks. We create an
            engaging environment where students build knowledge, confidence,
            creativity and skills for the future.
          </p>

          {/* ===================================================
              FEATURE CARDS
          =================================================== */}
          <div className="abAcademicFeatures">
            {features.map((feature) => (
              <div className="abAcademicFeature" key={feature.number}>
                {/* NUMBER */}
                <div className="abAcademicFeatureNumber">
                  {feature.number}
                </div>

                {/* ICON */}
                <div className="abAcademicFeatureIcon">
                  {feature.icon}
                </div>

                {/* TEXT */}
                <div className="abAcademicFeatureText">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>

                {/* ARROW */}
                <div className="abAcademicFeatureArrow">
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>

          {/* ===================================================
              BOTTOM
          =================================================== */}
          <div className="abAcademicBottom">
            <button
              type="button"
              className="abAcademicButton"
              onClick={() => navigate("/academics")}
            >
              <span>Explore Academics</span>

              <b>
                <FaArrowRight />
              </b>
            </button>

            <div className="abAcademicFuture">
              <div className="abAcademicFutureIcon">
                <FaBookOpen />
              </div>

              <div>
                <strong>Future Ready Education</strong>
                <span>KNOWLEDGE • SKILLS • CHARACTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT VISUAL
        ===================================================== */}
        <div className="abAcademicVisual">
          {/* BIG BACK NUMBER */}
          <div className="abAcademicBigNumber">
            01
          </div>

          {/* DOT PATTERN */}
          <div className="abAcademicDots">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>

          {/* BACK NAVY SHAPE */}
          <div className="abAcademicBackShape"></div>

          {/* MAIN IMAGE */}
          <div className="abAcademicImageFrame">
            <img
              src={academicImage}
              alt="Students learning at AB Public School"
            />

            <div className="abAcademicImageOverlay"></div>

            {/* IMAGE TEXT */}
            <div className="abAcademicImageText">
              <FaQuoteLeft />

              <small>LEARN • GROW • LEAD</small>

              <h3>
                Education With
                <span>A Purpose</span>
              </h3>

              <div className="abAcademicImageTextLine"></div>
            </div>
          </div>

          {/* ===================================================
              SMART LEARNING CARD
          =================================================== */}
          <div className="abAcademicSmartCard">
            <div className="abAcademicSmartIcon">
              <FaLaptop />
            </div>

            <div>
              <strong>Smart Learning</strong>
              <span>Modern Education</span>
              <small>for Brighter Futures</small>
            </div>

            <i></i>
          </div>

          {/* ===================================================
              SCIENCE FLOATING CARD
          =================================================== */}
          <div className="abAcademicScience">
            <div className="abAcademicScienceImage">
              <img
                src={academicImage}
                alt="Practical academic learning"
              />
            </div>

            <div className="abAcademicScienceBadge">
              <FaAtom />

              <span>
                DISCOVERY
                <small>CREATIVITY</small>
                <small>PROGRESS</small>
              </span>
            </div>
          </div>

          {/* SIDE TEXT */}
          <div className="abAcademicSideWords">
            <span>LEARN</span>
            <span>GROW</span>
            <span>LEAD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;