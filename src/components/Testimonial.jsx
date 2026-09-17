
import React, { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Testimonials.css";

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

const TestimonialCard = ({ item }) => {
  return (
    <article className="simpleTestimonialCard">
      <div className="simpleTestimonialTop">
        <div className="simpleTestimonialAvatar">
          {item.initials}
        </div>

        <div className="simpleTestimonialInfo">
          <h3>{item.name}</h3>
          <p>{item.role}</p>
        </div>

        <div className="simpleTestimonialQuoteIcon">
          <FaQuoteLeft />
        </div>
      </div>

      <div className="simpleTestimonialStars" aria-label="5 star rating">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      <p className="simpleTestimonialText">
        “{item.quote}”
      </p>
    </article>
  );
};

const Testimonials = () => {
  const firstRow = [...testimonials, ...testimonials];
  const secondRow = [
    ...testimonials.slice().reverse(),
    ...testimonials.slice().reverse(),
  ];

  const sliderRef = useRef(null);
  const rowOneRef = useRef(null);
  const rowTwoRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const dragData = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    row: null,
  });

  const startDrag = (event, rowElement) => {
    if (!rowElement) return;

    const pageX =
      event.type === "touchstart"
        ? event.touches[0].pageX
        : event.pageX;

    dragData.current = {
      active: true,
      startX: pageX,
      scrollLeft: rowElement.scrollLeft,
      row: rowElement,
    };

    setIsDragging(true);
  };

  const moveDrag = (event) => {
    const data = dragData.current;

    if (!data.active || !data.row) return;

    const pageX =
      event.type === "touchmove"
        ? event.touches[0].pageX
        : event.pageX;

    const distance = pageX - data.startX;

    data.row.scrollLeft = data.scrollLeft - distance;

    if (event.cancelable) {
      event.preventDefault();
    }
  };

  const stopDrag = () => {
    dragData.current.active = false;
    dragData.current.row = null;
    setIsDragging(false);
  };

  const scrollRow = (rowRef, amount) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();

        slider.scrollLeft += event.deltaY;
      }
    };

    slider.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section className="simpleTestimonials">
      <div className="simpleTestimonialsGlow simpleTestimonialsGlowOne"></div>
      <div className="simpleTestimonialsGlow simpleTestimonialsGlowTwo"></div>

      <div className="simpleTestimonialsContainer">

        {/* HEADER */}
        <div className="simpleTestimonialsHeader">
          <span className="simpleTestimonialsLabel">
            WHAT OUR PARENTS SAY
          </span>

          <h2>
            Trusted by <span>Our School Community</span>
          </h2>

          <p>
            Real experiences from parents who trust us with their
            children's learning, growth and future.
          </p>
        </div>


        {/* SLIDER */}
        <div
          ref={sliderRef}
          className={`simpleTestimonialsSlider ${
            isDragging ? "simpleTestimonialsDragging" : ""
          }`}
        >

          {/* ROW 1 */}
          <div
            ref={rowOneRef}
            className="simpleTestimonialsRowScroller"
            onMouseDown={(event) =>
              startDrag(event, rowOneRef.current)
            }
            onMouseMove={moveDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={(event) =>
              startDrag(event, rowOneRef.current)
            }
            onTouchMove={moveDrag}
            onTouchEnd={stopDrag}
          >
            <div className="simpleTestimonialsTrack simpleTrackLeft">
              {firstRow.map((item, index) => (
                <TestimonialCard
                  key={`left-${item.name}-${index}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          {/* ROW 2 */}
          <div
            ref={rowTwoRef}
            className="simpleTestimonialsRowScroller"
            onMouseDown={(event) =>
              startDrag(event, rowTwoRef.current)
            }
            onMouseMove={moveDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={(event) =>
              startDrag(event, rowTwoRef.current)
            }
            onTouchMove={moveDrag}
            onTouchEnd={stopDrag}
          >
            <div className="simpleTestimonialsTrack simpleTrackRight">
              {secondRow.map((item, index) => (
                <TestimonialCard
                  key={`right-${item.name}-${index}`}
                  item={item}
                />
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM INFO */}
        <div className="simpleTestimonialsBottom">
          <div>
            <strong>Every voice matters.</strong>
            <span>
              Discover what our school community experiences every day.
            </span>
          </div>

          <div className="simpleTestimonialsBottomBadge">
            <span>★★★★★</span>
            <strong>Trusted by Parents</strong>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

