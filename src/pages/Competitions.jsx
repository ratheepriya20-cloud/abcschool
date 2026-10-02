import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaTrophy,
  FaUsers,
  FaLightbulb,
  FaStar,
  FaBrain,
  FaChartLine,
  FaUserGraduate,
  FaMedal,
  FaCheck,
} from "react-icons/fa";

import "./Competitions.css";

import heroImage from "../assets/competition-hero.jpg";
import aboutMain from "../assets/competition-about-main.jpg";
import aboutDebate from "../assets/competition-about-debate.jpg";
import aboutCultural from "../assets/competition-about-cultural.jpg";
import journeyImage from "../assets/competition-journey.jpg";
import achievementImage from "../assets/competition-achievement.jpg";
import ctaImage from "../assets/competition-cta.jpg";

const skills = [
  {
    icon: FaBrain,
    title: "Boost Confidence",
    text: "Express ideas fearlessly.",
  },
  {
    icon: FaLightbulb,
    title: "Develop New Skills",
    text: "Learn beyond classrooms.",
  },
  {
    icon: FaUsers,
    title: "Encourage Teamwork",
    text: "Collaborate and support others.",
  },
  {
    icon: FaChartLine,
    title: "Improve Critical Thinking",
    text: "Find solutions and think creatively.",
  },
  {
    icon: FaStar,
    title: "Gain Recognition",
    text: "Celebrate talent and achievements.",
  },
];

const journey = [
  {
    number: "01",
    icon: FaUserGraduate,
    title: "Participate",
    text: "Step forward and take part.",
  },
  {
    number: "02",
    icon: FaChartLine,
    title: "Learn",
    text: "Gain new skills and knowledge.",
  },
  {
    number: "03",
    icon: FaUsers,
    title: "Compete",
    text: "Showcase talent at various levels.",
  },
  {
    number: "04",
    icon: FaTrophy,
    title: "Achieve",
    text: "Win accolades and recognition.",
  },
];

const Competitions = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="abcomp-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="abcomp-hero">

        <img
          src={heroImage}
          alt="Students participating in school competitions"
          className="abcomp-hero-bg"
        />

        <div className="abcomp-hero-overlay" />

        <div className="abcomp-hero-gold-wave wave-one" />
        <div className="abcomp-hero-gold-wave wave-two" />

        <div className="abcomp-container abcomp-hero-inner">

          <div className="abcomp-hero-content">

            <div className="abcomp-breadcrumb">
              <button onClick={() => navigate("/")}>
                Home
              </button>

              <span>/</span>

              <button onClick={() => navigate("/campus-life")}>
                Activities
              </button>

              <span>/</span>

              <strong>Competitions</strong>
            </div>

            <span className="abcomp-label abcomp-label-light">
              EXPLORE • COMPETE • GROW
            </span>

            <h1>
              Discover Your Potential
              <span>Through Competitions.</span>
            </h1>

            <p>
              Our competitions provide students with opportunities
              to explore new skills, showcase their talents and
              develop confidence for a brighter future.
            </p>

            <div className="abcomp-hero-buttons">

              <button
                className="abcomp-btn abcomp-btn-gold"
                onClick={() => scrollToSection("competitionAbout")}
              >
                Explore Competitions
                <FaArrowRight />
              </button>

              <button
                className="abcomp-btn abcomp-btn-outline-light"
                onClick={() => navigate("/apply")}
              >
                Apply For Admission
              </button>

            </div>

            <div className="abcomp-hero-benefits">

              <div>
                <span><FaTrophy /></span>
                <strong>New Skills</strong>
              </div>

              <div>
                <span><FaUsers /></span>
                <strong>Confidence</strong>
              </div>

              <div>
                <span><FaLightbulb /></span>
                <strong>Critical Thinking</strong>
              </div>

              <div>
                <span><FaUsers /></span>
                <strong>Teamwork</strong>
              </div>

              <div>
                <span><FaStar /></span>
                <strong>Recognition</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MORE THAN JUST WINNING
      ===================================================== */}
      <section
        className="abcomp-about"
        id="competitionAbout"
      >

        <div className="abcomp-container abcomp-about-grid">

          {/* CONTENT */}
          <div className="abcomp-about-content">

            <span className="abcomp-label">
              ABOUT COMPETITIONS
            </span>

            <h2>
              More Than
              <span>Just Winning.</span>
            </h2>

            <p>
              Competitions go beyond trophies. They encourage
              curiosity, creativity and collaboration, helping
              students learn, grow and become confident individuals
              ready for real-world challenges.
            </p>

            <div className="abcomp-about-checks">

              <div>
                <FaCheck />
                <span>Develop confidence through participation</span>
              </div>

              <div>
                <FaCheck />
                <span>Discover individual strengths and talents</span>
              </div>

              <div>
                <FaCheck />
                <span>Learn through healthy competition</span>
              </div>

            </div>


            <div className="abcomp-about-stats">

              <div>
                <strong>15+</strong>
                <span>Inter-House</span>
                <small>Competitions</small>
              </div>

              <div>
                <strong>10+</strong>
                <span>State Level</span>
                <small>Participations</small>
              </div>

              <div>
                <strong>5+</strong>
                <span>National Level</span>
                <small>Achievements</small>
              </div>

            </div>

          </div>


          {/* IMAGE COMPOSITION */}
          <div className="abcomp-about-visual">

            <div className="abcomp-about-main-image">
              <img
                src={aboutMain}
                alt="Student science competition"
              />
            </div>

            <div className="abcomp-about-small top">
              <img
                src={aboutDebate}
                alt="Student debate competition"
              />
            </div>

            <div className="abcomp-about-small bottom">
              <img
                src={aboutCultural}
                alt="Student cultural competition"
              />
            </div>

            <div className="abcomp-about-trophy">
              <FaTrophy />
            </div>

            <div className="abcomp-about-note">
              Explore
              <span>Compete</span>
              Grow
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BUILDING SKILLS — NO IMAGES
      ===================================================== */}
      <section className="abcomp-skills">

        <div className="abcomp-skills-lines" />

        <div className="abcomp-container">

          <div className="abcomp-heading center">

            <span className="abcomp-label">
              WHY COMPETITIONS
            </span>

            <h2>
              Building Skills
              <span> For Life.</span>
            </h2>

            <p>
              Competitions help students step outside their comfort
              zone and develop qualities that last a lifetime.
            </p>

          </div>


          <div className="abcomp-skills-row">

            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <article
                  className="abcomp-skill"
                  key={skill.title}
                >

                  <span className="abcomp-skill-number">
                    0{index + 1}
                  </span>

                  <div className="abcomp-skill-circle">

                    <div className="abcomp-skill-icon">
                      <Icon />
                    </div>

                    <h3>{skill.title}</h3>

                    <p>{skill.text}</p>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          JOURNEY
      ===================================================== */}
      <section className="abcomp-journey">

        <div className="abcomp-container abcomp-journey-grid">

          <div className="abcomp-journey-image">

            <div className="abcomp-journey-frame" />

            <img
              src={journeyImage}
              alt="Student participating in a school competition"
            />

            <div className="abcomp-journey-card">
              <FaTrophy />

              <div>
                <strong>A Platform</strong>
                <span>For Bright Ideas</span>
              </div>
            </div>

          </div>


          <div className="abcomp-journey-content">

            <span className="abcomp-label">
              OUR COMPETITION JOURNEY
            </span>

            <h2>
              From Participation
              <span>To Excellence.</span>
            </h2>

            <p>
              Students actively participate in inter-house,
              inter-school and wider competitions across academics,
              arts, sports and creative activities.
            </p>


            <div className="abcomp-journey-steps">

              {journey.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    className="abcomp-journey-step"
                    key={step.number}
                  >

                    <div className="abcomp-step-icon">
                      <Icon />
                    </div>

                    <span>{step.number}</span>

                    <h3>{step.title}</h3>

                    <p>{step.text}</p>

                  </article>
                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}
      <section className="abcomp-achievement">

        <div className="abcomp-container abcomp-achievement-grid">

          <div className="abcomp-achievement-content">

            <span className="abcomp-label">
              STUDENT ACHIEVEMENTS
            </span>

            <h2>
              Turning Efforts
              <span>Into Success.</span>
            </h2>

            <p>
              Our students participate in competitions at different
              levels, gaining valuable experience, recognition and
              opportunities to grow.
            </p>


            <div className="abcomp-achievement-stats">

              <article>
                <FaTrophy />
                <strong>50+</strong>
                <span>Awards Won</span>
                <small>Last Year</small>
              </article>

              <article>
                <FaStar />
                <strong>25+</strong>
                <span>Students</span>
                <small>Recognized</small>
              </article>

              <article>
                <FaUsers />
                <strong>10+</strong>
                <span>Inter-School</span>
                <small>Competitions</small>
              </article>

              <article>
                <FaMedal />
                <strong>5+</strong>
                <span>State & National</span>
                <small>Participations</small>
              </article>

            </div>

          </div>


          <div className="abcomp-achievement-image">

            <div className="abcomp-achievement-outline" />

            <img
              src={achievementImage}
              alt="Competition winners with trophies"
            />

            <div className="abcomp-achievement-floating">
              <FaTrophy />

              <div>
                <strong>Celebrate</strong>
                <span>Every Achievement</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="abcomp-cta">

        <img
          src={ctaImage}
          alt="Student competition winner"
          className="abcomp-cta-bg"
        />

        <div className="abcomp-cta-overlay" />

        <div className="abcomp-cta-wave wave-a" />
        <div className="abcomp-cta-wave wave-b" />

        <div className="abcomp-container abcomp-cta-inner">

          <div className="abcomp-cta-content">

            <span className="abcomp-label abcomp-label-light">
              PARTICIPATE • LEARN • ACHIEVE
            </span>

            <h2>
              Every Challenge
              <span>Creates A Brighter You.</span>
            </h2>

            <p>
              Encourage your child to take part in exciting
              competitions and become part of a vibrant learning
              community.
            </p>


            <div className="abcomp-cta-buttons">

              <button
                className="abcomp-btn abcomp-btn-gold"
                onClick={() => navigate("/apply")}
              >
                Apply For Admission
                <FaArrowRight />
              </button>

              <button
                className="abcomp-btn abcomp-btn-outline-light"
                onClick={() => navigate("/contact")}
              >
                Contact School
              </button>

            </div>


            <div className="abcomp-cta-features">

              <div>
                <FaLightbulb />
                <span>New Opportunities</span>
              </div>

              <div>
                <FaUsers />
                <span>Skill Development</span>
              </div>

              <div>
                <FaTrophy />
                <span>Recognition</span>
              </div>

              <div>
                <FaStar />
                <span>Confident Future</span>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Competitions;