import React from "react";

import {
  FaBullhorn,
  FaNewspaper,
  FaCalendarAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartBar,
  FaCalendarCheck,
  FaUserGraduate,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";

import "./AdminOverview.css";

const AdminOverview = ({ onNavigate }) => {

  const notices =
    JSON.parse(localStorage.getItem("abpsAdminNotices")) || [];

  const news =
    JSON.parse(localStorage.getItem("abpsAdminNews")) || [];

  const events =
    JSON.parse(localStorage.getItem("abpsAdminEvents")) || [];

  const assignments =
    JSON.parse(localStorage.getItem("abpsAdminAssignments")) || [];

  const students =
    JSON.parse(localStorage.getItem("abpsAdminStudents")) || [];

  const stats = [
    {
      title: "Total Notices",
      value: notices.length,
      icon: <FaBullhorn />,
      page: "Notices",
    },
    {
      title: "School News",
      value: news.length,
      icon: <FaNewspaper />,
      page: "News",
    },
    {
      title: "Upcoming Events",
      value: events.length,
      icon: <FaCalendarAlt />,
      page: "Events",
    },
    {
      title: "Assignments",
      value: assignments.length,
      icon: <FaClipboardList />,
      page: "Assignments",
    },
    {
      title: "Students",
      value: students.length,
      icon: <FaUserGraduate />,
      page: "Students",
    },
    {
      title: "Attendance",
      value: "92%",
      icon: <FaCalendarCheck />,
      page: "Attendance",
    },
    {
      title: "Fee Records",
      value: "24",
      icon: <FaMoneyBillWave />,
      page: "Fees",
    },
    {
      title: "Results",
      value: "18",
      icon: <FaChartBar />,
      page: "Results",
    },
  ];

  return (
    <div className="abadminoverview">

      {/* HEADER */}

      <div className="abadminoverview-header">

        <div>
          <span className="abadminoverview-eyebrow">
            SCHOOL MANAGEMENT
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage school information, notices, students,
            academics and parent portal data from one place.
          </p>
        </div>

        <div className="abadminoverview-date">
          <strong>08 September 2026</strong>
          <span>School Administration</span>
        </div>

      </div>

      {/* QUICK ACTION */}

      <div className="abadminoverview-action-grid">

        <button
          onClick={() => onNavigate("Notices")}
          className="abadminoverview-action"
        >
          <span>
            <FaBullhorn />
          </span>

          <div>
            <strong>Add Notice</strong>
            <small>Publish a new school notice</small>
          </div>

          <FaArrowRight />
        </button>

        <button
          onClick={() => onNavigate("News")}
          className="abadminoverview-action"
        >
          <span>
            <FaNewspaper />
          </span>

          <div>
            <strong>Add News</strong>
            <small>Update school news</small>
          </div>

          <FaArrowRight />
        </button>

        <button
          onClick={() => onNavigate("Events")}
          className="abadminoverview-action"
        >
          <span>
            <FaCalendarAlt />
          </span>

          <div>
            <strong>Add Event</strong>
            <small>Create upcoming event</small>
          </div>

          <FaArrowRight />
        </button>

      </div>

      {/* STATS */}

      <div className="abadminoverview-section-title">
        <div>
          <span>OVERVIEW</span>
          <h2>School Data</h2>
        </div>
      </div>

      <div className="abadminoverview-stats">

        {stats.map((item) => (
          <button
            key={item.title}
            className="abadminoverview-stat"
            onClick={() => onNavigate(item.page)}
          >

            <div className="abadminoverview-stat-icon">
              {item.icon}
            </div>

            <div className="abadminoverview-stat-info">
              <span>{item.title}</span>
              <strong>{item.value}</strong>
            </div>

            <FaArrowRight className="abadminoverview-stat-arrow" />

          </button>
        ))}

      </div>

      {/* RECENT DATA */}

      <div className="abadminoverview-bottom-grid">

        <div className="abadminoverview-panel">

          <div className="abadminoverview-panel-head">

            <div>
              <span>RECENT</span>
              <h3>Latest Notices</h3>
            </div>

            <button onClick={() => onNavigate("Notices")}>
              View All
              <FaArrowRight />
            </button>

          </div>

          {notices.length === 0 ? (

            <div className="abadminoverview-empty">
              <FaBullhorn />
              <strong>No notices yet</strong>
              <p>Add your first school notice.</p>

              <button onClick={() => onNavigate("Notices")}>
                <FaPlus />
                Add Notice
              </button>
            </div>

          ) : (

            <div className="abadminoverview-list">

              {notices.slice(0, 4).map((notice) => (
                <div
                  className="abadminoverview-list-item"
                  key={notice.id}
                >

                  <div className="abadminoverview-list-icon">
                    <FaBullhorn />
                  </div>

                  <div>
                    <strong>
                      {notice.title}
                    </strong>

                    <span>
                      {notice.date || "Recently added"}
                    </span>
                  </div>

                </div>
              ))}

            </div>

          )}

        </div>

        <div className="abadminoverview-panel">

          <div className="abadminoverview-panel-head">

            <div>
              <span>RECENT</span>
              <h3>Upcoming Events</h3>
            </div>

            <button onClick={() => onNavigate("Events")}>
              View All
              <FaArrowRight />
            </button>

          </div>

          {events.length === 0 ? (

            <div className="abadminoverview-empty">
              <FaCalendarAlt />
              <strong>No events yet</strong>
              <p>Add an upcoming school event.</p>

              <button onClick={() => onNavigate("Events")}>
                <FaPlus />
                Add Event
              </button>
            </div>

          ) : (

            <div className="abadminoverview-list">

              {events.slice(0, 4).map((event) => (
                <div
                  className="abadminoverview-list-item"
                  key={event.id}
                >

                  <div className="abadminoverview-list-icon">
                    <FaCalendarAlt />
                  </div>

                  <div>
                    <strong>
                      {event.title}
                    </strong>

                    <span>
                      {event.date || "Upcoming"}
                    </span>
                  </div>

                </div>
              ))}

            </div>

          )}

        </div>

      </div>

      {/* INFORMATION */}

      <div className="abadminoverview-info">

        <div className="abadminoverview-info-icon">
          <FaSchool />
        </div>

        <div>
          <strong>Central School Data Management</strong>

          <p>
            Any information added through the Admin Portal
            can be connected with the Parent Portal using
            shared localStorage data.
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminOverview;