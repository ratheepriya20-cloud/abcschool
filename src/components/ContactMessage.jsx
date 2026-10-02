import React, { useState } from "react";

import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaClipboardList,
  FaCommentAlt,
  FaPaperPlane,
  FaArrowRight,
  FaCheckCircle,
  FaTimes,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";

import "./ContactMessage.css";

/* EXISTING DATA FILE */
import {
  addContactMessage,
} from "../data/contactMessagesData";


const ContactMessage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });


  /* =====================================================
     POPUP
  ===================================================== */

  const showPopup = (type, title, message) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "",
        title: "",
        message: "",
      });
    }, 3500);
  };


  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (name.length < 2) {
      showPopup(
        "error",
        "Enter Your Name",
        "Please enter your full name."
      );

      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showPopup(
        "error",
        "Invalid Phone Number",
        "Please enter a valid 10 digit mobile number."
      );

      return false;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showPopup(
        "error",
        "Invalid Email Address",
        "Please enter a valid email address."
      );

      return false;
    }

    if (!subject) {
      showPopup(
        "error",
        "Select Enquiry Type",
        "Please select what you need help with."
      );

      return false;
    }

    if (message.length < 10) {
      showPopup(
        "error",
        "Tell Us More",
        "Please enter at least 10 characters."
      );

      return false;
    }

    return true;
  };


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const savedMessage = addContactMessage({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    });

    if (!savedMessage) {
      showPopup(
        "error",
        "Enquiry Not Submitted",
        "Something went wrong. Please try again."
      );

      return;
    }

    showPopup(
      "success",
      "Enquiry Submitted",
      "Your enquiry has been sent to our school team."
    );

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };


  /* =====================================================
     GOOGLE MAP
  ===================================================== */

  const schoolAddress =
    "Jagdish Colony, Ramnagar, Rohtak, Haryana";

  const openDirections = () => {
    const mapUrl =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        schoolAddress
      )}`;

    window.open(
      mapUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <section  id="contact-enquiry" className="abContactConnect">

      <div className="abContactConnectDecor decorOne"></div>

      <div className="abContactConnectDecor decorTwo"></div>


      <div className="abContactConnectContainer">

        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <div className="abContactConnectHeading">

          <div className="abContactConnectLabel">

            <i></i>

            <span>
              CONTACT & VISIT
            </span>

            <i></i>

          </div>


          <h2>
            We&apos;re Here To{" "}
            <span>Help You</span>
          </h2>


          <p>
            Have a question about admissions, academics,
            fees, transport or campus visits? Send us your
            enquiry or use the map to find AB Public School.
          </p>

        </div>


        {/* =================================================
            FORM + MAP
        ================================================= */}

        <div className="abContactConnectGrid">

          {/* =================================================
              LEFT - MESSAGE FORM
          ================================================= */}

          <div className="abContactEnquiryCard">

            <div className="abContactFormHeader">

              <span>
                SEND YOUR ENQUIRY
              </span>

              <h3>
                How Can We Help?
              </h3>

              <p>
                Share your details and select the
                purpose of your enquiry.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* ROW 1 */}

              <div className="abContactFormRow">

                <div className="abContactField">

                  <FaUser />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    autoComplete="name"
                  />

                </div>


                <div className="abContactField">

                  <FaPhoneAlt />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength="10"
                  />

                </div>

              </div>


              {/* ROW 2 */}

              <div className="abContactFormRow">

                <div className="abContactField">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    autoComplete="email"
                  />

                </div>


                <div className="abContactField">

                  <FaClipboardList />

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >

                    <option value="">
                      What do you need help with? *
                    </option>

                    <option value="Admission Enquiry">
                      Admission Enquiry
                    </option>

                    <option value="Academic Information">
                      Academic Information
                    </option>

                    <option value="Fee Information">
                      Fee Information
                    </option>

                    <option value="Transport Enquiry">
                      Transport Enquiry
                    </option>

                    <option value="Campus Visit">
                      Campus Visit
                    </option>

                    <option value="Facilities & Activities">
                      Facilities & Activities
                    </option>

                    <option value="General Enquiry">
                      General Enquiry
                    </option>

                  </select>

                </div>

              </div>


              {/* MESSAGE */}

              <div className="abContactField abContactTextarea">

                <FaCommentAlt />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your enquiry here... *"
                  maxLength="350"
                ></textarea>


                <span className="abMessageCounter">
                  {formData.message.length}/350
                </span>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="abContactSubmit"
              >

                <FaPaperPlane />

                <span>
                  Submit Enquiry
                </span>

                <FaArrowRight />

              </button>

            </form>

          </div>


          {/* =================================================
              RIGHT - FULL MAP
          ================================================= */}

          <div className="abContactMapCard">

            <iframe
              title="AB Public School Location"
              src="https://www.google.com/maps?q=Jagdish%20Colony%20Ramnagar%20Rohtak%20Haryana&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>


            {/* SMALL MAP BUTTON ONLY */}

            <button
              type="button"
              className="abContactMapDirectionBtn"
              onClick={openDirections}
            >

              <FaDirections />

              <span>
                Get Directions
              </span>

              <FaArrowRight />

            </button>


            {/* SMALL PIN DECORATION */}

            <div className="abContactMapPin">
              <FaMapMarkerAlt />
            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          SUCCESS / ERROR POPUP
      ================================================= */}

      {popup.show && (

        <div
          className={`abContactSuccess ${popup.type}`}
        >

          <div className="abContactSuccessIcon">

            {popup.type === "error" ? (
              <FaExclamationTriangle />
            ) : (
              <FaCheckCircle />
            )}

          </div>


          <div>

            <strong>
              {popup.title}
            </strong>

            <span>
              {popup.message}
            </span>

          </div>


          <button
            type="button"
            aria-label="Close notification"
            onClick={() =>
              setPopup({
                show: false,
                type: "",
                title: "",
                message: "",
              })
            }
          >
            <FaTimes />
          </button>

        </div>

      )}

    </section>
  );
};

export default ContactMessage;