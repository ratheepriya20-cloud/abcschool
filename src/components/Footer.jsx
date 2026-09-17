import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaUserShield,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = {
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  };

  const openSocial = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="absx-footer">

      {/* TOP WAVE */}
      <div className="absx-footer-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
        >
          <path d="M0,70 C180,135 330,5 520,55 C710,105 820,135 1010,55 C1190,-5 1320,35 1440,75 L1440,150 L0,150 Z" />
        </svg>
      </div>

      {/* DECORATIVE ELEMENTS */}
      <span className="absx-footer-star absx-footer-star-one">
        ✦
      </span>

      <span className="absx-footer-star absx-footer-star-two">
        ✧
      </span>

      <span className="absx-footer-star absx-footer-star-three">
        ✦
      </span>

      <span className="absx-footer-circle absx-footer-circle-one"></span>
      <span className="absx-footer-circle absx-footer-circle-two"></span>

      {/* MAIN FOOTER */}
      <div className="absx-footer-main">

        <div className="absx-footer-container">

          {/* ADMISSION CTA */}
          <div className="absx-footer-cta">

            <div className="absx-footer-cta-content">

              <span className="absx-footer-cta-label">
                ADMISSIONS 2026–27
              </span>

              <h2>
                Give Your Child a Brighter
                <span> Tomorrow.</span>
              </h2>

              <p>
                Begin a journey of learning, values, confidence and
                excellence at AB Public School.
              </p>

            </div>

            <button
              className="absx-footer-apply-btn"
              onClick={() => goTo("/admission")}
            >
              <span>Apply for Admission</span>
              <FaArrowRight />
            </button>

          </div>

          {/* FOOTER GRID */}
          <div className="absx-footer-grid">

            {/* BRAND */}
            <div className="absx-footer-brand">

              <button
                className="absx-footer-logo"
                onClick={() => goTo("/")}
              >

                <span className="absx-footer-logo-box">
                  AB
                </span>

                <span className="absx-footer-logo-text">
                  <strong>
                    AB Public School
                  </strong>

                  <small>
                    LEARN • GROW • EXCEL
                  </small>
                </span>

              </button>

              <p className="absx-footer-description">
                Nurturing young minds with knowledge, values,
                confidence and excellence for a brighter future.
              </p>

              {/* SOCIAL */}
              <div className="absx-footer-social-title">
                Connect With Us
              </div>

              <div className="absx-footer-social">

                <button
                  type="button"
                  className="absx-social-btn"
                  onClick={() =>
                    openSocial(socialLinks.facebook)
                  }
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FaFacebookF />
                </button>

                <button
                  type="button"
                  className="absx-social-btn"
                  onClick={() =>
                    openSocial(socialLinks.linkedin)
                  }
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <FaLinkedinIn />
                </button>

                <button
                  type="button"
                  className="absx-social-btn"
                  onClick={() =>
                    openSocial(socialLinks.instagram)
                  }
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <FaInstagram />
                </button>

                <button
                  type="button"
                  className="absx-social-btn"
                  onClick={() =>
                    openSocial(socialLinks.youtube)
                  }
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <FaYoutube />
                </button>

              </div>

            </div>

            {/* EXPLORE */}
            <div className="absx-footer-column">

              <h3>
                Explore
              </h3>

              <div className="absx-footer-link-list">

                <button onClick={() => goTo("/")}>
                  Home
                </button>

                <button onClick={() => goTo("/about")}>
                  About School
                </button>

                <button onClick={() => goTo("/academics")}>
                  Academics
                </button>

                <button onClick={() => goTo("/teachers")}>
                  Our Teachers
                </button>

                <button onClick={() => goTo("/gallery")}>
                  Gallery
                </button>

              </div>

            </div>

            {/* SCHOOL */}
            <div className="absx-footer-column">

              <h3>
                School
              </h3>

              <div className="absx-footer-link-list">

                <button onClick={() => goTo("/admission")}>
                  Admissions
                </button>

                <button onClick={() => goTo("/notices")}>
                  Notices
                </button>

                <button onClick={() => goTo("/events")}>
                  Events
                </button>

                <button onClick={() => goTo("/contact")}>
                  Contact Us
                </button>

              </div>

              <button
                className="absx-footer-admin"
                onClick={() => goTo("/admin-login")}
              >
                <FaUserShield />
                <span>Admin Login</span>
              </button>

            </div>

            {/* CONTACT */}
            <div className="absx-footer-contact">

              <h3>
                Get In Touch
              </h3>

              <div className="absx-contact-list">

                <div className="absx-contact-item">

                  <span className="absx-contact-icon">
                    <FaMapMarkerAlt />
                  </span>

                  <p>
                    Shiksha Bharti Vidyalaya,
                    <br />
                    Ram Nagar, Rohtak, Haryana
                  </p>

                </div>

                <a
                  className="absx-contact-item absx-contact-link"
                  href="tel:+911262000000"
                >

                  <span className="absx-contact-icon">
                    <FaPhoneAlt />
                  </span>

                  <span>
                    +91 1262 000 000
                  </span>

                </a>

                <a
                  className="absx-contact-item absx-contact-link"
                  href="mailto:info@school.edu.in"
                >

                  <span className="absx-contact-icon">
                    <FaEnvelope />
                  </span>

                  <span>
                    info@school.edu.in
                  </span>

                </a>

              </div>

              <button
                className="absx-footer-contact-btn"
                onClick={() => goTo("/contact")}
              >
                Contact School
                <FaArrowRight />
              </button>

            </div>

          </div>

          {/* DIVIDER */}
          <div className="absx-footer-divider"></div>

          {/* BOTTOM */}
          <div className="absx-footer-bottom">

            <p>
              © {new Date().getFullYear()}{" "}
              <strong>AB Public School</strong>.
              All Rights Reserved.
            </p>

            <div className="absx-footer-legal">

              <button
                onClick={() => goTo("/privacy")}
              >
                Privacy Policy
              </button>

              <span>•</span>

              <button
                onClick={() => goTo("/terms")}
              >
                Terms & Conditions
              </button>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;