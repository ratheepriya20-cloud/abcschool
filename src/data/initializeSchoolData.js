// =========================================================
// AB PUBLIC SCHOOL
// INITIALIZE COMPLETE SCHOOL DATA
// =========================================================

import {
  initializeStudents,
} from "./studentsData";

import {
  initializeTeachers,
} from "./teachersData";

import {
  initializeParents,
} from "./parentsData";

import {
  initializeAssignments,
} from "./assignmentsData";

import {
  initializeAttendance,
} from "./attendanceData";

import {
  initializeHomework,
} from "./homeworkData";

import {
  initializeResults,
} from "./resultsData";

import {
  initializeFees,
} from "./feesData";

import {
  initializeNotices,
} from "./noticesData";

import {
  initializeEvents,
} from "./eventsData";

import {
  initializeUsers,
} from "./authData";


// =========================================================
// INITIALIZE ALL DATA
// =========================================================

export const initializeSchoolData = () => {
  initializeStudents();

  initializeTeachers();

  initializeParents();

  initializeAssignments();

  initializeAttendance();

  initializeHomework();

  initializeResults();

  initializeFees();

  initializeNotices();

  initializeEvents();

  initializeUsers();
};


export default initializeSchoolData;