import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const RESULTS_KEY =
  "abpsResults";

const defaultResults = [
  {
    id: "RES-001",
    studentId: "STU-1001",
    exam: "Half Yearly",
    subject: "English",
    marks: 91,
    totalMarks: 100,
    grade: "A+",
  },

  {
    id: "RES-002",
    studentId: "STU-1001",
    exam: "Half Yearly",
    subject: "Mathematics",
    marks: 94,
    totalMarks: 100,
    grade: "A+",
  },

  {
    id: "RES-003",
    studentId: "STU-1001",
    exam: "Half Yearly",
    subject: "Science",
    marks: 89,
    totalMarks: 100,
    grade: "A",
  },

  {
    id: "RES-004",
    studentId: "STU-1001",
    exam: "Half Yearly",
    subject: "Social Science",
    marks: 92,
    totalMarks: 100,
    grade: "A+",
  },

  {
    id: "RES-005",
    studentId: "STU-1001",
    exam: "Half Yearly",
    subject: "Computer",
    marks: 96,
    totalMarks: 100,
    grade: "A+",
  },
];

export const getResults = () =>
  readData(
    RESULTS_KEY,
    defaultResults
  );

export const initializeResults = () => {
  if (
    !localStorage.getItem(RESULTS_KEY)
  ) {
    writeData(
      RESULTS_KEY,
      defaultResults
    );
  }
};

export const addResult = (result) => {
  const results = getResults();

  const newResult = {
    id: createId("RES"),
    ...result,
  };

  writeData(
    RESULTS_KEY,
    [...results, newResult]
  );

  return newResult;
};

export const updateResult = (
  id,
  changes
) =>
  updateItemById(
    RESULTS_KEY,
    id,
    changes
  );

export const deleteResult = (id) =>
  removeItemById(
    RESULTS_KEY,
    id
  );

export const getStudentResults = (
  studentId
) =>
  getResults().filter(
    (result) =>
      result.studentId === studentId
  );