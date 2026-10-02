import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const TEACHERS_KEY = "abpsTeachers";

const defaultTeachers = [
  {
    id: "TCH-101",
    employeeId: "EMP-101",

    name: "Dr. Neha Sharma",

    designation:
      "Mathematics Teacher",

    subject: "Mathematics",

    classes: [
      {
        className: "Class 10",
        section: "A",
      },
    ],

    email:
      "neha@abpschool.com",

    schoolContact:
      "9876543210",

    qualification:
      "M.Sc., B.Ed.",

    experience: "12 Years",

    /* Teacher Login */
    password: "Teacher@101",

    status: "Active",
  },

  {
    id: "TCH-102",
    employeeId: "EMP-102",

    name: "Rahul Verma",

    designation:
      "Science Teacher",

    subject: "Science",

    classes: [
      {
        className: "Class 10",
        section: "A",
      },
    ],

    email:
      "rahul@abpschool.com",

    schoolContact:
      "9876543211",

    qualification:
      "M.Sc., B.Ed.",

    experience: "9 Years",

    /* Teacher Login */
    password: "Teacher@102",

    status: "Active",
  },
];

export const getTeachers = () =>
  readData(
    TEACHERS_KEY,
    defaultTeachers
  );

export const initializeTeachers = () => {
  if (
    !localStorage.getItem(
      TEACHERS_KEY
    )
  ) {
    writeData(
      TEACHERS_KEY,
      defaultTeachers
    );
  }
};

export const addTeacher = (
  teacher
) => {
  const teachers =
    getTeachers();

  const newTeacher = {
    id: createId("TCH"),

    status: "Active",

    createdAt:
      new Date().toISOString(),

    ...teacher,
  };

  writeData(
    TEACHERS_KEY,
    [
      ...teachers,
      newTeacher,
    ]
  );

  return newTeacher;
};

export const updateTeacher = (
  id,
  changes
) =>
  updateItemById(
    TEACHERS_KEY,
    id,
    changes
  );

export const deleteTeacher = (
  id
) =>
  removeItemById(
    TEACHERS_KEY,
    id
  );

export const getTeacherById = (
  id
) =>
  getTeachers().find(
    (teacher) =>
      teacher.id === id
  );

/* =========================================================
   FIND BY EMPLOYEE ID
========================================================= */

export const getTeacherByEmployeeId = (
  employeeId
) =>
  getTeachers().find(
    (teacher) =>
      String(
        teacher.employeeId
      )
        .trim()
        .toLowerCase() ===
      String(employeeId)
        .trim()
        .toLowerCase()
  );