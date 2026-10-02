import {
  readData,
  writeData,
} from "./storage";

export const WEBSITE_IMAGES_KEY =
  "abpsWebsiteImages";

const defaultWebsiteImages = [
  {
    id: "IMG-HOME-HERO",
    page: "Home",
    section: "Hero Section",
    key: "homeHero",
    title: "Home Hero Image",
    image: "",
  },

  {
    id: "IMG-HOME-ABOUT",
    page: "Home",
    section: "Welcome Section",
    key: "homeWelcome",
    title: "Welcome School Image",
    image: "",
  },

  {
    id: "IMG-ABOUT-HERO",
    page: "About",
    section: "Hero Section",
    key: "aboutHero",
    title: "About Hero Image",
    image: "",
  },

  {
    id: "IMG-ACADEMIC-HERO",
    page: "Academics",
    section: "Hero Section",
    key: "academicsHero",
    title: "Academics Hero Image",
    image: "",
  },

  {
    id: "IMG-ADMISSION-HERO",
    page: "Admission",
    section: "Hero Section",
    key: "admissionHero",
    title: "Admission Hero Image",
    image: "",
  },

  {
    id: "IMG-FACILITIES-HERO",
    page: "Facilities",
    section: "Hero Section",
    key: "facilitiesHero",
    title: "Facilities Hero Image",
    image: "",
  },

  {
    id: "IMG-ACTIVITIES-HERO",
    page: "Activities",
    section: "Hero Section",
    key: "activitiesHero",
    title: "Activities Hero Image",
    image: "",
  },

  {
    id: "IMG-FACULTY-HERO",
    page: "Faculty",
    section: "Hero Section",
    key: "facultyHero",
    title: "Faculty Hero Image",
    image: "",
  },
];

export const initializeWebsiteImages = () => {
  if (!localStorage.getItem(WEBSITE_IMAGES_KEY)) {
    writeData(
      WEBSITE_IMAGES_KEY,
      defaultWebsiteImages
    );
  }

  return getWebsiteImages();
};

export const getWebsiteImages = () =>
  readData(
    WEBSITE_IMAGES_KEY,
    defaultWebsiteImages
  );

export const getWebsiteImage = (key) => {
  const images = getWebsiteImages();

  return (
    images.find(
      (item) => item.key === key
    )?.image || ""
  );
};

export const updateWebsiteImage = (
  id,
  image
) => {
  const images = getWebsiteImages();

  const updated = images.map((item) =>
    item.id === id
      ? {
          ...item,
          image,
          updatedAt:
            new Date().toISOString(),
        }
      : item
  );

  writeData(
    WEBSITE_IMAGES_KEY,
    updated
  );

  return updated;
};

export const removeWebsiteImage = (id) => {
  const images = getWebsiteImages();

  const updated = images.map((item) =>
    item.id === id
      ? {
          ...item,
          image: "",
          updatedAt:
            new Date().toISOString(),
        }
      : item
  );

  writeData(
    WEBSITE_IMAGES_KEY,
    updated
  );

  return updated;
};