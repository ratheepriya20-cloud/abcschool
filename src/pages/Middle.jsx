import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaArrowRight,
  FaBookOpen,
  FaFlask,
  FaCalculator,
  FaLaptopCode,
  FaGlobeAsia,
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaSearch,
  FaTrophy,
  FaComments,
  FaBrain,
} from "react-icons/fa";

import "./Middle.css";

const middleSubjects = [
  {
    icon: <FaBookOpen />,
    number: "01",
    title: "Languages",
    text: "Strengthen reading, writing, communication and analytical language skills through meaningful learning.",
  },
  {
    icon: <FaCalculator />,
    number: "02",
    title: "Mathematics",
    text: "Develop mathematical reasoning, logical thinking and confidence through problem-solving.",
  },
  {
    icon: <FaFlask />,
    number: "03",
    title: "Science",
    text: "Understand scientific concepts through experiments, observation, investigation and discovery.",
  },
  {
    icon: <FaGlobeAsia />,
    number: "04",
    title: "Social Studies",
    text: "Explore history, geography, society and the world while developing responsible citizenship.",
  },
  {
    icon: <FaLaptopCode />,
    number: "05",
    title: "Technology",
    text: "Build digital awareness and technology skills through age-appropriate practical learning.",
  },
  {
    icon: <FaComments />,
    number: "06",
    title: "Communication",
    text: "Encourage students to express ideas clearly, confidently and respectfully.",
  },
];

const growthCards = [
  {
    icon: <FaBrain />,
    title: "Critical Thinking",
    text: "Students learn to question, analyse information and make thoughtful decisions.",
  },
  {
    icon: <FaSearch />,
    title: "Research & Discovery",
    text: "Projects and activities encourage independent exploration and curiosity.",
  },
  {
    icon: <FaUsers />,
    title: "Teamwork",
    text: "Collaborative activities develop communication, cooperation and leadership.",
  },
  {
    icon: <FaTrophy />,
    title: "Confidence",
    text: "Students receive opportunities to present ideas, participate and take responsibility.",
  },
];

const Middle = () => {
  return (
    <>
    <Navbar />
    <div className="abmiddle-page">

      

      {/* =================================================
          HERO
      ================================================= */}

      <section className="abmiddle-hero">

        <div className="abmiddle-hero-circle one"></div>
        <div className="abmiddle-hero-circle two"></div>

        <div className="abmiddle-hero-inner">

          <div className="abmiddle-hero-content">

            <div className="abmiddle-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/academics">Academics</Link>
              <span>/</span>
              <strong>Middle School</strong>
            </div>

            <span className="abmiddle-eyebrow">
              MIDDLE SCHOOL
            </span>

            <h1>
              Discover.
              <span> Question.</span>
              
              Become.
            </h1>

            <p>
              Middle School is where students move from learning the basics
              to understanding ideas deeply, thinking independently and
              discovering their unique strengths.
            </p>

            <div className="abmiddle-buttons">

              <Link
                to="/admission"
                className="abmiddle-btn primary"
              >
                Explore Admissions
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="abmiddle-btn outline"
              >
                Talk To Us
              </Link>

            </div>

            <div className="abmiddle-stats">

              <div>
                <strong>01</strong>
                <span>Independent Thinking</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Practical Learning</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Future Ready</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="abmiddle-hero-visual">

            <div className="abmiddle-orbit"></div>

            <div className="abmiddle-main-card">

              <div className="abmiddle-card-header">
                <span>MIDDLE SCHOOL</span>
                <strong>03</strong>
              </div>

              <div className="abmiddle-icon">
                <FaBrain />
              </div>

              <span className="abmiddle-card-label">
                THE NEXT LEVEL
              </span>

              <h3>
                Think Beyond
                <span> The Classroom.</span>
              </h3>

              <p>
                Helping students develop knowledge, confidence and the
                ability to think for themselves.
              </p>

              <div className="abmiddle-card-line">
                <span></span>
              </div>

              <div className="abmiddle-card-footer">
                <span>Knowledge</span>
                <span>Skills</span>
                <span>Character</span>
              </div>

            </div>

            <div className="abmiddle-floating">

              <FaChartLine />

              <div>
                <strong>Growing Every Day</strong>
                <span>Learning With Purpose</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          INTRO
      ================================================= */}


      <section className="abmiddle-subjects">

        <div className="abmiddle-section-head">

          <div>

            <span>ACADEMIC JOURNEY</span>

            <h2>
              Explore. Understand. Apply.
            </h2>

          </div>

         
        </div>


        <div className="abmiddle-subject-grid">

          {middleSubjects.map((item, index) => (

            <article
              className="abmiddle-subject-card"
              key={index}
            >

              <div className="abmiddle-subject-number">
                {item.number}
              </div>

              <div className="abmiddle-subject-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <div className="abmiddle-arrow">
                <FaArrowRight />
              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =================================================
          DEVELOPMENT
      ================================================= */}

      <section className="abmiddle-development">

        <div className="abmiddle-development-inner">

          <div className="abmiddle-development-content">

            <span>
              MORE THAN ACADEMICS
            </span>

            <h2>
              Developing Skills
              <strong> For The Real World.</strong>
            </h2>

            <p>
              We believe education should prepare students not only for
              examinations but also for challenges, opportunities and
              responsibilities beyond school.
            </p>

            <Link
              to="/academics"
              className="abmiddle-link"
            >
              Explore Our Academics
              <FaArrowRight />
            </Link>

          </div>


          <div className="abmiddle-growth-grid">

            {growthCards.map((item, index) => (

              <div
                className="abmiddle-growth-card"
                key={index}
              >

                <div className="abmiddle-growth-icon">
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
          LEARNING MODEL
      ================================================= */}

      <section className="abmiddle-model">

        <div className="abmiddle-model-head">

          <span>OUR LEARNING MODEL</span>

          <h2>
            Learning With Purpose.
          </h2>

        </div>


        <div className="abmiddle-model-grid">

          <div className="abmiddle-model-card">

            <strong>01</strong>

            <h3>Question</h3>

            <p>
              Students are encouraged to ask meaningful questions and
              challenge their assumptions.
            </p>

          </div>

          <div className="abmiddle-model-card">

            <strong>02</strong>

            <h3>Explore</h3>

            <p>
              They investigate ideas through research, experiments and
              hands-on experiences.
            </p>

          </div>

          <div className="abmiddle-model-card">

            <strong>03</strong>

            <h3>Apply</h3>

            <p>
              Knowledge is connected to real situations through projects
              and practical activities.
            </p>

          </div>

          <div className="abmiddle-model-card">

            <strong>04</strong>

            <h3>Reflect</h3>

            <p>
              Students evaluate their learning and understand how they can
              continue improving.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="abmiddle-cta">

        <div className="abmiddle-cta-circle"></div>

        <div className="abmiddle-cta-inner">

          <span>
            THE NEXT CHAPTER
          </span>

          <h2>
            Help Your Child
            <strong> Discover Their Potential.</strong>
          </h2>

          <p>
            Give your child an environment where curiosity becomes
            confidence and learning becomes a lifelong journey.
          </p>

          <Link
            to="/admission"
            className="abmiddle-cta-btn"
          >
            Begin The Journey
            <FaArrowRight />
          </Link>

        </div>

      </section>


   

    </div>
       <Footer />
       </>
  );
};

export default Middle;