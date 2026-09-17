export const ADMIN_KEYS = {
  notices: "abpsAdminNotices",
 
  events: "abpsAdminEvents",
  assignments: "abpsAdminAssignments",
  fees: "abpsAdminFees",
  results: "abpsAdminResults",
  attendance: "abpsAdminAttendance",
  students: "abpsAdminStudents",
  profile: "abpsAdminProfile",
};

export const readAdminData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);

    if (!data) return fallback;

    const parsed = JSON.parse(data);

    return parsed;
  } catch (error) {
    console.error("Admin data read error:", error);
    return fallback;
  }
};

export const saveAdminData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));

    window.dispatchEvent(new Event("abpsDataUpdated"));
  } catch (error) {
    console.error("Admin data save error:", error);
  }
};

export const createAdminId = (prefix = "item") => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 7)}`;
};