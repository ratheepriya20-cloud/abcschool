import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";
import "./AdminAssignments.css";

const STORAGE_KEY = "abpsAdminAssignments";

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
];

const AdminAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    subject: "",
    title: "",
    teacher: "",
    assigned: "",
    due: "",
    submitted: false,
    submittedDate: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setAssignments(JSON.parse(saved));
    } else {
      setAssignments(defaultAssignments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAssignments));
    }
  }, []);

  const save = (data) => {
    setAssignments(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("abpsDataUpdated"));
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      subject: "",
      title: "",
      teacher: "",
      assigned: "",
      due: "",
      submitted: false,
      submittedDate: "",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    setShowForm(true);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !form.subject ||
      !form.title ||
      !form.teacher ||
      !form.assigned ||
      !form.due
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editId) {
      save(
        assignments.map((item) =>
          item.id === editId ? { ...form, id: editId } : item
        )
      );
    } else {
      save([{ ...form, id: Date.now() }, ...assignments]);
    }

    setShowForm(false);
  };

  const deleteAssignment = (id) => {
    if (!window.confirm("Delete this assignment?")) return;
    save(assignments.filter((item) => item.id !== id));
  };

  return (
    <div className="adminAssignmentsPage">
      <div className="adminAssignmentsHeader">
        <div>
          <span className="adminAssignmentsEyebrow">
            <FaTasks /> ACADEMIC MANAGEMENT
          </span>
          <h1>Assignments</h1>
          <p>Manage assignments given to students.</p>
        </div>

        <button className="adminAssignmentsAdd" onClick={openAdd}>
          <FaPlus /> Add Assignment
        </button>
      </div>

      <div className="adminAssignmentsTableWrap">
        <table className="adminAssignmentsTable">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment</th>
              <th>Teacher</th>
              <th>Assigned</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.subject}</strong>
                </td>

                <td>{item.title}</td>

                <td>{item.teacher}</td>

                <td>{item.assigned}</td>

                <td>{item.due}</td>

                <td>
                  <span
                    className={
                      item.submitted
                        ? "adminAssignmentStatus submitted"
                        : "adminAssignmentStatus pending"
                    }
                  >
                    {item.submitted ? (
                      <>
                        <FaCheckCircle /> Submitted
                      </>
                    ) : (
                      "Pending"
                    )}
                  </span>
                </td>

                <td>
                  <div className="adminAssignmentButtons">
                    <button onClick={() => openEdit(item)}>
                      <FaEdit />
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteAssignment(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="adminAssignmentsOverlay">
          <div className="adminAssignmentsModal">
            <button
              className="adminAssignmentsClose"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <h2>{editId ? "Edit Assignment" : "Add Assignment"}</h2>
            <p>Enter assignment information.</p>

            <form onSubmit={submitForm}>
              <div className="adminAssignmentsTwo">
                <label>
                  Subject
                  <input
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="Mathematics"
                  />
                </label>

                <label>
                  Assignment Title
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Quadratic Equations"
                  />
                </label>
              </div>

              <label>
                Teacher
                <input
                  value={form.teacher}
                  onChange={(e) =>
                    setForm({ ...form, teacher: e.target.value })
                  }
                  placeholder="Mrs. Anjali Verma"
                />
              </label>

              <div className="adminAssignmentsTwo">
                <label>
                  Assigned Date
                  <input
                    value={form.assigned}
                    onChange={(e) =>
                      setForm({ ...form, assigned: e.target.value })
                    }
                    placeholder="02 Sep 2026"
                  />
                </label>

                <label>
                  Due Date
                  <input
                    value={form.due}
                    onChange={(e) =>
                      setForm({ ...form, due: e.target.value })
                    }
                    placeholder="10 Sep 2026"
                  />
                </label>
              </div>

              <label className="adminAssignmentCheck">
                <input
                  type="checkbox"
                  checked={form.submitted}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      submitted: e.target.checked,
                      submittedDate: e.target.checked
                        ? form.submittedDate
                        : "",
                    })
                  }
                />
                Assignment Submitted
              </label>

              {form.submitted && (
                <label>
                  Submitted Date
                  <input
                    value={form.submittedDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        submittedDate: e.target.value,
                      })
                    }
                    placeholder="08 Sep 2026"
                  />
                </label>
              )}

              <button className="adminAssignmentsSubmit" type="submit">
                {editId ? "Update Assignment" : "Add Assignment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAssignments;