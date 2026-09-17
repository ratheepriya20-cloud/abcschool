import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdmissionCTA.css";

const AdmissionCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="schoolAdmissionCTA">

      <div className="admissionGlow admissionGlowOne"></div>
      <div className="admissionGlow admissionGlowTwo"></div>

      <div className="admissionCTAContainer">

        {/* LEFT */}
        <div className="admissionCTAContent">

          <span className="admissionSmallTitle">
            ADMISSIONS OPEN 2026–27
          </span>

          <h2>
            Give Your Child
            <span>A Brighter Future.</span>
          </h2>

          <p>
            Begin your child's journey towards knowledge, confidence,
            creativity and excellence with Shiksha Bharti Vidyalaya.
          </p>

          <div className="admissionCTAButtons">

            <button
              className="admissionPrimaryBtn"
              onClick={() => navigate("/admission")}
            >
              Apply for Admission
              
            </button>

            <button
              className="admissionSecondaryBtn"
              onClick={() => navigate("/contact")}
            >
              Talk to School
              <span>↗</span>
            </button>

          </div>

        </div>


        {/* RIGHT INFO */}
        <div className="admissionCTAInfo">

          <div className="admissionInfoTop">
            <span>START YOUR JOURNEY</span>
            <strong>2026–27</strong>
          </div>

          <div className="admissionInfoLine"></div>

          <div className="admissionHighlights">

            <div>
              <strong>25+</strong>
              <span>Years of Excellence</span>
            </div>

            <div>
              <strong>1500+</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>98%</strong>
              <span>Board Results</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AdmissionCTA;