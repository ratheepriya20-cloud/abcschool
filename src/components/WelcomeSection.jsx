import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeSection.css";

import schoolImage from "../assets/school-image.jpg";

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <section className="welcomeSection">

      <div className="welcomeContainer">

        {/* IMAGE SIDE */}
        <div className="welcomeVisual">

          <div className="welcomeImageBox">
            <img
              src={schoolImage}
              alt="School students"
            />
          </div>

          <div className="welcomeGoldShape"></div>

          <div className="welcomeExperienceCard">
            <strong>25+</strong>
            <span>Years of<br />Excellence</span>
          </div>

        </div>


        {/* CONTENT SIDE */}
        <div className="welcomeContent">

          <span className="welcomeLabel">
            ABOUT OUR SCHOOL
          </span>

          <h2>
            Where Every Child
            <span>Discovers Their Potential.</span>
          </h2>

          <p className="welcomeMainText">
            Welcome to our school, where education goes beyond textbooks.
            We create an inspiring environment that encourages students
            to learn, explore, think creatively and become confident
            individuals.
          </p>

          <p className="welcomeSecondText">
            With experienced educators, modern learning facilities and
            strong values, we prepare every student for academic success
            and a bright future.
          </p>


          {/* HIGHLIGHTS */}
          <div className="welcomeHighlights">

            <div className="welcomeHighlight">
              <span>✓</span>
              <div>
                <strong>Holistic Education</strong>
                <small>Academic & personal growth</small>
              </div>
            </div>

            <div className="welcomeHighlight">
              <span>✓</span>
              <div>
                <strong>Experienced Faculty</strong>
                <small>Dedicated & caring teachers</small>
              </div>
            </div>

          </div>


          <button
            className="welcomeButton"
            onClick={() => navigate("/about")}
          >
            Discover Our School
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default WelcomeSection;