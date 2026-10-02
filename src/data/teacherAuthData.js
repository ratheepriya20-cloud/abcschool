import {
  getTeachers,
} from "./teachersData";

export const TEACHER_SESSION_KEY =
  "abpsTeacherSession";

/* =========================================================
   NORMALIZE
========================================================= */

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

/* =========================================================
   LOGIN
========================================================= */

export const loginTeacher = (
  employeeId,
  password
) => {
  try {
    if (
      !employeeId?.trim() ||
      !password
    ) {
      return {
        success: false,
        message:
          "Employee ID and password are required.",
      };
    }

    const teachers =
      getTeachers();

    const teacher =
      teachers.find(
        (item) =>
          normalize(
            item.employeeId
          ) ===
          normalize(
            employeeId
          )
      );

    if (!teacher) {
      return {
        success: false,
        message:
          "Teacher account not found.",
      };
    }

    if (
      normalize(
        teacher.status
      ) !== "active"
    ) {
      return {
        success: false,
        message:
          "Your teacher account is inactive.",
      };
    }

    if (
      String(
        teacher.password || ""
      ) !== String(password)
    ) {
      return {
        success: false,
        message:
          "Incorrect password.",
      };
    }

    /*
      Password session me nahi
      rakhna.
    */

    const session = {
      id: teacher.id,

      employeeId:
        teacher.employeeId,

      name: teacher.name,

      designation:
        teacher.designation,

      subject:
        teacher.subject,

      classes:
        Array.isArray(
          teacher.classes
        )
          ? teacher.classes
          : [],

      email:
        teacher.email || "",

      schoolContact:
        teacher.schoolContact ||
        "",

      qualification:
        teacher.qualification ||
        "",

      experience:
        teacher.experience || "",

      role: "teacher",

      status:
        teacher.status,

      loginAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      TEACHER_SESSION_KEY,
      JSON.stringify(session)
    );

    window.dispatchEvent(
      new Event(
        "abpsTeacherSessionUpdated"
      )
    );

    return {
      success: true,
      teacher: session,
      message:
        "Login successful.",
    };
  } catch (error) {
    console.error(
      "Teacher login error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to login.",
    };
  }
};

/* =========================================================
   GET SESSION
========================================================= */

export const getLoggedInTeacher =
  () => {
    try {
      const stored =
        localStorage.getItem(
          TEACHER_SESSION_KEY
        );

      if (!stored) {
        return null;
      }

      const session =
        JSON.parse(stored);

      /*
        Important:
        Actual teachersData dobara
        verify hoga.
      */

      const teacher =
        getTeachers().find(
          (item) =>
            item.id ===
            session.id
        );

      if (!teacher) {
        localStorage.removeItem(
          TEACHER_SESSION_KEY
        );

        return null;
      }

      if (
        normalize(
          teacher.status
        ) !== "active"
      ) {
        localStorage.removeItem(
          TEACHER_SESSION_KEY
        );

        return null;
      }

      /*
        Latest data return karo.
        Admin ne class etc change ki
        to teacher ko latest milega.
      */

      return {
        id: teacher.id,

        employeeId:
          teacher.employeeId,

        name:
          teacher.name,

        designation:
          teacher.designation,

        subject:
          teacher.subject,

        classes:
          Array.isArray(
            teacher.classes
          )
            ? teacher.classes
            : [],

        email:
          teacher.email || "",

        schoolContact:
          teacher.schoolContact ||
          "",

        qualification:
          teacher.qualification ||
          "",

        experience:
          teacher.experience ||
          "",

        status:
          teacher.status,

        role: "teacher",
      };
    } catch (error) {
      console.error(
        "Teacher session error:",
        error
      );

      return null;
    }
  };

/* =========================================================
   LOGIN CHECK
========================================================= */

export const isTeacherLoggedIn =
  () =>
    Boolean(
      getLoggedInTeacher()
    );

/* =========================================================
   LOGOUT
========================================================= */

export const logoutTeacher =
  () => {
    localStorage.removeItem(
      TEACHER_SESSION_KEY
    );

    window.dispatchEvent(
      new Event(
        "abpsTeacherSessionUpdated"
      )
    );
  };