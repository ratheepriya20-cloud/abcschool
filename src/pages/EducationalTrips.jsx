import React from "react";
import "./EducationalTrips.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaLandmark,
  FaFlask,
  FaTree,
  FaIndustry,
  FaMapMarkedAlt,
  FaGraduationCap,
  FaCompass,
  FaUsers,
  FaLightbulb,
  FaBookOpen,
  FaCamera,
  FaGlobeAsia,
} from "react-icons/fa";


import historicalImage from "../assets/historical-trips.jpg";
import scienceImage from "../assets/science-trips.jpg";
import natureImage from "../assets/nature-trips.jpg";
import industrialImage from "../assets/industrial-trips.jpg";
import educationalImage from "../assets/educational-tours.jpg";
import expeditionImage from "../assets/learning-expeditions.jpg";


const tripsData = [
  {
    id: 1,
    number: "01",
    icon: <FaLandmark />,
    title: "Historical Places",
    subtitle: "DISCOVER • EXPLORE • UNDERSTAND",
    image: historicalImage,
    description:
      "Visits to historical places help students connect classroom learning with real stories, heritage and important events from the past.",
    activities: [
      "Historical Monuments",
      "Heritage Sites",
      "Museums",
      "Guided Tours",
    ],
  },

  {
    id: 2,
    number: "02",
    icon: <FaFlask />,
    title: "Science Visits",
    subtitle: "OBSERVE • QUESTION • DISCOVER",
    image: scienceImage,
    description:
      "Science-focused trips give students opportunities to observe experiments, technology and scientific concepts in real-world environments.",
    activities: [
      "Science Museums",
      "Science Centres",
      "Laboratory Visits",
      "Technology Exhibitions",
    ],
  },

  {
    id: 3,
    number: "03",
    icon: <FaTree />,
    title: "Nature Trips",
    subtitle: "EXPLORE • CONNECT • PROTECT",
    image: natureImage,
    description:
      "Nature trips allow students to explore the environment, understand biodiversity and develop appreciation for the natural world.",
    activities: [
      "Nature Walks",
      "Parks & Gardens",
      "Wildlife Learning",
      "Nature Observation",
    ],
  },

  {
    id: 4,
    number: "04",
    icon: <FaIndustry />,
    title: "Industrial Visits",
    subtitle: "SEE • EXPERIENCE • LEARN",
    image: industrialImage,
    description:
      "Industrial visits introduce students to real workplaces and help them understand how classroom concepts are applied professionally.",
    activities: [
      "Industry Tours",
      "Factory Visits",
      "Workplace Learning",
      "Career Awareness",
    ],
  },

  {
    id: 5,
    number: "05",
    icon: <FaMapMarkedAlt />,
    title: "Educational Tours",
    subtitle: "TRAVEL • EXPERIENCE • GROW",
    image: educationalImage,
    description:
      "Educational tours combine travel with meaningful learning experiences, helping students discover new places and perspectives.",
    activities: [
      "School Excursions",
      "City Visits",
      "Cultural Experiences",
      "Group Activities",
    ],
  },

  {
    id: 6,
    number: "06",
    icon: <FaGraduationCap />,
    title: "Learning Expeditions",
    subtitle: "LEARN • EXPERIENCE • REMEMBER",
    image: expeditionImage,
    description:
      "Special learning expeditions encourage students to step outside the classroom and gain knowledge through direct experiences.",
    activities: [
      "Field Studies",
      "Research Activities",
      "Observation Tasks",
      "Experiential Learning",
    ],
  },
];

// =========================================================
// COMPONENT
// =========================================================

const EducationalTrips = () => {
  return (
    <>
     <Navbar />
    <div className="abtrip-page">

     

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="abtrip-hero">

          <div className="abtrip-heroGlow abtrip-glowOne"></div>
          <div className="abtrip-heroGlow abtrip-glowTwo"></div>
          <div className="abtrip-heroPattern"></div>

          <div className="abtrip-heroContent">

            <div className="abtrip-eyebrow">
              <span></span>
              <FaCompass />
              EDUCATIONAL TRIPS
              <span></span>
            </div>

            <h1>
              Learn Beyond
              <strong>The Classroom.</strong>
            </h1>

            <p>
              At AB Public School, educational trips turn learning
              into memorable experiences. Students explore new
              places, discover new ideas and understand the world
              through real-life experiences.
            </p>

            <div className="abtrip-heroBottom">

              <i></i>

              <span>
                <FaGlobeAsia />
                EXPLORE • EXPERIENCE • LEARN
              </span>

              <i></i>

            </div>

          </div>

        </section>


        {/* =================================================
            INTRO
        ================================================= */}

        <section className="abtrip-intro">

          <div className="abtrip-introContainer">

            <div className="abtrip-introNumber">
              <strong>01</strong>
              <span>STUDENT LIFE</span>
            </div>

            <div className="abtrip-introContent">

              <span className="abtrip-smallTitle">
                LEARNING BEYOND BOUNDARIES
              </span>

              <h2>
                The World Is
                <strong>Our Classroom.</strong>
              </h2>

              <p>
                Educational trips give students an opportunity to
                experience learning outside the traditional classroom.
                Through visits to historical places, science centres,
                museums, nature spaces and educational destinations,
                students develop curiosity, observation skills and a
                better understanding of the world around them.
              </p>

              <div className="abtrip-introFeatures">

                <div className="abtrip-introFeature">
                  <span>
                    <FaBookOpen />
                  </span>

                  <div>
                    <strong>Learn</strong>
                    <small>Real-World Knowledge</small>
                  </div>
                </div>

                <div className="abtrip-introFeature">
                  <span>
                    <FaCamera />
                  </span>

                  <div>
                    <strong>Experience</strong>
                    <small>Memorable Moments</small>
                  </div>
                </div>

                <div className="abtrip-introFeature">
                  <span>
                    <FaUsers />
                  </span>

                  <div>
                    <strong>Connect</strong>
                    <small>Team Experiences</small>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            TRIPS
        ================================================= */}

        <section className="abtrip-gridSection">

          <div className="abtrip-sectionHeading">

            <span>
              EXPLORE OUR LEARNING EXPERIENCES
            </span>

            <h2>
              Every Journey
              <strong>Teaches Something.</strong>
            </h2>

            <p>
              Meaningful journeys help students discover,
              observe and learn beyond the boundaries of
              their everyday classroom.
            </p>

          </div>


          <div className="abtrip-grid">

            {tripsData.map((trip) => (

              <article
                key={trip.id}
                className="abtrip-card"
              >

                {/* IMAGE */}

                <div className="abtrip-imageBox">

                  <img
                    src={trip.image}
                    alt={trip.title}
                  />

                  <div className="abtrip-imageOverlay"></div>

                  <span className="abtrip-number">
                    {trip.number}
                  </span>

                  <span className="abtrip-imageLabel">
                    LEARNING EXPERIENCE
                  </span>

                  <div className="abtrip-icon">
                    {trip.icon}
                  </div>

                </div>


                {/* CONTENT */}

                <div className="abtrip-cardContent">

                  <span className="abtrip-cardSubtitle">
                    {trip.subtitle}
                  </span>

                  <h3>
                    {trip.title}
                  </h3>

                  <div className="abtrip-cardLine"></div>

                  <p>
                    {trip.description}
                  </p>


                  {/* TAGS */}

                  <div className="abtrip-tags">

                    {trip.activities.map((activity) => (

                      <span key={activity}>
                        <FaLightbulb />
                        {activity}
                      </span>

                    ))}

                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =================================================
            BENEFITS
        ================================================= */}

        <section className="abtrip-benefits">

          <div className="abtrip-benefitsContainer">

            <div className="abtrip-benefitsHeading">

              <span>
                LEARNING THROUGH EXPERIENCE
              </span>

              <h2>
                Every Trip
                <strong>Creates A Lesson.</strong>
              </h2>

              <p>
                Educational journeys help students become curious,
                independent and confident learners. Real-world
                experiences make classroom concepts easier to
                understand and remember.
              </p>

            </div>


            <div className="abtrip-benefitGrid">

              <div className="abtrip-benefitCard">

                <div className="abtrip-benefitTop">
                  <span>01</span>
                  <FaBookOpen />
                </div>

                <strong>
                  Real-World Learning
                </strong>

                <p>
                  Students connect academic concepts with
                  real-world experiences.
                </p>

              </div>


              <div className="abtrip-benefitCard">

                <div className="abtrip-benefitTop">
                  <span>02</span>
                  <FaLightbulb />
                </div>

                <strong>
                  Curiosity
                </strong>

                <p>
                  New environments encourage students to ask
                  questions and discover new ideas.
                </p>

              </div>


              <div className="abtrip-benefitCard">

                <div className="abtrip-benefitTop">
                  <span>03</span>
                  <FaUsers />
                </div>

                <strong>
                  Teamwork
                </strong>

                <p>
                  Group activities teach cooperation,
                  communication and responsibility.
                </p>

              </div>


              <div className="abtrip-benefitCard">

                <div className="abtrip-benefitTop">
                  <span>04</span>
                  <FaGraduationCap />
                </div>

                <strong>
                  Memories
                </strong>

                <p>
                  Educational experiences create meaningful
                  memories that students carry with them.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            STATS
        ================================================= */}

        <section className="abtrip-statsSection">

          <div className="abtrip-stat">
            <strong>6+</strong>
            <span>Learning Experiences</span>
          </div>

          <div className="abtrip-stat">
            <strong>15+</strong>
            <span>Annual Trips</span>
          </div>

          <div className="abtrip-stat">
            <strong>100+</strong>
            <span>Student Participants</span>
          </div>

          <div className="abtrip-stat">
            <strong>10+</strong>
            <span>Learning Destinations</span>
          </div>

        </section>


        {/* =================================================
            QUOTE
        ================================================= */}

        <section className="abtrip-quote">

          <div className="abtrip-quoteIcon">
            <FaCompass />
          </div>

          <div className="abtrip-quoteMark">
            “
          </div>

          <blockquote>
            The best lessons are sometimes found
            outside the classroom.
          </blockquote>

          <div className="abtrip-quoteLine"></div>

          <span>
            — AB PUBLIC SCHOOL
          </span>

        </section>

      </main>

      

    </div>
    <Footer />
    </>
  );
};

export default EducationalTrips;