import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaEnvelope,
  FaInfoCircle,
  FaDatabase,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="abprivacy-page">

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abprivacy-hero">

        <div className="abprivacy-hero-pattern"></div>

        <div className="abprivacy-container">

          <div className="abprivacy-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>

          <div className="abprivacy-hero-grid">

            <div className="abprivacy-hero-content">

              <span className="abprivacy-eyebrow">
                <span></span>
                PRIVACY & TRUST
              </span>

              <h1>
                Your Privacy
                <br />
                <em>Matters To Us.</em>
              </h1>

              <p>
                At AB Public School, we respect your privacy and are
                committed to protecting the personal information shared
                with us through our website and school services.
              </p>

              <div className="abprivacy-updated">
                <FaCheckCircle />
                <span>Last Updated: September 2026</span>
              </div>

            </div>

            <div className="abprivacy-hero-card">

              <div className="abprivacy-shield">
                <FaShieldAlt />
              </div>

              <h3>
                Safe. Secure. Responsible.
              </h3>

              <p>
                We handle student, parent and visitor information
                with care, transparency and responsibility.
              </p>

              <div className="abprivacy-security-points">

                <div>
                  <FaLock />
                  <span>Secure Information</span>
                </div>

                <div>
                  <FaUserShield />
                  <span>Respect For Privacy</span>
                </div>

                <div>
                  <FaDatabase />
                  <span>Responsible Data Use</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="abprivacy-intro">

        <div className="abprivacy-container">

          <div className="abprivacy-intro-box">

            <div className="abprivacy-intro-icon">
              <FaInfoCircle />
            </div>

            <div>
              <span>OUR COMMITMENT</span>

              <h2>
                Protecting Your Information With Care.
              </h2>

              <p>
                This Privacy Policy explains how AB Public School
                may collect, use, store and protect information when
                you visit our website, contact the school, submit an
                enquiry, apply for admission or use any online service
                provided through this website.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POLICY CONTENT
      ===================================================== */}

      <section className="abprivacy-content">

        <div className="abprivacy-container">

          <div className="abprivacy-layout">

            {/* SIDEBAR */}

            <aside className="abprivacy-sidebar">

              <span>QUICK OVERVIEW</span>

              <a href="#information">
                Information We Collect
              </a>

              <a href="#use">
                How We Use Information
              </a>

              <a href="#sharing">
                Information Sharing
              </a>

              <a href="#security">
                Data Security
              </a>

              <a href="#children">
                Children's Privacy
              </a>

              <a href="#cookies">
                Cookies
              </a>

              <a href="#rights">
                Your Rights
              </a>

              <a href="#contact">
                Contact Us
              </a>

            </aside>


            {/* MAIN CONTENT */}

            <div className="abprivacy-article">

              {/* 01 */}

              <article id="information">

                <div className="abprivacy-section-number">
                  01
                </div>

                <div>
                  <h2>
                    Information We Collect
                  </h2>

                  <p>
                    We may collect information that you voluntarily
                    provide when interacting with our school website
                    or contacting the school.
                  </p>

                  <ul>
                    <li>
                      Student or parent/guardian name
                    </li>

                    <li>
                      Contact information such as phone number
                      and email address
                    </li>

                    <li>
                      Information submitted through admission
                      or enquiry forms
                    </li>

                    <li>
                      Information required to respond to your
                      questions or requests
                    </li>

                    <li>
                      Basic website usage information where
                      applicable
                    </li>
                  </ul>
                </div>

              </article>


              {/* 02 */}

              <article id="use">

                <div className="abprivacy-section-number">
                  02
                </div>

                <div>
                  <h2>
                    How We Use Your Information
                  </h2>

                  <p>
                    Information provided to the school may be used
                    for legitimate educational, administrative and
                    communication purposes, including:
                  </p>

                  <div className="abprivacy-check-grid">

                    <div>
                      <FaCheckCircle />
                      <span>
                        Responding to enquiries
                      </span>
                    </div>

                    <div>
                      <FaCheckCircle />
                      <span>
                        Processing admission enquiries
                      </span>
                    </div>

                    <div>
                      <FaCheckCircle />
                      <span>
                        Communicating school updates
                      </span>
                    </div>

                    <div>
                      <FaCheckCircle />
                      <span>
                        Improving website experience
                      </span>
                    </div>

                  </div>
                </div>

              </article>


              {/* 03 */}

              <article id="sharing">

                <div className="abprivacy-section-number">
                  03
                </div>

                <div>
                  <h2>
                    Information Sharing
                  </h2>

                  <p>
                    AB Public School does not intend to sell or
                    commercially trade personal information submitted
                    through this website.
                  </p>

                  <p>
                    Information may be shared only where reasonably
                    necessary to provide a requested service, fulfil
                    an administrative requirement, comply with
                    applicable law, or protect the safety and rights
                    of students, parents, staff and the school.
                  </p>
                </div>

              </article>


              {/* 04 */}

              <article id="security">

                <div className="abprivacy-section-number">
                  04
                </div>

                <div>
                  <h2>
                    Data Security
                  </h2>

                  <p>
                    We take reasonable administrative and technical
                    measures to protect information from unauthorised
                    access, misuse, alteration or disclosure.
                  </p>

                  <div className="abprivacy-highlight">

                    <FaLock />

                    <p>
                      While we take appropriate precautions, no
                      internet transmission or electronic storage
                      system can be guaranteed to be completely
                      secure.
                    </p>

                  </div>
                </div>

              </article>


              {/* 05 */}

              <article id="children">

                <div className="abprivacy-section-number">
                  05
                </div>

                <div>
                  <h2>
                    Children's Privacy
                  </h2>

                  <p>
                    As a school website, some information may relate
                    to students. We encourage parents and guardians
                    to ensure that information submitted online is
                    accurate, appropriate and shared only through
                    authorised school channels.
                  </p>

                  <p>
                    Student information is handled for legitimate
                    educational and administrative purposes and
                    with appropriate care.
                  </p>
                </div>

              </article>


              {/* 06 */}

              <article id="cookies">

                <div className="abprivacy-section-number">
                  06
                </div>

                <div>
                  <h2>
                    Cookies & Website Technologies
                  </h2>

                  <p>
                    Our website may use cookies or similar
                    technologies to improve functionality, remember
                    preferences, understand website usage and
                    enhance the visitor experience.
                  </p>

                  <p>
                    You may be able to manage cookie preferences
                    through your browser settings.
                  </p>
                </div>

              </article>


              {/* 07 */}

              <article id="rights">

                <div className="abprivacy-section-number">
                  07
                </div>

                <div>
                  <h2>
                    Your Privacy Rights
                  </h2>

                  <p>
                    Depending on applicable law, you may have rights
                    relating to the personal information you provide,
                    including requesting clarification about how
                    information is used or asking us to correct
                    inaccurate information.
                  </p>

                  <p>
                    To make a privacy-related request, please contact
                    the school using the contact details provided
                    below.
                  </p>
                </div>

              </article>


              {/* 08 */}

              <article id="contact">

                <div className="abprivacy-section-number">
                  08
                </div>

                <div>
                  <h2>
                    Contact Us
                  </h2>

                  <p>
                    If you have any questions about this Privacy
                    Policy or how your information is handled,
                    please contact AB Public School.
                  </p>

                  <div className="abprivacy-contact-card">

                    <div className="abprivacy-contact-icon">
                      <FaEnvelope />
                    </div>

                    <div>
                      <span>
                        PRIVACY ENQUIRIES
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
          BOTTOM CTA
      ===================================================== */}

      <section className="abprivacy-cta">

        <div className="abprivacy-container">

          <div className="abprivacy-cta-inner">

            <div>
              <span>
                HAVE A QUESTION?
              </span>

              <h2>
                We're Here To Help.
              </h2>

              <p>
                If you have any questions regarding privacy,
                admissions or school services, feel free to
                contact us.
              </p>
            </div>

            <Link
              to="/contact"
              className="abprivacy-cta-button"
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

export default PrivacyPolicy;