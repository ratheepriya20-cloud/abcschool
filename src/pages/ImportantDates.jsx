import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaBookOpen,
  FaClipboardList,
  FaGraduationCap,
  FaUsers,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./ImportantDates.css";


const importantDates = [
  {
    month: "APR",
    date: "06",
    day: "Monday",
    title: "New Academic Session",
    category: "ACADEMIC",
    icon: <FaGraduationCap />,
    text: "Beginning of the new academic session with orientation and welcome activities for students.",
  },
  {
    month: "APR",
    date: "10",
    day: "Friday",
    title: "Parent Orientation",
    category: "PARENTS",
    icon: <FaUsers />,
    text: "An interactive orientation programme to help parents understand the academic year ahead.",
  },
  {
    month: "MAY",
    date: "04",
    day: "Monday",
    title: "Periodic Assessment I",
    category: "EXAMINATION",
    icon: <FaClipboardList />,
    text: "First periodic assessment designed to review student learning and academic progress.",
  },
  {
    month: "JUL",
    date: "15",
    day: "Wednesday",
    title: "Mid-Term Assessment",
    category: "EXAMINATION",
    icon: <FaBookOpen />,
    text: "Mid-term assessments to evaluate learning outcomes and identify areas for improvement.",
  },
  {
    month: "SEP",
    date: "05",
    day: "Saturday",
    title: "Teachers' Day",
    category: "EVENT",
    icon: <FaUsers />,
    text: "A special celebration recognising the dedication and contribution of our teachers.",
  },
  {
    month: "OCT",
    date: "12",
    day: "Monday",
    title: "Parent-Teacher Meeting",
    category: "PARENTS",
    icon: <FaRegCalendarCheck />,
    text: "A dedicated interaction between parents and teachers to discuss student progress.",
  },
  {
    month: "NOV",
    date: "09",
    day: "Monday",
    title: "Annual Sports Meet",
    category: "ACTIVITY",
    icon: <FaCheckCircle />,
    text: "A celebration of teamwork, sportsmanship and healthy competition among students.",
  },
  {
    month: "FEB",
    date: "08",
    day: "Monday",
    title: "Annual Examinations",
    category: "EXAMINATION",
    icon: <FaClipboardList />,
    text: "Comprehensive annual examinations marking the completion of the academic year.",
  },
];


const ImportantDates = () => {
  return (
    <>
          <Navbar />

    <div className="abdates-page">



      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abdates-hero">

        <div className="abdates-hero-shape shape-one"></div>
        <div className="abdates-hero-shape shape-two"></div>
        <div className="abdates-hero-dots"></div>

        <div className="abdates-hero-inner">

          <div className="abdates-hero-content">

            <div className="abdates-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/academics">Academics</Link>
              <span>/</span>
              <strong>Important Dates</strong>
            </div>

            <span className="abdates-eyebrow">
              ACADEMIC CALENDAR
            </span>

            <h1>
              Mark The Date.
              <br />
              <span>Make It Count.</span>
            </h1>

            <p>
              Stay informed about important academic events, assessments,
              parent meetings and school activities throughout the year.
            </p>

            <div className="abdates-hero-actions">

              <a
                href="#dates"
                className="abdates-primary-btn"
              >
                View Important Dates
                <FaArrowRight />
              </a>

              <Link
                to="/contact"
                className="abdates-secondary-btn"
              >
                Contact School
              </Link>

            </div>

          </div>


          {/* CALENDAR VISUAL */}

          <div className="abdates-calendar-wrap">

            <div className="abdates-calendar">

              <div className="abdates-calendar-top">
                <span>ACADEMIC</span>

                <FaCalendarAlt />

                <strong>2026 — 27</strong>
              </div>

              <div className="abdates-calendar-main">

                <small>IMPORTANT</small>

                <h2>
                  DATES
                </h2>

                <div className="abdates-calendar-line"></div>

                <p>
                  Stay prepared.
                 
                  Stay ahead.
                </p>

              </div>

              <div className="abdates-calendar-bottom">
                <span>PLAN</span>
                <span>PREPARE</span>
                <span>ACHIEVE</span>
              </div>

            </div>


            <div className="abdates-mini-note">

              <FaBell />

              <div>
                <strong>Stay Updated</strong>
                <span>Important school events</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO STRIP
      ===================================================== */}

      <section className="abdates-intro">

        <div className="abdates-intro-item">

          <span className="abdates-intro-icon">
            <FaCalendarAlt />
          </span>

          <div>
            <strong>Academic Calendar</strong>
            <p>Plan the year with confidence.</p>
          </div>

        </div>


        <div className="abdates-intro-divider"></div>


        <div className="abdates-intro-item">

          <span className="abdates-intro-icon sky">
            <FaClipboardList />
          </span>

          <div>
            <strong>Assessment Schedule</strong>
            <p>Know when important assessments happen.</p>
          </div>

        </div>


        <div className="abdates-intro-divider"></div>


        <div className="abdates-intro-item">

          <span className="abdates-intro-icon gold">
            <FaUsers />
          </span>

          <div>
            <strong>School Events</strong>
            <p>Never miss a special moment.</p>
          </div>

        </div>

      </section>


      {/* =====================================================
          DATES SECTION
      ===================================================== */}

      <section
        className="abdates-list-section"
        id="dates"
      >

        <div className="abdates-section-heading">

          <div>

            <span>
              2026 — 27 CALENDAR
            </span>

            <h2>
              Important Dates
              <em> To Remember.</em>
            </h2>

          </div>


        </div>


        <div className="abdates-timeline">

          <div className="abdates-timeline-line"></div>


          {importantDates.map((item, index) => (

            <article
              className={`abdates-item ${
                index % 2 === 0 ? "left" : "right"
              }`}
              key={index}
            >

              {/* DATE */}

              <div className="abdates-date-box">

                <span>
                  {item.month}
                </span>

                <strong>
                  {item.date}
                </strong>

                <small>
                  {item.day}
                </small>

              </div>


              {/* DOT */}

              <div className="abdates-timeline-dot">
                <span></span>
              </div>


              {/* CONTENT */}

              <div className="abdates-event-card">

                <div className="abdates-event-top">

                  <span className="abdates-event-category">
                    {item.category}
                  </span>

                  <div className="abdates-event-icon">
                    {item.icon}
                  </div>

                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <div className="abdates-event-footer">
                  <span>
                    <FaCalendarAlt />
                    {item.month} {item.date}
                  </span>

                  <span className="abdates-event-number">
                    0{index + 1}
                  </span>
                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          REMINDER SECTION
      ===================================================== */}

      <section className="abdates-reminder">

        <div className="abdates-reminder-inner">

          <div className="abdates-reminder-icon">
            <FaBell />
          </div>

          <div className="abdates-reminder-content">

            <span>
              A LITTLE REMINDER
            </span>

            <h2>
              Good Planning
              <strong> Creates Better Possibilities.</strong>
            </h2>

            <p>
              Dates and schedules may be updated by the school when required.
              Please stay connected with official school communication for
              the latest information.
            </p>

          </div>

          <div className="abdates-reminder-mark">
            <FaCheckCircle />
            <span>STAY<br />UPDATED</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abdates-cta">

        <div className="abdates-cta-circle circle-a"></div>
        <div className="abdates-cta-circle circle-b"></div>

        <div className="abdates-cta-inner">

          <span>
            READY FOR THE YEAR AHEAD?
          </span>

          <h2>
            Every Date Is A
            <strong> New Beginning.</strong>
          </h2>

          <p>
            Explore our academic programmes and discover a school experience
            designed for learning, growth and achievement.
          </p>

          <Link
            to="/admission"
            className="abdates-cta-btn"
          >
            Explore Admissions
            <FaArrowRight />
          </Link>

        </div>

      </section>


      

    </div>

    <Footer /></>
  );
};

export default ImportantDates;