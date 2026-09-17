import React from "react";
import { Link } from "react-router-dom";
import {
  FaFileContract,
  FaCheckCircle,
  FaUserCheck,
  FaGlobe,
  FaExclamationTriangle,
  FaCopyright,
  FaLink,
  FaEnvelope,
  FaArrowRight,
  FaBalanceScale,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./TermsConditions.css";

const TermsConditions = () => {
  return (
    <div className="abterms-page">

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abterms-hero">

        <div className="abterms-orbit"></div>

        <div className="abterms-container">

          <div className="abterms-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Terms & Conditions</span>
          </div>

          <div className="abterms-hero-grid">

            <div className="abterms-hero-content">

              <span className="abterms-eyebrow">
                <span></span>
                WEBSITE TERMS
              </span>

              <h1>
                Clear Terms.
                
                <em>Better Understanding.</em>
              </h1>

              <p>
                These Terms & Conditions explain the rules and
                responsibilities that apply when you access or use
                the AB Public School website and its online services.
              </p>

              <div className="abterms-meta">

                <div>
                  <strong>01</strong>
                  <span>Read</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Understand</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Use Responsibly</span>
                </div>

              </div>

            </div>

            <div className="abterms-contract">

              <div className="abterms-contract-icon">
                <FaFileContract />
              </div>

              <span>AB PUBLIC SCHOOL</span>

              <h3>
                Terms of Use
              </h3>

              <div className="abterms-contract-line"></div>

              <p>
                Please read these terms carefully before using
                our website.
              </p>

              <div className="abterms-contract-footer">
                <span>VERSION</span>
                <strong>2026.1</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="abterms-intro">

        <div className="abterms-container">

          <div className="abterms-intro-grid">

            <div className="abterms-intro-icon">
              <FaBalanceScale />
            </div>

            <div>
              <span>PLEASE READ CAREFULLY</span>

              <h2>
                Using Our Website Means Accepting These Terms.
              </h2>

              <p>
                By accessing or using the AB Public School website,
                you agree to follow these Terms & Conditions. If you
                do not agree with any part of these terms, please
                discontinue use of the website.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="abterms-content">

        <div className="abterms-container">

          <div className="abterms-layout">

            {/* SIDEBAR */}

            <aside className="abterms-sidebar">

              <span>CONTENTS</span>

              <a href="#acceptance">
                Acceptance of Terms
              </a>

              <a href="#website">
                Website Use
              </a>

              <a href="#information">
                Information Accuracy
              </a>

              <a href="#admission">
                Admissions
              </a>

              <a href="#intellectual">
                Intellectual Property
              </a>

              <a href="#thirdparty">
                Third-Party Links
              </a>

              <a href="#availability">
                Website Availability
              </a>

              <a href="#responsibility">
                User Responsibility
              </a>

              <a href="#changes">
                Changes to Terms
              </a>

              <a href="#contact">
                Contact Us
              </a>

            </aside>


            {/* ARTICLE */}

            <div className="abterms-article">

              {/* 01 */}

              <article id="acceptance">

                <div className="abterms-number">
                  01
                </div>

                <div>
                  <h2>
                    Acceptance of Terms
                  </h2>

                  <p>
                    By accessing this website, you acknowledge that
                    you have read, understood and agree to be bound
                    by these Terms & Conditions and any applicable
                    policies published on the website.
                  </p>

                  <div className="abterms-note">
                    <FaCheckCircle />

                    <span>
                      Please review these terms before submitting
                      any online enquiry or application.
                    </span>
                  </div>
                </div>

              </article>


              {/* 02 */}

              <article id="website">

                <div className="abterms-number">
                  02
                </div>

                <div>
                  <h2>
                    Website Use
                  </h2>

                  <p>
                    The website is provided primarily to share
                    information about AB Public School, its
                    academics, admissions, activities, facilities,
                    notices and other school-related services.
                  </p>

                  <p>
                    Users agree not to misuse the website, interfere
                    with its operation, attempt unauthorised access
                    or use the website for unlawful purposes.
                  </p>
                </div>

              </article>


              {/* 03 */}

              <article id="information">

                <div className="abterms-number">
                  03
                </div>

                <div>
                  <h2>
                    Information Accuracy
                  </h2>

                  <p>
                    We make reasonable efforts to keep information
                    on the website accurate and useful. However,
                    school schedules, notices, fees, admission
                    requirements, events and other information may
                    change from time to time.
                  </p>

                  <p>
                    Users should confirm important information with
                    the school before relying on it for official
                    decisions.
                  </p>
                </div>

              </article>


              {/* 04 */}

              <article id="admission">

                <div className="abterms-number">
                  04
                </div>

                <div>
                  <h2>
                    Admissions & Applications
                  </h2>

                  <p>
                    Submission of an online admission enquiry or
                    application does not automatically guarantee
                    admission.
                  </p>

                  <p>
                    Admission decisions, eligibility, documentation,
                    fee requirements and seat availability remain
                    subject to the school's applicable policies and
                    procedures.
                  </p>

                  <div className="abterms-warning">

                    <FaExclamationTriangle />

                    <span>
                      Please provide truthful and complete information
                      in all admission or enquiry forms.
                    </span>

                  </div>
                </div>

              </article>


              {/* 05 */}

              <article id="intellectual">

                <div className="abterms-number">
                  05
                </div>

                <div>
                  <h2>
                    Intellectual Property
                  </h2>

                  <p>
                    Unless otherwise stated, website content
                    including text, logos, graphics, images,
                    design elements and school materials belongs
                    to or is used by AB Public School with
                    appropriate rights.
                  </p>

                  <div className="abterms-feature">

                    <FaCopyright />

                    <div>
                      <strong>
                        Respect Our Content
                      </strong>

                      <span>
                        Content should not be copied, reproduced,
                        modified or redistributed without
                        appropriate permission.
                      </span>
                    </div>

                  </div>
                </div>

              </article>


              {/* 06 */}

              <article id="thirdparty">

                <div className="abterms-number">
                  06
                </div>

                <div>
                  <h2>
                    Third-Party Links
                  </h2>

                  <p>
                    Our website may contain links to external
                    websites or services for convenience or
                    informational purposes.
                  </p>

                  <p>
                    AB Public School is not responsible for the
                    content, availability, privacy practices or
                    policies of third-party websites.
                  </p>
                </div>

              </article>


              {/* 07 */}

              <article id="availability">

                <div className="abterms-number">
                  07
                </div>

                <div>
                  <h2>
                    Website Availability
                  </h2>

                  <p>
                    We aim to keep the website available and
                    functioning properly. However, temporary
                    interruptions may occur because of maintenance,
                    technical issues, hosting problems or circumstances
                    beyond our reasonable control.
                  </p>
                </div>

              </article>


              {/* 08 */}

              <article id="responsibility">

                <div className="abterms-number">
                  08
                </div>

                <div>
                  <h2>
                    User Responsibility
                  </h2>

                  <div className="abterms-responsibility-grid">

                    <div>
                      <FaUserCheck />

                      <strong>
                        Provide Accurate Information
                      </strong>

                      <span>
                        Information submitted through forms
                        should be truthful and current.
                      </span>
                    </div>

                    <div>
                      <FaGlobe />

                      <strong>
                        Use Responsibly
                      </strong>

                      <span>
                        Do not use the website for unlawful,
                        harmful or abusive activities.
                      </span>
                    </div>

                  </div>

                </div>

              </article>


              {/* 09 */}

              <article id="changes">

                <div className="abterms-number">
                  09
                </div>

                <div>
                  <h2>
                    Changes to These Terms
                  </h2>

                  <p>
                    AB Public School may update these Terms &
                    Conditions when necessary to reflect changes
                    in website functionality, school services,
                    policies or applicable requirements.
                  </p>

                  <p>
                    Updated terms will be posted on this page
                    with an appropriate revision date.
                  </p>
                </div>

              </article>


              {/* 10 */}

              <article id="contact">

                <div className="abterms-number">
                  10
                </div>

                <div>
                  <h2>
                    Contact Us
                  </h2>

                  <p>
                    If you have any questions about these Terms &
                    Conditions, please contact the school.
                  </p>

                  <div className="abterms-contact">

                    <div className="abterms-contact-icon">
                      <FaEnvelope />
                    </div>

                    <div>
                      <span>
                        GENERAL ENQUIRIES
                      </span>

                      <a href="mailto:info@abpublicschool.edu.in">
                        info@abpublicschool.edu.in
                      </a>

                      <small>
                        AB Public School
                      </small>
                    </div>

                  </div>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abterms-cta">

        <div className="abterms-container">

          <div className="abterms-cta-inner">

            <div>

              <span>
                NEED MORE INFORMATION?
              </span>

              <h2>
                We're Always Happy To Help.
              </h2>

              <p>
                Contact our school team if you have questions
                about admissions, academics or school policies.
              </p>

            </div>

            <Link
              to="/contact"
              className="abterms-cta-button"
            >
              Contact School
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
};

export default TermsConditions;