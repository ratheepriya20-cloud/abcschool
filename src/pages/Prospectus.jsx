import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaGraduationCap,
  FaSchool,
  FaUsers,
  FaFlask,
  FaLaptop,
  FaFutbol,
  FaPalette,
  FaLanguage,
  FaCheckCircle,
  FaDownload,
  FaQuoteLeft,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Prospectus.css";


const prospectusHighlights = [
  {
    icon: <FaGraduationCap />,
    title: "Academic Excellence",
    text: "A structured learning environment focused on strong academic foundations and future readiness.",
  },
  {
    icon: <FaUsers />,
    title: "Student-Centred Learning",
    text: "Every learner is encouraged to discover strengths, build confidence and develop curiosity.",
  },
  {
    icon: <FaSchool />,
    title: "Holistic Development",
    text: "Academics, activities, values and leadership come together to shape well-rounded individuals.",
  },
];


const academicAreas = [
  {
    icon: <FaLanguage />,
    title: "Languages",
    text: "Communication, reading, writing and expression.",
  },
  {
    icon: <FaFlask />,
    title: "Science",
    text: "Curiosity, experimentation and scientific thinking.",
  },
  {
    icon: <FaLaptop />,
    title: "Technology",
    text: "Digital awareness and future-ready skills.",
  },
  {
    icon: <FaPalette />,
    title: "Creative Arts",
    text: "Creativity, imagination and self-expression.",
  },
];


const facilities = [
  "Smart and engaging classrooms",
  "Science and technology learning spaces",
  "Library and reading resources",
  "Sports and physical education",
  "Creative and cultural activities",
  "Safe and supportive campus",
];


const studentLife = [
  {
    number: "01",
    title: "Learn",
    text: "Build knowledge through engaging classroom experiences.",
  },
  {
    number: "02",
    title: "Explore",
    text: "Discover interests through activities and experiences.",
  },
  {
    number: "03",
    title: "Grow",
    text: "Develop confidence, character and independence.",
  },
  {
    number: "04",
    title: "Lead",
    text: "Prepare to make a positive difference in the world.",
  },
];


const Prospectus = () => {
  return (
    <>
       <Navbar />
    <div className="abpros-page">

   


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abpros-hero">

        <div className="abpros-hero-glow glow-one"></div>
        <div className="abpros-hero-glow glow-two"></div>

        <div className="abpros-hero-dots"></div>

        <div className="abpros-hero-inner">

          <div className="abpros-hero-content">

            <div className="abpros-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/admission">Admissions</Link>
              <span>/</span>
              <strong>Prospectus</strong>
            </div>

            <span className="abpros-eyebrow">
              SCHOOL PROSPECTUS
            </span>

            <h1>
              Discover A Place
              <br />
              <span>Where Futures Begin.</span>
            </h1>

            <p>
              Explore our academic philosophy, learning environment,
              opportunities and school life — all designed to help every
              student learn with confidence and grow with purpose.
            </p>

            <div className="abpros-hero-buttons">

              <a
                href="#overview"
                className="abpros-primary-btn"
              >
                Explore Prospectus
                <FaArrowRight />
              </a>

              <Link
                to="/admission"
                className="abpros-secondary-btn"
              >
                Admissions
              </Link>

            </div>

            <div className="abpros-hero-meta">

              <div>
                <strong>01</strong>
                <span>Purpose</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Learning</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Growth</span>
              </div>

            </div>

          </div>


          {/* =================================================
              BROCHURE VISUAL
          ================================================= */}

          <div className="abpros-brochure-wrap">

            <div className="abpros-brochure-back"></div>

            <div className="abpros-brochure">

              <div className="abpros-brochure-top">

                <span>EST.</span>

                <div className="abpros-brochure-logo">
                  <FaSchool />
                </div>

                <span>EXCELLENCE</span>

              </div>

              <div className="abpros-brochure-center">

                <small>THE SCHOOL</small>

                <h2>
                  PROSPECTUS
                </h2>

                <div className="abpros-brochure-line"></div>

                <p>
                  Learn.
                  <br />
                  Discover.
                  <br />
                  Become.
                </p>

              </div>

              <div className="abpros-brochure-bottom">

                <span>ACADEMIC</span>
                <span>2026 — 27</span>

              </div>

            </div>


            <div className="abpros-download-card">

              <div className="abpros-download-icon">
                <FaDownload />
              </div>

              <div>
                <strong>School Prospectus</strong>
                <span>2026 — 27 Edition</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OVERVIEW
      ===================================================== */}


      {/* =====================================================
          HIGHLIGHTS
      ===================================================== */}

      <section className="abpros-highlights">

        <div className="abpros-section-heading">

          <div>

            <span>
              WHY CHOOSE US
            </span>

            <h2>
              What Makes Our
             
              Learning Experience Different?
            </h2>

          </div>


        </div>


        <div className="abpros-highlight-grid">

          {prospectusHighlights.map((item, index) => (

            <article
              className="abpros-highlight-card"
              key={index}
            >

              <span className="abpros-highlight-number">
                0{index + 1}
              </span>

              <div className="abpros-highlight-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <div className="abpros-highlight-arrow">
                <FaArrowRight />
              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          ACADEMIC EXPERIENCE
      ===================================================== */}

      <section className="abpros-academic">

        <div className="abpros-academic-inner">

          <div className="abpros-academic-content">

            <span>
              ACADEMIC EXPERIENCE
            </span>

            <h2>
              Building Strong
              <strong> Foundations For Tomorrow.</strong>
            </h2>

            <p>
              Our curriculum encourages students to develop strong subject
              knowledge while learning how to think, communicate, collaborate
              and solve problems.
            </p>

            <Link
              to="/academics/curriculum"
              className="abpros-academic-btn"
            >
              Explore Curriculum
              <FaArrowRight />
            </Link>

          </div>


          <div className="abpros-academic-grid">

            {academicAreas.map((item, index) => (

              <div
                className="abpros-academic-card"
                key={index}
              >

                <div className="abpros-academic-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FACILITIES
      ===================================================== */}

      <section className="abpros-facilities">

        <div className="abpros-facilities-inner">

          <div className="abpros-facilities-heading">

            <span>
              OUR ENVIRONMENT
            </span>

            <h2>
              Designed For
              <em> Learning & Discovery.</em>
            </h2>

            <p>
              A supportive environment gives students the space, resources
              and confidence they need to explore their potential.
            </p>

          </div>


          <div className="abpros-facilities-list">

            {facilities.map((facility, index) => (

              <div
                className="abpros-facility"
                key={index}
              >

                <span>
                  <FaCheckCircle />
                </span>

                <p>
                  {facility}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          STUDENT LIFE
      ===================================================== */}

      <section className="abpros-life">

        <div className="abpros-life-heading">

          <span>
            STUDENT LIFE
          </span>

          <h2>
            Learn Beyond
            <em> The Classroom.</em>
          </h2>

          <p>
            Education becomes meaningful when students have opportunities to
            experience, participate and lead.
          </p>

        </div>


        <div className="abpros-life-grid">

          {studentLife.map((item, index) => (

            <div
              className="abpros-life-card"
              key={index}
            >

              <span className="abpros-life-number">
                {item.number}
              </span>

              <div className="abpros-life-line"></div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          MESSAGE
      ===================================================== */}

      <section className="abpros-message">

        <div className="abpros-message-inner">

          <div className="abpros-quote-icon">
            <FaQuoteLeft />
          </div>

          <div className="abpros-message-content">

            <span>
              OUR BELIEF
            </span>

            <h2>
              Every Child Has
              <strong> Something Great To Become.</strong>
            </h2>

            <p>
              We believe education should nurture curiosity, strengthen
              character and give every learner the confidence to shape their
              own future.
            </p>

          </div>

          <div className="abpros-message-mark">
            <FaGraduationCap />
          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abpros-cta">

        <div className="abpros-cta-circle cta-one"></div>
        <div className="abpros-cta-circle cta-two"></div>

        <div className="abpros-cta-inner">

          <span>
            BEGIN THE JOURNEY
          </span>

          <h2>
            Your Child's Next Chapter
            <strong> Starts Here.</strong>
          </h2>

          <p>
            Discover our admissions process and take the first step towards a
            meaningful school experience.
          </p>

          <div className="abpros-cta-buttons">

            <Link
              to="/admission"
              className="abpros-cta-primary"
            >
              Explore Admissions
              <FaArrowRight />
            </Link>

            <Link
              to="/contact"
              className="abpros-cta-secondary"
            >
              Contact School
            </Link>

          </div>

        </div>

      </section>



    </div>
      <Footer />

</>
  );
};

export default Prospectus;