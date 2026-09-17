import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaBrain,
  FaFlask,
  FaLaptopCode,
  FaPalette,
  FaGlobeAsia,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
  FaCheck,
  FaChartLine,
  FaCalculator,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Curriculum.css";


const curriculumAreas = [
  {
    icon: <FaBookOpen />,
    number: "01",
    title: "Languages",
    text: "Strong language skills help students communicate clearly, read confidently and express their ideas effectively.",
  },
  {
    icon: <FaCalculator />,
    number: "02",
    title: "Mathematics",
    text: "Logical thinking, numerical understanding and problem-solving skills are developed through meaningful learning.",
  },
  {
    icon: <FaFlask />,
    number: "03",
    title: "Science",
    text: "Students explore the world around them through observation, experimentation, curiosity and practical activities.",
  },
  {
    icon: <FaLaptopCode />,
    number: "04",
    title: "Technology",
    text: "Digital literacy and technology-based learning prepare students for an increasingly connected world.",
  },
  {
    icon: <FaPalette />,
    number: "05",
    title: "Creative Arts",
    text: "Art, creativity and self-expression encourage imagination, confidence and appreciation of different perspectives.",
  },
  {
    icon: <FaGlobeAsia />,
    number: "06",
    title: "Social Studies",
    text: "Students understand communities, cultures, history, geography and their responsibilities as global citizens.",
  },
];


const learningFeatures = [
  "Concept-based learning",
  "Activity-oriented education",
  "Digital learning support",
  "Collaborative classroom experiences",
  "Regular assessments",
  "Individual student guidance",
];


const Curriculum = () => {
  return (
    <>
  <Navbar />
    <div className="abcurr-page">

    


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abcurr-hero">

        <div className="abcurr-hero-shape shape-one"></div>
        <div className="abcurr-hero-shape shape-two"></div>

        <div className="abcurr-hero-inner">

          <div className="abcurr-hero-content">

            <div className="abcurr-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/academics">Academics</Link>
              <span>/</span>
              <strong>Curriculum</strong>
            </div>

            <span className="abcurr-eyebrow">
              OUR CURRICULUM
            </span>

            <h1>
              Learning That
              <span> Inspires.</span>
              <br />
              Education That
              <span> Transforms.</span>
            </h1>

            <p>
              Our curriculum is designed to build strong academic foundations
              while nurturing curiosity, creativity, confidence and the skills
              students need for tomorrow.
            </p>

            <div className="abcurr-hero-buttons">

              <Link
                to="/admission"
                className="abcurr-btn primary"
              >
                Explore Admissions
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="abcurr-btn secondary"
              >
                Contact School
              </Link>

            </div>

            <div className="abcurr-hero-points">

              <div>
                <FaCheck />
                <span>Student Focused</span>
              </div>

              <div>
                <FaCheck />
                <span>Future Ready</span>
              </div>

              <div>
                <FaCheck />
                <span>Holistic Growth</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="abcurr-hero-visual">

            <div className="abcurr-orbit orbit-one"></div>
            <div className="abcurr-orbit orbit-two"></div>

            <div className="abcurr-curriculum-card">

              <div className="abcurr-card-header">
                <span>ACADEMIC FRAMEWORK</span>
                <strong>2026</strong>
              </div>

              <div className="abcurr-card-icon">
                <FaGraduationCap />
              </div>

              <span className="abcurr-card-small">
                LEARNING BEYOND BOOKS
              </span>

              <h3>
                Knowledge.
                <span> Skills.</span>
                <br />
                Character.
              </h3>

              <p>
                A balanced approach where academic knowledge meets creativity,
                technology and real-world learning.
              </p>

              <div className="abcurr-card-line">
                <span></span>
              </div>

              <div className="abcurr-card-bottom">
                <span>ACADEMICS</span>
                <span>SKILLS</span>
                <span>VALUES</span>
              </div>

            </div>


            <div className="abcurr-floating-card">

              <FaBrain />

              <div>
                <strong>Think • Explore • Grow</strong>
                <span>Every learner has potential</span>
              </div>

            </div>

          </div>

        </div>

      </section>




      <section className="abcurr-areas">

        <div className="abcurr-section-head">

          <div>

            <span>KEY LEARNING AREAS</span>

            <h2>
              Explore Our Curriculum.
            </h2>

          </div>

          

        </div>


        <div className="abcurr-area-grid">

          {curriculumAreas.map((item, index) => (

            <article
              className="abcurr-area-card"
              key={index}
            >

              <div className="abcurr-area-number">
                {item.number}
              </div>

              <div className="abcurr-area-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <div className="abcurr-area-arrow">
                <FaArrowRight />
              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          LEARNING APPROACH
      ===================================================== */}

      <section className="abcurr-learning">

        <div className="abcurr-learning-inner">

          <div className="abcurr-learning-content">

            <span>
              HOW WE LEARN
            </span>

            <h2>
              More Than A
              <strong> Textbook.</strong>
            </h2>

            <p>
              Our classrooms encourage students to participate, question,
              collaborate and apply what they learn. This helps turn academic
              concepts into meaningful experiences.
            </p>

            <Link
              to="/academics"
              className="abcurr-text-link"
            >
              Discover Academic Life
              <FaArrowRight />
            </Link>

          </div>


          <div className="abcurr-feature-list">

            {learningFeatures.map((feature, index) => (

              <div
                className="abcurr-feature"
                key={index}
              >

                <span className="abcurr-feature-check">
                  <FaCheck />
                </span>

                <span>
                  {feature}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FOUR PILLARS
      ===================================================== */}

      <section className="abcurr-pillars">

        <div className="abcurr-pillars-heading">

          <span>OUR FOUR PILLARS</span>

          <h2>
            Knowledge With Purpose.
          </h2>

          <p>
            We focus on the complete development of every learner.
          </p>

        </div>


        <div className="abcurr-pillar-grid">

          <div className="abcurr-pillar-card">

            <div className="abcurr-pillar-top">
              <span>01</span>
              <FaBookOpen />
            </div>

            <h3>Knowledge</h3>

            <p>
              Build strong academic foundations and a lifelong love for
              learning.
            </p>

          </div>


          <div className="abcurr-pillar-card">

            <div className="abcurr-pillar-top">
              <span>02</span>
              <FaLightbulb />
            </div>

            <h3>Creativity</h3>

            <p>
              Encourage imagination, innovation and original ways of thinking.
            </p>

          </div>


          <div className="abcurr-pillar-card">

            <div className="abcurr-pillar-top">
              <span>03</span>
              <FaUsers />
            </div>

            <h3>Character</h3>

            <p>
              Develop responsibility, empathy, discipline and respect for
              others.
            </p>

          </div>


          <div className="abcurr-pillar-card">

            <div className="abcurr-pillar-top">
              <span>04</span>
              <FaChartLine />
            </div>

            <h3>Growth</h3>

            <p>
              Help students recognise their strengths and continuously work
              towards improvement.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abcurr-cta">

        <div className="abcurr-cta-circle"></div>

        <div className="abcurr-cta-inner">

          <span>
            EDUCATION FOR TOMORROW
          </span>

          <h2>
            Give Your Child A
            <strong> Stronger Foundation.</strong>
          </h2>

          <p>
            Discover an academic environment where knowledge, creativity and
            character grow together.
          </p>

          <Link
            to="/admission"
            className="abcurr-cta-btn"
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

export default Curriculum;