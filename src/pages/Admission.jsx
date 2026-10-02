import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaDownload,
  FaUsers,
  FaBookOpen,
  FaTrophy,
  FaSchool,
  FaFileAlt,
  FaUpload,
  FaShieldAlt,
  FaCheckCircle,
  FaBaby,
  FaShapes,
  FaBookReader,
  FaDesktop,
    FaCalendarAlt,
  FaHourglassHalf,
  FaClipboardCheck,
  FaAward,
  FaGraduationCap,
  FaUser,
  FaIdCard,
  FaFileInvoice,
  FaPlay,
  FaChevronRight,
} from "react-icons/fa";

import "./Admission.css";

/* =========================================================
   EXISTING ASSETS
   ========================================================= */

// SPORTS
import sports1 from "../assets/sports-gallery-1.jpg";

// CULTURAL
import cultural1 from "../assets/cultural-gallery-1.jpg";

// FACILITIES
import facility1 from "../assets/abps-student-image.jpg";
import facility2 from "../assets/facility-classroom.jpg";
import facility3 from "../assets/facility-library.jpg";
import facility4 from "../assets/science-learning.jpg";
import facility5 from "../assets/technology-learning.jpg";
import facility6 from "../assets/facility-cta.jpg";

// Add this image manually in assets
import documentsImage from "../assets/admission-documents.png";

/* =========================================================
   DATA
   ========================================================= */

const admissionSteps = [
  {
    number: "01",
    title: "Apply Online",
    description:
      "Fill in the admission form with the student's basic details.",
    icon: FaFileAlt,
    type: "blue",
  },
  {
    number: "02",
    title: "Upload Documents",
    description:
      "Submit the required documents for admission review.",
    icon: FaUpload,
    type: "gold",
  },
  {
    number: "03",
    title: "Review & Verification",
    description:
      "Our admission team reviews the application and documents.",
    icon: FaShieldAlt,
    type: "green",
  },
  {
    number: "04",
    title: "Confirmation",
    description:
      "Eligible applicants receive admission confirmation and next steps.",
    icon: FaCheckCircle,
    type: "purple",
  },
];

const classOptions = [
  {
    title: "Nursery",
    subtitle: "Age 3+",
    icon: FaBaby,
    type: "gold",
  },
  {
    title: "LKG",
    subtitle: "Age 4+",
    icon: FaShapes,
    type: "green",
  },
  {
    title: "UKG",
    subtitle: "Age 5+",
    icon: FaBookReader,
    type: "blue",
  },
  {
    title: "Class 1 – 5",
    subtitle: "Primary School",
    icon: FaSchool,
    type: "pink",
  },
  {
    title: "Class 6 – 8",
    subtitle: "Middle School",
    icon: FaDesktop,
    type: "navy",
  },
  {
    title: "Class 9 – 12",
    subtitle: "Secondary School",
    icon: FaBookOpen,
    type: "gold",
  },
];

const importantDates = [
  {
    title: "Admission Start Date",
    date: "01 Nov 2026",
    icon: FaHourglassHalf,
    type: "green",
  },
  {
    title: "Last Date to Apply",
    date: "31 Jan 2027",
    icon: FaCalendarAlt,
    type: "gold",
  },
  {
    title: "Document Verification",
    date: "05 Feb 2027",
    icon: FaClipboardCheck,
    type: "purple",
  },
  {
    title: "Admission Results",
    date: "15 Feb 2027",
    icon: FaAward,
    type: "pink",
  },
  {
    title: "Session Begins",
    date: "01 Apr 2027",
    icon: FaGraduationCap,
    type: "red",
  },
];

const requiredDocuments = [
  {
    title: "Student Photograph",
    text: "Recent passport-size photograph",
    icon: FaUser,
  },
  {
    title: "Birth Certificate",
    text: "Self-attested copy",
    icon: FaFileAlt,
  },
  {
    title: "Previous Class Report Card",
    text: "Required for Class 1 and above",
    icon: FaFileInvoice,
  },
  {
    title: "Aadhaar Card",
    text: "Self-attested copy",
    icon: FaIdCard,
  },
  {
    title: "Parent / Guardian ID Proof",
    text: "Aadhaar / PAN / Passport",
    icon: FaIdCard,
  },
];

/* =========================================================
   COMPONENT
   ========================================================= */

const Admission = () => {
  const navigate = useNavigate();

  const goToApply = () => {
    navigate("/apply");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToProcess = () => {
    document
      .getElementById("admission-process")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="abAdm-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="abAdm-hero">

        <div className="abAdm-heroDecor abAdm-heroDecorOne" />
        <div className="abAdm-heroDecor abAdm-heroDecorTwo" />

        <div className="abAdm-container abAdm-heroGrid">

          {/* LEFT CONTENT */}

          <div className="abAdm-heroContent">

            <div className="abAdm-smallLabel">
              <span />
              ADMISSIONS 2026 – 27
            </div>

            <h1>
              A Brighter
            
              <span>Future Begins Here.</span>
            </h1>

            <p className="abAdm-heroDescription">
              Give your child a strong foundation with quality
              education, modern learning and a caring environment
              at AB Public School.
            </p>

            <div className="abAdm-heroButtons">

              <button
                type="button"
                className="abAdm-primaryBtn"
                onClick={goToApply}
              >
                Apply for Admission
                <FaArrowRight />
              </button>

              <button
                type="button"
                className="abAdm-secondaryBtn"
                onClick={scrollToProcess}
              >
                <FaDownload />
                Admission Details
              </button>

            </div>

            <div className="abAdm-heroTrust">

              <div>
                <span>
                  <FaBookOpen />
                </span>

                <p>
                  <strong>Holistic</strong>
                  Learning
                </p>
              </div>

              <div>
                <span>
                  <FaUsers />
                </span>

                <p>
                  <strong>Experienced</strong>
                  Faculty
                </p>
              </div>

              <div>
                <span>
                  <FaShieldAlt />
                </span>

                <p>
                  <strong>Safe & Secure</strong>
                  Campus
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="abAdm-heroVisual">

            <div className="abAdm-heroImageShape">

              <img
                src={facility1}
                alt="AB Public School campus"
              />

              <div className="abAdm-imageShade" />

              <div className="abAdm-dreamText">
                <span>Small</span>
                <span>Steps.</span>
                <strong>Big</strong>
                <strong>Dreams</strong>
              </div>

            </div>

            <div className="abAdm-admissionBadge">

              <FaGraduationCap />

              <span>
                Admissions
              </span>

              <strong>
                Open
              </strong>

              <b>
                2026 - 27
              </b>

              <small>
                Nursery to Class 12
              </small>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS STRIP
          ===================================================== */}

      <section className="abAdm-statsWrap">

        <div className="abAdm-container">

          <div className="abAdm-stats">

            <div className="abAdm-statItem">

              <span className="abAdm-statIcon">
                <FaUsers />
              </span>

              <div>
                <strong>
                  100<span>+</span>
                </strong>
                <p>Expert Teachers</p>
              </div>

            </div>

            <div className="abAdm-statItem">

              <span className="abAdm-statIcon">
                <FaBookOpen />
              </span>

              <div>
                <strong>
                  15<span>+</span>
                </strong>
                <p>Co-Curricular Programs</p>
              </div>

            </div>

            <div className="abAdm-statItem">

              <span className="abAdm-statIcon">
                <FaTrophy />
              </span>

              <div>
                <strong>
                  25<span>+</span>
                </strong>
                <p>Years of Excellence</p>
              </div>

            </div>

            <div className="abAdm-statItem">

              <span className="abAdm-statIcon">
                <FaSchool />
              </span>

              <div>
                <strong className="abAdm-statText">
                  Modern Campus
                </strong>
                <p>with Quality Facilities</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ADMISSION PROCESS
          ===================================================== */}

      <section
        className="abAdm-processSection"
        id="admission-process"
      >

        <div className="abAdm-container">

          <div className="abAdm-processLayout">

            <div className="abAdm-processIntro">

              <div className="abAdm-smallLabel">
                <span />
                ADMISSION PROCESS
              </div>

              <h2>
                A Simple Process.
                <em>A Strong Start.</em>
              </h2>

              <p>
                Follow these easy steps to complete your child's
                admission application.
              </p>

              <button
                type="button"
                className="abAdm-outlineBtn"
                onClick={goToApply}
              >
                Start Application
                <FaArrowRight />
              </button>

            </div>

            <div className="abAdm-processSteps">

              {admissionSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <React.Fragment key={step.number}>

                    <article className="abAdm-stepCard">

                      <span
                        className={`abAdm-stepNumber ${step.type}`}
                      >
                        {step.number}
                      </span>

                      <span
                        className={`abAdm-stepIcon ${step.type}`}
                      >
                        <Icon />
                      </span>

                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.description}
                      </p>

                    </article>

                    {index < admissionSteps.length - 1 && (
                      <span className="abAdm-stepArrow">
                        <FaArrowRight />
                      </span>
                    )}

                  </React.Fragment>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CLASSES
          ===================================================== */}

      <section className="abAdm-classesSection">

        <div className="abAdm-container">

          <div className="abAdm-classesGrid">

            <article className="abAdm-classIntro">

              <span>
                CLASSES
              </span>

              <h2>
                Admissions
                <br />
                Open For
              </h2>

              <strong>
                Nursery to Class 12
              </strong>

              <i />

              <p>
                We welcome curious minds at every stage of their
                learning journey.
              </p>

              <FaGraduationCap className="abAdm-classWatermark" />

            </article>

            <div className="abAdm-classCards">

              {classOptions.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    className="abAdm-classCard"
                    key={item.title}
                  >

                    <span
                      className={`abAdm-classIcon ${item.type}`}
                    >
                      <Icon />
                    </span>

                    <div>
                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.subtitle}
                      </p>
                    </div>

                  </article>
                );
              })}

              <article className="abAdm-campusMiniCard">

                <img
                  src={facility2}
                  alt="Modern school campus"
                />

                <div className="abAdm-campusMiniOverlay" />

                <div>
                  <span>
                    CAMPUS
                  </span>

                  <h3>
                    A Safe, Modern
                    <br />
                    and Inspiring Campus
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/facilities")}
                  aria-label="Explore facilities"
                >
                  <FaArrowRight />
                </button>

              </article>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          IMPORTANT DATES + DOCUMENTS
          ===================================================== */}

      <section className="abAdm-infoSection">

        <div className="abAdm-container abAdm-infoGrid">

          {/* IMPORTANT DATES */}

          <article className="abAdm-infoCard">

            <div className="abAdm-infoHeading">

              <div>
                <span className="abAdm-headingIcon">
                  <FaCalendarAlt />
                </span>

                <h2>
                  Important Dates
                </h2>
              </div>

              <span className="abAdm-sessionTag">
                2026–27
              </span>

            </div>

            <div className="abAdm-dateList">

              {importantDates.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className="abAdm-dateRow"
                    key={item.title}
                  >

                    <span
                      className={`abAdm-dateIcon ${item.type}`}
                    >
                      <Icon />
                    </span>

                    <strong>
                      {item.title}
                    </strong>

                    <span className="abAdm-dateValue">
                      {item.date}
                    </span>

                  </div>
                );
              })}

            </div>

          </article>

          {/* REQUIRED DOCUMENTS */}

          <article className="abAdm-infoCard abAdm-documentsCard">

            <div className="abAdm-infoHeading">

              <div>
                <span className="abAdm-headingIcon gold">
                  <FaFileAlt />
                </span>

                <h2>
                  Required Documents
                </h2>
              </div>

            </div>

            <div className="abAdm-documentsBody">

              <div className="abAdm-documentList">

                {requiredDocuments.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="abAdm-documentItem"
                      key={item.title}
                    >

                      <span>
                        <Icon />
                      </span>

                      <div>
                        <strong>
                          {item.title}
                        </strong>

                        <p>
                          {item.text}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

              <div className="abAdm-documentVisual">

                <img
                  src={documentsImage}
                  alt="Admission documents"
                />

                <div className="abAdm-documentNote">

                  <FaShieldAlt />

                  <p>
                    Keep all documents ready before applying for
                    a smooth admission process.
                  </p>

                </div>

              </div>

            </div>

          </article>

        </div>

      </section>

      {/* =====================================================
          BOTTOM CTA
          ===================================================== */}

      <section className="abAdm-finalSection">

        <div className="abAdm-container">

          <div className="abAdm-finalCard">

            <div className="abAdm-finalImage">

              <img
                src={facility6}
                alt="AB Public School campus"
              />

              <div />

            </div>

            <div className="abAdm-tourContent">

              <button
                type="button"
                className="abAdm-playBtn"
                aria-label="Virtual campus tour"
              >
                <FaPlay />
              </button>

              <div>
                <h3>
                  Take a Virtual Tour
                </h3>

                <p>
                  Explore our campus, classrooms,
                  facilities and more.
                </p>
              </div>

            </div>

            <div className="abAdm-finalDivider" />

            <div className="abAdm-finalMessage">

              <span>
                <FaUsers />
              </span>

              <div>
                <h3>
                  Give Your Child
                  <br />
                  The Right Start
                </h3>

                <p>
                  Join a learning community that nurtures
                  confidence, character and success.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="abAdm-finalApply"
              onClick={goToApply}
            >
              Apply for Admission
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Admission;