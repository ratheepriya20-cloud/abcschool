import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaClipboardCheck,
  FaBookOpen,
  FaChartLine,
  FaAward,
  FaUserGraduate,
  FaCalendarAlt,
  FaCheckCircle,
  FaLightbulb,
  FaFileAlt,
  FaTrophy,
  FaGraduationCap,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Examination.css";


const assessmentTypes = [
  {
    number: "01",
    icon: <FaClipboardCheck />,
    title: "Class Assessments",
    text: "Regular classroom assessments help teachers understand student progress and provide timely academic support.",
  },
  {
    number: "02",
    icon: <FaBookOpen />,
    title: "Periodic Tests",
    text: "Periodic tests encourage consistent preparation and help students strengthen their understanding of important concepts.",
  },
  {
    number: "03",
    icon: <FaChartLine />,
    title: "Progress Tracking",
    text: "Student performance is carefully monitored to identify strengths, learning gaps and areas for improvement.",
  },
  {
    number: "04",
    icon: <FaAward />,
    title: "Final Examinations",
    text: "Final examinations evaluate overall learning and prepare students for the next stage of their academic journey.",
  },
];


const examFeatures = [
  "Regular academic assessments",
  "Transparent evaluation process",
  "Individual progress monitoring",
  "Constructive teacher feedback",
  "Parent-teacher communication",
  "Academic improvement planning",
];


const examStages = [
  {
    icon: <FaCalendarAlt />,
    title: "Plan",
    text: "Academic schedules and assessment plans are organised in advance.",
  },
  {
    icon: <FaBookOpen />,
    title: "Prepare",
    text: "Students receive guidance and opportunities to revise key concepts.",
  },
  {
    icon: <FaFileAlt />,
    title: "Assess",
    text: "Different assessment methods measure knowledge and understanding.",
  },
  {
    icon: <FaTrophy />,
    title: "Improve",
    text: "Feedback helps students recognise progress and work towards better outcomes.",
  },
];


const Examination = () => {
  return (
    <>
    <Navbar />
    <div className="abexam-page">

      


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abexam-hero">

        <div className="abexam-hero-ring ring-one"></div>
        <div className="abexam-hero-ring ring-two"></div>

        <div className="abexam-hero-dots"></div>

        <div className="abexam-hero-inner">

          <div className="abexam-hero-content">

            <div className="abexam-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/academics">Academics</Link>
              <span>/</span>
              <strong>Examination</strong>
            </div>

            <span className="abexam-eyebrow">
              EXAMINATION & ASSESSMENT
            </span>

            <h1>
              Assess.
              <span> Reflect.</span>
             
              Improve.
            </h1>

            <p>
              Our examination and assessment system is designed to measure
              learning, encourage continuous improvement and help every
              student move forward with confidence.
            </p>

            <div className="abexam-hero-buttons">

              <Link
                to="/academics"
                className="abexam-btn primary"
              >
                Explore Academics
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="abexam-btn secondary"
              >
                Contact School
              </Link>

            </div>

            <div className="abexam-hero-points">

              <div>
                <FaCheckCircle />
                <span>Fair Evaluation</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Continuous Growth</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Student Support</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="abexam-hero-visual">

            <div className="abexam-score-card">

              <div className="abexam-score-top">

                <div>
                  <span>ACADEMIC</span>
                  <strong>ASSESSMENT</strong>
                </div>

                <div className="abexam-score-icon">
                  <FaGraduationCap />
                </div>

              </div>


              <div className="abexam-progress-area">

                <div className="abexam-progress-label">
                  <span>Learning Progress</span>
                  <strong>92%</strong>
                </div>

                <div className="abexam-progress">
                  <span></span>
                </div>

              </div>


              <div className="abexam-mini-grid">

                <div>
                  <strong>08</strong>
                  <span>Assessments</span>
                </div>

                <div>
                  <strong>96%</strong>
                  <span>Participation</span>
                </div>

                <div>
                  <strong>A+</strong>
                  <span>Goal</span>
                </div>

              </div>


              <div className="abexam-score-footer">
                <span>LEARN WITH PURPOSE</span>
                <FaChartLine />
              </div>

            </div>


            <div className="abexam-floating-card">

              <div className="abexam-floating-icon">
                <FaUserGraduate />
              </div>

              <div>
                <strong>Every Result Matters</strong>
                <span>Progress over perfection</span>
              </div>

            </div>

          </div>

        </div>

      </section>


   
      <section className="abexam-assessment">

        <div className="abexam-section-head">

          <div>

            <span>ASSESSMENT SYSTEM</span>

            <h2>
              Measuring Learning,
              
              Building Confidence.
            </h2>

          </div>


        </div>


        <div className="abexam-assessment-grid">

          {assessmentTypes.map((item, index) => (

            <article
              className="abexam-assessment-card"
              key={index}
            >

              <span className="abexam-card-number">
                {item.number}
              </span>

              <div className="abexam-assessment-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <div className="abexam-card-arrow">
                <FaArrowRight />
              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          EVALUATION
      ===================================================== */}

      <section className="abexam-evaluation">

        <div className="abexam-evaluation-inner">

          <div className="abexam-evaluation-content">

            <span>
              BEYOND MARKS
            </span>

            <h2>
              Results Tell A Story.
              <strong> Progress Tells More.</strong>
            </h2>

            <p>
              Academic results are one part of a student's journey. We also
              focus on participation, understanding, effort, consistency and
              the ability to apply knowledge.
            </p>

            <div className="abexam-evaluation-highlight">

              <FaLightbulb />

              <div>
                <strong>Focus On Improvement</strong>
                <span>
                  Every assessment becomes an opportunity to learn better.
                </span>
              </div>

            </div>

          </div>


          <div className="abexam-feature-list">

            {examFeatures.map((feature, index) => (

              <div
                className="abexam-feature"
                key={index}
              >

                <span className="abexam-feature-check">
                  <FaCheckCircle />
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
          EXAMINATION JOURNEY
      ===================================================== */}

      <section className="abexam-journey">

        <div className="abexam-journey-heading">

          <span>THE ASSESSMENT JOURNEY</span>

          <h2>
            From Preparation To Progress.
          </h2>

          <p>
            A structured process designed to make assessment meaningful.
          </p>

        </div>


        <div className="abexam-journey-grid">

          {examStages.map((stage, index) => (

            <div
              className="abexam-journey-card"
              key={index}
            >

              <div className="abexam-journey-icon">
                {stage.icon}
              </div>

              <div className="abexam-journey-number">
                0{index + 1}
              </div>

              <h3>
                {stage.title}
              </h3>

              <p>
                {stage.text}
              </p>

              {index < examStages.length - 1 && (
                <div className="abexam-journey-line">
                  <FaArrowRight />
                </div>
              )}

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          STUDENT SUCCESS
      ===================================================== */}

      <section className="abexam-success">

        <div className="abexam-success-inner">

          <div className="abexam-success-badge">
            <FaAward />
          </div>

          <div className="abexam-success-content">

            <span>
              STUDENT SUCCESS
            </span>

            <h2>
              Confidence Is The
              <strong> Best Preparation.</strong>
            </h2>

            <p>
              We encourage students to approach examinations with preparation,
              discipline and confidence rather than fear.
            </p>

          </div>

          <div className="abexam-success-stat">

            <strong>100%</strong>
            <span>EFFORT MATTERS</span>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abexam-cta">

        <div className="abexam-cta-circle circle-left"></div>
        <div className="abexam-cta-circle circle-right"></div>

        <div className="abexam-cta-inner">

          <span>
            KEEP LEARNING. KEEP GROWING.
          </span>

          <h2>
            Every Assessment Is A
            <strong> New Opportunity.</strong>
          </h2>

          <p>
            Discover an academic environment where students are encouraged to
            learn, improve and achieve their potential.
          </p>

          <Link
            to="/admission"
            className="abexam-cta-btn"
          >
            Begin The Journey
            <FaArrowRight />
          </Link>

        </div>

      </section>



    </div>
    
      <Footer /></>
  );
};

export default Examination;