
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaNewspaper,
  FaTrophy,
  FaFlag,
  FaUsers,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./News.css";

const latestNews = [
  {
    id: 1,
    day: "21",
    month: "AUG",
    year: "2026",
    tag: "SPORTS",
    title: "37th Regional Sports Competition Begins",
    shortText:
      "Shiksha Bharti Vidyalaya hosted the 37th Regional Sports Competition with enthusiastic participation from students.",
    fullText:
      "Shiksha Bharti Vidyalaya proudly hosted the 37th Regional Sports Competition with enthusiastic participation from students across different sporting disciplines.",
    details: [
      "The competition provided students with an excellent opportunity to demonstrate their sporting abilities, discipline and confidence.",
      "Students participated enthusiastically and displayed excellent teamwork, determination and sportsmanship throughout the competition.",
      "The event created a positive environment where students could learn the importance of healthy competition, leadership and perseverance.",
      "The school congratulates all participating students for their dedication and outstanding sporting spirit.",
    ],
    icon: <FaTrophy />,
  },
  {
    id: 2,
    day: "15",
    month: "AUG",
    year: "2026",
    tag: "EVENT",
    title: "Independence Day Celebration",
    shortText:
      "Students celebrated Independence Day with cultural performances and patriotic activities.",
    fullText:
      "The school celebrated Independence Day with great enthusiasm, pride and patriotic spirit. Students and teachers came together to make the occasion memorable.",
    details: [
      "Students presented a variety of cultural performances and patriotic activities.",
      "The celebration encouraged students to understand the importance of freedom, unity and responsibility.",
      "The performances reflected the creativity, confidence and talent of our students.",
      "The school appreciates the efforts of all students and teachers who contributed to the successful celebration.",
    ],
    icon: <FaFlag />,
  },
  {
    id: 3,
    day: "10",
    month: "AUG",
    year: "2026",
    tag: "ACTIVITY",
    title: "Students Participate in School Activities",
    shortText:
      "Students showcased their creativity, talent and teamwork through different school activities.",
    fullText:
      "Students actively participated in a variety of school activities designed to encourage creativity, confidence, communication and teamwork.",
    details: [
      "Students explored their interests through activities beyond regular classroom learning.",
      "Different activities encouraged students to express their ideas and showcase their individual talents.",
      "Team-based activities helped students develop cooperation, communication and leadership skills.",
      "Such experiences contribute to creating a balanced and engaging learning environment for every student.",
    ],
    icon: <FaUsers />,
  },
];

const News = () => {
  const navigate = useNavigate();

  const [selectedNews, setSelectedNews] = useState(null);

  const openNews = (news) => {
    setSelectedNews(news);
    document.body.style.overflow = "hidden";
  };

  const closeNews = () => {
    setSelectedNews(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeNews();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="schoolNewsPage">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="schoolNewsHero">

          <div className="schoolNewsHeroOrb heroOrbOne"></div>
          <div className="schoolNewsHeroOrb heroOrbTwo"></div>

          <div className="schoolNewsHeroContent">

            

            <div className="schoolNewsEyebrow">
              <FaNewspaper />
              <span>SCHOOL NEWS & UPDATES</span>
            </div>

            <h1>
              News From
              <span> Our School</span>
            </h1>

            <p>
              Stay connected with the latest achievements, celebrations,
              events and memorable moments from our school community.
            </p>

            <div className="schoolNewsHeroBottom">
              <span></span>
              <strong>LEARN • ACHIEVE • CELEBRATE</strong>
              <span></span>
            </div>

          </div>

        </section>

        {/* =====================================================
            NEWS SECTION
        ====================================================== */}

        <section className="schoolNewsSection">

          <div className="schoolNewsContainer">

            <div className="schoolNewsHeading">

              <div className="schoolNewsHeadingMain">

                <span>FROM OUR CAMPUS</span>

                <h2>
                  Latest
                  <strong> News</strong>
                </h2>

              </div>

              <p>
                Explore what is happening across our school and
                discover the achievements and activities of our students.
              </p>

            </div>

            {/* NEWS CARDS */}

            <div className="schoolNewsGrid">

              {latestNews.map((news, index) => (

                <article
                  className="schoolNewsCard"
                  key={news.id}
                  onClick={() => openNews(news)}
                >

                  <div className="schoolNewsCardTop">

                    <div className="schoolNewsCardNumber">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="schoolNewsCardDate">
                      <FaCalendarAlt />
                      {news.day} {news.month} {news.year}
                    </div>

                    <div className="schoolNewsCardIcon">
                      {news.icon}
                    </div>

                  </div>

                  <div className="schoolNewsCardBody">

                    <span className="schoolNewsTag">
                      {news.tag}
                    </span>

                    <h3>{news.title}</h3>

                    <p>{news.shortText}</p>

                  </div>

                  <div className="schoolNewsCardBottom">

                    <span>
                      <FaCheckCircle />
                      School Update
                    </span>

                    <div className="schoolNewsCardArrow">
                      <FaArrowRight />
                    </div>

                  </div>

                  <div className="schoolNewsClickText">
                    Click to read full news
                  </div>

                </article>

              ))}

            </div>

            {/* =================================================
                CONNECT BOX
            ================================================== */}

            <div className="schoolNewsConnect">

              <div className="schoolNewsConnectIcon">
                <FaNewspaper />
              </div>

              <div className="schoolNewsConnectContent">

                <span>STAY CONNECTED</span>

                <h3>
                  Never miss a school update.
                </h3>

                <p>
                  Keep checking our latest news for achievements,
                  celebrations and important school activities.
                </p>

              </div>

              <button onClick={() => navigate("/contact")}>
                Contact School
                <FaArrowRight />
              </button>

            </div>

            <div className="schoolNewsBottom">

              <button onClick={() => navigate("/")}>
                <FaArrowLeft />
                Back to Home
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* =======================================================
          NEWS POPUP
      ======================================================== */}

      {selectedNews && (

        <div
          className="schoolNewsModalOverlay"
          onClick={closeNews}
        >

          <div
            className="schoolNewsModal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="schoolNewsModalHeader">

              <div className="schoolNewsModalIcon">
                {selectedNews.icon}
              </div>

              <button
                className="schoolNewsModalClose"
                onClick={closeNews}
                aria-label="Close news"
              >
                <FaTimes />
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="schoolNewsModalContent">

              <div className="schoolNewsModalMeta">

                <span className="schoolNewsModalTag">
                  {selectedNews.tag}
                </span>

                <span className="schoolNewsModalDate">
                  <FaCalendarAlt />
                  {selectedNews.day} {selectedNews.month}{" "}
                  {selectedNews.year}
                </span>

              </div>

              <h2>{selectedNews.title}</h2>

              <div className="schoolNewsModalLine"></div>

              <div className="schoolNewsModalIntro">
                {selectedNews.fullText}
              </div>

              <div className="schoolNewsModalDetails">

                {selectedNews.details.map((detail, index) => (

                  <div
                    className="schoolNewsModalDetail"
                    key={index}
                  >
                    <span>{index + 1}</span>
                    <p>{detail}</p>
                  </div>

                ))}

              </div>

              <div className="schoolNewsModalFooter">

                <span>
                  <FaCheckCircle />
                  Official School Update
                </span>

                <button onClick={closeNews}>
                  Close
                  <FaTimes />
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      <Footer />
    </>
  );
};

export default News;

