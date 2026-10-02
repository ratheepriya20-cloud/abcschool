
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaMusic,
  FaTheaterMasks,
  FaPalette,
  FaBookOpen,
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaGlobeAsia,
  FaTrophy,
  FaStar,
  FaAward,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaGraduationCap,
} from "react-icons/fa";

import "./CulturalActivities.css";

import heroImg from "../assets/cultural-hero.jpg";

import musicImg from "../assets/cultural-music.jpg";
import danceImg from "../assets/cultural-dance.jpg";
import dramaImg from "../assets/cultural-drama.jpg";
import artImg from "../assets/cultural-art.jpg";
import literaryImg from "../assets/cultural-literary.jpg";
import clubsImg from "../assets/cultural-club.jpg";

import achievementImg from "../assets/cultural-achievement.jpg";

import gallery1 from "../assets/cultural-gallery-1.jpg";
import gallery2 from "../assets/cultural-dance.jpg";
import gallery3 from "../assets/cultural-art.jpg";
import gallery4 from "../assets/cultural-literary.jpg";
import gallery5 from "../assets/cultural-club.jpg";
import gallery6 from "../assets/cultural-music.jpg";

import teamImg from "../assets/cultural-team-cta.jpg";

const activities = [
  {
    title: "Music",
    image: musicImg,
    icon: FaMusic,
    color: "rose",
    description:
      "Develops rhythm, creativity and self-expression through vocal and instrumental music.",
    details:
      "Students explore singing, instrumental music, rhythm, group performances and opportunities to present their talents.",
  },
  {
    title: "Dance",
    image: danceImg,
    icon: FaStar,
    color: "gold",
    description:
      "Enhances confidence, discipline and appreciation for traditional and modern dance.",
    details:
      "Our dance activities encourage coordination, expression, stage confidence and an appreciation of cultural traditions.",
  },
  {
    title: "Drama",
    image: dramaImg,
    icon: FaTheaterMasks,
    color: "purple",
    description:
      "Builds communication skills, imagination and confidence through theatre.",
    details:
      "Drama encourages students to collaborate, perform, explore storytelling and express ideas through theatre.",
  },
  {
    title: "Art & Craft",
    image: artImg,
    icon: FaPalette,
    color: "mint",
    description:
      "Encourages imagination, originality and hands-on creative thinking.",
    details:
      "From drawing and painting to craft projects, students develop their artistic interests and creative abilities.",
  },
  {
    title: "Literary Activities",
    image: literaryImg,
    icon: FaBookOpen,
    color: "sky",
    description:
      "Improves language skills, public speaking and expressive communication.",
    details:
      "Students participate in reading, storytelling, speeches, debates, creative writing and other literary activities.",
  },
  {
    title: "Cultural Clubs",
    image: clubsImg,
    icon: FaUsers,
    color: "coral",
    description:
      "A platform to explore, collaborate and showcase individual talents.",
    details:
      "Cultural clubs bring students together to plan activities, exchange ideas and celebrate their shared interests.",
  },
];

const benefits = [
  {
    icon: FaLightbulb,
    title: "Creativity",
    text: "Encourages imagination and original thinking.",
    color: "pink",
  },
  {
    icon: FaUsers,
    title: "Confidence",
    text: "Builds self-esteem and public speaking skills.",
    color: "blue",
  },
  {
    icon: FaHandshake,
    title: "Teamwork",
    text: "Promotes collaboration and mutual respect.",
    color: "yellow",
  },
  {
    icon: FaGlobeAsia,
    title: "Cultural Awareness",
    text: "Helps students appreciate diverse traditions and values.",
    color: "green",
  },
];

const gallery = [
  { image: gallery1, title: "Dance Performance" },
  { image: gallery2, title: "Music Practice" },
  { image: gallery3, title: "Drama Performance" },
  { image: gallery4, title: "Creative Art" },
  { image: gallery5, title: "Cultural Celebration" },
  { image: gallery6, title: "Student Talent" },
];

const CulturalActivities = () => {
  const navigate = useNavigate();
  const [activeActivity, setActiveActivity] = useState(null);
  const [activeGallery, setActiveGallery] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const changeGallery = (direction) => {
    setActiveGallery((current) =>
      (current + direction + gallery.length) % gallery.length
    );
  };

  return (
    <main className="abca-page">

      {/* HERO */}
      <section className="abca-hero">
        <div className="abca-hero-decoration decor-one" />
        <div className="abca-hero-decoration decor-two" />

        <div className="abca-container abca-hero-grid">
          <div className="abca-hero-content">
            <nav className="abca-breadcrumb" aria-label="Breadcrumb">
              <button onClick={() => navigate("/")}>Home</button>
              <span>›</span>
              <button onClick={() => navigate("/campus-life")}>
                Activities
              </button>
              <span>›</span>
              <strong>Cultural Activities</strong>
            </nav>

            <span className="abca-eyebrow">
              CULTURAL ACTIVITIES
            </span>

            <h1>
              Where Talent
              <span> Finds Its Stage.</span>
            </h1>

            <p>
              At AB Public School, cultural activities inspire
              creativity, courage and self-expression. We provide
              a vibrant platform where every student can explore
              their talents in music, dance, art, drama and more.
            </p>

            <div className="abca-hero-actions">
              <button
                className="abca-btn abca-btn-gold"
                onClick={() => scrollTo("culturalActivities")}
              >
                Explore Activities <FaArrowRight />
              </button>

              <button
                className="abca-btn abca-btn-outline"
                onClick={() => scrollTo("culturalGallery")}
              >
                <FaImages /> View Gallery
              </button>
            </div>
          </div>

          <div className="abca-hero-visual">
            <div className="abca-hero-art-ring" />
            <div className="abca-hero-image">
              <img
                src={heroImg}
                alt="Student performing a cultural dance"
              />
            </div>
            <div className="abca-hero-quote">
              Every Child
              <span>Has a Talent</span>
            </div>
          </div>
        </div>

        <div className="abca-hero-bottom-wave" />
      </section>

      {/* HIGHLIGHT STRIP */}
      <section className="abca-stats-section">
        <div className="abca-container">
          <div className="abca-stats-bar">
            <div className="abca-stat">
              <FaTheaterMasks />
              <div>
                <strong>06+</strong>
                <span>Creative Disciplines</span>
              </div>
            </div>

            <div className="abca-stat">
              <FaUsers />
              <div>
                <strong>Explore</strong>
                <span>Student Participation</span>
              </div>
            </div>

            <div className="abca-stat">
              <FaStar />
              <div>
                <strong>Express</strong>
                <span>Individual Talent</span>
              </div>
            </div>

            <div className="abca-stat">
              <FaAward />
              <div>
                <strong>Grow</strong>
                <span>With Every Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section
        className="abca-activities abca-section"
        id="culturalActivities"
      >
        <div className="abca-container">
          <div className="abca-section-heading center">
            <span className="abca-eyebrow">
              OUR CULTURAL ACTIVITIES
            </span>
            <h2>
              Discover A World Of <em>Creativity.</em>
            </h2>
            <p>
              From performing arts to visual arts, our diverse
              cultural activities help students explore their
              passions and showcase their unique talents.
            </p>
          </div>

          <div className="abca-activity-grid">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <article
                  className="abca-activity-card"
                  key={activity.title}
                >
                  <div className="abca-activity-image">
                    <img
                      src={activity.image}
                      alt={activity.title}
                    />
                  </div>

                  <div className="abca-activity-body">
                    <span
                      className={`abca-activity-icon ${activity.color}`}
                    >
                      <Icon />
                    </span>

                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>

                    <button
                      className="abca-text-button"
                      onClick={() =>
                        setActiveActivity(activity)
                      }
                    >
                      Learn More <FaArrowRight />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CULTURAL ACTIVITIES */}
      <section className="abca-why abca-section">
        <div className="abca-container abca-why-layout">
          <div className="abca-why-content">
            <span className="abca-eyebrow">
              WHY CULTURAL ACTIVITIES MATTER
            </span>

            <h2>
              More Than Talent.
              <span> Skills For Life.</span>
            </h2>

            <p>
              Cultural activities nurture essential life skills
              that shape confident, creative and compassionate
              individuals. Every performance and creative
              experience is an opportunity to learn and grow.
            </p>

            <button
              className="abca-btn abca-btn-gold"
              onClick={() => scrollTo("culturalHighlights")}
            >
              Discover More <FaArrowRight />
            </button>
          </div>

          <div className="abca-benefit-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className={`abca-benefit ${benefit.color}`}
                  key={benefit.title}
                >
                  <Icon />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENT / HIGHLIGHTS */}
      <section
        className="abca-highlights"
        id="culturalHighlights"
      >
        <div className="abca-container abca-highlights-grid">
          <div className="abca-highlights-content">
            <span className="abca-eyebrow light">
              OUR HIGHLIGHTS
            </span>

            <h2>
              Celebrating Talent.
              <span> Creating Opportunities.</span>
            </h2>

            <p>
              Our students take part in school cultural
              programmes, celebrations and creative activities,
              gaining valuable experiences and opportunities
              to express themselves.
            </p>

            <div className="abca-highlight-points">
              <div>
                <FaTrophy />
                <strong>Perform</strong>
                <span>On Stage</span>
              </div>

              <div>
                <FaUsers />
                <strong>Connect</strong>
                <span>Through Creativity</span>
              </div>

              <div>
                <FaStar />
                <strong>Shine</strong>
                <span>With Confidence</span>
              </div>
            </div>
          </div>

          <div className="abca-highlights-visual">
            <div className="abca-highlight-ring" />
            <img
              src={achievementImg}
              alt="Student participating in a cultural programme"
            />
            <span className="abca-highlight-script">
              Young Voices,
              <br />
              Bright Futures
            </span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        className="abca-gallery abca-section"
        id="culturalGallery"
      >
        <div className="abca-container">
          <div className="abca-gallery-heading">
            <div>
              <span className="abca-eyebrow">
                CULTURAL MOMENTS
              </span>
              <h2>
                Moments That <em>Inspire.</em>
              </h2>
            </div>

            <button
              className="abca-gallery-all"
              onClick={() => navigate("/gallery")}
            >
              View Full Gallery <FaArrowRight />
            </button>
          </div>

          <div className="abca-gallery-grid">
            {gallery.map((item, index) => (
              <button
                className={`abca-gallery-tile tile-${index + 1}`}
                key={item.title}
                onClick={() => setActiveGallery(index)}
                aria-label={`View ${item.title}`}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="abca-cta">
        <img
          className="abca-cta-image"
          src={teamImg}
          alt="Students enjoying cultural activities together"
        />

        <div className="abca-cta-overlay" />

        <div className="abca-container">
          <div className="abca-cta-content">
            <span className="abca-eyebrow light">
              JOIN OUR CULTURAL COMMUNITY
            </span>

            <h2>
              Express. Explore.
              <span> Excel.</span>
            </h2>

            <p>
              Let your child be part of a vibrant cultural
              community that celebrates creativity,
              diversity and excellence.
            </p>

            <div className="abca-cta-actions">
              <button
                className="abca-btn abca-btn-gold"
                onClick={() => navigate("/contact")}
              >
                Contact Our School <FaArrowRight />
              </button>

              <button
                className="abca-btn abca-btn-white-outline"
                onClick={() => navigate("/apply")}
              >
                Apply Now <FaGraduationCap />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITY DETAIL MODAL */}
      {activeActivity && (
        <div
          className="abca-modal-backdrop"
          onClick={() => setActiveActivity(null)}
        >
          <div
            className="abca-modal"
            role="dialog"
            aria-modal="true"
            aria-label={activeActivity.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="abca-modal-close"
              onClick={() => setActiveActivity(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <img
              src={activeActivity.image}
              alt={activeActivity.title}
            />

            <div className="abca-modal-body">
              <span className="abca-eyebrow">
                CULTURAL ACTIVITIES
              </span>
              <h2>{activeActivity.title}</h2>
              <p>{activeActivity.details}</p>
              <button
                className="abca-btn abca-btn-gold"
                onClick={() => {
                  setActiveActivity(null);
                  navigate("/contact");
                }}
              >
                Enquire Now <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX */}
      {activeGallery !== null && (
        <div
          className="abca-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Cultural gallery"
          onClick={() => setActiveGallery(null)}
        >
          <button
            className="abca-lightbox-close"
            onClick={() => setActiveGallery(null)}
            aria-label="Close gallery"
          >
            <FaTimes />
          </button>

          <button
            className="abca-lightbox-arrow"
            onClick={(event) => {
              event.stopPropagation();
              changeGallery(-1);
            }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div
            className="abca-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={gallery[activeGallery].image}
              alt={gallery[activeGallery].title}
            />
            <p>{gallery[activeGallery].title}</p>
          </div>

          <button
            className="abca-lightbox-arrow"
            onClick={(event) => {
              event.stopPropagation();
              changeGallery(1);
            }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </main>
  );
};

export default CulturalActivities;
