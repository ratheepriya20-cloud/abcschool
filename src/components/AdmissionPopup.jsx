import React, {
  useEffect,
  useState,
} from "react";

import {
  FaTimes,
  FaCommentDots,
  FaArrowRight,
} from "react-icons/fa";

import "./AdmissionPopup.css";

import admissionImage from "../assets/admission-popup.jpg";

const AdmissionPopup = ({
  onInquiryClick,
}) => {

  const [showPopup, setShowPopup] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // ===========================
  // CLOSE
  // ===========================

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowPopup(false);
  };

  // ===========================
  // INQUIRY
  // ===========================

  const handleInquiry = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("INQUIRY BUTTON CLICKED");

    // IMPORTANT:
    // Pehle parent ko bolo Inquiry open karo
    if (typeof onInquiryClick === "function") {
      onInquiryClick();
    } else {
      console.error(
        "onInquiryClick function nahi mili"
      );
    }

    // Admission popup close
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="admission-popup-wrapper">

      <div className="admission-popup-card">

        {/* IMAGE */}

        <img
          src={admissionImage}
          alt="AB Public School Admission"
          className="admission-popup-image"
          draggable="false"
        />

        {/* CLOSE */}

        <button
          type="button"
          className="admission-close-btn"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <FaTimes />
        </button>

        {/* INQUIRY */}

        <button
          type="button"
          className="admission-inquiry-btn"
          onClick={handleInquiry}
        >
          <FaCommentDots />

          <span>
            INQUIRY NOW
          </span>

          <FaArrowRight />
        </button>

      </div>

    </div>
  );
};

export default AdmissionPopup;