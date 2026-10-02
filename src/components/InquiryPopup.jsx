import React, {
  useState,
} from "react";

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

import {
  addInquiry,
} from "../data/inquiriesData";


const initialForm = {
  name: "",
  phone: "",
  email: "",
  inquiryType: "",
  className: "",
  description: "",
};


const InquiryPopup = ({
  onClose,
}) => {

  const [formData, setFormData] =
    useState(initialForm);

  const [showError, setShowError] =
    useState(false);

  const [errorTitle, setErrorTitle] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    // Phone - numbers only
    if (name === "phone") {

      const onlyNumbers =
        value
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


    // Inquiry type change hone par
    // unnecessary class clear
    if (
      name === "inquiryType" &&
      value !== "New Admission" &&
      value !== "Existing Student"
    ) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: value,
        className: "",
      }));
    }
  };


  // ==========================================
  // ERROR POPUP
  // ==========================================

  const showValidationError = (
    title,
    message
  ) => {

    setErrorTitle(title);
    setErrorMessage(message);
    setShowError(true);
  };


  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {

    const name =
      formData.name.trim();

    const phone =
      formData.phone.trim();

    const email =
      formData.email.trim();

    const description =
      formData.description.trim();


    // NAME
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


    if (
      !/^[A-Za-z\s.'-]+$/.test(
        name
      )
    ) {

      showValidationError(
        "Invalid Name",
        "Please enter a valid name using letters only."
      );

      return false;
    }


    // PHONE
    if (!phone) {

      showValidationError(
        "Phone Number Required",
        "Please enter your 10-digit phone number."
      );

      return false;
    }


    if (
      !/^[6-9]\d{9}$/.test(
        phone
      )
    ) {

      showValidationError(
        "Invalid Phone Number",
        "Please enter a valid 10-digit Indian mobile number."
      );

      return false;
    }


    // INQUIRY TYPE
    if (!formData.inquiryType) {

      showValidationError(
        "Inquiry Type Required",
        "Please select what you would like to enquire about."
      );

      return false;
    }


    // CLASS
    const needsClass =
      formData.inquiryType ===
        "New Admission" ||
      formData.inquiryType ===
        "Existing Student";


    if (
      needsClass &&
      !formData.className
    ) {

      showValidationError(
        "Class Not Selected",
        "Please select the class related to your inquiry."
      );

      return false;
    }


    // EMAIL OPTIONAL
    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {

      showValidationError(
        "Invalid Email",
        "Please enter a valid email address."
      );

      return false;
    }


    // DESCRIPTION
    if (!description) {

      showValidationError(
        "Description Required",
        "Please briefly describe your inquiry so our team can assist you."
      );

      return false;
    }


    if (
      description.length < 10
    ) {

      showValidationError(
        "Description Too Short",
        "Please provide a little more information about your inquiry."
      );

      return false;
    }


    return true;
  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (e) => {

    e.preventDefault();


    if (isSubmitting) {
      return;
    }


    if (!validateForm()) {
      return;
    }


    setIsSubmitting(true);


    try {

      // --------------------------------------
      // CENTRAL DATA FILE
      // --------------------------------------

      addInquiry({
        name:
          formData.name.trim(),

        phone:
          formData.phone.trim(),

        email:
          formData.email
            .trim()
            .toLowerCase(),

        inquiryType:
          formData.inquiryType,

        className:
          formData.className,

        description:
          formData.description.trim(),
      });


      // SUCCESS
      setSubmitted(true);


      // Clear form
      setFormData(initialForm);


      // Success screen show karne ke baad close
      setTimeout(() => {

        setSubmitted(false);

        if (
          typeof onClose ===
          "function"
        ) {
          onClose();
        }

      }, 2500);


    } catch (error) {

      console.error(
        "Inquiry submit error:",
        error
      );


      showValidationError(
        "Unable to Submit",
        "Something went wrong while submitting your inquiry. Please try again."
      );


    } finally {

      setIsSubmitting(false);

    }
  };


  // ==========================================
  // CLOSE
  // ==========================================

  const closeMainPopup = () => {

    setShowError(false);

    if (
      typeof onClose ===
      "function"
    ) {
      onClose();
    }
  };


  // ==========================================
  // CONDITIONAL CLASS FIELD
  // ==========================================

  const showClassField =
    formData.inquiryType ===
      "New Admission" ||
    formData.inquiryType ===
      "Existing Student";


  return (

    <div
      className="abinq-overlay"
      role="presentation"
    >

      <div
        className="abinq-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >

        {/* ===============================
            CLOSE
        =============================== */}

        <button
          type="button"
          className="abinq-close"
          onClick={closeMainPopup}
          aria-label="Close inquiry form"
        >
          <FaTimes />
        </button>


        {/* ===============================
            HEADER
        =============================== */}

        <div className="abinq-top">

          <div className="abinq-badge">
            <FaGraduationCap />
          </div>


          <div>

            <span className="abinq-small-title">
              SCHOOL INQUIRY
            </span>

            <h2 id="inquiry-title">
              How Can We Help?
            </h2>

          </div>

        </div>


        {!submitted ? (

          <>

            {/* DESCRIPTION */}

            <p className="abinq-description">
              Whether you are a parent,
              student, teacher, staff member,
              or visitor, share your inquiry
              and our school team will get in
              touch with you.
            </p>


            {/* ===========================
                FORM
            =========================== */}

            <form
              className="abinq-form"
              onSubmit={handleSubmit}
              noValidate
            >


              {/* NAME */}

              <div className="abinq-field">

                <FaUser />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  autoComplete="name"
                  maxLength={60}
                />

              </div>


              {/* PHONE + EMAIL */}

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
                    maxLength={10}
                  />

                </div>


                <div className="abinq-field">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address (Optional)"
                    autoComplete="email"
                    maxLength={100}
                  />

                </div>

              </div>


              {/* INQUIRY TYPE */}

              <div className="abinq-field">

                <FaBriefcase />

                <select
                  name="inquiryType"
                  value={
                    formData.inquiryType
                  }
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


              {/* CLASS */}

              {showClassField && (

                <div className="abinq-field">

                  <FaGraduationCap />

                  <select
                    name="className"
                    value={
                      formData.className
                    }
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

                    {Array.from(
                      { length: 12 },
                      (_, index) => {

                        const classNumber =
                          index + 1;

                        return (
                          <option
                            key={
                              classNumber
                            }
                            value={`Class ${classNumber}`}
                          >
                            Class{" "}
                            {classNumber}
                          </option>
                        );
                      }
                    )}

                  </select>

                </div>

              )}


              {/* DESCRIPTION */}

              <div
                className="
                  abinq-field
                  abinq-textarea-field
                "
              >

                <FaCommentDots />

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry..."
                  rows={4}
                  maxLength={500}
                />

                <span className="abinq-character-count">
                  {
                    formData
                      .description
                      .length
                  }
                  /500
                </span>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="abinq-submit"
                disabled={isSubmitting}
              >

                <span>
                  {isSubmitting
                    ? "Submitting..."
                    : "Send Inquiry"}
                </span>

                {!isSubmitting && (
                  <FaArrowRight />
                )}

              </button>

            </form>


            {/* FOOTER */}

            <div className="abinq-footer">

              <span />

              <p>
                Your inquiry will be
                securely forwarded to
                our school administration
                team.
              </p>

              <span />

            </div>

          </>

        ) : (

          /* =============================
             SUCCESS
          ============================= */

          <div className="abinq-success">

            <div className="abinq-success-icon">
              <FaCheckCircle />
            </div>

            <span className="abinq-success-label">
              SUBMITTED SUCCESSFULLY
            </span>

            <h3>
              Inquiry Received!
            </h3>

            <p>
              Thank you for contacting
              AB Public School. Your
              inquiry has been forwarded
              to our administration team.
            </p>

          </div>

        )}


        {/* ===============================
            ERROR POPUP
        =============================== */}

        {showError && (

          <div className="abinq-error-overlay">

            <div
              className="abinq-error-box"
              role="alertdialog"
              aria-modal="true"
            >

              <button
                type="button"
                className="abinq-error-close"
                onClick={() =>
                  setShowError(false)
                }
                aria-label="Close error"
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
                onClick={() =>
                  setShowError(false)
                }
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