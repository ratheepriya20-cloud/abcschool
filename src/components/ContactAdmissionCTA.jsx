import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaGraduationCap,
  FaCheck,
  FaCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";

import "./ContactAdmissionCTA.css";

/* EXISTING PROJECT IMAGE */
import admissionImage from "../assets/facility-cta.jpg";


const ContactAdmissionCTA = () => {
  const navigate = useNavigate();


  const goToAdmission = () => {
    navigate("/admission");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const goToApply = () => {
    navigate("/apply");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <section className="abPremiumContactCTA">

      <div className="abPremiumContactCTAContainer">

        {/* =============================================
            BACKGROUND DECORATIONS
        ============================================= */}

        <div className="abPremiumCTACircle circleOne"></div>

        <div className="abPremiumCTACircle circleTwo"></div>


        {/* =============================================
            LEFT CONTENT
        ============================================= */}

        <div className="abPremiumCTAContent">

          {/* LABEL */}

          <div className="abPremiumCTALabel">

            <div className="abPremiumCTALabelIcon">
              <FaGraduationCap />
            </div>

            <div>
              <span>
                ADMISSIONS OPEN
              </span>

              <strong>
                Academic Session 2026–27
              </strong>
            </div>

          </div>


          {/* HEADING */}

          <h2>
            Give Your Child
            <br />

            <span>
              A Confident Start.
            </span>
          </h2>


          {/* DESCRIPTION */}

          <p className="abPremiumCTADescription">
            Discover the admission process, understand
            the requirements and take the next step
            towards joining AB Public School.
          </p>


          {/* MINI POINTS */}

          <div className="abPremiumCTAPoints">

            <div>
              <span className="abPremiumCheck">
                <FaCheck />
              </span>

              <span>
                Simple Admission Process
              </span>
            </div>


            <div>
              <span className="abPremiumCheck">
                <FaCheck />
              </span>

              <span>
                Parent Guidance
              </span>
            </div>


            <div>
              <span className="abPremiumCheck">
                <FaCheck />
              </span>

              <span>
                Easy Online Application
              </span>
            </div>

          </div>


          {/* BUTTONS */}

          <div className="abPremiumCTAActions">

            <button
              type="button"
              className="abPremiumCTAPrimary"
              onClick={goToApply}
            >
              <span>
                Apply Now
              </span>

              <div>
                <FaArrowRight />
              </div>
            </button>


            <button
              type="button"
              className="abPremiumCTASecondary"
              onClick={goToAdmission}
            >
              Explore Admissions

              <FaArrowRight />
            </button>

          </div>

        </div>


        {/* =============================================
            RIGHT VISUAL
        ============================================= */}

        <div className="abPremiumCTAVisual">

          {/* IMAGE */}

          <div className="abPremiumCTAImage">

            <img
              src={admissionImage}
              alt="AB Public School admissions"
            />

            <div className="abPremiumCTAImageShade"></div>

          </div>


          {/* SESSION BADGE */}

          <div className="abPremiumCTASessionBadge">

            <div className="abPremiumCTASessionIcon">
              <FaCalendarAlt />
            </div>

            <div>
              <span>
                SESSION
              </span>

              <strong>
                2026–27
              </strong>
            </div>

          </div>


          {/* SMALL FLOATING CARD */}

          <div className="abPremiumCTAStudentCard">

            <div>
              <FaUserGraduate />
            </div>

            <span>
              Begin the journey
            </span>

            <strong>
              Join ABPS
            </strong>

          </div>


          {/* DOT PATTERN */}

          <div className="abPremiumCTADots">

            {Array.from({
              length: 15,
            }).map((_, index) => (
              <span key={index}></span>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactAdmissionCTA;