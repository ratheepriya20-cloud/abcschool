import React from "react";
import { Link } from "react-router-dom";

import {
  FaChild,
  FaBookOpen,
  FaFlask,
  FaGraduationCap,
  FaUniversity,
  FaLaptopCode,
  FaArrowRight,
  FaCalculator,
  FaLanguage,
  FaChalkboardTeacher,
  FaCheck,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Academics.css";

const academicCards = [
  {
    number: "01",
    title: "Pre-Primary",
    subtitle: "THE BEGINNING",
    description:
      "A joyful learning environment where young minds develop curiosity, confidence, creativity and essential early skills.",
    icon: <FaChild />,
    link: "/academics/pre-primary",
    color: "blue",
  },
  {
    number: "02",
    title: "Primary School",
    subtitle: "BUILDING FOUNDATIONS",
    description:
      "Strong academic foundations combined with activities that encourage children to explore, communicate and learn independently.",
    icon: <FaBookOpen />,
    link: "/academics/primary",
    color: "orange",
  },
  {
    number: "03",
    title: "Middle School",
    subtitle: "DISCOVER & EXPLORE",
    description:
      "Students develop deeper understanding, analytical thinking, problem-solving abilities and confidence across subjects.",
    icon: <FaFlask />,
    link: "/academics/middle",
    color: "gold",
  },
  {
    number: "04",
    title: "Senior Secondary",
    subtitle: "PREPARING FOR TOMORROW",
    description:
      "Focused academic learning, career awareness and guidance prepare students for higher education and future opportunities.",
    icon: <FaGraduationCap />,
    link: "/academics/senior-secondary",
    color: "purple",
  },
  {
    number: "05",
    title: "Curriculum",
    subtitle: "WHAT WE LEARN",
    description:
      "Explore our academic curriculum, subjects and learning approach designed to create balanced and future-ready learners.",
    icon: <FaChalkboardTeacher />,
    link: "/academics/curriculum",
    color: "green",
  },
  {
    number: "06",
    title: "Examination",
    subtitle: "MEASURING PROGRESS",
    description:
      "Understand our examination approach, assessment practices and the ways we help students continuously improve.",
    icon: <FaUniversity />,
    link: "/academics/examination",
    color: "red",
  },
];

const learningAreas = [
  {
    icon: <FaLanguage />,
    title: "Languages",
    text: "Communication, reading, writing and expression.",
  },
  {
    icon: <FaCalculator />,
    title: "Mathematics",
    text: "Logic, reasoning and problem-solving skills.",
  },
  {
    icon: <FaFlask />,
    title: "Science",
    text: "Observation, experiments and discovery.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Technology",
    text: "Digital skills for a changing world.",
  },
];

const Academics = () => {
  return (
    <>
      <Navbar />

      <main className="abacad2-page">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="abacad2-hero">

          <div className="abacad2-hero-left">

            <div className="abacad2-eyebrow">
              <span></span>
              ACADEMICS
              <span></span>
            </div>

            <h1>
              A Journey Of
              <strong>Learning & Growth.</strong>
            </h1>

            <p>
              From the first classroom experience to senior secondary
              education, every stage at AB Public School is designed to help
              students learn with purpose and grow with confidence.
            </p>

            <div className="abacad2-hero-buttons">

              <a
                href="#academic-programs"
                className="abacad2-explore-btn"
              >
                Explore Programs
                <FaArrowRight />
              </a>

              <Link
                to="/apply"
                className="abacad2-apply-btn"
              >
                Apply Now
              </Link>

            </div>

          </div>

          <div className="abacad2-hero-right">

            <div className="abacad2-hero-orbit orbit-one"></div>
            <div className="abacad2-hero-orbit orbit-two"></div>

            <div className="abacad2-hero-circle">

              <div className="abacad2-circle-small">
                <FaGraduationCap />
              </div>

              <span>KNOWLEDGE</span>
              <strong>CREATIVITY</strong>
              <span>CONFIDENCE</span>

            </div>

            <div className="abacad2-stat abacad2-stat-one">
              <strong>01</strong>
              <span>Explore</span>
            </div>

            <div className="abacad2-stat abacad2-stat-two">
              <strong>02</strong>
              <span>Learn</span>
            </div>

            <div className="abacad2-stat abacad2-stat-three">
              <strong>03</strong>
              <span>Grow</span>
            </div>

          </div>

        </section>


        {/* =================================================
            INTRO
        ================================================= */}

        <section className="abacad2-intro">

          <div className="abacad2-intro-number">
            01
          </div>

          <div className="abacad2-intro-content">

            <span>OUR ACADEMIC PHILOSOPHY</span>

            <h2>
              Education Is More Than
              <strong>What Happens In A Classroom.</strong>
            </h2>

            <p>
              We believe meaningful education develops the whole child.
              Alongside academic knowledge, students are encouraged to
              question, create, communicate, collaborate and discover their
              individual strengths.
            </p>

          </div>

          <div className="abacad2-intro-highlight">

            <div>
              <strong>Learn</strong>
              <FaCheck />
            </div>

            <div>
              <strong>Think</strong>
              <FaCheck />
            </div>

            <div>
              <strong>Create</strong>
              <FaCheck />
            </div>

            <div>
              <strong>Lead</strong>
              <FaCheck />
            </div>

          </div>

        </section>


        {/* =================================================
            PROGRAMS
        ================================================= */}

        <section
          className="abacad2-programs"
          id="academic-programs"
        >

          <div className="abacad2-section-head">

            <div>

              <span>ACADEMIC PATHWAYS</span>

              <h2>
                Choose Your
                <strong>Learning Journey.</strong>
              </h2>

            </div>

            <p>
              Every stage of education has been thoughtfully designed to
              support academic progress, confidence and personal growth.
            </p>

          </div>


          {/* ================================
              2 COLUMN CARD GRID
          ================================= */}

          <div className="abacad2-card-grid">

            {academicCards.map((card) => (

              <Link
                to={card.link}
                className={`abacad2-card abacad2-${card.color}`}
                key={card.number}
              >

                <div className="abacad2-card-number">
                  {card.number}
                </div>


                <div className="abacad2-card-icon">
                  {card.icon}
                </div>


                <div className="abacad2-card-content">

                  <span className="abacad2-card-subtitle">
                    {card.subtitle}
                  </span>

                  <h3>
                    {card.title}
                  </h3>

                  <p>
                    {card.description}
                  </p>

                  <span className="abacad2-card-link">
                    Explore Program
                    <FaArrowRight />
                  </span>

                </div>


                <div className="abacad2-card-arrow">
                  <FaArrowRight />
                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* =================================================
            LEARNING AREAS
        ================================================= */}

        <section className="abacad2-learning">

          <div className="abacad2-learning-title">

            <span>02 • CORE LEARNING</span>

            <h2>
              Knowledge That
              <strong>Builds Confidence.</strong>
            </h2>

          </div>


          <div className="abacad2-learning-grid">

            {learningAreas.map((item, index) => (

              <div
                className="abacad2-learning-card"
                key={item.title}
              >

                <div className="abacad2-learning-top">

                  <span>
                    0{index + 1}
                  </span>

                  <div>
                    {item.icon}
                  </div>

                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <div className="abacad2-learning-line"></div>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            JOURNEY
        ================================================= */}

        <section className="abacad2-journey">

          <div className="abacad2-journey-content">

            <span>
              03 • THE SCHOOL JOURNEY
            </span>

            <h2>
              Every Stage Has
              <strong>A Purpose.</strong>
            </h2>

            <p>
              Students gradually move from curiosity and exploration to
              independent thinking, academic focus and preparation for
              higher education.
            </p>

          </div>


          <div className="abacad2-journey-line">

            <div className="abacad2-journey-step">
              <strong>01</strong>
              <span>Discover</span>
            </div>

            <div className="abacad2-line"></div>

            <div className="abacad2-journey-step">
              <strong>02</strong>
              <span>Develop</span>
            </div>

            <div className="abacad2-line"></div>

            <div className="abacad2-journey-step">
              <strong>03</strong>
              <span>Excel</span>
            </div>

            <div className="abacad2-line"></div>

            <div className="abacad2-journey-step">
              <strong>04</strong>
              <span>Lead</span>
            </div>

          </div>

        </section>


        {/* =================================================
            CTA
        ================================================= */}

        <section className="abacad2-cta">

          <div>

            <span>
              START THE JOURNEY
            </span>

            <h2>
              Find The Right
              <strong>Academic Path.</strong>
            </h2>

            <p>
              Explore a program, understand the journey and take the next
              step towards your child's future.
            </p>

          </div>


          <div className="abacad2-cta-buttons">

            <Link
              to="/academics/pre-primary"
              className="abacad2-cta-explore"
            >
              Explore Academics
              <FaArrowRight />
            </Link>

            <Link
              to="/apply"
              className="abacad2-cta-apply"
            >
              Apply Now
            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Academics;