import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaEdit,
  FaSave,
  FaPhone,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import "./AdminStudents.css";

const STORAGE_KEY = "abpsAdminStudents";

const defaultStudent = {
  student: "Aarav Sharma",
  className: "Class X - A",
  admission: "ABPS-2026-0142",
  parent: "Mr. Rahul Sharma",
  phone: "+91 98765 43210",
  email: "parent@example.com",
};

const AdminStudents = () => {
  const [student, setStudent] = useState(defaultStudent);
  const [form, setForm] = useState(defaultStudent);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const data = JSON.parse(saved);
      setStudent(data);
      setForm(data);
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultStudent)
      );
    }
  }, []);

  const editStudent = () => {
    setForm(student);
    setEditing(true);
  };

  const saveStudent = (e) => {
    e.preventDefault();

    if (
      !form.student ||
      !form.className ||
      !form.admission ||
      !form.parent ||
      !form.phone ||
      !form.email
    ) {
      alert("Please fill all fields.");
      return;
    }

    setStudent(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    window.dispatchEvent(new Event("abpsDataUpdated"));
    setEditing(false);
  };

  return (
    <div className="adminStudentsPage">
      <div className="adminStudentsHeader">
        <div>
          <span className="adminStudentsEyebrow">
            <FaUserGraduate /> STUDENT MANAGEMENT
          </span>

          <h1>Student Profile</h1>

          <p>
            Manage student and parent information connected to the parent
            dashboard.
          </p>
        </div>

        {!editing && (
          <button className="adminStudentsEdit" onClick={editStudent}>
            <FaEdit /> Edit Student
          </button>
        )}
      </div>

      {!editing ? (
        <div className="adminStudentProfile">
          <div className="adminStudentAvatar">
            <FaUserGraduate />
          </div>

          <div className="adminStudentMainInfo">
            <span>STUDENT</span>
            <h2>{student.student}</h2>
            <p>{student.className}</p>
          </div>

          <div className="adminStudentDetails">
            <div>
              <span>Admission No.</span>
              <strong>{student.admission}</strong>
            </div>

            <div>
              <span>Parent / Guardian</span>
              <strong>{student.parent}</strong>
            </div>

            <div>
              <span>
                <FaPhone /> Phone
              </span>
              <strong>{student.phone}</strong>
            </div>

            <div>
              <span>
                <FaEnvelope /> Email
              </span>
              <strong>{student.email}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="adminStudentsFormCard">
          <button
            className="adminStudentsClose"
            onClick={() => setEditing(false)}
          >
            <FaTimes />
          </button>

          <h2>Edit Student Information</h2>
          <p>Update the information used by the parent portal.</p>

          <form onSubmit={saveStudent}>
            <div className="adminStudentsGrid">
              <label>
                Student Name
                <input
                  value={form.student}
                  onChange={(e) =>
                    setForm({ ...form, student: e.target.value })
                  }
                />
              </label>

              <label>
                Class
                <input
                  value={form.className}
                  onChange={(e) =>
                    setForm({ ...form, className: e.target.value })
                  }
                />
              </label>

              <label>
                Admission Number
                <input
                  value={form.admission}
                  onChange={(e) =>
                    setForm({ ...form, admission: e.target.value })
                  }
                />
              </label>

              <label>
                Parent / Guardian
                <input
                  value={form.parent}
                  onChange={(e) =>
                    setForm({ ...form, parent: e.target.value })
                  }
                />
              </label>

              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </label>
            </div>

            <button className="adminStudentsSave" type="submit">
              <FaSave /> Save Student
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;