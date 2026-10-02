import React, {
  useMemo,
  useState,
} from "react";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaEye,
  FaSave,
} from "react-icons/fa";

import "./AdminCrudPage.css";

const AdminCrudPage = ({
  title,
  label,
  description,

  data = [],

  fields = [],

  onAdd,
  onUpdate,
  onDelete,

  searchFields = [],
}) => {
  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [viewing, setViewing] =
    useState(null);

  const [formData, setFormData] =
    useState({});

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return data;
      }

      return data.filter(
        (item) =>
          searchFields.some(
            (field) =>
              String(
                item[field] || ""
              )
                .toLowerCase()
                .includes(query)
          )
      );
    }, [
      data,
      search,
      searchFields,
    ]);

  const createEmptyForm = () => {
    const empty = {};

    fields.forEach((field) => {
      empty[field.name] =
        field.defaultValue || "";
    });

    return empty;
  };

  const openAdd = () => {
    setEditing(null);

    setFormData(
      createEmptyForm()
    );

    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item);

    const values = {};

    fields.forEach((field) => {
      values[field.name] =
        item[field.name] ?? "";
    });

    setFormData(values);

    setShowForm(true);
  };

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing =
      fields.find(
        (field) =>
          field.required &&
          !String(
            formData[
              field.name
            ] || ""
          ).trim()
      );

    if (missing) {
      alert(
        `${missing.label} is required.`
      );

      return;
    }

    if (editing) {
      onUpdate?.(
        editing.id,
        formData
      );
    } else {
      onAdd?.(formData);
    }

    setShowForm(false);
    setEditing(null);
    setFormData({});
  };

  const remove = (item) => {
    const yes =
      window.confirm(
        `Delete this ${title.toLowerCase()} record?`
      );

    if (!yes) return;

    onDelete?.(item.id);
  };

  return (
    <div className="acp-page">

      <div className="acp-header">

        <div>
          <span>
            {label}
          </span>

          <h1>
            {title}
          </h1>

          <p>
            {description}
          </p>
        </div>

        <button
          type="button"
          className="acp-add"
          onClick={openAdd}
        >
          <FaPlus />

          Add New
        </button>

      </div>

      <div className="acp-toolbar">

        <div className="acp-search">

          <FaSearch />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder={`Search ${title.toLowerCase()}...`}
          />

        </div>

        <div className="acp-count">
          {filtered.length} Records
        </div>

      </div>

      <div className="acp-table-card">

        <div className="acp-table-scroll">

          <table className="acp-table">

            <thead>
              <tr>

                {fields
                  .filter(
                    (field) =>
                      field.table !==
                      false
                  )
                  .map((field) => (
                    <th
                      key={
                        field.name
                      }
                    >
                      {field.label}
                    </th>
                  ))}

                <th>Actions</th>

              </tr>
            </thead>

            <tbody>

              {filtered.length ? (
                filtered.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      {fields
                        .filter(
                          (field) =>
                            field.table !==
                            false
                        )
                        .map(
                          (field) => (

                            <td
                              key={
                                field.name
                              }
                            >
                              {item[
                                field.name
                              ] || "—"}
                            </td>

                          )
                        )}

                      <td>

                        <div className="acp-actions">

                          <button
                            className="view"
                            onClick={() =>
                              setViewing(
                                item
                              )
                            }
                          >
                            <FaEye />
                          </button>

                          <button
                            className="edit"
                            onClick={() =>
                              openEdit(
                                item
                              )
                            }
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="delete"
                            onClick={() =>
                              remove(
                                item
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )
              ) : (

                <tr>
                  <td
                    colSpan={
                      fields.length +
                      1
                    }
                    className="acp-empty"
                  >
                    No records found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {showForm && (

        <div className="acp-overlay">

          <form
            className="acp-modal"
            onSubmit={
              handleSubmit
            }
          >

            <button
              type="button"
              className="acp-close"
              onClick={() =>
                setShowForm(
                  false
                )
              }
            >
              <FaTimes />
            </button>

            <span className="acp-modal-label">
              {editing
                ? "EDIT RECORD"
                : "ADD RECORD"}
            </span>

            <h2>
              {editing
                ? `Edit ${title}`
                : `Add ${title}`}
            </h2>

            <div className="acp-form-grid">

              {fields.map(
                (field) => (

                  <label
                    key={
                      field.name
                    }
                    className={
                      field.full
                        ? "full"
                        : ""
                    }
                  >

                    <span>
                      {field.label}

                      {field.required &&
                        " *"}
                    </span>

                    {field.type ===
                    "select" ? (

                      <select
                        name={
                          field.name
                        }
                        value={
                          formData[
                            field.name
                          ] || ""
                        }
                        onChange={
                          handleChange
                        }
                      >

                        <option value="">
                          Select
                        </option>

                        {field.options?.map(
                          (
                            option
                          ) => (
                            <option
                              key={
                                option
                              }
                              value={
                                option
                              }
                            >
                              {
                                option
                              }
                            </option>
                          )
                        )}

                      </select>

                    ) : field.type ===
                      "textarea" ? (

                      <textarea
                        name={
                          field.name
                        }
                        value={
                          formData[
                            field.name
                          ] || ""
                        }
                        onChange={
                          handleChange
                        }
                        rows="4"
                      />

                    ) : (

                      <input
                        type={
                          field.type ||
                          "text"
                        }
                        name={
                          field.name
                        }
                        value={
                          formData[
                            field.name
                          ] || ""
                        }
                        onChange={
                          handleChange
                        }
                      />

                    )}

                  </label>

                )
              )}

            </div>

            <button
              className="acp-save"
              type="submit"
            >
              <FaSave />

              {editing
                ? "Save Changes"
                : "Add Record"}
            </button>

          </form>

        </div>

      )}

      {viewing && (

        <div className="acp-overlay">

          <div className="acp-modal">

            <button
              type="button"
              className="acp-close"
              onClick={() =>
                setViewing(null)
              }
            >
              <FaTimes />
            </button>

            <span className="acp-modal-label">
              RECORD DETAILS
            </span>

            <h2>
              {title}
            </h2>

            <div className="acp-details">

              {fields.map(
                (field) => (

                  <div
                    key={
                      field.name
                    }
                  >
                    <span>
                      {field.label}
                    </span>

                    <strong>
                      {viewing[
                        field.name
                      ] || "—"}
                    </strong>
                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminCrudPage;