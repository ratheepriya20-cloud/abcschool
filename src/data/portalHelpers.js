/* =========================================================
   AB PUBLIC SCHOOL
   PORTAL HELPERS
========================================================= */

export const normalizeValue = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

export const normalizeClass = (value) =>
  normalizeValue(value)
    .replace(/^class\s*/i, "")
    .replace(/\s+/g, "");

/* =========================================================
   STUDENT ID
========================================================= */

export const getStudentId = (student) =>
  student?.id ||
  student?.studentId ||
  "";

/* =========================================================
   STUDENT RECORD FILTER
========================================================= */

export const filterStudentRecords = (
  records = [],
  student
) => {
  if (!student) return [];

  const studentId = getStudentId(student);

  return records.filter((item) => {
    return (
      normalizeValue(item?.studentId) ===
      normalizeValue(studentId)
    );
  });
};

/* =========================================================
   ASSIGNMENTS

   Assignment:
   1. direct studentId ka ho sakta hai
   2. ya Class + Section ka
========================================================= */

export const filterStudentAssignments = (
  assignments = [],
  student
) => {
  if (!student) return [];

  const studentId = getStudentId(student);

  return assignments.filter((assignment) => {
    if (assignment?.studentId) {
      return (
        normalizeValue(assignment.studentId) ===
        normalizeValue(studentId)
      );
    }

    const classMatches =
      normalizeClass(assignment?.className) ===
      normalizeClass(student?.className);

    const sectionMatches =
      !assignment?.section ||
      normalizeValue(assignment.section) ===
        normalizeValue(student?.section);

    return classMatches && sectionMatches;
  });
};

/* =========================================================
   FIND PARENT
========================================================= */

export const findStudentParent = (
  parents = [],
  student
) => {
  if (!student) return null;

  return (
    parents.find(
      (parent) =>
        normalizeValue(
          parent?.id || parent?.parentId
        ) ===
        normalizeValue(student?.parentId)
    ) || null
  );
};

/* =========================================================
   TEACHERS FOR STUDENT

   teacher.classes:
   [
     {
       className: "Class 10",
       section: "A"
     }
   ]
========================================================= */

export const getStudentTeachers = (
  teachers = [],
  student
) => {
  if (!student) return [];

  return teachers.filter((teacher) => {
    if (teacher?.status === "Inactive") {
      return false;
    }

    const classes = Array.isArray(teacher?.classes)
      ? teacher.classes
      : [];

    return classes.some((item) => {
      const sameClass =
        normalizeClass(item?.className) ===
        normalizeClass(student?.className);

      const sameSection =
        !item?.section ||
        normalizeValue(item.section) ===
          normalizeValue(student?.section);

      return sameClass && sameSection;
    });
  });
};

/* =========================================================
   NOTICES
========================================================= */

export const filterStudentNotices = (
  notices = [],
  student
) => {
  if (!student) return notices;

  return notices.filter((notice) => {
    if (!notice?.className) {
      return true;
    }

    const sameClass =
      normalizeClass(notice.className) ===
      normalizeClass(student.className);

    const sameSection =
      !notice?.section ||
      normalizeValue(notice.section) ===
        normalizeValue(student.section);

    return sameClass && sameSection;
  });
};

/* =========================================================
   EVENTS
========================================================= */

export const filterStudentEvents = (
  events = [],
  student
) => {
  if (!student) return events;

  return events.filter((event) => {
    if (!event?.className) {
      return true;
    }

    return (
      normalizeClass(event.className) ===
      normalizeClass(student.className)
    );
  });
};