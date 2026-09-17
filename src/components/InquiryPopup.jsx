
import React, { useEffect, useState } from "react";

import {
  FaTimes,
  FaArrowRight,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaGraduationCap,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCommentDots,
  FaBriefcase,
} from "react-icons/fa";

import "./InquiryPopup.css";

const InquiryPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    className: "",
    description: "",
  });

  // Popup website open hone ke 1 second baad show hoga
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone me sirf numbers aur maximum 10 digits
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

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

  // Validation error popup
  const showValidationError = (title, message) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setShowError(true);
  };

  // Form validation
  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const description = formData.description.trim();

    // Name
    if (!name) {
      showValidationError(
        "Name Required",
        "Please enter your name."
      );
      return false;
    }

    if (name.length < 3) {
      showValidationError(
        "Invalid Name",
        "Name should contain at least 3 characters."
      );
      return false;
    }

    if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      showValidationError(
        "Invalid Name",
        "Please enter a valid name using letters only."
      );
      return false;
    }

    // Phone
    if (!phone) {
      showValidationError(
        "Phone Number Required",
        "Please enter your 10-digit phone number."
      );
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showValidationError(
        "Invalid Phone Number",
        "Please enter a valid 10-digit Indian mobile number."
      );
      return false;
    }

    // Inquiry type
    if (!formData.inquiryType) {
      showValidationError(
        "Inquiry Type Required",
        "Please select what you would like to enquire about."
      );
      return false;
    }

    // Class only for admission / existing student
    if (
      (formData.inquiryType === "New Admission" ||
        formData.inquiryType === "Existing Student") &&
      !formData.className
    ) {
      showValidationError(
        "Class Not Selected",
        "Please select the class related to your inquiry."
      );
      return false;
    }

    // Email optional but validate if entered
    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      showValidationError(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return false;
    }

    // Description
    if (!description) {
      showValidationError(
        "Description Required",
        "Please briefly describe your inquiry so our team can assist you."
      );
      return false;
    }

    if (description.length < 10) {
      showValidationError(
        "Description Too Short",
        "Please provide a little more information about your inquiry."
      );
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!validateForm()) {
      return;
    }

    /*
      =========================================
      SAVE INQUIRY INTO LOCAL STORAGE
      =========================================
    */

    // Pehle se saved inquiries get karo
    const existingInquiries =
      JSON.parse(localStorage.getItem("schoolInquiries")) || [];

    // New inquiry object
    const newInquiry = {
      id: `INQ-${Date.now()}`,

      name: formData.name.trim(),

      phone: formData.phone.trim(),

      email: formData.email.trim(),

      inquiryType: formData.inquiryType,

      className: formData.className,

      description: formData.description.trim(),

      submittedAt: new Date().toLocaleString("en-IN"),

      timestamp: Date.now(),
    };

    // New inquiry ko existing inquiries ke saath add karo
    const updatedInquiries = [
      ...existingInquiries,
      newInquiry,
    ];

    // Local Storage me save
    localStorage.setItem(
      "schoolInquiries",
      JSON.stringify(updatedInquiries)
    );

    // Success screen
    setSubmitted(true);

    // 2.5 second baad popup close
    setTimeout(() => {
      setShowPopup(false);
      setSubmitted(false);

      setFormData({
        name: "",
        phone: "",
        email: "",
        inquiryType: "",
        className: "",
        description: "",
      });
    }, 2500);
  };

  // Close main popup
  const closeMainPopup = () => {
    setShowPopup(false);
    setShowError(false);
  };

  // Agar popup show nahi hai
  if (!showPopup) {
    return null;
  }

  // Class field show/hide
  const showClassField =
    formData.inquiryType === "New Admission" ||
    formData.inquiryType === "Existing Student";

  return (
    <div className="abinq-overlay">

      <div className="abinq-modal">

        {/* Close Button */}
        <button
          type="button"
          className="abinq-close"
          onClick={closeMainPopup}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="abinq-top">

          <div className="abinq-badge">
            <FaGraduationCap />
          </div>

          <div>
            <span className="abinq-small-title">
              SCHOOL INQUIRY
            </span>

            <h2>How Can We Help?</h2>
          </div>

        </div>

        {!submitted ? (
          <>
            {/* Description */}
            <p className="abinq-description">
              Whether you are a parent, student, teacher, staff
              member, or visitor, share your inquiry and our
              school team will get in touch with you.
            </p>

            {/* Form */}
            <form
              className="abinq-form"
              onSubmit={handleSubmit}
              noValidate
            >

              {/* Name */}
              <div className="abinq-field">

                <FaUser />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  autoComplete="name"
                />

              </div>

              {/* Phone + Email */}
              <div className="abinq-row">

                <div className="abinq-field">

                  <FaPhoneAlt />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength="10"
                  />

                </div>

                <div className="abinq-field">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* Inquiry Type */}
              <div className="abinq-field">

                <FaBriefcase />

                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >

                  <option value="">
                    What is your inquiry about?
                  </option>

                  <option value="New Admission">
                    New Admission
                  </option>

                  <option value="Existing Student">
                    Existing Student
                  </option>

                  <option value="Teacher / Job Inquiry">
                    Teacher / Job Inquiry
                  </option>

                  <option value="Fee Related">
                    Fee Related
                  </option>

                  <option value="Transport">
                    Transport
                  </option>

                  <option value="School Facilities">
                    School Facilities
                  </option>

                  <option value="General Inquiry">
                    General Inquiry
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* Class */}
              {showClassField && (
                <div className="abinq-field">

                  <FaGraduationCap />

                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Class
                    </option>

                    <option value="Nursery">
                      Nursery
                    </option>

                    <option value="LKG">
                      LKG
                    </option>

                    <option value="UKG">
                      UKG
                    </option>

                    <option value="1">
                      Class 1
                    </option>

                    <option value="2">
                      Class 2
                    </option>

                    <option value="3">
                      Class 3
                    </option>

                    <option value="4">
                      Class 4
                    </option>

                    <option value="5">
                      Class 5
                    </option>

                    <option value="6">
                      Class 6
                    </option>

                    <option value="7">
                      Class 7
                    </option>

                    <option value="8">
                      Class 8
                    </option>

                    <option value="9">
                      Class 9
                    </option>

                    <option value="10">
                      Class 10
                    </option>

                    <option value="11">
                      Class 11
                    </option>

                    <option value="12">
                      Class 12
                    </option>

                  </select>

                </div>
              )}

              {/* Description */}
              <div className="abinq-field abinq-textarea-field">

                <FaCommentDots />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry..."
                  rows="3"
                  maxLength="500"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="abinq-submit"
              >

                <span>Send Inquiry</span>

                <FaArrowRight />

              </button>

            </form>

            {/* Footer */}
            <div className="abinq-footer">

              <span></span>

              <p>
                Our school team will review your inquiry and
                contact you shortly.
              </p>

              <span></span>

            </div>
          </>
        ) : (

          /* Success */
          <div className="abinq-success">

            <div className="abinq-success-icon">
              <FaCheckCircle />
            </div>

            <h3>
              Inquiry Submitted!
            </h3>

            <p>
              Thank you for contacting AB Public School.
              Our concerned team member will contact you
              shortly regarding your inquiry.
            </p>

          </div>

        )}

        {/* Error Popup */}
        {showError && (

          <div className="abinq-error-overlay">

            <div className="abinq-error-box">

              <button
                type="button"
                className="abinq-error-close"
                onClick={() => setShowError(false)}
              >
                <FaTimes />
              </button>

              <div className="abinq-error-icon">
                <FaExclamationTriangle />
              </div>

              <h3>
                {errorTitle}
              </h3>

              <p>
                {errorMessage}
              </p>

              <button
                type="button"
                className="abinq-error-btn"
                onClick={() => setShowError(false)}
              >
                Okay
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default InquiryPopup;
