import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaPhoneAlt,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

import "./AdmissionCTA.css";

/* EXACT GENERATED IMAGE */
import admissionCTAImage from "../assets/academic-hero-student.jpg";

const AdmissionCTA = () => {
  const navigate = useNavigate();

  return (
    <section
      className="schoolAdmissionCTA"
      style={{
        backgroundImage: `url(${admissionCTAImage})`,
      }}
    >
      {/* IMAGE OVERLAY */}
      <div className="admissionCTABackdrop"></div>

      {/* DECORATION */}
      <div className="admissionGlow admissionGlowOne"></div>
      <div className="admissionGlow admissionGlowTwo"></div>

      <div className="admissionCTAContainer">

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <div className="admissionCTAContent">

          <div className="admissionSmallTitle">
            <FaGraduationCap />

            <span>
              ADMISSIONS OPEN 2026–27
            </span>
          </div>

          <h2>
            Give Your Child
            <span>A Brighter Future.</span>
          </h2>

          <div className="admissionTitleLine"></div>

          <p>
            Begin your child's journey towards knowledge,
            confidence, creativity and excellence with
            AB Public School.
          </p>

          <div className="admissionCTAButtons">

            <button
              type="button"
              className="admissionPrimaryBtn"
              onClick={() => navigate("/admission")}
            >
              <FaGraduationCap />

              <span>
                Apply for Admission
              </span>

              <FaArrowRight />
            </button>
<button
  type="button"
  className="admissionSecondaryBtn"
  onClick={() => {
    window.location.href = "tel:+911234567890";
  }}
>
  <FaPhoneAlt />

  <span>Talk to School</span>

  <b>↗</b>
</button>
          </div>

        </div>


        {/* =========================
            RIGHT INFO CARD
        ========================= */}

        <div className="admissionCTAInfo">

          <div className="admissionInfoTop">

            <div className="admissionInfoIcon">
              <FaGraduationCap />
            </div>

            <div>
              <span>
                START YOUR JOURNEY
              </span>

              <strong>
                2026–27
              </strong>
            </div>

          </div>


          <div className="admissionInfoLine">

            <span></span>

            <b>✦</b>

            <span></span>

          </div>


          <div className="admissionHighlights">

            <div className="admissionHighlightItem">

              <div className="admissionHighlightIcon gold">
                <FaTrophy />
              </div>

              <strong>
                25+
              </strong>

              <span>
                Years of
                <br />
                Excellence
              </span>

            </div>


            <div className="admissionHighlightItem">

              <div className="admissionHighlightIcon blue">
                <FaUsers />
              </div>

              <strong>
                1500+
              </strong>

              <span>
                Students
              </span>

            </div>


            <div className="admissionHighlightItem">

              <div className="admissionHighlightIcon gold">
                <FaChartLine />
              </div>

              <strong>
                98%
              </strong>

              <span>
                Board
                <br />
                Results
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AdmissionCTA;