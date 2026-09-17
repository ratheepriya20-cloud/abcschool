import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMoneyBillWave,
} from "react-icons/fa";
import "./AdminFees.css";

const STORAGE_KEY = "abpsAdminFees";

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

const AdminFees = () => {
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    status: "Pending",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setFees(JSON.parse(saved));
    } else {
      setFees(defaultFees);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFees));
    }
  }, []);

  const save = (data) => {
    setFees(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("abpsDataUpdated"));
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      title: "",
      amount: "",
      status: "Pending",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Please enter fee title and amount.");
      return;
    }

    const item = {
      id: editId || Date.now(),
      title: form.title,
      amount: Number(form.amount),
      status: form.status,
    };

    if (editId) {
      save(fees.map((fee) => (fee.id === editId ? item : fee)));
    } else {
      save([item, ...fees]);
    }

    setShowForm(false);
  };

  const remove = (id) => {
    if (!window.confirm("Delete this fee?")) return;
    save(fees.filter((fee) => fee.id !== id));
  };

  const total = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);

  return (
    <div className="adminFeesPage">
      <div className="adminFeesHeader">
        <div>
          <span className="adminFeesEyebrow">
            <FaMoneyBillWave /> FINANCE MANAGEMENT
          </span>
          <h1>Student Fees</h1>
          <p>Manage fee records shown in the parent portal.</p>
        </div>

        <button className="adminFeesAdd" onClick={openAdd}>
          <FaPlus /> Add Fee
        </button>
      </div>

      <div className="adminFeesTotal">
        <span>Total Fee Records Value</span>
        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </div>

      <div className="adminFeesTableWrap">
        <table className="adminFeesTable">
          <thead>
            <tr>
              <th>Fee</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td>
                  <strong>{fee.title}</strong>
                </td>

                <td>₹{Number(fee.amount).toLocaleString("en-IN")}</td>

                <td>
                  <span
                    className={
                      fee.status === "Paid"
                        ? "adminFeeStatus paid"
                        : "adminFeeStatus pending"
                    }
                  >
                    {fee.status}
                  </span>
                </td>

                <td>
                  <div className="adminFeeActions">
                    <button onClick={() => openEdit(fee)}>
                      <FaEdit />
                    </button>

                    <button
                      className="delete"
                      onClick={() => remove(fee.id)}
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
        <div className="adminFeesOverlay">
          <div className="adminFeesModal">
            <button
              className="adminFeesClose"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <h2>{editId ? "Edit Fee" : "Add Fee"}</h2>
            <p>Enter fee details for the student.</p>

            <form onSubmit={submit}>
              <label>
                Fee Title
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Tuition Fee"
                />
              </label>

              <label>
                Amount
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                  placeholder="18000"
                />
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </label>

              <button className="adminFeesSubmit" type="submit">
                {editId ? "Update Fee" : "Add Fee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFees;