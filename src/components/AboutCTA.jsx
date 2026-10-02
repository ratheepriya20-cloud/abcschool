
import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaGraduationCap,
} from "react-icons/fa";
import "./AboutCTA.css";

const AboutCTA = () => {
  // School phone number
  // IMPORTANT: Replace this with your actual school number
  const schoolPhone = "+919876543210";

  return (
    <section className="abpsModernCTA">
      <div className="abpsModernCTAContainer">

        {/* Top Label */}
        <div className="abpsModernCTALabel">
          <span className="abpsModernCTALabelLine"></span>

          <span>AB PUBLIC SCHOOL</span>

          <span className="abpsModernCTALabelLine"></span>
        </div>

        {/* Main Area */}
        <div className="abpsModernCTAMain">

          {/* Left Number */}
          <div className="abpsModernCTANumber">

            <span className="abpsModernCTANumberSmall">
              ESTABLISHED
            </span>

            <strong>
              25<span>+</span>
            </strong>

            <span className="abpsModernCTANumberText">
              YEARS OF
              <br />
              EXCELLENCE
            </span>

          </div>

          {/* Center Content */}
          <div className="abpsModernCTAContent">

            <span className="abpsModernCTAEyebrow">
              BEGIN YOUR JOURNEY
            </span>

            <h2>
              Where Learning
              <br />
              <em>Becomes a Journey.</em>
            </h2>

            <p>
              Discover a school community where every student is encouraged
              to think independently, explore confidently and grow with
              purpose.
            </p>

            {/* CTA Buttons */}
            <div className="abpsModernCTAActions">

              {/* Admission */}
              <Link
                to="/admission"
                className="abpsModernCTAPrimary"
              >
                <span>Apply for Admission</span>
                <FaArrowRight />
              </Link>

              {/* Direct Call */}
              <a
                href={`tel:${schoolPhone}`}
                className="abpsModernCTASecondary"
                aria-label="Call AB Public School"
              >
                <FaPhoneAlt />
                <span>Talk to Us</span>
              </a>

            </div>

          </div>

          {/* Right Quote */}
          <div className="abpsModernCTAQuote">

            <FaGraduationCap className="abpsModernCTAQuoteIcon" />

            <span>OUR PROMISE</span>

            <p>
              Learn with purpose.
              <br />
              Grow with confidence.
              <br />
              Lead with character.
            </p>

            <div className="abpsModernCTAQuoteLine"></div>

          </div>

        </div>

        {/* Bottom Keywords */}
        <div className="abpsModernCTABottom">

          <span>KNOWLEDGE</span>

          <i></i>

          <span>CHARACTER</span>

          <i></i>

          <span>CONFIDENCE</span>

          <i></i>

          <span>DISCOVERY</span>

        </div>

      </div>
    </section>
  );
};

export default AboutCTA;
