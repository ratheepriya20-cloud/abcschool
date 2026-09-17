import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaFlask,
  FaLaptop,
  FaUserGraduate,
} from "react-icons/fa";
import "./AcademicsSection.css";

import academicImage from "../assets/academic.jpg";

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
    <section className="academicShowcase">
      <div className="academicShowcaseContainer">

        {/* ================= LEFT CONTENT ================= */}
        <div className="academicShowcaseContent">

          <div className="academicSectionLabel">
            <span></span>
            <p>ACADEMICS & LEARNING</p>
          </div>

          <h2>
            Excellence <span>Begins With</span> Learning
          </h2>

          <p className="academicShowcaseIntro">
            At our school, education goes beyond textbooks. We create an
            engaging environment where students build knowledge, confidence,
            creativity and skills for the future.
          </p>

          {/* Academic Features */}
          <div className="academicFeatureList">

            {features.map((feature) => (
              <div
                className="academicFeatureItem"
                key={feature.number}
              >
                <div className="academicFeatureNumber">
                  {feature.number}
                </div>

                <div className="academicFeatureIcon">
                  {feature.icon}
                </div>

                <div className="academicFeatureInfo">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}

          </div>

          {/* Bottom Area */}
          <div className="academicShowcaseBottom">

            <div className="academicBottomText">
              <div className="academicBottomIcon">
                <FaBookOpen />
              </div>

              <div>
                <strong>Future Ready Education</strong>
                <span>Knowledge • Skills • Character</span>
              </div>
            </div>

            <button
              className="academicExploreBtn"
              onClick={() => navigate("/academics")}
            >
              Explore Academics
              <FaArrowRight />
            </button>

          </div>

        </div>

        {/* ================= RIGHT VISUAL ================= */}
        <div className="academicShowcaseVisual">

          <div className="academicImageFrame">

            <div className="academicImageGoldBorder"></div>

            <img
              src={academicImage}
              alt="Academic learning at school"
            />

            <div className="academicImageShade"></div>

            <div className="academicImageContent">
              <span>LEARN • GROW • LEAD</span>
              <h3>
                Education With
                <br />
                A Purpose
              </h3>
            </div>

          </div>

          {/* Floating Academic Badge */}
          <div className="academicFloatingBadge">
            <div className="academicBadgeIcon">
              <FaLaptop />
            </div>

            <div>
              <strong>Smart Learning</strong>
              <span>Modern Education</span>
            </div>
          </div>

          {/* Gold Number */}
          <div className="academicSideNumber">
            01
          </div>

        </div>

      </div>
    </section>
  );
};

export default AcademicsSection;