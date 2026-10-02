import React from "react";
import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaBookOpen,
  FaBuilding,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import "./QuickInfo.css";

/* =========================================================
   EXISTING PROJECT / GALLERY IMAGES
   Koi new image add nahi karni
========================================================= */

import admissionImage from "../assets/trip-gallery-1.jpg";
import academicImage from "../assets/cultural-gallery-1.jpg";
import campusImage from "../assets/sports-gallery-1.jpg";
import facultyImage from "../assets/cultural-team-cta.jpg";


const QuickInfo = () => {

  const quickInfoData = [
    {
      number: "01",
      title: "Admissions",

      description:
        "Explore eligibility, admission requirements, important dates and the complete application process.",

      link: "/admission",

      icon: <FaGraduationCap />,

      image: admissionImage,

      theme: "navy",
    },

    {
      number: "02",
      title: "Academics",

      description:
        "Discover a thoughtful learning environment that builds knowledge, confidence and curiosity.",

      link: "/academics",

      icon: <FaBookOpen />,

      image: academicImage,

      theme: "cream",
    },

    {
      number: "03",
      title: "Campus Life",

      description:
        "Experience sports, clubs, cultural activities, competitions and memorable school experiences.",

      link: "/campus-life",

      icon: <FaBuilding />,

      image: campusImage,

      theme: "blue",
    },

    {
      number: "04",
      title: "Our Faculty",

      description:
        "Meet dedicated educators who guide, encourage and inspire every student to grow.",

      link: "/faculty",

      icon: <FaUsers />,

      image: facultyImage,

      theme: "white",
    },
  ];


  return (
    <section className="abpsExploreSection">

      {/* =====================================================
          DECORATION
      ===================================================== */}

      <div className="abpsExploreGlow abpsExploreGlowOne"></div>

      <div className="abpsExploreGlow abpsExploreGlowTwo"></div>


      <div className="abpsExploreContainer">


        {/* ===================================================
            HEADING
        =================================================== */}

        <div className="abpsExploreHeading">

          <div className="abpsExploreEyebrow">

            <span></span>

            <FaGraduationCap />

            <strong>
              EXPLORE AB PUBLIC SCHOOL
            </strong>

            <span></span>

          </div>


          <h2>
            Everything your child needs

            <em>
              to learn, grow & thrive.
            </em>
          </h2>


          <p>
            Discover the people, places and opportunities that
            make everyday life at AB Public School meaningful.
          </p>

        </div>


        {/* ===================================================
            MINI VALUES
        =================================================== */}

        <div className="abpsExploreValues">

          <span>
            <FaCheckCircle />
            Knowledge
          </span>

          <span>
            <FaCheckCircle />
            Character
          </span>

          <span>
            <FaCheckCircle />
            Confidence
          </span>

          <span>
            <FaCheckCircle />
            Bright Futures
          </span>

        </div>


        {/* ===================================================
            CARDS
        =================================================== */}

        <div className="abpsExploreCards">

          {quickInfoData.map((item) => (

            <Link
              to={item.link}
              key={item.number}
              className={`
                abpsExploreCard
                abpsExploreCard-${item.theme}
              `}
            >

              {/* =============================================
                  IMAGE
              ============================================= */}

              <div className="abpsExploreImage">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="abpsExploreImageShade"></div>


                {/* NUMBER */}

                <div className="abpsExploreNumber">

                  <strong>
                    {item.number}
                  </strong>

                  <span></span>

                </div>


                {/* ICON */}

                <div className="abpsExploreIcon">
                  {item.icon}
                </div>

              </div>


              {/* =============================================
                  CONTENT
              ============================================= */}

              <div className="abpsExploreCardContent">

                <h3>
                  {item.title}
                </h3>


                <span className="abpsExploreSmallLine"></span>


                <p>
                  {item.description}
                </p>


                <div className="abpsExploreCardBottom">

                  <span>
                    Explore
                  </span>

                  <b>
                    <FaArrowRight />
                  </b>

                </div>

              </div>


              {/* DECORATIVE CIRCLE */}

              <div className="abpsExploreDecorCircle"></div>

            </Link>

          ))}

        </div>


        {/* ===================================================
            BOTTOM MESSAGE
        =================================================== */}

        <div className="abpsExploreBottom">

          <span></span>

          <p>
            More opportunities.
            <strong>
              Brighter futures.
            </strong>
          </p>

          <span></span>

        </div>

      </div>

    </section>
  );
};

export default QuickInfo;