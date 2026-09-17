import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroBg from "../assets/school-hero-bg.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="proSchoolHero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="proSchoolHeroOverlay"></div>

      <div className="proSchoolHeroMain">
        <div className="proSchoolHeroContent">
          <span className="proSchoolHeroBadge">
            WELCOME TO OUR SCHOOL
          </span>

          <h1>
            Inspiring Minds,
            <span> Building Futures.</span>
          </h1>

          <p>
            Nurturing curious minds, building confident personalities, and inspiring 
            every child to achieve their full potential through excellence in 
            learning and strong values.
          </p>

          <div className="proSchoolHeroActions">
            <button
              className="proSchoolHeroPrimary"
              onClick={() => navigate("/apply")}
            >
              Apply Now
              <span>→</span>
            </button>

            <button
              className="proSchoolHeroSecondary"
              onClick={() => navigate("/about")}
            >
              Explore School
            </button>
          </div>
        </div>

        <div className="proSchoolAdmission">
          <div className="proSchoolAdmissionTop">
            <span></span>
            ADMISSIONS OPEN
          </div>

          <div className="proSchoolSession">2026–27</div>

          <h2>Give Your Child A Bright Beginning</h2>

          <p>
            Applications are now open for the new academic session.
          </p>

          <div className="proSchoolAdmissionInfo">
            <div>
              <small>Classes</small>
              <strong>Nursery – XII</strong>
            </div>

            <div>
              <small>Session</small>
              <strong>2026–27</strong>
            </div>
          </div>

          <button
            className="proSchoolStart"
            onClick={() => navigate("/apply")}
          >
            Start Application
            <span>↗</span>
          </button>
        </div>
      </div>

      <div className="proSchoolStats">
        <div>
          <strong>25+</strong>
          <span>Years Excellence</span>
        </div>

        <i></i>

        <div>
          <strong>1500+</strong>
          <span>Students</span>
        </div>

        <i></i>

        <div>
          <strong>40+</strong>
          <span>Expert Teachers</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;