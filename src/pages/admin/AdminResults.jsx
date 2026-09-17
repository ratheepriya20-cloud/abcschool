import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";
import "./AdminResults.css";

const STORAGE_KEY = "abpsAdminResults";

const defaultResults = [
  { id: 1, subject: "English", marks: 91, grade: "A+" },
  { id: 2, subject: "Mathematics", marks: 94, grade: "A+" },
  { id: 3, subject: "Science", marks: 89, grade: "A" },
  { id: 4, subject: "Social Science", marks: 92, grade: "A+" },
  { id: 5, subject: "Computer", marks: 96, grade: "A+" },
];

const getGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  return "D";
};

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    subject: "",
    marks: "",
    grade: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setResults(JSON.parse(saved));
    } else {
      setResults(defaultResults);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultResults));
    }
  }, []);

  const save = (data) => {
    setResults(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("abpsDataUpdated"));
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      subject: "",
      marks: "",
      grade: "",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    setShowForm(true);
  };

  const handleMarks = (value) => {
    const marks = Number(value);

    setForm({
      ...form,
      marks: value,
      grade: value === "" ? "" : getGrade(marks),
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.subject || form.marks === "") {
      alert("Please enter subject and marks.");
      return;
    }

    if (Number(form.marks) < 0 || Number(form.marks) > 100) {
      alert("Marks must be between 0 and 100.");
      return;
    }

    const item = {
      id: editId || Date.now(),
      subject: form.subject,
      marks: Number(form.marks),
      grade: form.grade || getGrade(Number(form.marks)),
    };

    if (editId) {
      save(results.map((result) => (result.id === editId ? item : result)));
    } else {
      save([item, ...results]);
    }

    setShowForm(false);
  };

  const remove = (id) => {
    if (!window.confirm("Delete this result?")) return;
    save(results.filter((item) => item.id !== id));
  };

  const average =
    results.length > 0
      ? Math.round(
          results.reduce((sum, item) => sum + Number(item.marks), 0) /
            results.length
        )
      : 0;

  return (
    <div className="adminResultsPage">
      <div className="adminResultsHeader">
        <div>
          <span className="adminResultsEyebrow">
            <FaGraduationCap /> ACADEMIC RESULTS
          </span>
          <h1>Student Results</h1>
          <p>Manage marks and grades displayed in the parent portal.</p>
        </div>

        <button className="adminResultsAdd" onClick={openAdd}>
          <FaPlus /> Add Result
        </button>
      </div>

      <div className="adminResultsSummary">
        <div>
          <span>Total Subjects</span>
          <strong>{results.length}</strong>
        </div>

        <div>
          <span>Average Marks</span>
          <strong>{average}%</strong>
        </div>
      </div>

      <div className="adminResultsGrid">
        {results.map((result) => (
          <div className="adminResultCard" key={result.id}>
            <div className="adminResultTop">
              <div>
                <span>SUBJECT</span>
                <h2>{result.subject}</h2>
              </div>

              <strong>{result.grade}</strong>
            </div>

            <div className="adminResultMarks">
              <b>{result.marks}</b>
              <span>/ 100</span>
            </div>

            <div className="adminResultBar">
              <span style={{ width: `${result.marks}%` }} />
            </div>

            <div className="adminResultActions">
              <button onClick={() => openEdit(result)}>
                <FaEdit /> Edit
              </button>

              <button
                className="delete"
                onClick={() => remove(result.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="adminResultsOverlay">
          <div className="adminResultsModal">
            <button
              className="adminResultsClose"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <h2>{editId ? "Edit Result" : "Add Result"}</h2>
            <p>Enter subject marks.</p>

            <form onSubmit={submit}>
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
                Marks
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.marks}
                  onChange={(e) => handleMarks(e.target.value)}
                  placeholder="94"
                />
              </label>

              <label>
                Grade
                <input value={form.grade} readOnly placeholder="A+" />
              </label>

              <button className="adminResultsSubmit" type="submit">
                {editId ? "Update Result" : "Add Result"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;