import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaSearch,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import "./Navbar.css";

const aboutLinks = [
  { label: "About School", path: "/about" },
  { label: "Vision & Mission", path: "/vision-mission" },
  { label: "Leadership", path: "/leadership" },
  { label: "Why Choose Us", path: "/why-us" },
];

const academicLinks = [
  { label: "Pre-Primary", path: "/academics/pre-primary" },
  { label: "Primary School", path: "/academics/primary" },
  { label: "Middle School", path: "/academics/middle" },
  { label: "Senior Secondary", path: "/academics/senior-secondary" },
  { label: "Curriculum", path: "/academics/curriculum" },
  { label: "Examination", path: "/academics/examination" },
];

const activityLinks = [
  { label: "Sports", path: "/sports" },
  { label: "Cultural Activities", path: "/cultural" },
  { label: "Competitions", path: "/competitions" },
  { label: "Educational Trips", path: "/trips" },
];

const admissionLinks = [
  { label: "Admission Overview", path: "/admission" },
  { label: "Eligibility", path: "/admission/eligibility" },
  { label: "Fee Structure", path: "/admission/fees" },
  { label: "Important Dates", path: "/admission/dates" },
  { label: "Prospectus", path: "/admission/prospectus" },
];

const searchPages = [
  { label: "About School", path: "/about" },
  { label: "Principal's Message", path: "/principal-message" },
  { label: "Vision & Mission", path: "/vision-mission" },
  { label: "Leadership", path: "/leadership" },
  { label: "Why Choose Us", path: "/why-us" },
  { label: "Academics", path: "/academics" },
  { label: "Facilities", path: "/facilities" },
  { label: "Sports", path: "/sports" },
  { label: "Cultural Activities", path: "/cultural" },
  { label: "Competitions", path: "/competitions" },
  { label: "Educational Trips", path: "/trips" },
  { label: "Admission", path: "/admission" },
  { label: "Gallery", path: "/gallery" },
  { label: "Notices", path: "/notices" },
  { label: "Contact", path: "/contact" },
  { label: "Sign In", path: "/sign-in" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);

  const isLoggedIn = Boolean(
    localStorage.getItem("abpsCurrentUser")
  );

  const toggleDropdown = (name) => {
    setOpenDropdown((current) =>
      current === name ? null : name
    );
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/parent-dashboard");
    } else {
      navigate("/sign-in");
    }

    closeMobileMenu();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const results = searchPages.filter((page) =>
      page.label
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchResults.length > 0) {
      navigate(searchResults[0].path);

      setSearchOpen(false);
      setSearchValue("");
      setSearchResults([]);
    }
  };

  const handleSearchResult = (path) => {
    navigate(path);

    setSearchOpen(false);
    setSearchValue("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
        setSearchOpen(false);
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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setSearchOpen(false);
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add(
        "abpsnav-mobile-lock"
      );
    } else {
      document.body.classList.remove(
        "abpsnav-mobile-lock"
      );
    }

    return () => {
      document.body.classList.remove(
        "abpsnav-mobile-lock"
      );
    };
  }, [mobileOpen]);

  const Dropdown = ({ name, title, links }) => {
    const isOpen = openDropdown === name;

    return (
      <div
        className={`abpsnav-dropdown-wrap ${
          isOpen ? "abpsnav-dropdown-open" : ""
        }`}
      >
        <button
          type="button"
          className="abpsnav-dropdown-trigger"
          onClick={() => toggleDropdown(name)}
          aria-expanded={isOpen}
        >
          <span>{title}</span>

          <FaChevronDown
            className={`abpsnav-chevron ${
              isOpen
                ? "abpsnav-chevron-active"
                : ""
            }`}
          />
        </button>

        <div className="abpsnav-dropdown-box">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="abpsnav-dropdown-link"
              onClick={closeMobileMenu}
            >
              <span>{item.label}</span>

              <FaArrowRight />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header
      className="abpsnav-header"
      ref={navbarRef}
    >
      <div className="abpsnav-container">

        <Link
          to="/"
          className="abpsnav-brand"
          onClick={closeMobileMenu}
        >
          <div className="abpsnav-logo">
            AB
          </div>

          <div className="abpsnav-brand-text">
            <strong>AB PUBLIC SCHOOL</strong>

          </div>
        </Link>

        <nav
          className={`abpsnav-menu ${
            mobileOpen
              ? "abpsnav-menu-open"
              : ""
          }`}
        >
          <Link
            to="/"
            className="abpsnav-link"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Dropdown
            name="about"
            title="About Us"
            links={aboutLinks}
          />

          <Dropdown
            name="academics"
            title="Academics"
            links={academicLinks}
          />

          <Link
            to="/facilities"
            className="abpsnav-link"
            onClick={closeMobileMenu}
          >
            Facilities
          </Link>

          <Dropdown
            name="activities"
            title="Activities"
            links={activityLinks}
          />

          <Dropdown
            name="admissions"
            title="Admissions"
            links={admissionLinks}
          />

          <Link
            to="/gallery"
            className="abpsnav-link"
            onClick={closeMobileMenu}
          >
            Gallery
          </Link>

          <Link
            to="/notices"
            className="abpsnav-link"
            onClick={closeMobileMenu}
          >
            Notices
          </Link>

          <Link
            to="/contact"
            className="abpsnav-link"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <div className="abpsnav-mobile-actions">

            <button
              type="button"
              className="abpsnav-mobile-account"
              onClick={handleAccountClick}
            >
              <FaUser />

              <span>
                {isLoggedIn
                  ? "Parent Dashboard"
                  : "Sign In"}
              </span>
            </button>

            <Link
              to="/apply"
              className="abpsnav-mobile-apply"
              onClick={closeMobileMenu}
            >
              <span>Apply Now</span>

              <FaArrowRight />
            </Link>

          </div>
        </nav>

        <div className="abpsnav-actions">

          <div className="abpsnav-search-area">

            <button
              type="button"
              className="abpsnav-search-btn"
              onClick={() => {
                setSearchOpen(
                  (current) => !current
                );
                setOpenDropdown(null);
              }}
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {searchOpen && (
              <div className="abpsnav-search-panel">

                <form
                  onSubmit={handleSearchSubmit}
                >
                  <div className="abpsnav-search-input-wrap">

                    <FaSearch />

                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchValue}
                      onChange={handleSearchChange}
                      placeholder="Search school website..."
                    />

                  </div>
                </form>

                {searchValue.trim() && (
                  <div className="abpsnav-search-results">

                    {searchResults.length > 0 ? (
                      searchResults.map(
                        (result) => (
                          <button
                            type="button"
                            key={result.path}
                            onClick={() =>
                              handleSearchResult(
                                result.path
                              )
                            }
                          >
                            <span>
                              {result.label}
                            </span>

                            <FaArrowRight />
                          </button>
                        )
                      )
                    ) : (
                      <div className="abpsnav-no-result">
                        No results found
                      </div>
                    )}

                  </div>
                )}

              </div>
            )}

          </div>

          <button
            type="button"
            className="abpsnav-account-icon"
            onClick={handleAccountClick}
            aria-label={
              isLoggedIn
                ? "Parent Dashboard"
                : "Sign In"
            }
            title={
              isLoggedIn
                ? "Parent Dashboard"
                : "Sign In"
            }
          >
            <FaUser />
          </button>

          <Link
            to="/apply"
            className="abpsnav-apply-btn"
          >
            <span>Apply Now</span>

            <FaArrowRight />
          </Link>

          <button
            type="button"
            className="abpsnav-mobile-toggle"
            onClick={() => {
              setMobileOpen(
                (current) => !current
              );

              setSearchOpen(false);
              setOpenDropdown(null);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;