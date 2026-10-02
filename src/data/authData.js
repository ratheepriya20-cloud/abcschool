// =========================================================
// AB PUBLIC SCHOOL
// AUTH DATA
// Frontend Demo Authentication
// =========================================================

import {
  readData,
  writeData,
} from "./storage";


// =========================================================
// STORAGE KEYS
// =========================================================

export const USERS_KEY =
  "abpsUsers";

export const SESSION_KEY =
  "abpsSession";


// =========================================================
// ROLES
// =========================================================

export const ROLES = {
  SUPER_ADMIN: "super-admin",
  SUB_ADMIN: "sub-admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
  CLIENT: "client",
};


// =========================================================
// DEFAULT DEMO USERS
// =========================================================

const defaultUsers = [
  // SUPER ADMIN
  {
    id: "USR-ADMIN-001",
    name: "Super Admin",
    email: "admin@abps.com",
    password: "admin123",
    role: ROLES.SUPER_ADMIN,
    status: "Active",
  },

  // SUB ADMIN
  {
    id: "USR-SUB-001",
    name: "Amit Kumar",
    email: "subadmin@abps.com",
    password: "sub123",
    role: ROLES.SUB_ADMIN,
    subAdminId: "SUB-101",
    status: "Active",

    permissions: {
      students: true,
      parents: true,
      teachers: false,
      attendance: true,
      assignments: true,
      homework: true,
      results: true,
      fees: false,
      notices: true,
      events: true,
      inquiries: true,
      contactMessages: true,
    },
  },

  // TEACHER
  {
    id: "USR-TEACHER-001",
    name: "Dr. Neha Sharma",
    email: "teacher@abps.com",
    password: "teacher123",
    role: ROLES.TEACHER,
    teacherId: "TCH-101",
    status: "Active",
  },

  // STUDENT
  {
    id: "USR-STUDENT-001",
    name: "Aarav Sharma",
    email: "student@abps.com",
    password: "student123",
    role: ROLES.STUDENT,
    studentId: "STU-1001",
    status: "Active",
  },

  // PARENT
  {
    id: "USR-PARENT-001",
    name: "Rahul Sharma",
    email: "parent@abps.com",
    password: "parent123",
    role: ROLES.PARENT,
    parentId: "PAR-1001",
    studentIds: [
      "STU-1001",
    ],
    status: "Active",
  },

  // CLIENT
  {
    id: "USR-CLIENT-001",
    name: "Website Client",
    email: "client@abps.com",
    password: "client123",
    role: ROLES.CLIENT,
    status: "Active",
  },
];


// =========================================================
// INITIALIZE USERS
// =========================================================

export const initializeUsers = () => {
  const savedUsers =
    localStorage.getItem(
      USERS_KEY
    );

  if (!savedUsers) {
    writeData(
      USERS_KEY,
      defaultUsers
    );
  }

  return getUsers();
};


// =========================================================
// GET USERS
// =========================================================

export const getUsers = () => {
  return readData(
    USERS_KEY,
    defaultUsers
  );
};


// =========================================================
// SAVE USERS
// =========================================================

export const saveUsers = (
  users
) => {
  writeData(
    USERS_KEY,
    users
  );

  return users;
};


// =========================================================
// LOGIN USER
// =========================================================

export const loginUser = (
  email,
  password
) => {
  try {
    const users =
      getUsers();

    const cleanEmail =
      String(email || "")
        .trim()
        .toLowerCase();

    const cleanPassword =
      String(password || "")
        .trim();


    const user =
      users.find(
        (item) =>
          String(
            item.email || ""
          )
            .trim()
            .toLowerCase() ===
            cleanEmail &&
          String(
            item.password || ""
          ) ===
            cleanPassword
      );


    // USER NOT FOUND

    if (!user) {
      return {
        success: false,
        message:
          "Invalid email or password.",
      };
    }


    // ACCOUNT INACTIVE

    if (
      user.status &&
      user.status !== "Active"
    ) {
      return {
        success: false,
        message:
          "Your account is currently inactive.",
      };
    }


    // Password ko session me save nahi karna

    const {
      password: _password,
      ...safeUser
    } = user;


    const session = {
      ...safeUser,

      loginAt:
        new Date().toISOString(),
    };


    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );


    window.dispatchEvent(
      new CustomEvent(
        "abpsLogin",
        {
          detail: {
            role:
              session.role,
          },
        }
      )
    );


    return {
      success: true,
      user: session,
      session,
    };

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to login. Please try again.",
    };
  }
};


// =========================================================
// GET CURRENT SESSION
// THIS EXPORT FIXES YOUR CURRENT ERROR
// =========================================================

export const getSession = () => {
  try {
    const session =
      localStorage.getItem(
        SESSION_KEY
      );

    if (!session) {
      return null;
    }

    return JSON.parse(
      session
    );

  } catch (error) {
    console.error(
      "Session read error:",
      error
    );

    return null;
  }
};


// =========================================================
// CHECK LOGIN
// =========================================================

export const isLoggedIn = () => {
  return Boolean(
    getSession()
  );
};


// =========================================================
// GET CURRENT USER
// =========================================================

export const getCurrentUser =
  () => {
    return getSession();
  };


// =========================================================
// LOGOUT
// =========================================================

export const logoutUser = () => {
  localStorage.removeItem(
    SESSION_KEY
  );

  window.dispatchEvent(
    new Event(
      "abpsLogout"
    )
  );

  return true;
};


// =========================================================
// CHECK ROLE
// =========================================================

export const hasRole = (
  role
) => {
  const session =
    getSession();

  if (!session) {
    return false;
  }

  return (
    session.role === role
  );
};


// =========================================================
// CHECK ALLOWED ROLES
// =========================================================

export const hasAnyRole = (
  roles = []
) => {
  const session =
    getSession();

  if (!session) {
    return false;
  }

  if (
    !Array.isArray(roles)
  ) {
    return false;
  }

  return roles.includes(
    session.role
  );
};


// =========================================================
// CHECK PERMISSION
// Mainly Sub Admin ke liye
// =========================================================

export const hasPermission = (
  permission
) => {
  const session =
    getSession();


  if (!session) {
    return false;
  }


  // Super Admin has all permissions

  if (
    session.role ===
    ROLES.SUPER_ADMIN
  ) {
    return true;
  }


  // Other roles

  return Boolean(
    session.permissions?.[
      permission
    ]
  );
};


// =========================================================
// UPDATE CURRENT SESSION
// =========================================================

export const updateSession = (
  changes = {}
) => {
  const oldSession =
    getSession();


  if (!oldSession) {
    return null;
  }


  const newSession = {
    ...oldSession,
    ...changes,
  };


  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(
      newSession
    )
  );


  window.dispatchEvent(
    new Event(
      "abpsSessionUpdated"
    )
  );


  return newSession;
};


// =========================================================
// GET USER BY ID
// =========================================================

export const getUserById = (
  id
) => {
  return getUsers().find(
    (user) =>
      user.id === id
  );
};


// =========================================================
// GET USERS BY ROLE
// =========================================================

export const getUsersByRole = (
  role
) => {
  return getUsers().filter(
    (user) =>
      user.role === role
  );
};