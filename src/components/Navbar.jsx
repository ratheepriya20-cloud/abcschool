import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaTimes,
  FaUserCircle,
  FaArrowRight,
  FaFutbol,
  FaMusic,
  FaTrophy,
  FaBus,
  FaImages,
  FaBuilding,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import abLogo from "../assets/ab-logo.png";
import "./Navbar.css";


/* =========================================================
   CAMPUS LIFE DROPDOWN ITEMS
========================================================= */

const campusItems = [
  {
    title: "Sports",
    path: "/sports",
    icon: FaFutbol,
  },
  {
    title: "Cultural Activities",
    path: "/cultural-activities",
    icon: FaMusic,
  },
  {
    title: "Competitions",
    path: "/competitions",
    icon: FaTrophy,
  },
  {
    title: "Educational Trips",
    path: "/educational-trips",
    icon: FaBus,
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: FaImages,
  },
  {
    title: "Facilities",
    path: "/facilities",
    icon: FaBuilding,
  },
];


/* =========================================================
   WEBSITE SEARCH PAGES
========================================================= */

const searchPages = [
  {
    title: "Home",
    path: "/",
    description:
      "Explore AB Public School, academics, campus life and achievements.",
    keywords:
      "home school ab public school abps education students campus",
  },

  {
    title: "About Us",
    path: "/about",
    description:
      "Learn about AB Public School, our journey, values and educational approach.",
    keywords:
      "about history journey values school education",
  },

  {
    title: "Academics",
    path: "/academics",
    description:
      "Explore academic programmes, curriculum and learning opportunities.",
    keywords:
      "academics curriculum classes subjects learning education",
  },

  {
    title: "Admissions",
    path: "/admission",
    description:
      "Find admission information and the application process.",
    keywords:
      "admission apply application enrollment form",
  },

  {
    title: "Faculty",
    path: "/faculty",
    description:
      "Meet our experienced teachers and faculty members.",
    keywords:
      "faculty teachers staff educators teacher",
  },

  {
    title: "News & Notices",
    path: "/news-notices",
    description:
      "Read the latest school news, announcements and notices.",
    keywords:
      "news notices announcements updates notification",
  },

  {
    title: "Contact Us",
    path: "/contact",
    description:
      "Get in touch with AB Public School.",
    keywords:
      "contact phone email address enquiry message",
  },

  {
    title: "Campus Life",
    path: "/campus-life",
    description:
      "Explore student activities and experiences beyond classrooms.",
    keywords:
      "campus life activities sports cultural competitions trips gallery facilities",
  },

  {
    title: "Sports",
    path: "/sports",
    description:
      "Explore sports, fitness and physical activities at AB Public School.",
    keywords:
      "sports football cricket basketball badminton athletics games fitness",
  },

  {
    title: "Cultural Activities",
    path: "/cultural-activities",
    description:
      "Explore cultural programmes, music, dance and student performances.",
    keywords:
      "cultural dance music celebration performance activities",
  },

  {
    title: "Competitions",
    path: "/competitions",
    description:
      "Explore academic and co-curricular competitions.",
    keywords:
      "competition quiz debate contest academic competitions",
  },

  {
    title: "Educational Trips",
    path: "/educational-trips",
    description:
      "Explore educational trips and learning experiences.",
    keywords:
      "trips tours excursion travel educational learning",
  },

  {
    title: "Gallery",
    path: "/gallery",
    description:
      "View photographs from school activities and campus life.",
    keywords:
      "gallery photos images pictures photographs school",
  },

  {
    title: "Facilities",
    path: "/facilities",
    description:
      "Explore school facilities and modern infrastructure.",
    keywords:
      "facilities infrastructure labs library classrooms campus",
  },

  {
    title: "Apply Now",
    path: "/apply",
    description:
      "Apply for admission to AB Public School.",
    keywords:
      "apply now admission application form registration",
  },
];


/* =========================================================
   MAIN NAVIGATION
========================================================= */

const navLinks = [
  {
    label: "Home",
    path: "/",
  },

  {
    label: "About",
    path: "/about",
  },

  {
    label: "Academics",
    path: "/academics",
  },

  {
    label: "Admissions",
    path: "/admission",
  },

  {
    label: "Faculty",
    path: "/faculty",
  },

  {
    label: "Campus Life",
    path: "/campus-life",
    dropdown: true,
  },

  {
    label: "News & Notices",
    path: "/news-notices",
  },

  {
    label: "Contact",
    path: "/contact",
  },
];


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [campusOpen, setCampusOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const campusRef = useRef(null);

  /*
    IMPORTANT:
    Mobile menu ke liye alag ref.
    Isi se responsive dropdown click fix hoga.
  */
  const mobileNavRef = useRef(null);

  const searchInputRef = useRef(null);


  /* =========================================================
     CLOSE MENUS AFTER ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setCampusOpen(false);
    setSearchOpen(false);
    setSearchValue("");
  }, [
    location.pathname,
    location.hash,
  ]);


  /* =========================================================
     OUTSIDE CLICK
     FIXED FOR DESKTOP + MOBILE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideDesktop =
        campusRef.current?.contains(
          event.target
        );

      const clickedInsideMobile =
        mobileNavRef.current?.contains(
          event.target
        );

      /*
        Agar click desktop dropdown ke andar hai
        YA mobile nav ke andar hai,
        to dropdown close nahi karna.
      */
      if (
        !clickedInsideDesktop &&
        !clickedInsideMobile
      ) {
        setCampusOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCampusOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* =========================================================
     SEARCH BODY LOCK + AUTO FOCUS
  ========================================================= */

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow =
        "hidden";

      const timer =
        window.setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);

      return () => {
        window.clearTimeout(timer);

        document.body.style.overflow =
          "";
      };
    }

    document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);


  /* =========================================================
     SEARCH RESULTS
  ========================================================= */

  const searchResults = useMemo(() => {
    const query = searchValue
      .trim()
      .toLowerCase();

    if (!query) {
      return [];
    }

    const words = query
      .split(/\s+/)
      .filter(Boolean);

    return searchPages
      .map((page) => {
        let score = 0;

        const title =
          page.title.toLowerCase();

        const description =
          page.description.toLowerCase();

        const keywords =
          page.keywords.toLowerCase();

        words.forEach((word) => {
          if (title.includes(word)) {
            score += 10;
          }

          if (keywords.includes(word)) {
            score += 6;
          }

          if (
            description.includes(word)
          ) {
            score += 3;
          }
        });

        return {
          ...page,
          score,
        };
      })

      .filter(
        (page) =>
          page.score > 0
      )

      .sort(
        (a, b) =>
          b.score - a.score
      )

      .slice(0, 8);
  }, [searchValue]);


  /* =========================================================
     ACTIVE NAV LINK
  ========================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (
      path === "/campus-life"
    ) {
      const campusRoutes = [
        "/campus-life",
        "/sports",
        "/cultural-activities",
        "/competitions",
        "/educational-trips",
        "/gallery",
        "/facilities",
      ];

      return campusRoutes.some(
        (route) =>
          location.pathname.startsWith(
            route
          )
      );
    }

    return location.pathname.startsWith(
      path
    );
  };


  /* =========================================================
     CAMPUS DROPDOWN
  ========================================================= */

  const handleCampusToggle = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setCampusOpen(
      (previous) => !previous
    );

    setSearchOpen(false);
  };


  /* =========================================================
     MOBILE CAMPUS LINK
  ========================================================= */

  const handleMobileCampusLink = () => {
    setCampusOpen(false);
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================================================
     SEARCH OPEN
  ========================================================= */

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setCampusOpen(false);
    setMobileOpen(false);
  };


  /* =========================================================
     SEARCH RESULT NAVIGATION
  ========================================================= */

  const handleSearchResult = (
    path
  ) => {
    setSearchOpen(false);
    setSearchValue("");

    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="abpsProNavbar">

        <div className="abpsProNavbarInner">

          {/* BRAND */}

          <Link
            to="/"
            className="abpsProBrand"
            aria-label="AB Public School Home"
            onClick={() => {
              setMobileOpen(false);
              setCampusOpen(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <img
              src={abLogo}
              alt="AB Public School"
              className="abpsProNavbarLogo"
            />
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="abpsProDesktopNav">

            {navLinks.map((item) => {

              /* CAMPUS LIFE DROPDOWN */

              if (item.dropdown) {
                return (
                  <div
                    className="abpsProCampusWrapper"
                    ref={campusRef}
                    key={item.label}
                  >

                    <button
                      type="button"
                      className={`abpsProNavLink abpsProCampusButton ${
                        isActive(
                          item.path
                        )
                          ? "abpsProNavActive"
                          : ""
                      }`}
                      onClick={
                        handleCampusToggle
                      }
                    >
                      <span>
                        {item.label}
                      </span>

                      <FaChevronDown
                        className={
                          campusOpen
                            ? "abpsProChevronOpen"
                            : ""
                        }
                      />
                    </button>


                    {/* =======================================
                        DESKTOP CAMPUS DROPDOWN
                    ======================================= */}

                    {campusOpen && (
                      <div className="abpsProCampusDropdown">

                        <div className="abpsProCampusDropdownHeader">

                          <div>
                            <span className="abpsProCampusEyebrow">
                              LIFE AT ABPS
                            </span>

                            <h3>
                              Explore Campus Life
                            </h3>

                            <p>
                              Discover the experiences,
                              activities and opportunities
                              beyond the classroom.
                            </p>
                          </div>


                          <Link
                            to="/campus-life"
                            className="abpsProCampusViewAll"
                            onClick={() =>
                              setCampusOpen(
                                false
                              )
                            }
                          >
                            View All

                            <FaArrowRight />
                          </Link>

                        </div>


                        <div className="abpsProCampusGrid">

                          {campusItems.map(
                            (campusItem) => {
                              const Icon =
                                campusItem.icon;

                              return (
                                <Link
                                  to={
                                    campusItem.path
                                  }
                                  key={
                                    campusItem.title
                                  }
                                  className="abpsProCampusCard"
                                  onClick={() =>
                                    setCampusOpen(
                                      false
                                    )
                                  }
                                >
                                  <span className="abpsProCampusIcon">
                                    <Icon />
                                  </span>

                                  <span className="abpsProCampusCardText">
                                    <strong>
                                      {
                                        campusItem.title
                                      }
                                    </strong>
                                  </span>

                                  <FaChevronRight className="abpsProCampusArrow" />
                                </Link>
                              );
                            }
                          )}

                        </div>

                      </div>
                    )}

                  </div>
                );
              }


              /* NORMAL DESKTOP LINKS */

              return (
                <Link
                  to={item.path}
                  key={item.label}
                  className={`abpsProNavLink ${
                    isActive(
                      item.path
                    )
                      ? "abpsProNavActive"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

          </nav>


          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="abpsProNavbarActions">

            {/* SEARCH */}

            <button
              type="button"
              className="abpsProIconButton"
              onClick={
                handleSearchOpen
              }
              aria-label="Search"
              title="Search"
            >
              <FaSearch />
            </button>


            {/* LOGIN */}

            <Link
              to="/login"
              className="abpsProAccountButton"
              aria-label="Sign In"
              title="Sign In"
            >
              <FaUserCircle />
            </Link>


            {/* ADMISSION */}

            <Link
              to="/apply"
              className="abpsProApplyButton"
            >
              Admission
            </Link>


            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              className="abpsProMobileButton"
              onClick={() => {
                setMobileOpen(
                  (previous) =>
                    !previous
                );

                setCampusOpen(false);
              }}
              aria-label="Menu"
            >
              {mobileOpen
                ? <FaTimes />
                : <FaBars />}
            </button>

          </div>

        </div>


        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        {mobileOpen && (
          <div
            className="abpsProMobileNav"
            ref={mobileNavRef}
          >

            {navLinks.map((item) => {

              /* =============================================
                 MOBILE CAMPUS LIFE
              ============================================= */

              if (item.dropdown) {
                return (
                  <div
                    className="abpsProMobileCampus"
                    key={item.label}
                  >

                    <button
                      type="button"
                      className={`abpsProMobileLink abpsProMobileCampusButton ${
                        isActive(
                          item.path
                        )
                          ? "abpsProMobileActive"
                          : ""
                      }`}
                      onClick={
                        handleCampusToggle
                      }
                    >
                      <span>
                        {item.label}
                      </span>

                      <FaChevronDown
                        className={
                          campusOpen
                            ? "abpsProChevronOpen"
                            : ""
                        }
                      />
                    </button>


                    {/* MOBILE DROPDOWN */}

                    {campusOpen && (
                      <div className="abpsProMobileCampusMenu">

                        {/* VIEW ALL */}

                        <Link
                          to="/campus-life"
                          className="abpsProMobileCampusItem abpsProMobileViewAll"
                          onClick={
                            handleMobileCampusLink
                          }
                        >
                          <span className="abpsProMobileCampusIcon">
                            <FaBuilding />
                          </span>

                          <span>
                            View All Campus Life
                          </span>

                          <FaChevronRight />
                        </Link>


                        {/* CAMPUS ITEMS */}

                        {campusItems.map(
                          (campusItem) => {
                            const Icon =
                              campusItem.icon;

                            return (
                              <Link
                                key={
                                  campusItem.title
                                }
                                to={
                                  campusItem.path
                                }
                                className="abpsProMobileCampusItem"
                                onClick={
                                  handleMobileCampusLink
                                }
                              >
                                <span className="abpsProMobileCampusIcon">
                                  <Icon />
                                </span>

                                <span>
                                  {
                                    campusItem.title
                                  }
                                </span>

                                <FaChevronRight />
                              </Link>
                            );
                          }
                        )}

                      </div>
                    )}

                  </div>
                );
              }


              /* =============================================
                 NORMAL MOBILE LINK
              ============================================= */

              return (
                <Link
                  to={item.path}
                  key={item.label}
                  className={`abpsProMobileLink ${
                    isActive(
                      item.path
                    )
                      ? "abpsProMobileActive"
                      : ""
                  }`}
                  onClick={() => {
                    setMobileOpen(false);
                    setCampusOpen(false);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  {item.label}
                </Link>
              );
            })}


            <div className="abpsProMobileDivider" />


            {/* LOGIN */}

            <Link
              to="/login"
              className="abpsProMobileAccountLink"
              onClick={() => {
                setMobileOpen(false);
                setCampusOpen(false);
              }}
            >
              <FaUserCircle />

              <span>
                Sign In
              </span>

              <FaArrowRight />
            </Link>


            {/* ADMISSION */}

            <Link
              to="/apply"
              className="abpsProMobileApply"
              onClick={() => {
                setMobileOpen(false);
                setCampusOpen(false);
              }}
            >
              <span>
                Admission
              </span>

              <FaArrowRight />
            </Link>

          </div>
        )}

      </header>


      {/* =====================================================
          SEARCH OVERLAY
      ===================================================== */}

      {searchOpen && (
        <div
          className="abpsProSearchOverlay"
          onMouseDown={(event) => {
            if (
              event.target.classList.contains(
                "abpsProSearchOverlay"
              )
            ) {
              setSearchOpen(false);
            }
          }}
        >

          <div className="abpsProSearchPanel">

            {/* SEARCH HEADER */}

            <div className="abpsProSearchHeader">

              <div>
                <span className="abpsProSearchEyebrow">
                  AB PUBLIC SCHOOL
                </span>

                <h2>
                  Search Our Website
                </h2>

                <p>
                  Find admissions, academics,
                  activities, facilities,
                  faculty and more.
                </p>
              </div>


              <button
                type="button"
                className="abpsProSearchClose"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchValue("");
                }}
                aria-label="Close Search"
              >
                <FaTimes />
              </button>

            </div>


            {/* SEARCH INPUT */}

            <div className="abpsProSearchInputBox">

              <FaSearch />

              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(
                    event.target.value
                  )
                }
                placeholder="Search admissions, academics, sports..."
              />

              {searchValue && (
                <button
                  type="button"
                  className="abpsProSearchClear"
                  onClick={() =>
                    setSearchValue("")
                  }
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}

            </div>


            {/* =============================================
                DEFAULT SEARCH STATE
            ============================================= */}

            {!searchValue.trim() && (
              <div className="abpsProSearchEmpty">

                <div className="abpsProSearchEmptyIcon">
                  <FaSearch />
                </div>

                <h3>
                  What are you looking for?
                </h3>

                <p>
                  Try searching for Admissions,
                  Academics, Sports, Faculty,
                  Gallery or Contact.
                </p>

              </div>
            )}


            {/* =============================================
                SEARCH RESULTS
            ============================================= */}

            {searchValue.trim() &&
              searchResults.length > 0 && (

                <div className="abpsProSearchResults">

                  <div className="abpsProSearchResultTitle">

                    <strong>
                      Search Results
                    </strong>

                    <span>
                      {searchResults.length}{" "}
                      result
                      {searchResults.length > 1
                        ? "s"
                        : ""}
                    </span>

                  </div>


                  <div className="abpsProSearchList">

                    {searchResults.map(
                      (result) => (

                        <button
                          type="button"
                          key={result.path}
                          className="abpsProSearchResult"
                          onClick={() =>
                            handleSearchResult(
                              result.path
                            )
                          }
                        >

                          <span className="abpsProSearchResultIcon">
                            <FaSearch />
                          </span>

                          <span className="abpsProSearchResultContent">

                            <strong>
                              {result.title}
                            </strong>

                            <small>
                              {
                                result.description
                              }
                            </small>

                          </span>

                          <FaArrowRight />

                        </button>

                      )
                    )}

                  </div>

                </div>
              )}


            {/* =============================================
                NO RESULTS
            ============================================= */}

            {searchValue.trim() &&
              searchResults.length === 0 && (

                <div className="abpsProNoResults">

                  <div className="abpsProNoResultsIcon">
                    <FaSearch />
                  </div>

                  <h3>
                    No Results Found
                  </h3>

                  <p>
                    We couldn't find a page
                    matching{" "}

                    <strong>
                      "{searchValue}"
                    </strong>.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setSearchValue("")
                    }
                  >
                    Try Another Search
                  </button>

                </div>
              )}

          </div>

        </div>
      )}

    </>
  );
};


export default Navbar;