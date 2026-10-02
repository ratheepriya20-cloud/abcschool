import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const STUDENTS_KEY = "abpsStudents";

const defaultStudents = [
  {
    id: "STU-1001",
    admissionNo: "ABPS-2026-0142",
    name: "Aarav Sharma",
    className: " 10",
    section: "A",
    rollNo: "12",
    gender: "Male",
    dob: "2011-05-18",
    parentId: "PAR-1001",
    status: "Active",
  },
  {
    id: "STU-1002",
    admissionNo: "ABPS-2026-0143",
    name: "Riya Verma",
    className: "Class 10",
    section: "A",
    rollNo: "13",
    gender: "Female",
    dob: "2011-08-22",
    parentId: "PAR-1002",
    status: "Active",
  },
];

export const getStudents = () => {
  return readData(
    STUDENTS_KEY,
    defaultStudents
  );
};

export const initializeStudents = () => {
  if (!localStorage.getItem(STUDENTS_KEY)) {
    writeData(
      STUDENTS_KEY,
      defaultStudents
    );
  }
};

export const addStudent = (student) => {
  const students = getStudents();

  const newStudent = {
    id: createId("STU"),
    status: "Active",
    createdAt: new Date().toISOString(),
    ...student,
  };

  writeData(STUDENTS_KEY, [
    ...students,
    newStudent,
  ]);

  return newStudent;
};

export const updateStudent = (
  id,
  changes
) => {
  return updateItemById(
    STUDENTS_KEY,
    id,
    changes
  );
};

export const deleteStudent = (id) => {
  return removeItemById(
    STUDENTS_KEY,
    id
  );
};

export const getStudentById = (id) => {
  return getStudents().find(
    (student) => student.id === id
  );
};