import React from "react";
import { useNavigate } from "react-router-dom";
import "./Facilities.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const facilities = [
  {
    number: "01",
    icon: "▣",
    title: "Smart Classrooms",
    text: "Technology-enabled classrooms that make lessons interactive, visual and engaging for every learner.",
    tag: "LEARNING"
  },
  {
    number: "02",
    icon: "⚗",
    title: "Science Laboratories",
    text: "Well-equipped Physics, Chemistry and Biology laboratories where students learn through practical experiences.",
    tag: "DISCOVERY"
  },
  {
    number: "03",
    icon: "⌨",
    title: "Computer & IT Lab",
    text: "Modern computer facilities that help students develop digital skills, creativity and technological confidence.",
    tag: "TECHNOLOGY"
  },
  {
    number: "04",
    icon: "▤",
    title: "School Library",
    text: "A welcoming collection of books and learning resources that encourages reading, research and independent learning.",
    tag: "KNOWLEDGE"
  },
  {
    number: "05",
    icon: "⚽",
    title: "Sports Facilities",
    text: "Dedicated spaces for sports and physical activities that promote fitness, teamwork, discipline and confidence.",
    tag: "SPORTS"
  },
  {
    number: "06",
    icon: "♪",
    title: "Music & Performing Arts",
    text: "Opportunities for students to explore music, dance, theatre and other forms of creative expression.",
    tag: "CREATIVITY"
  },
  {
    number: "07",
    icon: "✦",
    title: "Art & Activity Rooms",
    text: "Creative spaces where students can express ideas through art, craft, projects and hands-on activities.",
    tag: "CREATIVE ARTS"
  },
  {
    number: "08",
    icon: "▰",
    title: "Safe School Transport",
    text: "Convenient school transportation designed to provide students with a comfortable and dependable journey.",
    tag: "TRANSPORT"
  },
  {
    number: "09",
    icon: "✚",
    title: "Medical & First Aid",
    text: "A dedicated first-aid facility to provide immediate care and support whenever students need it.",
    tag: "WELLNESS"
  },
  {
    number: "10",
    icon: "◉",
    title: "Campus Security",
    text: "A safety-focused campus environment with responsible supervision and secure school premises.",
    tag: "SAFETY"
  },
  {
    number: "11",
    icon: "☕",
    title: "Cafeteria",
    text: "A comfortable space where students can enjoy their breaks and spend time together in a welcoming environment.",
    tag: "CAMPUS LIFE"
  },
  {
    number: "12",
    icon: "♟",
    title: "Activity & Club Spaces",
    text: "Dedicated opportunities for clubs, competitions and activities that help students discover their interests.",
    tag: "EXPERIENCE"
  }
];

const Facilities = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <main className="abf-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="abf-hero">

        <div className="abf-heroGlow abf-heroGlowLeft"></div>
        <div className="abf-heroGlow abf-heroGlowRight"></div>

        <div className="abf-heroContent">

          <span className="abf-heroEyebrow">
            LIFE & LEARNING AT AB PUBLIC SCHOOL
          </span>

          <h1>
            Facilities That
            <span>Inspire Excellence.</span>
          </h1>

          <p>
            From modern learning spaces to sports, technology and
            creative activities, AB Public School provides an environment
            where students can learn, explore and grow with confidence.
          </p>

          <div className="abf-heroDivider">
            <i></i>
            <span>AB PUBLIC SCHOOL</span>
            <i></i>
          </div>

        </div>

      </section>


      {/* =================================================
          INTRO
      ================================================= */}

      <section className="abf-intro">

        <div className="abf-introHeading">

          <span>OUR CAMPUS EXPERIENCE</span>

          <h2>
            Designed For
            <strong>Every Student.</strong>
          </h2>

        </div>

        <div className="abf-introText">

          <p>
            A great school is more than classrooms and textbooks.
            At AB Public School, our facilities are designed to support
            academic learning, creativity, physical development and
            the overall growth of every student.
          </p>

        </div>

      </section>


      {/* =================================================
          FACILITIES GRID
      ================================================= */}

      <section className="abf-facilitiesSection">

        <div className="abf-facilitiesHeader">

          <div>
            <span>EXPLORE OUR FACILITIES</span>
            <h2>
              Spaces That Make
              <strong>Learning Better.</strong>
            </h2>
          </div>

          <p>
            Explore the spaces and resources that make everyday
            school life more meaningful, active and enjoyable.
          </p>

        </div>


        <div className="abf-facilitiesGrid">

          {facilities.map((facility) => (

            <article
              className="abf-facilityCard"
              key={facility.number}
            >

              <div className="abf-cardTop">

                <span className="abf-cardNumber">
                  {facility.number}
                </span>

                <span className="abf-cardTag">
                  {facility.tag}
                </span>

              </div>


              <div className="abf-cardIcon">
                {facility.icon}
              </div>


              <h3>
                {facility.title}
              </h3>


              <p>
                {facility.text}
              </p>


              <div className="abf-cardBottom">

                <span>
                  AB Public School
                </span>

                <b>→</b>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =================================================
          CAMPUS HIGHLIGHT
      ================================================= */}

      <section className="abf-campusHighlight">

        <div className="abf-campusContent">

          <span className="abf-campusEyebrow">
            BEYOND THE CLASSROOM
          </span>

          <h2>
            A Campus Where
            <strong>Curiosity Comes Alive.</strong>
          </h2>

          <p>
            Whether a student is experimenting in a science lab,
            discovering a new book, playing on the field or performing
            on stage, every space is an opportunity to learn something new.
          </p>

          <div className="abf-campusPoints">

            <div>
              <span>01</span>
              <strong>Learn</strong>
              <small>Build strong foundations</small>
            </div>

            <div>
              <span>02</span>
              <strong>Explore</strong>
              <small>Discover new interests</small>
            </div>

            <div>
              <span>03</span>
              <strong>Grow</strong>
              <small>Develop confidence</small>
            </div>

          </div>

        </div>


        <div className="abf-campusBadge">

          <div className="abf-badgeCircle">
            <span>AB</span>
            <small>PUBLIC</small>
            <small>SCHOOL</small>
          </div>

          <p>
            Learning<br />
            Beyond<br />
            Boundaries
          </p>

        </div>

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="abf-stats">

        <div className="abf-statItem">
          <strong>1500+</strong>
          <span>Students</span>
        </div>

        <div className="abf-statDivider"></div>

        <div className="abf-statItem">
          <strong>100+</strong>
          <span>Teachers</span>
        </div>

        <div className="abf-statDivider"></div>

        <div className="abf-statItem">
          <strong>25+</strong>
          <span>Years of Excellence</span>
        </div>

        <div className="abf-statDivider"></div>

        <div className="abf-statItem">
          <strong>98%</strong>
          <span>Board Results</span>
        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="abf-cta">

        <div>

          <span>
            DISCOVER AB PUBLIC SCHOOL
          </span>

          <h2>
            See where your child's
            <strong>journey can begin.</strong>
          </h2>

        </div>

        <div className="abf-ctaButtons">

          <button
            className="abf-primaryButton"
            onClick={() => navigate("/admission")}
          >
            Explore Admissions
            <span>→</span>
          </button>

          <button
            className="abf-secondaryButton"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>

        </div>

      </section>

    </main>
    <Footer />
    </>
  );
};

export default Facilities;