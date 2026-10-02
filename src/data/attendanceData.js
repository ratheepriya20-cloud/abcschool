import {
  readData,
  writeData,
  createId,
} from "./storage";


export const ATTENDANCE_KEY =
  "abpsAttendance";


/* =========================================================
   DEMO ATTENDANCE
========================================================= */

const defaultAttendance = [
  {
    id: "ATT-001",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    className: "X",
    section: "A",
    date: "2026-09-27",
    status: "Present",
    remarks: "On time",
  },

  {
    id: "ATT-002",
    studentId: "STU-1002",
    studentName: "Riya Verma",
    className: "IX",
    section: "B",
    date: "2026-09-27",
    status: "Absent",
    remarks: "Not informed",
  },
];


/* =========================================================
   GET
========================================================= */

export const getAttendance = () => {
  return readData(
    ATTENDANCE_KEY,
    defaultAttendance
  );
};


/* =========================================================
   INITIALIZE
========================================================= */

export const initializeAttendance =
  () => {
    const existing =
      localStorage.getItem(
        ATTENDANCE_KEY
      );

    if (!existing) {
      writeData(
        ATTENDANCE_KEY,
        defaultAttendance
      );
    }

    return getAttendance();
  };


/* =========================================================
   ADD
========================================================= */

export const addAttendance = (
  attendanceData
) => {
  const records =
    getAttendance();

  const newRecord = {
    id: createId("ATT"),

    ...attendanceData,

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  };

  const updated = [
    newRecord,
    ...records,
  ];

  writeData(
    ATTENDANCE_KEY,
    updated
  );

  return newRecord;
};


/* =========================================================
   UPDATE
========================================================= */

export const updateAttendance = (
  id,
  changes
) => {
  const records =
    getAttendance();

  const updated =
    records.map((item) =>
      item.id === id
        ? {
            ...item,
            ...changes,

            updatedAt:
              new Date()
                .toISOString(),
          }
        : item
    );

  writeData(
    ATTENDANCE_KEY,
    updated
  );

  return updated;
};


/* =========================================================
   DELETE
========================================================= */

export const deleteAttendance = (
  id
) => {
  const records =
    getAttendance();

  const updated =
    records.filter(
      (item) =>
        item.id !== id
    );

  writeData(
    ATTENDANCE_KEY,
    updated
  );

  return updated;
};


/* =========================================================
   GET BY ID
========================================================= */

export const getAttendanceById = (
  id
) => {
  return (
    getAttendance().find(
      (item) =>
        item.id === id
    ) || null
  );
};


/* =========================================================
   STUDENT ATTENDANCE
========================================================= */

export const getStudentAttendance = (
  studentId
) => {
  return getAttendance().filter(
    (item) =>
      String(
        item.studentId
      ) ===
      String(
        studentId
      )
  );
};


/* =========================================================
   CLASS ATTENDANCE
========================================================= */

export const getClassAttendance = (
  className,
  section = ""
) => {
  return getAttendance().filter(
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


/* =========================================================
   STUDENT PERCENTAGE
========================================================= */

export const getStudentAttendancePercentage =
  (studentId) => {
    const records =
      getStudentAttendance(
        studentId
      );

    if (!records.length) {
      return 0;
    }

    const present =
      records.filter(
        (item) =>
          String(
            item.status
          ).toLowerCase() ===
          "present"
      ).length;

    return Math.round(
      (
        present /
        records.length
      ) * 100
    );
  };