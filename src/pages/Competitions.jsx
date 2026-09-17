import React from "react";
import "./Competitions.css";

import {
  FaBrain,
  FaMicrophone,
  FaPenNib,
  FaPalette,
  FaFlask,
  FaTrophy,
  FaStar,
  FaLightbulb,
  FaBullseye,
  FaUsers,
  FaAward,
  FaBookOpen,
  FaMedal,
} from "react-icons/fa";

// =========================================================
// IMAGES
// =========================================================

import quizImage from "../assets/quizcompetition.jpg";
import debateImage from "../assets/debatecompetition.jpg";
import writingImage from "../assets/writingcompetition.jpg";
import artImage from "../assets/artcompetition.jpg";
import scienceImage from "../assets/sciencecompetition.jpg";
import interschoolImage from "../assets/interschoolcompetition.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// =========================================================
// COMPETITIONS DATA
// =========================================================

const competitionsData = [
  {
    id: 1,
    number: "01",
    icon: <FaBrain />,
    title: "Quiz Competitions",
    subtitle: "KNOWLEDGE • SPEED • CONFIDENCE",
    image: quizImage,
    description:
      "Quiz competitions encourage students to expand their knowledge, think quickly and develop confidence.",
    activities: [
      "General Knowledge",
      "Science Quiz",
      "Current Affairs",
      "Inter-House Quiz",
    ],
  },

  {
    id: 2,
    number: "02",
    icon: <FaMicrophone />,
    title: "Debate & Speech",
    subtitle: "THINK • SPEAK • EXPRESS",
    image: debateImage,
    description:
      "Debate and speech competitions improve public speaking, communication and critical thinking skills.",
    activities: [
      "English Debate",
      "Hindi Debate",
      "Speech Competition",
      "Extempore",
    ],
  },

  {
    id: 3,
    number: "03",
    icon: <FaPenNib />,
    title: "Writing Competitions",
    subtitle: "IMAGINE • WRITE • INSPIRE",
    image: writingImage,
    description:
      "Creative writing gives students an opportunity to express their imagination, ideas and thoughts.",
    activities: [
      "Essay Writing",
      "Story Writing",
      "Poetry Writing",
      "Creative Writing",
    ],
  },

  {
    id: 4,
    number: "04",
    icon: <FaPalette />,
    title: "Art Competitions",
    subtitle: "CREATE • DESIGN • EXPRESS",
    image: artImage,
    description:
      "Art competitions encourage creativity, imagination and visual expression through artistic activities.",
    activities: [
      "Drawing",
      "Painting",
      "Poster Making",
      "Rangoli",
    ],
  },

  {
    id: 5,
    number: "05",
    icon: <FaFlask />,
    title: "Science Competitions",
    subtitle: "DISCOVER • EXPERIMENT • INNOVATE",
    image: scienceImage,
    description:
      "Science competitions allow students to explore concepts, conduct experiments and present innovative ideas.",
    activities: [
      "Science Exhibition",
      "Model Making",
      "Innovation Challenge",
      "Science Projects",
    ],
  },

  {
    id: 6,
    number: "06",
    icon: <FaTrophy />,
    title: "Inter-School Competitions",
    subtitle: "PARTICIPATE • PERFORM • ACHIEVE",
    image: interschoolImage,
    description:
      "Students represent the school in various inter-school events and gain valuable competitive experience.",
    activities: [
      "Inter-School Quiz",
      "Debate Events",
      "Cultural Events",
      "Academic Challenges",
    ],
  },
];

// =========================================================
// BENEFITS
// =========================================================

const benefitsData = [
  {
    icon: <FaAward />,
    number: "01",
    title: "Build Confidence",
    description:
      "Competitions help students overcome hesitation and develop self-confidence.",
  },

  {
    icon: <FaLightbulb />,
    number: "02",
    title: "Develop Creativity",
    description:
      "Students learn to think differently and present innovative ideas.",
  },

  {
    icon: <FaBullseye />,
    number: "03",
    title: "Goal Oriented",
    description:
      "Participation teaches students to set goals and work consistently.",
  },

  {
    icon: <FaUsers />,
    number: "04",
    title: "Healthy Competition",
    description:
      "Students learn teamwork, sportsmanship and respect for others.",
  },
];

// =========================================================
// COMPONENT
// =========================================================

const Competitions = () => {
  return (
    <>
    <Navbar />
    <main className="abcomp-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="abcomp-hero">

        <div className="abcomp-heroGlow abcomp-heroGlowOne"></div>
        <div className="abcomp-heroGlow abcomp-heroGlowTwo"></div>
        <div className="abcomp-heroPattern"></div>

        <div className="abcomp-heroContent">

          <div className="abcomp-eyebrow">
            <span></span>
            <FaTrophy />
            ACTIVITIES • COMPETITIONS
            <span></span>
          </div>

          <h1>
            Compete. Learn.
            <strong>Achieve Excellence.</strong>
          </h1>

          <p>
            At AB Public School, competitions provide students with a
            platform to discover their abilities, develop confidence and
            achieve excellence through creativity, knowledge and
            performance.
          </p>

          <div className="abcomp-heroBottom">

            <div className="abcomp-heroLine"></div>

            <div className="abcomp-heroMini">
              <FaMedal />
              <span>LEARN • PARTICIPATE • ACHIEVE</span>
            </div>

            <div className="abcomp-heroLine"></div>

          </div>

        </div>
      </section>


      {/* =================================================
          INTRO
      ================================================= */}

      <section className="abcomp-intro">

        <div className="abcomp-introContainer">

          <div className="abcomp-introNumber">
            <strong>01</strong>
            <span>STUDENT LIFE</span>
          </div>

          <div className="abcomp-introContent">

            <span className="abcomp-smallTitle">
              BEYOND THE CLASSROOM
            </span>

            <h2>
              Inspiring Students To
              <strong>Challenge Themselves.</strong>
            </h2>

            <p>
              We believe competitions are an important part of a
              student's overall development. They encourage students
              to explore their talents, improve their skills and learn
              valuable lessons through participation.
            </p>

            <div className="abcomp-introFeatures">

              <div className="abcomp-introFeature">
                <span>
                  <FaBrain />
                </span>

                <div>
                  <strong>Think Better</strong>
                  <small>Critical Thinking</small>
                </div>
              </div>

              <div className="abcomp-introFeature">
                <span>
                  <FaUsers />
                </span>

                <div>
                  <strong>Work Together</strong>
                  <small>Team Spirit</small>
                </div>
              </div>

              <div className="abcomp-introFeature">
                <span>
                  <FaTrophy />
                </span>

                <div>
                  <strong>Achieve More</strong>
                  <small>Excellence</small>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          COMPETITIONS
      ================================================= */}

      <section className="abcomp-gridSection">

        <div className="abcomp-sectionHeading">

          <span className="abcomp-sectionEyebrow">
            OUR COMPETITIONS
          </span>

          <h2>
            Opportunities To
            <strong>Learn & Perform.</strong>
          </h2>

          <p>
            Students participate in a variety of academic, creative and
            inter-school competitions throughout the year.
          </p>

        </div>


        <div className="abcomp-grid">

          {competitionsData.map((competition) => (

            <article
              className="abcomp-card"
              key={competition.id}
            >

              {/* IMAGE */}

              <div className="abcomp-imageBox">

                <img
                  src={competition.image}
                  alt={competition.title}
                />

                <div className="abcomp-imageOverlay"></div>

                <span className="abcomp-number">
                  {competition.number}
                </span>

                <span className="abcomp-imageLabel">
                  STUDENT COMPETITION
                </span>

                <div className="abcomp-icon">
                  {competition.icon}
                </div>

              </div>


              {/* CONTENT */}

              <div className="abcomp-cardContent">

                <span className="abcomp-cardSubtitle">
                  {competition.subtitle}
                </span>

                <h3>
                  {competition.title}
                </h3>

                <div className="abcomp-cardLine"></div>

                <p>
                  {competition.description}
                </p>


                {/* TAGS */}

                <div className="abcomp-tags">

                  {competition.activities.map(
                    (activity, index) => (

                      <span key={index}>
                        <FaStar />
                        {activity}
                      </span>

                    )
                  )}

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =================================================
          BENEFITS
      ================================================= */}

      <section className="abcomp-benefits">

        <div className="abcomp-benefitsContainer">

          <div className="abcomp-benefitsHeading">

            <span>
              WHY COMPETITIONS MATTER
            </span>

            <h2>
              Building Skills For
              <strong>Future Success.</strong>
            </h2>

            <p>
              Every competition provides students with valuable
              experiences that contribute to academic and personal
              development.
            </p>

          </div>


          <div className="abcomp-benefitGrid">

            {benefitsData.map((benefit) => (

              <div
                className="abcomp-benefitCard"
                key={benefit.number}
              >

                <div className="abcomp-benefitTop">

                  <span className="abcomp-benefitNumber">
                    {benefit.number}
                  </span>

                  <div className="abcomp-benefitIcon">
                    {benefit.icon}
                  </div>

                </div>

                <h3>
                  {benefit.title}
                </h3>

                <p>
                  {benefit.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="abcomp-statsSection">

        <div className="abcomp-stat">

          <div className="abcomp-statIcon">
            <FaTrophy />
          </div>

          <strong>25+</strong>
          <span>Annual Competitions</span>

        </div>


        <div className="abcomp-stat">

          <div className="abcomp-statIcon">
            <FaUsers />
          </div>

          <strong>500+</strong>
          <span>Student Participants</span>

        </div>


        <div className="abcomp-stat">

          <div className="abcomp-statIcon">
            <FaMedal />
          </div>

          <strong>50+</strong>
          <span>Awards & Certificates</span>

        </div>


        <div className="abcomp-stat">

          <div className="abcomp-statIcon">
            <FaBookOpen />
          </div>

          <strong>10+</strong>
          <span>Inter-School Events</span>

        </div>

      </section>


      {/* =================================================
          QUOTE
      ================================================= */}

      <section className="abcomp-quote">

        <div className="abcomp-quoteContent">


          <span className="abcomp-quoteMark">
            “
          </span>

          <h2>
            Winning is rewarding, but the greatest achievement is
            learning, growing and having the courage to participate.
          </h2>

          <div className="abcomp-quoteLine"></div>

          <span className="abcomp-quoteAuthor">
            — AB PUBLIC SCHOOL
          </span>

        </div>

      </section>

    </main>
<Footer />
    </>
  );
};

export default Competitions;