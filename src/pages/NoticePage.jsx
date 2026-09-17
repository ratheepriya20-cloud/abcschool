import React, { useEffect, useState } from "react";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaArrowRight,
  FaBell,
  FaFileAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import "./SchoolInfoPages.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const notices = [
  {
    title: "Admission Applications Open for Session 2026–27",
    category: "Admissions",
    date: "09 Sep 2026",
    text: "Applications are now open for Nursery to Class XII for the new academic session.",
    fullNotice:
      "Admission applications for the academic session 2026–27 are now open. Parents and guardians can apply for admission from Nursery to Class XII. Interested applicants are requested to complete the admission form with accurate student and parent details and submit the required documents within the specified timeline. For further information regarding eligibility, admission procedure, documents and important dates, please visit the Admission section of the school website or contact the school office.",
    important: true,
  },

  {
    title: "Parent Teacher Meeting Scheduled",
    category: "School",
    date: "07 Sep 2026",
    text: "The upcoming Parent Teacher Meeting will be conducted for all classes.",
    fullNotice:
      "The Parent Teacher Meeting has been scheduled for all classes. Parents are requested to attend the meeting and interact with the respective class teachers regarding their child's academic progress, classroom participation, attendance and overall development. The detailed schedule and meeting timings will be communicated by the respective class teachers.",
    important: false,
  },

  {
    title: "Half-Yearly Examination Schedule Released",
    category: "Examination",
    date: "05 Sep 2026",
    text: "Students can check the detailed examination timetable from the examination section.",
    fullNotice:
      "The Half-Yearly Examination schedule for the academic session has been released. Students are advised to carefully check the examination timetable and prepare according to the subjects and dates mentioned. Students must reach school on time and carry all necessary examination materials. Parents are requested to ensure regular attendance and proper preparation during the examination period.",
    important: true,
  },

  {
    title: "Inter-School Sports Trials",
    category: "Sports",
    date: "03 Sep 2026",
    text: "Selection trials for football, basketball and athletics will be conducted this month.",
    fullNotice:
      "Inter-School Sports selection trials will be conducted this month for football, basketball and athletics. Students who are interested in participating are encouraged to register with their respective sports teachers. Selection will be based on performance, fitness, discipline and participation during the trials. Students are requested to report to the designated sports area at the scheduled time.",
    important: false,
  },

  {
    title: "School Transport Route Update",
    category: "Transport",
    date: "01 Sep 2026",
    text: "Updated bus routes and pickup timings are now available for parents.",
    fullNotice:
      "The school has updated selected transport routes and pickup timings for the convenience of students and parents. Parents are requested to review the updated route information and ensure that students reach their designated pickup point a few minutes before the scheduled arrival time. For any transport-related query, please contact the school transport office.",
    important: false,
  },

  {
    title: "Teachers Day Celebration",
    category: "Events",
    date: "29 Aug 2026",
    text: "Students participated in special activities to celebrate Teachers Day.",
    fullNotice:
      "The school celebrated Teachers Day with a series of special activities and performances. Students expressed their gratitude towards teachers through speeches, cultural performances, creative presentations and other engaging activities. The celebration provided an opportunity for students to appreciate the dedication and contribution of their teachers.",
    important: false,
  },
];

const NoticePage = () => {
  const [search, setSearch] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const filteredNotices = notices.filter((notice) => {
    const searchText = `${notice.title} ${notice.category} ${notice.text} ${notice.fullNotice}`;

    return searchText
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const openNotice = (notice) => {
    setSelectedNotice(notice);
  };

  const closeNotice = () => {
    setSelectedNotice(null);
  };

  useEffect(() => {
    if (selectedNotice) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedNotice]);

  const handleCardKeyDown = (event, notice) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openNotice(notice);
    }
  };

  return (
    <>
      <Navbar />

      <main className="sipPage">

        {/* ================= HERO ================= */}

        <section className="sipHero sipNoticeHero">

          <div className="sipHeroGlow"></div>

          <div className="sipHeroInner">

            <div className="sipHeroContent">

              <span className="sipEyebrow">
                <FaBullhorn />
                SCHOOL INFORMATION
              </span>

              <h1>School Notices</h1>

              <p>
                Stay updated with the latest announcements,
                examinations, events and important school information.
              </p>

            </div>

            <div className="sipHeroIcon">
              <FaBullhorn />
            </div>

          </div>

        </section>

        {/* ================= CONTENT ================= */}

        <section className="sipContent">

          <div className="sipToolbar">

            <div className="sipToolbarTitle">

              <span className="sipMiniLabel">
                LATEST UPDATES
              </span>

              <h2>
                Important School Notices
              </h2>

            </div>

            <div className="sipSearch">

              <FaSearch />

              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

          </div>

          {/* ================= NOTICE CARDS ================= */}

          <div className="sipNoticeGrid">

            {filteredNotices.length > 0 ? (

              filteredNotices.map((notice, index) => (

                <article
                  className="sipNoticeCard"
                  key={`${notice.title}-${index}`}
                  onClick={() => openNotice(notice)}
                  onKeyDown={(event) =>
                    handleCardKeyDown(event, notice)
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${notice.title}`}
                >

                  {/* IMPORTANT BADGE */}

                  {notice.important && (
                    <span className="sipImportant">

                      <FaBell />

                      Important

                    </span>
                  )}

                  {/* TOP AREA */}

                  <div className="sipNoticeTop">

                    <div className="sipNoticeIcon">
                      <FaFileAlt />
                    </div>

                    <div className="sipNoticeMeta">

                      <span className="sipCategory">
                        {notice.category}
                      </span>
                      

                      <small className="sipDate">
                        <FaCalendarAlt />
                        {notice.date}
                      </small>

                    </div>

                  </div>

                  {/* TITLE */}

                  <h3>
                    {notice.title}
                  </h3>

                  {/* SHORT DESCRIPTION */}

                  <p>
                    {notice.text}
                  </p>

                  {/* BUTTON */}

                  <button
                    type="button"
                    className="sipReadButton"
                    onClick={(event) => {
                      event.stopPropagation();
                      openNotice(notice);
                    }}
                  >

                    <span>
                      Read Notice
                    </span>

                    <FaArrowRight />

                  </button>

                </article>

              ))

            ) : (

              <div className="sipNoNotice">

                <FaSearch />

                <h3>
                  No Notice Found
                </h3>

                <p>
                  We couldn't find any notice matching your search.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* ================= POPUP ================= */}

        {selectedNotice && (

          <div
            className="sipNoticeOverlay"
            onClick={closeNotice}
          >

            <div
              className="sipNoticeModal"
              onClick={(event) =>
                event.stopPropagation()
              }
              role="dialog"
              aria-modal="true"
            >

              {/* CLOSE X */}

              <button
                className="sipModalClose"
                type="button"
                onClick={closeNotice}
                aria-label="Close notice"
              >
                <FaTimes />
              </button>

              {/* MODAL HEADER */}

              <div className="sipModalHeader">

                <div className="sipModalIcon">
                  <FaBullhorn />
                </div>

                <div className="sipModalHeaderText">

                  <span className="sipModalCategory">
                    {selectedNotice.category}
                  </span>

                  <h2>
                    {selectedNotice.title}
                  </h2>

                </div>

              </div>

              {/* DATE */}

              <div className="sipModalDate">

                <div className="sipModalDateInfo">

                  <FaCalendarAlt />

                  <span>
                    Published on {selectedNotice.date}
                  </span>

                </div>

                {selectedNotice.important && (

                  <strong>

                    <FaBell />

                    Important

                  </strong>

                )}

              </div>

              {/* DIVIDER */}

              <div className="sipModalDivider"></div>

              {/* FULL NOTICE */}

              <div className="sipModalBody">

                <h3>
                  Notice Details
                </h3>

                <p>
                  {selectedNotice.fullNotice}
                </p>

              </div>

              {/* MODAL FOOTER */}

              <div className="sipModalFooter">

                <span>

                  <FaFileAlt />

                  AB Public School

                </span>

                <button
                  type="button"
                  onClick={closeNotice}
                >
                  Close Notice
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

      <Footer />
    </>
  );
};

export default NoticePage;