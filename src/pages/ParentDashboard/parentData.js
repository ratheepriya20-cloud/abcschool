const getStorageData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
};

const getStorageObject = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return parsed && typeof parsed === "object"
      ? parsed
      : fallback;
  } catch (error) {
    return fallback;
  }
};

const defaultAssignments = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Quadratic Equations",
    teacher: "Mrs. Anjali Verma",
    assigned: "02 Sep 2026",
    due: "10 Sep 2026",
    submitted: true,
    submittedDate: "08 Sep 2026",
  },
  {
    id: 2,
    subject: "Science",
    title: "Human Digestive System",
    teacher: "Mr. Rajesh Kumar",
    assigned: "04 Sep 2026",
    due: "12 Sep 2026",
    submitted: false,
    submittedDate: "",
  },
  {
    id: 3,
    subject: "English",
    title: "Essay Writing",
    teacher: "Mrs. Neha Sharma",
    assigned: "05 Sep 2026",
    due: "13 Sep 2026",
    submitted: true,
    submittedDate: "07 Sep 2026",
  },
  {
    id: 4,
    subject: "Social Science",
    title: "Indian Constitution",
    teacher: "Mr. Amit Singh",
    assigned: "06 Sep 2026",
    due: "15 Sep 2026",
    submitted: false,
    submittedDate: "",
  },
];

const defaultNotices = [
  {
    id: 1,
    title: "Parent Teacher Meeting",
    date: "12 Sep 2026",
    category: "Important",
    description:
      "The Parent Teacher Meeting will be held on 12 September 2026. Parents are requested to attend the meeting and discuss their child's academic progress with the respective teachers.",
  },
  {
    id: 2,
    title: "Half Yearly Examination Schedule",
    date: "18 Sep 2026",
    category: "Academic",
    description:
      "The half yearly examination schedule has been released. Parents are requested to check the examination dates and help students prepare accordingly.",
  },
  {
    id: 3,
    title: "School Holiday Notice",
    date: "25 Sep 2026",
    category: "General",
    description:
      "The school will remain closed on the announced holiday. Regular classes will resume from the next working day.",
  },
];

const defaultEvents = [
  {
    id: 1,
    title: "Annual Sports Day",
    date: "20 Sep 2026",
    time: "8:30 AM",
    location: "School Sports Ground",
    description:
      "Students will participate in various athletic and team sports activities during the Annual Sports Day.",
  },
  {
    id: 2,
    title: "Science Exhibition",
    date: "24 Sep 2026",
    time: "10:00 AM",
    location: "School Auditorium",
    description:
      "Students will present innovative science models and projects during the annual Science Exhibition.",
  },
  {
    id: 3,
    title: "Cultural Fest",
    date: "30 Sep 2026",
    time: "11:00 AM",
    location: "Main Auditorium",
    description:
      "The Cultural Fest will showcase music, dance, drama and creative performances by our students.",
  },
];

const defaultResults = [
  {
    subject: "English",
    marks: 91,
    grade: "A+",
  },
  {
    subject: "Mathematics",
    marks: 94,
    grade: "A+",
  },
  {
    subject: "Science",
    marks: 89,
    grade: "A",
  },
  {
    subject: "Social Science",
    marks: 92,
    grade: "A+",
  },
  {
    subject: "Computer",
    marks: 96,
    grade: "A+",
  },
];

const defaultFees = [
  {
    id: 1,
    title: "Tuition Fee",
    amount: 18000,
    status: "Paid",
  },
  {
    id: 2,
    title: "Transport Fee",
    amount: 6000,
    status: "Paid",
  },
  {
    id: 3,
    title: "Activity Fee",
    amount: 2500,
    status: "Pending",
  },
];

const defaultAttendance = {
  totalDays: 120,
  presentDays: 110,
  absentDays: 10,
  percentage: 91.67,
};

export const getAssignmentsData = () =>
  getStorageData("abpsAdminAssignments", defaultAssignments);

export const getNoticesData = () =>
  getStorageData("abpsAdminNotices", defaultNotices);

export const getEventsData = () =>
  getStorageData("abpsAdminEvents", defaultEvents);

export const getResultsData = () =>
  getStorageData("abpsAdminResults", defaultResults);

export const getFeesData = () =>
  getStorageData("abpsAdminFees", defaultFees);

export const getAttendanceData = () =>
  getStorageObject("abpsAdminAttendance", defaultAttendance);

export const getStudentsData = () =>
  getStorageData("abpsAdminStudents", []);

export const getNewsData = () =>
  getStorageData("abpsAdminNews", []);

export const assignmentsData = getAssignmentsData();
export const noticesData = getNoticesData();
export const eventsData = getEventsData();
export const resultsData = getResultsData();
export const feesData = getFeesData();

export const attendanceData = getAttendanceData();

export const paymentMethods = [
  {
    id: "gpay",
    name: "Google Pay",
    type: "UPI",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    type: "UPI",
  },
  {
    id: "paytm",
    name: "Paytm",
    type: "UPI",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    type: "Card",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    type: "Bank",
  },
];

const defaultProfile = {
  student: "Aarav Sharma",
  className: "Class X - A",
  admission: "ABPS-2026-0142",
  parent: "Mr. Rahul Sharma",
  phone: "+91 98765 43210",
  email: "parent@example.com",
};

export const initialProfile = getStorageObject(
  "abpsAdminProfile",
  defaultProfile
);

export const refreshParentData = () => {
  return {
    assignments: getAssignmentsData(),
    notices: getNoticesData(),
    events: getEventsData(),
    results: getResultsData(),
    fees: getFeesData(),
    attendance: getAttendanceData(),
    profile: getStorageObject(
      "abpsAdminProfile",
      defaultProfile
    ),
  };
};