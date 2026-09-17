import React from "react";
import {
  FaTrophy,
  FaMedal,
  FaGraduationCap,
  FaStar,
  FaArrowUp,
  FaAward,
  FaUsers,
} from "react-icons/fa";

import "./Achievements.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const achievementsData = [
  {
    icon: <FaTrophy />,
    number: "25+",
    title: "Academic Awards",
    text: "Recognised for outstanding academic performance and excellence.",
  },
  {
    icon: <FaMedal />,
    number: "40+",
    title: "Sports Achievements",
    text: "Students have excelled in district, state and inter-school competitions.",
  },
  {
    icon: <FaGraduationCap />,
    number: "95%",
    title: "Board Results",
    text: "Consistently strong academic results with a focus on student growth.",
  },
  {
    icon: <FaStar />,
    number: "50+",
    title: "Competitions Won",
    text: "Celebrating creativity, confidence and competitive spirit.",
  },
];

const achievementStats = [
  {
    icon: <FaAward />,
    value: "25+",
    label: "Awards & Honours",
  },
  {
    icon: <FaUsers />,
    value: "500+",
    label: "Successful Students",
  },
  {
    icon: <FaTrophy />,
    value: "40+",
    label: "Sports Achievements",
  },
  {
    icon: <FaArrowUp />,
    value: "95%",
    label: "Academic Excellence",
  },
];

const Achievements = () => {
  return (
    <>
    <Navbar />
    <section className="abach-page">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="abach-header">

        <div className="abach-heading">

          <span className="abach-eyebrow">
            OUR ACHIEVEMENTS
          </span>

          <h2>
            Celebrating <span>Excellence</span> & Achievement.
          </h2>

          <p>
            Every achievement reflects the dedication of our
            students, teachers and school community. We believe
            in recognising every milestone and inspiring our
            students to aim higher.
          </p>

        </div>

        <div className="abach-header-badge">
          <div className="abach-badge-icon">
            <FaTrophy />
          </div>

          <div>
            <strong>Excellence</strong>
            <small>Driven by purpose</small>
          </div>
        </div>

      </div>

      {/* =====================================================
          ACHIEVEMENT CARDS
      ===================================================== */}

      <div className="abach-cards">

        {achievementsData.map((item, index) => (
          <article
            className="abach-card"
            key={index}
          >

            <div className="abach-card-top">

              <div className="abach-icon">
                {item.icon}
              </div>

              <span className="abach-card-number">
                0{index + 1}
              </span>

            </div>

            <div className="abach-card-number-main">
              {item.number}
            </div>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.text}
            </p>

            <div className="abach-card-line"></div>

          </article>
        ))}

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="abach-stats">

        {achievementStats.map((stat, index) => (
          <div
            className="abach-stat"
            key={index}
          >

            <div className="abach-stat-icon">
              {stat.icon}
            </div>

            <div className="abach-stat-content">
              <strong>
                {stat.value}
              </strong>

              <span>
                {stat.label}
              </span>
            </div>

          </div>
        ))}

      </div>

      {/* =====================================================
          BOTTOM MESSAGE
      ===================================================== */}

      <div className="abach-bottom">

        <div className="abach-bottom-icon">
          <FaStar />
        </div>

        <div>
          <span>MORE THAN JUST NUMBERS</span>

          <h3>
            Every milestone inspires the next.
          </h3>
        </div>

        <div className="abach-bottom-line"></div>

      </div>

    </section>
    <Footer />
    </>
  );
};

export default Achievements;