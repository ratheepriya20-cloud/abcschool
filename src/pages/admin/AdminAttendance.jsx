import React, { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaEdit,
  FaSave,
  FaUserGraduate,
} from "react-icons/fa";
import "./AdminAttendance.css";

const STORAGE_KEY = "abpsAdminAttendance";

const defaultAttendance = {
  present: 92,
  absent: 8,
  totalDays: 100,
  presentDays: 92,
  absentDays: 8,
};

const AdminAttendance = () => {
  const [attendance, setAttendance] = useState(defaultAttendance);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(defaultAttendance);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const data = JSON.parse(saved);
      setAttendance(data);
      setForm(data);
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultAttendance)
      );
    }
  }, []);

  const startEdit = () => {
    setForm(attendance);
    setEditing(true);
  };

  const save = () => {
    const total = Number(form.totalDays);
    const presentDays = Number(form.presentDays);
    const absentDays = total - presentDays;

    if (total <= 0 || presentDays < 0 || presentDays > total) {
      alert("Please enter valid attendance values.");
      return;
    }

    const updated = {
      totalDays: total,
      presentDays,
      absentDays,
      present: Math.round((presentDays / total) * 100),
      absent: Math.round((absentDays / total) * 100),
    };

    setAttendance(updated);
    setForm(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("abpsDataUpdated"));
    setEditing(false);
  };

  return (
    <div className="adminAttendancePage">
      <div className="adminAttendanceHeader">
        <div>
          <span className="adminAttendanceEyebrow">
            <FaCalendarCheck /> STUDENT ATTENDANCE
          </span>

          <h1>Attendance Management</h1>

          <p>
            Update student attendance information shown in the parent portal.
          </p>
        </div>

        {!editing && (
          <button className="adminAttendanceEdit" onClick={startEdit}>
            <FaEdit /> Edit Attendance
          </button>
        )}
      </div>

      <div className="adminAttendanceMain">
        <div className="adminAttendanceCircle">
          <div>
            <strong>{attendance.present}%</strong>
            <span>Present</span>
          </div>
        </div>

        <div className="adminAttendanceStats">
          <div>
            <FaCalendarCheck />
            <span>Total Days</span>
            <strong>{attendance.totalDays}</strong>
          </div>

          <div>
            <FaUserGraduate />
            <span>Present Days</span>
            <strong>{attendance.presentDays}</strong>
          </div>

          <div>
            <FaCalendarCheck />
            <span>Absent Days</span>
            <strong>{attendance.absentDays}</strong>
          </div>
        </div>
      </div>

      {editing && (
        <div className="adminAttendanceForm">
          <h2>Update Attendance</h2>

          <div className="adminAttendanceFields">
            <label>
              Total Working Days
              <input
                type="number"
                value={form.totalDays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalDays: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Present Days
              <input
                type="number"
                value={form.presentDays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    presentDays: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <button className="adminAttendanceSave" onClick={save}>
            <FaSave /> Save Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;