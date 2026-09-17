import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUserCircle,
  FaChevronRight,
  FaHeadset,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaShieldAlt,
  FaGraduationCap,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
} from "react-icons/fa";

import "./ParentDashboard.css";

import ParentOverview from "./ParentOverview";
import ParentAttendance from "./ParentAttendance";
import ParentFees from "./ParentFees";
import ParentResults from "./ParentResults";
import ParentAssignments from "./ParentAssignments";
import ParentNotices from "./ParentNotices";
import ParentEvents from "./ParentEvents";
import ParentProfile from "./ParentProfile";

import {
  getAssignmentsData,
  getNoticesData,
  getEventsData,
  getResultsData,
  getFeesData,
  getAttendanceData,
  initialProfile,
  paymentMethods,
} from "./parentData";

import {
  AssignmentModal,
  NoticeModal,
  EventModal,
  HelpModal,
  PaymentModal,
} from "./ParentModals";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [assignments, setAssignments] = useState(
    getAssignmentsData()
  );

  const [notices, setNotices] = useState(
    getNoticesData()
  );

  const [events, setEvents] = useState(
    getEventsData()
  );

  const [results, setResults] = useState(
    getResultsData()
  );

  const [fees, setFees] = useState(
    getFeesData()
  );

  const [attendance, setAttendance] = useState(
    getAttendanceData()
  );

  const [profile, setProfile] =
    useState(initialProfile);

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);

  const [selectedNotice, setSelectedNotice] =
    useState(null);

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [showHelp, setShowHelp] = useState(false);

  const [showPayment, setShowPayment] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("");

  const [paymentStep, setPaymentStep] =
    useState("methods");

  const [paymentDone, setPaymentDone] =
    useState(false);

  const [editingProfile, setEditingProfile] =
    useState(false);

  const loadParentData = () => {
    setAssignments(getAssignmentsData());
    setNotices(getNoticesData());
    setEvents(getEventsData());
    setResults(getResultsData());
    setFees(getFeesData());
    setAttendance(getAttendanceData());

    try {
      const savedProfile =
        localStorage.getItem("abpsAdminProfile");

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.log("Profile loading error");
    }
  };

  useEffect(() => {
    loadParentData();

    const handleStorageChange = () => {
      loadParentData();
    };

    const handleAdminUpdate = () => {
      loadParentData();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    window.addEventListener(
      "abpsDataUpdated",
      handleAdminUpdate
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      window.removeEventListener(
        "abpsDataUpdated",
        handleAdminUpdate
      );
    };
  }, []);

  const menuItems = [
    {
      name: "Overview",
      icon: <FaGraduationCap />,
    },
    {
      name: "Attendance",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Fees",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Results",
      icon: <FaChartBar />,
    },
    {
      name: "Assignments",
      icon: <FaClipboardList />,
    },
    {
      name: "Notices",
      icon: <FaBullhorn />,
    },
    {
      name: "Events",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
    },
  ];

  const handleMenu = (page) => {
    setActivePage(page);
    setMobileMenu(false);
  };

  const openPayment = () => {
    setSelectedPaymentMethod("");
    setPaymentStep("methods");
    setPaymentDone(false);
    setShowPayment(true);
  };

  const closePayment = () => {
    setShowPayment(false);
    setSelectedPaymentMethod("");
    setPaymentStep("methods");
    setPaymentDone(false);
  };

  const proceedPayment = () => {
    if (!selectedPaymentMethod) return;

    setPaymentStep("processing");

    setTimeout(() => {
      setPaymentDone(true);
      setPaymentStep("success");
    }, 1000);
  };

  const downloadReceipt = () => {
    const receiptText = `
AB PUBLIC SCHOOL
PARENT PORTAL PAYMENT RECEIPT

Student: ${profile.student}
Class: ${profile.className}
Admission No: ${profile.admission}

Payment Status: Paid
Date: ${new Date().toLocaleDateString("en-IN")}

Thank you for your payment.
`;

    const blob = new Blob([receiptText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "ABPS-Fee-Receipt.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem("abpsCurrentUser");
    navigate("/sign-in");
  };

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return (
          <ParentOverview
            profile={profile}
            onNavigate={handleMenu}
            assignments={assignments}
            notices={notices}
            events={events}
            fees={fees}
            results={results}
            onAssignment={setSelectedAssignment}
            onNotice={setSelectedNotice}
            onEvent={setSelectedEvent}
            onPayment={openPayment}
            onDownloadReceipt={downloadReceipt}
          />
        );

      case "Attendance":
        return (
          <ParentAttendance
            attendance={attendance}
          />
        );

      case "Fees":
        return (
          <ParentFees
            fees={fees}
            onPayment={openPayment}
            onDownloadReceipt={downloadReceipt}
          />
        );

      case "Results":
        return (
          <ParentResults
            results={results}
          />
        );

      case "Assignments":
        return (
          <ParentAssignments
            assignments={assignments}
            onAssignment={setSelectedAssignment}
          />
        );

      case "Notices":
        return (
          <ParentNotices
            notices={notices}
            onNotice={setSelectedNotice}
          />
        );

      case "Events":
        return (
          <ParentEvents
            events={events}
            onEvent={setSelectedEvent}
          />
        );

      case "Profile":
        return (
          <ParentProfile
            profile={profile}
            setProfile={setProfile}
            editingProfile={editingProfile}
            setEditingProfile={setEditingProfile}
          />
        );

      default:
        return (
          <ParentOverview
            profile={profile}
            onNavigate={handleMenu}
            assignments={assignments}
            notices={notices}
            events={events}
            fees={fees}
            results={results}
            onAssignment={setSelectedAssignment}
            onNotice={setSelectedNotice}
            onEvent={setSelectedEvent}
            onPayment={openPayment}
            onDownloadReceipt={downloadReceipt}
          />
        );
    }
  };

  return (
    <div className="abparentdash-shell">

      <aside
        className={`abparentdash-sidebar ${
          mobileMenu
            ? "abparentdash-sidebar-open"
            : ""
        }`}
      >

        <div className="abparentdash-brand">

          <div className="abparentdash-brand-logo">
            AB
          </div>

          <div className="abparentdash-brand-text">
            <strong>AB PUBLIC SCHOOL</strong>
            <span>Parent Portal</span>
          </div>

        </div>

        <div className="abparentdash-student-mini">

          <FaUserCircle />

          <div>
            <strong>
              {profile.student}
            </strong>

            <span>
              {profile.className}
            </span>
          </div>

        </div>

        <nav className="abparentdash-sidebar-nav">

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={
                activePage === item.name
                  ? "abparentdash-nav-item abparentdash-nav-active"
                  : "abparentdash-nav-item"
              }
              onClick={() =>
                handleMenu(item.name)
              }
            >

              <span className="abparentdash-nav-icon">
                {item.icon}
              </span>

              <span className="abparentdash-nav-text">
                {item.name}
              </span>

              <FaChevronRight className="abparentdash-nav-arrow" />

            </button>

          ))}

        </nav>

        <div className="abparentdash-sidebar-bottom">

          <button
            className="abparentdash-help-btn"
            onClick={() =>
              setShowHelp(true)
            }
          >
            <FaHeadset />
            <span>Need Help?</span>
          </button>

          <button
            className="abparentdash-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {mobileMenu && (
        <div
          className="abparentdash-mobile-overlay"
          onClick={() =>
            setMobileMenu(false)
          }
        />
      )}

      <main className="abparentdash-main">

        <header className="abparentdash-topbar">

          <div className="abparentdash-topbar-left">

            <button
              className="abparentdash-mobile-menu-btn"
              onClick={() =>
                setMobileMenu(true)
              }
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <button
              className="abparentdash-back-btn"
              onClick={() =>
                navigate("/")
              }
            >
              <FaArrowLeft />
              <span>School Website</span>
            </button>

          </div>

          <div className="abparentdash-topbar-right">

            <button
              className="abparentdash-notification-btn"
              onClick={() =>
                handleMenu("Notices")
              }
              aria-label="Open notices"
            >
              <FaBell />

              <span>
                {notices.length}
              </span>

            </button>

            <button
              className="abparentdash-top-profile"
              onClick={() =>
                handleMenu("Profile")
              }
            >

              <FaUserCircle />

              <div>
                <strong>
                  {profile.parent}
                </strong>

                <span>
                  Parent
                </span>
              </div>

              <FaChevronRight />

            </button>

          </div>

        </header>

        <section className="abparentdash-content">
          {renderPage()}
        </section>

        <footer className="abparentdash-footer">

          <div>
            <FaShieldAlt />
            <span>
              Secure Parent Portal
            </span>
          </div>

          <span>
            © 2026 AB Public School. All rights reserved.
          </span>

        </footer>

      </main>

      <AssignmentModal
        assignment={selectedAssignment}
        onClose={() =>
          setSelectedAssignment(null)
        }
      />

      <NoticeModal
        notice={selectedNotice}
        onClose={() =>
          setSelectedNotice(null)
        }
      />

      <EventModal
        event={selectedEvent}
        onClose={() =>
          setSelectedEvent(null)
        }
      />

      <HelpModal
        show={showHelp}
        onClose={() =>
          setShowHelp(false)
        }
      />

      <PaymentModal
        show={showPayment}
        onClose={closePayment}
        paymentMethods={paymentMethods}
        selectedPaymentMethod={
          selectedPaymentMethod
        }
        setSelectedPaymentMethod={
          setSelectedPaymentMethod
        }
        paymentStep={paymentStep}
        paymentDone={paymentDone}
        proceedPayment={proceedPayment}
      />

    </div>
  );
};

export default ParentDashboard;