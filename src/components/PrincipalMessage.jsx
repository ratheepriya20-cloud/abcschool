import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaQuoteLeft,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";
import "./PrincipalMessage.css";

import principalImage from "../assets/principal1.jpg";

const PrincipalMessage = () => {
  const navigate = useNavigate();

  return (
    <section className="elitePrincipalSection">
      <div className="elitePrincipalContainer">

        {/* LEFT VISUAL */}
        <div className="elitePrincipalVisual">

          <div className="elitePrincipalNavyPanel"></div>

          <div className="elitePrincipalPortrait">
            <img
              src={principalImage}
              alt="Principal of Shiksha Bharti Vidyalaya"
            />

            <div className="elitePrincipalPortraitOverlay"></div>
          </div>

          <div className="elitePrincipalGoldFrame"></div>


          <div className="elitePrincipalIdentityCard">
            <div className="elitePrincipalIdentityIcon">
              <FaGraduationCap />
            </div>

            <div>
              <span>OUR PRINCIPAL</span>
              <strong>Shiksha Bharti Vidyalaya</strong>
            </div>
          </div>

          <div className="elitePrincipalAward">
            <FaAward />
            <span>LEADING<br />WITH PURPOSE</span>
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="elitePrincipalContent">

          <div className="elitePrincipalEyebrow">
            <span></span>
            PRINCIPAL'S MESSAGE
            <span></span>
          </div>

          <h2>
            Inspiring Minds.
            <em>Building Futures.</em>
          </h2>

          <div className="elitePrincipalHeadingLine"></div>

          <p className="elitePrincipalIntro">
            Every child has the potential to achieve something extraordinary.
            Our purpose is to provide the right environment, guidance and
            opportunities to help that potential flourish.
          </p>

          {/* QUOTE */}
          <div className="elitePrincipalQuote">

            <div className="elitePrincipalQuoteMark">
              <FaQuoteLeft />
            </div>

            <div>
              <p>
                “Education is not simply about preparing students for
                examinations; it is about preparing them for life—with
                confidence, character, curiosity and courage.”
              </p>

              <div className="elitePrincipalQuoteLine"></div>

              <span>— School Principal</span>
            </div>

          </div>


          {/* BOTTOM */}
          <div className="elitePrincipalBottom">

            <div className="elitePrincipalSignature">
              <div className="elitePrincipalSignatureLine"></div>

              <strong>School Principal</strong>
              <span>Shiksha Bharti Vidyalaya</span>
            </div>

            <button
              type="button"
              className="elitePrincipalButton"
              onClick={() => navigate("/about")}
            >
              <span>Read Full Message</span>
              <FaArrowRight />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PrincipalMessage;