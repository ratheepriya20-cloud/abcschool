import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaMapMarkerAlt,
  FaFlask,
  FaLandmark,
  FaLeaf,
  FaIndustry,
  FaBinoculars,
  FaSearch,
  FaLightbulb,
  FaGraduationCap,
  FaUserShield,
  FaClipboardCheck,
  FaBusAlt,
  FaPhoneAlt,
  FaCamera,
  FaImages,
} from "react-icons/fa";

import "./EducationalTrips.css";

/* =========================
   IMAGES
========================= */

import heroImage from "../assets/trip-hero.jpg";

import learningMain from "../assets/trip-learning-main.jpg";
import learningSmall1 from "../assets/trip-learning-small-1.jpg";
import learningSmall2 from "../assets/trip-learning-small-2.jpg";

import scienceImage from "../assets/science-trips.jpg";
import historyImage from "../assets/historical-trips.jpg";
import natureImage from "../assets/nature-trips.jpg";
import industrialImage from "../assets/industrial-trips.jpg";

import safetyImage from "../assets/trip-safety.jpg";

import gallery1 from "../assets/trip-gallery-1.jpg";
import gallery2 from "../assets/trip-gallery-2.jpg";
import gallery3 from "../assets/trip-gallery-3.jpg";
import gallery4 from "../assets/trip-gallery-1.jpg";
import gallery5 from "../assets/trip-gallery-2.jpg";
import gallery6 from "../assets/trip-gallery-3.jpg";

import ctaImage from "../assets/trip-cta.jpg";


const destinations = [
  {
    id: "01",
    icon: FaFlask,
    title: "Science & Discovery",
    text: "Museums • Science Centres",
    small: "Experiments • Innovation",
    image: scienceImage,
  },
  {
    id: "02",
    icon: FaLandmark,
    title: "History & Heritage",
    text: "Monuments • Historical Sites",
    small: "Culture • Ancient Civilizations",
    image: historyImage,
  },
  {
    id: "03",
    icon: FaLeaf,
    title: "Nature & Environment",
    text: "Parks • Wildlife Sanctuaries",
    small: "Nature Centres • Sustainability",
    image: natureImage,
  },
  {
    id: "04",
    icon: FaIndustry,
    title: "Industrial Visits",
    text: "Factories • Production Units",
    small: "Real World Learning • Career Insights",
    image: industrialImage,
  },
];


const journeySteps = [
  {
    id: "01",
    icon: FaBinoculars,
    title: "Explore",
    text: "Step into new places and environments.",
  },
  {
    id: "02",
    icon: FaSearch,
    title: "Observe",
    text: "Understand, explore and ask questions.",
  },
  {
    id: "03",
    icon: FaLightbulb,
    title: "Discover",
    text: "Connect classroom learning with real life.",
  },
  {
    id: "04",
    icon: FaGraduationCap,
    title: "Learn",
    text: "Grow with knowledge and new perspectives.",
  },
];


const EducationalTrips = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="abtrip-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abtrip-hero">

        <img
          src={heroImage}
          alt="AB Public School educational trip"
          className="abtrip-hero-bg"
        />

        <div className="abtrip-hero-overlay" />

        <div className="abtrip-container abtrip-hero-inner">

          <div className="abtrip-hero-content">

            <span className="abtrip-label abtrip-label-light">
              EDUCATIONAL TRIPS
            </span>

            <h1>
              Explore. Experience.
              <span>Learn.</span>
            </h1>

            <p>
              Learning becomes more meaningful when students
              experience the world beyond textbooks and discover
              knowledge through real-life experiences.
            </p>

            <div className="abtrip-hero-actions">

              <button
                className="abtrip-btn abtrip-btn-gold"
                onClick={() =>
                  scrollToSection("tripDestinations")
                }
              >
                Explore Trips
                <FaArrowRight />
              </button>

              <button
                className="abtrip-btn abtrip-btn-outline"
                onClick={() =>
                  scrollToSection("tripJourney")
                }
              >
                Plan Your Journey
              </button>

            </div>


            <div className="abtrip-hero-points">

              <article>
                <span>
                  <FaBinoculars />
                </span>

                <div>
                  <strong>Explore</strong>
                  <small>New Places</small>
                </div>
              </article>


              <article>
                <span>
                  <FaBookOpen />
                </span>

                <div>
                  <strong>Discover</strong>
                  <small>New Perspectives</small>
                </div>
              </article>


              <article>
                <span>
                  <FaUsers />
                </span>

                <div>
                  <strong>Experience</strong>
                  <small>Real World Learning</small>
                </div>
              </article>

            </div>

          </div>

        </div>


        <div className="abtrip-hero-wave" />

      </section>


      {/* =====================================================
          LEARNING BEYOND BOUNDARIES
      ===================================================== */}

      <section className="abtrip-learning">

        <div className="abtrip-container abtrip-learning-grid">

          {/* IMAGE COLLAGE */}

          <div className="abtrip-learning-visual">

            <div className="abtrip-learning-main">
              <img
                src={learningMain}
                alt="Students exploring educational destination"
              />
            </div>


            <div className="abtrip-learning-small abtrip-small-one">
              <img
                src={learningSmall1}
                alt="Students learning during trip"
              />
            </div>


            <div className="abtrip-learning-small abtrip-small-two">
              <img
                src={learningSmall2}
                alt="School educational visit"
              />
            </div>


            <div className="abtrip-paper-plane">
              ✈
            </div>

            <div className="abtrip-dotted-path" />

          </div>


          {/* CONTENT */}

          <div className="abtrip-learning-content">

            <span className="abtrip-label">
              THE WORLD IS OUR CLASSROOM
            </span>

            <h2>
              Learning Beyond
              <span>Boundaries.</span>
            </h2>

            <p>
              Our educational trips give students opportunities
              to explore new places, understand different
              cultures, experience real-world learning and
              develop a broader perspective of life.
            </p>


            <div className="abtrip-learning-cards">

              <article>
                <span>
                  <FaGraduationCap />
                </span>

                <strong>
                  Real World
                  <br />
                  Learning
                </strong>
              </article>


              <article>
                <span>
                  <FaUsers />
                </span>

                <strong>
                  Cultural
                  <br />
                  Awareness
                </strong>
              </article>


              <article>
                <span>
                  <FaMapMarkerAlt />
                </span>

                <strong>
                  Memorable
                  <br />
                  Experiences
                </strong>
              </article>

            </div>


            <div className="abtrip-learning-stats">

              <div>
                <FaMapMarkerAlt />

                <strong>25+</strong>

                <span>Learning Visits</span>
              </div>


              <div>
                <FaLandmark />

                <strong>10+</strong>

                <span>Destinations</span>
              </div>


              <div>
                <FaUsers />

                <strong>100%</strong>

                <span>Guided & Safe</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DESTINATIONS
      ===================================================== */}

      <section
        className="abtrip-destinations"
        id="tripDestinations"
      >

        <div className="abtrip-container">

          <div className="abtrip-section-heading">

            <span className="abtrip-label">
              PLACES THAT INSPIRE LEARNING
            </span>

            <h2>
              Educational
              <span> Destinations.</span>
            </h2>

            <p>
              Every destination is carefully selected to make
              learning exciting, practical and memorable.
            </p>

          </div>


          <div className="abtrip-destination-grid">

            {destinations.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="abtrip-destination-card"
                  key={item.id}
                >

                  <div className="abtrip-destination-image">

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <span className="abtrip-destination-number">
                      {item.id}
                    </span>

                    <span className="abtrip-destination-icon">
                      <Icon />
                    </span>

                  </div>


                  <div className="abtrip-destination-content">

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                    <small>
                      {item.small}
                    </small>

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

      <section
        className="abtrip-journey"
        id="tripJourney"
      >

        <div className="abtrip-container">

          <div className="abtrip-section-heading">

            <span className="abtrip-label">
              EVERY TRIP HAS A PURPOSE
            </span>

            <h2>
              From Curiosity To
              <span> Real World Knowledge.</span>
            </h2>

          </div>


          <div className="abtrip-journey-track">

            <div className="abtrip-route-line" />

            {journeySteps.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="abtrip-journey-item"
                  key={item.id}
                >

                  <span className="abtrip-journey-id">
                    {item.id}
                  </span>

                  <div className="abtrip-journey-icon">
                    <Icon />
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          SAFETY
      ===================================================== */}

      <section className="abtrip-safety">

        <div className="abtrip-container abtrip-safety-grid">

          <div className="abtrip-safety-content">

            <span className="abtrip-label abtrip-label-light">
              SAFE JOURNEYS. MEANINGFUL EXPERIENCES.
            </span>

            <h2>
              Student Safety
              <span>Comes First.</span>
            </h2>

            <p>
              Our educational trips are carefully planned with
              proper supervision, verified destinations and
              well-organized logistics to ensure a safe,
              enriching and memorable experience for every
              student.
            </p>


            <div className="abtrip-safety-points">

              <article>
                <span>
                  <FaUserShield />
                </span>

                <strong>
                  Teacher
                  <br />
                  Supervision
                </strong>
              </article>


              <article>
                <span>
                  <FaClipboardCheck />
                </span>

                <strong>
                  Planned
                  <br />
                  Itineraries
                </strong>
              </article>


              <article>
                <span>
                  <FaBusAlt />
                </span>

                <strong>
                  Safe
                  <br />
                  Transportation
                </strong>
              </article>


              <article>
                <span>
                  <FaPhoneAlt />
                </span>

                <strong>
                  Parent
                  <br />
                  Communication
                </strong>
              </article>

            </div>

          </div>


          <div className="abtrip-safety-visual">

            <img
              src={safetyImage}
              alt="Students boarding school educational trip bus"
            />

            <div className="abtrip-safety-badge">

              <FaUserShield />

              <strong>
                STUDENT
              </strong>

              <span>
                SAFETY FIRST
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="abtrip-gallery">

        <div className="abtrip-container">

          <div className="abtrip-gallery-header">

            <div>

              <span className="abtrip-label">
                TRIP MEMORIES
              </span>

              <h2>
                Moments That
                <span> Inspire.</span>
              </h2>

            </div>


            <button
              onClick={() => navigate("/gallery")}
              className="abtrip-gallery-btn"
            >
              Explore More Photos
              <FaArrowRight />
            </button>

          </div>


          <div className="abtrip-gallery-grid">

            <div className="abtrip-gallery-item gallery-large">

              <img
                src={gallery1}
                alt="Educational trip memory"
              />

              <div className="abtrip-gallery-overlay">
                <FaCamera />
                <span>Explore & Discover</span>
              </div>

            </div>


            <div className="abtrip-gallery-item">

              <img
                src={gallery2}
                alt="Students educational trip"
              />

              <div className="abtrip-gallery-overlay">
                <FaCamera />
                <span>Learn Together</span>
              </div>

            </div>


            <div className="abtrip-gallery-item">

              <img
                src={gallery3}
                alt="Students nature visit"
              />

              <div className="abtrip-gallery-overlay">
                <FaCamera />
                <span>New Experiences</span>
              </div>

            </div>


            <div className="abtrip-gallery-item">

              <img
                src={gallery4}
                alt="School heritage trip"
              />

              <div className="abtrip-gallery-overlay">
                <FaCamera />
                <span>Discover History</span>
              </div>

            </div>


            <div className="abtrip-gallery-item">

              <img
                src={gallery5}
                alt="Educational school visit"
              />

              <div className="abtrip-gallery-overlay">
                <FaCamera />
                <span>Explore More</span>
              </div>

            </div>


        

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="abtrip-cta">

        <img
          src={ctaImage}
          alt="Students exploring mountains during educational trip"
          className="abtrip-cta-bg"
        />

        <div className="abtrip-cta-overlay" />


        <div className="abtrip-container abtrip-cta-inner">

          <div className="abtrip-cta-content">

            <span className="abtrip-label">
              LEARNING HAS NO BOUNDARIES
            </span>

            <h2>
              Let Their Curiosity
              <span>Lead The Way.</span>
            </h2>

            <p>
              Give your child opportunities to discover,
              experience and learn beyond the classroom.
            </p>


            <div className="abtrip-cta-actions">

              <button
                className="abtrip-btn abtrip-btn-gold"
                onClick={() => navigate("/apply")}
              >
                Apply For Admission
                <FaArrowRight />
              </button>


              <button
                className="abtrip-btn abtrip-btn-white"
                onClick={() => navigate("/contact")}
              >
                Contact School
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default EducationalTrips;