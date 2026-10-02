import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";


// =========================================================
// STORAGE KEY
// =========================================================

export const CONTACT_MESSAGES_KEY =
  "abpsContactMessages";


// =========================================================
// GET ALL CONTACT MESSAGES
// =========================================================

export const getContactMessages = () => {
  return readData(
    CONTACT_MESSAGES_KEY,
    []
  );
};


// =========================================================
// ADD CONTACT MESSAGE
// Public ContactMessage.jsx isi function ko use karega
// =========================================================

export const addContactMessage = (
  message
) => {
  try {
    const oldMessages =
      getContactMessages();

    const newMessage = {
      id: createId("CONTACT"),

      name:
        message?.name?.trim() || "",

      phone:
        message?.phone?.trim() || "",

      email:
        message?.email
          ?.trim()
          ?.toLowerCase() || "",

      subject:
        message?.subject?.trim() ||
        "General Enquiry",

      message:
        message?.message?.trim() || "",

      status: "New",

      source:
        "Website Contact Form",

      submittedAt:
        new Date().toLocaleString(
          "en-IN",
          {
            dateStyle: "medium",
            timeStyle: "short",
          }
        ),

      timestamp:
        Date.now(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };


    const updatedMessages = [
      newMessage,
      ...oldMessages,
    ];


    const saved = writeData(
      CONTACT_MESSAGES_KEY,
      updatedMessages
    );


    if (saved === false) {
      return null;
    }


    return newMessage;

  } catch (error) {
    console.error(
      "Add contact message error:",
      error
    );

    return null;
  }
};


// =========================================================
// UPDATE CONTACT MESSAGE
// Super Admin use karega
// =========================================================

export const updateContactMessage = (
  id,
  changes
) => {
  return updateItemById(
    CONTACT_MESSAGES_KEY,
    id,
    changes
  );
};


// =========================================================
// CHANGE STATUS
// New -> Read -> Replied
// =========================================================

export const changeContactMessageStatus = (
  id,
  status
) => {
  return updateItemById(
    CONTACT_MESSAGES_KEY,
    id,
    {
      status,
    }
  );
};


// =========================================================
// DELETE CONTACT MESSAGE
// =========================================================

export const deleteContactMessage = (
  id
) => {
  return removeItemById(
    CONTACT_MESSAGES_KEY,
    id
  );
};


// =========================================================
// GET SINGLE CONTACT MESSAGE
// =========================================================

export const getContactMessageById = (
  id
) => {
  const messages =
    getContactMessages();

  return messages.find(
    (item) => item.id === id
  );
};


// =========================================================
// GET NEW MESSAGE COUNT
// Dashboard badge / overview
// =========================================================

export const getNewContactMessagesCount =
  () => {
    const messages =
      getContactMessages();

    return messages.filter(
      (item) =>
        item.status === "New"
    ).length;
  };