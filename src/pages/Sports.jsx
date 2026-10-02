import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaTrophy,
  FaUsers,
  FaStar,
  FaChartLine,
  FaFutbol,
  FaBasketballBall,
  FaRunning,
  FaTableTennis,
  FaHeartbeat,
  FaMedal,
  FaImage,
  FaGraduationCap,
  FaPlay,
} from "react-icons/fa";

import "./Sports.css";

/* =========================================================
   FACILITY IMAGES
========================================================= */

import footballImg from "../assets/facility-football.jpg";
import cricketImg from "../assets/facility-cricket.jpg";
import basketballImg from "../assets/facility-basketball.jpg";
import badmintonImg from "../assets/facility-badminton.jpg";
import athleticsImg from "../assets/facility-atheletic.jpg";
import indoorImg from "../assets/sports-indoor.jpg";

/* ACHIEVEMENT */

import achievementImg from "../assets/sports-achievement.jpg";

/* GALLERY */

import gallery1 from "../assets/sports-gallery-1.jpg";
import gallery2 from "../assets/sports-gallery-2.jpg";
import gallery3 from "../assets/sports-gallery-3.jpg";
import gallery4 from "../assets/sports-gallery-4.jpg";
import gallery5 from "../assets/facility-badminton.jpg";
import gallery6 from "../assets/sports-indoor.jpg";

/* HERO + CTA */

import studentImg from "../assets/sports-student.jpg";
import teamCtaImg from "../assets/sports-team-cta.jpg";


/* =========================================================
   FACILITIES DATA
========================================================= */

const sportsFacilities = [
  {
    id: 1,
    title: "Football",
    text: "Builds teamwork, stamina and confidence.",
    image: footballImg,
    icon: <FaFutbol />,
    theme: "football",
  },
  {
    id: 2,
    title: "Cricket",
    text: "Develops focus, technique and strategy.",
    image: cricketImg,
    icon: <FaTrophy />,
    theme: "cricket",
  },
  {
    id: 3,
    title: "Basketball",
    text: "Enhances agility, coordination and team spirit.",
    image: basketballImg,
    icon: <FaBasketballBall />,
    theme: "basketball",
  },
  {
    id: 4,
    title: "Badminton",
    text: "Improves reflexes, speed and concentration.",
    image: badmintonImg,
    icon: <FaTableTennis />,
    theme: "badminton",
  },
  {
    id: 5,
    title: "Athletics",
    text: "Builds endurance, discipline and self-motivation.",
    image: athleticsImg,
    icon: <FaRunning />,
    theme: "athletics",
  },
  {
    id: 6,
    title: "Indoor Games",
    text: "Encourages focus, precision and mental sharpness.",
    image: indoorImg,
    icon: <FaTableTennis />,
    theme: "indoor",
  },
];


/* =========================================================
   WHY SPORTS DATA
========================================================= */

const sportsBenefits = [
  {
    id: "01",
    title: "Physical Fitness",
    text: "Stronger bodies for brighter futures.",
    icon: <FaHeartbeat />,
    theme: "fitness",
  },
  {
    id: "02",
    title: "Teamwork",
    text: "Learning to work together and support each other.",
    icon: <FaUsers />,
    theme: "teamwork",
  },
  {
    id: "03",
    title: "Discipline",
    text: "Building consistent habits and focus.",
    icon: <FaMedal />,
    theme: "discipline",
  },
  {
    id: "04",
    title: "Confidence",
    text: "Believing in oneself and taking on new challenges.",
    icon: <FaStar />,
    theme: "confidence",
  },
];


/* =========================================================
   GALLERY DATA
========================================================= */

const galleryItems = [
  {
    id: 1,
    image: gallery1,
    title: "Football",
  },
  {
    id: 2,
    image: gallery2,
    title: "Cricket",
  },
  {
    id: 3,
    image: gallery3,
    title: "Basketball",
  },
  {
    id: 4,
    image: gallery4,
    title: "Athletics",
  },
  {
    id: 5,
    image: gallery5,
    title: "Badminton",
  },
  {
    id: 6,
    image: gallery6,
    title: "Indoor Games",
  },
];


const Sports = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="abpsSportXPage">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abpsSportXHero">

        <span className="abpsSportXHeroCircle abpsSportXHeroCircleOne"></span>
        <span className="abpsSportXHeroCircle abpsSportXHeroCircleTwo"></span>

        <div className="abpsSportXHeroDots abpsSportXHeroDotsOne"></div>
        <div className="abpsSportXHeroDots abpsSportXHeroDotsTwo"></div>

        <div className="abpsSportXHeroShell">

          {/* LEFT */}

          <div className="abpsSportXHeroContent">

            <div className="abpsSportXBreadcrumb">

              <button onClick={() => navigate("/")}>
                Home
              </button>

              <span>›</span>

              <button onClick={() => navigate("/campus-life")}>
                Campus Life
              </button>

              <span>›</span>

              <strong>
                Sports
              </strong>

            </div>


            <div className="abpsSportXEyebrow">
              <i></i>
              SPORTS AT AB PUBLIC SCHOOL
            </div>


            <h1>
              Play Today.
              <span>
                Grow Stronger
              </span>
              <strong>
                Tomorrow.
              </strong>
            </h1>


            <p>
              At AB Public School, sports build confidence,
              discipline and teamwork. We encourage every student
              to stay active, explore their potential and develop
              skills for life.
            </p>


            <div className="abpsSportXHeroButtons">

              <button
                className="abpsSportXGoldBtn"
                onClick={() =>
                  scrollToSection("abpsSportXFacilities")
                }
              >
                Explore Our Facilities
                <FaArrowRight />
              </button>


              <button
                className="abpsSportXLightBtn"
                onClick={() =>
                  scrollToSection("abpsSportXGallery")
                }
              >
                View Gallery

                <span>
                  <FaPlay />
                </span>
              </button>

            </div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="abpsSportXHeroVisual">

            <div className="abpsSportXHeroImageFrame">

              <img
                src={studentImg}
                alt="AB Public School sports student"
              />

              <div className="abpsSportXHeroImageShade"></div>

            </div>


            


            <div className="abpsSportXHeroHighlights">

              <div>
                <FaTrophy />
                <span>
                  <strong>Discipline</strong>
                  In Action
                </span>
              </div>

              <div>
                <FaUsers />
                <span>
                  <strong>Stronger</strong>
                  Together
                </span>
              </div>

              <div>
                <FaChartLine />
                <span>
                  <strong>Healthier</strong>
                  Happier Lives
                </span>
              </div>

              <div>
                <FaStar />
                <span>
                  <strong>Champions</strong>
                  Beyond The Game
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="abpsSportXHeroWave abpsSportXHeroWaveOne"></div>
        <div className="abpsSportXHeroWave abpsSportXHeroWaveTwo"></div>

      </section>


      {/* =====================================================
          FACILITIES
      ===================================================== */}

      <section
        className="abpsSportXFacilities"
        id="abpsSportXFacilities"
      >

        <div className="abpsSportXContainer">

          <header className="abpsSportXSectionHead">

            <div className="abpsSportXSectionLabel">
              <span></span>
              OUR SPORTS FACILITIES
            </div>

            <h2>
              Explore Our Sports Facilities.
            </h2>

            <p>
              Modern infrastructure, professional guidance and
              a safe environment help every student discover
              their potential.
            </p>

          </header>


          <div className="abpsSportXFacilityGrid">

            {sportsFacilities.map((sport) => (

              <article
                className="abpsSportXFacilityCard"
                key={sport.id}
              >

                <div className="abpsSportXFacilityImage">

                  <img
                    src={sport.image}
                    alt={sport.title}
                  />

                </div>


                <div className="abpsSportXFacilityBody">

                  <span
                    className={`abpsSportXFacilityIcon ${sport.theme}`}
                  >
                    {sport.icon}
                  </span>

                  <h3>
                    {sport.title}
                  </h3>

                  <p>
                    {sport.text}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY SPORTS
      ===================================================== */}

      <section className="abpsSportXWhy">

        <div className="abpsSportXContainer">

          <div className="abpsSportXWhyHeading">

            <div className="abpsSportXSectionLabel abpsSportXLeftLabel">
              <span></span>
              WHY SPORTS MATTER
            </div>

            <h2>
              Beyond The Game.
              <strong>
                Skills For Life.
              </strong>
            </h2>

            <p>
              Sports help students develop important life skills
              that contribute to their overall growth, both on
              and off the field.
            </p>

          </div>


          <div className="abpsSportXBenefitGrid">

            {sportsBenefits.map((benefit) => (

              <article
                className={`abpsSportXBenefitCard ${benefit.theme}`}
                key={benefit.id}
              >

                <span className="abpsSportXBenefitIcon">
                  {benefit.icon}
                </span>

                <strong className="abpsSportXBenefitNumber">
                  {benefit.id}
                </strong>

                <h3>
                  {benefit.title}
                </h3>

                <p>
                  {benefit.text}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      <section
        className="abpsSportXAchievement"
        id="abpsSportXAchievement"
      >

        <div className="abpsSportXContainer">

          <div className="abpsSportXAchievementGrid">

            {/* CONTENT */}

            <div className="abpsSportXAchievementContent">

              <div className="abpsSportXDarkLabel">
                <span></span>
                OUR ACHIEVEMENTS
              </div>

              <h2>
                Effort Today.
                <strong>
                  Achievement Tomorrow.
                </strong>
              </h2>

              <p>
                Our students have brought pride to the school
                through their outstanding performances at
                inter-school, district and state-level competitions.
              </p>


              <div className="abpsSportXAchievementStats">

                <div>
                  <FaTrophy />

                  <strong>
                    50+
                  </strong>

                  <span>
                    Awards Won
                  </span>
                </div>


                <div>
                  <FaUsers />

                  <strong>
                    200+
                  </strong>

                  <span>
                    Students Participated
                  </span>
                </div>


                <div>
                  <FaMedal />

                  <strong>
                    10+
                  </strong>

                  <span>
                    Inter-School Events
                  </span>
                </div>

              </div>

            </div>


            {/* IMAGE */}

            <div className="abpsSportXAchievementVisual">

              <div className="abpsSportXAchievementRing"></div>

              <div className="abpsSportXAchievementImage">

                <img
                  src={achievementImg}
                  alt="AB Public School sports achievement"
                />

              </div>


              <div className="abpsSportXChampionText">
                Champions
                <span>Are Built</span>
                Here
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section
        className="abpsSportXGallery"
        id="abpsSportXGallery"
      >

        <div className="abpsSportXContainer">

          <header className="abpsSportXGalleryHead">

            <div>

              <div className="abpsSportXSectionLabel abpsSportXLeftLabel">
                <span></span>
                SPORTS GALLERY
              </div>

              <h2>
                Moments Of Energy.
                <strong>
                  Spirit. Success.
                </strong>
              </h2>

              <p>
                A glimpse into the energy, teamwork and excitement
                that define sports at our school.
              </p>

            </div>


            <button
              onClick={() => navigate("/gallery")}
            >
              View Full Gallery
              <FaArrowRight />
            </button>

          </header>


          <div className="abpsSportXGalleryGrid">

            {galleryItems.map((item) => (

              <article
                className="abpsSportXGalleryCard"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div>
                  <strong>
                    {item.title}
                  </strong>
                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="abpsSportXFinal">

        <img
          src={teamCtaImg}
          alt="AB Public School sports team"
        />

        <div className="abpsSportXFinalOverlay"></div>

        <div className="abpsSportXFinalCurve"></div>


        <div className="abpsSportXContainer">

          <div className="abpsSportXFinalContent">

            <div className="abpsSportXDarkLabel">
              <span></span>
              JOIN OUR SPORTS COMMUNITY
            </div>

            <h2>
              Be A Part Of A
              <strong>
                Healthier, Happier
              </strong>
              And Stronger Tomorrow.
            </h2>

            <p>
              At AB Public School, we believe in the power of sports
              to shape confident, disciplined and well-rounded
              individuals.
            </p>


            <div className="abpsSportXFinalButtons">

              <button
                className="abpsSportXGoldBtn"
                onClick={() => navigate("/contact")}
              >
                Get In Touch
                <FaArrowRight />
              </button>


              <button
                className="abpsSportXFinalOutline"
                onClick={() => navigate("/apply")}
              >
                Apply Now
                <FaGraduationCap />
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Sports;