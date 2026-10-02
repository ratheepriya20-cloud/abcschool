import { getStudents } from "./studentsData";

export const STUDENT_ACCOUNTS_KEY = "abpsStudentAccounts";
export const STUDENT_SESSION_KEY = "abpsStudentSession";

/* =========================================================
   GET STUDENT ACCOUNTS
========================================================= */

export const getStudentAccounts = () => {
  try {
    const data = localStorage.getItem(STUDENT_ACCOUNTS_KEY);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Student accounts read error:", error);
    return [];
  }
};


/* =========================================================
   SAVE STUDENT ACCOUNTS
========================================================= */

const saveStudentAccounts = (accounts) => {
  try {
    localStorage.setItem(
      STUDENT_ACCOUNTS_KEY,
      JSON.stringify(accounts)
    );

    window.dispatchEvent(
      new Event("abpsStudentAccountUpdated")
    );

    return true;
  } catch (error) {
    console.error("Student accounts save error:", error);
    return false;
  }
};


/* =========================================================
   CREATE STUDENT ACCOUNT
========================================================= */

export const createStudentAccount = ({
  admissionNo,
  name,
  dob,
  email,
  password,
}) => {
  try {
    const students = getStudents();

    const cleanAdmissionNo = String(
      admissionNo || ""
    )
      .trim()
      .toLowerCase();

    const cleanName = String(name || "")
      .trim()
      .toLowerCase();

    const cleanDob = String(dob || "").trim();

    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();

    /* -----------------------------------------------------
       VERIFY STUDENT FROM SCHOOL RECORD
    ----------------------------------------------------- */

    const student = students.find((item) => {
      const itemAdmissionNo = String(
        item.admissionNo || ""
      )
        .trim()
        .toLowerCase();

      const itemName = String(item.name || "")
        .trim()
        .toLowerCase();

      const itemDob = String(item.dob || "").trim();

      return (
        itemAdmissionNo === cleanAdmissionNo &&
        itemName === cleanName &&
        itemDob === cleanDob
      );
    });

    if (!student) {
      return {
        success: false,
        message:
          "Student details do not match the school records. Please check Admission Number, Name and Date of Birth.",
      };
    }

    /* -----------------------------------------------------
       CHECK STATUS
    ----------------------------------------------------- */

    if (
      student.status &&
      student.status !== "Active"
    ) {
      return {
        success: false,
        message:
          "This student record is inactive. Please contact the school office.",
      };
    }

    const accounts = getStudentAccounts();

    /* -----------------------------------------------------
       ALREADY CREATED ACCOUNT
    ----------------------------------------------------- */

    const existingStudentAccount = accounts.find(
      (account) => account.studentId === student.id
    );

    if (existingStudentAccount) {
      return {
        success: false,
        code: "ACCOUNT_EXISTS",
        message:
          "Student account already exists. Please login with your password.",
      };
    }

    /* -----------------------------------------------------
       EMAIL ALREADY USED
    ----------------------------------------------------- */

    const emailExists = accounts.some(
      (account) =>
        String(account.email || "")
          .trim()
          .toLowerCase() === cleanEmail
    );

    if (emailExists) {
      return {
        success: false,
        message:
          "This email is already registered with another student account.",
      };
    }

    /* -----------------------------------------------------
       CREATE PORTAL ACCOUNT
    ----------------------------------------------------- */

    const newAccount = {
      id: `SACC-${Date.now()}`,

      studentId: student.id,

      admissionNo: student.admissionNo,

      name: student.name,

      email: cleanEmail,

      password,

      role: "student",

      status: "Active",

      createdAt: new Date().toISOString(),
    };

    saveStudentAccounts([
      ...accounts,
      newAccount,
    ]);

    return {
      success: true,
      message:
        "Student account created successfully.",
      account: {
        id: newAccount.id,
        studentId: newAccount.studentId,
        admissionNo: newAccount.admissionNo,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        status: newAccount.status,
      },
    };
  } catch (error) {
    console.error(
      "Create student account error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to create student account.",
    };
  }
};


/* =========================================================
   LOGIN STUDENT
========================================================= */

export const loginStudent = (
  identifier,
  password
) => {
  try {
    const accounts = getStudentAccounts();

    const cleanIdentifier = String(
      identifier || ""
    )
      .trim()
      .toLowerCase();

    const account = accounts.find((item) => {
      const email = String(item.email || "")
        .trim()
        .toLowerCase();

      const admissionNo = String(
        item.admissionNo || ""
      )
        .trim()
        .toLowerCase();

      return (
        email === cleanIdentifier ||
        admissionNo === cleanIdentifier
      );
    });

    if (!account) {
      return {
        success: false,
        message:
          "Student account not found. Please create your account first.",
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        message: "Incorrect password.",
      };
    }

    if (account.status !== "Active") {
      return {
        success: false,
        message:
          "Your student portal account is inactive.",
      };
    }

    /* -----------------------------------------------------
       CHECK ORIGINAL STUDENT RECORD
    ----------------------------------------------------- */

    const students = getStudents();

    const student = students.find(
      (item) => item.id === account.studentId
    );

    if (!student) {
      return {
        success: false,
        message:
          "Student school record could not be found.",
      };
    }

    if (
      student.status &&
      student.status !== "Active"
    ) {
      return {
        success: false,
        message:
          "Student record is inactive. Please contact the school.",
      };
    }

    /* -----------------------------------------------------
       SAFE SESSION
    ----------------------------------------------------- */

    const session = {
      id: account.id,

      studentId: student.id,

      admissionNo: student.admissionNo,

      name: student.name,

      className: student.className,

      section: student.section,

      rollNo: student.rollNo,

      email: account.email,

      role: "student",

      status: student.status || "Active",

      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(
      STUDENT_SESSION_KEY,
      JSON.stringify(session)
    );

    window.dispatchEvent(
      new Event("abpsStudentSessionUpdated")
    );

    return {
      success: true,
      user: session,
      session,
    };
  } catch (error) {
    console.error(
      "Student login error:",
      error
    );

    return {
      success: false,
      message: "Unable to login.",
    };
  }
};


/* =========================================================
   GET SESSION
========================================================= */

export const getStudentSession = () => {
  try {
    const data = localStorage.getItem(
      STUDENT_SESSION_KEY
    );

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Student session error:",
      error
    );

    return null;
  }
};


/* =========================================================
   GET LOGGED IN STUDENT
========================================================= */

export const getLoggedInStudent = () => {
  const session = getStudentSession();

  if (!session) {
    return null;
  }

  const students = getStudents();

  const student = students.find(
    (item) => item.id === session.studentId
  );

  if (!student) {
    return null;
  }

  return {
    ...student,
    email: session.email,
    role: "student",
  };
};


/* =========================================================
   LOGOUT
========================================================= */

export const logoutStudent = () => {
  localStorage.removeItem(
    STUDENT_SESSION_KEY
  );

  window.dispatchEvent(
    new Event("abpsStudentSessionUpdated")
  );
};


/* =========================================================
   CHECK LOGIN
========================================================= */

export const isStudentLoggedIn = () => {
  const session = getStudentSession();

  return Boolean(
    session &&
    session.role === "student"
  );
};