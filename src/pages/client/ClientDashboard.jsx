import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaGlobe,
  FaImage,
  FaNewspaper,
  FaBullhorn,
  FaImages,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
  FaUserCircle,
  FaSchool,
  FaInfoCircle,
  FaBookOpen,
  FaUserPlus,
  FaBuilding,
  FaRunning,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaEye,
  FaSearch,
  FaBell,
  FaExternalLinkAlt,
} from "react-icons/fa";

import "./ClientDashboard.css";

import ClientOverview from "./ClientOverview";
import WebsiteContent from "./WebsiteContent";
import WebsiteImages from "./WebsiteImages";
import ClientNews from "./ClientNews";
import ClientNotices from "./ClientNotices";
import ClientGallery from "./ClientGallery";


const ClientDashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] =
    useState("overview");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [contentOpen, setContentOpen] =
    useState(true);


  /* =========================================================
     WEBSITE PAGES
  ========================================================= */

  const websitePages = [
    {
      id: "home",
      name: "Home",
      icon: FaHome,
    },
    {
      id: "about",
      name: "About",
      icon: FaInfoCircle,
    },
    {
      id: "academics",
      name: "Academics",
      icon: FaBookOpen,
    },
    {
      id: "admission",
      name: "Admission",
      icon: FaUserPlus,
    },
    {
      id: "facilities",
      name: "Facilities",
      icon: FaBuilding,
    },
    {
      id: "activities",
      name: "Activities",
      icon: FaRunning,
    },
    {
      id: "faculty",
      name: "Faculty Content",
      icon: FaChalkboardTeacher,
    },
    {
      id: "contact",
      name: "Contact Content",
      icon: FaPhoneAlt,
    },
  ];


  /* =========================================================
     CHANGE PAGE
  ========================================================= */

  const changePage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    /*
      Agar aapke authData.js me logoutUser()
      bana hua hai to later isko logoutUser()
      se replace kar dena.
    */

    localStorage.removeItem(
      "abpsAuthSession"
    );

    navigate("/login");
  };


  /* =========================================================
     CURRENT PAGE NAME
  ========================================================= */

  const getCurrentPageName = () => {
    if (activePage === "overview") {
      return "Dashboard";
    }

    if (activePage === "news") {
      return "News";
    }

    if (activePage === "notices") {
      return "Public Notices";
    }

    if (activePage === "gallery") {
      return "Gallery";
    }

    if (activePage === "images") {
      return "Website Images";
    }

    const found = websitePages.find(
      (item) => item.id === activePage
    );

    return found?.name || "Client CMS";
  };


  /* =========================================================
     RENDER PAGE
  ========================================================= */

  const renderContent = () => {
    if (activePage === "overview") {
      return (
        <ClientOverview
          onNavigate={changePage}
        />
      );
    }

    if (
      websitePages.some(
        (item) =>
          item.id === activePage
      )
    ) {
      return (
        <WebsiteContent
          page={activePage}
        />
      );
    }

    if (activePage === "news") {
      return <ClientNews />;
    }

    if (activePage === "notices") {
      return <ClientNotices />;
    }

    if (activePage === "gallery") {
      return <ClientGallery />;
    }

    if (activePage === "images") {
      return <WebsiteImages />;
    }

    return (
      <ClientOverview
        onNavigate={changePage}
      />
    );
  };


  return (
    <div className="abClientShell">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="abClientOverlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`abClientSidebar ${
          sidebarOpen
            ? "abClientSidebarOpen"
            : ""
        }`}
      >

        {/* BRAND */}

        <div className="abClientBrand">

          <div className="abClientBrandLogo">
            <FaSchool />
          </div>

          <div className="abClientBrandText">
            <strong>
              AB PUBLIC SCHOOL
            </strong>

            <span>
              Client CMS Panel
            </span>
          </div>

          <button
            className="abClientSidebarClose"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes />
          </button>

        </div>


        {/* SIDEBAR NAV */}

        <div className="abClientSidebarScroll">

          <nav className="abClientNav">

            {/* DASHBOARD */}

            <button
              className={`abClientNavMain ${
                activePage === "overview"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                changePage("overview")
              }
            >
              <FaHome />

              <span>
                Dashboard
              </span>
            </button>


            {/* WEBSITE CONTENT */}

            <div className="abClientNavGroup">

              <p className="abClientNavTitle">
                WEBSITE CONTENT
              </p>

              <button
                className="abClientNavParent"
                onClick={() =>
                  setContentOpen(
                    !contentOpen
                  )
                }
              >
                <FaGlobe />

                <span>
                  Website Pages
                </span>

                {contentOpen ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </button>


              {contentOpen && (
                <div className="abClientSubNav">

                  {websitePages.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <button
                          key={item.id}
                          className={
                            activePage ===
                            item.id
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            changePage(
                              item.id
                            )
                          }
                        >
                          <Icon />

                          <span>
                            {item.name}
                          </span>

                          <FaChevronRight className="abClientArrow" />
                        </button>
                      );
                    }
                  )}

                </div>
              )}

            </div>


            {/* PUBLIC UPDATES */}

            <div className="abClientNavGroup">

              <p className="abClientNavTitle">
                PUBLIC UPDATES
              </p>

              <button
                className={
                  activePage === "news"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changePage("news")
                }
              >
                <FaNewspaper />

                <span>
                  News
                </span>

                <FaChevronRight className="abClientArrow" />
              </button>


              <button
                className={
                  activePage ===
                  "notices"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changePage("notices")
                }
              >
                <FaBullhorn />

                <span>
                  Public Notices
                </span>

                <FaChevronRight className="abClientArrow" />
              </button>

            </div>


            {/* MEDIA */}

            <div className="abClientNavGroup">

              <p className="abClientNavTitle">
                MEDIA
              </p>

              <button
                className={
                  activePage ===
                  "gallery"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changePage("gallery")
                }
              >
                <FaImages />

                <span>
                  Gallery
                </span>

                <FaChevronRight className="abClientArrow" />
              </button>


              <button
                className={
                  activePage ===
                  "images"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changePage("images")
                }
              >
                <FaImage />

                <span>
                  Website Images
                </span>

                <FaChevronRight className="abClientArrow" />
              </button>

            </div>

          </nav>

        </div>


        {/* BOTTOM */}

        <div className="abClientSidebarBottom">

          <button
            className="abClientViewWebsite"
            onClick={() =>
              window.open(
                "/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <FaEye />

            <span>
              View Website
            </span>

            <FaExternalLinkAlt />
          </button>


          <button
            className="abClientLogout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <main className="abClientMain">

        {/* TOP BAR */}

        <header className="abClientTopbar">

          <div className="abClientTopLeft">

            <button
              className="abClientMenuButton"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FaBars />
            </button>


            <div className="abClientSearch">

              <FaSearch />

              <input
                type="text"
                placeholder="Search in CMS..."
              />

            </div>

          </div>


          <div className="abClientTopRight">

            <button className="abClientNotification">
              <FaBell />

              <span>
                3
              </span>
            </button>


            <div className="abClientUser">

              <div className="abClientAvatar">
                W
              </div>

              <div>
                <strong>
                  Website Client
                </strong>

                <span>
                  Content Manager
                </span>
              </div>

              <FaChevronDown />

            </div>

          </div>

        </header>


        {/* MOBILE PAGE NAME */}

        <div className="abClientMobilePageName">
          {getCurrentPageName()}
        </div>


        {/* CONTENT */}

        <div className="abClientPageContent">
          {renderContent()}
        </div>

      </main>

    </div>
  );
};

export default ClientDashboard;