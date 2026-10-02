import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const NOTICES_KEY =
  "abpsNotices";

const defaultNotices = [
  {
    id: "NOT-001",

    title:
      "Parent Teacher Meeting",

    description:
      "PTM will be conducted on 28 September 2026.",

    date: "2026-09-28",

    category: "School",

    audience: "all",

    important: true,

    createdBy: "Super Admin",
  },

  {
    id: "NOT-002",

    title:
      "Half Yearly Examination",

    description:
      "Half yearly examinations will begin from 05 October.",

    date: "2026-10-05",

    category: "Academic",

    audience: "students-parents",

    important: true,

    createdBy: "Super Admin",
  },
];

export const getNotices = () =>
  readData(
    NOTICES_KEY,
    defaultNotices
  );

export const initializeNotices = () => {
  if (
    !localStorage.getItem(NOTICES_KEY)
  ) {
    writeData(
      NOTICES_KEY,
      defaultNotices
    );
  }
};

export const addNotice = (notice) => {
  const notices = getNotices();

  const newNotice = {
    id: createId("NOT"),
    createdAt: new Date().toISOString(),
    ...notice,
  };

  writeData(
    NOTICES_KEY,
    [newNotice, ...notices]
  );

  return newNotice;
};

export const updateNotice = (
  id,
  changes
) =>
  updateItemById(
    NOTICES_KEY,
    id,
    changes
  );

export const deleteNotice = (id) =>
  removeItemById(
    NOTICES_KEY,
    id
  );