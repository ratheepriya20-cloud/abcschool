import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaCompass,
  FaStar,
  FaUsers,
  FaGraduationCap,
  FaCheckCircle,
  FaImages,
} from "react-icons/fa";

import { campusLifeItems } from "../data/campusLifeData";

import "./CampusLife.css";

import campusImage from "../assets/student-activity.jpg";


const CampusLife = () => {
  const navigate = useNavigate();

  const scrollToExplore = () => {
    document
      .getElementById("abpsCampusVista27Explore")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="abpsCampusVista27-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abpsCampusVista27-hero">

        <div className="abpsCampusVista27-container abpsCampusVista27-heroGrid">

          {/* LEFT */}

          <div className="abpsCampusVista27-heroContent">

            <div className="abpsCampusVista27-eyebrow">
              <span>
                <FaCompass />
              </span>

              LIFE AT AB PUBLIC SCHOOL
            </div>


            <h1>
              Discover Life
              <span>Beyond The Classroom.</span>
            </h1>


            <p>
              A vibrant school experience where sports, culture,
              creativity, leadership and meaningful experiences
              help every student discover who they can become.
            </p>


            <div className="abpsCampusVista27-heroActions">

              <button
                className="abpsCampusVista27-mainBtn"
                onClick={scrollToExplore}
              >
                Explore Campus Life
                <FaArrowRight />
              </button>

              <button
                className="abpsCampusVista27-outlineBtn"
                onClick={() => navigate("/gallery")}
              >
                <FaImages />
                View Gallery
              </button>

            </div>


            <div className="abpsCampusVista27-trustRow">

              <div>
                <FaCheckCircle />
                <span>Confidence</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Creativity</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Leadership</span>
              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="abpsCampusVista27-heroVisual">

            <div className="abpsCampusVista27-imageFrame">

              <img
                src={campusImage}
                alt="Campus life at AB Public School"
              />

              <div className="abpsCampusVista27-imageTint"></div>

            </div>


            <div className="abpsCampusVista27-imageNote">

              <span>
                <FaStar />
              </span>

              <div>
                <small>EVERY EXPERIENCE</small>

                <strong>
                  Shapes Confidence
                </strong>
              </div>

            </div>


            <div className="abpsCampusVista27-circleBadge">

              <FaGraduationCap />

              <small>
                LEARN
              </small>

              <strong>
                Explore
              </strong>

              <b>
                Grow
              </b>

            </div>

          </div>

        </div>


        {/* HERO STRIP */}

        <div className="abpsCampusVista27-strip">

          <div className="abpsCampusVista27-container abpsCampusVista27-stripGrid">

            <article>
              <strong>Sports</strong>
              <p>Teamwork, fitness and discipline</p>
            </article>

            <article>
              <strong>Culture</strong>
              <p>Expression, confidence and creativity</p>
            </article>

            <article>
              <strong>Leadership</strong>
              <p>Participation with responsibility</p>
            </article>

            <article>
              <strong>Experiences</strong>
              <p>Learning beyond textbooks</p>
            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          EXPLORE HEADER
      ===================================================== */}

      <section
        className="abpsCampusVista27-exploreHead"
        id="abpsCampusVista27Explore"
      >

        <div className="abpsCampusVista27-container">

          <div className="abpsCampusVista27-headingLayout">

            {/* LEFT */}

            <div className="abpsCampusVista27-headingContent">

              <div className="abpsCampusVista27-smallLabel">
                <span></span>
                EXPLORE CAMPUS LIFE
              </div>

              <h2>
                Experiences That Shape
                <span>Confident Students.</span>
              </h2>

              <p>
                Every experience at AB Public School encourages
                curiosity, teamwork, creativity and confidence.
                Explore the different areas that make school life
                meaningful and memorable.
              </p>

            </div>


            {/* RIGHT BUTTON */}

            <div className="abpsCampusVista27-headingAction">

              <button
                className="abpsCampusVista27-mainBtn"
                onClick={() => navigate("/gallery")}
              >
                Explore Gallery
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CARDS
      ===================================================== */}

      <section className="abpsCampusVista27-cardSection">

        <div className="abpsCampusVista27-container">

          <div className="abpsCampusVista27-cardGrid">

            {campusLifeItems.map((item, index) => {

              const Icon = item.icon;

              return (
                <article
                  className="abpsCampusVista27-card"
                  key={item.id}
                  onClick={() => navigate(item.path)}
                >

                  <div className="abpsCampusVista27-cardTop">

                    <span className="abpsCampusVista27-cardNumber">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="abpsCampusVista27-cardIcon">
                      <Icon />
                    </span>

                  </div>


                  <div className="abpsCampusVista27-cardBody">

                    <small>
                      CAMPUS EXPERIENCE
                    </small>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>


                  <div className="abpsCampusVista27-cardFooter">

                    <span>
                      Discover More
                    </span>

                    <button
                      type="button"
                      aria-label={`Explore ${item.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(item.path);
                      }}
                    >
                      <FaArrowRight />
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CAMPUS LIFE
      ===================================================== */}

      <section className="abpsCampusVista27-growth">

        <div className="abpsCampusVista27-container">

          <div className="abpsCampusVista27-growthGrid">

            <div className="abpsCampusVista27-growthHeading">

              <div className="abpsCampusVista27-smallLabel">
                <span></span>
                GROWING BEYOND ACADEMICS
              </div>

              <h2>
                More Than Activities.
                <span>
                  Experiences For Life.
                </span>
              </h2>

              <p>
                Campus life gives students opportunities to develop
                friendships, confidence, responsibility and interests
                that stay with them far beyond their school years.
              </p>

            </div>


            <div className="abpsCampusVista27-growthCards">

              <article>

                <span>
                  <FaUsers />
                </span>

                <div>
                  <strong>
                    Teamwork
                  </strong>

                  <p>
                    Learning to collaborate, communicate and support others.
                  </p>
                </div>

              </article>


              <article>

                <span>
                  <FaStar />
                </span>

                <div>
                  <strong>
                    Confidence
                  </strong>

                  <p>
                    Opportunities that encourage students to participate.
                  </p>
                </div>

              </article>


              <article>

                <span>
                  <FaGraduationCap />
                </span>

                <div>
                  <strong>
                    Growth
                  </strong>

                  <p>
                    Experiences that help students discover their strengths.
                  </p>
                </div>

              </article>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="abpsCampusVista27-final">

        <div className="abpsCampusVista27-container">

          <div className="abpsCampusVista27-finalPanel">

            <div className="abpsCampusVista27-finalContent">

              <div className="abpsCampusVista27-smallLabel">
                <span></span>
                LIFE • LEARNING • GROWTH
              </div>

              <h2>
                Where Every Experience
                <span>Becomes Part Of Learning.</span>
              </h2>

              <p>
                Discover a school environment where students
                learn, participate, create, explore and grow
                beyond academics.
              </p>

            </div>


            <div className="abpsCampusVista27-finalButton">

              <button
                className="abpsCampusVista27-mainBtn"
                onClick={() => navigate("/gallery")}
              >
                Explore School Gallery
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default CampusLife;