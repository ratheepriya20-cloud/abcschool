import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventsSection.css";

import event1 from "../assets/event-annual-function.jpg";
import event2 from "../assets/event-sports-day.jpg";
import event3 from "../assets/event-science-exhibition.jpg";

const events = [
  {
    date: "15",
    month: "SEP",
    category: "CULTURAL",
    title: "Annual Cultural Celebration",
    text: "A vibrant celebration of talent, culture, creativity and student performances.",
    image: event1,
  },
  {
    date: "28",
    month: "SEP",
    category: "SPORTS",
    title: "Annual Sports Day",
    text: "An exciting day of teamwork, sportsmanship and healthy competition.",
    image: event2,
  },
  {
    date: "10",
    month: "OCT",
    category: "ACADEMICS",
    title: "Science & Innovation Exhibition",
    text: "Students showcase creative ideas, experiments and innovative projects.",
    image: event3,
  },
];

const EventsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="schoolEventsSection">

      <div className="eventsDecor eventsDecorOne"></div>
      <div className="eventsDecor eventsDecorTwo"></div>

      <div className="schoolEventsContainer">

        {/* HEADER */}
        <div className="eventsHeader">

          <div>
            <span className="eventsLabel">
              EVENTS & ACTIVITIES
            </span>

            <h2>
              Moments That
              <span>Become Memories.</span>
            </h2>
          </div>

          <div className="eventsHeaderRight">
            <p>
              From celebrations and competitions to exhibitions
              and special school days, there is always something
              exciting happening on our campus.
            </p>

            <button
              className="eventsTopButton"
              onClick={() => navigate("/events")}
            >
              All Events
              <span>↗</span>
            </button>
          </div>

        </div>


        {/* EVENTS */}
        <div className="eventsGrid">

          {events.map((event, index) => (
            <article
              className={`eventCard ${
                index === 0 ? "eventFeatured" : ""
              }`}
              key={event.title}
            >

              {/* IMAGE */}
              <div className="eventImage">

                <img
                  src={event.image}
                  alt={event.title}
                />

                <div className="eventImageOverlay"></div>

                <span className="eventCategory">
                  {event.category}
                </span>

                {/* DATE */}
                <div className="eventDate">

                  <strong>{event.date}</strong>

                  <span>{event.month}</span>

                </div>

              </div>


              {/* CONTENT */}
              <div className="eventContent">

                <span className="eventSmallTitle">
                  SCHOOL EVENT
                </span>

                <h3>{event.title}</h3>

                <p>{event.text}</p>

                <button
                  className="eventDetailsButton"
                  onClick={() =>
                    navigate("/events")
                  }
                >
                  View Details
                  <span>→</span>
                </button>

              </div>

            </article>
          ))}

        </div>


        {/* BOTTOM CTA */}
        <div className="eventsCTA">

          <div className="eventsCTALeft">

            <div className="eventsCTAIcon">
              ✦
            </div>

            <div>
              <span>
                STAY CONNECTED
              </span>

              <strong>
                Don't miss what's happening at school.
              </strong>
            </div>

          </div>

          <button
            onClick={() => navigate("/events")}
          >
            Explore All Events
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default EventsSection;