// src/data/subAdminsData.js

import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const SUB_ADMINS_KEY =
  "abpsSubAdmins";

const defaultSubAdmins = [
  {
    id: "SUB-101",
    name: "Amit Kumar",
    email: "subadmin@abps.com",
    mobile: "9876500010",
    designation: "Academic Coordinator",
    department: "Academic",
    status: "Active",

    permissions: {
      students: true,
      teachers: false,
      attendance: true,
      results: true,
      fees: false,
      assignments: true,
      notices: true,
      events: true,
      inquiries: true,
      contactMessages: true,
    },
  },
];

export const getSubAdmins = () =>
  readData(
    SUB_ADMINS_KEY,
    defaultSubAdmins
  );

export const initializeSubAdmins =
  () => {
    const existing =
      localStorage.getItem(
        SUB_ADMINS_KEY
      );

    if (!existing) {
      writeData(
        SUB_ADMINS_KEY,
        defaultSubAdmins
      );
    }
  };

export const addSubAdmin = (
  admin
) => {
  const items = getSubAdmins();

  const newAdmin = {
    id: createId("SUB"),

    ...admin,

    permissions:
      admin.permissions || {
        students: true,
        teachers: false,
        attendance: true,
        results: true,
        fees: false,
        assignments: true,
        notices: true,
        events: true,
        inquiries: true,
        contactMessages: true,
      },

    createdAt:
      new Date().toISOString(),
  };

  writeData(
    SUB_ADMINS_KEY,
    [
      newAdmin,
      ...items,
    ]
  );

  return newAdmin;
};

export const updateSubAdmin = (
  id,
  changes
) =>
  updateItemById(
    SUB_ADMINS_KEY,
    id,
    changes
  );

export const deleteSubAdmin = (
  id
) =>
  removeItemById(
    SUB_ADMINS_KEY,
    id
  );