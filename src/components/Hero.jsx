import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBookOpen,
  FaGraduationCap,
  FaArrowRight,
  FaUsers,
  FaTrophy,
  FaHeart,
  FaChartLine,
  FaUserGraduate,
  FaBullhorn,
  FaCalendarAlt,
  FaStar,
  FaCrown,
} from "react-icons/fa";

import "./Hero.css";

import heroBg from "../assets/school-hero-bg.png";

import {
  getPageContent,
} from "../data/websiteContentData";

import {
  getWebsiteImage,
} from "../data/websiteImagesData";


const Hero = () => {
  const navigate = useNavigate();


  /* =========================================================
     CMS CONTENT
  ========================================================= */

  const [content, setContent] = useState(() =>
    getPageContent("home")
  );

  const [customHeroImage, setCustomHeroImage] = useState(() =>
    getWebsiteImage("homeHero")
  );


  /* =========================================================
     LIVE CMS UPDATE
  ========================================================= */

  useEffect(() => {
    const refreshWebsiteContent = () => {
      setContent(
        getPageContent("home")
      );

      setCustomHeroImage(
        getWebsiteImage("homeHero")
      );
    };

    window.addEventListener(
      "abpsDataUpdated",
      refreshWebsiteContent
    );

    window.addEventListener(
      "storage",
      refreshWebsiteContent
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refreshWebsiteContent
      );

      window.removeEventListener(
        "storage",
        refreshWebsiteContent
      );
    };
  }, []);


  /* =========================================================
     SCROLL
  ========================================================= */

  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };


  return (
    <section className="abHero">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="abHeroBackground"
        style={{
          backgroundImage: `url(${
            customHeroImage || heroBg
          })`,
        }}
      ></div>


      {/* LEFT WHITE OVERLAY */}

      <div className="abHeroWhiteOverlay"></div>


      {/* NAVY RIGHT SHAPE */}

      <div className="abHeroNavyShape"></div>


      {/* GOLD DECORATIONS */}

      <div className="abHeroGoldCurve abHeroGoldCurveOne"></div>

      <div className="abHeroGoldCurve abHeroGoldCurveTwo"></div>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="abHeroContainer">


        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="abHeroContent">


          {/* SCHOOL LABEL */}

          <div className="abHeroSchoolLabel">

            <span className="abHeroBook">
              <FaBookOpen />
            </span>

            <strong>
              {content.label || "AB PUBLIC SCHOOL"}
            </strong>

            <span className="abHeroLabelLine"></span>

            <small>
              EST. 2001
            </small>

          </div>


          {/* HEADING */}

          <h1>
            Inspiring Young Minds.
            <span>
              Shaping Brighter Futures.
            </span>
          </h1>


          {/* DESCRIPTION */}

          <p className="abHeroDescription">
            {content.description ||
              `A nurturing environment where academic excellence,
              strong values and life skills come together to help
              every child grow with confidence.`}
          </p>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="abHeroActions">

            <button
              type="button"
              className="abHeroPrimaryBtn"
              onClick={() => navigate("/apply")}
            >

              <FaGraduationCap />

              <span>
                {content.buttonText ||
                  "Apply for Admission"}
              </span>

              <b>
                <FaArrowRight />
              </b>

            </button>


            <button
              type="button"
              className="abHeroSecondaryBtn"
              onClick={() => navigate("/about")}
            >

              <span>
                {content.secondaryButtonText ||
                  "Discover ABPS"}
              </span>

              <FaArrowRight />

            </button>

          </div>


          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="abHeroFeatures">


            <div className="abHeroFeature">

              <span>
                <FaBookOpen />
              </span>

              <div>
                <strong>
                  Quality
                </strong>

                <small>
                  Education
                </small>
              </div>

            </div>


            <div className="abHeroFeatureDivider"></div>


            <div className="abHeroFeature">

              <span>
                <FaUsers />
              </span>

              <div>
                <strong>
                  Experienced
                </strong>

                <small>
                  Faculty
                </small>
              </div>

            </div>


            <div className="abHeroFeatureDivider"></div>


            <div className="abHeroFeature">

              <span>
                <FaTrophy />
              </span>

              <div>
                <strong>
                  Holistic
                </strong>

                <small>
                  Development
                </small>
              </div>

            </div>


            <div className="abHeroFeatureDivider"></div>


            <div className="abHeroFeature">

              <span>
                <FaHeart />
              </span>

              <div>
                <strong>
                  Nurturing
                </strong>

                <small>
                  Environment
                </small>
              </div>

            </div>

          </div>


          {/* SIGNATURE */}

          <div className="abHeroSignature">
            <span>
              More Than a School
            </span>

            <strong>
              A Brighter Tomorrow
            </strong>
          </div>

        </div>


        {/* ===================================================
            RIGHT AREA
        =================================================== */}

        <div className="abHeroRight">


          {/* =================================================
              25 YEARS BADGE
          ================================================= */}

          <div className="abHeroYearsBadge">

            <FaCrown />

            <strong>
              25+
            </strong>

            <span>
              YEARS OF
              <br />
              EXCELLENCE
            </span>

          </div>


          {/* =================================================
              ADMISSION CARD
          ================================================= */}

          <div className="abHeroAdmissionCard">


            {/* TOP */}

            <div className="abHeroAdmissionTop">

              <div className="abHeroAdmissionTitle">

                <span>
                  <FaBullhorn />
                </span>

                <div>
                  <small>
                    ADMISSIONS OPEN
                  </small>

                  <strong>
                    2026 – 27
                  </strong>
                </div>

              </div>


              <b className="abHeroOpenBadge">
                OPEN
              </b>

            </div>


            {/* TITLE */}

            <h2>
              Your Child's
              <span>
                Next Chapter
                <br />
                Begins Here.
              </span>
            </h2>


            <p>
              Applications are now open for the
              new academic session.
            </p>


            {/* INFO */}

            <div className="abHeroAdmissionInfo">

              <div>

                <span>
                  <FaUsers />
                </span>

                <div>
                  <small>
                    CLASSES
                  </small>

                  <strong>
                    Nursery – XII
                  </strong>
                </div>

              </div>


              <div>

                <span>
                  <FaCalendarAlt />
                </span>

                <div>
                  <small>
                    SESSION
                  </small>

                  <strong>
                    2026 – 27
                  </strong>
                </div>

              </div>

            </div>


            {/* APPLY */}

            <button
              type="button"
              className="abHeroStartBtn"
              onClick={() => navigate("/apply")}
            >

              <span>
                Start Application
              </span>

              <b>
                <FaArrowRight />
              </b>

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          STATS BAR
      ===================================================== */}

      <div className="abHeroStats">


        <div className="abHeroStat">

          <span className="abHeroStatIcon">
            <FaUsers />
          </span>

          <strong>
            1500+
          </strong>

          <div>
            <b>
              STUDENTS
            </b>

            <small>
              Growing Together
            </small>
          </div>

        </div>


        <div className="abHeroStatDivider"></div>


        <div className="abHeroStat">

          <span className="abHeroStatIcon">
            <FaUserGraduate />
          </span>

          <strong>
            40+
          </strong>

          <div>
            <b>
              TEACHERS
            </b>

            <small>
              Expert Mentors
            </small>
          </div>

        </div>


        <div className="abHeroStatDivider"></div>


        <div className="abHeroStat">

          <span className="abHeroStatIcon">
            <FaChartLine />
          </span>

          <strong>
            98%
          </strong>

          <div>
            <b>
              BOARD RESULTS
            </b>

            <small>
              Academic Excellence
            </small>
          </div>

        </div>


        <div className="abHeroStatDivider"></div>


        <div className="abHeroStat">

          <span className="abHeroStatIcon gold">
            <FaStar />
          </span>

          <strong>
            30+
          </strong>

          <div>
            <b>
              ACTIVITIES
            </b>

            <small>
              Beyond Classrooms
            </small>
          </div>

        </div>

      </div>


      {/* =====================================================
          SCROLL
      ===================================================== */}

      <button
        type="button"
        className="abHeroScroll"
        onClick={scrollToNextSection}
      >

        <span>
          ↓
        </span>

        <small>
          SCROLL TO EXPLORE
        </small>

      </button>

    </section>
  );
};

export default Hero;