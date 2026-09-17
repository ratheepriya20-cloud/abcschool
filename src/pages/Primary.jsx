import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaGlobeAsia,
  FaLaptopCode,
  FaPalette,
  FaUsers,
  FaLightbulb,
  FaStar,
} from "react-icons/fa";

import "./Primary.css";

const primarySubjects = [
  {
    icon: <FaBookOpen />,
    title: "Language & Literacy",
    text: "Build strong reading, writing, vocabulary and communication skills through engaging classroom activities.",
    tag: "01",
  },
  {
    icon: <FaCalculator />,
    title: "Mathematics",
    text: "Develop logical thinking, numerical confidence and problem-solving abilities through practical learning.",
    tag: "02",
  },
  {
    icon: <FaFlask />,
    title: "Science",
    text: "Explore the world through experiments, observation, discovery and curiosity-driven learning.",
    tag: "03",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Environmental Studies",
    text: "Help children understand their surroundings, communities, nature and the world around them.",
    tag: "04",
  },
  {
    icon: <FaLaptopCode />,
    title: "Digital Learning",
    text: "Introduce age-appropriate technology and digital skills to prepare students for a changing world.",
    tag: "05",
  },
  {
    icon: <FaPalette />,
    title: "Creative Arts",
    text: "Encourage imagination and self-expression through art, music, craft and creative activities.",
    tag: "06",
  },
];

const learningPoints = [
  {
    icon: <FaLightbulb />,
    title: "Curiosity",
    text: "Students are encouraged to ask questions, explore ideas and discover new possibilities.",
  },
  {
    icon: <FaUsers />,
    title: "Collaboration",
    text: "Group activities help children communicate, share ideas and learn from one another.",
  },
  {
    icon: <FaStar />,
    title: "Confidence",
    text: "Every child receives opportunities to participate, express themselves and grow with confidence.",
  },
];

const Primary = () => {
  return (
    <>
    <Navbar />
    <div className="abprimary-page">
      

      {/* ================= HERO ================= */}
      <section className="abprimary-hero">
        <div className="abprimary-hero-orb abprimary-orb-one"></div>
        <div className="abprimary-hero-orb abprimary-orb-two"></div>

        <div className="abprimary-hero-inner">
          <div className="abprimary-hero-content">
            <div className="abprimary-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Academics</span>
              <span>/</span>
              <strong>Primary</strong>
            </div>

            <span className="abprimary-eyebrow">
              PRIMARY SCHOOL
            </span>

            <h1>
              Building Strong
              <span> Foundations For Life.</span>
            </h1>

            <p>
              Our Primary School years transform curiosity into knowledge,
              confidence and meaningful learning experiences that prepare
              children for the future.
            </p>

            <div className="abprimary-hero-buttons">
              <Link to="/admission" className="abprimary-btn primary">
                Explore Admissions
                <FaArrowRight />
              </Link>

              <Link to="/contact" className="abprimary-btn secondary">
                Talk To Us
              </Link>
            </div>

            <div className="abprimary-trust">
              <div>
                <strong>01</strong>
                <span>Strong Foundations</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Creative Learning</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Confident Learners</span>
              </div>
            </div>
          </div>

          <div className="abprimary-hero-visual">
            <div className="abprimary-visual-ring"></div>

            <div className="abprimary-main-card">
              <div className="abprimary-card-top">
                <span>PRIMARY</span>
                <b>01</b>
              </div>

              <div className="abprimary-card-icon">
                <FaBookOpen />
              </div>

              <h3>Learn. Explore. Grow.</h3>

              <p>
                A nurturing environment where every child discovers their
                potential.
              </p>

              <div className="abprimary-progress">
                <div className="abprimary-progress-head">
                  <span>Learning Journey</span>
                  <strong>100%</strong>
                </div>
                <div className="abprimary-progress-line">
                  <span></span>
                </div>
              </div>
            </div>

            <div className="abprimary-floating-card">
              <FaStar />
              <div>
                <strong>Every Child</strong>
                <span>Can Shine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

   

      {/* ================= SUBJECTS ================= */}
      <section className="abprimary-subjects">
        <div className="abprimary-section-heading">
          <div>
            <span>ACADEMIC AREAS</span>
            <h2>What Our Students Explore</h2>
          </div>

         
        </div>

        <div className="abprimary-subject-grid">
          {primarySubjects.map((item, index) => (
            <article
              className="abprimary-subject-card"
              key={index}
            >
              <div className="abprimary-subject-number">
                {item.tag}
              </div>

              <div className="abprimary-subject-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <span className="abprimary-card-arrow">
                <FaArrowRight />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ================= LEARNING ================= */}
      <section className="abprimary-learning">
        <div className="abprimary-learning-inner">
          <div className="abprimary-learning-content">
            <span>BEYOND THE CLASSROOM</span>

            <h2>
              We Develop
              <strong> Curious Minds.</strong>
            </h2>

            <p>
              Our approach goes beyond textbooks. Students learn through
              activities, discussions, projects, teamwork and real-world
              experiences.
            </p>

            <Link
              to="/academics"
              className="abprimary-text-link"
            >
              Discover Our Academics
              <FaArrowRight />
            </Link>
          </div>

          <div className="abprimary-learning-points">
            {learningPoints.map((item, index) => (
              <div
                className="abprimary-learning-point"
                key={index}
              >
                <div className="abprimary-learning-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="abprimary-skills">
        <div className="abprimary-skills-heading">
          <span>SKILLS FOR TOMORROW</span>
          <h2>Growing Into Confident Individuals.</h2>
        </div>

        <div className="abprimary-skill-grid">
          <div className="abprimary-skill-box">
            <strong>01</strong>
            <h3>Think</h3>
            <p>
              Develop critical thinking and problem-solving abilities.
            </p>
          </div>

          <div className="abprimary-skill-box">
            <strong>02</strong>
            <h3>Create</h3>
            <p>
              Turn imagination and ideas into meaningful creations.
            </p>
          </div>

          <div className="abprimary-skill-box">
            <strong>03</strong>
            <h3>Connect</h3>
            <p>
              Build communication and collaboration skills.
            </p>
          </div>

          <div className="abprimary-skill-box">
            <strong>04</strong>
            <h3>Lead</h3>
            <p>
              Grow confidence, responsibility and leadership qualities.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="abprimary-cta">
        <div className="abprimary-cta-pattern"></div>

        <div className="abprimary-cta-inner">
          <span>START THE JOURNEY</span>

          <h2>
            Give Your Child A
            <strong> Strong Beginning.</strong>
          </h2>

          <p>
            Discover an academic environment where learning feels meaningful,
            inspiring and exciting.
          </p>

          <Link
            to="/admission"
            className="abprimary-cta-btn"
          >
            Apply For Admission
            <FaArrowRight />
          </Link>
        </div>
      </section>

    </div>
    
      <Footer />
      </>
  );
};

export default Primary;