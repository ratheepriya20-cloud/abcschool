import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaShieldAlt,
  FaSchool,
  FaUsers,
  FaFlask,
  FaDesktop,
  FaPalette,
  FaMusic,
  FaTheaterMasks,
  FaFutbol,
  FaRunning,
  FaTableTennis,
  FaBasketballBall,
  FaVideo,
  FaUserShield,
  FaBusAlt,
  FaFirstAid,
  FaFireExtinguisher,
  FaTint,
  FaHandsHelping,
  FaCamera,
  FaTrophy,
  FaHeart,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";

import "./Facilities.css";


/* =========================================================
   IMAGES
========================================================= */

import heroImage from "../assets/facility-hero.jpg";

import classroomImage from "../assets/facility-classroom.jpg";
import libraryImage from "../assets/facility-library.jpg";
import scienceImage from "../assets/science-learning.jpg";
import technologyImage from "../assets/technology-learning.jpg";

import footballImage from "../assets/sports-football.jpg";
import cricketImage from "../assets/sports-cricket.jpg";
import basketballImage from "../assets/sports-Basketball.jpg";
import badmintonImage from "../assets/sports-badminton.jpg";
import athleticsImage from "../assets/sports-athletics.jpg";
import indoorImage from "../assets/sports-indoor.jpg";

import safetyImage from "../assets/trip-safety.jpg";

import gallery1 from "../assets/school-facilities.jpg";
import gallery2 from "../assets/trip-gallery-2.jpg";
import gallery3 from "../assets/sports-gallery-3.jpg";
import gallery4 from "../assets/trip-gallery-2.jpg";
import gallery5 from "../assets/sports-gallery-2.jpg";
import gallery6 from "../assets/educational-tours.jpg";

import ctaImage from "../assets/facility-cta.jpg";


/* =========================================================
   DATA
========================================================= */

const learningFacilities = [
  {
    id: 1,
    title: "Modern Library",
    text: "Read • Research • Discover",
    description:
      "A calm and inspiring reading environment that encourages curiosity and independent learning.",
    image: libraryImage,
    icon: FaBookOpen,
  },

  {
    id: 2,
    title: "Science Laboratories",
    text: "Experiment • Explore • Innovate",
    description:
      "Practical learning spaces where students understand science through observation and experiments.",
    image: scienceImage,
    icon: FaFlask,
  },

  {
    id: 3,
    title: "Technology Lab",
    text: "Learn • Create • Connect",
    description:
      "Modern technology resources that help students build digital confidence and future-ready skills.",
    image: technologyImage,
    icon: FaDesktop,
  },
];


const creativeFacilities = [
  {
    id: 1,
    title: "Art & Creativity",
    text: "Express • Imagine • Create",
    icon: FaPalette,
  },

  {
    id: 2,
    title: "Music Room",
    text: "Learn • Practice • Perform",
    icon: FaMusic,
  },

  {
    id: 3,
    title: "Multipurpose Hall",
    text: "Events • Performances • Assemblies",
    icon: FaTheaterMasks,
  },
];


const sportsFacilities = [
  {
    id: 1,
    title: "Football Ground",
    image: footballImage,
    icon: FaFutbol,
  },

  {
    id: 2,
    title: "Cricket Ground",
    image: cricketImage,
    icon: FaTrophy,
  },

  {
    id: 3,
    title: "Basketball Court",
    image: basketballImage,
    icon: FaBasketballBall,
  },

  {
    id: 4,
    title: "Badminton Court",
    image: badmintonImage,
    icon: FaTableTennis,
  },

  {
    id: 5,
    title: "Athletics Track",
    image: athleticsImage,
    icon: FaRunning,
  },

  {
    id: 6,
    title: "Indoor Sports",
    image: indoorImage,
    icon: FaTableTennis,
  },
];


const safetyItems = [
  {
    id: 1,
    icon: FaVideo,
    title: "CCTV",
    text: "Monitoring",
  },

  {
    id: 2,
    icon: FaUserShield,
    title: "Trained",
    text: "Staff",
  },

  {
    id: 3,
    icon: FaBusAlt,
    title: "Safe",
    text: "Transport",
  },

  {
    id: 4,
    icon: FaFirstAid,
    title: "First Aid",
    text: "& Medical Care",
  },

  {
    id: 5,
    icon: FaFireExtinguisher,
    title: "Fire",
    text: "Safety",
  },

  {
    id: 6,
    icon: FaShieldAlt,
    title: "Clean Campus",
    text: "& Hygiene",
  },

  {
    id: 7,
    icon: FaTint,
    title: "Drinking",
    text: "Water",
  },

  {
    id: 8,
    icon: FaHandsHelping,
    title: "Student",
    text: "Supervision",
  },
];


const galleryImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
];


/* =========================================================
   COMPONENT
========================================================= */

const Facilities = () => {
  const navigate = useNavigate();


  const scrollToFacilities = () => {
    document
      .getElementById("abpsFcx26MainFacilities")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };


  return (
    <main className="abpsFcx26-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abpsFcx26-hero">

        <div className="abpsFcx26-heroDecor abpsFcx26-heroDecorOne"></div>
        <div className="abpsFcx26-heroDecor abpsFcx26-heroDecorTwo"></div>

        <div className="abpsFcx26-container abpsFcx26-heroGrid">

          {/* LEFT CONTENT */}

          <div className="abpsFcx26-heroContent">

            <div className="abpsFcx26-label">
              <span></span>
              OUR FACILITIES
            </div>


            <h1>
              Spaces Designed
              <strong>
                To Inspire.
              </strong>
            </h1>


            <p>
              Modern infrastructure, thoughtfully designed learning
              spaces and a safe campus environment help every student
              learn, explore, create and grow with confidence.
            </p>


            <div className="abpsFcx26-heroButtons">

              <button
                className="abpsFcx26-primaryBtn"
                onClick={scrollToFacilities}
              >
                Explore Facilities
                <FaArrowRight />
              </button>


              <button
                className="abpsFcx26-secondaryBtn"
                onClick={() => navigate("/contact")}
              >
                Visit Our Campus
              </button>

            </div>


            <div className="abpsFcx26-heroMiniTrust">

              <div>
                <FaCheckCircle />
                <span>Modern Learning</span>
              </div>

              <div>
                <FaShieldAlt />
                <span>Safe Campus</span>
              </div>

              <div>
                <FaUsers />
                <span>Student Focused</span>
              </div>

            </div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="abpsFcx26-heroVisual">

            <div className="abpsFcx26-heroImageBox">

              <img
                src={heroImage}
                alt="AB Public School modern campus"
              />

            </div>


            <div className="abpsFcx26-heroBadge">

              <span>
                <FaSchool />
              </span>

              <small>
                CAMPUS
              </small>

              <strong>
                Designed
              </strong>

              <b>
                For Growth
              </b>

            </div>


            <div className="abpsFcx26-floatingCard">

              <FaGraduationCap />

              <div>
                <small>
                  LEARNING ENVIRONMENT
                </small>

                <strong>
                  Modern • Safe • Inspiring
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* QUICK STRIP */}

        <div className="abpsFcx26-quickStrip">

          <div className="abpsFcx26-container abpsFcx26-quickGrid">

            <article>

              <span>
                <FaBookOpen />
              </span>

              <div>
                <strong>
                  Smart Learning
                </strong>

                <p>
                  Modern classrooms and technology
                </p>
              </div>

            </article>


            <article>

              <span>
                <FaSchool />
              </span>

              <div>
                <strong>
                  Modern Infrastructure
                </strong>

                <p>
                  Spacious and thoughtfully designed campus
                </p>
              </div>

            </article>


            <article>

              <span>
                <FaShieldAlt />
              </span>

              <div>
                <strong>
                  Safe & Secure
                </strong>

                <p>
                  Student safety remains our priority
                </p>
              </div>

            </article>


            <article>

              <span>
                <FaUsers />
              </span>

              <div>
                <strong>
                  Student Focused
                </strong>

                <p>
                  Spaces supporting holistic growth
                </p>
              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN FACILITIES
      ===================================================== */}

      <section
        className="abpsFcx26-learningSection"
        id="abpsFcx26MainFacilities"
      >

        <div className="abpsFcx26-container">

          <header className="abpsFcx26-sectionHeader">

            <div className="abpsFcx26-label">
              <span></span>
              LEARNING SPACES
            </div>


            <h2>
              Everything Students Need
              <strong>
                To Thrive.
              </strong>
            </h2>


            <p>
              From smart classrooms to laboratories, libraries and
              creative spaces, every facility supports meaningful
              learning and confident growth.
            </p>

          </header>


          <div className="abpsFcx26-learningLayout">

            {/* FEATURED CARD */}

            <article className="abpsFcx26-featuredLearning">

              <div className="abpsFcx26-featuredImage">

                <img
                  src={classroomImage}
                  alt="Smart classroom"
                />

              </div>


              <div className="abpsFcx26-featuredBody">

                <span className="abpsFcx26-featuredIcon">
                  <FaBookOpen />
                </span>


                <div>

                  <small>
                    INTERACTIVE LEARNING
                  </small>

                  <h3>
                    Smart Classrooms
                  </h3>

                  <p>
                    Technology-enabled classrooms create an engaging
                    environment where students can understand concepts
                    clearly and participate actively.
                  </p>

                </div>

              </div>

            </article>


            {/* OTHER LEARNING FACILITIES */}

            <div className="abpsFcx26-learningCards">

              {learningFacilities.map((item) => {

                const Icon = item.icon;

                return (
                  <article
                    className="abpsFcx26-learningCard"
                    key={item.id}
                  >

                    <div className="abpsFcx26-learningCardImage">

                      <img
                        src={item.image}
                        alt={item.title}
                      />

                    </div>


                    <div className="abpsFcx26-learningCardBody">

                      <span>
                        <Icon />
                      </span>


                      <div>

                        <small>
                          {item.text}
                        </small>

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </article>
                );

              })}

            </div>

          </div>


          {/* CREATIVE ROW */}

          <div className="abpsFcx26-creativeGrid">

            {creativeFacilities.map((item) => {

              const Icon = item.icon;

              return (
                <article
                  className="abpsFcx26-creativeCard"
                  key={item.id}
                >

                  <span>
                    <Icon />
                  </span>


                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                </article>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          SPORTS & WELLNESS
      ===================================================== */}

      <section className="abpsFcx26-sportsSection">

        <div className="abpsFcx26-container">

          <header className="abpsFcx26-sectionHeader">

            <div className="abpsFcx26-label">
              <span></span>
              SPORTS & WELLNESS
            </div>


            <h2>
              Built For Energy.
              <strong>
                Designed For Growth.
              </strong>
            </h2>


            <p>
              Dedicated sports facilities encourage fitness,
              discipline, teamwork, confidence and a healthy
              lifestyle beyond the classroom.
            </p>

          </header>


          <div className="abpsFcx26-sportBenefitGrid">

            <article>
              <FaRunning />
              <strong>Physical Fitness</strong>
              <p>Build strength, stamina and healthy habits.</p>
            </article>

            <article>
              <FaHeart />
              <strong>Healthy Lifestyle</strong>
              <p>Encouraging active and balanced routines.</p>
            </article>

            <article>
              <FaUsers />
              <strong>Teamwork</strong>
              <p>Learn cooperation, trust and team spirit.</p>
            </article>

            <article>
              <FaTrophy />
              <strong>Competitive Spirit</strong>
              <p>Learn discipline and confidence through sport.</p>
            </article>

          </div>


          <div className="abpsFcx26-sportsGrid">

            {sportsFacilities.map((sport) => {

              const Icon = sport.icon;

              return (
                <article
                  className="abpsFcx26-sportCard"
                  key={sport.id}
                >

                  <div className="abpsFcx26-sportImage">

                    <img
                      src={sport.image}
                      alt={sport.title}
                    />

                  </div>


                  <div className="abpsFcx26-sportCardBody">

                    <span>
                      <Icon />
                    </span>

                    <strong>
                      {sport.title}
                    </strong>

                  </div>

                </article>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          SAFETY
      ===================================================== */}

      <section className="abpsFcx26-safetySection">

        <div className="abpsFcx26-container">

          <header className="abpsFcx26-sectionHeader">

            <div className="abpsFcx26-label">
              <span></span>
              SAFE & SECURE CAMPUS
            </div>


            <h2>
              Because Their
              <strong>
                Safety Matters.
              </strong>
            </h2>


            <p>
              A secure, supportive and well-managed campus ensures
              the safety, comfort and well-being of every student
              throughout the school day.
            </p>

          </header>


          <div className="abpsFcx26-safetyLayout">

            <div className="abpsFcx26-safetyGrid">

              {safetyItems.map((item) => {

                const Icon = item.icon;

                return (
                  <article
                    className="abpsFcx26-safetyCard"
                    key={item.id}
                  >

                    <span>
                      <Icon />
                    </span>

                    <strong>
                      {item.title}
                    </strong>

                    <p>
                      {item.text}
                    </p>

                  </article>
                );

              })}

            </div>


            <div className="abpsFcx26-safetyVisual">

              <img
                src={safetyImage}
                alt="Safe and secure AB Public School campus"
              />


              <div>

                <span>
                  <FaShieldAlt />
                </span>

                <div>
                  <small>
                    STUDENT WELL-BEING
                  </small>

                  <strong>
                    A Safe Campus Every Day
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="abpsFcx26-gallerySection">

        <div className="abpsFcx26-container">

          <header className="abpsFcx26-sectionHeader">

            <div className="abpsFcx26-label">
              <span></span>
              FACILITIES GALLERY
            </div>


            <h2>
              A Campus Full
              <strong>
                Of Possibilities.
              </strong>
            </h2>


            <p>
              Take a glimpse at our modern infrastructure,
              learning spaces and vibrant campus environment.
            </p>


            <button
              className="abpsFcx26-primaryBtn"
              onClick={() => navigate("/gallery")}
            >
              View More Photos
              <FaArrowRight />
            </button>

          </header>


          <div className="abpsFcx26-galleryGrid">

            {galleryImages.map((image, index) => (

              <article
                className="abpsFcx26-galleryItem"
                key={index}
              >

                <img
                  src={image}
                  alt={`AB Public School facility ${index + 1}`}
                />

                <span>
                  <FaCamera />
                </span>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="abpsFcx26-finalSection">

        <div className="abpsFcx26-container abpsFcx26-finalLayout">

          <div className="abpsFcx26-finalContent">

            <div className="abpsFcx26-label">
              <span></span>
              EXPERIENCE OUR CAMPUS
            </div>


            <h2>
              See Where Learning
              <strong>
                Comes Alive.
              </strong>
            </h2>


            <p>
              Explore a campus designed for learning, creativity,
              sports and personal growth. We would love to show
              you around.
            </p>


            <div className="abpsFcx26-finalButtons">

              <button
                className="abpsFcx26-primaryBtn"
                onClick={() => navigate("/contact")}
              >
                Schedule a Visit
                <FaArrowRight />
              </button>


              <button
                className="abpsFcx26-secondaryBtn"
                onClick={() => navigate("/contact")}
              >
                Contact School
              </button>

            </div>

          </div>


          <div className="abpsFcx26-finalImage">

            <img
              src={ctaImage}
              alt="AB Public School campus"
            />

          </div>

        </div>

      </section>

    </main>
  );
};

export default Facilities;