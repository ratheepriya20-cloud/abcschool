import React, { useRef, useState } from "react";

import {
  FaQuoteLeft,
  FaStar,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";

import "./Testimonials.css";


/* =========================================================
   TESTIMONIAL DATA
========================================================= */

const testimonials = [
  {
    name: "Mrs. Neha Sharma",
    role: "Parent of Class X Student",
    initials: "NS",
    quote:
      "The teachers are very supportive and always encourage students to do their best.",
  },

  {
    name: "Mr. Rahul Verma",
    role: "Parent of Class VIII Student",
    initials: "RV",
    quote:
      "The school provides a balanced environment for academics, sports and overall development.",
  },

  {
    name: "Mrs. Pooja Mehta",
    role: "Parent of Class VI Student",
    initials: "PM",
    quote:
      "Communication between teachers and parents is excellent. The staff is caring and approachable.",
  },

  {
    name: "Mr. Amit Kapoor",
    role: "Parent of Class XII Student",
    initials: "AK",
    quote:
      "The academic guidance and discipline have helped my child become more focused and responsible.",
  },

  {
    name: "Mrs. Ritu Gupta",
    role: "Parent of Class IX Student",
    initials: "RG",
    quote:
      "My child has shown great improvement in confidence, communication and studies.",
  },

  {
    name: "Mr. Sanjay Malhotra",
    role: "Parent of Class VII Student",
    initials: "SM",
    quote:
      "The school gives equal importance to education, activities and values.",
  },
];


/* =========================================================
   TESTIMONIAL CARD
========================================================= */

const TestimonialCard = ({ item }) => {
  return (
    <article className="abpsTestimonialCard">

      {/* TOP */}

      <div className="abpsTestimonialCardTop">

        <div className="abpsTestimonialAvatar">
          {item.initials}
        </div>

        <div className="abpsTestimonialPerson">

          <h3>
            {item.name}
          </h3>

          <p>
            {item.role}
          </p>

        </div>


        <div className="abpsTestimonialQuote">
          <FaQuoteLeft />
        </div>

      </div>


      {/* STARS */}

      <div
        className="abpsTestimonialStars"
        aria-label="5 star rating"
      >
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>


      {/* TEXT */}

      <p className="abpsTestimonialText">
        “{item.quote}”
      </p>


      {/* DECORATION */}

      <div className="abpsTestimonialCardLine"></div>

    </article>
  );
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

const Testimonials = () => {

  /*
    Same content duplicate karna zaroori hai
    seamless infinite animation ke liye.
  */

  const firstRow = [
    ...testimonials,
    ...testimonials,
  ];

  const reversedTestimonials =
    [...testimonials].reverse();

  const secondRow = [
    ...reversedTestimonials,
    ...reversedTestimonials,
  ];


  /* =======================================================
     DRAG
  ======================================================= */

  const rowOneRef = useRef(null);
  const rowTwoRef = useRef(null);

  const dragData = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    row: null,
  });

  const [draggingRow, setDraggingRow] =
    useState(null);


  const startDrag = (
    event,
    rowElement,
    rowName
  ) => {

    if (!rowElement) return;

    /*
      Mouse ke sirf left button se drag.
    */

    if (
      event.type === "mousedown" &&
      event.button !== 0
    ) {
      return;
    }

    const clientX =
      event.type === "touchstart"
        ? event.touches[0].clientX
        : event.clientX;


    dragData.current = {
      active: true,
      startX: clientX,
      scrollLeft: rowElement.scrollLeft,
      row: rowElement,
    };

    setDraggingRow(rowName);
  };


  const moveDrag = (event) => {

    const data = dragData.current;

    if (
      !data.active ||
      !data.row
    ) {
      return;
    }


    const clientX =
      event.type === "touchmove"
        ? event.touches[0].clientX
        : event.clientX;


    const distance =
      clientX - data.startX;


    data.row.scrollLeft =
      data.scrollLeft - distance;


    /*
      IMPORTANT:
      Mouse drag me preventDefault okay hai,
      lekin touchmove me vertical page scroll
      ko block nahi karenge.
    */

    if (
      event.type === "mousemove" &&
      event.cancelable
    ) {
      event.preventDefault();
    }
  };


  const stopDrag = () => {

    dragData.current.active = false;
    dragData.current.row = null;

    setDraggingRow(null);
  };


  return (

    <section className="abpsTestimonials">

      {/* BACKGROUND DECORATIONS */}

      <div className="abpsTestimonialsGlow abpsTestimonialsGlowOne"></div>

      <div className="abpsTestimonialsGlow abpsTestimonialsGlowTwo"></div>

      <div className="abpsTestimonialsPattern"></div>


      <div className="abpsTestimonialsContainer">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="abpsTestimonialsHeader">

          <div className="abpsTestimonialsLabel">

            <span></span>

            WHAT OUR PARENTS SAY

            <span></span>

          </div>


          <h2>
            Stories From Our
            <span> School Community.</span>
          </h2>


          <p>
            Hear from parents who experience our commitment
            to learning, care, confidence and all-round
            development every day.
          </p>

        </div>


        {/* =================================================
            MARQUEE AREA
        ================================================= */}

        <div className="abpsTestimonialsMarquee">


          {/* LEFT FADE */}

          <div className="abpsTestimonialFade abpsFadeLeft"></div>


          {/* RIGHT FADE */}

          <div className="abpsTestimonialFade abpsFadeRight"></div>


          {/* ===============================================
              ROW 1
              LEFT → RIGHT
          =============================================== */}

          <div
            ref={rowOneRef}
            className={`abpsTestimonialsRow ${
              draggingRow === "row1"
                ? "isDragging"
                : ""
            }`}
            onMouseDown={(event) =>
              startDrag(
                event,
                rowOneRef.current,
                "row1"
              )
            }
            onMouseMove={moveDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={(event) =>
              startDrag(
                event,
                rowOneRef.current,
                "row1"
              )
            }
            onTouchMove={moveDrag}
            onTouchEnd={stopDrag}
            onTouchCancel={stopDrag}
          >

            <div className="abpsTestimonialsTrack abpsTrackToRight">

              {firstRow.map(
                (item, index) => (

                  <TestimonialCard
                    key={`row-one-${index}`}
                    item={item}
                  />

                )
              )}

            </div>

          </div>


          {/* ===============================================
              ROW 2
              RIGHT → LEFT
          =============================================== */}

          <div
            ref={rowTwoRef}
            className={`abpsTestimonialsRow ${
              draggingRow === "row2"
                ? "isDragging"
                : ""
            }`}
            onMouseDown={(event) =>
              startDrag(
                event,
                rowTwoRef.current,
                "row2"
              )
            }
            onMouseMove={moveDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={(event) =>
              startDrag(
                event,
                rowTwoRef.current,
                "row2"
              )
            }
            onTouchMove={moveDrag}
            onTouchEnd={stopDrag}
            onTouchCancel={stopDrag}
          >

            <div className="abpsTestimonialsTrack abpsTrackToLeft">

              {secondRow.map(
                (item, index) => (

                  <TestimonialCard
                    key={`row-two-${index}`}
                    item={item}
                  />

                )
              )}

            </div>

          </div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="abpsTestimonialsBottom">

          <div className="abpsTestimonialsTrust">

            <div className="abpsTrustIcon">
              <FaHeart />
            </div>

            <div>
              <strong>
                Every voice matters.
              </strong>

              <span>
                Building trust with families,
                one experience at a time.
              </span>
            </div>

          </div>


          <div className="abpsTestimonialsRating">

            <div className="abpsRatingStars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <div>
              <strong>
                Trusted by Parents
              </strong>

              <span>
                AB Public School Community
              </span>
            </div>

            <FaShieldAlt className="abpsRatingShield" />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;