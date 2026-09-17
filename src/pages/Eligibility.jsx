import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaUserCheck,
  FaBirthdayCake,
  FaBookOpen,
  FaClipboardCheck,
  FaFileAlt,
  FaCheckCircle,
  FaArrowRight,
  FaSchool,
  FaUsers,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Eligibility.css";

const eligibilityLevels = [
  {
    number: "01",
    icon: <FaGraduationCap />,
    title: "Pre-Primary",
    subtitle: "FOUNDATION YEARS",
    description:
      "Admission at the pre-primary level focuses on the child's age, readiness and ability to participate in an engaging early-learning environment.",
    points: [
      "Age criteria as applicable",
      "Basic student information",
      "Parent / guardian details",
      "Required documents",
    ],
  },
  {
    number: "02",
    icon: <FaBookOpen />,
    title: "Primary School",
    subtitle: "CLASSES I – V",
    description:
      "Students seeking admission to primary classes should meet the applicable age and academic requirements for the class they are applying for.",
    points: [
      "Age eligibility",
      "Previous class record",
      "Transfer documents where applicable",
      "Admission assessment if required",
    ],
  },
  {
    number: "03",
    icon: <FaSchool />,
    title: "Middle School",
    subtitle: "CLASSES VI – VIII",
    description:
      "Admission to middle school may consider the student's previous academic record, class eligibility and school admission requirements.",
    points: [
      "Applicable age criteria",
      "Previous academic records",
      "School leaving documents",
      "Assessment / interaction if required",
    ],
  },
  {
    number: "04",
    icon: <FaGraduationCap />,
    title: "Secondary School",
    subtitle: "CLASSES IX – X",
    description:
      "Students applying for secondary classes should fulfil the applicable academic and documentation requirements for the requested class.",
    points: [
      "Class eligibility",
      "Academic records",
      "Transfer certificate where applicable",
      "Required admission formalities",
    ],
  },
  {
    number: "05",
    icon: <FaClipboardCheck />,
    title: "Senior Secondary",
    subtitle: "CLASSES XI – XII",
    description:
      "Admission to senior secondary classes is subject to applicable academic requirements, stream availability and school admission guidelines.",
    points: [
      "Academic eligibility",
      "Previous examination record",
      "Stream availability",
      "Required documentation",
    ],
  },
  {
    number: "06",
    icon: <FaUsers />,
    title: "Transfer Admission",
    subtitle: "MID-YEAR / TRANSFER CASES",
    description:
      "Students transferring from another school may be required to provide additional academic and transfer-related documents.",
    points: [
      "Previous school details",
      "Academic records",
      "Transfer certificate",
      "Document verification",
    ],
  },
];

const generalRequirements = [
  {
    icon: <FaBirthdayCake />,
    title: "Age Requirement",
    text: "The student should meet the applicable age criteria for the class being applied for.",
  },
  {
    icon: <FaBookOpen />,
    title: "Academic Record",
    text: "Previous academic performance may be considered for admission to applicable classes.",
  },
  {
    icon: <FaFileAlt />,
    title: "Documents",
    text: "Required documents should be submitted for verification during the admission process.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Assessment",
    text: "An interaction or academic assessment may be conducted wherever applicable.",
  },
];

const Eligibility = () => {
  return (
    <><Navbar />
    <div className="abeligibility-page">

      

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="abeligibility-hero">

          <div className="abeligibility-glow abeligibility-glowOne"></div>
          <div className="abeligibility-glow abeligibility-glowTwo"></div>
          <div className="abeligibility-pattern"></div>

          <div className="abeligibility-heroContent">

            <div className="abeligibility-eyebrow">
              <span></span>
              <FaUserCheck />
              ADMISSION ELIGIBILITY
              <span></span>
            </div>

            <h1>
              Find Your
              <strong>Right Path.</strong>
            </h1>

            <p>
              Explore the general eligibility guidelines for
              different school levels and understand what may
              be required before applying for admission.
            </p>

            <div className="abeligibility-heroTags">

              <span>
                <FaCheckCircle />
                Age Criteria
              </span>

              <span>
                <FaCheckCircle />
                Academic Requirements
              </span>

              <span>
                <FaCheckCircle />
                Documents
              </span>

            </div>

          </div>

        </section>


        {/* =================================================
            INTRO
        ================================================= */}

        <section className="abeligibility-intro">

          <div className="abeligibility-introNumber">
            <strong>01</strong>
            <span>ELIGIBILITY</span>
          </div>

          <div className="abeligibility-introContent">

            <span className="abeligibility-smallTitle">
              KNOW BEFORE YOU APPLY
            </span>

            <h2>
              The Right Class.
              <strong>The Right Beginning.</strong>
            </h2>

            <p>
              Eligibility requirements can vary depending on the
              class, academic session and availability of seats.
              Parents should review the applicable requirements
              and keep the necessary information and documents
              ready before submitting an application.
            </p>

          </div>

        </section>


        {/* =================================================
            GENERAL REQUIREMENTS
        ================================================= */}

        <section className="abeligibility-requirements">

          <div className="abeligibility-heading">

            <span>GENERAL ELIGIBILITY</span>

            <h2>
              What You Need
              <strong>To Know.</strong>
            </h2>

            <p>
              These general points provide an overview of the
              factors that may be considered during admission.
            </p>

          </div>


          <div className="abeligibility-requirementGrid">

            {generalRequirements.map((item) => (

              <div
                className="abeligibility-requirementCard"
                key={item.title}
              >

                <div className="abeligibility-requirementIcon">
                  {item.icon}
                </div>

                <div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            CLASS LEVELS
        ================================================= */}

        <section className="abeligibility-levels">

          <div className="abeligibility-heading">

            <span>CLASS-WISE GUIDANCE</span>

            <h2>
              Eligibility By
              <strong>School Level.</strong>
            </h2>

            <p>
              Select the school level that best matches the class
              for which admission is being considered.
            </p>

          </div>


          <div className="abeligibility-levelGrid">

            {eligibilityLevels.map((level) => (

              <article
                className="abeligibility-levelCard"
                key={level.number}
              >

                <div className="abeligibility-levelTop">

                  <span className="abeligibility-levelNumber">
                    {level.number}
                  </span>

                  <div className="abeligibility-levelIcon">
                    {level.icon}
                  </div>

                </div>


                <span className="abeligibility-levelLabel">
                  {level.subtitle}
                </span>

                <h3>{level.title}</h3>

                <div className="abeligibility-levelLine"></div>

                <p className="abeligibility-levelDescription">
                  {level.description}
                </p>


                <div className="abeligibility-points">

                  {level.points.map((point) => (

                    <span key={point}>
                      <FaCheckCircle />
                      {point}
                    </span>

                  ))}

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =================================================
            IMPORTANT NOTE
        ================================================= */}

        <section className="abeligibility-note">

          <div className="abeligibility-noteIcon">
            <FaInfoCircle />
          </div>

          <div className="abeligibility-noteContent">

            <span>PLEASE NOTE</span>

            <h2>
              Check The Latest
              <strong>Admission Guidelines.</strong>
            </h2>

            <p>
              The information shown here provides general
              guidance. Specific age limits, academic criteria,
              documents, seat availability and admission
              requirements may vary according to the class and
              academic session.
            </p>

          </div>

          <Link
            to="/admission/process"
            className="abeligibility-noteBtn"
          >
            View Process
            <FaArrowRight />
          </Link>

        </section>


        {/* =================================================
            CTA
        ================================================= */}

        <section className="abeligibility-cta">

          <div className="abeligibility-ctaContent">

            <span>READY TO MOVE FORWARD?</span>

            <h2>
              Check Your Eligibility
              <strong>And Apply.</strong>
            </h2>

            <p>
              Review the admission requirements and take the
              next step towards joining AB Public School.
            </p>

            <div className="abeligibility-ctaButtons">

              <Link
                to="/apply"
                className="abeligibility-applyBtn"
              >
                Apply Now
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="abeligibility-contactBtn"
              >
                <FaPhoneAlt />
                Contact School
              </Link>

            </div>

          </div>

        </section>

      </main>

      

    </div>
<Footer />
    </>
  );
};

export default Eligibility;