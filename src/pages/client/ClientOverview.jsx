import React from "react";

import {
  FaFileAlt,
  FaImage,
  FaNewspaper,
  FaBullhorn,
  FaImages,
  FaHome,
  FaInfoCircle,
  FaBookOpen,
  FaUserPlus,
  FaBuilding,
  FaRunning,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

import "./ClientOverview.css";

import schoolHero from "../../assets/school-hero-bg.png";


const ClientOverview = ({
  onNavigate,
}) => {

  /* =========================================================
     TOP STATS
  ========================================================= */

  const stats = [
    {
      label: "Website Pages",
      value: "8",
      icon: FaFileAlt,
      type: "blue",
    },
    {
      label: "Website Images",
      value: "15",
      icon: FaImage,
      type: "green",
    },
    {
      label: "News Posts",
      value: "12",
      icon: FaNewspaper,
      type: "red",
    },
    {
      label: "Public Notices",
      value: "8",
      icon: FaBullhorn,
      type: "orange",
    },
    {
      label: "Gallery Images",
      value: "24",
      icon: FaImages,
      type: "purple",
    },
  ];


  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  const actions = [
    {
      id: "home",
      title: "Home Content",
      text:
        "Update hero, welcome, features and more",
      icon: FaHome,
      type: "blue",
    },

    {
      id: "about",
      title: "About Content",
      text:
        "Update school introduction, vision etc.",
      icon: FaInfoCircle,
      type: "green",
    },

    {
      id: "academics",
      title: "Academics",
      text:
        "Update academic programs and details",
      icon: FaBookOpen,
      type: "pink",
    },

    {
      id: "admission",
      title: "Admission",
      text:
        "Update admission information",
      icon: FaUserPlus,
      type: "orange",
    },

    {
      id: "facilities",
      title: "Facilities",
      text:
        "Update facility details and images",
      icon: FaBuilding,
      type: "purple",
    },

    {
      id: "activities",
      title: "Activities",
      text:
        "Update sports, cultural events and more",
      icon: FaRunning,
      type: "lime",
    },

    {
      id: "faculty",
      title: "Faculty",
      text:
        "Update public faculty information",
      icon: FaChalkboardTeacher,
      type: "cyan",
    },

    {
      id: "contact",
      title: "Contact",
      text:
        "Update address, map and contact details",
      icon: FaPhoneAlt,
      type: "yellow",
    },
  ];


  /* =========================================================
     RECENT ACTIVITY
  ========================================================= */

  const recentUpdates = [
    {
      icon: FaFileAlt,
      title:
        "Homepage content updated",
      text:
        "Hero section text changed",
      time:
        "2 hours ago",
      type:
        "green",
    },

    {
      icon: FaImage,
      title:
        "New image uploaded",
      text:
        "Hero background image",
      time:
        "5 hours ago",
      type:
        "cyan",
    },

    {
      icon: FaNewspaper,
      title:
        "News post added",
      text:
        "Annual Sports Day 2026",
      time:
        "1 day ago",
      type:
        "red",
    },

    {
      icon: FaBullhorn,
      title:
        "Public notice published",
      text:
        "Summer Vacation Notice",
      time:
        "2 days ago",
      type:
        "orange",
    },

    {
      icon: FaImages,
      title:
        "Gallery image added",
      text:
        "Independence Day Event",
      time:
        "3 days ago",
      type:
        "purple",
    },
  ];


  return (
    <div className="clientOverview">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="clientOverviewHero"
      >

        <img
          src={schoolHero}
          alt="AB Public School"
        />

        <div className="clientOverviewHeroOverlay" />

        <div className="clientOverviewHeroContent">

          <span className="clientOverviewLabel">
            WELCOME TO CLIENT CMS
          </span>

          <h1>
            Manage Your
            <strong>
              School Website
            </strong>
          </h1>

          <p>
            Update your school's
            content, images, news,
            notices and more without
            changing the website
            design or layout.
          </p>

          <div className="clientOverviewSafe">
            <FaCheckCircle />

            Layout & design protected
          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="clientOverviewStats">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="clientOverviewStat"
            >

              <div
                className={`clientOverviewStatIcon ${item.type}`}
              >
                <Icon />
              </div>

              <div>
                <strong>
                  {item.value}
                </strong>

                <span>
                  {item.label}
                </span>
              </div>

            </article>
          );
        })}

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="clientOverviewSection">

        <div className="clientOverviewHeading">
          <h2>
            Quick Actions
          </h2>

          <p>
            Choose what you want to
            manage
          </p>
        </div>


        <div className="clientQuickGrid">

          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className={`clientQuickCard ${item.type}`}
                onClick={() =>
                  onNavigate?.(
                    item.id
                  )
                }
              >

                <div className="clientQuickIcon">
                  <Icon />
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <button
                  type="button"
                  aria-label={`Open ${item.title}`}
                >
                  <FaArrowRight />
                </button>

              </article>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          LOWER GRID
      ===================================================== */}

      <section className="clientOverviewBottomGrid">

        {/* RECENT UPDATES */}

        <article className="clientOverviewPanel">

          <div className="clientPanelHeader">

            <h2>
              Recent Updates
            </h2>

            <button>
              View All
            </button>

          </div>


          <div className="clientRecentList">

            {recentUpdates.map(
              (item, index) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    className="clientRecentItem"
                    key={index}
                  >

                    <div
                      className={`clientRecentIcon ${item.type}`}
                    >
                      <Icon />
                    </div>

                    <div className="clientRecentContent">

                      <strong>
                        {item.title}
                      </strong>

                      <span>
                        {item.text}
                      </span>

                    </div>

                    <small>
                      {item.time}
                    </small>

                  </div>
                );
              }
            )}

          </div>

        </article>


        {/* WEBSITE PREVIEW */}

        <article className="clientOverviewPanel clientPreviewPanel">

          <div className="clientPanelHeader">

            <h2>
              Website Preview
            </h2>

            <button
              onClick={() =>
                window.open(
                  "/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <FaExternalLinkAlt />
            </button>

          </div>


          <div className="clientSitePreview">

            <div className="clientSiteMiniNav">

              <strong>
                AB PUBLIC SCHOOL
              </strong>

              <div>
                <span>Home</span>
                <span>About</span>
                <span>Academics</span>
              </div>

            </div>


            <div className="clientSitePreviewImage">

              <img
                src={schoolHero}
                alt="Website preview"
              />

              <div />

              <section>

                <h3>
                  Inspiring Young Minds.
                  <br />
                  Shaping Bright Futures.
                </h3>

                <p>
                  A modern learning
                  environment where
                  curiosity and
                  confidence grow.
                </p>

                <button>
                  Apply for Admission
                </button>

              </section>

            </div>


            <div className="clientMiniStats">

              <span>
                <strong>
                  1500+
                </strong>
                Students
              </span>

              <span>
                <strong>
                  40+
                </strong>
                Teachers
              </span>

              <span>
                <strong>
                  98%
                </strong>
                Results
              </span>

              <span>
                <strong>
                  30+
                </strong>
                Activities
              </span>

            </div>

          </div>

        </article>


        {/* MEDIA */}

        <article className="clientOverviewPanel">

          <div className="clientPanelHeader">

            <div>
              <h2>
                Media Overview
              </h2>

              <p>
                Manage website images
                and gallery
              </p>
            </div>

          </div>


          <div className="clientMediaCards">

            <div className="clientMediaCard">

              <div className="clientMediaTitle">

                <span className="image">
                  <FaImage />
                </span>

                <strong>
                  Website Images
                </strong>

              </div>

              <p>
                Replace images used on
                the website.
              </p>

              <img
                src={schoolHero}
                alt="Website images"
              />

              <button
                onClick={() =>
                  onNavigate?.(
                    "images"
                  )
                }
              >
                Manage Images
                <FaArrowRight />
              </button>

            </div>


            <div className="clientMediaCard">

              <div className="clientMediaTitle">

                <span className="gallery">
                  <FaImages />
                </span>

                <strong>
                  Gallery
                </strong>

              </div>

              <p>
                Add and manage public
                gallery photos.
              </p>

              <div className="clientGalleryMini">

                <img
                  src={schoolHero}
                  alt=""
                />

                <img
                  src={schoolHero}
                  alt=""
                />

                <img
                  src={schoolHero}
                  alt=""
                />

                <img
                  src={schoolHero}
                  alt=""
                />

              </div>

              <button
                onClick={() =>
                  onNavigate?.(
                    "gallery"
                  )
                }
              >
                Manage Gallery
                <FaArrowRight />
              </button>

            </div>

          </div>

        </article>

      </section>

    </div>
  );
};

export default ClientOverview;