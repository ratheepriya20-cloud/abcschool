import React from "react";
import { Link } from "react-router-dom";

import {
  FaRupeeSign,
  FaGraduationCap,
  FaBook,
  FaBus,
  FaFlask,
  FaLaptop,
  FaCheck,
  FaArrowRight,
  FaPhoneAlt,
  FaFileInvoiceDollar,
  FaInfoCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./FeeStructure.css";

const classFees = [
  {
    id: 1,
    level: "Foundation",
    classes: "Pre-Primary",
    admission: "₹ —",
    tuition: "₹ —",
    annual: "₹ —",
    featured: false,
  },
  {
    id: 2,
    level: "Primary",
    classes: "Classes I – V",
    admission: "₹ —",
    tuition: "₹ —",
    annual: "₹ —",
    featured: true,
  },
  {
    id: 3,
    level: "Middle",
    classes: "Classes VI – VIII",
    admission: "₹ —",
    tuition: "₹ —",
    annual: "₹ —",
    featured: false,
  },
  {
    id: 4,
    level: "Secondary",
    classes: "Classes IX – X",
    admission: "₹ —",
    tuition: "₹ —",
    annual: "₹ —",
    featured: false,
  },
  {
    id: 5,
    level: "Senior Secondary",
    classes: "Classes XI – XII",
    admission: "₹ —",
    tuition: "₹ —",
    annual: "₹ —",
    featured: false,
  },
];

const feeBreakup = [
  {
    icon: <FaGraduationCap />,
    title: "Tuition Fee",
    description:
      "Academic teaching, classroom learning and regular educational support.",
  },
  {
    icon: <FaBook />,
    title: "Academic Resources",
    description:
      "Learning material, academic activities and educational resources.",
  },
  {
    icon: <FaBus />,
    title: "Transport",
    description:
      "Applicable separately for students using the school transport facility.",
  },
  {
    icon: <FaFlask />,
    title: "Laboratory & Activities",
    description:
      "Applicable academic facilities, practical learning and selected activities.",
  },
  {
    icon: <FaLaptop />,
    title: "Digital Learning",
    description:
      "Technology-enabled learning resources and digital academic facilities.",
  },
];

const importantPoints = [
  "Fee amounts may vary according to the academic session and class.",
  "Transport charges are applicable only to students opting for transport.",
  "Additional activities or facilities may have separate charges.",
  "Parents should confirm the latest official fee circular before payment.",
];

const FeeStructure = () => {
  return (
    <>
      <Navbar />

      <div className="abfee2-page">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="abfee2-hero">
          <div className="abfee2-hero-shape abfee2-shape-one"></div>
          <div className="abfee2-hero-shape abfee2-shape-two"></div>

          <div className="abfee2-hero-inner">

            <div className="abfee2-hero-content">

              <div className="abfee2-breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/admission">Admissions</Link>
                <span>/</span>
                <strong>Fee Structure</strong>
              </div>

              <span className="abfee2-eyebrow">
                SCHOOL FEE INFORMATION
              </span>

              <h1>
                Invest In Their
                <span> Bright Future.</span>
              </h1>

              <p>
                A simple and transparent overview of the fee structure,
                academic charges and additional facilities available
                for students.
              </p>

              <div className="abfee2-hero-buttons">
                <a href="#class-fees" className="abfee2-gold-btn">
                  View Fee Structure
                  <FaArrowRight />
                </a>

                <Link to="/contact" className="abfee2-outline-btn">
                  Contact School
                </Link>
              </div>

            </div>

            {/* HERO FEE VISUAL */}

            <div className="abfee2-fee-visual">

              <div className="abfee2-visual-glow"></div>

              <div className="abfee2-visual-card">

                <div className="abfee2-visual-top">
                  <span>ACADEMIC YEAR</span>
                  <FaFileInvoiceDollar />
                </div>

                <div className="abfee2-rupee-circle">
                  <FaRupeeSign />
                </div>

                <h3>Transparent</h3>

                <p>
                  Fee information designed to help
                  parents plan with confidence.
                </p>

                <div className="abfee2-visual-bottom">
                  <span>FEE STRUCTURE</span>
                  <strong>2026 – 27</strong>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =================================================
            INTRO STATS
        ================================================= */}

        <section className="abfee2-overview">

          <div className="abfee2-overview-card">

            <div className="abfee2-overview-icon">
              <FaRupeeSign />
            </div>

            <div>
              <span>TRANSPARENT</span>
              <h3>Clear Fee Information</h3>
              <p>
                Understand the major components of school fees.
              </p>
            </div>

          </div>


          <div className="abfee2-overview-card">

            <div className="abfee2-overview-icon">
              <FaGraduationCap />
            </div>

            <div>
              <span>ACADEMIC</span>
              <h3>Class-Wise Structure</h3>
              <p>
                Fee categories are organised according to academic levels.
              </p>
            </div>

          </div>


          <div className="abfee2-overview-card">

            <div className="abfee2-overview-icon">
              <FaInfoCircle />
            </div>

            <div>
              <span>IMPORTANT</span>
              <h3>Latest Circular</h3>
              <p>
                Always confirm the latest applicable fee details.
              </p>
            </div>

          </div>

        </section>


        {/* =================================================
            CLASS FEES
        ================================================= */}

        <section className="abfee2-class-section" id="class-fees">

          <div className="abfee2-heading">

            <div>
              <span>CLASS-WISE FEES</span>

              <h2>
                Choose Your
                <strong> Academic Level.</strong>
              </h2>
            </div>

            <p>
              The following is a structured overview of the major
              fee categories. Please contact the school office for
              the latest exact amounts.
            </p>

          </div>


          <div className="abfee2-class-grid">

            {classFees.map((item) => (

              <div
                className={`abfee2-class-card ${
                  item.featured ? "abfee2-featured" : ""
                }`}
                key={item.id}
              >

                {item.featured && (
                  <div className="abfee2-popular">
                    POPULAR LEVEL
                  </div>
                )}

                <div className="abfee2-card-top">

                  <div className="abfee2-card-number">
                    0{item.id}
                  </div>

                  <span>{item.level}</span>

                  <h3>{item.classes}</h3>

                </div>


                <div className="abfee2-price-box">

                  <small>ADMISSION FEE</small>

                  <strong>
                    {item.admission}
                  </strong>

                </div>


                <div className="abfee2-fee-row">

                  <span>Tuition Fee</span>

                  <strong>
                    {item.tuition}
                  </strong>

                </div>


                <div className="abfee2-fee-row">

                  <span>Annual Charges</span>

                  <strong>
                    {item.annual}
                  </strong>

                </div>


                <div className="abfee2-card-footer">

                  <FaCheck />

                  <span>
                    Contact school for current details
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            BREAKUP
        ================================================= */}

        <section className="abfee2-breakup">

          <div className="abfee2-breakup-heading">

            <span>FEE BREAKDOWN</span>

            <h2>
              Where Does Your
              <strong> Fee Go?</strong>
            </h2>

            <p>
              School fees support different aspects of a student's
              academic journey and overall school experience.
            </p>

          </div>


          <div className="abfee2-breakup-list">

            {feeBreakup.map((item, index) => (

              <div
                className="abfee2-breakup-item"
                key={index}
              >

                <div className="abfee2-breakup-icon">
                  {item.icon}
                </div>

                <div className="abfee2-breakup-content">

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                </div>

                <div className="abfee2-breakup-number">
                  0{index + 1}
                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            IMPORTANT INFORMATION
        ================================================= */}

        <section className="abfee2-important">

          <div className="abfee2-important-left">

            <div className="abfee2-important-icon">
              <FaInfoCircle />
            </div>

            <div>

              <span>PLEASE NOTE</span>

              <h2>
                Important Fee
                <strong> Information.</strong>
              </h2>

            </div>

          </div>


          <div className="abfee2-important-list">

            {importantPoints.map((point, index) => (

              <div
                className="abfee2-important-item"
                key={index}
              >

                <FaCheck />

                <p>{point}</p>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            DOCUMENT CTA
        ================================================= */}

        <section className="abfee2-document">

          <div className="abfee2-document-icon">
            <FaFileInvoiceDollar />
          </div>

          <div className="abfee2-document-content">

            <span>NEED THE COMPLETE DETAILS?</span>

            <h2>
              Get The Latest Fee
              <strong> Circular.</strong>
            </h2>

            <p>
              Contact the school office for the current academic
              year's detailed fee structure and payment schedule.
            </p>

          </div>

          <Link
            to="/contact"
            className="abfee2-document-btn"
          >
            Contact Us
            <FaArrowRight />
          </Link>

        </section>


        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="abfee2-final">

          <div className="abfee2-final-content">

            <span>READY TO BEGIN?</span>

            <h2>
              Your Child's Journey
              <strong> Starts Here.</strong>
            </h2>

            <p>
              Explore the admission process and take the next step
              towards becoming part of our school community.
            </p>

            <div className="abfee2-final-buttons">

              <Link
                to="/apply"
                className="abfee2-final-primary"
              >
                Apply Now
                <FaArrowRight />
              </Link>

              <Link
                to="/admission/process"
                className="abfee2-final-secondary"
              >
                Admission Process
              </Link>

            </div>

          </div>

        </section>


        {/* =================================================
            HELP BAR
        ================================================= */}

        <section className="abfee2-help">

          <div className="abfee2-help-icon">
            <FaPhoneAlt />
          </div>

          <div className="abfee2-help-text">

            <span>HAVE QUESTIONS ABOUT FEES?</span>

            <h3>
              Speak with our admission team.
            </h3>

          </div>

          <Link to="/contact">
            Contact School
            <FaArrowRight />
          </Link>

        </section>

      </div>

      <Footer />
    </>
  );
};

export default FeeStructure;