import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBell,
  FaNewspaper,
  FaTrophy,
  FaCalendarAlt,
  FaGraduationCap,
  FaBookOpen,
  FaFutbol,
  FaMusic,
  FaSearch,
  FaTimes,
  FaHome,
  FaEnvelope,
} from "react-icons/fa";

import "./NewsNotices.css";

/* IMAGES */

import sports1 from "../assets/sports-gallery-1.jpg";
import sports2 from "../assets/sports-gallery-2.jpg";
import sports3 from "../assets/sports-gallery-3.jpg";

import cultural2 from "../assets/cultural-dance.jpg";
import cultural3 from "../assets/cultural-art.jpg";

import trip1 from "../assets/trip-gallery-1.jpg";
import trip2 from "../assets/trip-gallery-2.jpg";

import campusImage from "../assets/facility-cta.jpg";
import heroImage from "../assets/facility-hero.jpg";


/* =========================================================
   NEWS
========================================================= */

const newsData = [
  {
    id: 1,
    date: "21 Aug 2026",
    category: "School Events",
    title: "ABPS Wins 37th Regional Sports Competition",
    excerpt:
      "Our talented students brought laurels to the school by winning multiple medals at the 37th Regional Sports Competition.",
    fullText:
      "Our talented students brought laurels to AB Public School by winning multiple medals at the 37th Regional Sports Competition held this month. The event saw participation from several schools across the region, and our students demonstrated exceptional skill, teamwork and determination.",
    image: sports1,
    tags: [
      "News",
      "Achievements",
      "Events",
      "Sports",
    ],
  },

  {
    id: 2,
    date: "15 Aug 2026",
    category: "School",
    title: "Independence Day Celebration",
    excerpt:
      "A grand celebration with patriotic performances, speeches and meaningful student participation.",
    fullText:
      "AB Public School celebrated Independence Day with great enthusiasm and patriotic spirit. Students participated in speeches, cultural performances and special presentations that highlighted freedom, responsibility and unity.",
    image: campusImage,
    tags: [
      "News",
      "Events",
    ],
  },

  {
    id: 3,
    date: "10 Aug 2026",
    category: "Cultural",
    title: "Creative Activities Week",
    excerpt:
      "Students showcased their talents in art, music, dance and drama during Creative Activities Week.",
    fullText:
      "Creative Activities Week provided students with opportunities to express themselves through music, dance, drama, art and literary activities.",
    image: cultural2,
    tags: [
      "News",
      "Events",
      "Cultural",
    ],
  },

  {
    id: 4,
    date: "02 Aug 2026",
    category: "Academics",
    title: "Educational Trip to Science Centre",
    excerpt:
      "Students explored interactive exhibits and learned through practical hands-on experiences.",
    fullText:
      "Students visited a science centre as part of the school's experiential learning programme. Interactive exhibits and demonstrations helped students connect classroom concepts with practical applications.",
    image: trip1,
    tags: [
      "News",
      "Academics",
    ],
  },

  {
    id: 5,
    date: "28 Jul 2026",
    category: "Sports",
    title: "Inter-House Football Tournament",
    excerpt:
      "Exciting matches and outstanding teamwork were seen during the Inter-House Football Tournament.",
    fullText:
      "The Inter-House Football Tournament brought energy and excitement to the school campus. Students represented their houses with enthusiasm while demonstrating teamwork, discipline and sportsmanship.",
    image: sports2,
    tags: [
      "News",
      "Sports",
      "Events",
    ],
  },

  {
    id: 6,
    date: "20 Jul 2026",
    category: "Cultural",
    title: "Young Artists Showcase Their Creativity",
    excerpt:
      "Students displayed beautiful artwork and creative projects prepared during school activities.",
    fullText:
      "The student art showcase celebrated imagination and creativity. Students presented drawings, paintings and craft projects created during cultural and classroom activities.",
    image: cultural3,
    tags: [
      "News",
      "Cultural",
    ],
  },

  {
    id: 7,
    date: "14 Jul 2026",
    category: "Academics",
    title: "Learning Beyond the Classroom",
    excerpt:
      "Students explored new places and gained meaningful real-world learning experiences.",
    fullText:
      "Educational visits give our students opportunities to observe, explore and understand concepts beyond textbooks.",
    image: trip2,
    tags: [
      "News",
      "Academics",
    ],
  },

  {
    id: 8,
    date: "08 Jul 2026",
    category: "Sports",
    title: "Students Shine in Basketball",
    excerpt:
      "Our students demonstrated teamwork and excellent sporting spirit during basketball activities.",
    fullText:
      "Basketball activities provided students with opportunities to improve coordination, fitness and teamwork.",
    image: sports3,
    tags: [
      "News",
      "Sports",
      "Achievements",
    ],
  },
];


/* =========================================================
   NOTICES
========================================================= */

const noticesData = [
  {
    id: 101,
    day: "09",
    month: "SEP",
    year: "2026",
    category: "Admissions",
    title: "Admission Applications Open for 2026–27",
    important: true,
    description:
      "Applications are now open for the academic session 2026–27. Parents are requested to complete the application process at the earliest.",
    tags: [
      "Notices",
      "Admissions",
    ],
  },

  {
    id: 102,
    day: "07",
    month: "SEP",
    year: "2026",
    category: "School",
    title: "Parent-Teacher Meeting Schedule Announced",
    important: false,
    description:
      "The Parent-Teacher Meeting will be held on 12 September 2026. Parents are requested to attend according to the communicated schedule.",
    tags: [
      "Notices",
      "Events",
      "Academics",
    ],
  },

  {
    id: 103,
    day: "05",
    month: "SEP",
    year: "2026",
    category: "Examination",
    title: "Half Yearly Examination Timetable Released",
    important: false,
    description:
      "The timetable for Half Yearly Examinations is now available. Students are advised to check the schedule and begin preparation.",
    tags: [
      "Notices",
      "Academics",
    ],
  },

  {
    id: 104,
    day: "03",
    month: "SEP",
    year: "2026",
    category: "Sports",
    title: "Sports Trials for Inter-School Competition",
    important: false,
    description:
      "Sports trials for the upcoming Inter-School Competition will be conducted from 5th to 8th September 2026.",
    tags: [
      "Notices",
      "Sports",
      "Events",
    ],
  },
];


/* =========================================================
   FILTERS
========================================================= */

const filters = [
  {
    name: "All Updates",
    icon: FaNewspaper,
  },
  {
    name: "News",
    icon: FaNewspaper,
  },
  {
    name: "Notices",
    icon: FaBell,
  },
  {
    name: "Achievements",
    icon: FaTrophy,
  },
  {
    name: "Events",
    icon: FaCalendarAlt,
  },
  {
    name: "Admissions",
    icon: FaGraduationCap,
  },
  {
    name: "Academics",
    icon: FaBookOpen,
  },
  {
    name: "Sports",
    icon: FaFutbol,
  },
  {
    name: "Cultural",
    icon: FaMusic,
  },
];


const NewsNotices = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] =
    useState("All Updates");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeNews, setActiveNews] =
    useState(null);

  const [activeNotice, setActiveNotice] =
    useState(null);

  const [email, setEmail] =
    useState("");


  /* =========================================================
     SEARCH MATCH
  ========================================================= */

  const matchesSearch = (
    values,
    search
  ) => {
    if (!search.trim()) return true;

    const normalizedSearch =
      search.toLowerCase();

    return values
      .filter(Boolean)
      .some((value) =>
        String(value)
          .toLowerCase()
          .includes(normalizedSearch)
      );
  };


  /* =========================================================
     FILTERED NEWS
  ========================================================= */

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const filterMatch =
        activeFilter === "All Updates" ||
        item.tags.includes(activeFilter);

      const searchMatch =
        matchesSearch(
          [
            item.title,
            item.category,
            item.excerpt,
            item.fullText,
            ...item.tags,
          ],
          searchTerm
        );

      return filterMatch && searchMatch;
    });
  }, [activeFilter, searchTerm]);


  /* =========================================================
     FILTERED NOTICES
  ========================================================= */

  const filteredNotices =
    useMemo(() => {
      return noticesData.filter(
        (item) => {
          const filterMatch =
            activeFilter ===
              "All Updates" ||
            item.tags.includes(
              activeFilter
            );

          const searchMatch =
            matchesSearch(
              [
                item.title,
                item.category,
                item.description,
                ...item.tags,
              ],
              searchTerm
            );

          return (
            filterMatch &&
            searchMatch
          );
        }
      );
    }, [activeFilter, searchTerm]);


  const totalResults =
    filteredNews.length +
    filteredNotices.length;


  const handleFilter = (filterName) => {
    setActiveFilter(filterName);

    requestAnimationFrame(() => {
      document
        .getElementById(
          "abpsNnx27Results"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };


  const openNews = (news) => {
    setActiveNews(news);
    document.body.style.overflow =
      "hidden";
  };


  const openNotice = (notice) => {
    setActiveNotice(notice);
    document.body.style.overflow =
      "hidden";
  };


  const closeModal = () => {
    setActiveNews(null);
    setActiveNotice(null);
    document.body.style.overflow = "";
  };


  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    alert(
      "Thank you for subscribing!"
    );

    setEmail("");
  };


  return (
    <main className="abpsNnx27-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abpsNnx27-hero">

        <div className="abpsNnx27-container abpsNnx27-heroGrid">

          <div className="abpsNnx27-heroContent">

            <div className="abpsNnx27-breadcrumb">

              <button
                onClick={() =>
                  navigate("/")
                }
              >
                <FaHome />
                Home
              </button>

              <span>›</span>

              <strong>
                News & Notices
              </strong>

            </div>


            <div className="abpsNnx27-label">
              <span></span>
              SCHOOL UPDATES
            </div>


            <h1>
              Stay Connected.
              <span>
                Stay Informed.
              </span>
            </h1>


            <p>
              Discover the latest school
              news, achievements, events and
              important announcements from
              AB Public School.
            </p>


            <button
              className="abpsNnx27-primaryBtn"
              onClick={() =>
                document
                  .getElementById(
                    "abpsNnx27Browse"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore All Updates
              <FaArrowRight />
            </button>

          </div>


          <div className="abpsNnx27-heroVisual">

            <div className="abpsNnx27-heroImage">

              <img
                src={heroImage}
                alt="AB Public School"
              />

            </div>


            <div className="abpsNnx27-heroCard">

              <FaBell />

              <div>
                <small>
                  STAY UPDATED
                </small>

                <strong>
                  Everything Important
                </strong>

                <p>
                  News • Notices • Events
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED NEWS + IMPORTANT NOTICES
      ===================================================== */}

      <section className="abpsNnx27-featured">

        <div className="abpsNnx27-container">

          <header className="abpsNnx27-sectionHead">

            <div className="abpsNnx27-label">
              <span></span>
              LATEST FROM ABPS
            </div>

            <h2>
              News & Important
              <span>
                Notices.
              </span>
            </h2>

            <p>
              Important school updates are
              placed here first so parents
              and students can find them
              quickly.
            </p>

          </header>


          <div className="abpsNnx27-featureGrid">

            {/* FEATURED NEWS */}

            <article
              className="abpsNnx27-mainFeature"
              onClick={() =>
                openNews(newsData[0])
              }
            >

              <div className="abpsNnx27-mainFeatureImage">

                <img
                  src={newsData[0].image}
                  alt={newsData[0].title}
                />

                <span>
                  Featured News
                </span>

              </div>


              <div className="abpsNnx27-mainFeatureBody">

                <div className="abpsNnx27-meta">
                  <span>
                    {newsData[0].category}
                  </span>

                  <small>
                    {newsData[0].date}
                  </small>
                </div>

                <h3>
                  {newsData[0].title}
                </h3>

                <p>
                  {newsData[0].excerpt}
                </p>

                <button>
                  Read Full Story
                  <FaArrowRight />
                </button>

              </div>

            </article>


            {/* IMPORTANT NOTICES */}

            <div className="abpsNnx27-topNotices">

              <div className="abpsNnx27-topNoticeHead">

                <div>
                  <FaBell />

                  <h3>
                    Important Notices
                  </h3>
                </div>

                <button
                  onClick={() =>
                    handleFilter(
                      "Notices"
                    )
                  }
                >
                  View All
                  <FaArrowRight />
                </button>

              </div>


              <div className="abpsNnx27-topNoticeList">

                {noticesData.map(
                  (notice) => (
                    <article
                      key={notice.id}
                      className="abpsNnx27-miniNotice"
                      onClick={() =>
                        openNotice(notice)
                      }
                    >

                      <div className="abpsNnx27-miniDate">

                        <strong>
                          {notice.day}
                        </strong>

                        <span>
                          {notice.month}
                        </span>

                      </div>


                      <div className="abpsNnx27-miniNoticeText">

                        <div>
                          <span>
                            {notice.category}
                          </span>

                          {notice.important && (
                            <em>
                              Important
                            </em>
                          )}
                        </div>

                        <h4>
                          {notice.title}
                        </h4>

                      </div>


                      <FaArrowRight />

                    </article>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BROWSE / FILTER / SEARCH
      ===================================================== */}

      <section
        className="abpsNnx27-browser"
        id="abpsNnx27Browse"
      >

        <div className="abpsNnx27-container">

          <header className="abpsNnx27-sectionHead">

            <div className="abpsNnx27-label">
              <span></span>
              FIND AN UPDATE
            </div>

            <h2>
              Browse News &
              <span>
                Notices.
              </span>
            </h2>

            <p>
              Select a category first, then
              use search if you want to find
              a particular update.
            </p>

          </header>


          {/* CATEGORY BUTTONS */}

          <div className="abpsNnx27-filters">

            {filters.map((filter) => {

              const Icon =
                filter.icon;

              return (
                <button
                  key={filter.name}
                  className={
                    activeFilter ===
                    filter.name
                      ? "abpsNnx27-filterActive"
                      : ""
                  }
                  onClick={() =>
                    handleFilter(
                      filter.name
                    )
                  }
                >
                  <Icon />

                  {filter.name}
                </button>
              );
            })}

          </div>


          {/* =========================
              SEARCH BELOW FILTERS
          ========================= */}

          <div className="abpsNnx27-searchArea">

            <div className="abpsNnx27-searchInfo">

              <strong>
                Search {activeFilter}
              </strong>

              <p>
                Results will appear
                directly below.
              </p>

            </div>


            <label className="abpsNnx27-searchBox">

              <FaSearch />

              <input
                type="text"
                placeholder={`Search ${activeFilter.toLowerCase()}...`}
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() =>
                    setSearchTerm("")
                  }
                >
                  <FaTimes />
                </button>
              )}

            </label>

          </div>


          {/* =================================================
              RESULTS
          ================================================= */}

          <div
            className="abpsNnx27-results"
            id="abpsNnx27Results"
          >

            <div className="abpsNnx27-resultsHead">

              <div>

                <span>
                  SHOWING
                </span>

                <h3>
                  {activeFilter}
                </h3>

              </div>


              <strong>
                {totalResults}{" "}
                {totalResults === 1
                  ? "Update"
                  : "Updates"}
              </strong>

            </div>


            {/* NEWS RESULTS */}

            {filteredNews.length >
              0 && (
              <div className="abpsNnx27-resultBlock">

                <div className="abpsNnx27-resultTitle">

                  <FaNewspaper />

                  <h3>
                    News
                  </h3>

                  <span>
                    {
                      filteredNews.length
                    }
                  </span>

                </div>


                <div className="abpsNnx27-newsGrid">

                  {filteredNews.map(
                    (news) => (
                      <article
                        className="abpsNnx27-newsCard"
                        key={news.id}
                        onClick={() =>
                          openNews(news)
                        }
                      >

                        <div className="abpsNnx27-newsImage">

                          <img
                            src={
                              news.image
                            }
                            alt={
                              news.title
                            }
                            loading="lazy"
                          />

                          <span>
                            {
                              news.category
                            }
                          </span>

                        </div>


                        <div className="abpsNnx27-newsBody">

                          <small>
                            {news.date}
                          </small>

                          <h3>
                            {news.title}
                          </h3>

                          <p>
                            {news.excerpt}
                          </p>

                          <button>
                            Read More
                            <FaArrowRight />
                          </button>

                        </div>

                      </article>
                    )
                  )}

                </div>

              </div>
            )}


            {/* NOTICE RESULTS */}

            {filteredNotices.length >
              0 && (
              <div className="abpsNnx27-resultBlock">

                <div className="abpsNnx27-resultTitle">

                  <FaBell />

                  <h3>
                    Notices
                  </h3>

                  <span>
                    {
                      filteredNotices.length
                    }
                  </span>

                </div>


                <div className="abpsNnx27-noticeGrid">

                  {filteredNotices.map(
                    (notice) => (
                      <article
                        className="abpsNnx27-noticeCard"
                        key={notice.id}
                        onClick={() =>
                          openNotice(
                            notice
                          )
                        }
                      >

                        <div className="abpsNnx27-noticeDate">

                          <strong>
                            {notice.day}
                          </strong>

                          <span>
                            {notice.month}
                          </span>

                          <small>
                            {notice.year}
                          </small>

                        </div>


                        <div className="abpsNnx27-noticeBody">

                          <div className="abpsNnx27-noticeTags">

                            <span>
                              {
                                notice.category
                              }
                            </span>

                            {notice.important && (
                              <em>
                                Important
                              </em>
                            )}

                          </div>


                          <h3>
                            {notice.title}
                          </h3>

                          <p>
                            {
                              notice.description
                            }
                          </p>

                        </div>


                        <span className="abpsNnx27-noticeArrow">
                          <FaArrowRight />
                        </span>

                      </article>
                    )
                  )}

                </div>

              </div>
            )}


            {/* EMPTY */}

            {totalResults === 0 && (
              <div className="abpsNnx27-empty">

                <span>
                  <FaSearch />
                </span>

                <h3>
                  No matching updates
                </h3>

                <p>
                  Try another category
                  or change your search
                  words.
                </p>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter(
                      "All Updates"
                    );
                  }}
                >
                  Show All Updates
                </button>

              </div>
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="abpsNnx27-newsletter">

        <div className="abpsNnx27-container">

          <div className="abpsNnx27-newsletterCard">

            <div>

              <div className="abpsNnx27-label">
                <span></span>
                STAY CONNECTED
              </div>

              <h2>
                Never Miss An
                <span>
                  Important Update.
                </span>
              </h2>

              <p>
                Receive important school
                announcements and updates
                directly in your inbox.
              </p>

            </div>


            <form
              onSubmit={
                handleSubscribe
              }
              className="abpsNnx27-subscribe"
            >

              <FaEnvelope />

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                required
              />

              <button type="submit">
                Subscribe
                <FaArrowRight />
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWS MODAL
      ===================================================== */}

      {activeNews && (
        <div
          className="abpsNnx27-modalOverlay"
          onClick={closeModal}
        >

          <div
            className="abpsNnx27-modal abpsNnx27-newsModal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="abpsNnx27-modalClose"
              onClick={closeModal}
            >
              <FaTimes />
            </button>


            <div className="abpsNnx27-modalImage">

              <img
                src={activeNews.image}
                alt={activeNews.title}
              />

            </div>


            <div className="abpsNnx27-modalContent">

              <div className="abpsNnx27-modalMeta">

                <span>
                  {
                    activeNews.category
                  }
                </span>

                <small>
                  {activeNews.date}
                </small>

              </div>

              <h2>
                {activeNews.title}
              </h2>

              <p>
                {activeNews.fullText}
              </p>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          NOTICE MODAL
      ===================================================== */}

      {activeNotice && (
        <div
          className="abpsNnx27-modalOverlay"
          onClick={closeModal}
        >

          <div
            className="abpsNnx27-modal abpsNnx27-noticeModal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="abpsNnx27-modalClose"
              onClick={closeModal}
            >
              <FaTimes />
            </button>


            <span className="abpsNnx27-modalBell">
              <FaBell />
            </span>


            <div className="abpsNnx27-modalMeta">

              <span>
                {
                  activeNotice.category
                }
              </span>

              <small>
                {activeNotice.day}{" "}
                {activeNotice.month}{" "}
                {activeNotice.year}
              </small>

            </div>


            <h2>
              {activeNotice.title}
            </h2>

            <p>
              {
                activeNotice.description
              }
            </p>


            {activeNotice.important && (
              <div className="abpsNnx27-important">
                Important School
                Announcement
              </div>
            )}

          </div>

        </div>
      )}

    </main>
  );
};

export default NewsNotices;             