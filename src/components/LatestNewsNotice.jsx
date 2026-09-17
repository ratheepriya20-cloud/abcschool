import React from "react";
import { useNavigate } from "react-router-dom";
import "./LatestNewsNotice.css";

const latestNews = [
  {
    day: "21",
    month: "AUG",
    tag: "SPORTS",
    title: "37th Regional Sports Competition Begins",
    text: "Shiksha Bharti Vidyalaya hosted the 37th Regional Sports Competition with enthusiastic participation from students.",
  },
  {
    day: "15",
    month: "AUG",
    tag: "EVENT",
    title: "Independence Day Celebration",
    text: "Students celebrated Independence Day with cultural performances and patriotic activities.",
  },
  {
    day: "10",
    month: "AUG",
    tag: "ACTIVITY",
    title: "Students Participate in School Activities",
    text: "Students showcased their creativity, talent and teamwork through different school activities.",
  },
];

const notices = [
  {
    type: "ADMISSION",
    title: "Admissions Open for Academic Session 2026–27",
    date: "01 Sep 2026",
  },
  {
    type: "IMPORTANT",
    title: "Important Information for Parents & Students",
    date: "28 Aug 2026",
  },
  {
    type: "ACADEMIC",
    title: "Academic Session & School Updates",
    date: "25 Aug 2026",
  },
  {
    type: "EVENT",
    title: "Upcoming Events and Activities",
    date: "20 Aug 2026",
  },
];

const LatestNewsNotice = () => {
  const navigate = useNavigate();

  return (
    <section className="latestNewsNotice">

      <div className="lnnContainer">

        {/* HEADER */}
        <div className="lnnHeader">

          <div>
            <span className="lnnLabel">
              SCHOOL UPDATES
            </span>

            <h2>
              Latest News
              <span>& Notices.</span>
            </h2>
          </div>

          <p>
            Stay informed about the latest happenings, important
            announcements and activities at our school.
          </p>

        </div>


        {/* CONTENT */}
        <div className="lnnGrid">

          {/* =========================
              LATEST NEWS
          ========================== */}

          <div className="lnnNewsBox">

            <div className="lnnBoxHeader">

              <div>
                <small>LATEST</small>
                <h3>School News</h3>
              </div>

              <button
                onClick={() => navigate("/news")}
              >
                View All
                <span>→</span>
              </button>

            </div>


            <div className="lnnNewsList">

              {latestNews.map((news) => (
                <article
                  className="lnnNewsCard"
                  key={news.title}
                >

                  <div className="lnnDate">

                    <strong>{news.day}</strong>

                    <span>{news.month}</span>

                  </div>


                  <div className="lnnNewsContent">

                    <span className="lnnTag">
                      {news.tag}
                    </span>

                    <h4>
                      {news.title}
                    </h4>

                    <p>
                      {news.text}
                    </p>

                    <button
                      onClick={() => navigate("/news")}
                    >
                      Read More
                      <span>→</span>
                    </button>

                  </div>

                </article>
              ))}

            </div>

          </div>


          {/* =========================
              NOTICES
          ========================== */}

          <div className="lnnNoticeBox">

            <div className="lnnBoxHeader">

              <div>
                <small>IMPORTANT</small>
                <h3>Notices</h3>
              </div>

              <button
                onClick={() => navigate("/notices")}
              >
                View All
                <span>→</span>
              </button>

            </div>


            <div className="lnnNoticeList">

              {notices.map((notice, index) => (
                <div
                  className="lnnNoticeCard"
                  key={notice.title}
                  onClick={() => navigate("/notices")}
                >

                  <div className="lnnNoticeIcon">
                    {index === 0 ? "★" : "!"}
                  </div>

                  <div className="lnnNoticeContent">

                    <span>
                      {notice.type}
                    </span>

                    <h4>
                      {notice.title}
                    </h4>

                    <small>
                      {notice.date}
                    </small>

                  </div>

                  <div className="lnnNoticeArrow">
                    →
                  </div>

                </div>
              ))}

            </div>


            <button
              className="lnnNoticeButton"
              onClick={() => navigate("/notices")}
            >
              View All Notices
              <span>→</span>
            </button>

          </div>

        </div>


        {/* BOTTOM CTA */}
        <div className="lnnBottom">

          <div>
            <span>
              NEVER MISS AN UPDATE
            </span>

            <strong>
              Keep connected with your school community.
            </strong>
          </div>

          <button
            onClick={() => navigate("/contact")}
          >
            Contact School
            <span>↗</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default LatestNewsNotice;