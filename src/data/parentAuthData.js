import { getParents } from "./parentsData";
import { getStudents } from "./studentsData";

export const PARENT_ACCOUNTS_KEY = "abpsParentAccounts";
export const PARENT_SESSION_KEY = "abpsParentSession";


/* =========================================================
   GET PARENT ACCOUNTS
========================================================= */

export const getParentAccounts = () => {
  try {
    const data = localStorage.getItem(PARENT_ACCOUNTS_KEY);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Parent accounts read error:", error);

    return [];
  }
};


/* =========================================================
   SAVE PARENT ACCOUNTS
========================================================= */

const saveParentAccounts = (accounts) => {
  try {
    localStorage.setItem(
      PARENT_ACCOUNTS_KEY,
      JSON.stringify(accounts)
    );

    window.dispatchEvent(
      new Event("abpsParentAccountUpdated")
    );

    return true;
  } catch (error) {
    console.error("Parent account save error:", error);

    return false;
  }
};


/* =========================================================
   CREATE PARENT ACCOUNT
========================================================= */

export const createParentAccount = ({
  parentId,
  studentAdmissionNo,
  name,
  mobile,
  email,
  password,
}) => {
  try {
    const parents = getParents();
    const students = getStudents();

    const cleanParentId = String(parentId || "")
      .trim()
      .toLowerCase();

    const cleanAdmissionNo = String(
      studentAdmissionNo || ""
    )
      .trim()
      .toLowerCase();

    const cleanName = String(name || "")
      .trim()
      .toLowerCase();

    const cleanMobile = String(mobile || "")
      .replace(/\D/g, "")
      .trim();

    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();


    /* =====================================================
       FIND PARENT
    ===================================================== */

    const parent = parents.find((item) => {
      const itemParentId = String(
        item.id || item.parentId || ""
      )
        .trim()
        .toLowerCase();

      const itemName = String(item.name || "")
        .trim()
        .toLowerCase();

      const itemMobile = String(item.mobile || "")
        .replace(/\D/g, "")
        .trim();

      return (
        itemParentId === cleanParentId &&
        itemName === cleanName &&
        itemMobile === cleanMobile
      );
    });


    if (!parent) {
      return {
        success: false,
        message:
          "Parent details do not match the school records. Please check Parent ID, Name and Registered Mobile Number.",
      };
    }


    /* =====================================================
       PARENT STATUS
    ===================================================== */

    if (
      parent.status &&
      parent.status !== "Active"
    ) {
      return {
        success: false,
        message:
          "This parent record is inactive. Please contact the school office.",
      };
    }


    /* =====================================================
       FIND STUDENT USING ADMISSION NUMBER
    ===================================================== */

    const student = students.find((item) => {
      return (
        String(item.admissionNo || "")
          .trim()
          .toLowerCase() === cleanAdmissionNo
      );
    });


    if (!student) {
      return {
        success: false,
        message:
          "Student Admission Number was not found in school records.",
      };
    }


    /* =====================================================
       CHECK PARENT-STUDENT RELATION
    ===================================================== */

    const parentRecordId = String(
      parent.id || parent.parentId || ""
    )
      .trim()
      .toLowerCase();

    const studentParentId = String(
      student.parentId || ""
    )
      .trim()
      .toLowerCase();

    const parentStudentId = String(
      parent.studentId || ""
    )
      .trim()
      .toLowerCase();

    const studentId = String(student.id || "")
      .trim()
      .toLowerCase();


    const linkedByStudent =
      studentParentId &&
      studentParentId === parentRecordId;

    const linkedByParent =
      parentStudentId &&
      parentStudentId === studentId;


    if (
      !linkedByStudent &&
      !linkedByParent
    ) {
      return {
        success: false,
        message:
          "This student is not linked with the entered parent account.",
      };
    }


    /* =====================================================
       STUDENT STATUS
    ===================================================== */

    if (
      student.status &&
      student.status !== "Active"
    ) {
      return {
        success: false,
        message:
          "The linked student record is inactive.",
      };
    }


    const accounts = getParentAccounts();


    /* =====================================================
       ACCOUNT ALREADY EXISTS
    ===================================================== */

    const existingAccount = accounts.find(
      (account) =>
        account.parentId ===
        (parent.id || parent.parentId)
    );


    if (existingAccount) {
      return {
        success: false,
        code: "ACCOUNT_EXISTS",
        message:
          "Parent account already exists. Please login using your password.",
      };
    }


    /* =====================================================
       EMAIL DUPLICATE
    ===================================================== */

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
          "This email is already registered with another parent account.",
      };
    }


    /* =====================================================
       CREATE PORTAL ACCOUNT
    ===================================================== */

    const newAccount = {
      id: `PACC-${Date.now()}`,

      parentId:
        parent.id || parent.parentId,

      parentName:
        parent.name,

      relationship:
        parent.relationship || "Parent",

      mobile:
        parent.mobile,

      email:
        cleanEmail,

      password,

      studentId:
        student.id,

      studentName:
        student.name,

      studentAdmissionNo:
        student.admissionNo,

      role:
        "parent",

      status:
        "Active",

      createdAt:
        new Date().toISOString(),
    };


    saveParentAccounts([
      ...accounts,
      newAccount,
    ]);


    return {
      success: true,

      message:
        "Parent account created successfully.",

      account: {
        id: newAccount.id,
        parentId: newAccount.parentId,
        parentName: newAccount.parentName,
        relationship: newAccount.relationship,
        email: newAccount.email,
        studentId: newAccount.studentId,
        studentName: newAccount.studentName,
        role: newAccount.role,
        status: newAccount.status,
      },
    };
  } catch (error) {
    console.error(
      "Create parent account error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to create parent account.",
    };
  }
};


/* =========================================================
   LOGIN PARENT
========================================================= */

export const loginParent = (
  identifier,
  password
) => {
  try {
    const accounts = getParentAccounts();

    const cleanIdentifier = String(
      identifier || ""
    )
      .trim()
      .toLowerCase();


    const account = accounts.find((item) => {
      const email = String(item.email || "")
        .trim()
        .toLowerCase();

      const parentId = String(
        item.parentId || ""
      )
        .trim()
        .toLowerCase();

      return (
        email === cleanIdentifier ||
        parentId === cleanIdentifier
      );
    });


    if (!account) {
      return {
        success: false,
        message:
          "Parent account not found. Please create your account first.",
      };
    }


    if (account.password !== password) {
      return {
        success: false,
        message:
          "Incorrect password.",
      };
    }


    if (account.status !== "Active") {
      return {
        success: false,
        message:
          "Your Parent Portal account is inactive.",
      };
    }


    /* =====================================================
       REFRESH ORIGINAL DATA
    ===================================================== */

    const parents = getParents();
    const students = getStudents();


    const parent = parents.find(
      (item) =>
        (item.id || item.parentId) ===
        account.parentId
    );


    if (!parent) {
      return {
        success: false,
        message:
          "Parent school record could not be found.",
      };
    }


    if (
      parent.status &&
      parent.status !== "Active"
    ) {
      return {
        success: false,
        message:
          "Parent record is currently inactive.",
      };
    }


    const student = students.find(
      (item) =>
        item.id === account.studentId
    );


    if (!student) {
      return {
        success: false,
        message:
          "Linked student record could not be found.",
      };
    }


    /* =====================================================
       SAFE SESSION
       PASSWORD SESSION ME SAVE NAHI HOGA
    ===================================================== */

    const session = {
      id:
        account.id,

      parentId:
        parent.id || parent.parentId,

      name:
        parent.name,

      relationship:
        parent.relationship || "Parent",

      mobile:
        parent.mobile,

      email:
        account.email,

      studentId:
        student.id,

      studentName:
        student.name,

      studentAdmissionNo:
        student.admissionNo,

      role:
        "parent",

      status:
        parent.status || "Active",

      loginAt:
        new Date().toISOString(),
    };


    localStorage.setItem(
      PARENT_SESSION_KEY,
      JSON.stringify(session)
    );


    window.dispatchEvent(
      new Event("abpsParentSessionUpdated")
    );


    return {
      success: true,
      user: session,
      session,
    };
  } catch (error) {
    console.error(
      "Parent login error:",
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
   GET PARENT SESSION
========================================================= */

export const getParentSession = () => {
  try {
    const data = localStorage.getItem(
      PARENT_SESSION_KEY
    );

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Parent session read error:",
      error
    );

    return null;
  }
};


/* =========================================================
   GET LOGGED IN PARENT
========================================================= */

export const getLoggedInParent = () => {
  const session = getParentSession();

  if (!session) {
    return null;
  }

  const parents = getParents();

  const parent = parents.find(
    (item) =>
      (item.id || item.parentId) ===
      session.parentId
  );

  if (!parent) {
    return null;
  }

  return {
    ...parent,

    email:
      session.email,

    studentId:
      session.studentId,

    role:
      "parent",
  };
};


/* =========================================================
   GET LOGGED IN PARENT STUDENT
========================================================= */

export const getLoggedInParentStudent = () => {
  const session = getParentSession();

  if (!session) {
    return null;
  }

  const students = getStudents();

  return (
    students.find(
      (student) =>
        student.id ===
        session.studentId
    ) || null
  );
};


/* =========================================================
   CHECK LOGIN
========================================================= */

export const isParentLoggedIn = () => {
  const session = getParentSession();

  return Boolean(
    session &&
    session.role === "parent"
  );
};


/* =========================================================
   LOGOUT
========================================================= */

export const logoutParent = () => {
  localStorage.removeItem(
    PARENT_SESSION_KEY
  );

  localStorage.removeItem(
    "abpsParentLoggedIn"
  );

  window.dispatchEvent(
    new Event("abpsParentSessionUpdated")
  );
};