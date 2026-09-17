
import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showPopup = (type, title, message) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "",
      title: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showPopup("error", "Name Required", "Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      showPopup("error", "Email Required", "Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showPopup("error", "Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim()) {
      showPopup("error", "Phone Required", "Please enter your phone number.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      showPopup("error", "Invalid Phone", "Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.subject.trim()) {
      showPopup("error", "Subject Required", "Please enter a subject.");
      return;
    }

    if (!formData.message.trim()) {
      showPopup("error", "Message Required", "Please enter your message.");
      return;
    }

    showPopup(
      "success",
      "Message Sent Successfully",
      "Thank you for contacting AB Public School. Our team will get back to you shortly."
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
    <Navbar />
    <div className="abs-contact-page">
      

      <main>
        <section className="abs-contact-hero">
          <div className="abs-contact-hero-overlay"></div>

          <div className="abs-contact-hero-content">
            <span className="abs-contact-eyebrow">GET IN TOUCH</span>
            <h1>Contact Our School</h1>
            <p>
              We are always happy to hear from parents, students and our
              school community.
            </p>
          </div>
        </section>

        <section className="abs-contact-info-section">
          <div className="abs-contact-container">
            <div className="abs-contact-heading">
              <span>CONNECT WITH US</span>
              <h2>We’re Here to Help</h2>
              <p>
                Have a question about admissions, academics or school
                activities? Reach out to us through any of the options below.
              </p>
            </div>

            <div className="abs-contact-cards">
              <a
                href="mailto:info@abpublicschool.com"
                className="abs-contact-card"
              >
                <div className="abs-contact-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <span>Email Us</span>
                  <h3>info@abpublicschool.com</h3>
                  <p>Send us an email anytime</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="abs-contact-card"
              >
                <div className="abs-contact-icon">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span>Call Us</span>
                  <h3>+91 98765 43210</h3>
                  <p>Speak with our school team</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Jagjidh+Colony%2C+Ramnagar%2C+Rohtak%2C+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="abs-contact-card"
              >
                <div className="abs-contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span>Visit Us</span>
                  <h3>Jagjidh Colony, Ramnagar</h3>
                  <p>Rohtak, Haryana</p>
                </div>
              </a>

              <div className="abs-contact-card abs-contact-hours-card">
                <div className="abs-contact-icon">
                  <FaClock />
                </div>
                <div>
                  <span>School Office</span>
                  <h3>Mon - Sat</h3>
                  <p>8:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="abs-contact-main-section">
          <div className="abs-contact-container abs-contact-main-grid">
            <div className="abs-contact-form-box">
              <div className="abs-contact-form-heading">
                <span>SEND AN ENQUIRY</span>
                <h2>Let’s Start a Conversation</h2>
                <p>
                  Fill in the details below and our school team will contact
                  you soon.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="abs-contact-form-row">
                  <div className="abs-contact-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="abs-contact-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="abs-contact-form-row">
                  <div className="abs-contact-field">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                    />
                  </div>

                  <div className="abs-contact-field">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                <div className="abs-contact-field">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" className="abs-contact-submit">
                  Send Message
                  <FaPaperPlane />
                </button>
              </form>
            </div>

            <div className="abs-contact-map-box">
              <div className="abs-contact-map-heading">
                <span>OUR LOCATION</span>
                <h2>Find Us on the Map</h2>
                <p>Jagjidh Colony, Ramnagar, Rohtak, Haryana</p>
              </div>

              <div className="abs-contact-map">
                <iframe
                  title="AB Public School Location"
                  src="https://www.google.com/maps?q=Jagjidh%20Colony%2C%20Ramnagar%2C%20Rohtak%2C%20Haryana&output=embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Jagjidh+Colony%2C+Ramnagar%2C+Rohtak%2C+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="abs-contact-direction-btn"
              >
                <FaMapMarkerAlt />
                Open Location in Google Maps
              </a>
            </div>
          </div>
        </section>

        <section className="abs-contact-bottom">
          <div className="abs-contact-bottom-content">
            <span>AB PUBLIC SCHOOL</span>
            <h2>Building Bright Futures Together</h2>
            <p>
              For admissions, enquiries and school information, our team is
              always ready to assist you.
            </p>

            <div className="abs-contact-bottom-actions">
              <a href="tel:+919876543210">
                <FaPhoneAlt />
                Call School
              </a>

              <a href="mailto:info@abpublicschool.com">
                <FaEnvelope />
                Email School
              </a>
            </div>
          </div>
        </section>
      </main>

     

      {popup.show && (
        <div className="abs-contact-popup-overlay">
          <div className={`abs-contact-popup ${popup.type}`}>
            <div className="abs-contact-popup-icon">
              {popup.type === "success" ? "✓" : "!"}
            </div>

            <h3>{popup.title}</h3>
            <p>{popup.message}</p>

            <button onClick={closePopup}>Continue</button>
          </div>
        </div>
      )}
    </div> <Footer />
    </>
  );
};

export default Contact;

