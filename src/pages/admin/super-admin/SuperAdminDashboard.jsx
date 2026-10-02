import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaClipboardList,
  FaBookOpen,
  FaChartBar,
  FaMoneyBillWave,
  FaBullhorn,
  FaCalendarAlt,
  FaEnvelope,
  FaCommentDots,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaBell,
  FaSchool,
  FaGraduationCap,
  FaShieldAlt,
  FaTrophy,
} from "react-icons/fa";

import "./SuperAdminDashboard.css";


// =========================================================
// SUPER ADMIN PAGES
// =========================================================

import SuperAdminOverview from "./SuperAdminOverview";
import StudentsAdmin from "./StudentsAdmin";
import ParentsAdmin from "./ParentsAdmin";
import TeachersAdmin from "./TeachersAdmin";
import AttendanceAdmin from "./AttendanceAdmin";
import AssignmentsAdmin from "./AssignmentsAdmin";
import HomeworkAdmin from "./HomeworkAdmin";
import ResultsAdmin from "./ResultsAdmin";
import FeesAdmin from "./FeesAdmin";
import NoticesAdmin from "./NoticesAdmin";
import EventsAdmin from "./EventsAdmin";
import Inquiries from "./Inquiries";
import ContactMessagesAdmin from "./ContactMessagesAdmin";
import SubAdminsAdmin from "./SubAdminsAdmin";


// =========================================================
// DATA
// =========================================================

import {
  getNewInquiriesCount,
} from "../../../data/inquiriesData";

import {
  getNewContactMessagesCount,
} from "../../../data/contactMessagesData";

import {
  getSession,
  logoutUser,
} from "../../../data/authData";


// =========================================================
// COMPONENT
// =========================================================

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("overview");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [inquiryCount, setInquiryCount] = useState(0);

  const [messageCount, setMessageCount] = useState(0);

  const [admin, setAdmin] = useState(() => getSession());


  // =======================================================
  // COUNTS
  // =======================================================

  const loadCounts = () => {
    setInquiryCount(getNewInquiriesCount());
    setMessageCount(getNewContactMessagesCount());
  };


  // =======================================================
  // AUTO UPDATE
  // =======================================================

  useEffect(() => {
    loadCounts();

    const handleDataUpdate = () => {
      loadCounts();
    };

    const handleStorage = () => {
      loadCounts();
      setAdmin(getSession());
    };

    const handleSessionUpdate = () => {
      setAdmin(getSession());
    };

    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    window.addEventListener(
      "abpsSessionUpdated",
      handleSessionUpdate
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        handleDataUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );

      window.removeEventListener(
        "abpsSessionUpdated",
        handleSessionUpdate
      );
    };
  }, []);


  // =======================================================
  // MENU
  // =======================================================

  const menuGroups = [
    {
      title: "Dashboard",
      items: [
        {
          id: "overview",
          label: "Overview",
          icon: FaHome,
        },
      ],
    },

    {
      title: "School Management",
      items: [
        {
          id: "students",
          label: "Students",
          icon: FaUserGraduate,
        },
        {
          id: "parents",
          label: "Parents",
          icon: FaUsers,
        },
        {
          id: "teachers",
          label: "Teachers",
          icon: FaChalkboardTeacher,
        },
      ],
    },

    {
      title: "Academics",
      items: [
        {
          id: "attendance",
          label: "Attendance",
          icon: FaCalendarCheck,
        },
        {
          id: "assignments",
          label: "Assignments",
          icon: FaClipboardList,
        },
        {
          id: "homework",
          label: "Homework",
          icon: FaBookOpen,
        },
        {
          id: "results",
          label: "Results",
          icon: FaChartBar,
        },
        {
          id: "fees",
          label: "Fees",
          icon: FaMoneyBillWave,
        },
      ],
    },

    {
      title: "Communication",
      items: [
        {
          id: "notices",
          label: "Notices",
          icon: FaBullhorn,
        },
        {
          id: "events",
          label: "Events",
          icon: FaCalendarAlt,
        },
        {
          id: "inquiries",
          label: "Inquiries",
          icon: FaCommentDots,
          badge: inquiryCount,
        },
        {
          id: "contactMessages",
          label: "Contact Messages",
          icon: FaEnvelope,
          badge: messageCount,
        },
      ],
    },

    {
      title: "Administration",
      items: [
        {
          id: "subAdmins",
          label: "Sub Admins",
          icon: FaUserShield,
        },
      ],
    },
  ];


  // =======================================================
  // PAGE CHANGE
  // =======================================================

  const changePage = (page) => {
    setActivePage(page);

    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =======================================================
  // LOGOUT
  // =======================================================

  const handleLogout = () => {
    logoutUser();

    navigate("/login", {
      replace: true,
    });
  };


  // =======================================================
  // ADMIN DETAILS
  // =======================================================

  const adminName =
    admin?.name ||
    "Super Admin";

  const adminInitials =
    adminName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "SA";


  // =======================================================
  // CURRENT PAGE TITLE
  // =======================================================

  const getCurrentPageTitle = () => {
    for (const group of menuGroups) {
      const item = group.items.find(
        (menuItem) =>
          menuItem.id === activePage
      );

      if (item) {
        return item.label;
      }
    }

    if (activePage === "settings") {
      return "Settings";
    }

    return "Overview";
  };


  // =======================================================
  // CONTENT
  // =======================================================

  const renderContent = () => {
    switch (activePage) {
      case "overview":
        return (
          <SuperAdminOverview
            onNavigate={changePage}
          />
        );

      case "students":
        return <StudentsAdmin />;

      case "parents":
        return <ParentsAdmin />;

      case "teachers":
        return <TeachersAdmin />;

      case "attendance":
        return <AttendanceAdmin />;

      case "assignments":
        return <AssignmentsAdmin />;

      case "homework":
        return <HomeworkAdmin />;

      case "results":
        return <ResultsAdmin />;

      case "fees":
        return <FeesAdmin />;

      case "notices":
        return <NoticesAdmin />;

      case "events":
        return <EventsAdmin />;

      case "inquiries":
        return <Inquiries />;

      case "contactMessages":
        return <ContactMessagesAdmin />;

      case "subAdmins":
        return <SubAdminsAdmin />;

      case "settings":
        return (
          <Placeholder
            icon={FaCog}
            title="Admin Settings"
            text="Manage Super Admin account settings."
          />
        );

      default:
        return (
          <SuperAdminOverview
            onNavigate={changePage}
          />
        );
    }
  };


  // =======================================================
  // UI
  // =======================================================

  return (
    <div className="sad-dashboard">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="sad-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Close sidebar"
        />
      )}


      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`sad-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="sad-brand">

          <div className="sad-school-logo">
            <FaGraduationCap />
          </div>

          <div className="sad-brand-text">
            <strong>
              AB PUBLIC SCHOOL
            </strong>

            <span>
              Super Admin Portal
            </span>
          </div>

          <button
            type="button"
            className="sad-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes />
          </button>

        </div>


        {/* PROFILE */}

        <div className="sad-profile">

          <div className="sad-avatar">
            {adminInitials}
          </div>

          <div>
            <strong>
              {adminName}
            </strong>

            <span>
              Full School Access
            </span>
          </div>

        </div>


        {/* MENU */}

        <nav className="sad-nav">

          {menuGroups.map((group) => (
            <div
              className="sad-group"
              key={group.title}
            >

              <p>
                {group.title}
              </p>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={
                      activePage === item.id
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      changePage(item.id)
                    }
                  >

                    <span className="sad-menu-icon">
                      <Icon />
                    </span>

                    <span className="sad-menu-label">
                      {item.label}
                    </span>

                    {Number(item.badge) > 0 && (
                      <b className="sad-menu-badge">
                        {item.badge > 99
                          ? "99+"
                          : item.badge}
                      </b>
                    )}

                    <FaChevronRight
                      className="sad-arrow"
                    />

                  </button>
                );
              })}

            </div>
          ))}

        </nav>


        {/* BOTTOM */}

        <div className="sad-bottom">

          <button
            type="button"
            className={
              activePage === "settings"
                ? "active"
                : ""
            }
            onClick={() =>
              changePage("settings")
            }
          >
            <FaCog />

            <span>
              Settings
            </span>
          </button>

          <button
            type="button"
            className="logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="sad-main">

        {/* TOPBAR */}

        <header className="sad-topbar">

          <div className="sad-top-left">

            <button
              type="button"
              className="sad-toggle"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FaBars />
            </button>


            <div className="sad-top-search">

              <FaCommentDots />

              <input
                type="text"
                placeholder="Search students, teachers, notices..."
              />

            </div>

          </div>


          <div className="sad-top-right">

            <button
              type="button"
              className="sad-top-icon"
              onClick={() =>
                changePage("events")
              }
            >
              <FaCalendarAlt />
            </button>


            <button
              type="button"
              className="sad-bell"
              onClick={() =>
                changePage(
                  messageCount > 0
                    ? "contactMessages"
                    : "inquiries"
                )
              }
            >

              <FaBell />

              {inquiryCount +
                messageCount >
                0 && (
                <span>
                  {inquiryCount +
                    messageCount >
                  9
                    ? "9+"
                    : inquiryCount +
                      messageCount}
                </span>
              )}

            </button>


            <div className="sad-user">

              <div className="sad-user-avatar">
                {adminInitials}
              </div>

              <section>
                <strong>
                  {adminName}
                </strong>

                <small>
                  Full Access
                </small>
              </section>

            </div>

          </div>

        </header>


        {/* MOBILE HEADING */}

        <div className="sad-mobile-heading">

          <span>
            SUPER ADMIN
          </span>

          <strong>
            {getCurrentPageTitle()}
          </strong>

        </div>


        {/* =================================================
            OVERVIEW HERO
        ================================================= */}

        {activePage === "overview" && (
          <section className="sad-dashboard-hero">

            <div className="sad-hero-content">

              <span className="sad-hero-label">
                WELCOME BACK
              </span>

              <h1>
                Super Admin
                <span> Dashboard</span>
              </h1>

              <p>
                Manage your complete school system
                efficiently from one place.
              </p>


              <div className="sad-hero-points">

                <span>
                  <FaGraduationCap />
                  Academic Excellence
                </span>

                <span>
                  <FaShieldAlt />
                  Safe Environment
                </span>

                <span>
                  <FaUsers />
                  Bright Future
                </span>

                <span>
                  <FaTrophy />
                  Together We Grow
                </span>

              </div>

            </div>


            <div className="sad-hero-school">

              <div className="sad-hero-school-icon">
                <FaSchool />
              </div>

              <div>
                <span>
                  AB PUBLIC SCHOOL
                </span>

                <strong>
                  Educate. Empower. Excel.
                </strong>
              </div>

            </div>

          </section>
        )}


        {/* CONTENT */}

        <main
          className={`sad-content ${
            activePage === "overview"
              ? "overview-content"
              : ""
          }`}
        >
          {renderContent()}
        </main>

      </div>

    </div>
  );
};


// =========================================================
// PLACEHOLDER
// =========================================================

const Placeholder = ({
  icon: Icon = FaSchool,
  title,
  text,
}) => {
  return (
    <div className="sad-placeholder">

      <div className="sad-placeholder-icon">
        <Icon />
      </div>

      <span>
        AB PUBLIC SCHOOL
      </span>

      <h1>
        {title}
      </h1>

      <p>
        {text}
      </p>

    </div>
  );
};

export default SuperAdminDashboard;