import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaArrowRight,
  FaGraduationCap,
  FaBookOpen,
  FaFlask,
  FaCalculator,
  FaLaptopCode,
  FaChartLine,
  FaUniversity,
  FaUsers,
  FaLightbulb,
  FaBriefcase,
  FaMicroscope,
  FaAward,
} from "react-icons/fa";

import "./SeniorSecondary.css";

const streams = [
  {
    icon: <FaFlask />,
    number: "01",
    title: "Science",
    text: "Build strong conceptual foundations through Physics, Chemistry, Biology, Mathematics and practical learning.",
  },
  {
    icon: <FaChartLine />,
    number: "02",
    title: "Commerce",
    text: "Develop financial awareness and business understanding through Accountancy, Economics and related subjects.",
  },
  {
    icon: <FaBookOpen />,
    number: "03",
    title: "Humanities",
    text: "Explore society, history, geography, political systems and human behaviour through deeper academic study.",
  },
  {
    icon: <FaLaptopCode />,
    number: "04",
    title: "Computer Science",
    text: "Develop computational thinking, problem-solving and digital skills for a technology-driven future.",
  },
];

const opportunities = [
  {
    icon: <FaUniversity />,
    title: "Higher Education",
    text: "Prepare students for universities, colleges and specialised professional programmes.",
  },
  {
    icon: <FaBriefcase />,
    title: "Career Awareness",
    text: "Help students understand career possibilities and make informed academic choices.",
  },
  {
    icon: <FaLightbulb />,
    title: "Independent Thinking",
    text: "Encourage analysis, research and thoughtful decision-making beyond textbooks.",
  },
  {
    icon: <FaUsers />,
    title: "Leadership",
    text: "Build communication, responsibility, teamwork and leadership qualities.",
  },
];

const SeniorSecondary = () => {
  return (
    <> <Navbar />
    <div className="absenior-page">

     

      {/* =================================================
          HERO
      ================================================= */}

      <section className="absenior-hero">

        <div className="absenior-hero-circle circle-one"></div>
        <div className="absenior-hero-circle circle-two"></div>

        <div className="absenior-hero-inner">

          <div className="absenior-hero-content">

            <div className="absenior-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/academics">Academics</Link>
              <span>/</span>
              <strong>Senior Secondary</strong>
            </div>

            <span className="absenior-eyebrow">
              SENIOR SECONDARY
            </span>

            <h1>
              Shape Your
              <span> Future.</span>
            
              Define Your Path.
            </h1>

            <p>
              Our Senior Secondary programme prepares students for higher
              education, competitive opportunities and the professional
              world through focused academics and future-ready skills.
            </p>

            <div className="absenior-buttons">

              <Link
                to="/admission"
                className="absenior-btn primary"
              >
                Explore Admissions
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="absenior-btn outline"
              >
                Talk To Us
              </Link>

            </div>

            <div className="absenior-stats">

              <div>
                <strong>01</strong>
                <span>Academic Excellence</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Career Direction</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Future Ready</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="absenior-hero-visual">

            <div className="absenior-orbit"></div>

            <div className="absenior-main-card">

              <div className="absenior-card-top">
                <span>SENIOR SECONDARY</span>
                <strong>04</strong>
              </div>

              <div className="absenior-main-icon">
                <FaGraduationCap />
              </div>

              <span className="absenior-card-label">
                YOUR NEXT CHAPTER
              </span>

              <h3>
                Learn With
                <span> Purpose.</span>
              </h3>

              <p>
                Focused learning, meaningful guidance and opportunities
                designed for the journey ahead.
              </p>

              <div className="absenior-card-progress">

                <div>
                  <span>Future Preparation</span>
                  <strong>92%</strong>
                </div>

                <div className="absenior-progress-line">
                  <span></span>
                </div>

              </div>

              <div className="absenior-card-tags">
                <span>Skills</span>
                <span>Knowledge</span>
                <span>Goals</span>
              </div>

            </div>

            <div className="absenior-floating">

              <FaAward />

              <div>
                <strong>Dream Bigger</strong>
                <span>Achieve More</span>
              </div>

            </div>

          </div>

        </div>

      </section>




      {/* =================================================
          STREAMS
      ================================================= */}

      <section className="absenior-streams">

        <div className="absenior-section-head">

          <div>

            <span>ACADEMIC STREAMS</span>

            <h2>
              Choose Your Direction.
            </h2>

          </div>

         

        </div>


        <div className="absenior-stream-grid">

          {streams.map((item, index) => (

            <article
              className="absenior-stream-card"
              key={index}
            >

              <div className="absenior-stream-number">
                {item.number}
              </div>

              <div className="absenior-stream-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <div className="absenior-stream-arrow">
                <FaArrowRight />
              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =================================================
          FUTURE
      ================================================= */}

      <section className="absenior-future">

        <div className="absenior-future-inner">

          <div className="absenior-future-content">

            <span>
              BEYOND THE CURRICULUM
            </span>

            <h2>
              Building A
              <strong> Future-Ready Mindset.</strong>
            </h2>

            <p>
              Academic performance matters, but true preparation also
              requires communication, confidence, critical thinking and
              the ability to adapt to a changing world.
            </p>

            <Link
              to="/academics"
              className="absenior-text-link"
            >
              Explore Our Academic Approach
              <FaArrowRight />
            </Link>

          </div>


          <div className="absenior-opportunity-grid">

            {opportunities.map((item, index) => (

              <div
                className="absenior-opportunity"
                key={index}
              >

                <div className="absenior-opportunity-icon">
                  {item.icon}
                </div>

                <div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          JOURNEY
      ================================================= */}

      <section className="absenior-journey">

        <div className="absenior-journey-head">

          <span>THE JOURNEY AHEAD</span>

          <h2>
            From Classroom To Career.
          </h2>

          <p>
            Every stage helps students move closer to their goals.
          </p>

        </div>


        <div className="absenior-journey-grid">

          <div className="absenior-journey-card">

            <strong>01</strong>

            <div className="absenior-journey-icon">
              <FaBookOpen />
            </div>

            <h3>Learn</h3>

            <p>
              Build strong subject knowledge and academic foundations.
            </p>

          </div>


          <div className="absenior-journey-card">

            <strong>02</strong>

            <div className="absenior-journey-icon">
              <FaMicroscope />
            </div>

            <h3>Explore</h3>

            <p>
              Discover interests through projects, research and practical
              experiences.
            </p>

          </div>


          <div className="absenior-journey-card">

            <strong>03</strong>

            <div className="absenior-journey-icon">
              <FaChartLine />
            </div>

            <h3>Prepare</h3>

            <p>
              Develop the skills and confidence required for the next stage.
            </p>

          </div>


          <div className="absenior-journey-card">

            <strong>04</strong>

            <div className="absenior-journey-icon">
              <FaGraduationCap />
            </div>

            <h3>Achieve</h3>

            <p>
              Step forward with clarity, confidence and a sense of purpose.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="absenior-cta">

        <div className="absenior-cta-ring"></div>

        <div className="absenior-cta-inner">

          <span>
            YOUR FUTURE STARTS HERE
          </span>

          <h2>
            Make The Next Step
            <strong> Count.</strong>
          </h2>

          <p>
            Give your child the academic foundation, guidance and confidence
            to move towards a successful future.
          </p>

          <Link
            to="/admission"
            className="absenior-cta-btn"
          >
            Start Your Journey
            <FaArrowRight />
          </Link>

        </div>

      </section>


    

    </div>
      <Footer />
      </>
  );
};

export default SeniorSecondary;