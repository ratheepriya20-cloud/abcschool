import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";

import "./ContactHero.css";

import contactHeroImage from "../assets/facility-hero.jpg";

const ContactHero = () => {
  const openMap = () => {
    const address =
      "Jagdish Colony, Ramnagar, Rohtak, Haryana";

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  const makeCall = () => {
    window.location.href = "tel:+919999123456";
  };

  const sendEmail = () => {
    window.location.href =
      "mailto:info@abpublicschool.com?subject=Enquiry%20-%20AB%20Public%20School";
  };

  return (
    <section className="abContactHero">
      {/* ================= BACKGROUND ================= */}
      <div className="abContactHeroBg">
        <div className="abContactHeroCream"></div>
        <div className="abContactHeroNavyShape"></div>
        <div className="abContactHeroGoldShape"></div>
      </div>

      {/* ================= MAIN HERO ================= */}
      <div className="abContactHeroContainer">

        {/* LEFT CONTENT */}
        <div className="abContactHeroContent">

          <div className="abContactHeroLabel">
            <span className="abContactLabelLine"></span>

            <span>GET IN TOUCH</span>
          </div>

          <h1>
            Contact <span>Us</span>
          </h1>

          <p className="abContactHeroDescription">
            We are always here to listen, support and assist you.
            Feel free to reach out for admissions, enquiries or any
            information about our school.
          </p>

          {/* BENEFITS */}
          <div className="abContactBenefits">

            <div className="abContactBenefit">
              <div className="abContactBenefitIcon">
                <FaUsers />
              </div>

              <div>
                <strong>Friendly</strong>
                <span>Support</span>
              </div>
            </div>

            <div className="abContactBenefitDivider"></div>

            <div className="abContactBenefit">
              <div className="abContactBenefitIcon">
                <FaClock />
              </div>

              <div>
                <strong>Quick</strong>
                <span>Response</span>
              </div>
            </div>

            <div className="abContactBenefitDivider"></div>

            <div className="abContactBenefit">
              <div className="abContactBenefitIcon">
                <FaShieldAlt />
              </div>

              <div>
                <strong>Reliable</strong>
                <span>Information</span>
              </div>
            </div>

            <div className="abContactBenefitDivider"></div>

            <div className="abContactBenefit">
              <div className="abContactBenefitIcon navy">
                <FaGraduationCap />
              </div>

              <div>
                <strong>Brighter</strong>
                <span>Future</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="abContactHeroVisual">

          <div className="abContactImageWrap">
            <img
              src={contactHeroImage}
              alt="AB Public School Campus"
            />

            <div className="abContactImageOverlay"></div>

            {/* SCHOOL NAME */}
            <div className="abContactSchoolName">
              <small>WELCOME TO</small>
              <strong>AB PUBLIC SCHOOL</strong>
            </div>

            {/* MOTTO */}
            <div className="abContactMotto">
              <span>INSPIRE</span>
              <span>LEARN</span>
              <span>GROW</span>
            </div>
          </div>

          <div className="abContactVisualCurve"></div>
        </div>

      </div>

      {/* ================= CONTACT CARDS ================= */}
      <div className="abContactCardsWrapper">

        <div className="abContactCards">

          {/* DIRECTIONS */}
          <button
            type="button"
            className="abContactCard"
            onClick={openMap}
          >
            <div className="abContactCardIcon gold">
              <FaMapMarkerAlt />
            </div>

            <div className="abContactCardContent">
              <span>VISIT OUR CAMPUS</span>

              <h3>Get Directions</h3>

              <p>
                Jagdish Colony, Ramnagar
                <br />
                Rohtak, Haryana
              </p>
            </div>

            <div className="abContactCardArrow">
              <FaArrowRight />
            </div>
          </button>


          {/* CALL */}
          <button
            type="button"
            className="abContactCard"
            onClick={makeCall}
          >
            <div className="abContactCardIcon navy">
              <FaPhoneAlt />
            </div>

            <div className="abContactCardContent">
              <span>TALK TO US</span>

              <h3>Call Us</h3>

              <p>+91 99991 23456</p>
            </div>

            <div className="abContactCardArrow">
              <FaArrowRight />
            </div>
          </button>


          {/* EMAIL */}
          <button
            type="button"
            className="abContactCard"
            onClick={sendEmail}
          >
            <div className="abContactCardIcon gold">
              <FaEnvelope />
            </div>

            <div className="abContactCardContent">
              <span>EMAIL US</span>

              <h3>Send an Email</h3>

              <p>info@abpublicschool.com</p>
            </div>

            <div className="abContactCardArrow">
              <FaArrowRight />
            </div>
          </button>

        </div>
      </div>


      {/* ================= BOTTOM TEXT ================= */}
      <div className="abContactBottom">
        <span></span>

        <p>
          LET&apos;S BUILD A BRIGHTER TOMORROW TOGETHER.
        </p>

        <span></span>
      </div>
    </section>
  );
};

export default ContactHero;