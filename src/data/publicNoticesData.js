import {
  readData,
  writeData,
  createId,
} from "./storage";

export const PUBLIC_NOTICES_KEY =
  "abpsPublicWebsiteNotices";

const defaultPublicNotices = [
  {
    id: "PN-001",
    title:
      "Admission Applications Open",
    category: "Admissions",
    date: "2026-09-09",
    description:
      "Admissions are now open for the 2026–27 academic session.",
    fullNotice:
      "Parents can submit admission applications for the 2026–27 academic session through the school admission portal.",
    important: true,
    status: "Published",
  },

  {
    id: "PN-002",
    title:
      "Parent Teacher Meeting",
    category: "School",
    date: "2026-09-07",
    description:
      "Parent Teacher Meeting information for students and parents.",
    fullNotice:
      "Parents are requested to attend the scheduled Parent Teacher Meeting and discuss student academic progress with teachers.",
    important: false,
    status: "Published",
  },

  {
    id: "PN-003",
    title:
      "Half-Yearly Examination Schedule",
    category: "Examination",
    date: "2026-09-05",
    description:
      "Half-yearly examination schedule has been announced.",
    fullNotice:
      "Students and parents are requested to check the examination schedule and prepare accordingly.",
    important: true,
    status: "Published",
  },

  {
    id: "PN-004",
    title:
      "Inter-School Sports Trials",
    category: "Sports",
    date: "2026-09-03",
    description:
      "Sports trials will be organised for interested students.",
    fullNotice:
      "Students interested in participating in inter-school sports competitions can register for the upcoming trials.",
    important: false,
    status: "Published",
  },
];

export const initializePublicNotices =
  () => {
    if (
      !localStorage.getItem(
        PUBLIC_NOTICES_KEY
      )
    ) {
      writeData(
        PUBLIC_NOTICES_KEY,
        defaultPublicNotices
      );
    }

    return getPublicNotices();
  };


export const getPublicNotices =
  () =>
    readData(
      PUBLIC_NOTICES_KEY,
      defaultPublicNotices
    );


export const addPublicNotice = (
  data
) => {
  const notices =
    getPublicNotices();

  const item = {
    id: createId("PN"),

    ...data,

    createdAt:
      new Date().toISOString(),
  };

  writeData(
    PUBLIC_NOTICES_KEY,
    [item, ...notices]
  );

  return item;
};


export const updatePublicNotice = (
  id,
  changes
) => {
  const notices =
    getPublicNotices();

  const updated =
    notices.map((item) =>
      item.id === id
        ? {
            ...item,
            ...changes,

            updatedAt:
              new Date()
                .toISOString(),
          }
        : item
    );

  writeData(
    PUBLIC_NOTICES_KEY,
    updated
  );

  return updated;
};


export const deletePublicNotice = (
  id
) => {
  const updated =
    getPublicNotices().filter(
      (item) =>
        item.id !== id
    );

  writeData(
    PUBLIC_NOTICES_KEY,
    updated
  );

  return updated;
};


export const getPublishedPublicNotices =
  () =>
    getPublicNotices().filter(
      (item) =>
        item.status ===
        "Published"
    );