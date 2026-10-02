// src/data/inquiriesData.js

import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const INQUIRIES_KEY = "schoolInquiries";


// ==========================================
// GET ALL
// ==========================================

export const getInquiries = () => {
  return readData(INQUIRIES_KEY, []);
};


// ==========================================
// ADD
// ==========================================

export const addInquiry = (inquiry) => {
  const oldInquiries = getInquiries();

  const newInquiry = {
    id: createId("INQ"),

    name: inquiry.name || "",
    phone: inquiry.phone || "",
    email: inquiry.email || "",

    inquiryType:
      inquiry.inquiryType || "",

    className:
      inquiry.className || "",

    description:
      inquiry.description || "",

    status: "New",

    priority: "Normal",

    source: "Website",

    submittedAt:
      new Date().toLocaleString(
        "en-IN",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      ),

    timestamp: Date.now(),

    createdAt:
      new Date().toISOString(),
  };


  // Latest inquiry top par
  const updatedInquiries = [
    newInquiry,
    ...oldInquiries,
  ];


  writeData(
    INQUIRIES_KEY,
    updatedInquiries
  );


  // Special event
  window.dispatchEvent(
    new CustomEvent(
      "abpsInquiryUpdated"
    )
  );


  return newInquiry;
};


// ==========================================
// UPDATE
// ==========================================

export const updateInquiry = (
  id,
  changes
) => {

  const result = updateItemById(
    INQUIRIES_KEY,
    id,
    changes
  );

  window.dispatchEvent(
    new CustomEvent(
      "abpsInquiryUpdated"
    )
  );

  return result;
};


// ==========================================
// STATUS
// ==========================================

export const changeInquiryStatus = (
  id,
  status
) => {

  return updateInquiry(
    id,
    {
      status,
    }
  );
};


// ==========================================
// DELETE
// ==========================================

export const deleteInquiry = (id) => {

  const result = removeItemById(
    INQUIRIES_KEY,
    id
  );

  window.dispatchEvent(
    new CustomEvent(
      "abpsInquiryUpdated"
    )
  );

  return result;
};


// ==========================================
// NEW COUNT
// ==========================================

export const getNewInquiriesCount =
  () => {

    return getInquiries().filter(
      (item) =>
        item.status === "New"
    ).length;
  };