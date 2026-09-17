import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBell,
  FaCalendarAlt,
  FaTasks,
  FaMoneyBillWave,
  FaChartBar,
  FaClipboardCheck,
  FaUsers,
  FaUserCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSignOutAlt,
  FaGraduationCap,
  FaChevronRight,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const ADMIN_KEYS = {
  notices: "abpsAdminNotices",
  events: "abpsAdminEvents",
  assignments: "abpsAdminAssignments",
  fees: "abpsAdminFees",
  results: "abpsAdminResults",
  attendance: "abpsAdminAttendance",
  students: "abpsAdminStudents",
  profile: "abpsAdminProfile",
};

const defaultData = {
  notices: [
    {
      id: 1,
      category: "Important",
      date: "14 September 2026",
      title: "Half Yearly Examination Schedule",
      description: "The half yearly examination schedule has been published.",
    },
    {
      id: 2,
      category: "School",
      date: "12 September 2026",
      title: "Parent Teacher Meeting",
      description: "Parents are requested to attend the upcoming PTM.",
    },
  ],

  events: [
    {
      id: 1,
      date: "20 September 2026",
      title: "Annual Sports Day",
      time: "09:00 AM",
      location: "School Sports Ground",
      description: "Annual sports activities for all students.",
    },
    {
      id: 2,
      date: "25 September 2026",
      title: "Science Exhibition",
      time: "10:00 AM",
      location: "School Auditorium",
      description: "Students will present innovative science projects.",
    },
  ],

  assignments: [
    {
      id: 1,
      title: "Mathematics Worksheet",
      subject: "Mathematics",
      teacher: "Mrs. Sharma",
      assigned: "12 September 2026",
      due: "18 September 2026",
      submitted: "Pending",
    },
    {
      id: 2,
      title: "English Essay",
      subject: "English",
      teacher: "Mr. Kumar",
      assigned: "10 September 2026",
      due: "16 September 2026",
      submitted: "Submitted",
    },
  ],

  fees: [
    {
      id: 1,
      title: "Tuition Fee - September",
      amount: 3500,
      status: "Pending",
      dueDate: "20 September 2026",
    },
    {
      id: 2,
      title: "Transport Fee - September",
      amount: 1800,
      status: "Paid",
      dueDate: "15 September 2026",
    },
  ],

  results: [
    {
      id: 1,
      student: "Aarav Sharma",
      className: "VIII",
      subject: "Mathematics",
      marks: 94,
      grade: "A+",
      exam: "Half Yearly",
    },
    {
      id: 2,
      student: "Aarav Sharma",
      className: "VIII",
      subject: "Science",
      marks: 89,
      grade: "A",
      exam: "Half Yearly",
    },
    {
      id: 3,
      student: "Aarav Sharma",
      className: "VIII",
      subject: "English",
      marks: 91,
      grade: "A+",
      exam: "Half Yearly",
    },
  ],

  attendance: [
    {
      id: 1,
      month: "April 2026",
      present: 22,
      absent: 1,
      percentage: "95.7",
    },
    {
      id: 2,
      month: "May 2026",
      present: 21,
      absent: 2,
      percentage: "91.3",
    },
    {
      id: 3,
      month: "June 2026",
      present: 20,
      absent: 1,
      percentage: "95.2",
    },
    {
      id: 4,
      month: "July 2026",
      present: 19,
      absent: 2,
      percentage: "90.5",
    },
    {
      id: 5,
      month: "August 2026",
      present: 22,
      absent: 1,
      percentage: "95.7",
    },
  ],

  students: [
    {
      id: 1,
      name: "Aarav Sharma",
      admission: "ABPS2026001",
      className: "VIII",
      section: "A",
      rollNo: "12",
      parent: "Rajesh Sharma",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Ananya Verma",
      admission: "ABPS2026002",
      className: "VII",
      section: "B",
      rollNo: "08",
      parent: "Amit Verma",
      phone: "9876501234",
    },
  ],

  profile: {
    parent: "Rajesh Sharma",
    phone: "9876543210",
    email: "parent@example.com",
    student: "Aarav Sharma",
    className: "VIII - A",
    admission: "ABPS2026001",
  },
};

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: <FaTachometerAlt />,
  },
  {
    id: "notices",
    label: "Notices",
    icon: <FaBell />,
  },
  {
    id: "events",
    label: "Events",
    icon: <FaCalendarAlt />,
  },
  {
    id: "assignments",
    label: "Assignments",
    icon: <FaTasks />,
  },
  {
    id: "fees",
    label: "Fees",
    icon: <FaMoneyBillWave />,
  },
  {
    id: "results",
    label: "Results",
    icon: <FaChartBar />,
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: <FaClipboardCheck />,
  },
  {
    id: "students",
    label: "Students",
    icon: <FaUsers />,
  },
  {
    id: "profile",
    label: "Parent Profile",
    icon: <FaUserCircle />,
  },
];

const emptyForms = {
  notices: {
    category: "",
    date: "",
    title: "",
    description: "",
  },

  events: {
    date: "",
    title: "",
    time: "",
    location: "",
    description: "",
  },

  assignments: {
    title: "",
    subject: "",
    teacher: "",
    assigned: "",
    due: "",
    submitted: "Pending",
  },

  fees: {
    title: "",
    amount: "",
    status: "Pending",
    dueDate: "",
  },

  results: {
    student: "",
    className: "",
    subject: "",
    marks: "",
    grade: "",
    exam: "",
  },

  attendance: {
    month: "",
    present: "",
    absent: "",
    percentage: "",
  },

  students: {
    name: "",
    admission: "",
    className: "",
    section: "",
    rollNo: "",
    parent: "",
    phone: "",
  },

  profile: {
    parent: "",
    phone: "",
    email: "",
    student: "",
    className: "",
    admission: "",
  },
};

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const saveAdminData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));

  window.dispatchEvent(new Event("abpsDataUpdated"));
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [data, setData] = useState({
    notices: [],
    events: [],
    assignments: [],
    fees: [],
    results: [],
    attendance: [],
    students: [],
    profile: null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [deleteItem, setDeleteItem] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const loadAllData = () => {
    setData({
      notices: readStorage(ADMIN_KEYS.notices, defaultData.notices),
      events: readStorage(ADMIN_KEYS.events, defaultData.events),
      assignments: readStorage(
        ADMIN_KEYS.assignments,
        defaultData.assignments
      ),
      fees: readStorage(ADMIN_KEYS.fees, defaultData.fees),
      results: readStorage(ADMIN_KEYS.results, defaultData.results),
      attendance: readStorage(
        ADMIN_KEYS.attendance,
        defaultData.attendance
      ),
      students: readStorage(ADMIN_KEYS.students, defaultData.students),
      profile: readStorage(ADMIN_KEYS.profile, defaultData.profile),
    });
  };

  useEffect(() => {
    loadAllData();

    const syncData = () => {
      loadAllData();
    };

    window.addEventListener("abpsDataUpdated", syncData);
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener("abpsDataUpdated", syncData);
      window.removeEventListener("storage", syncData);
    };
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 2800);
  };

  const getTitle = () => {
    const item = menuItems.find((menu) => menu.id === activeMenu);

    return item ? item.label : "Overview";
  };

  const getToday = () => {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const openAddModal = (type) => {
    setModalType(type);
    setEditingId(null);

    if (type === "profile") {
      setFormData(data.profile || emptyForms.profile);
    } else {
      setFormData(emptyForms[type]);
    }

    setModalOpen(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingId(item.id || null);

    setFormData({
      ...item,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType("");
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getNextId = (items) => {
    if (!items.length) return 1;

    return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (modalType === "profile") {
      const nextProfile = {
        ...formData,
      };

      setData((prev) => ({
        ...prev,
        profile: nextProfile,
      }));

      saveAdminData(ADMIN_KEYS.profile, nextProfile);

      closeModal();
      showMessage("Parent profile updated successfully.");
      return;
    }

    let finalFormData = {
      ...formData,
    };

    if (modalType === "fees") {
      finalFormData.amount = Number(formData.amount) || 0;
    }

    if (modalType === "results") {
      finalFormData.marks = Number(formData.marks) || 0;
    }

    if (modalType === "attendance") {
      const present = Number(formData.present) || 0;
      const absent = Number(formData.absent) || 0;
      const total = present + absent;

      finalFormData.present = present;
      finalFormData.absent = absent;
      finalFormData.percentage =
        total > 0 ? ((present / total) * 100).toFixed(1) : "0";
    }

    let updatedList = [...data[modalType]];

    if (editingId !== null) {
      updatedList = updatedList.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...finalFormData,
            }
          : item
      );
    } else {
      updatedList.push({
        id: getNextId(updatedList),
        ...finalFormData,
      });
    }

    setData((prev) => ({
      ...prev,
      [modalType]: updatedList,
    }));

    saveAdminData(ADMIN_KEYS[modalType], updatedList);

    closeModal();

    showMessage(
      editingId !== null
        ? `${getTitle()} updated successfully.`
        : `${getTitle()} added successfully.`
    );
  };

  const askDelete = (type, item) => {
    setDeleteItem({
      type,
      item,
    });
  };

  const cancelDelete = () => {
    setDeleteItem(null);
  };

  const confirmDelete = () => {
    if (!deleteItem) return;

    const { type, item } = deleteItem;

    const updatedList = data[type].filter(
      (currentItem) => currentItem.id !== item.id
    );

    setData((prev) => ({
      ...prev,
      [type]: updatedList,
    }));

    saveAdminData(ADMIN_KEYS[type], updatedList);

    setDeleteItem(null);

    showMessage("Item deleted successfully.");
  };

  const filteredData = (items) => {
    if (!searchValue.trim()) return items;

    const search = searchValue.toLowerCase();

    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  };

  const totalStudents = data.students.length;

  const pendingFees = data.fees.filter(
    (item) => item.status !== "Paid"
  ).length;

  const pendingAssignments = data.assignments.filter(
    (item) => item.submitted !== "Submitted"
  ).length;

  const averageResult =
    data.results.length > 0
      ? (
          data.results.reduce(
            (sum, item) => sum + Number(item.marks || 0),
            0
          ) / data.results.length
        ).toFixed(1)
      : "0";

  const averageAttendance =
    data.attendance.length > 0
      ? (
          data.attendance.reduce(
            (sum, item) => sum + Number(item.percentage || 0),
            0
          ) / data.attendance.length
        ).toFixed(1)
      : "0";

  const handleMenuClick = (id) => {
    setActiveMenu(id);
    setSidebarOpen(false);
    setSearchValue("");
  };

  const renderTable = () => {
    if (activeMenu === "notices") {
      const items = filteredData(data.notices);

      return (
        <div className="abadmin-content-card">
          <div className="abadmin-card-heading">
            <div>
              <span className="abadmin-small-label">SCHOOL UPDATES</span>
              <h2>Notices</h2>
            </div>

            <button
              className="abadmin-primary-btn"
              onClick={() => openAddModal("notices")}
            >
              <FaPlus />
              Add Notice
            </button>
          </div>

          <div className="abadmin-list">
            {items.length === 0 ? (
              <EmptyState text="No notices available." />
            ) : (
              items.map((item) => (
                <div className="abadmin-data-card" key={item.id}>
                  <div className="abadmin-data-icon notice-icon">
                    <FaBell />
                  </div>

                  <div className="abadmin-data-main">
                    <div className="abadmin-data-top">
                      <span className="abadmin-badge">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <ActionButtons
                    onEdit={() => openEditModal("notices", item)}
                    onDelete={() => askDelete("notices", item)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeMenu === "events") {
      const items = filteredData(data.events);

      return (
        <div className="abadmin-content-card">
          <CardHeader
            label="SCHOOL CALENDAR"
            title="Events"
            buttonText="Add Event"
            onAdd={() => openAddModal("events")}
          />

          <div className="abadmin-list">
            {items.length === 0 ? (
              <EmptyState text="No events available." />
            ) : (
              items.map((item) => (
                <div className="abadmin-data-card" key={item.id}>
                  <div className="abadmin-date-box">
                    <FaCalendarAlt />
                  </div>

                  <div className="abadmin-data-main">
                    <div className="abadmin-data-top">
                      <span>{item.date}</span>
                      <span>{item.time}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p>
                      {item.location} {item.description && `• ${item.description}`}
                    </p>
                  </div>

                  <ActionButtons
                    onEdit={() => openEditModal("events", item)}
                    onDelete={() => askDelete("events", item)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeMenu === "assignments") {
      const items = filteredData(data.assignments);

      return (
        <div className="abadmin-content-card">
          <CardHeader
            label="ACADEMIC WORK"
            title="Assignments"
            buttonText="Add Assignment"
            onAdd={() => openAddModal("assignments")}
          />

          <div className="abadmin-list">
            {items.length === 0 ? (
              <EmptyState text="No assignments available." />
            ) : (
              items.map((item) => (
                <div className="abadmin-data-card" key={item.id}>
                  <div className="abadmin-data-icon assignment-icon">
                    <FaTasks />
                  </div>

                  <div className="abadmin-data-main">
                    <div className="abadmin-data-top">
                      <span className="abadmin-badge">
                        {item.subject}
                      </span>
                      <span>Due: {item.due}</span>
                    </div>

                    <h3>{item.title}</h3>

                    <p>
                      Teacher: {item.teacher} • Assigned: {item.assigned}
                    </p>
                  </div>

                  <span
                    className={`abadmin-status ${
                      item.submitted === "Submitted"
                        ? "status-paid"
                        : "status-pending"
                    }`}
                  >
                    {item.submitted}
                  </span>

                  <ActionButtons
                    onEdit={() => openEditModal("assignments", item)}
                    onDelete={() => askDelete("assignments", item)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeMenu === "fees") {
      const items = filteredData(data.fees);

      return (
        <div className="abadmin-content-card">
          <CardHeader
            label="FINANCE MANAGEMENT"
            title="Fees"
            buttonText="Add Fee"
            onAdd={() => openAddModal("fees")}
          />

          <div className="abadmin-list">
            {items.length === 0 ? (
              <EmptyState text="No fee records available." />
            ) : (
              items.map((item) => (
                <div className="abadmin-data-card" key={item.id}>
                  <div className="abadmin-data-icon fee-icon">
                    <FaMoneyBillWave />
                  </div>

                  <div className="abadmin-data-main">
                    <div className="abadmin-data-top">
                      <span>{item.dueDate}</span>
                    </div>

                    <h3>{item.title}</h3>

                    <p className="abadmin-money">
                      ₹{Number(item.amount || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span
                    className={`abadmin-status ${
                      item.status === "Paid"
                        ? "status-paid"
                        : item.status === "Partial"
                        ? "status-partial"
                        : "status-pending"
                    }`}
                  >
                    {item.status}
                  </span>

                  <ActionButtons
                    onEdit={() => openEditModal("fees", item)}
                    onDelete={() => askDelete("fees", item)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeMenu === "results") {
      const items = filteredData(data.results);

      return (
        <div className="abadmin-content-card">
          <CardHeader
            label="ACADEMIC PERFORMANCE"
            title="Results"
            buttonText="Add Result"
            onAdd={() => openAddModal("results")}
          />

          <div className="abadmin-table-wrapper">
            <table className="abadmin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Exam</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <EmptyState text="No result records available." />
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.student}</td>
                      <td>{item.className}</td>
                      <td>{item.subject}</td>
                      <td>
                        <strong>{item.marks}</strong>/100
                      </td>
                      <td>
                        <span className="abadmin-grade">
                          {item.grade}
                        </span>
                      </td>
                      <td>{item.exam}</td>
                      <td>
                        <ActionButtons
                          onEdit={() => openEditModal("results", item)}
                          onDelete={() => askDelete("results", item)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeMenu === "attendance") {
      const items = filteredData(data.attendance);

      return (
        <div className="abadmin-content-card">
          <CardHeader
            label="STUDENT ATTENDANCE"
            title="Attendance"
            buttonText="Add Attendance"
            onAdd={() => openAddModal("attendance")}
          />

          <div className="abadmin-attendance-grid">
            {items.length === 0 ? (
              <EmptyState text="No attendance records available." />
            ) : (
              items.map((item) => (
                <div className="abadmin-attendance-card" key={item.id}>
                  <div className="attendance-card-top">
                    <div>
                      <span>MONTH</span>
                      <h3>{item.month}</h3>
                    </div>

                    <div className="attendance-percent">
                      {item.percentage}%
                    </div>
                  </div>

                  <div className="attendance-progress">
                    <span
                      style={{
                        width: `${Math.min(
                          Number(item.percentage) || 0,
                          100
                        )}%`,
                      }}
                    ></span>
                  </div>

                  <div className="attendance-bottom">
                    <div>
                      <strong>{item.present}</strong>
                      <span>Present</span>
                    </div>

                    <div>
                      <strong>{item.absent}</strong>
                      <span>Absent</span>
                    </div>

                    <ActionButtons
                      onEdit={() =>
                        openEditModal("attendance", item)
                      }
                      onDelete={() =>
                        askDelete("attendance", item)
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeMenu === "students") {
      const items = filteredData(data.students);

      return (
        <div className="abadmin-content-card">
          <CardHeader
            label="STUDENT MANAGEMENT"
            title="Students"
            buttonText="Add Student"
            onAdd={() => openAddModal("students")}
          />

          <div className="abadmin-table-wrapper">
            <table className="abadmin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Admission</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Roll No.</th>
                  <th>Parent</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="8">
                      <EmptyState text="No students available." />
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="student-table-name">
                          <div className="student-avatar">
                            {item.name?.charAt(0)}
                          </div>
                          <strong>{item.name}</strong>
                        </div>
                      </td>

                      <td>{item.admission}</td>
                      <td>{item.className}</td>
                      <td>{item.section}</td>
                      <td>{item.rollNo}</td>
                      <td>{item.parent}</td>
                      <td>{item.phone}</td>

                      <td>
                        <ActionButtons
                          onEdit={() =>
                            openEditModal("students", item)
                          }
                          onDelete={() =>
                            askDelete("students", item)
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeMenu === "profile") {
      const profile = data.profile;

      return (
        <div className="abadmin-content-card">
          <div className="abadmin-card-heading">
            <div>
              <span className="abadmin-small-label">
                PARENT INFORMATION
              </span>
              <h2>Parent Profile</h2>
            </div>

            <button
              className="abadmin-primary-btn"
              onClick={() => openAddModal("profile")}
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {profile ? (
            <div className="abadmin-profile-box">
              <div className="abadmin-profile-head">
                <div className="abadmin-profile-avatar">
                  <FaUserCircle />
                </div>

                <div>
                  <span>Parent Account</span>
                  <h2>{profile.parent}</h2>
                </div>
              </div>

              <div className="abadmin-profile-grid">
                <ProfileInfo
                  label="Parent Name"
                  value={profile.parent}
                />

                <ProfileInfo
                  label="Phone Number"
                  value={profile.phone}
                />

                <ProfileInfo
                  label="Email Address"
                  value={profile.email}
                />

                <ProfileInfo
                  label="Student Name"
                  value={profile.student}
                />

                <ProfileInfo
                  label="Class"
                  value={profile.className}
                />

                <ProfileInfo
                  label="Admission Number"
                  value={profile.admission}
                />
              </div>
            </div>
          ) : (
            <EmptyState text="No parent profile available." />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="abadmin-page">
      {sidebarOpen && (
        <div
          className="abadmin-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`abadmin-sidebar ${
          sidebarOpen ? "abadmin-sidebar-open" : ""
        }`}
      >
        <div className="abadmin-brand">
          <div className="abadmin-brand-logo">
            <FaGraduationCap />
          </div>

          <div>
            <h2>ABPS</h2>
            <span>Admin Panel</span>
          </div>

          <button
            className="abadmin-mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="abadmin-admin-mini">
          <div className="abadmin-admin-avatar">
            <FaUserCircle />
          </div>

          <div>
            <strong>School Admin</strong>
            <span>Administrator</span>
          </div>
        </div>

        <nav className="abadmin-navigation">
          <span className="abadmin-nav-label">MAIN MENU</span>

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`abadmin-nav-item ${
                activeMenu === item.id
                  ? "abadmin-nav-active"
                  : ""
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className="abadmin-nav-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>

              {activeMenu === item.id && (
                <FaChevronRight className="abadmin-nav-arrow" />
              )}
            </button>
          ))}
        </nav>

        <div className="abadmin-sidebar-bottom">
          <button
            className="abadmin-logout-btn"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="abadmin-main">
        <header className="abadmin-header">
          <div className="abadmin-header-left">
            <button
              className="abadmin-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

            <div>
              <span className="abadmin-header-date">
                {getToday()}
              </span>

              <h1>{getTitle()}</h1>
            </div>
          </div>

          <div className="abadmin-header-right">
            <div className="abadmin-search">
              <FaSearch />

              <input
                type="text"
                placeholder="Search data..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div className="abadmin-header-profile">
              <div className="abadmin-header-avatar">
                <FaUserCircle />
              </div>

              <div>
                <strong>Administrator</strong>
                <span>AB Public School</span>
              </div>
            </div>
          </div>
        </header>

        <section className="abadmin-content">
          {activeMenu === "overview" ? (
            <>
              <div className="abadmin-welcome">
                <div>
                  <span>ADMINISTRATION DASHBOARD</span>

                  <h2>
                    Welcome back, <strong>Administrator</strong>
                  </h2>

                  <p>
                    Manage school information, students and parent
                    dashboard data from one place.
                  </p>
                </div>

                <div className="abadmin-welcome-icon">
                  <FaGraduationCap />
                </div>
              </div>

              <div className="abadmin-stats-grid">
                <StatCard
                  icon={<FaUsers />}
                  label="Total Students"
                  value={totalStudents}
                  className="blue"
                />

                <StatCard
                  icon={<FaBell />}
                  label="Active Notices"
                  value={data.notices.length}
                  className="gold"
                />

                <StatCard
                  icon={<FaTasks />}
                  label="Pending Assignments"
                  value={pendingAssignments}
                  className="purple"
                />

                <StatCard
                  icon={<FaMoneyBillWave />}
                  label="Pending Fees"
                  value={pendingFees}
                  className="red"
                />

                <StatCard
                  icon={<FaChartBar />}
                  label="Average Result"
                  value={`${averageResult}%`}
                  className="green"
                />

                <StatCard
                  icon={<FaClipboardCheck />}
                  label="Attendance"
                  value={`${averageAttendance}%`}
                  className="sky"
                />
              </div>

              <div className="abadmin-overview-grid">
                <div className="abadmin-overview-card">
                  <div className="abadmin-overview-card-heading">
                    <div>
                      <span>RECENT</span>
                      <h3>Notices</h3>
                    </div>

                    <button
                      onClick={() => setActiveMenu("notices")}
                    >
                      View All
                    </button>
                  </div>

                  <div className="abadmin-mini-list">
                    {data.notices.slice(0, 3).map((item) => (
                      <div
                        className="abadmin-mini-item"
                        key={item.id}
                      >
                        <div className="mini-item-icon">
                          <FaBell />
                        </div>

                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ))}

                    {data.notices.length === 0 && (
                      <EmptyState text="No notices available." />
                    )}
                  </div>
                </div>

                <div className="abadmin-overview-card">
                  <div className="abadmin-overview-card-heading">
                    <div>
                      <span>UPCOMING</span>
                      <h3>Events</h3>
                    </div>

                    <button
                      onClick={() => setActiveMenu("events")}
                    >
                      View All
                    </button>
                  </div>

                  <div className="abadmin-mini-list">
                    {data.events.slice(0, 3).map((item) => (
                      <div
                        className="abadmin-mini-item"
                        key={item.id}
                      >
                        <div className="mini-item-icon event-mini">
                          <FaCalendarAlt />
                        </div>

                        <div>
                          <strong>{item.title}</strong>
                          <span>
                            {item.date} • {item.time}
                          </span>
                        </div>
                      </div>
                    ))}

                    {data.events.length === 0 && (
                      <EmptyState text="No events available." />
                    )}
                  </div>
                </div>
              </div>

              <div className="abadmin-sync-note">
                <div className="sync-icon">
                  <FaCheckCircle />
                </div>

                <div>
                  <strong>Parent Dashboard Sync Enabled</strong>
                  <p>
                    Changes made here are saved in localStorage and
                    shared with the Parent Dashboard automatically.
                  </p>
                </div>
              </div>
            </>
          ) : (
            renderTable()
          )}
        </section>
      </main>

      {modalOpen && (
        <div className="abadmin-modal-overlay">
          <div className="abadmin-modal">
            <div className="abadmin-modal-header">
              <div>
                <span>ADMIN PANEL</span>

                <h2>
                  {editingId !== null ? "Edit" : "Add"}{" "}
                  {modalType === "profile"
                    ? "Parent Profile"
                    : modalType.charAt(0).toUpperCase() +
                      modalType.slice(1)}
                </h2>
              </div>

              <button onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <form
              className="abadmin-form"
              onSubmit={handleSave}
            >
              {modalType === "notices" && (
                <>
                  <FormInput
                    label="Notice Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Important / School / Holiday"
                    required
                  />

                  <FormInput
                    label="Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />

                  <FormTextarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              {modalType === "events" && (
                <>
                  <FormInput
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />

                  <FormTextarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </>
              )}

              {modalType === "assignments" && (
                <>
                  <FormInput
                    label="Assignment Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Teacher"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Assigned Date"
                    name="assigned"
                    value={formData.assigned}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Due Date"
                    name="due"
                    value={formData.due}
                    onChange={handleChange}
                    required
                  />

                  <FormSelect
                    label="Submission Status"
                    name="submitted"
                    value={formData.submitted}
                    onChange={handleChange}
                    options={["Pending", "Submitted"]}
                  />
                </>
              )}

              {modalType === "fees" && (
                <>
                  <FormInput
                    label="Fee Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />

                  <FormSelect
                    label="Payment Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={["Pending", "Paid", "Partial"]}
                  />

                  <FormInput
                    label="Due Date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              {modalType === "results" && (
                <>
                  <FormInput
                    label="Student Name"
                    name="student"
                    value={formData.student}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Class"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Marks"
                    name="marks"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.marks}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Exam"
                    name="exam"
                    value={formData.exam}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              {modalType === "attendance" && (
                <>
                  <FormInput
                    label="Month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Present Days"
                    name="present"
                    type="number"
                    min="0"
                    value={formData.present}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Absent Days"
                    name="absent"
                    type="number"
                    min="0"
                    value={formData.absent}
                    onChange={handleChange}
                    required
                  />

                  <div className="abadmin-auto-info">
                    <FaCheckCircle />
                    <span>
                      Attendance percentage automatically calculate
                      hoga.
                    </span>
                  </div>
                </>
              )}

              {modalType === "students" && (
                <>
                  <FormInput
                    label="Student Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Admission Number"
                    name="admission"
                    value={formData.admission}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Class"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Roll Number"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Parent Name"
                    name="parent"
                    value={formData.parent}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Parent Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              {modalType === "profile" && (
                <>
                  <FormInput
                    label="Parent Name"
                    name="parent"
                    value={formData.parent}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Student Name"
                    name="student"
                    value={formData.student}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Class"
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  />

                  <FormInput
                    label="Admission Number"
                    name="admission"
                    value={formData.admission}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <div className="abadmin-form-actions">
                <button
                  type="button"
                  className="abadmin-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="abadmin-save-btn"
                >
                  <FaCheckCircle />
                  {editingId !== null ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteItem && (
        <div className="abadmin-modal-overlay">
          <div className="abadmin-delete-modal">
            <div className="abadmin-delete-icon">
              <FaExclamationTriangle />
            </div>

            <h2>Delete this item?</h2>

            <p>
              This action cannot be undone. The selected data will
              also be removed from the Parent Dashboard.
            </p>

            <div className="abadmin-delete-actions">
              <button
                className="abadmin-cancel-btn"
                onClick={cancelDelete}
              >
                Cancel
              </button>

              <button
                className="abadmin-delete-confirm"
                onClick={confirmDelete}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`abadmin-toast ${
            messageType === "success"
              ? "toast-success"
              : "toast-error"
          }`}
        >
          <FaCheckCircle />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

const CardHeader = ({
  label,
  title,
  buttonText,
  onAdd,
}) => {
  return (
    <div className="abadmin-card-heading">
      <div>
        <span className="abadmin-small-label">{label}</span>
        <h2>{title}</h2>
      </div>

      <button
        className="abadmin-primary-btn"
        onClick={onAdd}
      >
        <FaPlus />
        {buttonText}
      </button>
    </div>
  );
};

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="abadmin-actions">
      <button
        className="abadmin-edit-btn"
        onClick={onEdit}
        title="Edit"
      >
        <FaEdit />
      </button>

      <button
        className="abadmin-delete-btn"
        onClick={onDelete}
        title="Delete"
      >
        <FaTrash />
      </button>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  className,
}) => {
  return (
    <div className={`abadmin-stat-card ${className}`}>
      <div className="abadmin-stat-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
};

const ProfileInfo = ({ label, value }) => {
  return (
    <div className="abadmin-profile-info">
      <span>{label}</span>
      <strong>{value || "Not available"}</strong>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
}) => {
  return (
    <div className="abadmin-form-group">
      <label>
        {label}
        {required && <em>*</em>}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
};

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="abadmin-form-group abadmin-full-width">
      <label>
        {label}
        {required && <em>*</em>}
      </label>

      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        required={required}
        rows="5"
      />
    </div>
  );
};

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="abadmin-form-group">
      <label>{label}</label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const EmptyState = ({ text }) => {
  return (
    <div className="abadmin-empty">
      <FaClipboardCheck />
      <span>{text}</span>
    </div>
  );
};

export default AdminDashboard;