import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const ASSIGNMENTS_KEY =
  "abpsAssignments";

const defaultAssignments = [
  {
    id: "ASS-001",

    teacherId: "TCH-101",
    teacherName: "Dr. Neha Sharma",

    className: "Class 10",
    section: "A",

    subject: "Mathematics",

    title: "Quadratic Equations",

    description:
      "Complete Exercise 4.2 questions 1 to 10.",

    assignedDate: "2026-09-24",
    dueDate: "2026-09-29",

    status: "Active",
  },

  {
    id: "ASS-002",

    teacherId: "TCH-102",
    teacherName: "Rahul Verma",

    className: "Class 10",
    section: "A",

    subject: "Science",

    title: "Human Digestive System",

    description:
      "Prepare labelled diagram and short notes.",

    assignedDate: "2026-09-23",
    dueDate: "2026-09-30",

    status: "Active",
  },
];

export const getAssignments = () =>
  readData(
    ASSIGNMENTS_KEY,
    defaultAssignments
  );

export const initializeAssignments = () => {
  if (
    !localStorage.getItem(
      ASSIGNMENTS_KEY
    )
  ) {
    writeData(
      ASSIGNMENTS_KEY,
      defaultAssignments
    );
  }
};

export const addAssignment = (
  assignment
) => {
  const assignments =
    getAssignments();

  const newAssignment = {
    id: createId("ASS"),
    createdAt: new Date().toISOString(),
    status: "Active",
    ...assignment,
  };

  writeData(
    ASSIGNMENTS_KEY,
    [...assignments, newAssignment]
  );

  return newAssignment;
};

export const updateAssignment = (
  id,
  changes
) =>
  updateItemById(
    ASSIGNMENTS_KEY,
    id,
    changes
  );

export const deleteAssignment = (id) =>
  removeItemById(
    ASSIGNMENTS_KEY,
    id
  );

export const getAssignmentsForStudent = (
  student
) => {
  return getAssignments().filter(
    (assignment) =>
      assignment.className ===
        student.className &&
      assignment.section ===
        student.section
  );
};