import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaGraduationCap,
  FaUsers,
  FaHeart,
  FaArrowRight,
  FaCrown,
  FaCheck,
} from "react-icons/fa";

import "./WelcomeSection.css";

/* SAME EXISTING IMAGE */
import schoolImage from "../assets/school-hero-bg.png";


const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <section className="abWelcomeSection">

      {/* BACKGROUND DECORATION */}
      <div className="abWelcomeGlow abWelcomeGlowOne"></div>
      <div className="abWelcomeGlow abWelcomeGlowTwo"></div>

      <div className="abWelcomeDots abWelcomeDotsOne"></div>
      <div className="abWelcomeDots abWelcomeDotsTwo"></div>


      <div className="abWelcomeContainer">

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className="abWelcomeVisual">

          <div className="abWelcomeNavyShape"></div>
          <div className="abWelcomeGoldShape"></div>


          {/* SAME EXISTING IMAGE */}

          <div className="abWelcomeImageFrame">

            <img
              src={schoolImage}
              alt="AB Public School students"
              className="abWelcomeImage"
            />

          </div>


          {/* EXPERIENCE */}

          <div className="abWelcomeExperience">

            <FaCrown />

            <strong>
              25+
            </strong>

            <span>
              Years of
              <br />
              Excellence
            </span>

          </div>


          {/* IMAGE BOTTOM INFO */}

          <div className="abWelcomeImageInfo">

            <div className="abWelcomeImageInfoItem">

              <span className="blue">
                <FaGraduationCap />
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


            <div className="abWelcomeInfoDivider"></div>


            <div className="abWelcomeImageInfoItem">

              <span className="sky">
                <FaUsers />
              </span>

              <div>
                <strong>
                  Bright
                </strong>

                <small>
                  Future
                </small>
              </div>

            </div>


            <div className="abWelcomeInfoDivider"></div>


            <div className="abWelcomeImageInfoItem">

              <span className="gold">
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

        </div>


        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className="abWelcomeContent">


          {/* LABEL */}

          <div className="abWelcomeLabel">

            <span className="abWelcomeLabelIcon">
              <FaGraduationCap />
            </span>

            <strong>
              ABOUT OUR SCHOOL
            </strong>

            <span className="abWelcomeLabelLine"></span>

          </div>


          {/* HEADING */}

          <h2>
            Where Every Child
            <span>
              Discovers Their Potential.
            </span>
          </h2>


          <div className="abWelcomeHeadingLine">

            <span></span>

            <b>✦</b>

          </div>


          {/* DESCRIPTION */}

          <p className="abWelcomeMainText">
            Welcome to our school, where education goes beyond
            textbooks. We create an inspiring environment that
            encourages students to learn, explore, think creatively
            and become confident individuals.
          </p>


          <p className="abWelcomeSecondText">
            With experienced educators, modern learning facilities
            and strong values, we prepare every student for academic
            success and a bright future.
          </p>


          {/* =================================================
              HIGHLIGHTS
          ================================================= */}

          <div className="abWelcomeHighlights">

            <div className="abWelcomeHighlight blue">

              <div className="abWelcomeHighlightIcon">
                <FaGraduationCap />
              </div>

              <div>

                <strong>
                  Holistic Education
                </strong>

                <span>
                  Academic & personal growth
                </span>

              </div>

              <FaCheck className="abWelcomeCheck" />

            </div>


            <div className="abWelcomeHighlight gold">

              <div className="abWelcomeHighlightIcon">
                <FaUsers />
              </div>

              <div>

                <strong>
                  Experienced Faculty
                </strong>

                <span>
                  Dedicated & caring teachers
                </span>

              </div>

              <FaCheck className="abWelcomeCheck" />

            </div>

          </div>


          {/* BUTTON */}

          <button
            type="button"
            className="abWelcomeButton"
            onClick={() => navigate("/about")}
          >

            <span>
              Discover Our School
            </span>

            <span className="abWelcomeButtonArrow">
              <FaArrowRight />
            </span>

          </button>

        </div>

      </div>

    </section>
  );
};

export default WelcomeSection;