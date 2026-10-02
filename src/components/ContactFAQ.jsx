import React, { useState } from "react";

import {
  FaChevronDown,
  FaQuestionCircle,
  FaGraduationCap,
  FaFileAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaBus,
  FaComments,
  FaArrowRight,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

import "./ContactFAQ.css";


const ContactFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);


  /* =========================================================
     FAQ DATA
  ========================================================= */

  const faqData = [
    {
      icon: <FaGraduationCap />,

      question:
        "How can I enquire about admission?",

      answer:
        "You can submit the enquiry form on this page or contact the school office directly. Mention the class you are interested in so our admissions team can guide you about eligibility, availability and the next steps.",
    },

    {
      icon: <FaFileAlt />,

      question:
        "Which documents are required for admission?",

      answer:
        "Document requirements may vary by class. Parents are generally asked to keep the student's birth certificate, previous school records, photographs and relevant identity or address documents ready. The admissions team will confirm the final document list.",
    },

    {
      icon: <FaMoneyBillWave />,

      question:
        "How can I get the current fee information?",

      answer:
        "Select Fee Information in the enquiry form and mention the class you are enquiring about. The school team can then share the current fee structure, payment schedule and other applicable details.",
    },

    {
      icon: <FaMapMarkerAlt />,

      question:
        "Can parents visit the campus before admission?",

      answer:
        "Yes. Parents can visit the campus to understand the school environment, facilities and admission process. If you want to meet a specific department, contacting the school before your visit is recommended.",
    },

    {
      icon: <FaBus />,

      question:
        "How can I check transport availability in my area?",

      answer:
        "Choose Transport Enquiry in the contact form and mention your locality or route. The school team can check the available transport service and guide you with the relevant route information.",
    },

    {
      icon: <FaComments />,

      question:
        "What happens after I submit an enquiry?",

      answer:
        "Your enquiry is received by the school team along with your contact details, enquiry category and message. The relevant team can review your request and contact you using the phone number or email address you provided.",
    },
  ];


  /* =========================================================
     OPEN / CLOSE FAQ
  ========================================================= */

  const toggleFAQ = (index) => {
    setActiveIndex(
      activeIndex === index
        ? null
        : index
    );
  };


  /* =========================================================
     SCROLL TO CONTACT MESSAGE FORM
  ========================================================= */

  const goToEnquiry = () => {
    const contactForm =
      document.getElementById(
        "contact-enquiry"
      );

    if (contactForm) {
      contactForm.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
    <section className="abFaqSection">

      {/* DECORATION */}

      <div className="abFaqDecor decorLeft"></div>

      <div className="abFaqDecor decorRight"></div>


      <div className="abFaqContainer">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="abFaqHeader">

          <div className="abFaqEyebrow">

            <span></span>

            <p>
              FREQUENTLY ASKED QUESTIONS
            </p>

            <span></span>

          </div>


          <h2>
            Helpful Answers Before
           

            <span>
              You Contact Us
            </span>
          </h2>


          <p className="abFaqHeaderDescription">
            Find quick answers to the most common
            questions parents ask about admissions,
            fees, transport and campus visits.
          </p>

        </div>


        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div className="abFaqMain">

          {/* =================================================
              LEFT HELP CARD
          ================================================= */}

          <div className="abFaqHelpCard">

            {/* ICON */}

            <div className="abFaqHelpIcon">
              <FaQuestionCircle />
            </div>


            <span className="abFaqHelpLabel">
              NEED MORE HELP?
            </span>


            <h3>
              Your Question
              <br />

              Not Listed?
            </h3>


            <p>
              Send your question through our enquiry
              form. Select the relevant subject and
              share a few details so our school team
              can guide you correctly.
            </p>


            {/* FEATURES */}

            <div className="abFaqHelpPoints">

              <div>
                <FaCheckCircle />

                <span>
                  Select enquiry type
                </span>
              </div>


              <div>
                <FaCheckCircle />

                <span>
                  Share your question
                </span>
              </div>


              <div>
                <FaCheckCircle />

                <span>
                  School team reviews it
                </span>
              </div>

            </div>


            {/* BUTTON */}

            <button
              type="button"
              className="abFaqEnquiryBtn"
              onClick={goToEnquiry}
            >

              <FaPaperPlane />

              <span>
                Send Your Enquiry
              </span>

              <FaArrowRight />

            </button>


            {/* BOTTOM TEXT */}

            <div className="abFaqHelpFooter">

              <small>
                AB PUBLIC SCHOOL
              </small>

              <strong>
                Clear information.
                
                Helpful guidance.
              </strong>

            </div>

          </div>


          {/* =================================================
              RIGHT FAQ LIST
          ================================================= */}

          <div className="abFaqList">

            {faqData.map(
              (item, index) => {

                const isOpen =
                  activeIndex === index;

                return (
                  <div
                    key={index}
                    className={`abFaqItem ${
                      isOpen
                        ? "active"
                        : ""
                    }`}
                  >

                    {/* QUESTION */}

                    <button
                      type="button"
                      className="abFaqQuestion"
                      onClick={() =>
                        toggleFAQ(index)
                      }
                      aria-expanded={isOpen}
                    >

                      <div className="abFaqQuestionMain">

                        {/* NUMBER */}

                        <span className="abFaqNumber">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>


                        {/* ICON */}

                        <div className="abFaqItemIcon">
                          {item.icon}
                        </div>


                        {/* TEXT */}

                        <h3>
                          {item.question}
                        </h3>

                      </div>


                      {/* ARROW */}

                      <div
                        className={`abFaqChevron ${
                          isOpen
                            ? "open"
                            : ""
                        }`}
                      >
                        <FaChevronDown />
                      </div>

                    </button>


                    {/* ANSWER */}

                    <div
                      className={`abFaqAnswerWrapper ${
                        isOpen
                          ? "open"
                          : ""
                      }`}
                    >

                      <div className="abFaqAnswer">

                        <div className="abFaqAnswerAccent"></div>


                        <p>
                          {item.answer}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactFAQ;