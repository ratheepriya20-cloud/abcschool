import React, { useEffect, useState } from "react";
import {
  FaSave,
  FaUndo,
  FaEye,
  FaHome,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import "./WebsiteContent.css";

import {
  getPageContent,
  updatePageContent,
  resetPageContent,
} from "../../data/websiteContentData";


/* =========================================================
   PAGE NAMES
========================================================= */

const pageNames = {
  home: "Home Page",
  about: "About Page",
  academics: "Academics Page",
  admission: "Admission Page",
  facilities: "Facilities Page",
  activities: "Activities Page",
  faculty: "Faculty Page",
  contact: "Contact Page",
};


/* =========================================================
   HOME SECTIONS
========================================================= */

const homeSections = [
  {
    id: "hero",
    number: "01",
    title: "Hero Section",
    text: "Main heading, description and action buttons.",
  },
  {
    id: "admission",
    number: "02",
    title: "Admission Card",
    text: "Admission information displayed inside the hero.",
  },
  {
    id: "stats",
    number: "03",
    title: "Hero Statistics",
    text: "Students, teachers, results and activities.",
  },
  {
    id: "welcome",
    number: "04",
    title: "Welcome Section",
    text: "About school content shown on the homepage.",
  },
  {
    id: "updates",
    number: "05",
    title: "News & Notices",
    text: "Section heading and supporting content.",
  },
  {
    id: "gallery",
    number: "06",
    title: "Gallery Section",
    text: "Homepage gallery headings and CTA.",
  },
  {
    id: "achievements",
    number: "07",
    title: "Achievements",
    text: "Achievement section headings and CTA.",
  },
  {
    id: "principal",
    number: "08",
    title: "Principal Message",
    text: "Principal message content and quote.",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const WebsiteContent = ({ page = "home" }) => {
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");


  /* =======================================================
     LOAD PAGE
  ======================================================= */

  const loadPage = () => {
    const data = getPageContent(page);

    setFormData(data || {});
    setSaved(false);
  };


  useEffect(() => {
    loadPage();

    if (page === "home") {
      setActiveSection("hero");
    }
  }, [page]);


  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };


  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = () => {
    updatePageContent(page, formData);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    const confirmed = window.confirm(
      `Reset ${pageNames[page] || "this page"} content to default?`
    );

    if (!confirmed) return;

    const resetData = resetPageContent(page);

    if (resetData) {
      setFormData(resetData);
    }

    setSaved(false);
  };


  /* =======================================================
     PREVIEW
  ======================================================= */

  const handlePreview = () => {
    const routes = {
      home: "/",
      about: "/about",
      academics: "/academics",
      admission: "/admission",
      facilities: "/facilities",
      activities: "/activities",
      faculty: "/faculty",
      contact: "/contact",
    };

    window.open(
      routes[page] || "/",
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =======================================================
     REUSABLE FIELD
  ======================================================= */

  const renderInput = (
    label,
    name,
    placeholder = ""
  ) => (
    <div className="wcms-field">
      <label htmlFor={`wcms-${name}`}>
        {label}
      </label>

      <input
        id={`wcms-${name}`}
        type="text"
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );


  const renderTextarea = (
    label,
    name,
    rows = 4,
    placeholder = ""
  ) => (
    <div className="wcms-field">
      <label htmlFor={`wcms-${name}`}>
        {label}
      </label>

      <textarea
        id={`wcms-${name}`}
        name={name}
        rows={rows}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );


  /* =======================================================
     HOME SECTION CONTENT
  ======================================================= */

  const renderHomeSection = () => {
    switch (activeSection) {

      /* ===================================================
         01 HERO
      =================================================== */

      case "hero":
        return (
          <>
            <SectionHeading
              number="01"
              title="Hero Section"
              description="Manage the main content visitors see when they first open the school website."
            />

            <div className="wcms-formGrid">
              {renderInput(
                "School Label",
                "label",
                "AB PUBLIC SCHOOL"
              )}

              {renderInput(
                "Established Text",
                "establishedText",
                "EST. 2001"
              )}
            </div>

            {renderInput(
              "Main Heading",
              "heading",
              "Inspiring Young Minds..."
            )}

            {renderTextarea(
              "Hero Description",
              "description",
              5
            )}

            <div className="wcms-formGrid">
              {renderInput(
                "Primary Button",
                "buttonText"
              )}

              {renderInput(
                "Secondary Button",
                "secondaryButtonText"
              )}
            </div>


            <div className="wcms-subSection">
              <span>TRUST MESSAGE</span>
              <h3>Educational Excellence</h3>
            </div>

            <div className="wcms-formGrid">
              {renderInput(
                "Years",
                "trustNumber",
                "25+"
              )}

              {renderInput(
                "Trust Heading",
                "trustTitle"
              )}
            </div>

            {renderInput(
              "Trust Supporting Text",
              "trustText"
            )}


            <div className="wcms-subSection">
              <span>FLOATING CARD</span>
              <h3>Our Approach</h3>
            </div>

            <div className="wcms-formGrid">
              {renderInput(
                "Small Label",
                "approachLabel"
              )}

              {renderInput(
                "Approach Title",
                "approachTitle"
              )}
            </div>
          </>
        );


      /* ===================================================
         02 ADMISSION CARD
      =================================================== */

      case "admission":
        return (
          <>
            <SectionHeading
              number="02"
              title="Admission Card"
              description="Manage the admission information displayed inside the homepage hero."
            />

            <div className="wcms-formGrid">
              {renderInput(
                "Admission Label",
                "admissionLabel"
              )}

              {renderInput(
                "Status",
                "admissionStatus",
                "OPEN"
              )}
            </div>

            <div className="wcms-formGrid">
              {renderInput(
                "Academic Session",
                "admissionSession",
                "2026 – 27"
              )}

              {renderInput(
                "Classes",
                "admissionClasses",
                "Nursery – XII"
              )}
            </div>

            {renderInput(
              "Admission Heading",
              "admissionHeading"
            )}

            {renderTextarea(
              "Admission Description",
              "admissionDescription",
              4
            )}

            {renderInput(
              "Button Text",
              "admissionButtonText",
              "Start Application"
            )}
          </>
        );


      /* ===================================================
         03 STATS
      =================================================== */

      case "stats":
        return (
          <>
            <SectionHeading
              number="03"
              title="Hero Statistics"
              description="Edit the key numbers displayed below the homepage hero."
            />

            <StatEditor
              title="Students"
              prefix="student"
              formData={formData}
              handleChange={handleChange}
            />

            <StatEditor
              title="Teachers"
              prefix="teacher"
              formData={formData}
              handleChange={handleChange}
            />

            <StatEditor
              title="Board Results"
              prefix="result"
              formData={formData}
              handleChange={handleChange}
            />

            <StatEditor
              title="Activities"
              prefix="activity"
              formData={formData}
              handleChange={handleChange}
            />
          </>
        );


      /* ===================================================
         04 WELCOME
      =================================================== */

      case "welcome":
        return (
          <>
            <SectionHeading
              number="04"
              title="Welcome Section"
              description="Manage the introduction and school highlights shown below the hero."
            />

            {renderInput(
              "Small Label",
              "welcomeLabel"
            )}

            {renderInput(
              "Heading",
              "welcomeHeading"
            )}

            {renderTextarea(
              "Main Description",
              "welcomeMainText",
              5
            )}

            {renderTextarea(
              "Second Description",
              "welcomeSecondText",
              5
            )}


            <div className="wcms-subSection">
              <span>HIGHLIGHT 01</span>
              <h3>First School Highlight</h3>
            </div>

            <div className="wcms-formGrid">
              {renderInput(
                "Highlight Title",
                "welcomeHighlightOneTitle"
              )}

              {renderInput(
                "Highlight Description",
                "welcomeHighlightOneText"
              )}
            </div>


            <div className="wcms-subSection">
              <span>HIGHLIGHT 02</span>
              <h3>Second School Highlight</h3>
            </div>

            <div className="wcms-formGrid">
              {renderInput(
                "Highlight Title",
                "welcomeHighlightTwoTitle"
              )}

              {renderInput(
                "Highlight Description",
                "welcomeHighlightTwoText"
              )}
            </div>


            <div className="wcms-subSection">
              <span>EXPERIENCE</span>
              <h3>Years of Excellence</h3>
            </div>

            <div className="wcms-formGrid">
              {renderInput(
                "Experience Number",
                "welcomeExperienceNumber"
              )}

              {renderInput(
                "Experience Text",
                "welcomeExperienceText"
              )}
            </div>

            {renderInput(
              "Button Text",
              "welcomeButtonText"
            )}
          </>
        );


      /* ===================================================
         05 NEWS / NOTICES
      =================================================== */

      case "updates":
        return (
          <>
            <SectionHeading
              number="05"
              title="News & Notices Section"
              description="Edit only the section headings here. Actual news and public notices are managed separately."
            />

            {renderInput(
              "Small Label",
              "updatesLabel"
            )}

            {renderInput(
              "Main Heading",
              "updatesHeading"
            )}

            {renderTextarea(
              "Description",
              "updatesDescription",
              4
            )}

            <div className="wcms-formGrid">
              {renderInput(
                "News Small Label",
                "newsSmallLabel"
              )}

              {renderInput(
                "News Heading",
                "newsHeading"
              )}

              {renderInput(
                "Notice Small Label",
                "noticeSmallLabel"
              )}

              {renderInput(
                "Notice Heading",
                "noticeHeading"
              )}
            </div>


            <div className="wcms-subSection">
              <span>BOTTOM CTA</span>
              <h3>Updates Call To Action</h3>
            </div>

            {renderInput(
              "CTA Label",
              "updatesBottomLabel"
            )}

            {renderInput(
              "CTA Text",
              "updatesBottomText"
            )}

            {renderInput(
              "CTA Button",
              "updatesButtonText"
            )}

            <div className="wcms-infoBox">
              <strong>Important</strong>

              <p>
                News items and public notices are not edited
                from this form. Use the News and Public Notices
                sections in the Client Dashboard.
              </p>
            </div>
          </>
        );


      /* ===================================================
         06 GALLERY
      =================================================== */

      case "gallery":
        return (
          <>
            <SectionHeading
              number="06"
              title="Gallery Section"
              description="Manage the homepage gallery heading, description and buttons."
            />

            {renderInput(
              "Small Label",
              "galleryLabel"
            )}

            {renderInput(
              "Heading",
              "galleryHeading"
            )}

            {renderTextarea(
              "Description",
              "galleryDescription",
              4
            )}

            {renderInput(
              "Top Button Text",
              "galleryButtonText"
            )}


            <div className="wcms-subSection">
              <span>BOTTOM CTA</span>
              <h3>Gallery Call To Action</h3>
            </div>

            {renderInput(
              "CTA Label",
              "galleryBottomLabel"
            )}

            {renderInput(
              "CTA Text",
              "galleryBottomText"
            )}

            {renderInput(
              "CTA Button",
              "galleryBottomButtonText"
            )}

            <div className="wcms-infoBox">
              <strong>Gallery Photos</strong>

              <p>
                Photos are managed separately from the Gallery
                option in the Client Dashboard.
              </p>
            </div>
          </>
        );


      /* ===================================================
         07 ACHIEVEMENTS
      =================================================== */

      case "achievements":
        return (
          <>
            <SectionHeading
              number="07"
              title="Achievements Section"
              description="Manage the text surrounding the school's achievement statistics."
            />

            {renderInput(
              "Small Label",
              "achievementLabel"
            )}

            {renderInput(
              "Heading",
              "achievementHeading"
            )}

            {renderTextarea(
              "Description",
              "achievementDescription",
              4
            )}


            <div className="wcms-subSection">
              <span>OUR JOURNEY</span>
              <h3>Journey Message</h3>
            </div>

            {renderInput(
              "Journey Label",
              "achievementJourneyLabel"
            )}

            {renderInput(
              "Journey Text",
              "achievementJourneyText"
            )}


            <div className="wcms-subSection">
              <span>BOTTOM CTA</span>
              <h3>Achievement CTA</h3>
            </div>

            {renderInput(
              "CTA Label",
              "achievementBottomLabel"
            )}

            {renderInput(
              "CTA Heading",
              "achievementBottomHeading"
            )}

            {renderInput(
              "CTA Button",
              "achievementButtonText"
            )}
          </>
        );


      /* ===================================================
         08 PRINCIPAL
      =================================================== */

      case "principal":
        return (
          <>
            <SectionHeading
              number="08"
              title="Principal Message"
              description="Manage the principal message displayed on the homepage."
            />

            {renderInput(
              "Small Label",
              "principalLabel"
            )}

            {renderInput(
              "Heading",
              "principalHeading"
            )}

            {renderTextarea(
              "Introduction",
              "principalIntro",
              5
            )}

            {renderTextarea(
              "Principal Quote",
              "principalQuote",
              6
            )}

            <div className="wcms-formGrid">
              {renderInput(
                "Principal Name / Title",
                "principalName"
              )}

              {renderInput(
                "School Name",
                "principalSchool"
              )}
            </div>

            {renderInput(
              "Button Text",
              "principalButtonText"
            )}
          </>
        );


      default:
        return null;
    }
  };


  /* =======================================================
     NORMAL WEBSITE PAGE
  ======================================================= */

  const renderNormalPage = () => (
    <>
      <SectionHeading
        number="PAGE"
        title={pageNames[page] || "Website Page"}
        description="Manage the primary content displayed on this public website page."
      />

      {renderInput(
        "Small Label",
        "label"
      )}

      {renderInput(
        "Main Heading",
        "heading"
      )}

      {renderTextarea(
        "Description",
        "description",
        6
      )}

      {renderInput(
        "Button Text",
        "buttonText"
      )}
    </>
  );


  return (
    <div className="wcms-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="wcms-header">

        <div className="wcms-headerContent">

          <span className="wcms-headerLabel">
            WEBSITE MANAGEMENT
          </span>

          <h1>
            {pageNames[page] || "Website Content"}
          </h1>

          <p>
            Edit the text displayed on your public school
            website without changing the website layout,
            routes or source code.
          </p>

        </div>


        <div className="wcms-headerActions">

          <button
            type="button"
            className="wcms-previewButton"
            onClick={handlePreview}
          >
            <FaEye />
            Preview Page
          </button>

          <button
            type="button"
            className="wcms-saveTopButton"
            onClick={handleSave}
          >
            <FaSave />
            Save Changes
          </button>

        </div>

      </section>


      {/* ===================================================
          SAVED MESSAGE
      =================================================== */}

      {saved && (
        <div className="wcms-success">
          <span>✓</span>

          <div>
            <strong>
              Changes Saved Successfully
            </strong>

            <p>
              Your updated content is now available to the
              connected public website sections.
            </p>
          </div>
        </div>
      )}


      {/* ===================================================
          HOME PAGE
      =================================================== */}

      {page === "home" ? (
        <div className="wcms-homeLayout">

          {/* LEFT SECTION MENU */}

          <aside className="wcms-sectionMenu">

            <div className="wcms-sectionMenuTitle">
              <FaHome />

              <div>
                <small>HOME PAGE</small>
                <strong>Content Sections</strong>
              </div>
            </div>


            <div className="wcms-sectionButtons">

              {homeSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={
                    activeSection === section.id
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                >
                  <span>
                    {section.number}
                  </span>

                  <div>
                    <strong>
                      {section.title}
                    </strong>

                    <small>
                      {section.text}
                    </small>
                  </div>

                  {activeSection === section.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              ))}

            </div>

          </aside>


          {/* EDITOR */}

          <main className="wcms-editor">

            {renderHomeSection()}


            <div className="wcms-bottomActions">

              <button
                type="button"
                className="wcms-resetButton"
                onClick={handleReset}
              >
                <FaUndo />
                Reset to Default
              </button>


              <button
                type="button"
                className="wcms-saveButton"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

            </div>

          </main>

        </div>
      ) : (

        /* =================================================
           OTHER PAGES
        ================================================= */

        <div className="wcms-normalLayout">

          <main className="wcms-editor">

            {renderNormalPage()}


            <div className="wcms-bottomActions">

              <button
                type="button"
                className="wcms-resetButton"
                onClick={handleReset}
              >
                <FaUndo />
                Reset to Default
              </button>


              <button
                type="button"
                className="wcms-saveButton"
                onClick={handleSave}
              >
                <FaSave />
                Save Changes
              </button>

            </div>

          </main>

        </div>
      )}


      {/* ===================================================
          SECURITY / ACCESS NOTE
      =================================================== */}

      <div className="wcms-accessNote">

        <strong>
          Website Content Access
        </strong>

        <p>
          This area only manages public website content.
          Student records, parents, teachers, attendance,
          results, fees, assignments and administrative
          permissions are not accessible from the Client CMS.
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="wcms-sectionHeading">

      <span className="wcms-sectionNumber">
        {number}
      </span>

      <div>
        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>
      </div>

    </div>
  );
};


/* =========================================================
   STAT EDITOR
========================================================= */

const StatEditor = ({
  title,
  prefix,
  formData,
  handleChange,
}) => {
  return (
    <div className="wcms-statEditor">

      <div className="wcms-statTitle">
        <span></span>
        {title}
      </div>


      <div className="wcms-statFields">

        <div className="wcms-field">

          <label>
            Number
          </label>

          <input
            type="text"
            name={`${prefix}Count`}
            value={
              formData[
                `${prefix}Count`
              ] || ""
            }
            onChange={handleChange}
          />

        </div>


        <div className="wcms-field">

          <label>
            Label
          </label>

          <input
            type="text"
            name={`${prefix}Label`}
            value={
              formData[
                `${prefix}Label`
              ] || ""
            }
            onChange={handleChange}
          />

        </div>


        <div className="wcms-field">

          <label>
            Supporting Text
          </label>

          <input
            type="text"
            name={`${prefix}Text`}
            value={
              formData[
                `${prefix}Text`
              ] || ""
            }
            onChange={handleChange}
          />

        </div>

      </div>

    </div>
  );
};


export default WebsiteContent;