import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutSchool.css";

import schoolCampus from "../assets/school-campus.jpg";
import schoolHero from "../assets/school-hero-3.jpg";
import studentActivity from "../assets/student-activity.jpg";
import studentSports from "../assets/student-sports.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutSchool = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "25+",
      label: "Years of Excellence",
    },
    {
      number: "1500+",
      label: "Happy Students",
    },
    {
      number: "100+",
      label: "Dedicated Teachers",
    },
    {
      number: "98%",
      label: "Board Results",
    },
  ];

  const values = [
    {
      number: "01",
      title: "Excellence",
      text:
        "We encourage every student to aim high, discover their strengths and continuously improve through meaningful learning.",
    },
    {
      number: "02",
      title: "Integrity",
      text:
        "Honesty, responsibility and respect are at the heart of our school culture and guide students in everyday life.",
    },
    {
      number: "03",
      title: "Innovation",
      text:
        "We combine strong academic foundations with creative thinking, technology and practical learning experiences.",
    },
    {
      number: "04",
      title: "Community",
      text:
        "We believe that students thrive when teachers, parents and the wider school community work together.",
    },
  ];

  return (
    <>
    <Navbar />
    <main className="aboutSchoolPage">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="aboutSchoolHero">

        <div className="aboutHeroOverlay"></div>

        <div className="aboutHeroGlow aboutHeroGlowOne"></div>
        <div className="aboutHeroGlow aboutHeroGlowTwo"></div>

        <div className="aboutHeroContent">

          <div className="aboutHeroEyebrow">

            <span className="aboutHeroLine"></span>

            <span>
              ABOUT OUR SCHOOL
            </span>

            <span className="aboutHeroLine aboutHeroLineRight"></span>

          </div>

          <h1>
            Shaping Minds.
            <span>Building Futures.</span>
          </h1>

          <p>
            Discover the story, values and people behind a
            learning community committed to helping every
            student grow with confidence and purpose.
          </p>

          <div className="aboutHeroAccent"></div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="aboutIntro">

        <div className="aboutContainer">

          <div className="aboutIntroGrid">

            {/* IMAGE */}

            <div className="aboutIntroImage">

              <img
                src={schoolCampus}
                alt="Our school campus"
              />

              <div className="aboutImageBadge">

                <strong>
                  25+
                </strong>

                <span>
                  Years of
                  <br />
                  Excellence
                </span>

              </div>

              <div className="aboutImageFrame"></div>

            </div>


            {/* CONTENT */}

            <div className="aboutIntroContent">

              <span className="aboutSectionLabel">
                WELCOME TO OUR SCHOOL
              </span>

              <h2>
                A Place Where
                <span>
                  Every Student Matters.
                </span>
              </h2>

              <p className="aboutLead">
                Our school is more than a place for academic
                learning. It is a welcoming community where
                students are encouraged to explore, question,
                create and discover their own potential.
              </p>

              <p>
                We are committed to creating an environment
                where strong academic foundations go hand in
                hand with character development, creativity,
                sports and meaningful co-curricular experiences.
              </p>

              <p>
                With dedicated educators, supportive families
                and an enriching learning environment, we help
                prepare students not only for examinations,
                but for the opportunities and challenges of
                the future.
              </p>

              <button
                className="aboutPrimaryBtn"
                onClick={() => navigate("/admission")}
              >
                Explore Admissions
                <span>→</span>
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="aboutStats">

        <div className="aboutContainer">

          <div className="aboutStatsGrid">

            {stats.map((item) => (

              <div
                className="aboutStatCard"
                key={item.label}
              >

                <strong>
                  {item.number}
                </strong>

                <span>
                  {item.label}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION / VISION
      ===================================================== */}

      <section className="aboutMission">

        <div className="aboutContainer">

          <div className="aboutSectionHeading">

            <span className="aboutSectionLabel">
              OUR PURPOSE
            </span>

            <h2>
              Learning With
              <span>
                Purpose & Direction.
              </span>
            </h2>

            <p>
              Everything we do is guided by a clear belief:
              education should help students become capable,
              confident and compassionate individuals.
            </p>

          </div>


          <div className="missionGrid">

            {/* MISSION */}

            <article className="missionCard missionCardDark">

              <div className="missionNumber">
                01
              </div>

              <div className="missionContent">

                <span>
                  OUR MISSION
                </span>

                <h3>
                  Empowering Every Learner
                </h3>

                <p>
                  To provide an inclusive and inspiring learning
                  environment where every student can develop
                  knowledge, confidence, creativity and strong
                  values.
                </p>

              </div>

              <div className="missionArrow">
                ↗
              </div>

            </article>


            {/* VISION */}

            <article className="missionCard missionCardLight">

              <div className="missionNumber">
                02
              </div>

              <div className="missionContent">

                <span>
                  OUR VISION
                </span>

                <h3>
                  Preparing Students for Tomorrow
                </h3>

                <p>
                  To nurture responsible, curious and resilient
                  young people who are ready to contribute
                  positively to their communities and the wider
                  world.
                </p>

              </div>

              <div className="missionArrow">
                ↗
              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="aboutWhy">

        <div className="aboutContainer">

          <div className="aboutWhyGrid">

            {/* IMAGE */}

            <div className="aboutWhyVisual">

              <img
                src={studentActivity}
                alt="Students learning together"
              />

              <div className="whyFloatingCard">

                <span>
                  LEARNING
                </span>

                <strong>
                  Beyond
                  <br />
                  Classrooms
                </strong>

                <div>
                  Discover • Create • Grow
                </div>

              </div>

            </div>


            {/* CONTENT */}

            <div className="aboutWhyContent">

              <span className="aboutSectionLabel">
                WHY OUR SCHOOL
              </span>

              <h2>
                More Than
                <span>
                  Just Education.
                </span>
              </h2>

              <p>
                We create opportunities for students to learn
                through experience, collaboration and discovery.
                Our approach focuses on developing the whole
                child.
              </p>


              <div className="whyPoints">

                <div className="whyPoint">

                  <div className="whyIcon">
                    01
                  </div>

                  <div>
                    <h3>
                      Student-Centered Learning
                    </h3>

                    <p>
                      Teaching approaches designed around
                      individual growth, curiosity and confidence.
                    </p>
                  </div>

                </div>


                <div className="whyPoint">

                  <div className="whyIcon">
                    02
                  </div>

                  <div>
                    <h3>
                      Experienced Educators
                    </h3>

                    <p>
                      Passionate teachers who support students
                      academically and personally.
                    </p>
                  </div>

                </div>


                <div className="whyPoint">

                  <div className="whyIcon">
                    03
                  </div>

                  <div>
                    <h3>
                      Balanced Development
                    </h3>

                    <p>
                      Academics, sports, arts and activities work
                      together to create a complete school experience.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="aboutValues">

        <div className="aboutContainer">

          <div className="aboutValuesHeader">

            <div>

              <span className="aboutSectionLabel">
                WHAT WE BELIEVE
              </span>

              <h2>
                Our Core
                <span>
                  Values.
                </span>
              </h2>

            </div>

          

          </div>


          <div className="valuesGrid">

            {values.map((value) => (

              <article
                className="valueCard"
                key={value.number}
              >

                <div className="valueTop">

                  <span>
                    {value.number}
                  </span>

                  <div>
                    ↗
                  </div>

                </div>

                <h3>
                  {value.title}
                </h3>

                <p>
                  {value.text}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>


     


      {/* =====================================================
          SPORTS / COMMUNITY STRIP
      ===================================================== */}

      <section className="aboutCommunity">

        <div className="aboutContainer">

          <div className="communityGrid">

            <div className="communityContent">

              <span className="aboutSectionLabel">
                LIFE AT OUR SCHOOL
              </span>

              <h2>
                Learn.
                <span>
                  Play. Grow.
                </span>
              </h2>

              <p>
                From sports fields and creative activities to
                celebrations and everyday classroom moments,
                students have countless opportunities to discover
                new interests and build lasting friendships.
              </p>

              <button
                className="aboutOutlineBtn"
                onClick={() => navigate("/gallery")}
              >
                Explore School Gallery
                <span>→</span>
              </button>

            </div>


            <div className="communityImage">

              <img
                src={studentSports}
                alt="Students participating in sports"
              />

              <div className="communityImageLabel">
                <strong>
                  SCHOOL LIFE
                </strong>

                <span>
                  Moments that make us proud.
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="aboutCTA">

        <div className="aboutCTAGlow"></div>

        <div className="aboutContainer">

          <div className="aboutCTAContent">

            <span>
              BEGIN THE JOURNEY
            </span>

            <h2>
              Ready to Discover
              <strong>
                Our School?
              </strong>
            </h2>

            <p>
              Explore our academics, activities and admissions
              to see how your child can become part of our
              growing school community.
            </p>

            <div className="aboutCTAActions">

              <button
                className="aboutCTAPrimary"
                onClick={() => navigate("/admission")}
              >
                Apply Now
                <span>→</span>
              </button>

              <button
                className="aboutCTASecondary"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

    <Footer />
    </>
  );
};

export default AboutSchool;