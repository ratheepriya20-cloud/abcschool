import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUsers,
  FaGraduationCap,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";

import "./Footer.css";

/* ================================
   AB PUBLIC SCHOOL LOGO
================================ */
import abLogo from "../assets/ab-logo.png";

/* Existing school image */
import footerCampus from "../assets/facility-cta.jpg";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Facilities", path: "/facilities" },
    { name: "Gallery", path: "/gallery" },
    { name: "News & Notices", path: "/news-notices" },
    { name: "Contact", path: "/contact" },
  ];

  const activityLinks = [
    { name: "Sports", path: "/sports" },
    { name: "Cultural", path: "/cultural-activities" },
    { name: "Competitions", path: "/competitions" },
    { name: "Educational Trips", path: "/educational-trips" },
  ];

  

  const goTo = (path) => {
    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openSocial = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="abf-footer">

      {/* EXISTING CAMPUS IMAGE */}
      <div
        className="abf-campus-bg"
        style={{
          backgroundImage: `url(${footerCampus})`,
        }}
      />

      <div className="abf-container">

        <div className="abf-main">

          {/* =====================================
              BRAND
          ===================================== */}

          <div className="abf-brand">

            <div className="abf-brand-top">

              <img
                src={abLogo}
                alt="AB Public School Logo"
                className="abf-logo"
              />

              <div className="abf-school-name">

                <h2>
                  AB PUBLIC SCHOOL
                </h2>

                <div className="abf-tagline">
                  <span />
                  <strong>Nurturing Excellence</strong>
                  <span />
                </div>

              </div>

            </div>

            <p>
              A safe, inclusive and inspiring environment
              where every child can learn, grow and achieve
              their dreams.
            </p>

            <div className="abf-socials">

              <button
                className="facebook"
                aria-label="Facebook"
                onClick={() =>
                  openSocial("https://www.facebook.com/")
                }
              >
                <FaFacebookF />
              </button>

              <button
                className="instagram"
                aria-label="Instagram"
                onClick={() =>
                  openSocial("https://www.instagram.com/")
                }
              >
                <FaInstagram />
              </button>

              <button
                className="youtube"
                aria-label="YouTube"
                onClick={() =>
                  openSocial("https://www.youtube.com/")
                }
              >
                <FaYoutube />
              </button>

              <button
                className="linkedin"
                aria-label="LinkedIn"
                onClick={() =>
                  openSocial("https://www.linkedin.com/")
                }
              >
                <FaLinkedinIn />
              </button>

            </div>

          </div>


          {/* =====================================
              QUICK LINKS
          ===================================== */}

          <FooterColumn title="Quick Links">

            {quickLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => goTo(item.path)}
              >
                {item.name}
                <FaChevronRight />
              </button>
            ))}

          </FooterColumn>


          {/* =====================================
              ACTIVITIES
          ===================================== */}

          <FooterColumn title="Activities">

            {activityLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => goTo(item.path)}
              >
                {item.name}
                <FaChevronRight />
              </button>
            ))}

          </FooterColumn>


          {/* =====================================
              USEFUL
          ===================================== */}



          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <div className="abf-right">

            {/* LOGIN */}

            <div className="abf-login">

              <FooterTitle title="Login Access" />

              <div className="abf-login-row">

                <button
                  className="abf-login-card parent"
                  onClick={() => goTo("/parent/signup")}
                >
                  <span className="abf-login-icon">
                    <FaUsers />
                  </span>

                  <span>
                    <small>PARENT PORTAL</small>
                    <strong>Parent Login</strong>
                  </span>

                  <FaArrowRight className="abf-login-arrow" />
                </button>


                <button
                  className="abf-login-card student"
                  onClick={() => goTo("/student/signup")}
                >
                  <span className="abf-login-icon">
                    <FaGraduationCap />
                  </span>

                  <span>
                    <small>STUDENT PORTAL</small>
                    <strong>Student Login</strong>
                  </span>

                  <FaArrowRight className="abf-login-arrow" />
                </button>

              </div>

            </div>


            {/* CONTACT */}

            <div className="abf-contact">

              <FooterTitle title="Contact Us" />

              <div className="abf-contact-grid">

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jagdish+Colony+Ramnagar+Rohtak+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="abf-contact-icon gold">
                    <FaMapMarkerAlt />
                  </span>

                  <span>
                    Jagdish Colony, Ramnagar,
                    <br />
                    Rohtak, Haryana
                  </span>
                </a>


                <a href="tel:+911234567890">
                  <span className="abf-contact-icon navy">
                    <FaPhoneAlt />
                  </span>

                  <span>
                    +91 12345 67890
                    <br />
                    +91 98765 43210
                  </span>
                </a>


                <a href="mailto:info@abpublicschool.edu.in">
                  <span className="abf-contact-icon sky">
                    <FaEnvelope />
                  </span>

                  <span>
                    info@abpublicschool.edu.in
                  </span>
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="abf-bottom">

        <div className="abf-container abf-bottom-inner">

          <p>
            © 2026 AB Public School. All Rights Reserved.
          </p>


          <div className="abf-bottom-center">
            <span />
            <strong>A School for a Brighter Tomorrow</strong>
            <span />
          </div>


          <div className="abf-bottom-right">

            <button onClick={() => goTo("/privacy-policy")}>
              Privacy Policy
            </button>

            <i />

            <button onClick={() => goTo("/terms-conditions")}>
              Terms & Conditions
            </button>

            <button
              className="abf-top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
            >
              <FaArrowUp />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};


/* =========================================
   REUSABLE COLUMN
========================================= */

const FooterColumn = ({ title, children }) => {
  return (
    <div className="abf-column">

      <FooterTitle title={title} />

      <div className="abf-links">
        {children}
      </div>

    </div>
  );
};


/* =========================================
   REUSABLE HEADING
========================================= */

const FooterTitle = ({ title }) => {
  return (
    <div className="abf-heading">

      <h3>{title}</h3>

      <span />

    </div>
  );
};

export default Footer;