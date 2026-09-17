import React from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCalendarAlt,
  FaFileAlt,
  FaUserGraduate,
  FaClipboardCheck,
  FaPhoneAlt,
} from "react-icons/fa";
import "./AdmissionOverview.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const admissionSteps = [
  {
    number: "01",
    icon: <FaFileAlt />,
    title: "Submit Application",
    text: "Complete the online admission form with accurate student and parent details.",
  },
  {
    number: "02",
    icon: <FaClipboardCheck />,
    title: "Application Review",
    text: "Our admission team carefully reviews the submitted application and documents.",
  },
  {
    number: "03",
    icon: <FaUserGraduate />,
    title: "Assessment",
    text: "Eligible students may be invited for an age-appropriate assessment or interaction.",
  },
  {
    number: "04",
    icon: <FaCheckCircle />,
    title: "Admission Confirmation",
    text: "Selected students receive an official confirmation and enrollment guidance.",
  },
];

const requirements = [
  "Completed admission application form",
  "Recent passport-size photographs",
  "Birth certificate",
  "Previous school report card",
  "Transfer certificate, where applicable",
  "Parent / guardian identification proof",
];

const AdmissionOverview = () => {
  return (
    <>
    <Navbar/>
    <section className="admissionOverview">
      <div className="admissionOverviewGlow admissionGlowOne"></div>
      <div className="admissionOverviewGlow admissionGlowTwo"></div>

      <div className="admissionOverviewContainer">

        <div className="admissionOverviewHero">
          <div className="admissionHeroContent">
            <span className="admissionEyebrow">
              <span></span>
              ADMISSIONS 2026–27
            </span>

            <h1>
              Begin Your Child's
              <strong> Journey With Us</strong>
            </h1>

            <p>
              Discover a nurturing academic environment where curiosity,
              confidence and character come together to shape tomorrow's
              leaders.
            </p>

            <div className="admissionHeroButtons">
              <a href="/apply" className="admissionPrimaryBtn">
                Apply for Admission
                <FaArrowRight />
              </a>

              <a href="/contact" className="admissionSecondaryBtn">
                <FaPhoneAlt />
                Contact Admission Office
              </a>
            </div>
          </div>

          <div className="admissionHeroCard">
            <div className="admissionCardTop">
              <span>ADMISSION OPEN</span>
              <div className="admissionRoundIcon">
                <FaUserGraduate />
              </div>
            </div>

            <h3>2026–27</h3>

            <p>
              Applications are now open for selected classes.
            </p>

            <div className="admissionCardLine"></div>

            <div className="admissionMiniInfo">
              <div>
                <FaCalendarAlt />
                <span>
                  <small>Session</small>
                  2026–27
                </span>
              </div>

              <div>
                <FaClipboardCheck />
                <span>
                  <small>Status</small>
                  Applications Open
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="admissionStats">
          <div className="admissionStatItem">
            <strong>01</strong>
            <span>Simple Application</span>
          </div>

          <div className="admissionStatItem">
            <strong>04</strong>
            <span>Easy Admission Steps</span>
          </div>

          <div className="admissionStatItem">
            <strong>100%</strong>
            <span>Student Focused</span>
          </div>

          <div className="admissionStatItem">
            <strong>24/7</strong>
            <span>Online Information</span>
          </div>
        </div>

        <div className="admissionSectionHeading">
          <span>HOW IT WORKS</span>
          <h2>Our Admission Process</h2>
          <p>
            A transparent and simple process designed to make your admission
            journey smooth and stress-free.
          </p>
        </div>

        <div className="admissionSteps">
          {admissionSteps.map((step) => (
            <div className="admissionStepCard" key={step.number}>
              <div className="admissionStepNumber">{step.number}</div>

              <div className="admissionStepIcon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>

              <div className="admissionStepArrow">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>

        <div className="admissionDetailsGrid">

          <div className="admissionDetailsCard">
            <div className="admissionDetailsHeader">
              <div className="admissionDetailsIcon">
                <FaFileAlt />
              </div>

              <div>
                <span>REQUIRED DOCUMENTS</span>
                <h2>What You'll Need</h2>
              </div>
            </div>

            <div className="admissionRequirements">
              {requirements.map((item, index) => (
                <div className="admissionRequirement" key={index}>
                  <FaCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admissionEligibilityCard">
            <div className="admissionEligibilityBadge">
              <FaUserGraduate />
            </div>

            <span>READY TO TAKE THE NEXT STEP?</span>

            <h2>
              Give Your Child
              <br />
              A Stronger Beginning.
            </h2>

            <p>
              Start your admission journey today and become a part of our
              learning community.
            </p>

            <a href="/apply" className="admissionGoldBtn">
              Start Application
              <FaArrowRight />
            </a>
          </div>

        </div>

      </div>
    </section>

    <Footer /></>
  );
};

export default AdmissionOverview;