import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaNewspaper,
  FaBullhorn,
  FaAward,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LatestNews.css";

import news1 from "../assets/news-1.jpg";
import news2 from "../assets/news-2.jpg";
import news3 from "../assets/news-3.jpg";
import news4 from "../assets/news-4.jpg";
import news5 from "../assets/news-5.jpg";
import news6 from "../assets/news-6.jpg";

const news = [
  {
    id: 1,
    image: news1,
    date: "10 Sep 2026",
    category: "Achievement",
    title: "Our Students Shine at the Inter-School Championship",
    description:
      "Our talented students delivered an outstanding performance and brought pride to the school through dedication and teamwork.",
    featured: true,
  },
  {
    id: 2,
    image: news2,
    date: "07 Sep 2026",
    category: "Academic",
    title: "New Learning Initiatives Introduced",
    description:
      "The school introduces innovative learning experiences designed to make education more engaging and meaningful.",
  },
  {
    id: 3,
    image: news3,
    date: "03 Sep 2026",
    category: "Campus",
    title: "New Activity Spaces for Students",
    description:
      "Newly upgraded activity spaces provide students with more opportunities for creativity and collaboration.",
  },
  {
    id: 4,
    image: news4,
    date: "29 Aug 2026",
    category: "Students",
    title: "Students Participate in Community Drive",
    description:
      "Students actively participated in a community initiative promoting responsibility and social awareness.",
  },
  {
    id: 5,
    image: news5,
    date: "24 Aug 2026",
    category: "Faculty",
    title: "Faculty Development Programme Completed",
    description:
      "Teachers participated in a professional development programme focused on modern teaching practices.",
  },
  {
    id: 6,
    image: news6,
    date: "18 Aug 2026",
    category: "School",
    title: "Celebrating Another Milestone Together",
    description:
      "The school community celebrates another memorable milestone filled with learning and achievement.",
  },
];

const LatestNews = () => {
  return (
    <>
      <Navbar />

      <main className="abnews-page">

        {/* ================= HERO ================= */}

        <section className="abnews-hero">

          <div className="abnews-circle news-circle-one"></div>
          <div className="abnews-circle news-circle-two"></div>

          <div className="abnews-container">

            <div className="abnews-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Latest News</strong>
            </div>

            <div className="abnews-hero-grid">

              <div className="abnews-hero-content">

                <span className="abnews-eyebrow">
                  <FaNewspaper />
                  SCHOOL NEWSROOM
                </span>

                <h1>
                  Stories That
                  <span>Shape Our School.</span>
                </h1>

                <p>
                  Catch up on the latest achievements, announcements,
                  student stories and important updates from our
                  school community.
                </p>

                <a href="#latest-news" className="abnews-hero-btn">
                  Read Latest Stories
                  <FaArrowRight />
                </a>

              </div>


              <div className="abnews-newsletter-card">

                <div className="abnews-news-icon">
                  <FaBullhorn />
                </div>

                <span>LATEST UPDATE</span>

                <h3>
                  Stay Connected.
                  Stay Informed.
                </h3>

                <p>
                  Discover what's happening across our campus,
                  classrooms and student community.
                </p>

                <div className="abnews-card-bottom">
                  <span>Updated Regularly</span>
                  <FaArrowRight />
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= INTRO ================= */}

        <section className="abnews-intro">

          <div className="abnews-container">

            <div className="abnews-intro-grid">

              <div>
                <span className="abnews-label">
                  FROM OUR NEWSROOM
                </span>

                <h2>
                  What's New
                  <span> At School?</span>
                </h2>
              </div>

              <p>
                Explore the latest stories and updates that highlight
                the achievements, activities and growth of our
                students and school community.
              </p>

            </div>

          </div>

        </section>


        {/* ================= NEWS ================= */}

        <section className="abnews-section" id="latest-news">

          <div className="abnews-container">

            <div className="abnews-section-top">

              <div>
                <span>LATEST STORIES</span>
                <h2>School News</h2>
              </div>

              <div className="abnews-line"></div>

            </div>


            <div className="abnews-grid">

              {news.map((item) => (

                <article
                  className={`abnews-card ${
                    item.featured ? "featured-news" : ""
                  }`}
                  key={item.id}
                >

                  <div className="abnews-image">

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <span className="abnews-category">
                      {item.category}
                    </span>

                  </div>


                  <div className="abnews-content">

                    <div className="abnews-date">
                      <FaCalendarAlt />
                      {item.date}
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <Link
                      to={`/news/${item.id}`}
                      className="abnews-read"
                    >
                      Read Story
                      <FaArrowRight />
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* ================= ACHIEVEMENT ================= */}

        <section className="abnews-highlight">

          <div className="abnews-container">

            <div className="abnews-highlight-box">

              <div className="abnews-highlight-icon">
                <FaAward />
              </div>

              <div>

                <span>CELEBRATING SUCCESS</span>

                <h2>
                  Every Achievement
                  <strong> Has A Story.</strong>
                </h2>

                <p>
                  From classrooms to competitions, we celebrate
                  the dedication and achievements of our students.
                </p>

              </div>

              <Link to="/achievements">
                View Achievements
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="abnews-cta">

          <div className="abnews-container">

            <div className="abnews-cta-content">

              <span>STAY CONNECTED</span>

              <h2>
                Never Miss An
                <strong> Important Story.</strong>
              </h2>

              <p>
                Keep up with everything happening at our school
                and stay connected with our community.
              </p>

              <Link to="/contact">
                Contact School
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

export default LatestNews;