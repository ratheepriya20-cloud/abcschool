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

export const HOMEWORK_KEY =
  "abpsHomework";


// =========================================================
// DEFAULT HOMEWORK
// =========================================================

const defaultHomework = [
  {
    id: "HW-001",

    title:
      "Quadratic Equations Practice",

    subject:
      "Mathematics",

    className:
      "Class 10",

    section:
      "A",

    teacherId:
      "TCH-101",

    assignedDate:
      "2026-09-24",

    dueDate:
      "2026-09-29",

    description:
      "Complete the quadratic equations practice questions given in class.",

    status:
      "Active",

    createdAt:
      new Date().toISOString(),
  },

  {
    id: "HW-002",

    title:
      "Digestive System Diagram",

    subject:
      "Science",

    className:
      "Class 10",

    section:
      "A",

    teacherId:
      "TCH-102",

    assignedDate:
      "2026-09-25",

    dueDate:
      "2026-09-30",

    description:
      "Draw and label the human digestive system in your science notebook.",

    status:
      "Active",

    createdAt:
      new Date().toISOString(),
  },
];


// =========================================================
// GET HOMEWORK
// =========================================================

export const getHomework = () => {
  return readData(
    HOMEWORK_KEY,
    defaultHomework
  );
};


// =========================================================
// INITIALIZE HOMEWORK
// =========================================================

export const initializeHomework =
  () => {
    const saved =
      localStorage.getItem(
        HOMEWORK_KEY
      );

    if (!saved) {
      writeData(
        HOMEWORK_KEY,
        defaultHomework
      );
    }

    return getHomework();
  };


// =========================================================
// ADD HOMEWORK
// =========================================================

export const addHomework = (
  homework
) => {
  const oldHomework =
    getHomework();

  const newHomework = {
    id: createId("HW"),

    title:
      homework.title || "",

    subject:
      homework.subject || "",

    className:
      homework.className || "",

    section:
      homework.section || "",

    teacherId:
      homework.teacherId || "",

    assignedDate:
      homework.assignedDate || "",

    dueDate:
      homework.dueDate || "",

    description:
      homework.description || "",

    status:
      homework.status ||
      "Active",

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  };


  const updated = [
    newHomework,
    ...oldHomework,
  ];


  writeData(
    HOMEWORK_KEY,
    updated
  );


  return newHomework;
};


// =========================================================
// UPDATE HOMEWORK
// =========================================================

export const updateHomework = (
  id,
  changes
) => {
  return updateItemById(
    HOMEWORK_KEY,
    id,
    changes
  );
};


// =========================================================
// DELETE HOMEWORK
// =========================================================

export const deleteHomework = (
  id
) => {
  return removeItemById(
    HOMEWORK_KEY,
    id
  );
};


// =========================================================
// GET SINGLE HOMEWORK
// =========================================================

export const getHomeworkById = (
  id
) => {
  return getHomework().find(
    (item) =>
      item.id === id
  );
};


// =========================================================
// GET HOMEWORK FOR STUDENT
// Student ko sirf uski class ka homework milega
// =========================================================

export const getHomeworkForStudent = (
  student
) => {
  if (!student) {
    return [];
  }


  return getHomework().filter(
    (item) => {
      const sameClass =
        item.className ===
        student.className;

      const sameSection =
        !item.section ||
        item.section ===
          student.section;

      const active =
        item.status !==
        "Archived";

      return (
        sameClass &&
        sameSection &&
        active
      );
    }
  );
};


// =========================================================
// GET HOMEWORK BY TEACHER
// =========================================================

export const getHomeworkByTeacher = (
  teacherId
) => {
  return getHomework().filter(
    (item) =>
      item.teacherId ===
      teacherId
  );
};


// =========================================================
// GET HOMEWORK BY CLASS
// =========================================================

export const getHomeworkByClass = (
  className,
  section = ""
) => {
  return getHomework().filter(
    (item) => {
      const sameClass =
        item.className ===
        className;

      const sameSection =
        !section ||
        item.section ===
          section;

      return (
        sameClass &&
        sameSection
      );
    }
  );
};