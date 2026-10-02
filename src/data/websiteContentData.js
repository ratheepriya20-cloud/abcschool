import {
  readData,
  writeData,
} from "./storage";


/* =========================================================
   STORAGE KEY
========================================================= */

export const WEBSITE_CONTENT_KEY =
  "abpsWebsiteContent";


/* =========================================================
   DEFAULT WEBSITE CONTENT
========================================================= */

export const defaultWebsiteContent = {

  /* =======================================================
     HOME PAGE
  ======================================================= */

  home: {
    pageName: "Home Page",

    /* =========================
       HERO SECTION
    ========================= */

    label: "AB PUBLIC SCHOOL",

    heading:
      "Inspiring Young Minds. Shaping Bright Futures.",

    description:
      "A modern learning environment where curiosity, character and confidence come together to prepare every child for a meaningful future.",

    buttonText:
      "Apply for Admission",

    secondaryButtonText:
      "Discover ABPS",


    /* =========================
       HERO EXTRA CONTENT
    ========================= */

    establishedText:
      "EST. 2001",

    trustNumber:
      "25+",

    trustTitle:
      "Years of Educational Excellence",

    trustText:
      "Knowledge · Character · Confidence",


    /* =========================
       HERO FLOATING CARD
    ========================= */

    approachLabel:
      "OUR APPROACH",

    approachTitle:
      "Learn With Purpose",


    /* =========================
       ADMISSION CARD
    ========================= */

    admissionLabel:
      "ADMISSIONS OPEN",

    admissionSession:
      "2026 – 27",

    admissionStatus:
      "OPEN",

    admissionHeading:
      "Your Child's Next Chapter.",

    admissionDescription:
      "Applications are now open for the new academic session.",

    admissionClasses:
      "Nursery – XII",

    admissionButtonText:
      "Start Application",


    /* =========================
       HERO STATS
    ========================= */

    studentCount:
      "1500+",

    studentLabel:
      "STUDENTS",

    studentText:
      "Growing Together",


    teacherCount:
      "40+",

    teacherLabel:
      "TEACHERS",

    teacherText:
      "Expert Mentors",


    resultCount:
      "98%",

    resultLabel:
      "BOARD RESULTS",

    resultText:
      "Academic Excellence",


    activityCount:
      "30+",

    activityLabel:
      "ACTIVITIES",

    activityText:
      "Beyond Classrooms",


    /* =====================================================
       WELCOME SECTION
    ===================================================== */

    welcomeLabel:
      "ABOUT OUR SCHOOL",

    welcomeHeading:
      "Where Every Child Discovers Their Potential.",

    welcomeMainText:
      "Welcome to our school, where education goes beyond textbooks. We create an inspiring environment that encourages students to learn, explore, think creatively and become confident individuals.",

    welcomeSecondText:
      "With experienced educators, modern learning facilities and strong values, we prepare every student for academic success and a bright future.",


    /* =========================
       WELCOME HIGHLIGHTS
    ========================= */

    welcomeHighlightOneTitle:
      "Holistic Education",

    welcomeHighlightOneText:
      "Academic & personal growth",

    welcomeHighlightTwoTitle:
      "Experienced Faculty",

    welcomeHighlightTwoText:
      "Dedicated & caring teachers",


    /* =========================
       WELCOME EXPERIENCE
    ========================= */

    welcomeExperienceNumber:
      "25+",

    welcomeExperienceText:
      "Years of Excellence",

    welcomeButtonText:
      "Discover Our School",


    /* =====================================================
       LATEST NEWS & NOTICES
       Heading content only.
       Actual news/notices separate data modules se aayenge.
    ===================================================== */

    updatesLabel:
      "SCHOOL UPDATES",

    updatesHeading:
      "Latest News & Notices.",

    updatesDescription:
      "Stay informed about the latest happenings, important announcements and activities at our school.",

    newsSmallLabel:
      "LATEST",

    newsHeading:
      "School News",

    noticeSmallLabel:
      "IMPORTANT",

    noticeHeading:
      "Notices",

    updatesBottomLabel:
      "NEVER MISS AN UPDATE",

    updatesBottomText:
      "Keep connected with your school community.",

    updatesButtonText:
      "Contact School",


    /* =====================================================
       GALLERY SECTION
    ===================================================== */

    galleryLabel:
      "LIFE AT OUR SCHOOL",

    galleryHeading:
      "Moments That Make Us Proud.",

    galleryDescription:
      "Explore memorable moments, celebrations, activities and achievements from our school campus.",

    galleryButtonText:
      "View Full Gallery",

    galleryBottomLabel:
      "DISCOVER MORE",

    galleryBottomText:
      "See the vibrant life of our students.",

    galleryBottomButtonText:
      "Explore Gallery",


    /* =====================================================
       ACHIEVEMENTS SECTION
    ===================================================== */

    achievementLabel:
      "OUR ACHIEVEMENTS",

    achievementHeading:
      "Milestones That Define Our Excellence",

    achievementDescription:
      "A journey of learning, leadership and achievement built together.",

    achievementJourneyLabel:
      "OUR JOURNEY",

    achievementJourneyText:
      "Excellence in every milestone.",

    achievementBottomLabel:
      "BEYOND THE NUMBERS",

    achievementBottomHeading:
      "Every achievement has a story behind it.",

    achievementButtonText:
      "Explore Achievements",


    /* =====================================================
       PRINCIPAL MESSAGE
    ===================================================== */

    principalLabel:
      "PRINCIPAL'S MESSAGE",

    principalHeading:
      "Inspiring Minds. Building Futures.",

    principalIntro:
      "Every child has the potential to achieve something extraordinary. Our purpose is to provide the right environment, guidance and opportunities to help that potential flourish.",

    principalQuote:
      "Education is not simply about preparing students for examinations; it is about preparing them for life—with confidence, character, curiosity and courage.",

    principalName:
      "School Principal",

    principalSchool:
      "AB Public School",

    principalButtonText:
      "Read Full Message",
  },


  /* =======================================================
     ABOUT PAGE
  ======================================================= */

  about: {
    pageName: "About Page",

    label:
      "ABOUT AB PUBLIC SCHOOL",

    heading:
      "Building Knowledge, Character & Confidence.",

    description:
      "AB Public School is committed to creating a nurturing, disciplined and inspiring learning environment where every student can discover their potential and prepare for a meaningful future.",

    buttonText:
      "Explore Our School",
  },


  /* =======================================================
     ACADEMICS PAGE
  ======================================================= */

  academics: {
    pageName: "Academics Page",

    label:
      "ACADEMIC EXCELLENCE",

    heading:
      "Learning Designed for Every Stage of Growth.",

    description:
      "Our academic programme combines strong foundations, conceptual understanding, practical learning and individual attention to help students grow with confidence.",

    buttonText:
      "Explore Academics",
  },


  /* =======================================================
     ADMISSION PAGE
  ======================================================= */

  admission: {
    pageName: "Admission Page",

    label:
      "ADMISSIONS 2026–27",

    heading:
      "Begin Your Child's Journey With ABPS.",

    description:
      "Discover our admission process and take the first step towards a learning experience built around knowledge, values, confidence and opportunity.",

    buttonText:
      "Apply for Admission",
  },


  /* =======================================================
     FACILITIES PAGE
  ======================================================= */

  facilities: {
    pageName: "Facilities Page",

    label:
      "OUR CAMPUS",

    heading:
      "Modern Spaces Designed for Better Learning.",

    description:
      "Our campus provides safe, modern and student-friendly learning spaces that support academics, creativity, technology, sports and overall development.",

    buttonText:
      "Explore Facilities",
  },


  /* =======================================================
     ACTIVITIES PAGE
  ======================================================= */

  activities: {
    pageName: "Activities Page",

    label:
      "BEYOND CLASSROOMS",

    heading:
      "Discover. Participate. Create. Lead.",

    description:
      "Sports, cultural programmes, clubs, competitions and student activities provide opportunities to discover interests, develop confidence and build leadership skills.",

    buttonText:
      "Explore Activities",
  },


  /* =======================================================
     FACULTY PAGE
  ======================================================= */

  faculty: {
    pageName: "Faculty Page",

    label:
      "OUR EDUCATORS",

    heading:
      "Dedicated Teachers. Meaningful Learning.",

    description:
      "Our experienced and caring educators guide students with knowledge, encouragement and personal attention while creating an engaging learning environment.",

    buttonText:
      "Meet Our Faculty",
  },


  /* =======================================================
     CONTACT PAGE
  ======================================================= */

  contact: {
    pageName: "Contact Page",

    label:
      "CONTACT OUR SCHOOL",

    heading:
      "We're Here to Help You.",

    description:
      "Have a question about admissions, academics or school life? Connect with our team and we will be happy to assist you.",

    buttonText:
      "Contact School",
  },
};


/* =========================================================
   MERGE DEFAULT + SAVED DATA

   Important:
   Agar future me hum naye fields add karein aur old localStorage
   me wo fields na hon, to default values automatically milengi.
========================================================= */

const mergeWithDefaults = (savedContent = {}) => {
  const merged = {};

  Object.keys(defaultWebsiteContent).forEach((page) => {
    merged[page] = {
      ...defaultWebsiteContent[page],
      ...(savedContent?.[page] || {}),
    };
  });

  return merged;
};


/* =========================================================
   INITIALIZE WEBSITE CONTENT
========================================================= */

export const initializeWebsiteContent = () => {
  const savedContent = readData(
    WEBSITE_CONTENT_KEY,
    null
  );

  /*
    First time:
    complete default content save karo.
  */

  if (!savedContent) {
    writeData(
      WEBSITE_CONTENT_KEY,
      defaultWebsiteContent
    );

    return defaultWebsiteContent;
  }


  /*
    Existing localStorage ho to naye fields ke saath merge karo.
  */

  const mergedContent =
    mergeWithDefaults(savedContent);


  /*
    Updated structure save kar dete hain.
  */

  writeData(
    WEBSITE_CONTENT_KEY,
    mergedContent
  );

  return mergedContent;
};


/* =========================================================
   GET ALL WEBSITE CONTENT
========================================================= */

export const getWebsiteContent = () => {
  const savedContent = readData(
    WEBSITE_CONTENT_KEY,
    {}
  );

  return mergeWithDefaults(
    savedContent
  );
};


/* =========================================================
   GET SINGLE PAGE CONTENT
========================================================= */

export const getPageContent = (page) => {
  if (!page) return {};

  const allContent =
    getWebsiteContent();

  return (
    allContent?.[page] ||
    defaultWebsiteContent?.[page] ||
    {}
  );
};


/* =========================================================
   UPDATE SINGLE PAGE
========================================================= */

export const updatePageContent = (
  page,
  changes
) => {
  if (!page) {
    return null;
  }

  const allContent =
    getWebsiteContent();


  const currentPage = {
    ...(defaultWebsiteContent?.[page] || {}),
    ...(allContent?.[page] || {}),
  };


  const updatedPage = {
    ...currentPage,
    ...changes,

    updatedAt:
      new Date().toISOString(),
  };


  const updatedContent = {
    ...allContent,

    [page]: updatedPage,
  };


  writeData(
    WEBSITE_CONTENT_KEY,
    updatedContent
  );


  return updatedPage;
};


/* =========================================================
   RESET SINGLE PAGE
========================================================= */

export const resetPageContent = (
  page
) => {
  if (
    !page ||
    !defaultWebsiteContent[page]
  ) {
    return null;
  }


  const allContent =
    getWebsiteContent();


  const resetPage = {
    ...defaultWebsiteContent[page],

    updatedAt:
      new Date().toISOString(),
  };


  const updatedContent = {
    ...allContent,

    [page]: resetPage,
  };


  writeData(
    WEBSITE_CONTENT_KEY,
    updatedContent
  );


  return resetPage;
};


/* =========================================================
   RESET COMPLETE WEBSITE CONTENT
========================================================= */

export const resetAllWebsiteContent =
  () => {
    const freshContent =
      JSON.parse(
        JSON.stringify(
          defaultWebsiteContent
        )
      );


    writeData(
      WEBSITE_CONTENT_KEY,
      freshContent
    );


    return freshContent;
  };


/* =========================================================
   GET DEFAULT CONTENT

   Useful for preview/reset.
========================================================= */

export const getDefaultWebsiteContent =
  () =>
    JSON.parse(
      JSON.stringify(
        defaultWebsiteContent
      )
    );