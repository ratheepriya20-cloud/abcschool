import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaStar,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Events.css";
import event1 from "../assets/drama.jpg";
import event2 from "../assets/dance.jpg";
import event3 from "../assets/music.jpg";
import event4 from "../assets/student-art.jpg";
import event5 from "../assets/festival.jpg";
import event6 from "../assets/student-cultural.jpg";


const events = [
  {
    id: 1,
    image: event1,
    date: "15",
    month: "APR",
    title: "Annual Sports Meet",
    category: "Sports",
    time: "9:00 AM - 3:00 PM",
    location: "School Sports Ground",
    description:
      "An exciting day of athletics, team games, competitions and unforgettable sporting moments.",
  },
  {
    id: 2,
    image: event2,
    date: "22",
    month: "APR",
    title: "Science Exhibition",
    category: "Academic",
    time: "10:00 AM - 2:00 PM",
    location: "Science Block",
    description:
      "Students showcase innovative projects, experiments and creative scientific ideas.",
  },
  {
    id: 3,
    image: event3,
    date: "05",
    month: "MAY",
    title: "Inter-School Debate",
    category: "Competition",
    time: "11:00 AM - 1:30 PM",
    location: "School Auditorium",
    description:
      "Young voices come together to discuss ideas, perspectives and important topics.",
  },
  {
    id: 4,
    image: event4,
    date: "18",
    month: "MAY",
    title: "Annual Cultural Fest",
    category: "Cultural",
    time: "4:00 PM - 7:00 PM",
    location: "Main Auditorium",
    description:
      "A colourful celebration of music, dance, art, traditions and student creativity.",
  },
  {
    id: 5,
    image: event5,
    date: "02",
    month: "JUN",
    title: "Parent Orientation",
    category: "Parents",
    time: "10:30 AM - 12:30 PM",
    location: "School Auditorium",
    description:
      "An interactive session designed to strengthen communication between parents and teachers.",
  },
  {
    id: 6,
    image: event6,
    date: "14",
    month: "JUN",
    title: "Art & Creativity Day",
    category: "Arts",
    time: "9:30 AM - 1:00 PM",
    location: "Activity Hall",
    description:
      "A creative celebration where students express their imagination through art and design.",
  },
];

const Events = () => {
  return (
    <>
      <Navbar />

      <main className="abevents-page">

        {/* ================= HERO ================= */}

        <section className="abevents-hero">

          <div className="abevents-orbit orbit-one"></div>
          <div className="abevents-orbit orbit-two"></div>
          <div className="abevents-dot dot-one"></div>
          <div className="abevents-dot dot-two"></div>

          <div className="abevents-container">

            <div className="abevents-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Events</strong>
            </div>

            <div className="abevents-hero-layout">

              <div className="abevents-hero-content">

                <span className="abevents-eyebrow">
                  <FaStar />
                  SCHOOL EVENTS & EXPERIENCES
                </span>

                <h1>
                  Moments That
                  <span>Bring Us Together.</span>
                </h1>

                <p>
                  From sports and competitions to cultural celebrations
                  and academic activities, discover the experiences that
                  make school life meaningful.
                </p>

                <div className="abevents-buttons">

                  <a href="#events" className="abevents-primary">
                    Explore Events
                    <FaArrowRight />
                  </a>

                  <Link to="/contact" className="abevents-secondary">
                    Contact School
                  </Link>

                </div>

              </div>

              <div className="abevents-hero-card">

                <div className="abevents-calendar-icon">
                  <FaCalendarAlt />
                </div>

                <span>UPCOMING</span>

                <h3>
                  Annual
                  <strong> Sports Meet</strong>
                </h3>

                <div className="abevents-mini-info">
                  <p>
                    <FaCalendarAlt />
                    15 April
                  </p>

                  <p>
                    <FaClock />
                    9:00 AM
                  </p>

                  <p>
                    <FaMapMarkerAlt />
                    School Ground
                  </p>
                </div>

                <div className="abevents-card-line"></div>

                <small>
                  Everyone is welcome to be part of the celebration.
                </small>

              </div>

            </div>

          </div>
        </section>


        {/* ================= INTRO ================= */}

        


        {/* ================= EVENTS GRID ================= */}

        <section className="abevents-section" id="events">

          <div className="abevents-container">

            <div className="abevents-heading">

              <div>
                <span>UPCOMING EVENTS</span>
                <h2>What's Happening?</h2>
              </div>

              <p>
                Explore our upcoming school activities and celebrations.
              </p>

            </div>


            <div className="abevents-grid">

              {events.map((event) => (

                <article className="abevent-card" key={event.id}>

                  <div className="abevent-image">

                    <img
                      src={event.image}
                      alt={event.title}
                    />

                    <div className="abevent-date">
                      <strong>{event.date}</strong>
                      <span>{event.month}</span>
                    </div>

                    <div className="abevent-category">
                      {event.category}
                    </div>

                  </div>


                  <div className="abevent-body">

                    <h3>{event.title}</h3>

                    <p>{event.description}</p>

                    <div className="abevent-details">

                      <span>
                        <FaClock />
                        {event.time}
                      </span>

                      <span>
                        <FaMapMarkerAlt />
                        {event.location}
                      </span>

                    </div>

                    <Link to="/contact" className="abevent-link">
                      Event Details
                      <FaArrowRight />
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* ================= COMMUNITY ================= */}

        <section className="abevents-community">

          <div className="abevents-container">

            <div className="abevents-community-box">

              <div className="abevents-community-icon">
                <FaUsers />
              </div>

              <div>

                <span>MORE THAN AN EVENT</span>

                <h2>
                  Every Event Creates
                  <strong> A Memory.</strong>
                </h2>

                <p>
                  We create opportunities where students,
                  teachers and families come together to celebrate,
                  learn and grow.
                </p>

              </div>

              <Link to="/activities">
                Explore Activities
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="abevents-cta">

          <div className="abevents-container">

            <div className="abevents-cta-inner">

              <span>BE PART OF OUR JOURNEY</span>

              <h2>
                Make Every
                <strong> Moment Count.</strong>
              </h2>

              <p>
                Stay connected with our school and never miss
                an important event or celebration.
              </p>

              <Link to="/contact">
                Get In Touch
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Events;